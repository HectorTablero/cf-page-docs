---
title: Google Forms Worker Entrypoint Documentation
description: Documentation for the entrypoints of the Google Forms Worker.
---

# Google Forms Worker Entrypoint

The **Google Forms Worker** provides functionality for interacting with Google Forms. This worker enables registration handling and validation processes, simplifying the integration of Google Forms with custom workflows.

---

## **GoogleFormsWorker Entrypoint**

### **`openRegistration(fixedUrl, handler, handlerData)`**

Registers a new form interaction session and generates unique identifiers for tracking the session. The function stores the registration data and returns an identifier for the created session.

**Parameters**:
- `fixedUrl`: The fixed URL associated with the form. This URL serves as a reference for validating interactions.
- `handler`: The name of the handler responsible for processing responses.
- `handlerData`: Additional data required by the handler for processing responses.

**Returns**:
A unique session ID (`id`) as a string.

**Details**:
- This function generates two unique keys using the **Utils Worker**'s `generateID` function:
  - A 25-character session ID.
  - A 50-character registration key.
- Both keys are stored in the environment's **Google Forms** KV namespace with an expiration time of one hour (3600 seconds).
- Registration details, including the `fixedUrl`, `handler`, `handlerData`, and `key`, are also stored in the KV namespace with the same expiration time.

**Usage Example**:

```javascript showLineNumbers
const sessionID = await GoogleFormsWorker.openRegistration(
    'esn/recruitment', // fixedUrl
    'esn-recruitment', // handler
    { someKey: 'someValue' } // handlerData
);
return Response.redirect(`https://workers.tablerus.es/googleforms/${sessionID}`, 302);
```

**Behavior**:
1. Generates a unique session ID and registration key.
2. Stores registration data in the KV namespace.
3. Returns the generated session ID for reference in subsequent operations.

**Important Notes**:
- The registration data is automatically removed after the expiration time (1 hour).
- This function is intended for initiating form-based workflows and should be followed by further actions, such as validating or handling responses.
