# General

Symptoms are a major reason people seek care and are important for clinical diagnosis and treatment planning. However, symptom information is captured and shared in many different ways—free-text notes, coded data, checklists, questionnaires, and app-specific fields— by different organizations and systems.  This lack of consistency makes it difficult to exchange symptom data between different health systems and patient-facing applications. 

This implementation guide describes how patient-reported symptoms can be represented and exchanged in a standard way using HL7 FHIR. In this guide, “symptoms” refers to observations reported by patients or their caregivers about changes in health. This includes all symptoms (such as pain or fatigue) reported by patients as well as signs (such as a rash or swelling) that patients notice themselves.

The standard works by breaking down symptom information into separate, structured components. Instead of using a single code for "abdominal pain," it records the symptom (pain) and location (abdomen) as distinct data elements. This approach provides detailed symptom attributes including severity, duration, triggers, and alleviating factors.  The guide also specifies how to represent and exchange data about symptoms that are explicitly noted as absent (for example, when a patient reports they do not have fever or chest pain).

The standard defines specific FHIR profiles and requires systems to use RESTful APIs for data exchange. It incorporates established medical terminologies like SNOMED CT and LOINC to ensure consistent meaning across different systems. The standard also provides guidance for handling recurring symptoms and linking symptom data to related medical conditions.
