---
title: Email Worker Entrypoint Documentation
description: Documentation for the entrypoint functions available for use in a Cloudflare Worker, integrated with Brevo.
---

# Cloudflare Email Worker Entrypoint

This document details the **entrypoint functions** accessible to users when working with this Cloudflare Worker. Functions outside the entrypoint are documented separately and should only be used for internal purposes or by developers maintaining the system.

---

## **User-Accessible Entrypoint Functions**

### **`EmailWorker.sendEmail`**
Sends an email using provided parameters, supporting dynamic content retrieval from a KV store.

#### **Parameters**:
- **`sender`**: *(Required)* Object `{ name: string, email: string }`
  - Example: `{ name: "Support", email: "support@example.com" }`
- **`to`**: *(Required)* Array of recipients, each as `{ name: string, email: string }`
  - Example: `[{ name: "Customer", email: "customer@example.com" }]`
- **`replyTo`**: *(Optional)* Object `{ name: string, email: string }`. Defaults to `noreply`.
- **`subject`**: *(Required)* String representing the email subject.
- **`htmlContent`**: *(Optional)* HTML content for the email. Can be:
  - A string.
  - An object `{ key: string }` to retrieve content from KV storage.
- **`textContent`**: *(Optional)* Plain text content for the email. Can be:
  - A string.
  - An object `{ key: string }` to retrieve content from KV storage.

#### **Returns**:
An object with possible errors and warnings.

#### **Example Use Case**:
Send an email with HTML content retrieved from KV storage:
```javascript
await emailWorker.sendEmail(
  { name: "Admin", email: "admin@example.com" },
  [{ name: "User", email: "user@example.com" }],
  null,
  "Important Notification",
  { key: "htmlContentKey" } // Retrieves content from KV storage
);
```

---

### **`EmailWorker.sendEmailFromTemplate`**
Sends an email using a predefined Brevo template, with optional dynamic parameters.

#### **Parameters**:
- **`templateId`**: *(Required)* Integer representing the template ID in Brevo.
- **`sender`**: *(Required)* Object `{ name: string, email: string }`
  - Example: `{ name: "Support", email: "support@example.com" }`
- **`to`**: *(Required)* Array of recipients, each as `{ name: string, email: string }`
  - Example: `[{ name: "Customer", email: "customer@example.com" }]`
- **`replyTo`**: *(Optional)* Object `{ name: string, email: string }`. Defaults to `noreply`.
- **`subject`**: *(Required)* String representing the email subject.
- **`params`**: *(Optional)* Object containing dynamic parameters for the template.
  - Keys like `htmlContent` can also be an object `{ key: string }`.

#### **Returns**:
An object with possible errors and warnings.

#### **Example Use Case**:
Send an email using a template with dynamic content:
```javascript
await emailWorker.sendEmailFromTemplate(
  1,
  { name: "Support", email: "support@example.com" },
  [{ name: "Customer", email: "customer@example.com" }],
  null,
  "Welcome!",
  { htmlContent: { key: "welcomeHtmlKey" }, title: "Welcome to Our Service" }
);
```

---

## **Internal and Supporting Functions**

The following functions are intended for internal use. If you're maintaining or extending the Worker, refer to these descriptions in the supplementary file.

### Internal Functions (Brief Overview)
- **`getContentFromKey`**: Fetches and deletes content from a KV store.
- **`validateEmail`**: Validates email address format.
- **`validateData`**: Ensures all parameters meet required formats.
- **`getBaseEmail`**: Constructs a base email object.
- **`sendEmailWithData`**: Handles the API call to Brevo.

For more details, refer to the [Internal Functions Documentation](./functions).

---

## **Brevo Integration Notes**
This Worker uses the [Brevo SMTP API](https://developers.brevo.com/reference/sendtransacemail). To set it up:
1. Obtain your Brevo API Key.
2. Set it as the `BREVO_API_KEY` environment variable.
3. Ensure email content complies with Brevo's guidelines.

For further assistance, see [Brevo API Documentation](https://developers.brevo.com/).
