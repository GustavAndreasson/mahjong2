import React, { useRef } from "react";
import { useClipboard } from "rooks";
import "./ShareDialog.scss";

interface ShareDialogProps {
    shareLink: string;
    closeShare: () => void;
}

const ShareDialog = ({ shareLink, closeShare }: ShareDialogProps) => {
    const refInput = useRef<HTMLInputElement|null>(null);
    const { copy } = useClipboard();

    const copyLink = (e: React.SubmitEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (refInput.current) {
            refInput.current.select();
            refInput.current.setSelectionRange(0, 99999);
        }
        copy(shareLink)
            .catch(error => {
                console.error('Failed to copy!', error)
            });
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
                    value={shareLink}
                />
                <button type="submit" className="fas fa-copy"></button>
            </form>
            <button type="button" onClick={closeShare}>OK</button>
        </div>
    )
}

export default ShareDialog;