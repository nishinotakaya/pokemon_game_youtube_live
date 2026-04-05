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
    // わざマシン
    tm_thunderbolt: {
        name: 'わざマシン01 10まんボルト', type: 'tm', moveName: '10まんボルト',
        description: 'でんきタイプの つよい わざ', price: 3000, icon: '💿'
    },
    tm_flamethrower: {
        name: 'わざマシン02 かえんほうしゃ', type: 'tm', moveName: 'かえんほうしゃ',
        description: 'ほのおタイプの つよい わざ', price: 3000, icon: '💿'
    },
    tm_surf: {
        name: 'わざマシン03 なみのり', type: 'tm', moveName: 'なみのり',
        description: 'みずタイプの つよい わざ', price: 3000, icon: '💿'
    },
    tm_psychic: {
        name: 'わざマシン04 サイコキネシス', type: 'tm', moveName: 'サイコキネシス',
        description: 'エスパータイプの つよい わざ', price: 3000, icon: '💿'
    },
    tm_earthquake: {
        name: 'わざマシン05 じしん', type: 'tm', moveName: 'じしん',
        description: 'じめんタイプの つよい わざ', price: 3000, icon: '💿'
    },
    tm_shadow_ball: {
        name: 'わざマシン06 シャドーボール', type: 'tm', moveName: 'シャドーボール',
        description: 'ゴーストタイプの つよい わざ', price: 3000, icon: '💿'
    },
    tm_dragon_claw: {
        name: 'わざマシン07 ドラゴンクロー', type: 'tm', moveName: 'ドラゴンクロー',
        description: 'ドラゴンタイプの わざ', price: 3000, icon: '💿'
    },
    tm_iron_head: {
        name: 'わざマシン08 アイアンヘッド', type: 'tm', moveName: 'アイアンヘッド',
        description: 'はがねタイプの わざ', price: 2000, icon: '💿'
    },
    tm_aerial_ace: {
        name: 'わざマシン09 つばめがえし', type: 'tm', moveName: 'つばめがえし',
        description: 'ひこうタイプの わざ ひっちゅう', price: 1500, icon: '💿'
    },
    tm_x_scissor: {
        name: 'わざマシン10 シザークロス', type: 'tm', moveName: 'シザークロス',
        description: 'むしタイプの わざ', price: 2000, icon: '💿'
    },
    tm_toxic: {
        name: 'わざマシン11 どくどく', type: 'tm', moveName: 'どくどく',
        description: 'あいてを どく にする', price: 2000, icon: '💿'
    },
    tm_hydro_pump: {
        name: 'わざマシン12 ハイドロポンプ', type: 'tm', moveName: 'ハイドロポンプ',
        description: 'みずタイプの とても つよい わざ', price: 5000, icon: '💿'
    },
    tm_fire_blast: {
        name: 'わざマシン13 だいもんじ', type: 'tm', moveName: 'だいもんじ',
        description: 'ほのおタイプの とても つよい わざ', price: 5000, icon: '💿'
    },
    tm_thunder: {
        name: 'わざマシン14 かみなり', type: 'tm', moveName: 'かみなり',
        description: 'でんきタイプの とても つよい わざ', price: 5000, icon: '💿'
    },
    tm_solar_beam: {
        name: 'わざマシン15 ソーラービーム', type: 'tm', moveName: 'ソーラービーム',
        description: 'くさタイプの つよい わざ', price: 4000, icon: '💿'
    },
    tm_hyper_beam: {
        name: 'わざマシン16 はかいこうせん', type: 'tm', moveName: 'はかいこうせん',
        description: 'さいきょうクラスの いちげき', price: 7500, icon: '💿'
    },
    tm_aura_sphere: {
        name: 'わざマシン17 はどうだん', type: 'tm', moveName: 'はどうだん',
        description: 'かくとうタイプ ひっちゅう', price: 4000, icon: '💿'
    },
    tm_dark_pulse: {
        name: 'わざマシン18 あくのはどう', type: 'tm', moveName: 'あくのはどう',
        description: 'ゴーストタイプの わざ', price: 3000, icon: '💿'
    },
    tm_stone_edge: {
        name: 'わざマシン19 ストーンエッジ', type: 'tm', moveName: 'ストーンエッジ',
        description: 'いわタイプ きゅうしょに あたりやすい', price: 3500, icon: '💿'
    },
    tm_fly: {
        name: 'わざマシン20 そらをとぶ', type: 'tm', moveName: 'そらをとぶ',
        description: 'ひこうタイプの つよい わざ', price: 3000, icon: '💿'
    },
};

// ショップで販売するアイテムリスト（町ごと）
window.Game.Data.ShopInventory = {
    default: ['pokeball', 'potion', 'antidote'],
    tokiwa_city: ['pokeball', 'potion', 'antidote'],
    nibi_city: ['pokeball', 'great_ball', 'potion', 'super_potion', 'antidote', 'tm_aerial_ace', 'tm_x_scissor'],
    hanada_city: ['pokeball', 'great_ball', 'potion', 'super_potion', 'antidote', 'x_attack', 'tm_surf', 'tm_toxic', 'tm_iron_head'],
    kuchiba_city: ['great_ball', 'ultra_ball', 'super_potion', 'hyper_potion', 'antidote', 'x_attack', 'x_defend', 'tm_thunderbolt', 'tm_flamethrower', 'tm_thunder'],
    tamamushi_city: ['great_ball', 'ultra_ball', 'super_potion', 'hyper_potion', 'max_potion', 'antidote', 'x_attack', 'x_defend', 'tm_psychic', 'tm_earthquake', 'tm_solar_beam', 'tm_shadow_ball'],
    safari_town: ['ultra_ball', 'hyper_potion', 'max_potion', 'full_restore', 'x_attack', 'x_defend', 'tm_dragon_claw', 'tm_hydro_pump', 'tm_fire_blast', 'tm_dark_pulse'],
    shion_town: ['great_ball', 'super_potion', 'antidote', 'tm_shadow_ball', 'tm_dark_pulse'],
    sekiei_plateau: ['ultra_ball', 'max_potion', 'full_restore', 'x_attack', 'x_defend', 'tm_hyper_beam', 'tm_aura_sphere', 'tm_stone_edge', 'tm_fly']
};
