---
title: Google Forms Worker Entrypoint Documentation
description: Documentation for the entrypoints of the Cloudflare Worker  that handles interactions with Google Forms.
---

# Google Forms Worker Entrypoints

The **Google Forms Worker** entrypoints allow the registration of Google Forms connections. These entrypoints interact with the API to perform secure operations, including setting up form integrations, verifying user submissions, and executing custom handlers.

---

## **Entrypoint Overview**

### **`openRegistration(fixedUrl, handler, handlerData)`**
Creates a new registration for a Google Form, generating unique identifiers to securely track and validate the form’s connection.

#### **Parameters**:
- **`fixedUrl`** *(Required)*:  
  The base URL for validating the form’s responses.  
  Example: `"esn/recruitment"`
- **`handler`** *(Required)*:  
  The handler to process form responses (e.g., `"esn-recruitment"`).
- **`handlerData`** *(Optional)*:  
  Additional data for the handler.

#### **Behavior**:
1. Generates a unique registration ID and key.
2. Stores registration data in the `GOOGLE_FORMS` KV namespace with a TTL of 1 hour.
3. Returns the unique registration ID.

#### **Code Reference**:
```javascript
async openRegistration(fixedUrl, handler, handlerData) {
  const id = await this.env.UTILS.generateID(25);
  const key = await this.env.UTILS.generateID(50);
  await this.env.GOOGLE_FORMS.put(`registrationKey-${key}`, id, { expirationTtl: 3600 });
  await this.env.GOOGLE_FORMS.put(`registration-${id}`, JSON.stringify({ fixedUrl, handler, handlerData, key }), { expirationTtl: 3600 });
  return id;
}
```

#### **Usage Example**:
```javascript
const registrationId = await GoogleFormsWorker.openRegistration("esn/recruitment", "esn-recruitment", { id: "test" });
return Response.redirect(`https://workers.tablerus.es/googleforms/${registrationId}`);
```

---

### **Related Documentation**
- [API](./api): Details the external API endpoints for handling Google Forms.
