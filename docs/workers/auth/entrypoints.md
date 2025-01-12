---
title: Auth Worker Entrypoint Documentation
description: Documentation for the entrypoints of the Auth Worker.
---

# Auth Worker Entrypoint

The **Auth Worker** provides authentication functionality, including session verification and OAuth integration. This worker streamlines the process of verifying user authentication and managing user sessions.

---

## **AuthWorker Entrypoint**

### **`verifyAuth(oauthId, properties = null)`**

Verifies a user's authentication session and checks optional user properties.

**Parameters**:
- `oauthId`: The OAuth ID associated with the user session. If `null` or invalid, the user is considered unauthenticated.
- `properties` *(optional)*: A query object specifying conditions to validate against the user's data (e.g., role, permissions). Uses a MongoDB-like query syntax.

**Returns**:
An object containing the following keys:
- `auth`: A boolean indicating whether the user is authenticated.
- `session`: A boolean indicating whether the session exists.
- `data`: *(optional)* The user's data if authentication is successful.

**Details**:
1. Checks if the provided `oauthId` corresponds to an active session in the **AUTH_SESSIONS** KV namespace.
2. Retrieves the user data associated with the session from the **AUTH_USERS** KV namespace.
3. If `properties` is provided, validates the user data against the specified conditions using the [**Utils Worker**'s `evaluateQuery`](/workers/utils/entrypoints#evaluatequeryobj-query) function.
4. Returns a result object indicating the authentication status and user data (if authenticated).

**Usage Example**:

```javascript showLineNumbers
const oauthId = "exampleOAuthId12345";
const requiredProperties = { role: { $eq: "admin" } };

const authResult = await AuthWorker.verifyAuth(oauthId, requiredProperties);

if (authResult.auth) {
    console.log("User is authenticated:", authResult.data);
} else if (authResult.session) {
    console.log("Session exists, but user does not meet property conditions.");
} else {
    console.log("User is not authenticated.");
}
```

**Important Notes**:
- Sessions are stored with a time-to-live (TTL) in the **AUTH_SESSIONS** namespace and expire automatically after the designated period.