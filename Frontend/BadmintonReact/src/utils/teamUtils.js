export function handleTeamNameChange(teamKey, value, setTeamNames) {
    setTeamNames((prevNames) => ({
        ...prevNames,
        [teamKey]: value,
    }));
}