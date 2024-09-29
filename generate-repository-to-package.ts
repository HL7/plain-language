import { writeFile } from 'fs/promises';

interface IGInfo {
  repo: string;
  'package-id': string;
}

async function fetchAndProcessIGs() {
  try {
    const response = await fetch('https://build.fhir.org/ig/qas.json');
    const data: IGInfo[] = await response.json();

    const repoToPackage: Record<string, string> = {};

    data.forEach((ig) => {
      const repoPath = ig.repo.split('/');
      if (repoPath[0] === 'HL7') {
        const repoName = repoPath[1];
        repoToPackage[repoName] = ig['package-id'];
      }
    });

    await writeFile('repository_to_package.json', JSON.stringify(repoToPackage, null, 2));
    console.log('repository_to_package.json has been created successfully.');
  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }
}

fetchAndProcessIGs();