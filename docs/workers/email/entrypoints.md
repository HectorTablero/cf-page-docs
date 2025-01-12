---
title: Email Worker Entrypoint Documentation  
description: Documentation for the entrypoints of the Email Worker.  
---

# Email Worker Entrypoints  

The **Email Worker** handles email-related operations such as sending emails, validating email data, and managing email templates. This worker interacts with external APIs for email delivery and provides extensible functionality.  

---

## **EmailWorker Entrypoints**  

### **`sendEmail(sender, to, replyTo, subject, htmlContent, textContent)`**  

Sends an email with the provided details. This method supports both HTML and plain text content, offering flexibility for email formatting.  

#### **Parameters**:  
- `sender`: An object containing the sender's name and email.
- `to`: An array of recipient objects, each containing name and email. Supports a single recipient as well.
- `replyTo`: An object specifying the reply-to email address. Defaults to a `noreply` address if not provided.
- `subject`: The subject of the email as a string.
- `htmlContent`: Optional HTML content for the email. Can be a string or a reference to a key in a KV store.
- `textContent`: Optional plain text content for the email. Can be a string or a reference to a key in a KV store.

#### **Usage Example**:

```javascript showLineNumbers
const sender = { name: "John Doe", email: "john.doe@example.com" };
const recipients = [{ name: "Jane Smith", email: "jane.smith@example.com" }];
const subject = "Welcome to Our Service!";
const htmlContent = "<p>Thank you for joining us, Jane!</p>";

const response = await EmailWorker.sendEmail(sender, recipients, null, subject, htmlContent);
if (response.errors.length > 0) {
    console.error("Failed to send email:", response.errors);
} else {
    console.log("Email sent successfully!");
}
```

---

### **`sendEmailFromTemplate(templateId, sender, to, replyTo, subject, params)`**  

Sends an email based on a specific template. Parameters allow for customization of the template's content.  

#### **Parameters**:  
- `templateId`: The ID of the email template to use.  
- `sender`: An object containing the sender's name and email.  
- `to`: An array of recipient objects, each containing name and email. Supports a single recipient as well.  
- `replyTo`: An object specifying the reply-to email address. Defaults to a `noreply` address if not provided.  
- `subject`: The subject of the email as a string.  
- `params`: Optional template-specific parameters for customizing the email content.  

#### **Template-Specific Details**:
- **Template #1**:
  Requires `params` to include:
  - `htmlContent`: HTML content as a string.
  - `title`: A title for the email as a string.

#### **Usage Example**:  

```javascript showLineNumbers
const sender = { name: "John Doe", email: "john.doe@example.com" };
const recipients = [{ name: "Jane Smith", email: "jane.smith@example.com" }];
const subject = "Special Offer!";
const params = { htmlContent: "<p>Exclusive deal just for you!</p>", title: "Exclusive Offer" };

const response = await EmailWorker.sendEmailFromTemplate(1, sender, recipients, null, subject, params);
if (response.errors.length > 0) {
    console.error("Failed to send email from template:", response.errors);
} else {
    console.log("Email sent successfully!");
}
```

---

## **Validation and Error Handling**  

Both entrypoints perform extensive validation on input data. If validation fails, an array of errors is returned, each containing:  
- `field`: The parameter or field that failed validation.  
- `message`: A descriptive message explaining the error.  

#### **Common Validation Errors**:  
- Missing or invalid `sender`, `to`, or `replyTo`.  
- Empty or improperly formatted `subject`.  
- Missing or invalid `htmlContent` or `textContent` (for `sendEmail`).  
- Missing or improperly formatted `params` for templates.  

--- 

## Notes

**API Integration**:  
 - Emails are sent via the [Brevo API](https://developers.brevo.com/), requiring a valid API key configured in the worker environment (`BREVO_API_KEY`).