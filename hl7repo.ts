import { parse } from 'node-html-parser';
import { exec } from 'child_process';
import { promises as fs } from 'fs';
import path from 'path';

const url = 'https://build.fhir.org/ig/HL7/';
const reposDir = 'repos';

async function fetchHL7Repos() {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const root = parse(html);

    const repos = root.querySelectorAll('tr.file')
      .map(tr => tr.querySelector('.name'))
      .filter(nameEl => nameEl !== null)
      .map(nameEl => nameEl.textContent.trim())
      .filter(name => name.endsWith('/'))
      .map(name => name.slice(0, -1)) // Remove trailing slash
      .filter(name => !name.toLowerCase().includes('template')); // Filter out repos with 'template' in the name

    const githubUrls = repos.map(repo => `https://github.com/HL7/${repo}`);

    // Create repos directory if it doesn't exist
    await fs.mkdir(reposDir, { recursive: true });

    for (const url of githubUrls) {
      const repoName = url.split('/').pop();
      const repoPath = path.join(reposDir, repoName);

      console.log(`Shallow cloning ${url}...`);
      await new Promise((resolve, reject) => {
        exec(`git clone --depth 1 ${url} ${repoPath}`, (error, stdout, stderr) => {
          if (error) {
            console.error(`Error cloning ${url}:`, error);
            reject(error);
          } else {
            console.log(`Successfully shallow cloned ${url}`);
            resolve(stdout);
          }
        });
      });
    }
  } catch (error) {
    console.error('Error fetching or parsing the page:', error);
  }
}

fetchHL7Repos();