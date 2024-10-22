import { promises as fs } from 'fs';
import path from 'path';

const summariesDir = 'summaries';
const linkifiersFile = 'linkifiers.csv';
const repoToPackageFile = './repository_to_package.json';

interface Linkifier {
  term: string;
  packageId: string;
}

interface RepoToPackage {
  [key: string]: string;
}

async function addLinks() {
  console.log('Starting addLinks process...');

  // Load linkifiers
  console.log('Loading linkifiers...');
  const linkifiersContent = await fs.readFile(linkifiersFile, 'utf-8');
  const linkifiers: Linkifier[] = linkifiersContent.split('\n')
    .filter(line => line.trim() !== '')
    .map(line => {
      const [term, packageId] = line.split(',');
      return { term, packageId };
    });

  // Sort linkifiers by term length (descending) to prioritize longer matches
  linkifiers.sort((a, b) => b.term.length - a.term.length);
  console.log(`Loaded ${linkifiers.length} linkifiers`);

  // Load repository to package mapping
  console.log('Loading repository to package mapping...');
  const repoToPackageContent = await fs.readFile(repoToPackageFile, 'utf-8');
  const repoToPackage: RepoToPackage = JSON.parse(repoToPackageContent);
  const packageToRepo = Object.entries(repoToPackage).reduce((acc, [repo, pkg]) => {
    acc[pkg] = repo;
    return acc;
  }, {} as Record<string, string>);

  // Process each summary file
  const files = await fs.readdir(summariesDir);
  console.log(`Found ${files.length} files in summaries directory`);

  for (const file of files) {
    if (path.extname(file) === '.md') {
      console.log(`Processing ${file}...`);
      const filePath = path.join(summariesDir, file);
      let content = await fs.readFile(filePath, 'utf-8');

      // Extract the current IG name from the file name
      const currentIGName = path.basename(file, '.md');

      // Remove existing links
      content = content.replace(/\[([^\]]+)\]\(https:\/\/build\.fhir\.org\/ig\/HL7\/[^)]+\)/g, '$1');

      let linkCount = 0;
      const insertedUrls = new Set<string>();

      for (const linkifier of linkifiers) {
        if (linkifier.packageId !== currentIGName) {
          const repoName = packageToRepo[linkifier.packageId] || linkifier.packageId;
          const targetUrl = `https://build.fhir.org/ig/HL7/${repoName}`;

          if (!insertedUrls.has(targetUrl)) {
            const regex = new RegExp(`\\b${escapeRegExp(linkifier.term)}\\b(?![^\\[]*\\])`, 'g');
            let hasReplaced = false;
            content = content.replace(regex, (match) => {
              if (!hasReplaced) {
                hasReplaced = true;
                linkCount++;
                insertedUrls.add(targetUrl);
                return `[${match}](${targetUrl})`;
              }
              return match;
            });
          }
        }
      }

      // Write the processed content back to the file
      await fs.writeFile(filePath, content);
      console.log(`Processed ${file} - Added ${linkCount} links`);
    }
  }

  console.log('Finished processing all files');
}

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Run the addLinks function
addLinks().catch(error => {
  console.error('An error occurred:', error);
  process.exit(1);
});
