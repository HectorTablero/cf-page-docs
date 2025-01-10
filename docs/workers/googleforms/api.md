---
title: Google Forms Worker API Documentation
description: Documentation for the API of the Cloudflare Worker that handles interactions with Google Forms.
---

# Google Forms Worker API

The **Google Forms Worker API** facilitates the integration of Google Forms with custom workflows by enabling registration, validation, and response handling. It supports secure connections and efficient communication with Google Apps Script.

---

## **Endpoints**

### **POST /googleforms/v1/register**
Registers a new Google Form with a provided key, URL, and handler.

#### **Behavior**:
1. **Rate Limiting**:
   - Ensures requests are within allowed limits based on the client's IP address.
   - Responds with `429` if the rate limit is exceeded.
2. **Registration Validation**:
   - Confirms the request originates from Google Apps Script using the `user-agent` header.
   - Associates the form with a unique registration key in the KV store.
3. **Cache Setup**:
   - Stores registration data for 10 minutes to allow for further validation.

#### **Request Body**:
- **`key`** *(Required)*: The unique registration key.
- **`code`** *(Required)*: The temporary code that Google Apps Script generated for validation.
- **`formData`** *(Required)*: Metadata about the form.

#### **Responses**:
- **`200 Registration successful`**:
  The form was registered successfully.
- **`400 Invalid request format`**:
  The request did not meet validation criteria.
- **`404 Invalid or expired key`**:
  The key was not found or has expired.
- **`429 Rate limit exceeded`**:
  Too many requests from the client.
- **`500 An error occurred during registration`**:
  An internal server error occurred.

---

### **POST /googleforms/v1/validate**
Validates a Google Form registration by checking the code and ensuring the URL matches the fixed URL.

#### **Behavior**:
1. **Rate Limiting**:
   - Ensures validation requests are within limits.
2. **Validation Process**:
   - Checks the provided key and code against stored registration data.
   - Confirms the URL matches the fixed URL for the registration.
3. **Data Persistence**:
   - On success, stores form data for response handling and deletes registration data.

#### **Request Body**:
- **`key`** *(Required)*: The unique registration key.
- **`code`** *(Required)*: The validation code.

#### **Responses**:
- **`200 Validation successful`**:
  The form was validated successfully.
- **`400 Invalid code`**:
  The provided validation code did not match.
- **`400 URL mismatch`**:
  The provided URL does not match the fixed URL.
- **`404 Invalid or expired key`**:
  The key was not found or has expired.
- **`429 Rate limit exceeded`**:
  Too many requests from the client.
- **`500 An error occurred during validation`**:
  An internal server error occurred.

---

### **POST /googleforms/v1/response**
Handles form submissions by calling the registered handler with the form data.

#### **Behavior**:
1. **Response Validation**:
   - Ensures the request originates from the correct Google Apps Script.
   - Matches the `appsScriptId` with the registered handler.
2. **Custom Handler Execution**:
   - Calls the specified handler to process the form response.
3. **Error Handling**:
   - Responds with appropriate error codes if validation fails.

#### **Request Body**:
- **`respondentEmail`** *(Optional - defaults to `""`)*: The email of the person who sent the response, if the form is configured to collect emails.
- **`responses`** *(Required)*: Array with responses:
  - **`id`** *(Required)*: The id of the question this response references.
  - **`value`** *(Required)*: The value submitted:

#### **Responses**:
- **`200 Response handled`**:
  The form response was processed successfully.
- **`404 Resource not found`**:
  The registration data or handler was not found.
- **`500 An error occurred while handling the response`**:
  An internal server error occurred.

---

### **GET /googleforms/\{registrationId\}**
Serves an HTML page (`setupPage`) that walks users through connecting a Google Form.

#### **Behavior**:
1. Fetches registration data associated with the provided `registrationId`.
2. Returns an HTML setup page populated with the fixed URL and registration key.

#### **Query Parameters**:
- **`registrationId`** *(Required)*: The unique registration ID.

#### **Responses**:
- **`200 OK`**:
  The HTML setup page is returned.
- **`404 Resource not found`**:
  No registration data was found for the provided ID.

---

## **Error Handling**
The API provides standard responses for unexpected issues:
- **`405 Method not allowed`**:
  The HTTP method is not supported for the endpoint.
- **`500 An unexpected error occurred`**:
  A server-side error occurred.

---

## **Developer Notes**
- Use the `POST` endpoints for registering, validating, and handling form submissions.
- The `GET` endpoint provides users with an easy-to-follow setup page for connecting their Google Forms.
- Ensure rate limits are appropriately configured to avoid abuse.
- The `corsHeaders` object enables cross-origin requests for flexibility in form integrations.

---

## **Related Documentation**
- [Entrypoints](./entrypoints): Describes the worker’s structure and available methods.
- [Google Apps Script](https://developers.google.com/forms/api/guides): Documentation on using Google Apps Script for Google Forms.
