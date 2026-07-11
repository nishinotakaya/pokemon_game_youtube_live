// Leveling System Tests
var { expect } = chai; // 複数テストファイル間で再宣言可能にするため var

describe('Leveling', () => {
    const L = window.Game.Leveling;

    describe('expForLevel', () => {
        it('should return 0 for level 0', () => {
            expect(L.expForLevel(0)).to.equal(0);
        });

        it('should return 1 for level 1', () => {
            expect(L.expForLevel(1)).to.equal(1);
        });

        it('should follow cubic curve', () => {
            expect(L.expForLevel(10)).to.equal(1000);
            expect(L.expForLevel(50)).to.equal(125000);
            expect(L.expForLevel(100)).to.equal(1000000);
        });

        it('should increase monotonically', () => {
            for (let i = 1; i < 100; i++) {
                expect(L.expForLevel(i + 1)).to.be.above(L.expForLevel(i));
            }
        });
    });

    describe('expToNextLevel', () => {
        it('should return 0 at max level', () => {
            expect(L.expToNextLevel(100, 999999999)).to.equal(0);
        });

        it('should return positive at non-max level', () => {
            expect(L.expToNextLevel(5, L.expForLevel(5))).to.be.above(0);
        });
    });

    describe('addExp', () => {
        it('should level up when enough exp', () => {
            const pokemon = { level: 5, exp: L.expForLevel(5), masterId: 'pikachu', key: 'pikachu' };
            const needed = L.expForLevel(6) - pokemon.exp;
            const result = L.addExp(pokemon, needed);
            expect(result.level).to.equal(6);
            expect(result.leveledUp).to.be.true;
            expect(result.levelsGained).to.equal(1);
        });

        it('should handle multiple level ups', () => {
            const pokemon = { level: 1, exp: 0, masterId: 'pikachu', key: 'pikachu' };
            const result = L.addExp(pokemon, 10000); // enough for several levels
            expect(result.level).to.be.above(1);
            expect(result.levelsGained).to.be.above(1);
        });

        it('should not exceed max level', () => {
            const pokemon = { level: 99, exp: L.expForLevel(99), masterId: 'pikachu', key: 'pikachu' };
            const result = L.addExp(pokemon, 999999999);
            expect(result.level).to.equal(100);
        });

        it('should not level up without enough exp', () => {
            const pokemon = { level: 5, exp: L.expForLevel(5), masterId: 'pikachu', key: 'pikachu' };
            const result = L.addExp(pokemon, 1);
            expect(result.level).to.equal(5);
            expect(result.leveledUp).to.be.false;
        });
    });

    describe('calcBattleExp', () => {
        it('should give more exp for trainer battles', () => {
            const wild = L.calcBattleExp(10, false, false);
            const trainer = L.calcBattleExp(10, true, false);
            expect(trainer).to.be.above(wild);
        });

        it('should give most exp for gym leaders', () => {
            const trainer = L.calcBattleExp(10, true, false);
            const gym = L.calcBattleExp(10, true, true);
            expect(gym).to.be.above(trainer);
        });

        it('should scale with opponent level', () => {
            const low = L.calcBattleExp(5, false, false);
            const high = L.calcBattleExp(50, false, false);
            expect(high).to.be.above(low);
        });
    });

    describe('createPokemon', () => {
        it('should create a pokemon at specified level', () => {
            const pokemon = L.createPokemon('pikachu', 10);
            expect(pokemon).to.not.be.null;
            expect(pokemon.level).to.equal(10);
            expect(pokemon.name).to.equal('ピカチュウ');
        });

        it('should have valid stats', () => {
            const pokemon = L.createPokemon('pikachu', 50);
            expect(pokemon.maxHp).to.be.above(0);
            expect(pokemon.attack).to.be.above(0);
            expect(pokemon.defense).to.be.above(0);
            expect(pokemon.speed).to.be.above(0);
        });

        it('should have moves', () => {
            const pokemon = L.createPokemon('pikachu', 10);
            expect(pokemon.moves).to.be.an('array');
            expect(pokemon.moves.length).to.be.above(0);
        });

        it('should return null for invalid pokemon', () => {
            expect(L.createPokemon('nonexistent', 10)).to.be.null;
        });
    });
});
