// Leveling System - 経験値・レベルアップ・ステータス成長・進化
window.Game = window.Game || {};

window.Game.Leveling = {
    MAX_LEVEL: 100,

    // レベルに必要な累計経験値（3乗カーブ）
    expForLevel(level) {
        return Math.floor(Math.pow(level, 3));
    },

    // 次のレベルに必要な経験値
    expToNextLevel(currentLevel, currentExp) {
        if (currentLevel >= this.MAX_LEVEL) return 0;
        return this.expForLevel(currentLevel + 1) - currentExp;
    },

    // 経験値を加算してレベルアップ判定
    addExp(pokemon, expGain) {
        if (pokemon.level >= this.MAX_LEVEL) return { ...pokemon, leveledUp: false, levelsGained: 0, newMoves: [] };

        let newExp = pokemon.exp + expGain;
        let newLevel = pokemon.level;
        let levelsGained = 0;

        while (newLevel < this.MAX_LEVEL && newExp >= this.expForLevel(newLevel + 1)) {
            newLevel++;
            levelsGained++;
        }

        if (newLevel >= this.MAX_LEVEL) {
            newLevel = this.MAX_LEVEL;
        }

        const newStats = levelsGained > 0 ? this.calcStatsForLevel(pokemon, newLevel) : {};

        // レベルアップで新しく覚える技を判定
        const newMoves = [];
        if (levelsGained > 0 && typeof getLearnset === 'function') {
            const learnset = getLearnset(pokemon.masterId);
            for (let lv = pokemon.level + 1; lv <= newLevel; lv++) {
                const moveName = learnset[lv];
                if (moveName && typeof MOVES_DATA !== 'undefined' && MOVES_DATA[moveName]) {
                    // 既に覚えている技はスキップ
                    const already = (pokemon.moves || []).some(m =>
                        (typeof m === 'string' ? m : m.name) === moveName
                    );
                    if (!already && !newMoves.includes(moveName)) {
                        newMoves.push(moveName);
                    }
                }
            }
        }

        return {
            ...pokemon,
            ...newStats,
            level: newLevel,
            exp: newExp,
            leveledUp: levelsGained > 0,
            levelsGained,
            previousLevel: pokemon.level,
            newMoves
        };
    },

    // レベルに応じたステータス計算
    calcStatsForLevel(pokemon, level) {
        const master = POKEMON_DATA[pokemon.masterId] || POKEMON_DATA[pokemon.key];
        if (!master) return {};

        const baseHp = master.baseHp || master.hp || 100;
        const baseAtk = master.baseAtk || 80;
        const baseDef = master.baseDef || 70;
        const baseSpd = master.baseSpd || master.speed || 60;
        const growth = master.growthRate || 1.0;

        return {
            maxHp: Math.floor(baseHp + (baseHp * level * 0.025 * growth) + level),
            attack: Math.floor(baseAtk + (baseAtk * level * 0.02 * growth)),
            defense: Math.floor(baseDef + (baseDef * level * 0.02 * growth)),
            speed: Math.floor(baseSpd + (baseSpd * level * 0.015 * growth))
        };
    },

    // 戦闘でもらえる経験値を計算
    calcBattleExp(opponentLevel, isTrainer, isGymLeader) {
        let baseExp = 50;
        if (isTrainer) baseExp = 80;
        if (isGymLeader) baseExp = 150;
        return Math.floor(baseExp * opponentLevel / 5);
    },

    // 進化チェック
    checkEvolution(pokemon) {
        const evolutionData = window.Game.Data?.Evolutions?.[pokemon.masterId];
        if (!evolutionData) return null;

        if (evolutionData.levelRequired && pokemon.level >= evolutionData.levelRequired) {
            // ランダム進化（イーブイ等）
            if (evolutionData.randomEvolutions && evolutionData.randomEvolutions.length > 0) {
                const choices = evolutionData.randomEvolutions.filter(id => POKEMON_DATA[id]);
                if (choices.length > 0) {
                    return choices[Math.floor(Math.random() * choices.length)];
                }
            }
            return evolutionData.evolvedId;
        }
        return null;
    },

    // 新しいポケモンオブジェクトを作成（レベル指定）
    createPokemon(masterId, level) {
        const master = POKEMON_DATA[masterId];
        if (!master) return null;

        const stats = this.calcStatsForLevel({ masterId }, level);
        const moves = master.moves.map(moveName => {
            const moveData = MOVES_DATA[moveName];
            return moveData ? { name: moveName, ...moveData } : null;
        }).filter(Boolean).slice(0, 4);

        return {
            masterId,
            name: master.name,
            type: master.type,
            level,
            exp: this.expForLevel(level),
            ...stats,
            currentHp: stats.maxHp,
            moves,
            capturedAt: new Date().toISOString()
        };
    }
};
