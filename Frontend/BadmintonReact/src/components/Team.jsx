import React from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa'; 
import styles from '../styles/Team.module.css';

const Team = ({ teamName, teamKey, score, gamesWon, updateScore, streak, highestStreak, color }) => {
    return (
        <div className={`${styles.teamContainer} ${styles[color]}`}>
            <h2 className={styles.teamName}>{teamName}</h2>
            <p className={styles.score}>{score}</p>
            <p className={styles.gamesWon}>Games Won: {gamesWon}</p>
            <p className={styles.streak}>Current Streak: {streak}</p>
            <p className={styles.streak}>Highest Streak: {highestStreak}</p>

            <div className={styles.buttonContainer}>
                <button 
                    onClick={() => updateScore(teamKey, 1)} 
                    className={`${styles.increaseButton} ${styles.teamButton}`}
                >
                    <FaPlus size={20} />
                </button>
                <button 
                    onClick={() => updateScore(teamKey,-1)} 
                    className={`${styles.decreaseButton} ${styles.teamButton}`}
                >
                    <FaMinus size={20} />
                </button>
            </div>
        </div>
    );
};

export default Team;