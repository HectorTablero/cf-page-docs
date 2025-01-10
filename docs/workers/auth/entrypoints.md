---
title: Auth Worker Entrypoint Documentation
description: Documentation for the entrypoints of the Cloudflare Worker.
---

# Auth Worker Entrypoints

The `verifyAuth` method in the **AuthWorker** validates a user's authentication and session status using flexible conditions. It provides powerful, MongoDB-style query operators for checking user attributes (`properties`) and supports logical operations to combine multiple criteria.

---

## **Overview**

The `verifyAuth` method checks:
1. If a valid OAuth session exists for the user (`session` status).
2. Whether the user satisfies all specified authentication criteria (`auth` status).

This method supports **exact matches**, **comparison operators**, and **logical conditions** for property validation, making it highly adaptable to different use cases.

---

## **Parameters**

### **`oauthId`** *(Required)*
The OAuth session ID stored in the `AUTH_SESSIONS` KV namespace. This ID is used to look up the user's session and associated data.

### **`organization`** *(Optional)*  
Specifies the organization(s) the user must belong to for authentication.  
- **String**: User must belong to the specified organization.
- **Array**: User must belong to one of the specified organizations.

### **`properties`** *(Optional)*  
Defines key-value pairs that must match the user’s attributes. Each key can include one or more query operators.

#### **Supported Operators**:
- **`$eq`**: Matches values equal to the specified value.  
- **`$ne`**: Matches values not equal to the specified value.  
- **`$gt`**: Matches values greater than the specified value.  
- **`$gte`**: Matches values greater than or equal to the specified value.  
- **`$lt`**: Matches values less than the specified value.  
- **`$lte`**: Matches values less than or equal to the specified value.  
- **`$in`**: Matches any of the specified values in an array.  
- **`$nin`**: Matches none of the specified values in an array.  
- **`$not`**: Inverts the effect of a query predicate.  
- **`$or`**: Matches if **any** condition in an array is true.

Each property condition must evaluate to `true` for the user to be authenticated (`auth: true`).

---

## **Returns**

The method returns an object with the following properties:
- **`auth`**:  
  Boolean indicating if the user satisfies all authentication criteria (`organization`, `properties`, etc.).
- **`session`**:  
  Boolean indicating if the user has a valid OAuth session, regardless of whether they meet the authentication criteria.
- **`data`** *(Optional)*:  
  The user’s data, returned only if `auth` is `true`.

---

## **Behavior**

1. **Session Validation**:  
   - Checks if the `oauthId` exists in the `AUTH_SESSIONS` KV namespace.  
   - If no session exists, both `auth` and `session` are `false`.

2. **Organization Validation** *(Optional)*:  
   - If `organization` is provided, the user’s organization must match the specified value(s) for `auth` to be `true`.

3. **Property Validation** *(Optional)*:  
   - Each property condition must evaluate to `true`. If multiple conditions are provided for a single property, **all must be true**.

---

## **Examples**

### **1. Basic Validation**
Verify if the user has a valid session without additional conditions:
```javascript
const { auth } = await authWorker.verifyAuth("oauthId12345");
```

---

### **2. Organization Validation**
Verify if the user belongs to a specific organization:
```javascript
const { auth } = await authWorker.verifyAuth("oauthId12345", "example.com");
```

Verify if the user belongs to one of several organizations:
```javascript
const { auth } = await authWorker.verifyAuth("oauthId12345", ["example.com", "test.org"]);
```

---

### **3. Property Validation**
#### Exact Match (`$eq`):
Check if the user has a specific role:
```javascript
const { auth } = await authWorker.verifyAuth("oauthId12345", null, { role: { "$eq": "admin" } });
```

#### Greater Than or Equal To (`$gte`) and Less Than (`$lt`):
Check if the user’s age is between 18 and 30:
```javascript
const { auth } = await authWorker.verifyAuth("oauthId12345", null, { age: [{ "$gte": 18 }, { "$lt": 30 }] });
```

#### Inclusion (`$in`):
Check if the user is from a specific country:
```javascript
const { auth } = await authWorker.verifyAuth("oauthId12345", null, { country: { "$in": ["Spain", "France", "Germany"] } });
```

#### Exclusion (`$nin`):
Ensure the user is not from a specific department:
```javascript
const { auth } = await authWorker.verifyAuth("oauthId12345", null, { department: { "$nin": ["HR", "Finance"] } });
```

---

### **4. Combined Conditions**
#### Logical NOT (`$not`):
Check if the user does **not** have a suspended status:
```javascript
const { auth } = await authWorker.verifyAuth("oauthId12345", null, { status: { "$not": { "$eq": "suspended" } } });
```

#### Logical OR (`$or`):
Check if the user’s role is either "admin" or "editor":
```javascript
const { auth } = await authWorker.verifyAuth("oauthId12345", null, { role: { "$or": [{ "$eq": "admin" }, { "$eq": "editor" }] } });
```

#### Multiple Conditions Per Property:
Verify if the user is between 18 and 65 years old and from specific countries:
```javascript
const { auth } = await authWorker.verifyAuth("oauthId12345", null, {
  age: [{ "$gte": 18 }, { "$lte": 65 }],
  country: { "$in": ["USA", "Canada", "UK"] }
});
```

---

## **Developer Notes**
- The `auth` property requires all conditions (organization, properties) to be met for a user to be authenticated.
- The `session` property reflects whether the user has a valid OAuth session, even if they don’t meet the criteria for `auth`.
- This flexibility allows fine-grained control over authentication requirements.

---

## **Related Documentation**
- [API](./api): Overview of the worker's endpoints.
