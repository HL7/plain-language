import { promises as fs } from 'fs';
import path from 'path';

const summariesDir = 'summaries';
const linkifiersFile = 'linkifiers.csv';

interface Linkifier {
  term: string;
  packageId: string;
}

async function addLinks() {
  // Load linkifiers
  const linkifiersContent = await fs.readFile(linkifiersFile, 'utf-8');
  const linkifiers: Linkifier[] = linkifiersContent.split('\n')
    .filter(line => line.trim() !== '')
    .map(line => {
      const [term, packageId] = line.split(',');
      return { term, packageId };
    });

  // Sort linkifiers by term length (descending) to prioritize longer matches
  linkifiers.sort((a, b) => b.term.length - a.term.length);

  // Process each summary file
  const files = await fs.readdir(summariesDir);
  for (const file of files) {
    if (path.extname(file) === '.md') {
      const filePath = path.join(summariesDir, file);
      let content = await fs.readFile(filePath, 'utf-8');

      // Extract the current IG name from the file name
      const currentIGName = path.basename(file, '.md');

      for (const linkifier of linkifiers) {
        if (linkifier.packageId !== currentIGName) {
          const regex = new RegExp(`\\b${escapeRegExp(linkifier.term)}\\b`, 'g');
          let hasReplaced = false;
          content = content.replace(regex, (match) => {
            if (!hasReplaced) {
              hasReplaced = true;
              return `[${match}](https://build.fhir.org/ig/HL7/${linkifier.packageId})`;
            }
            return match;
          });
        }
      }

      // Write the processed content back to the file
      await fs.writeFile(filePath, content);
      console.log(`Processed ${file}`);
    }
  }
}

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Run the addLinks function
addLinks().catch(console.error);
