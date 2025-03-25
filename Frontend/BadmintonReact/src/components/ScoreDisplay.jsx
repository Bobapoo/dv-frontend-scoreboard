import { op } from '@tensorflow/tfjs';
import React, { useState } from 'react';

const ScoreDisplay = () => {
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [player1GamesWon, setPlayer1GamesWon] = useState(0);
  const [player2GamesWon, setPlayer2GamesWon] = useState(0);
  const [currentGame, setCurrentGame] = useState(1);

  const canIncreaseScore = (playerScore, opponentScore) => {
    if (playerScore >= 30) {
      return false;
    }
    if( playerScore >= 20 && opponentScore >=20) {
      return playerScore <= opponentScore + 1;
    }
    if (playerScore >=21 && opponentScore < 20) return false;
    return true;
  };
  
  const increasePlayer1Score = () => {
    if(canIncreaseScore(player1Score, player2Score)) {
      setPlayer1Score(prev => {
        return Math.min(30, prev +1);
      });
    }
  }
  
  const decreasePlayer1Score = () => setPlayer1Score(Math.max(0, player1Score - 1));
  
  const increasePlayer2Score = () => {
    if(canIncreaseScore(player2Score, player1Score)) {
      setPlayer2Score(prev => {
        return Math.min(30, prev +1);
      });
    }
  }
  const decreasePlayer2Score = () => setPlayer2Score(Math.max(0, player2Score - 1));
  
  const checkForGameWinner = () => {
    if(player1Score >= 30) {
      setPlayer1GamesWon((prev) => prev +1);
      resetGame();
    } else if (player2Score >= 30) {
      SetPlayer2GamesWon((prev) => prev +1);
      resetGame();
    } else if (player1Score >=21 && (player1Score - player2Score) >= 2) {
      setPlayer1GamesWon((prev) => prev +1);
      resetGame();
    }  else if (player2Score >=21 && (player2Score - player1Score) >= 2) {
      setPlayer2GamesWon((prev) => prev +1);
      resetGame();
    }
  }

  const resetGame = () => {
    setPlayer1Score(0);
    setPlayer2Score(0);
    setCurrentGame((prev) => prev + 1);
  };

  const checkForMatchWinner = () => {
    if (player1GamesWon === 2) {
      alert("Player 1 wins the match!");
      resetMatch();
    } else if (player2GamesWon === 2) {
      alert("Player 2 wins the match!");
      resetMatch();
    }
  };

    // Reset match stats
    const resetMatch = () => {
      setPlayer1GamesWon(0);
      setPlayer2GamesWon(0);
      setCurrentGame(1);
    };

    React.useEffect(() => {
      checkForGameWinner();
      checkForMatchWinner();
    }, [player1Score, player2Score, player1GamesWon, player2GamesWon]);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-800 rounded-lg shadow-lg text-white">
      <h1 className="text-3xl font-semibold text-center mb-4">Badminton Scoreboard</h1>
      <div className="flex justify-between mb-4">
      <h2 className="text-2xl mb-2">Match Score (Best of 3)</h2>
        <p>
          Team 1: {player1GamesWon} - Team 2: {player2GamesWon}
        </p>
        <p className="mt-2 text-lg">Current Game: {currentGame}</p>
      </div>
      <div className="flex justify-between mb-4">
        <div className="text-center">
          <h2 className="text-xl">Team 1</h2>
          <p className="text-4xl font-bold">{player1Score}</p>
          <div className="flex justify-center gap-2 mt-2">
            <button
              onClick={increasePlayer1Score}
              className="bg-green-500 p-2 rounded-md text-white"
              disabled={player1Score >= 30}
            >
              +1
            </button>
            <button
              onClick={decreasePlayer1Score}
              className="bg-red-500 p-2 rounded-md text-white"
            >
              -1
            </button>
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-xl">Team 2</h2>
          <p className="text-4xl font-bold">{player2Score}</p>
          <div className="flex justify-center gap-2 mt-2">
            <button
              onClick={increasePlayer2Score}
              className="bg-green-500 p-2 rounded-md text-white"
              disabled={player1Score >= 30}
            >
              +1
            </button>
            <button
              onClick={decreasePlayer2Score}
              className="bg-red-500 p-2 rounded-md text-white"
            >
              -1
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreDisplay;