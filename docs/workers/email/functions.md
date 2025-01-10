---
title: Email Worker Function Documentation
description: Comprehensive documentation for internal functions used in the Cloudflare Email Worker.
---

# Cloudflare Email Worker Functions

This document provides detailed descriptions of the internal functions used within the Cloudflare Email Worker. These functions support the main entrypoint operations and are intended for developers maintaining or extending the worker.

---

## **Function List**

### **`getContentFromKey(db, key)`**
Fetches content from a Cloudflare KV store and deletes the key after retrieval.

#### **Parameters**:
- **`db`**: The Cloudflare KV namespace to fetch the data from.
- **`key`**: The key identifying the data in the KV store.

#### **Returns**:
- The content as a string, or an empty string (`""`) if an error occurs.

#### **Example**:
Retrieve HTML content from KV storage:
```javascript
const htmlContent = await getContentFromKey(TEMP_KV, "htmlContentKey");
```

---

### **`validateEmail(email)`**
Checks if an email address is formatted correctly.

#### **Parameters**:
- **`email`**: The email address to validate.

#### **Returns**:
- `true` if the email is valid.
- `false` otherwise.

#### **Example**:
```javascript
if (validateEmail("user@example.com")) {
  console.log("Valid email address");
}
```

---

### **`validateData(sender, to, replyTo, subject, htmlContent, textContent)`**
Validates the parameters for email sending, including sender, recipients, reply-to, subject, and content.

#### **Parameters**:
- **`sender`**: Object `{ name: string, email: string }`
- **`to`**: Array of recipients, each as `{ name: string, email: string }`
- **`replyTo`**: Object `{ name: string, email: string }`
- **`subject`**: String representing the email subject.
- **`htmlContent`**: String or object `{ key: string }` for the HTML content.
- **`textContent`**: String or object `{ key: string }` for the plain text content.

#### **Returns**:
- An array of error objects if validation fails.
- An empty array (`[]`) if all data is valid.

#### **Example**:
```javascript
const errors = validateData(
  { name: "Admin", email: "admin@example.com" },
  [{ name: "User", email: "user@example.com" }],
  { name: "Support", email: "support@example.com" },
  "Subject",
  "<p>Hello, User!</p>",
  "Hello, User!"
);
if (errors.length > 0) console.error(errors);
```

---

### **`getBaseEmail(sender, to, replyTo, subject)`**
Constructs a base email object with sender, recipient, and reply-to details.

#### **Parameters**:
- **`sender`**: Object `{ name: string, email: string }`
- **`to`**: Array of recipients, each as `{ name: string, email: string }`
- **`replyTo`**: Object `{ name: string, email: string }`
- **`subject`**: String representing the email subject.

#### **Returns**:
- A base email object suitable for use in the Brevo API.

#### **Example**:
```javascript
const emailData = getBaseEmail(
  { name: "Admin", email: "admin@example.com" },
  [{ name: "User", email: "user@example.com" }],
  { name: "Support", email: "support@example.com" },
  "Important Update"
);
```

---

### **`sendEmailWithData(data, apiKey)`**
Sends an email using the Brevo SMTP API.

#### **Parameters**:
- **`data`**: The email data object, including sender, recipients, subject, and content.
- **`apiKey`**: Your Brevo API key.

#### **Returns**:
- An object containing potential errors and warnings.

#### **Example**:
```javascript
const response = await sendEmailWithData(emailData, "your-brevo-api-key");
if (!response.errors.length) {
  console.log("Email sent successfully!");
} else {
  console.error("Failed to send email:", response.errors);
}
```

---

## **Developer Notes**

- These functions are designed to support the `sendEmail` and `sendEmailFromTemplate` methods in the entrypoint. They are not intended to be exposed externally.
- Use `validateData` before constructing or sending emails to ensure all parameters meet the required format.
- Ensure that the `BREVO_API_KEY` environment variable is securely stored and accessible.

---

For details on user-accessible entrypoints, refer to the [Email Worker Entrypoints Documentation](./entrypoints).
