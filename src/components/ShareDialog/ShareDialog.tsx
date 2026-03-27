import React, { useRef } from "react";
import { useCopyToClipboard } from "usehooks-ts";
import "./ShareDialog.scss";

interface ShareDialogProps {
    gameData: string;
    closeShare: () => void;
}

const ShareDialog = ({ gameData, closeShare }: ShareDialogProps) => {
    const refInput = useRef<HTMLInputElement|null>(null);
    const [copiedText, copyToClipboard] = useCopyToClipboard();

    const copyLink = (e: React.SubmitEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (refInput.current) {
            refInput.current.select();
            refInput.current.setSelectionRange(0, 99999);
            copyToClipboard(refInput.current.value)
                .then(() => {
                    console.log('Copied game link to clipboard!')
                })
                .catch(error => {
                    console.error('Failed to copy!', error)
                });
        }
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
                    value={`${location.protocol}//${location.host}${location.pathname}?g=${encodeURIComponent(gameData)}`}
                />
                <button type="submit" className="fas fa-copy"></button>
            </form>
            <button type="button" onClick={closeShare}>OK</button>
        </div>
    )
}

export default ShareDialog;