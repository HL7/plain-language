import { promises as fs } from 'fs';
import path from 'path';
import { VertexAI } from "@google-cloud/vertexai";
import Anthropic from "@anthropic-ai/sdk";
import type { TextBlock } from '@anthropic-ai/sdk/resources/index.mjs';


const repoPath = process.argv[2];
if (!repoPath) {
  console.error('Please provide the repository path as an argument.');
  process.exit(1);
}
const igName = repoPath.split('/').filter(Boolean).pop();

await fs.mkdir('summaries', { recursive: true });
async function processRepo(repoPath: string) {
  const inputDir = path.join(repoPath, 'input');
  const outputFile = path.join('summaries', `${igName}.md`);

  // Check if output file already exists
  try {
    await fs.access(outputFile);
    console.log(`Summary ${outputFile} for ${igName} already exists. Skipping this repo.`);
    return;
  } catch (error) {
    // File doesn't exist, continue processing
  }

  // Check if 'input' folder exists
  try {
    await fs.access(inputDir);
  } catch (error) {
    console.log(`No 'input' folder found in ${repoPath}. Skipping this repo.`);
    return;
  }

  // Concatenate all relevant files
  const fileContent = await concatenateFiles(inputDir);

  // Prepare and send prompt to Vertex AI
  await generateSummary(fileContent);
}

async function concatenateFiles(dir: string): Promise<string> {
  const allowedExtensions = ['.txt', '.md', '.plantuml', '.fsh'];
  let allFiles: { path: string; depth: number; name: string; isIndex: boolean; isPageContent: boolean }[] = [];

  async function collectFiles(currentDir: string) {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        await collectFiles(fullPath);
      } else if (entry.isFile() && allowedExtensions.includes(path.extname(entry.name)) && entry.name !== 'ignoreWarnings.txt') {
        const relativePath = path.relative(dir, fullPath);
        const depth = relativePath.split(path.sep).length;
        const isIndex = entry.name.toLowerCase().includes('index');
        const isPageContent = relativePath.toLowerCase().includes('pagecontent');
        allFiles.push({ path: fullPath, depth, name: entry.name, isIndex, isPageContent });
      }
    }
  }

  await collectFiles(dir);

  // Sort all files once
  allFiles.sort((a, b) => {
    if (a.isPageContent !== b.isPageContent) return a.isPageContent ? -1 : 1;
    if (a.depth !== b.depth) return a.depth - b.depth;
    if (a.isIndex !== b.isIndex) return a.isIndex ? -1 : 1;
    return a.name.length - b.name.length;
  });

  // Process sorted files
  let content = '';
  const maxSize = 400 * 1024; // 400KB in bytes
  let currentSize = 0;

  for (const file of allFiles) {
    const fileContent = await fs.readFile(file.path, 'utf-8');
    const sourceContent = `<source path="${file.path}">\n${fileContent}</source>\n`;
    const sourceSize = Buffer.byteLength(sourceContent, 'utf-8');

    if (currentSize + sourceSize > maxSize) {
      console.log(`Skipping ${file.path} as it would exceed the 400KB limit.`);
      continue;
    }

    content += sourceContent;
    currentSize += sourceSize;

    if (currentSize >= maxSize) {
      console.log(`Reached 400KB limit. Stopping file processing.`);
      break;
    }
  }

  console.log(`Total content size: ${currentSize / 1024} KB`);
  return content;
}

async function generateSummary(content: string) {
  const vertexAI = new VertexAI({
    project: "fhir-org-starter-project",
    location: "us-central1",
  });

  const anthropic = new Anthropic();




  const generativeModel = vertexAI.getGenerativeModel({
    model: "gemini-pro-experimental",
    generationConfig: {
        temperature: 0.7,
    }
  });

  const promptInstructions = `# FHIR IG Analysis
Given the FHIR Implementation Guide (IG) source files above, provide a structured analysis addressing the following questions:

1. What is this IG trying to achieve, in what context, and for whom? Explain its objectives in simple terms.
2. How does this IG improve upon previous approaches? (Use only information from the input files; avoid speculation.)
3. What are the key features and technical approaches of this IG?
4. How does this IG relate to broader healthcare standards and regulations?
5. Who are the primary users or beneficiaries of this IG, including patients if applicable?

Provide concise, factual responses to each question based on the content of the IG. Aim for clarity and precision in your analysis. Begin with "# $igName: Analysis" and do not output anything other than the analysis.`;

  const request = {
    systemInstruction: "You are a health information technology expert.",
    contents: [
      { role: 'user', parts: [{ text: content + "\n\n" + promptInstructions }] },
    ]
  };

  // Create prompts directory if it doesn't exist
  await fs.mkdir('prompts', { recursive: true });

  // Write the full prompt request to a file
  await fs.writeFile(path.join('prompts', `${igName}.txt`), JSON.stringify(request, null, 2));

  try {
    const response = await generativeModel.generateContent(request);
    let analysis = response.response.candidates?.[0].content.parts[0].text || "";
    console.log('Initial Analysis:', analysis);

    // Create analysis directory if it doesn't exist
    await fs.mkdir('analysis', { recursive: true });

    // Save the initial analysis to a file in the analysis directory
    await fs.writeFile(path.join('analysis', `${igName}.md`), analysis);
    const basicGuidelines = `
1. Explain the IG's purpose, country of use (if applicable), and context of use  / use cases, and key features / how it works. Avoid explaining what standards are in general.
2. Write ~200 words in short paragraphs for a general audience.
3. Use clear, jargon-free language.
4. Write in third-person perspective.
5. Maintain an objective, informative tone.
6. Present information factually.
7. Highlight any key stakeholder benefits.
8. Mention how the IG relates to other standards or regulations, if this is direct and relevant. Otherwise omit this.
9. Avoid promotional language or unverified claims.
`
const revisionGuidelines = `
Please revise this summary to adhere to the following revision guideline:
- Rather than referring to an "IG" or "Implementation Guide", just call it a "standard".
- Remove any explanation that healthcare standards are like a common language or that they help computers talk to each other. That's common knowledge.
- Remove any explanation of what FHIR is; do not expand the acronym FHIR; just call it FHIR.
- Remove any explanation of what an API is; do not expand the acronym API; just call it an API.
- Remove any explanation of what an EHR is; do not expand the acronym EHR; just call it an EHR.
- Eliminate any speculative or indirect information about benefits.
- Remove any redundancy in the summary. 
- Remove any mention of things you don't know or aren't sure about this IG
- Remove any mention that this IG builds on FHIR; that is common knowledge.
`

    // Refinement stage
    const refinementPrompt = `
Here is the analysis of a FHIR Implementation Guide:

${analysis}

Use the analysis to create a plain language summary of the guide that adheres to these guidelines:

${basicGuidelines}

${revisionGuidelines}

Provide only the refined summary as your response, without additional explanations or comments.`;

const msg = await anthropic.messages.create({
  model: "claude-3-5-sonnet-20240620",
  max_tokens: 1182,
  temperature: 0.6,
  system: "You are a skilled communicator with expertise in health information technology and a knack for clear, concise writing.",
  messages: [
    {
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": `${refinementPrompt}\n\n`
        }
      ]
    },
    {
      "role": "assistant",
      "content": [
        {
          "type": "text",
          "text": "This standard"
        }
      ]
    }
  ]
});

    // const refinementRequest = {
    //   systemInstruction: "You are a skilled communicator with expertise in health information technology and a knack for clear, concise writing.",
    //   contents: [
    //     { role: 'user', parts: [{ text: content + "\n\n" + promptInstructions }] },
    //     { role: 'user', parts: [{ text: refinementPrompt }] },
    //   ]
    // };

    await fs.writeFile(path.join('prompts', `${igName}-refinement.txt`), JSON.stringify(refinementPrompt, null, 2));
    // const refinementResponse = await generativeModel.generateContent(refinementRequest);
    const refinementResponse = "This standard " + (msg.content[0] as TextBlock).text!;
//     let refinedSummary = refinementResponse.response.candidates?.[0].content.parts[0].text || analysis;
//     console.log('Refined Summary:', refinedSummary);

//     const finalRefinementPrompt = `

// Basic guidelines:
// ${basicGuidelines}

// Here's a summary of a FHIR Implementation Guide:
// ${refinedSummary}


// Retain the original summary and only revise it to address the guidelines above.

// Provide only the final refined summary as your response, without any additional explanations or comments.`;

//     const finalRefinementRequest = {
//       contents: [
//         { role: 'user', parts: [{ text: analysis }] },
//         { role: 'user', parts: [{ text: finalRefinementPrompt }] },
//       ]
//     };

//     console.log("Requesting final refinement");
//     await fs.writeFile(path.join('prompts', `${igName}-final-refinement.txt`), JSON.stringify(finalRefinementRequest, null, 2));
    // const finalRefinementResponse = await generativeModel.generateContent(finalRefinementRequest);
    // refinedSummary = finalRefinementResponse.response.candidates?.[0].content.parts[0].text || refinedSummary;
    // console.log('Final Refined Summary:', refinedSummary);

    console.log("Refined as", refinementResponse);
    await fs.writeFile(path.join('summaries', `${igName}.md`), refinementResponse);
  } catch (error) {
    console.error('Error generating or refining summary:', error);
  }
}

processRepo(repoPath).catch(console.error);