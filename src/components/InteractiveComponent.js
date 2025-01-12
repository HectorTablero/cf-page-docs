import React from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";

export default function InteractiveComponent({ children }) {
    return (
        <BrowserOnly>
            {() => {
                <div style={{ backgroundColor: "var(--interactive-component-background-color)", padding: "var(--interactive-component-padding)", borderRadius: "var(--ifm-global-radius)" }}>
                    <h3>Interactive Demo</h3>
                    {children}
                </div>;
            }}
        </BrowserOnly>
    );
}
