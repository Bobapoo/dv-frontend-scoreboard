export function updateScore(team, value, prevScores) {
    const currentScore = prevScores[team] || 0;
    const newScore = currentScore + value;

    if (newScore < 0 || newScore > 30) {
        console.error("Invalid score value:", newScore);
        return prevScores;
    }

    return {
        ...prevScores,
        [team]: Math.max(0, Math.min(newScore, 30)), // Ensure score stays between 0 and 30
    };
}

export function resetGame(setScores, setCurrentGame) {
    try {
        setScores({ team1: 0, team2: 0 });
        setCurrentGame((prev) => prev + 1);
    } catch (error) {
        console.error("Error in resetGame:", error);
    }
}

export function resetMatch(setGamesWon, setCurrentGame) {
    setGamesWon({ team1: 0, team2: 0 });
    setCurrentGame(1);
}