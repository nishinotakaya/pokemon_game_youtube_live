// Encounter System Tests
const { expect } = chai;

describe('Encounter', () => {
    const E = window.Game.Encounter;

    describe('rollLevel', () => {
        it('should return within range', () => {
            for (let i = 0; i < 50; i++) {
                const level = E.rollLevel(5, 10);
                expect(level).to.be.at.least(5);
                expect(level).to.be.at.most(10);
            }
        });

        it('should return exact level when min equals max', () => {
            expect(E.rollLevel(7, 7)).to.equal(7);
        });
    });

    describe('rollEncounter', () => {
        const table = [
            { pokemon: 'pikachu', weight: 50, levelRange: [3, 7] },
            { pokemon: 'squirtle', weight: 30, levelRange: [4, 8] },
            { pokemon: 'charizard', weight: 5, levelRange: [10, 15] }
        ];

        it('should return a valid encounter', () => {
            const encounter = E.rollEncounter(table);
            expect(encounter).to.not.be.null;
            expect(encounter).to.have.property('pokemonId');
            expect(encounter).to.have.property('level');
        });

        it('should return pokemon from the table', () => {
            const validIds = table.map(e => e.pokemon);
            for (let i = 0; i < 50; i++) {
                const encounter = E.rollEncounter(table);
                expect(validIds).to.include(encounter.pokemonId);
            }
        });

        it('should return null for empty table', () => {
            expect(E.rollEncounter([])).to.be.null;
            expect(E.rollEncounter(null)).to.be.null;
        });

        it('should respect level ranges', () => {
            for (let i = 0; i < 50; i++) {
                const encounter = E.rollEncounter(table);
                const entry = table.find(e => e.pokemon === encounter.pokemonId);
                expect(encounter.level).to.be.at.least(entry.levelRange[0]);
                expect(encounter.level).to.be.at.most(entry.levelRange[1]);
            }
        });

        it('should favor higher weight pokemon', () => {
            const counts = { pikachu: 0, squirtle: 0, charizard: 0 };
            for (let i = 0; i < 1000; i++) {
                const encounter = E.rollEncounter(table);
                counts[encounter.pokemonId]++;
            }
            expect(counts.pikachu).to.be.above(counts.squirtle);
            expect(counts.squirtle).to.be.above(counts.charizard);
        });
    });

    describe('calcFleeChance', () => {
        it('should be higher when player is faster', () => {
            const fast = E.calcFleeChance(100, 50);
            const slow = E.calcFleeChance(50, 100);
            expect(fast).to.be.above(slow);
        });

        it('should not exceed 0.95', () => {
            expect(E.calcFleeChance(999, 1)).to.be.at.most(0.95);
        });

        it('should work with zero speed', () => {
            const chance = E.calcFleeChance(50, 0);
            expect(chance).to.be.above(0);
            expect(chance).to.be.at.most(0.95);
        });
    });
});
