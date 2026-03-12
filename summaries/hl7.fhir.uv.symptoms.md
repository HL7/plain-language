# General

This standard defines how patient-reported symptoms should be recorded and shared electronically across healthcare systems. When patients describe their health concerns—such as chest pain, dizziness, or fatigue—this standard ensures the information is captured in a structured, consistent format rather than as unstructured text notes.

The standard addresses the problem of symptom information being trapped in data silos or documented inconsistently, which can hinder effective sharing between providers and potentially lead to diagnostic errors. It provides specific FHIR profiles that break down symptoms into detailed components like severity, onset, duration, location, and quality.

Healthcare IT developers use this standard to build EHRs, patient-facing applications, and clinical decision support systems. The standard requires systems to use FHIR APIs for exchanging symptom data and mandates support for specific search capabilities. It also defines how to explicitly record when patients deny having certain symptoms.

Clinicians benefit by having access to structured, longitudinal symptom data at the point of care, supporting better diagnostic reasoning and reducing the need to repeatedly ask patients about their history. Public health agencies can use the standardized data for disease surveillance and outbreak detection. The standard integrates with major medical terminologies including SNOMED CT and LOINC to ensure consistent coding of clinical concepts.