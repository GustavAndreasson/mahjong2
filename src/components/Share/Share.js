import React, { useRef } from "react";
import "./Share.scss";

const Share = ({ gameData, closeShare }) => {
    const refInput = useRef()
    const copyLink = e => {
        e.preventDefault()
        refInput.current.select()
        refInput.current.setSelectionRange(0, 99999)
        navigator.clipboard.writeText(refInput.current.value)
    }
    return (
        <div className="share popup">
            <div className="pu-background"></div>
            <div className="share-text">Kopiera länk till den här omgången.</div>
            <form className="share-link" onSubmit={copyLink}>
                <input 
                    type="text" 
                    readOnly 
                    ref={refInput} 
                    value={location.protocol + "//" + location.host + location.pathname + "?g=" + encodeURIComponent(gameData)} 
                />
                <button type="submit" className="fas fa-copy"></button>
            </form>
            <button type="button" onClick={closeShare}>OK</button>
        </div>
    )
}

export default Share;