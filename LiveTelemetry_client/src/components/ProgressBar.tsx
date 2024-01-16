import React from "react";

// @ts-ignore
const ProgressBar = ({ percentage }) => {
    return (
        <div
            style={{
                position: "relative",
                width: "80%", // Larghezza della barra colorata
                height: "100%",
                display: "flex",
                flexDirection: "column-reverse", // Centrare verticalmente la barra
            }}
        >
            <div
                style={{
                    width: "100%",
                    backgroundColor: "#6CC551",
                    height: `${percentage}%`,
                    transition: "height 0.5s",
                    borderRadius: "8px",
                }}
            />
        </div>
    );
};

export default ProgressBar;
