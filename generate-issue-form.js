import { readFileSync, writeFileSync } from 'fs';
import { parse, stringify } from 'yaml';

const REPO_TO_PACKAGE_PATH = './repository_to_package.json';
const ISSUE_TEMPLATE_PATH = './.github/ISSUE_TEMPLATE/plain_language_summary_form.yml';

try {
  // Read the repository_to_package.json file
  const repoToPackageData = JSON.parse(readFileSync(REPO_TO_PACKAGE_PATH, 'utf8'));

  // Read the existing YAML file
  const issueFormYaml = readFileSync(ISSUE_TEMPLATE_PATH, 'utf8');
  const issueForm = parse(issueFormYaml);

  // Generate new options and sort them alphabetically by packageName
  const newOptions = Object.entries(repoToPackageData)
    .map(([repo, packageName]) => ({ packageName, repo }))
    .sort((a, b) => a.packageName.localeCompare(b.packageName))
    .map(({ packageName, repo }) => `${packageName} (${repo})`);

  // Create the new dropdown object
  const newDropdown = {
    type: 'dropdown',
    id: 'package-file',
    attributes: {
      label: 'Package and File',
      description: 'Select the package and file with the issue',
      options: newOptions
    },
    validations: {
      required: true
    }
  };

  // Check if the body array exists, if not, create it
  if (!Array.isArray(issueForm.body)) {
    issueForm.body = [];
  }

  // Find the index of the existing dropdown, if it exists
  const existingDropdownIndex = issueForm.body.findIndex(item => 
    item.type === 'dropdown' && item.id === 'package-file'
  );

  if (existingDropdownIndex !== -1) {
    // Replace the existing dropdown
    issueForm.body[existingDropdownIndex] = newDropdown;
    console.log('Existing dropdown replaced with sorted options');
  } else {
    // Add the new dropdown at the beginning of the body array
    issueForm.body.unshift(newDropdown);
    console.log('New dropdown added with sorted options');
  }

  // Write the updated YAML file
  writeFileSync(ISSUE_TEMPLATE_PATH, stringify(issueForm));

  console.log('Issue template updated successfully with alphabetically sorted options.');
} catch (error) {
  console.error('Error updating issue template:', error.message);
  process.exit(1);
}
