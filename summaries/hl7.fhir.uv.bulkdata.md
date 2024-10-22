This standard defines a method for efficiently exporting large healthcare datasets from FHIR-based systems. It addresses the need to transfer bulk data for purposes like research, population health management, and quality measurement.

The standard introduces an API that allows authorized systems to request and receive extensive data exports, such as patient records or claims data. It supports various healthcare data types and includes features for flexible filtering and resource selection. The export process is asynchronous, enabling the generation of large datasets without disrupting client operations.

Security and privacy are prioritized, with mandatory encryption and recommended OAuth 2.0 for access management. The standard primarily uses the Newline Delimited JSON (NDJSON) format for efficient data exchange.

Key beneficiaries include developers of backend services and FHIR servers, healthcare organizations, and researchers. It enables improved data sharing and interoperability, potentially accelerating healthcare research and supporting quality improvement initiatives.

The standard aligns with the [US Core](https://build.fhir.org/ig/HL7/US-Core) Data for Interoperability ([USCDI](https://build.fhir.org/ig/HL7/US-Core)) and recommends the SMART Backend Services Authorization Profile for secure access management.