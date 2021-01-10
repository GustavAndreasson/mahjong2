import React from 'react';
import "./ConfirmNewGame.scss";

const ConfirmNewGame = ({ cancel, confirm }) => (
    <div className="confirm-new-game popup">
        <div className="pu-background"></div>
        <p>Det pågående spelet kommer inte gå att återställa om du inte har sparat det.</p>
        <p>Är det säkert att du vill fortsätta?</p>
        <div className="confirm">
            <button type="button" onClick={cancel}>Avbryt</button>
            <button type="button" onClick={confirm}>OK</button>
        </div>
    </div>
)

export default ConfirmNewGame;
