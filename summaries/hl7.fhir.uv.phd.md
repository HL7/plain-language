# General
This standard defines how data from personal health devices (PHDs)—such as glucose meters, blood pressure monitors, and weight scales—is represented using FHIR, focusing on home-use devices. It enables seamless data exchange between PHDs, personal health gateways (PHGs, systems or applications that act as intermediaries between PHDs and healthcare systems), and healthcare systems.

Key features include a generic mapping algorithm for handling all PHD types, extensibility for future devices, robust time management to address unreliable timestamps, and support for mapping all viable PHD data, including error states. The standard aligns with IEEE 11073-10206 and incorporates LOINC codes for vital signs, ensuring interoperability and data consistency.

The guide is intended for:

- **Personal Health Gateway (PHG) Developers**: Systems or apps that collect, process, and upload PHD data to healthcare systems.
- **FHIR Data Consumers**: Healthcare providers, researchers, or apps that use PHD data for remote monitoring or studies.

By following this guide, developers can ensure PHD data is accurate, interoperable, and compatible with Bluetooth-enabled devices using the Generic Health Sensor (GHS) profile, facilitating consistent data exchange across platforms.