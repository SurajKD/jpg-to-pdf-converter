"use client";
import { trackButton } from "../lib/utils";

export function OpenConverterButton({name}: {name: string}) {
    return (
        <button
            onClick={() => trackButton(name)}
            className="btn"
            style={{
                background: "#0b74de",
                color: "#fff",
                padding: "10px 16px",
                borderRadius: "8px",
                fontSize: "16px",
                cursor: "pointer",
            }}
        >
            {name}
        </button>
    );
}
