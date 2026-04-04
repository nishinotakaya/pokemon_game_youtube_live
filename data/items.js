// Items Data
window.Game = window.Game || {};
window.Game.Data = window.Game.Data || {};

window.Game.Data.Items = {
    // ボール
    pokeball: {
        name: 'モンスターボール',
        type: 'ball',
        description: 'ポケモンを つかまえる ボール',
        price: 200,
        icon: '⚪'
    },
    great_ball: {
        name: 'スーパーボール',
        type: 'ball',
        description: 'モンスターボールより つかまえやすい',
        price: 600,
        icon: '🔵'
    },
    ultra_ball: {
        name: 'ハイパーボール',
        type: 'ball',
        description: 'スーパーボールより つかまえやすい',
        price: 1200,
        icon: '🟡'
    },
    master_ball: {
        name: 'マスターボール',
        type: 'ball',
        description: 'ぜったいに つかまえられる さいこうの ボール',
        price: 0, // 非売品
        icon: '🟣'
    },

    // 回復アイテム
    potion: {
        name: 'キズぐすり',
        type: 'heal',
        description: 'HPを 20 かいふくする',
        healAmount: 20,
        price: 300,
        icon: '💊'
    },
    super_potion: {
        name: 'いいキズぐすり',
        type: 'heal',
        description: 'HPを 50 かいふくする',
        healAmount: 50,
        price: 700,
        icon: '💊'
    },
    hyper_potion: {
        name: 'すごいキズぐすり',
        type: 'heal',
        description: 'HPを 120 かいふくする',
        healAmount: 120,
        price: 1500,
        icon: '💊'
    },
    max_potion: {
        name: 'まんたんのくすり',
        type: 'heal',
        description: 'HPを ぜんかいふく する',
        healAmount: 9999,
        price: 2500,
        icon: '💊'
    },
    full_restore: {
        name: 'かいふくのくすり',
        type: 'heal',
        description: 'HPと じょうたいを ぜんかいふく',
        healAmount: 9999,
        healStatus: true,
        price: 3000,
        icon: '✨'
    },

    // 状態回復
    antidote: {
        name: 'どくけし',
        type: 'status_heal',
        description: 'どく じょうたいを かいふく',
        curesStatus: 'poison',
        price: 100,
        icon: '🧪'
    },

    // 戦闘用
    x_attack: {
        name: 'プラスパワー',
        type: 'battle',
        description: 'こうげきを いちだん あげる',
        boostStat: 'attack',
        boostAmount: 0.5,
        price: 500,
        icon: '⚔️'
    },
    x_defend: {
        name: 'ディフェンダー',
        type: 'battle',
        description: 'ぼうぎょを いちだん あげる',
        boostStat: 'defense',
        boostAmount: 0.5,
        price: 500,
        icon: '🛡️'
    }
};

// ショップで販売するアイテムリスト（町ごと）
window.Game.Data.ShopInventory = {
    default: ['pokeball', 'potion', 'antidote'],
    tokiwa_city: ['pokeball', 'potion', 'antidote'],
    nibi_city: ['pokeball', 'great_ball', 'potion', 'super_potion', 'antidote'],
    hanada_city: ['pokeball', 'great_ball', 'potion', 'super_potion', 'antidote', 'x_attack'],
    kuchiba_city: ['great_ball', 'ultra_ball', 'super_potion', 'hyper_potion', 'antidote', 'x_attack', 'x_defend'],
    tamamushi_city: ['great_ball', 'ultra_ball', 'super_potion', 'hyper_potion', 'max_potion', 'antidote', 'x_attack', 'x_defend'],
    safari_town: ['ultra_ball', 'hyper_potion', 'max_potion', 'full_restore', 'x_attack', 'x_defend'],
    shion_town: ['great_ball', 'super_potion', 'antidote'],
    sekiei_plateau: ['ultra_ball', 'max_potion', 'full_restore', 'x_attack', 'x_defend']
};
