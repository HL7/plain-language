# General

This standard aims to streamline the process of collecting patient documentation required by health insurance payers for purposes like prior authorization and claims processing. It enables payers to express their documentation requirements in a computable format using FHIR Questionnaires, allowing providers to easily gather and submit necessary information.

The standard automates data collection by leveraging [Clinical Quality Language](https://build.fhir.org/ig/HL7/cql) (CQL) to extract existing patient data from EHRs, reducing manual entry and errors. It supports both pre-defined questionnaires and adaptive forms that adjust based on user responses.

Key features include the use of FHIR Questionnaires for defining documentation requirements, CQL for data extraction and logic implementation, and [SMART on FHIR](https://build.fhir.org/ig/HL7/smart-app-launch) integration for seamless EHR compatibility.

This approach benefits providers by reducing administrative burden, payers by standardizing documentation requirements, and patients by potentially expediting access to care. It also creates opportunities for EHR vendors and app developers to integrate documentation functionality into their systems.

The standard aligns with [US Core](https://build.fhir.org/ig/HL7/US-Core) Implementation Guides and addresses HIPAA privacy regulations by emphasizing limited data access for specific documentation needs.
