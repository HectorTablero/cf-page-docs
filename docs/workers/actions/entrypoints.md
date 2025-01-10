---
title: Actions Worker Entrypoint Documentation
description: Documentation for the entrypoints of the Cloudflare Worker.
---

# Actions Worker Entrypoints

This document details the **entrypoints** in the Actions Worker, which facilitate the interaction between the API and internal functions. Entrypoints are responsible for handling incoming requests, routing them appropriately, and providing responses.

---

## **User-Accessible Entrypoint Functions**

### **`ActionsWorker.addNewAction(handlername, params, ttl)`**:
   - Creates a new action and stores it in the KV store.
   - Generates a unique key for accessing the action.

   **Parameters**:
   - `handlername`: Name of the handler (e.g., `"googleforms"`).
   - `params`: Parameters for the handler, serialized to JSON.
   - `ttl`: *(Optional)* Time-to-live in minutes for the action.

   **Returns**:
   - The unique key for the action.

   **Code Reference**:
   ```javascript title="class ActionsWorker"
   async addNewAction(handlername, params, ttl = null) {
     const key = await this.env.UTILS.generateID(50);
     const options = {};
     if (ttl) options.expirationTtl = ttl * 60;
     await this.env.ACTIONS_KV.put(key, JSON.stringify({ v: 1, handlername, params }), options);
     return key;
   }
   ```

#### **Usage Example**:
```javascript
const actionKey = await ActionsWorker.addNewAction("googleforms", { formId: "12345" }, 60);
console.log("Action Key:", actionKey);
```

---

## **Related Documentation**
- [API](./api): Details the external behavior of the Actions Worker, including available endpoints and response statuses.
