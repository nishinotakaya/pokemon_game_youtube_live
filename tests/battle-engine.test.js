// Battle Engine Tests
const { expect } = chai;

describe('BattleEngine', () => {
    const BE = window.Game.BattleEngine;

    describe('calcDamage', () => {
        it('should return damage >= 1', () => {
            const move = { power: 10, type: 'normal' };
            const attacker = { type: 'normal', atkBoost: 1, level: 5 };
            const defender = { type: 'normal', defBoost: 1 };
            const { damage } = BE.calcDamage(move, attacker, defender, false);
            expect(damage).to.be.at.least(1);
        });

        it('should deal more damage with higher power', () => {
            const weak = { power: 30, type: 'normal' };
            const strong = { power: 100, type: 'normal' };
            const attacker = { type: 'normal', atkBoost: 1, level: 50 };
            const defender = { type: 'normal', defBoost: 1 };

            // 複数回計算して平均を取る（乱数があるため）
            let weakTotal = 0, strongTotal = 0;
            for (let i = 0; i < 100; i++) {
                weakTotal += BE.calcDamage(weak, attacker, defender, false).damage;
                strongTotal += BE.calcDamage(strong, attacker, defender, false).damage;
            }
            expect(strongTotal / 100).to.be.above(weakTotal / 100);
        });

        it('should apply STAB bonus', () => {
            const move = { power: 50, type: 'fire' };
            const sameType = { type: 'fire', atkBoost: 1, level: 50 };
            const diffType = { type: 'water', atkBoost: 1, level: 50 };
            const defender = { type: 'normal', defBoost: 1 };

            let sameTotal = 0, diffTotal = 0;
            for (let i = 0; i < 100; i++) {
                sameTotal += BE.calcDamage(move, sameType, defender, false).damage;
                diffTotal += BE.calcDamage(move, diffType, defender, false).damage;
            }
            // STAB = 1.5x
            expect(sameTotal / 100).to.be.above(diffTotal / 100 * 1.3);
        });

        it('should apply mega multiplier', () => {
            const move = { power: 50, type: 'normal' };
            const attacker = { type: 'normal', atkBoost: 1, level: 50 };
            const defender = { type: 'normal', defBoost: 1 };

            let normalTotal = 0, megaTotal = 0;
            for (let i = 0; i < 100; i++) {
                normalTotal += BE.calcDamage(move, attacker, defender, false).damage;
                megaTotal += BE.calcDamage(move, attacker, defender, true).damage;
            }
            expect(megaTotal / 100).to.be.above(normalTotal / 100 * 1.3);
        });

        it('should return type modifier', () => {
            const move = { power: 50, type: 'electric' };
            const attacker = { type: 'electric', atkBoost: 1, level: 50 };
            const waterDef = { type: 'water', defBoost: 1 };
            const groundDef = { type: 'ground', defBoost: 1 };

            const { typeModifier: waterMod } = BE.calcDamage(move, attacker, waterDef, false);
            const { typeModifier: groundMod } = BE.calcDamage(move, attacker, groundDef, false);

            expect(waterMod).to.be.above(1); // super effective + STAB
            expect(groundMod).to.equal(0); // no effect
        });
    });

    describe('determineFirstTurn', () => {
        it('should return player when faster', () => {
            expect(BE.determineFirstTurn(100, 50)).to.equal('player');
        });

        it('should return cpu when slower', () => {
            expect(BE.determineFirstTurn(50, 100)).to.equal('cpu');
        });

        it('should return either when equal', () => {
            const result = BE.determineFirstTurn(50, 50);
            expect(['player', 'cpu']).to.include(result);
        });
    });

    describe('getEffectivenessMessage', () => {
        it('should return super effective message', () => {
            expect(BE.getEffectivenessMessage(2)).to.include('ばつぐん');
        });

        it('should return not effective message', () => {
            expect(BE.getEffectivenessMessage(0.5)).to.include('いまひとつ');
        });

        it('should return no effect message', () => {
            expect(BE.getEffectivenessMessage(0)).to.include('ない');
        });

        it('should return null for normal effectiveness', () => {
            expect(BE.getEffectivenessMessage(1)).to.be.null;
        });
    });

    describe('calcPoisonDamage', () => {
        it('should deal 1/8 of max HP', () => {
            expect(BE.calcPoisonDamage(160)).to.equal(20);
            expect(BE.calcPoisonDamage(100)).to.equal(12);
        });

        it('should deal at least 1 damage', () => {
            expect(BE.calcPoisonDamage(1)).to.equal(1);
            expect(BE.calcPoisonDamage(0)).to.equal(1);
        });
    });

    describe('calcExpGain', () => {
        it('should calculate exp based on opponent level', () => {
            const exp = BE.calcExpGain(10, 50);
            expect(exp).to.be.above(0);
        });
    });
});
