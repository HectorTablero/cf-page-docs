---
title: Auth Worker API Documentation
description: Documentation for the API of the Cloudflare Worker.
---

# Auth Worker API

This document provides an overview of the **Auth Worker API**, which manages user authentication via Google OAuth. The API supports login, logout, and session management, interacting with Cloudflare KV for secure session handling.

---

## **API Overview**

The Auth Worker exposes endpoints for Google OAuth-based authentication. These endpoints enable login, redirect handling, and logout, ensuring secure and seamless integration with Google authentication services.

### **Endpoints**

#### **`GET /auth/login`**
Redirects the user to the Google OAuth login page or verifies an existing session.

##### **Behavior**:
1. **Session Check**:
   - If a valid session cookie (`oauthId`) exists, the user is either redirected to a custom URL or informed they are already logged in.
2. **Redirect to Google OAuth**:
   - If no session exists, the user is redirected to the Google OAuth consent screen.

##### **Query Parameters**:
- `redirect`: *(Optional)* Custom URL to redirect to after login.

##### **Responses**:
- **`200 Already logged in`**:
  Indicates the user already has an active session.
- **`302 Redirect to Google OAuth`**:
  Redirects the user to the Google OAuth consent screen.

##### **Example**:
```bash
curl -X GET "https://your-worker-url.com/auth/login?redirect=https://example.com/dashboard"
```

---

#### **`GET /auth/redirect`**
Handles the Google OAuth redirect, exchanging the authorization code for an access token and storing the user session.

##### **Behavior**:
1. **Authorization Code Exchange**:
   - Exchanges the `code` for an access token using Google's token API.
2. **User Info Retrieval**:
   - Fetches user details from Google using the access token.
3. **Session Storage**:
   - Stores the session and user details in Cloudflare KV, sets the `oauthId` cookie.
4. **Redirect or Success**:
   - Redirects to the custom URL (if provided) or responds with a success message.

##### **Query Parameters**:
- `code`: *(Required)* Authorization code returned by Google.
- `state`: *(Optional)* Custom redirect URL.

##### **Responses**:
- **`200 Login successful`**:
  Indicates the user has successfully logged in.
- **`302 Redirect`**:
  Redirects the user to the provided custom URL.
- **`400 Missing authorization code`**:
  Indicates the `code` parameter was not provided.
- **`401 Authorization failure`**:
  Indicates an error during token exchange or user info retrieval.

##### **Example**:
```bash
curl -X GET "https://your-worker-url.com/auth/redirect?code=authCode&state=https://example.com/dashboard"
```

---

#### **`GET /auth/logout`**
Logs the user out by deleting the session and clearing the session cookie.

##### **Behavior**:
1. Deletes the session associated with the `oauthId` cookie.
2. Clears the `oauthId` cookie.
3. Redirects to the login page or custom URL (if specified).

##### **Query Parameters**:
- `login`: *(Optional)* If `1`, redirects to the login page.
- `redirect`: *(Optional)* Custom URL to redirect to after logout.

##### **Responses**:
- **`200 Logged out`**:
  Indicates the user has been logged out.
- **`302 Redirect`**:
  Redirects to the login page or custom URL.

##### **Example**:
```bash
curl -X GET "https://your-worker-url.com/auth/logout?login=1&redirect=https://example.com/home"
```

---

### **Error Handling**
The Auth Worker responds with appropriate status codes for various errors:
- **`404 Not Found`**:
  Returned when accessing an unknown endpoint.
- **`500 Internal Server Error`**:
  Indicates a server-side issue.

---

## **Related Documentation**
- [Entrypoints](./entrypoints): Details the structure of the worker's entrypoint and its methods.
