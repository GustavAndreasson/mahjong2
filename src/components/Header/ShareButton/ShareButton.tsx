import React from "react";
import JSONCrush from "jsoncrush";
import { useShare } from "rooks";
import Game from "Types/Game";

interface ShareButtonProps {
    showShare: (link: string) => void;
    game: Game;
}

const ShareButton = ({ showShare, game }: ShareButtonProps) => {
    const shareLink = `${location.protocol}//${location.host}${location.pathname}?g=${encodeURIComponent(JSONCrush.crush(JSON.stringify(game)))}`;
    const { share, isSupported, isSharing } = useShare();

    const webShare = () => {
        share({ title: "Dela din omgång", url: shareLink })
            .catch((error) => console.error("Error sharing:", error));
    }

    const handleShare = () => isSupported ? webShare() : showShare(shareLink);

    return (
        <button className="share-button fas fa-share-alt" onClick={handleShare} disabled={isSharing}></button>
    );
}

export default ShareButton;