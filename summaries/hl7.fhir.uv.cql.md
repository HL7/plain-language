# General

This standard aims to streamline the use of [Clinical Quality Language](https://build.fhir.org/ig/HL7/cql) (CQL) with FHIR resources in healthcare settings. It provides a unified approach for representing and evaluating clinical logic across various scenarios, including decision support, public health reporting, and research eligibility criteria.

The standard defines profiles for packaging CQL and its compiled form as FHIR Library resources. It also includes profiles for representing information about logic libraries and their evaluation results. A key feature is the specification of a CQL evaluation service, enabling consistent implementation across different systems.

Healthcare providers can use this standard to implement computable knowledge artifacts that support clinical decision-making and quality reporting. Software developers benefit from clear guidelines for building systems that author, manage, and evaluate CQL-based FHIR artifacts. Healthcare organizations can leverage the standard to improve data exchange and streamline quality reporting processes.

By consolidating common elements from previous standards, this guide reduces redundancy and simplifies future development efforts. It provides best practices for authoring CQL with FHIR data models, addressing common challenges such as handling missing information and terminology use.
