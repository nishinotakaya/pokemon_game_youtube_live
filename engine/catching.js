// Catching System - ポケモン捕獲
window.Game = window.Game || {};

window.Game.Catching = {
    // ボール種別ごとの補正率
    BALL_MODIFIERS: {
        pokeball: 1.0,
        great_ball: 1.5,
        ultra_ball: 2.0,
        master_ball: 255.0
    },

    // 捕獲率計算
    calcCatchRate(pokemon, ballType) {
        const ballMod = this.BALL_MODIFIERS[ballType] || 1.0;
        const hpRatio = pokemon.currentHp / pokemon.maxHp;
        // HP低いほど捕まりやすい（ベースを大幅UP）
        const baseRate = (1 - hpRatio) * 0.5 + 0.35;
        const rate = Math.min(0.95, baseRate * ballMod);
        // レベル補正を緩く
        const levelPenalty = Math.max(0.5, 1 - (pokemon.level / 200));
        return rate * levelPenalty;
    },

    // 捕獲試行（3回揺れる判定）
    tryCatch(pokemon, ballType) {
        const catchRate = this.calcCatchRate(pokemon, ballType);
        const shakeResults = [];

        // マスターボールは確定
        if (ballType === 'master_ball') {
            return { success: true, shakes: 3, shakeResults: [true, true, true] };
        }

        for (let i = 0; i < 3; i++) {
            const shakeSuccess = Math.random() < catchRate;
            shakeResults.push(shakeSuccess);
            if (!shakeSuccess) {
                return { success: false, shakes: i + 1, shakeResults };
            }
        }

        return { success: true, shakes: 3, shakeResults };
    }
};
