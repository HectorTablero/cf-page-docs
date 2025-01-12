---
title: Actions Worker Documentation
description: Documentation for the entrypoints of the Actions Worker.
---

# Actions Worker Entrypoint

The **Actions Worker** provides an interface for scheduling and executing specific actions via handlers. Actions are stored in a KV namespace and processed when accessed.

---

## **ActionsWorker Entrypoint**

### **`addNewAction(handlername, params, ttl = null)`**

Creates a new action in the KV namespace for later execution.

#### **Parameters**:
- `handlername` *(string, required)*:
  The name of the handler responsible for processing the action.
  
- `params` *(object, required)*:
  An object containing parameters to be passed to the handler when the action is executed. These parameters must be serializable to JSON.
  
- `ttl` *(number, optional)*:
  Time-to-live for the action in minutes. If provided, the action will expire after the specified duration. If omitted, the action persists indefinitely until manually deleted.

#### **Returns**:
- A `key` *(string)* that uniquely identifies the created action in the KV namespace. This key can be used to trigger the action.

#### **Usage Example**:

```javascript showLineNumbers
const worker = new ActionsWorker();
const handlername = "esn-recruitment";
const params = { action: "allowChange", newData: { ... } };
const ttl = 60; // Action expires in 60 minutes

const actionKey = await worker.addNewAction(handlername, params, ttl);

console.log(`The action can be executed from: https://workers.tablerus.es/actions/${actionKey}`);
```
