# HL7 FHIR Implementation Guide Analyzer

This project contains scripts to fetch, analyze, and summarize HL7 FHIR Implementation Guides (IGs).

## Prerequisites

- [bun](https://bun.sh/) (latest version)
- Git
- Google Cloud SDK (for Vertex AI)
- Anthropic API key (for Claude)

## Setup

1. Clone this repository:
   ```
   git clone <repository-url>
   cd <repository-name>
   ```

2. Install dependencies:
   ```
   bun install
   ```

3. Set up Google Cloud credentials:
   ```
   gcloud auth application-default login
   ```

4. Set your Anthropic API key as an environment variable:
   ```
   export ANTHROPIC_API_KEY=your_api_key_here
   ```

## Usage

### 1. Fetch HL7 Repositories

Run the `hl7repo.ts` script to fetch HL7 repositories:

```
bun run hl7repo.ts
```

This script will:
- Fetch a list of HL7 repositories from https://build.fhir.org/ig/HL7/
- Create a `repos` directory
- Shallow clone each repository into the `repos` directory

### 2. Process Repositories

After fetching the repositories, you can process them using the `process_repo.ts` script:

```
bun run process_repo.ts repos/<repository-name>
```

Replace `<repository-name>` with the name of the repository you want to process.

This script will:
- Concatenate relevant files from the repository's `input` directory
- Generate an initial analysis using Google's Vertex AI
- Refine the analysis using Anthropic's Claude AI
- Save the results in the following directories:
  - `prompts`: Contains the prompts used for AI analysis
  - `analysis`: Contains the initial AI analysis
  - `summaries`: Contains the final refined summaries

## Output

- `repos/`: Contains the cloned HL7 repositories
- `prompts/`: Contains the prompts used for AI analysis
- `analysis/`: Contains the initial AI analysis for each IG
- `summaries/`: Contains the final refined summaries for each IG

Each summary in the `summaries/` directory is a markdown file named after the IG, containing a concise, plain-language description of the IG's purpose, features, and relevance.

## Notes

- The scripts use AI models, so results will vary between runs.
- Ensure you have sufficient permissions and API quota for Google Cloud and Anthropic services.
- Processing large repositories may take some time and consume API resources.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
