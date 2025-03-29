export function updatePointStreaks(teamKey, value, teamStreak, lastScorer) {
    if (value === 1) { // A point was won by a team
        if (teamKey === 'team1' && (lastScorer === 'team1' || lastScorer === null)) {
            return teamStreak + 1;
        } else if (teamKey === 'team2' && (lastScorer === 'team2' || lastScorer === null)) {
            return teamStreak + 1;
        } else {
            return 1; // Reset the streak if the last scorer was different
        }
    }
    return teamKey === 'team1' && lastScorer === 'team1' ? -1 : 0; // Reset on loss
}

export function resetStreaks(setStreaks) {
    setStreaks({team1: 0,team2: 0, team1Highest: 0,team2Highest: 0});
}

export function updateStreak(teamKey, value, streaks, lastScorer){
        let newStreak = 0;
        if (teamKey === 'team1') {
            newStreak = updatePointStreaks(teamKey, value, streaks.team1, lastScorer);
            
        } else if (teamKey === 'team2') {
            newStreak = updatePointStreaks(teamKey, value, streaks.team2, lastScorer);
        }
        return newStreak;
}

export function updateHighestStreak(teamKey, newStreak, team1HighestStreak, team2HighestStreak, setTeam1HighestStreak, setTeam2HighestStreak) {
    if (teamKey === 'team1' && newStreak > team1HighestStreak) {
        setTeam1HighestStreak(newStreak);
    } else if (teamKey === 'team2' && newStreak > team2HighestStreak) {
        setTeam2HighestStreak(newStreak);
    }
}


export function resetHighestStreaks() {
    setTeam1HighestStreak(0);
    setTeam2HighestStreak(0);
}
