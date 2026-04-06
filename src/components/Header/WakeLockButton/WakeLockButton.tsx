import React from "react";
import { useWakeLock } from "react-screen-wake-lock";

const WakeLockButton = () => {
    const { isSupported, released, request, release } = useWakeLock();
    if (!isSupported) return false;

    const handleLock: () => Promise<void> = () => released === false ? release() : request();

    return (
        <button
            className={`wake-lock-button fas ${released === false ? "fa-lock" : "fa-unlock"}`}
            onClick={handleLock}
        />
    );
}

export default WakeLockButton;