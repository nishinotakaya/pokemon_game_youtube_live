// Catching System Tests
const { expect } = chai;

describe('Catching', () => {
    const C = window.Game.Catching;

    describe('calcCatchRate', () => {
        it('should be higher with lower HP', () => {
            const fullHp = C.calcCatchRate({ currentHp: 100, maxHp: 100, level: 10 }, 'pokeball');
            const lowHp = C.calcCatchRate({ currentHp: 10, maxHp: 100, level: 10 }, 'pokeball');
            expect(lowHp).to.be.above(fullHp);
        });

        it('should be higher with better balls', () => {
            const pokemon = { currentHp: 50, maxHp: 100, level: 10 };
            const poke = C.calcCatchRate(pokemon, 'pokeball');
            const great = C.calcCatchRate(pokemon, 'great_ball');
            const ultra = C.calcCatchRate(pokemon, 'ultra_ball');
            expect(great).to.be.above(poke);
            expect(ultra).to.be.above(great);
        });

        it('should be lower with higher level', () => {
            const low = C.calcCatchRate({ currentHp: 50, maxHp: 100, level: 5 }, 'pokeball');
            const high = C.calcCatchRate({ currentHp: 50, maxHp: 100, level: 80 }, 'pokeball');
            expect(low).to.be.above(high);
        });

        it('should not exceed 0.95', () => {
            const rate = C.calcCatchRate({ currentHp: 1, maxHp: 1000, level: 1 }, 'ultra_ball');
            expect(rate).to.be.at.most(0.95);
        });
    });

    describe('tryCatch', () => {
        it('should always succeed with master ball', () => {
            const pokemon = { currentHp: 100, maxHp: 100, level: 100 };
            const result = C.tryCatch(pokemon, 'master_ball');
            expect(result.success).to.be.true;
            expect(result.shakes).to.equal(3);
        });

        it('should return shakes count', () => {
            const pokemon = { currentHp: 50, maxHp: 100, level: 10 };
            const result = C.tryCatch(pokemon, 'pokeball');
            expect(result.shakes).to.be.at.least(1);
            expect(result.shakes).to.be.at.most(3);
        });

        it('should return shakeResults array', () => {
            const pokemon = { currentHp: 50, maxHp: 100, level: 10 };
            const result = C.tryCatch(pokemon, 'pokeball');
            expect(result.shakeResults).to.be.an('array');
            expect(result.shakeResults.length).to.equal(result.shakes);
        });
    });

    describe('BALL_MODIFIERS', () => {
        it('should have all ball types', () => {
            expect(C.BALL_MODIFIERS).to.have.property('pokeball');
            expect(C.BALL_MODIFIERS).to.have.property('great_ball');
            expect(C.BALL_MODIFIERS).to.have.property('ultra_ball');
            expect(C.BALL_MODIFIERS).to.have.property('master_ball');
        });

        it('should increase in order', () => {
            expect(C.BALL_MODIFIERS.great_ball).to.be.above(C.BALL_MODIFIERS.pokeball);
            expect(C.BALL_MODIFIERS.ultra_ball).to.be.above(C.BALL_MODIFIERS.great_ball);
            expect(C.BALL_MODIFIERS.master_ball).to.be.above(C.BALL_MODIFIERS.ultra_ball);
        });
    });
});
