// Encounter System - 野生ポケモンエンカウント
window.Game = window.Game || {};

window.Game.Encounter = {
    // エンカウント率（歩数ベース）
    BASE_ENCOUNTER_RATE: 0.15, // 15%の確率でエンカウント

    // エンカウント判定
    checkEncounter(routeType) {
        let rate = this.BASE_ENCOUNTER_RATE;
        if (routeType === 'cave') rate = 0.20;
        if (routeType === 'tower') rate = 0.18;
        if (routeType === 'water') rate = 0.12;
        return Math.random() < rate;
    },

    // エンカウントテーブルからポケモンを抽選
    rollEncounter(encounterTable) {
        if (!encounterTable || encounterTable.length === 0) return null;

        const totalWeight = encounterTable.reduce((sum, e) => sum + e.weight, 0);
        let roll = Math.random() * totalWeight;

        for (const entry of encounterTable) {
            roll -= entry.weight;
            if (roll <= 0) {
                const level = this.rollLevel(entry.levelRange[0], entry.levelRange[1]);
                return {
                    pokemonId: entry.pokemon,
                    level
                };
            }
        }

        // フォールバック
        const last = encounterTable[encounterTable.length - 1];
        return {
            pokemonId: last.pokemon,
            level: this.rollLevel(last.levelRange[0], last.levelRange[1])
        };
    },

    // レベル抽選
    rollLevel(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    // 野生ポケモンを生成
    generateWildPokemon(encounterTable) {
        const encounter = this.rollEncounter(encounterTable);
        if (!encounter) return null;
        return window.Game.Leveling.createPokemon(encounter.pokemonId, encounter.level);
    },

    // 逃走成功率
    calcFleeChance(playerSpeed, wildSpeed) {
        const ratio = playerSpeed / Math.max(1, wildSpeed);
        return Math.min(0.95, 0.5 + ratio * 0.2);
    },

    // 逃走判定
    tryFlee(playerSpeed, wildSpeed) {
        return Math.random() < this.calcFleeChance(playerSpeed, wildSpeed);
    }
};
