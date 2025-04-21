import { resetGame } from './scoreUpdateUtils';

export function checkForGameWinner(scores, setGamesWon, setScores, setCurrentGame) {
    try {
        const { team1, team2 } = scores;

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

export function handleGameEffects(scores, gamesWon, setGamesWon, setScores, setCurrentGame, teamNames, resetMatch) {
    try {
        checkForGameWinner(scores, setGamesWon, setScores, setCurrentGame);
        checkForMatchWinner(gamesWon, resetMatch, teamNames);
    } catch (error) {
        console.error("Error in handleGameEffects:", error);
    }
}