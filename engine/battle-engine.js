// Battle Engine - ダメージ計算・タイプ相性・捕獲率
window.Game = window.Game || {};

window.Game.BattleEngine = {
    // レベルベースのステータス計算
    calcStat(base, level) {
        return Math.floor(base + (base * level * 0.02));
    },

    // HPのステータス計算（HPは少し高めに）
    calcHp(base, level) {
        return Math.floor(base + (base * level * 0.025) + level);
    },

    // ダメージ計算
    calcDamage(move, attacker, defender, isMega) {
        // ?? を使う: || だと無効相性の 0 が 1.0 扱いになってしまう
        const typeModifier = (TYPE_CHART[move.type]?.[defender.type] ?? 1.0) * (move.type === attacker.type ? 1.5 : 1.0);
        const megaMultiplier = isMega ? 1.5 : 1.0;
        const levelMultiplier = 1 + (attacker.level || 50) * 0.01;
        const atkBoost = attacker.atkBoost || 1;
        const defBoost = defender.defBoost || 1;
        const randomFactor = 0.85 + Math.random() * 0.15;

        const damage = Math.max(1, Math.floor(
            ((move.power * 0.3) * typeModifier * randomFactor * atkBoost * megaMultiplier * levelMultiplier) / defBoost
        ));

        return { damage, typeModifier };
    },

    // 先攻判定
    determineFirstTurn(p1Speed, p2Speed) {
        if (p1Speed > p2Speed) return 'player';
        if (p1Speed < p2Speed) return 'cpu';
        return Math.random() > 0.5 ? 'player' : 'cpu';
    },

    // タイプ相性メッセージ
    getEffectivenessMessage(modifier) {
        if (modifier > 1) return 'こうかは ばつぐんだ！';
        if (modifier < 1 && modifier > 0) return 'こうかは いまひとつの ようだ...';
        if (modifier === 0) return 'こうかが ないようだ...';
        return null;
    },

    // 毒ダメージ計算
    calcPoisonDamage(maxHp) {
        return Math.max(1, Math.floor(maxHp * 0.125));
    },

    // エフェクトのセットアップ（共通パターン抽出）
    setupProjectileEffect(effectType, isP1, canvasWidth, canvasHeight) {
        const w = canvasWidth || 640;
        const h = canvasHeight || 360;
        return {
            type: effectType,
            target: isP1 ? 'p2' : 'p1',
            startX: isP1 ? w * 0.25 : w * 0.75,
            startY: isP1 ? h * 0.7 : h * 0.25,
            targetX: isP1 ? w * 0.75 : w * 0.25,
            targetY: isP1 ? h * 0.25 : h * 0.7,
            progress: 0
        };
    },

    // エフェクトアニメーションパラメータ
    EFFECT_PARAMS: {
        eternal_beam: { step: 0.02, delay: 20, wait: 500 },
        dragon_meteor: { step: 0.02, delay: 30, wait: 600 },
        beam: { step: 0.05, delay: 30, wait: 300 },
        shadow_ball: { step: 0.02, delay: 20, wait: 500 },
        zeraora_plasma: { step: 0.02, delay: 20, wait: 500 },
        zeraora_thunder_punch: { step: 0.03, delay: 25, wait: 400 },
        zapdos_thunder_bolt: { step: 0.02, delay: 15, wait: 600 },
        lucario_close_combat: { step: 0.015, delay: 20, wait: 500 },
        lucario_drain_punch: { step: 0.02, delay: 20, wait: 600 },
        aura_sphere: { step: 0.02, delay: 20, wait: 500 },
        mega_punch: { step: 0.018, delay: 18, wait: 600 },
        psychokinesis: { step: 0.02, delay: 30, wait: 600 },
        psycho_break: { step: 0.018, delay: 18, wait: 600 },
        psycho_shock: { step: 0.02, delay: 25, wait: 600 },
        dai_monji: { step: 0.02, delay: 30, wait: 800 },
        steel_wing: { step: 0.025, delay: 20, wait: 500 },
        metal_claw: { step: 0.03, delay: 15, wait: 500 },
        bullet_punch: { step: 0.02, delay: 12, wait: 500 },
        iron_head: { step: 0.02, delay: 20, wait: 600 },
        salt_water: { step: 0.02, delay: 20, wait: 600 },
        surf: { step: 0.02, delay: 25, wait: 700 },
        hydro_pump: { step: 0.015, delay: 18, wait: 700 },
        cold_flare: { step: 0.02, delay: 20, wait: 600 },
        earthquake: { step: 0.02, delay: 25, wait: 700 },
        earth_power: { step: 0.02, delay: 20, wait: 700 },
        solar_beam: { step: 0.015, delay: 18, wait: 700 },
        magma_storm: { step: 0.015, delay: 18, wait: 700 },
        bagfoon_inferno: { step: 0.02, delay: 25, wait: 600 },
        bagfoon_flare_blitz: { step: 0.025, delay: 18, wait: 500 },
        bagfoon_blazing_punch: { step: 0.03, delay: 16, wait: 500 },
        bagfoon_explosion: { step: 0.02, delay: 28, wait: 600 },
        latias_mist_burst: { step: 0.022, delay: 24, wait: 550 },
        latias_dragon_soul: { step: 0.028, delay: 20, wait: 500 },
        latias_mystic_dance: { step: 0.02, delay: 26, wait: 550 },
        latias_aura_cannon: { step: 0.025, delay: 18, wait: 500 },
        latios_luster_purge: { step: 0.02, delay: 25, wait: 600 },
        latios_dragon_breath: { step: 0.03, delay: 18, wait: 500 },
        latios_psycho_boost: { step: 0.022, delay: 22, wait: 550 },
        latios_outrage: { step: 0.018, delay: 30, wait: 650 },
        dark_vortex: { step: 0.025, delay: 20, wait: 500 },
        phantom_burst: { step: 0.02, delay: 25, wait: 600 },
        shadow_tail: { step: 0.03, delay: 18, wait: 500 },
        nightmare: { step: 0.02, delay: 30, wait: 700 }
    },

    // EXP計算（冒険モード用）
    calcExpGain(opponentLevel, opponentBaseExp) {
        const baseExp = opponentBaseExp || 50;
        return Math.floor(baseExp * opponentLevel / 7);
    }
};
