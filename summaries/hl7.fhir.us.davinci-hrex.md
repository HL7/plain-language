# General
This standard aims to improve data exchange between healthcare payers and providers in the United States, focusing on value-based care scenarios like prior authorization and clinical decision support. It defines specific FHIR profiles for key resources such as Coverage, Patient, and Task, tailored to payer-provider interactions.

A key feature is the $member-match operation, which helps identify patients across different payer systems. The standard also provides guidance on managing patient consent for data sharing and uses the Task resource for handling asynchronous data requests.

To ensure data traceability, the standard promotes the use of Provenance resources. It also describes a method for EHRs to discover relevant endpoints for different payers using a davinci-configuration endpoint.

Payers benefit from streamlined processes and improved data accuracy. Providers gain easier access to patient information from payers, supporting better decision-making. Patients may experience improved care coordination due to enhanced data sharing between their providers and payers.

The standard aligns with [US Core](https://build.fhir.org/ig/HL7/US-Core) profiles and addresses HIPAA-related security and privacy considerations for protecting sensitive patient data.