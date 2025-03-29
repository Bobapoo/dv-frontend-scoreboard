import styles from '../styles/GameStats.module.css';

export const GameStats = ({ gamesWon, currentGame, teamNames, team1Streak, team2Streak }) => {
    return (
        <div className={styles.gameStatsContainer}>
            <h2 className={styles.gameStatsTitle}>Game Stats</h2>
            <div className={styles.gameStats}>
                <div className={styles.gameStat}>
                    <span>Game Number:</span> {currentGame}
                </div>
                <div className={styles.gameStat}>
                    <span>🏆 {teamNames.team1} <p>Games Won: {gamesWon.team1}</p> <p>Current Streak: {team1Streak} Points</p></span> 
                    
                </div>
                <div className={styles.gameStat}>
                    <span>🏆 {teamNames.team2} <p>Games Won: {gamesWon.team2}</p> <p>Current Streak: {team2Streak} Points</p></span>
                </div>
            </div>
        </div>
    );
};