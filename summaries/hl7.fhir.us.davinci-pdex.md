# General

The HL7 Da Vinci Payer Data Exchange (PDex) Implementation Guide defines methods (Application Programming Interfaces or APIs) that enable a Health Plan to make data available to Patients, Providers and other Payers. The Guide addresses three scenarios that enable:
      
- Patients to share the data held about them by the health plan to applications or services they trust.
- Providers to retrieve the data they need, that the health plan holds, about the patients they are treating. 
- Payers to retrieve the data about a newly-enrolled member that asks them to fetch their data from their old health plan.

The Guide enables the exchange of the following information to members:
 
- Clinical information
- Prior Authorization information

In addition, the Guide enables Providers and Payers to also receive the following information:

- Claims and Encounter data without the monetary values that the Member is able to see.


This guide works in conjunction with other important Implementation Guides:

- US Core, the clinical FHIR standards to exchange clinical data in the USA.
- CARIN Blue Button, that enables members to receive claims and encounter information.
- Da Vinci Prior Authorization Support that enables the health plan to receive Prior Authorization requests and provide the response.

The Guide is recommended by the Centers for Medicare and Medicaid Services (CMS) in the 2024 Prior Authorization Rule (CMS-0057) that requires Medicare Advantage health plans, State Medicaid agencies and Individual Qualified Health Plans to provide these standardized APIs to enable easier exchange of information for the benefit of health plan members.</p>

This standard, called Payer Data Exchange (PDex), aims to improve how health insurance companies share patient data in the United States. It focuses on three main scenarios: sharing data with healthcare providers, transferring information when patients switch insurance plans, and allowing patients to access their health data through authorized apps.

PDex uses HL7 FHIR to structure health information consistently. It provides guidance on converting insurance claims data into clinical formats and introduces new ways to record medication dispensing. The standard also supports bulk data transfers for efficiency.

Key features of PDex include secure authorization methods, data traceability, and custom profiles for specific types of health information. It directly supports recent U.S. healthcare regulations that require insurance companies to make patient data more accessible through APIs.

Patients benefit from better-coordinated care and easier access to their health records. Healthcare providers can access more complete patient histories. Insurance companies can streamline their data sharing processes and meet regulatory requirements. App developers can create new tools that use patient health data securely.

PDex aligns with U.S. healthcare privacy laws and supports national efforts to improve health data interoperability.

#
