# General 

This standard aims to create a consistent format for clinical documents using FHIR. It provides a unified approach for representing and exchanging documents like discharge summaries and progress notes across different healthcare systems worldwide. The standard defines a clinical document as a FHIR Bundle containing a Composition resource and other related resources. It emphasizes human readability and provides detailed mappings from older [CDA](https://build.fhir.org/ig/HL7/CDA-core-sd) standards to FHIR.

Key features include specific profiles for Bundle and Composition resources, extensions for representing additional elements, and methods for document versioning and succession management. The standard also specifies an operation to convert FHIR clinical documents into transaction bundles for processing by FHIR servers.

Healthcare providers, organizations, and health IT developers can benefit from this standard by creating, exchanging, and viewing clinical documents in a standardized format. It supports interoperability and aligns with healthcare regulations that promote the exchange of health information. The standard also facilitates migration from older CDA systems to FHIR-based implementations.
