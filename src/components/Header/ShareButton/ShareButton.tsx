import React from "react";
import JSONCrush from "jsoncrush";
import {useShare} from "rooks";
import Game from "Types/Game";

interface ShareButtonProps {
    showShare: (link: string) => void;
    game: Game;
}

const ShareButton = ({ showShare, game }: ShareButtonProps) => {
    const shareLink = `${location.href}?g=${encodeURIComponent(JSONCrush.crush(JSON.stringify(game)))}`;
    const { share, isSupported, isSharing } = useShare();

    const webShare = () => {
        const {names, settings: {noPlayers}} = game;
        share({
            title: `Mahjong med ${names.slice(0, noPlayers - 1).join(", ")} and ${names[noPlayers - 1]}`,
            text: `Fortsätt omgången med ${names.slice(0, noPlayers - 1).join(", ")} and ${names[noPlayers - 1]}`,
            url: shareLink
        }).catch((error) => console.error("Error sharing:", error));
    }

    const handleShare = () => isSupported ? webShare() : showShare(shareLink);

    return (
        <button className="share-button fas fa-share-alt" onClick={handleShare} disabled={isSharing} />
    );
}

export default ShareButton;