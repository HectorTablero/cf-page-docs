---
title: Utils Worker Entrypoint Documentation
description: Documentation for the entrypoints of the Utils Worker.
---

import GenerateID from '@site/docs/workers/utils/components/GenerateID';
import EvaluateQuery from '@site/docs/workers/utils/components/EvaluateQuery';

# Utils Worker Entrypoints

The **Utils Worker** serves as a utility-focused worker that provides functions for general-purpose operations. This worker is designed to be extensible, allowing the addition of more utility functions in the future.

---

## **UtilsWorker Entrypoint**

### **`generateID(length)`**

Generates a random alphanumeric string of the specified length.

#### **Parameters**:
- `length`: The desired length of the generated ID (default is 50).

#### **Usage Example**:

```javascript showLineNumbers
const uniqueID = await UtilsWorker.generateID(25);
console.log("Generated ID:", uniqueID);
```

<GenerateID />

---

### **`evaluateQuery(obj, query)`**

Evaluates a MongoDB-like filter query against an object.

#### **Parameters**:
- `obj`: The object to be evaluated against the filter query.
- `query`: The filter query, which can be a single object or an array of queries that should all be satisfied.

#### **Usage Example**:

```javascript showLineNumbers
const user = {
    name: "John Doe",
    email: "johndoe@gmail.com"
};
const allowedEmails = ["johndoe@gmail.com"];
const hasAuth = await UtilsWorker.evaluateQuery(user, { email: { $in: allowedEmails } });
if (hasAuth) {
    ...
}
```

<EvaluateQuery />