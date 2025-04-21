import React from 'react';
import styles from '../styles/scoreboard.module.css';
import { handleTeamNameChange } from '../utils/teamUtils';

const TeamInputs = ({ teamNames, setTeamNames }) => (
    <div className={styles.teamNames}>
        {Object.entries(teamNames).map(([key, name]) => (
            <input
                key={key}
                type="text"
                placeholder={`Enter ${name} Name`}
                value={name}
                onChange={(e) => handleTeamNameChange(key, e.target.value, setTeamNames)}
                className={styles.teamNameInput}
                maxLength={20}
            />
        ))}
    </div>
);

export default TeamInputs;
