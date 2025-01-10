---
title: Scheduled Worker Function Documentation
description: Comprehensive documentation for internal functions used in the Cloudflare Email Worker.
---

# Scheduled Worker Functions

The **Scheduled Worker** periodically executes certain functions. This document explains the internal code used to achieve this functionality.

---

## **Function Overview**

### **`fetchUAMFinancialAid()`**
Fetches and parses financial aid opportunities from the UAM website.

#### **Behavior**:
1. Sends a request to the UAM financial aid page.
2. Parses the HTML response to extract information about open applications:
   - **Title**: The name of the financial aid opportunity.
   - **URL**: A link to more details about the opportunity.
   - **Deadline**: The deadline for application submissions.
3. Filters and collects opportunities where the application window is open.

#### **Returns**:
- An array of financial aid opportunities with the following structure:
  ```json
  [
    {
      "source": "UAM",
      "title": "Scholarship Title",
      "url": "https://www.uam.es/link-to-scholarship",
      "deadline": "DD/MM/YYYY"
    }
  ]
  ```

#### **Example**:
```javascript
const openApplications = await fetchUAMFinancialAid();
console.log(openApplications);
// Output: [{ source: "UAM", title: "Scholarship A", url: "...", deadline: "01/01/2024" }]
```

---

### **`checkFinancialAid(env)`**
Compares newly fetched financial aid opportunities with previously stored data, identifies new opportunities, and sends email notifications.

#### **Behavior**:
1. Fetches new financial aid opportunities using `fetchUAMFinancialAid()`.
2. Retrieves previously stored financial aid keys from the KV namespace (`scheduled-financialaid`).
3. Compares the new opportunities against stored keys to identify newly added opportunities.
4. If new opportunities are found:
   - Stores updated keys in the KV namespace.
   - Generates an HTML email summarizing the new opportunities.
   - Sends the email to specified recipients using the email service.

#### **Parameters**:
- **`env`**: The environment bindings, including:
  - `MISC`: KV namespace for storing data.
  - `EMAIL_SERVICE`: Service for sending emails.

#### **Returns**:
- The HTML content of the notification email if new opportunities are found.
- No output if there are no new opportunities.

#### **Example**:
```javascript
const htmlNotification = await checkFinancialAid(env);
if (htmlNotification) console.log("Email sent with the following content:", htmlNotification);
```

---

### **Email Notification Details**
If new financial aid opportunities are found, the function:
1. Constructs an HTML email summarizing the new opportunities:
   - Groups opportunities by source.
   - Displays the title, deadline, and a link to each opportunity.
2. Sends the email to a predefined list of recipients.

**Sample HTML Structure**:
```html
<div>
  <div>
    <h2>UAM</h2>
    <hr />
    <blockquote>
      <p><strong>Scholarship A</strong> <span>01/01/2024</span></p>
      <a href="https://www.uam.es/link-to-scholarship">https://www.uam.es/link-to-scholarship</a>
    </blockquote>
  </div>
</div>
```

---

### **Usage in Scheduled Events**
The worker uses the `checkFinancialAid` function in response to a scheduled event.

#### **`scheduled(event, env, ctx)`**
Runs the `checkFinancialAid` function on a defined schedule.

#### **Behavior**:
- Listens for a cron event.
- Executes the `checkFinancialAid` function using `ctx.waitUntil` to ensure completion.

#### **Example Cron Schedule**:
- **`0 9 * * *`**: Runs daily at 9:00 AM.

#### **Code Reference**:
```javascript
async scheduled(event, env, ctx) {
  switch (event.cron) {
    case "0 9 * * *":
      ctx.waitUntil(checkFinancialAid(env));
      break;
  }
}
```

---

## **Developer Notes**
- Ensure the email service is properly configured in the environment bindings (`EMAIL_SERVICE`).
- The `MISC` KV namespace must be accessible for storing and retrieving financial aid data.
- Modify the cron schedule in the `scheduled` method as needed for your use case.
