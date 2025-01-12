import React, { useState, useEffect } from "react";
import InteractiveComponent from "../../../../src/components/InteractiveComponent";
import BrowserOnly from "@docusaurus/BrowserOnly"; // Import BrowserOnly for client-side rendering
import "./EvaluateQuery.css"; // Import custom styles

const THEME = "material-palenight";

// The CodeMirror library and styles are now only imported inside the BrowserOnly component
export default function EvaluateQuery() {
    const [result, setResult] = useState(true);
    const [objectCode, setObjectCode] = useState(`const obj = {
  name: "John Doe",
  age: 30,
  hobbies: ["reading", "sports", "coding"],
  address: {
    city: "New York",
    zip: "10001"
  },
  friends: [
    { name: "Alice", age: 25 },
    { name: "Charlie", age: 17 }
  ],
  preferences: {
    theme: "dark",
    notifications: true
  }
}`);
    const [queryCode, setQueryCode] = useState(`const query = [
  {
    age: { $gte: 20 }
  }
]`);

    function readVar(obj, path) {
        try {
            return path.split(".").reduce((acc, part) => {
                if (part.includes("[")) {
                    const [key, index] = part.split(/[\[\]]/).filter(Boolean);
                    return acc[key][parseInt(index, 10)];
                }
                return acc[part];
            }, obj);
        } catch (error) {
            return undefined;
        }
    }

    function evaluateQuery(obj, query, originalObj = null) {
        if (!originalObj) originalObj = obj;

        if (Array.isArray(query)) return query.every((subFilter) => evaluateQuery(obj, subFilter, originalObj));
        if (typeof query !== "object") return false;

        for (let key in query) {
            let value = query[key];

            // Handle dynamic value substitution
            if (typeof value === "string" && value.startsWith("$$")) value = readVar(originalObj, value.slice(2));

            if (key === "$and") {
                if (!Array.isArray(value)) throw new Error("$and requires an array, but got " + typeof value);
                if (!value.every((subFilter) => evaluateQuery(obj, subFilter, originalObj))) return false;
            } else if (key === "$or") {
                if (!Array.isArray(value)) throw new Error("$or requires an array, but got " + typeof value);
                if (!value.some((subFilter) => evaluateQuery(obj, subFilter, originalObj))) return false;
            } else if (key === "$not") {
                if (typeof value !== "object" || value === null) throw new Error("$not requires an object, but got " + typeof value);
                if (evaluateQuery(obj, value, originalObj)) return false;
            } else if (key.startsWith("$")) {
                switch (key) {
                    case "$exists":
                        if (readVar(originalObj, value) === undefined) return false;
                        break;
                    case "$re":
                    case "$regex":
                        if (!new RegExp(value).test(obj)) return false;
                        break;
                    case "$eq":
                        if (typeof obj === "object" && obj !== null) {
                            if (JSON.stringify(obj) !== JSON.stringify(value)) return false;
                        } else if (obj !== value) return false;
                        break;
                    case "$ne":
                        if (obj === value) return false;
                        break;
                    case "$gt":
                        if (!(obj > value)) return false;
                        break;
                    case "$gte":
                        if (!(obj >= value)) return false;
                        break;
                    case "$lt":
                        if (!(obj < value)) return false;
                        break;
                    case "$lte":
                        if (!(obj <= value)) return false;
                        break;
                    case "$in":
                        if (!Array.isArray(value)) throw new Error("$in requires an array, but got " + typeof value);
                        if (!value.includes(obj)) return false;
                        break;
                    case "$nin":
                        if (!Array.isArray(value)) throw new Error("$nin requires an array, but got " + typeof value);
                        if (value.includes(obj)) return false;
                        break;
                    default:
                        throw new Error(`Unsupported operator: ${key}`);
                }
            } else {
                const nestedValue = key.includes(".") || key.includes("[") ? readVar(obj, key) : obj[key];

                if (typeof value === "object" && value !== null) {
                    if (!evaluateQuery(nestedValue, value, originalObj)) return false;
                } else {
                    if (nestedValue !== value) return false;
                }
            }
        }

        return true;
    }

    const handleEvaluate = () => {
        try {
            const objectToEvaluate = eval(`(${objectCode.substring("const obj = ".length)})`);
            const query = eval(`(${queryCode.substring("const query = ".length)})`);
            const result = evaluateQuery(objectToEvaluate, query);
            setResult(result);
        } catch (error) {
            setResult("Error in evaluation: " + error.message);
        }
    };

    useEffect(() => {
        handleEvaluate();
    }, [objectCode, queryCode]);

    return (
        <InteractiveComponent>
            <div className="evaluate-query">
                <h4 style={{ marginTop: 0, marginBottom: "0.5rem" }}>Edit Object:</h4>
                <BrowserOnly>
                    {() => {
                        const { Controlled: CodeMirror } = require("react-codemirror2");
                        require("codemirror/lib/codemirror.css");
                        require("codemirror/mode/javascript/javascript");
                        require("codemirror/theme/material-palenight.css");

                        return (
                            <CodeMirror
                                value={objectCode}
                                options={{
                                    mode: "javascript",
                                    theme: THEME,
                                    lineNumbers: true,
                                    readOnly: false,
                                    tabSize: 2
                                }}
                                onBeforeChange={(editor, data, value) => {
                                    if (!value.startsWith("const obj = {\n")) {
                                        editor.setValue(objectCode);
                                        return;
                                    }

                                    setObjectCode(value);
                                }}
                            />
                        );
                    }}
                </BrowserOnly>

                <h4 style={{ marginTop: "1rem", marginBottom: "0.5rem" }}>Edit Query:</h4>
                <BrowserOnly>
                    {() => {
                        const { Controlled: CodeMirror } = require("react-codemirror2");
                        require("codemirror/lib/codemirror.css");
                        require("codemirror/mode/javascript/javascript");
                        require("codemirror/theme/material-palenight.css");

                        return (
                            <CodeMirror
                                value={queryCode}
                                options={{
                                    mode: "javascript",
                                    theme: THEME,
                                    lineNumbers: true,
                                    readOnly: false,
                                    tabSize: 2
                                }}
                                onBeforeChange={(editor, data, value) => {
                                    if (!value.startsWith("const query = [\n")) {
                                        editor.setValue(queryCode);
                                        return;
                                    }

                                    setQueryCode(value);
                                }}
                            />
                        );
                    }}
                </BrowserOnly>

                <p style={{ marginBottom: 0 }}>
                    <strong>Result: </strong>
                    <code>{result !== null ? result.toString() : "Not evaluated yet"}</code>
                </p>
            </div>
        </InteractiveComponent>
    );
}
