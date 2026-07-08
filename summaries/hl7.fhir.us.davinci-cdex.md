#General

This standard aims to make it easier for healthcare providers and payers to request and share clinical information in the United States. It supports needs such as gathering attachments for claims and prior authorization, providing documentation for payer operations like claims audits, and coordinating care between providers. "Clinical data" here means any information in a patient's record, including FHIR resources, C-CDA documents, PDFs, and other formats.

The standard defines three ways to exchange this information using FHIR. Direct Query uses standard FHIR RESTful search to retrieve data directly. Task-Based exchange uses the FHIR Task resource for asynchronous requests that may require human involvement. The Attachments approach handles additional information for claims and prior authorization, requested either by attachment code (LOINC and X12) or by FHIR Questionnaire.

Key features include constraining US Core and Da Vinci HRex profiles, using the Task resource for asynchronous and solicited/unsolicited workflows, and supporting electronic and digital signatures so exchanged data can be attested and verified. Because payers can be explicit about what they need, the standard avoids sending more information than necessary and works alongside the Da Vinci PAS guide.

Providers benefit from reduced administrative burden and easier access to records held by others. Payers benefit from precise, standardized requests that improve accuracy across claims, care coordination, risk adjustment, and quality reporting. Patients may experience better-coordinated care and faster access to services.

The standard is based on FHIR R4, aligns with US Core (covering USCDI V1, V3, and V4) and Da Vinci HRex, and addresses HIPAA privacy by emphasizing limited, focused requests for only the data needed.
