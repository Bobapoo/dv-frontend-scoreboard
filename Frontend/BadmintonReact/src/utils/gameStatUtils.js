export function canIncreaseScore(teamScore, opponentScore) {
    try {
        if (teamScore >= 30) {
            throw new Error("Score cannot exceed 30.");
        }
        if (teamScore >= 21 && opponentScore < 20) return false;
        if (teamScore >= 20 && opponentScore >= 20) return false;
        return true;
    } catch (error) {
        console.error("Error in canIncreaseScore:", error);
        return false;
    }
}

export function updateScore(team, value, setScores) {

    setScores((prevScores) => {
        const newScore = prevScores[team] + value;
        if (newScore < 0 || newScore > 30) {
            console.error("Invalid score value:", newScore);
            return prevScores; // Return previous scores to prevent update
        }
        return {
            ...prevScores,
            [team]: newScore,
        };
    });
}

export function resetGame(setScores, setCurrentGame) {
    try {
        setScores({ team1: 0, team2: 0 });
        setCurrentGame((prev) => prev + 1);
    } catch (error) {
        console.error("Error in resetGame:", error);
    }
}

export function checkForGameWinner(scores, gamesWon, setGamesWon, setScores, setCurrentGame) {
    const { team1, team2 } = scores;
    try {
        if (team1 >= 30 || (team1 >= 21 && team1 - team2 >= 2)) {
            setGamesWon((prev) => ({ ...prev, team1: prev.team1 + 1 }));
            resetGame(setScores, setCurrentGame);
        } else if (team2 >= 30 || (team2 >= 21 && team2 - team1 >= 2)) {
            setGamesWon((prev) => ({ ...prev, team2: prev.team2 + 1 }));
            resetGame(setScores, setCurrentGame);
        }
    } catch (error) {
        console.error("Error in checkForGameWinner:", error);
    }
}

export function checkForMatchWinner(gamesWon, resetMatch) {
    try {
        if (gamesWon.team1 === 2) {
            alert("Team 1 wins the match!");
            resetMatch();
        } else if (gamesWon.team2 === 2) {
            alert("Team 2 wins the match!");
            resetMatch();
        }
    } catch (error) {
        console.error("Error in checkForMatchWinner:", error);
    }
}

export function resetMatch(setGamesWon, setCurrentGame) {
    setGamesWon({ team1: 0, team2: 0 });
    setCurrentGame(1);
}