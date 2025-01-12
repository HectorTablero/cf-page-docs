import React, { useState } from "react";
import InteractiveComponent from "../../../../src/components/InteractiveComponent";

export default function GenerateID() {
    const [length, setLength] = useState(50);
    const [id, setId] = useState(generateID(length));

    function generateID(length = 50) {
        let result = "";
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }

    const handleGenerate = async () => {
        const newID = generateID(length);
        setId(newID);
    };

    return (
        <InteractiveComponent>
            <div>
                <input
                    type="range"
                    min="8"
                    max="128"
                    value={length}
                    onChange={(e) => {
                        setLength(Number(e.target.value));
                        handleGenerate();
                    }}
                />
                <p>
                    <strong>Length: </strong>
                    {length}
                </p>
                <p style={{ marginBottom: 0 }}>
                    <strong>Generated ID: </strong>
                    <code>{id}</code>
                </p>
            </div>
        </InteractiveComponent>
    );
}
