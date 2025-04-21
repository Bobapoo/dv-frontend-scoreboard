import { updateLeadChanges, updatePointsPerSet, trackLeadOwnership } from "./gameStatUtils"

describe('updateLeadChanges', () => {
    it('should return unchanged leadChanges if scores are tied', () => {
        expect(updateLeadChanges({ team1: 10, team2: 10 }, 'team1', 2)).toBe(2);
    });

    it('should increment leadChanges if leader changes', () => {
        expect(updateLeadChanges({ team1: 12, team2: 10 }, 'team2', 3)).toBe(4);
    });

    it('should return same leadChanges if leader has not changed', () => {
        expect(updateLeadChanges({ team1: 14, team2: 10 }, 'team1', 1)).toBe(1);
    });

    it('should return same leadChanges if previousLeader is null', () => {
        expect(updateLeadChanges({ team1: 8, team2: 10 }, null, 0)).toBe(0);
    });
});

describe('updatePointsPerSet', () => {
    it('should correctly update team points in the current game', () => {
        const result = updatePointsPerSet('team1', 1, {
            game1: { team1: 10, team2: 9 },
        }, 1);

        expect(result).toEqual({
            game1: { team1: 11, team2: 9 },
        });
    });

    it('should update team2 correctly', () => {
        const result = updatePointsPerSet('team2', 2, {
            game2: { team1: 5, team2: 6 },
        }, 2);

        expect(result).toEqual({
            game2: { team1: 5, team2: 8 },
        });
    });

    it('handles negative values (score deduction)', () => {
        const initial = {
          game1: { team1: 10, team2: 8 },
        };
        const updated = updatePointsPerSet('team2', -1, initial, 1);
        expect(updated.game1.team2).toBe(7);
      });
});

describe('trackLeadOwnership', () => {
    it('should return previous ownership if leader not determined', () => {
        const scores = { team1: 5, team2: 5 };
        const ownership = { team1: 2, team2: 3 };
        expect(trackLeadOwnership(scores, ownership, 'team1')).toEqual(ownership);
    });

    it('should increment currentLeader ownership on lead change and close game', () => {
        const scores = { team1: 11, team2: 10 };
        const ownership = { team1: 3, team2: 5 };
        const result = trackLeadOwnership(scores, ownership, 'team2');
        expect(result).toEqual({ team1: 4, team2: 5 });
    });

    it('should not increment if previousLeader and currentLeader are the same', () => {
        const scores = { team1: 12, team2: 10 };
        const ownership = { team1: 3, team2: 5 };
        const result = trackLeadOwnership(scores, ownership, 'team1');
        expect(result).toEqual(ownership);
    });

    it('should handle early-game edge case when team2 = 0 and team1 != 0', () => {
        const scores = { team1: 3, team2: 0 };
        const ownership = { team1: 1, team2: 0 };
        const result = trackLeadOwnership(scores, ownership, 'team2');
        expect(result).toEqual({ team1: 1, team2: 0 });
    });

    it('should handle early-game edge case when team1 = 0 and team2 != 0', () => {
        const scores = { team1: 0, team2: 4 };
        const ownership = { team1: 0, team2: 1 };
        const result = trackLeadOwnership(scores, ownership, 'team1');
        expect(result).toEqual({ team1: 0, team2: 1 });
    });
});