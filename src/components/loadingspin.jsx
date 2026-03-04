import React from "react";
import { Spin } from "antd";

const LoaderSpinner = ({ fullScreen = true, size = "large" }) => {
    const containerStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: fullScreen ? "100vh" : "100%",
        width: "100%",
    };

    return (
        <div style={containerStyle} className="Spinner">
            <Spin size={size} />
        </div>
    );
};

export default LoaderSpinner;