import React, { useState, useEffect } from 'react';
import { FaTrophy } from 'react-icons/fa';  // Import the trophy icon from React Icons
import Team from './team';
import { GameStats } from './GameStats';
import TeamInputs from './TeamInputs';
import ControlButtons from './ControlButtons';
import styles from '../styles/scoreboard.module.css';
import { updateStreak, resetStreaks } from '../utils/streakUtils';
import { handleGameEffects } from '../utils/gameLogicUtils';
import { updateScore, resetMatch } from '../utils/scoreUpdateUtils';
import { toggleTheme, initializeTheme } from '../utils/themeUtils';

const Scoreboard = () => {
    const [scores, setScores] = useState({ team1: 0, team2: 0 });
    const [gamesWon, setGamesWon] = useState({ team1: 0, team2: 0 });
    const [currentGame, setCurrentGame] = useState(1);
    const [darkMode, setDarkMode] = useState(false);

    const[teamNames, setTeamNames] = useState({team1: 'Team 1', team2: 'Team 2'});
    const [streaks, setStreaks] = useState({ team1: 0, team2: 0, team1Highest: 0, team2Highest: 0 });
    const [lastScorer, setLastScorer] = useState(null); // Track who last scored

    const handleToggleTheme = () => {
        toggleTheme();
        setDarkMode((prev) => !prev);
    };

    const updateTeamScore = (teamKey, value) => {
        setScores((prevScores) => {
            const updatedScores = updateScore(teamKey, value, prevScores);
            // Update streak for the respective team
            const updatedStreaks = updateStreak(teamKey, value, streaks, lastScorer);
            // Update highest streak if the current streak is higher
            setStreaks((prev) => ({
                ...prev,
                [teamKey]: updatedStreaks,
                [`${teamKey}Highest`]: Math.max(prev[`${teamKey}Highest`], updatedStreaks),
                [teamKey === 'team1' ? 'team2' : 'team1']: 0,
            }));
            // Update last scorer
            if (value === 1) setLastScorer(teamKey);
            return updatedScores;
        });
    };

    const reset = () => {
        resetMatch(setGamesWon, setCurrentGame);
        setScores({ team1: 0, team2: 0 });
        resetStreaks(setStreaks);
    };
    

    // After updating the scores, use the updated scores to check for game winner
    useEffect(() => {
        initializeTheme();
        setDarkMode(document.documentElement.getAttribute('data-theme') === 'dark');
        handleGameEffects(scores, gamesWon, setGamesWon, setScores, setCurrentGame, teamNames, reset);
    }, [scores, gamesWon, teamNames]);



    return (
        <div className={`${styles.scoreboard} ${darkMode ? styles.dark : ''}`}>
            <header className="header">
                <h1 className={styles.title}>
                    <FaTrophy style={{ marginRight: '8px' }} />
                    Badminton Tournament
                </h1>
            </header>

            <TeamInputs teamNames={teamNames} setTeamNames={setTeamNames} />

            <div className={styles.teams}>
                {['team1', 'team2'].map((teamKey) => (
                    <Team
                        key={teamKey}
                        teamName={teamNames[teamKey].length > 17 ? teamNames[teamKey].slice(0, 17) + '...' : teamNames[teamKey]} 
                        teamKey={teamKey} 
                        score={scores[teamKey]} 
                        updateScore={updateTeamScore} 
                        gamesWon={gamesWon[teamKey]} 
                        streak={streaks[teamKey]}
                        highestStreak={streaks[`${teamKey}Highest`]}
                    />
                ))}
                <GameStats 
                    gamesWon={gamesWon} 
                    currentGame={currentGame} 
                    teamNames={teamNames} 
                    team1Streak={streaks.team1} 
                    team2Streak={streaks.team2}
                />
            </div>

            <ControlButtons reset={reset} handleToggleTheme={handleToggleTheme} darkMode={darkMode} />
        </div>
    );
};

export default Scoreboard;