import React from "react";
import {  useNetworkStatusNotifier } from "../hooks/useNavigatorOnLine";

export const NetworkStatusIndicator = () => {
    const {  isOnline } = useNetworkStatusNotifier();

    return isOnline ? (
        <div style={{ position: "fixed", bottom: 10, right: 10, background: "yellow", padding: "10px" }}>
           <h1>Đang  online</h1>
        </div>
    ) : ( <div style={{ position: "fixed", bottom: 10, right: 10, background: "yellow", padding: "10px" }}>
        <h1>Đang  offline</h1>
     </div>);
};
