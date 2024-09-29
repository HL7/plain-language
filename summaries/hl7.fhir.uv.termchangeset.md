This standard aims to create a consistent method for tracking and sharing updates to medical terminologies like LOINC and SNOMED CT using FHIR. It introduces the concept of a "Change Set" to package related terminology modifications, making it easier for healthcare systems to stay current.

The standard defines specialized profiles for CodeSystem and Provenance resources to capture terminology changes and their history. It also provides guidance on representing terminology-specific properties within the CodeSystem resource, such as LOINC axes and SNOMED relationships.

Key users of this standard include terminology developers, who can create and distribute change sets more efficiently, and software developers, who can build systems capable of consuming and applying these updates. Healthcare organizations benefit from improved data consistency and accuracy by using the most up-to-date terminologies.

The standard aligns with prominent healthcare terminologies and messaging standards, referencing LOINC, SNOMED CT, and HL7. It also maps elements to the Tinkar terminology model, indicating a strong connection to this underlying data structure.