This standard bridges two major healthcare data formats used in the United States: [C-CDA](https://build.fhir.org/ig/HL7/[CDA](https://build.fhir.org/ig/HL7/CDA-core-sd)-ccda-2.1-sd) and FHIR. It provides a way to translate clinical information between these formats, allowing systems using either standard to exchange data seamlessly.

The standard focuses on representing common clinical concepts found in C-CDA-ccda-2.1-sd) documents using FHIR resources. It leverages [US Core](https://build.fhir.org/ig/HL7/US-Core) FHIR profiles for key data elements like problems, allergies, medications, and patient demographics. This enables consistent sharing of crucial patient information across different healthcare systems.

Key features include the use of FHIR's document approach, where a central resource acts as a container for clinical data. It also provides detailed mapping guidance between C-CDA elements and FHIR resources, ensuring accurate translation of medical concepts and terminology.

Healthcare providers benefit from improved access to complete patient data from various sources. Health IT systems and EHRs can exchange clinical information more easily. Application developers can create FHIR-based tools that work with C-CDA-equivalent data, expanding the ecosystem of interoperable health applications.

The standard aligns with US healthcare interoperability goals and supports initiatives like Meaningful Use. It promotes compliance with regulations emphasizing seamless data sharing in healthcare.