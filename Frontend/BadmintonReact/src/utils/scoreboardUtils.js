export function canIncreaseScore(teamScore, opponentScore) {
    try {
        if (teamScore >= 30) {
            throw new Error("Score cannot exceed 30.");
        }
        if (teamScore >= 21 && opponentScore < 20) return false; // If team has 21 or more and opponent has less than 20
        if (teamScore >= 20 && opponentScore >= 20) return false; // If both teams have 20 or more
        return true;
    } catch (error) {
        console.error("Error in canIncreaseScore:", error);
        return false;
    }
}

export function updateScore(team, value, prevScores) {
    const currentScore = prevScores[team] || 0;
    const newScore = currentScore + value;

    // Prevent score update if it's out of bounds
    if (newScore < 0 || newScore > 30) {
        console.error("Invalid score value:", newScore);
        return prevScores; // Return previous scores to prevent update
    }

    // Return the updated scores, ensuring the value is between 0 and 30
    return {
        ...prevScores,
        [team]: Math.max(0, Math.min(newScore, 30)), // Ensure score is between 0 and 30
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

export function checkForGameWinner(scores, gamesWon, setGamesWon, setScores, setCurrentGame) {

    try {
        const score1 = scores.team1;
        const score2 = scores.team2;

        // Check for game winner
        if (score1 >= 30 || (score1 >= 21 && score1 - score2 >= 2)) {
            setGamesWon((prev) => ({ ...prev, ['team1']: prev.team1 + 1 }));
            resetGame(setScores, setCurrentGame);
        } else if (score2 >= 30 || (score2 >= 21 && score2 - score1 >= 2)) {
            setGamesWon((prev) => ({ ...prev, ['team2']: prev.team2 + 1 }));
            resetGame(setScores, setCurrentGame);
        }
    } catch (error) {
        console.error("Error in checkForGameWinner:", error);
    }
}

export const updatePointStreaks = (teamkey, value, teamStreak, lastScorer) => {
    let streak;
    if (value === 1) { // A point was won by a team
        if (teamkey === 'team1' && lastScorer === 'team1' || null) {
            streak = teamStreak + 1; // Increment streak for team1
            return streak; // Reset the other team's streak
        } else if (teamkey === 'team2' && lastScorer === 'team2' || null) {
            streak = teamStreak + 1; // Increment streak for team2
            return streak;
        } else {
            return 1;
        }
    } else {
        if(teamkey === 'team1' && lastScorer === 'team1' || null){
            return -1
        }
    }
};

export const resetStreaks = (setTeam1Streak, setTeam2Streak) => {
    setTeam1Streak(0);
    setTeam2Streak(0);
};

export function checkForMatchWinner(gamesWon, resetMatch, teamNames) {
    try {
        const { team1, team2 } = teamNames;

        if (gamesWon.team1 === 2) {
            alert(`${team1} wins the match!`);
            resetMatch();
        } else if (gamesWon.team2 === 2) {
            alert(`${team2} wins the match!`);
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