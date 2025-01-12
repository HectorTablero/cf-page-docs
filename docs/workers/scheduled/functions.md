---
title: Scheduled Worker Function Documentation
description: Documentation for cron triggers of the Scheduled Worker.
---

# Scheduled Worker Functions

The **Scheduled Worker** is a cron-driven script that automates certain tasks. Each cron trigger corresponds to specific functions that the worker executes. Below is the documentation for the cron triggers and their associated functionality.

---

## **Cron Trigger: `0 9 * * *`**

This cron trigger executes every day at 09:00 AM.

### **`checkFinancialAid(env)`**

Fetches financial aid opportunities from the certain websites and sends email notifications for new entries.

#### **Description**:
The function performs the following tasks:
- Fetches open financial aid applications from the UAM website.
- Compares the fetched list with previously recorded applications to identify new entries.
- Sends an email notification with details of new financial aid applications.
- Updates the stored list of applications to avoid duplicate notifications.

#### **Parameters**:
- `env`: Contains environment bindings and configuration, including:
  - `MISC`: KV for storing application state.
  - `EMAIL_SERVICE`: Service for sending emails (see the [docs](/workers/email/entrypoints)).

#### **Usage Example**:
```javascript showLineNumbers
await checkFinancialAid(env);
```
