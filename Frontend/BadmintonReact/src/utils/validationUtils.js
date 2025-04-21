export function validateTeamNames(team1Name, team2Name) {
    try {
        if (!team1Name || !team2Name) {
            throw new Error("Team names cannot be empty.");
        }
        if (team1Name === team2Name) {
            throw new Error("Teams cannot have the same name.");
        }
        return true;
    } catch (error) {
        console.error("Error in validateTeamNames:", error);
        return false;
    }
}