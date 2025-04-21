export function canIncreaseScore(teamScore, opponentScore) {
    try {
        if (teamScore >= 30) throw new Error("Score cannot exceed 30.");
        if (teamScore >= 21 && opponentScore < 20) return false;
        if (teamScore >= 20 && opponentScore >= 20) return false;
        return true;
    } catch (error) {
        console.error("Error in canIncreaseScore:", error);
        return false;
    }
}