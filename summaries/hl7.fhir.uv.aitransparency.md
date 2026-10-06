# General

This guide explains how to represent the use of artificial intelligence (AI) in FHIR data. Its goal is to help systems identify health information that an AI system created or influenced, so people and software can use that information with greater awareness of its origins.

The guide defines ways to describe an AI system as a FHIR Device and record its role in creating or changing data with Provenance. The provenance can link to information about the AI model and the prompt used, while an extension can record the system's confidence in a result. Together, these records help trace AI-influenced information back to the system and inputs involved.

Healthcare organizations, software developers, and people who exchange or use FHIR data can use these patterns to make AI involvement more visible across systems. This supports informed use of AI-influenced health information; it does not, by itself, assess or certify an AI system's quality or safety.
