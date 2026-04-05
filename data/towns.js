// Towns & Routes Data
window.Game = window.Game || {};
window.Game.Data = window.Game.Data || {};

window.Game.Data.Towns = {
    masara_town: {
        name: 'マサラタウン',
        description: 'はじまりの まち',
        color: '#22c55e',
        icon: '🏠',
        hasGym: false,
        hasPokecenter: false,
        hasShop: false,
        routes: ['route_1'],
        unlockedBy: null, // 最初から解放
        npcs: ['professor_oak']
    },
    tokiwa_city: {
        name: 'トキワシティ',
        description: 'みどりが きれいな まち',
        color: '#4ade80',
        icon: '🌿',
        hasGym: true,
        gymId: 'tokiwa_gym',
        hasPokecenter: true,
        hasShop: true,
        routes: ['route_1', 'route_2'],
        unlockedBy: null // 最初から解放
    },
    nibi_city: {
        name: 'ニビシティ',
        description: 'いわの まち',
        color: '#92400e',
        icon: '🪨',
        hasGym: true,
        gymId: 'nibi_gym',
        hasPokecenter: true,
        hasShop: true,
        routes: ['route_2', 'route_3'],
        unlockedBy: null
    },
    hanada_city: {
        name: 'ハナダシティ',
        description: 'みずの まち',
        color: '#3b82f6',
        icon: '💧',
        hasGym: true,
        gymId: 'hanada_gym',
        hasPokecenter: true,
        hasShop: true,
        routes: ['route_3', 'route_4'],
        unlockedBy: 'nibi_badge'
    },
    kuchiba_city: {
        name: 'クチバシティ',
        description: 'いかずちの まち',
        color: '#f59e0b',
        icon: '⚡',
        hasGym: true,
        gymId: 'kuchiba_gym',
        hasPokecenter: true,
        hasShop: true,
        routes: ['route_4', 'route_5'],
        unlockedBy: 'hanada_badge'
    },
    tamamushi_city: {
        name: 'タマムシシティ',
        description: 'にじいろの まち',
        color: '#a855f7',
        icon: '🌈',
        hasGym: true,
        gymId: 'tamamushi_gym',
        hasPokecenter: true,
        hasShop: true,
        routes: ['route_5', 'route_6'],
        unlockedBy: 'kuchiba_badge'
    },
    safari_town: {
        name: 'サファリタウン',
        description: 'サファリパークで ゆうめいな まち',
        color: '#84cc16',
        icon: '🦁',
        hasGym: false,
        hasPokecenter: true,
        hasShop: true,
        routes: ['route_6', 'safari_zone'],
        unlockedBy: 'tamamushi_badge'
    },
    shion_town: {
        name: 'シオンタウン',
        description: 'しずかで すこし ふきみな まち',
        color: '#6b21a8',
        icon: '👻',
        hasGym: false,
        hasPokecenter: true,
        hasShop: true,
        routes: ['route_7', 'pokemon_tower'],
        unlockedBy: 'tamamushi_badge'
    },
    sekiei_plateau: {
        name: 'セキエイこうげん',
        description: 'ポケモンリーグ ほんぶ',
        color: '#ef4444',
        icon: '🏆',
        hasGym: false,
        hasPokecenter: true,
        hasShop: true,
        routes: ['champion_road'],
        unlockedBy: 'all_badges'
    }
};

window.Game.Data.Routes = {
    route_1: {
        name: '1ばんどうろ',
        type: 'grass',
        description: 'マサラタウンと トキワシティを つなぐ みち',
        encounters: [
            { pokemon: 'pidgey', weight: 25, levelRange: [2, 4] },
            { pokemon: 'rattata', weight: 25, levelRange: [2, 4] },
            { pokemon: 'caterpie', weight: 20, levelRange: [2, 3] },
            { pokemon: 'weedle', weight: 20, levelRange: [2, 3] },
            { pokemon: 'pikachu', weight: 8, levelRange: [3, 5] },
            { pokemon: 'eevee', weight: 5, levelRange: [3, 5] },
            { pokemon: 'magikarp', weight: 10, levelRange: [2, 5] }
        ],
        trainers: ['youngster_1', 'lass_1']
    },
    route_2: {
        name: '2ばんどうろ',
        type: 'grass',
        description: 'トキワのもり ちかくの みち',
        encounters: [
            { pokemon: 'pidgey', weight: 15, levelRange: [4, 7] },
            { pokemon: 'rattata', weight: 15, levelRange: [4, 7] },
            { pokemon: 'pikachu', weight: 12, levelRange: [5, 8] },
            { pokemon: 'geodude', weight: 10, levelRange: [5, 8] },
            { pokemon: 'machop', weight: 8, levelRange: [5, 8] },
            { pokemon: 'abra', weight: 5, levelRange: [5, 7] },
            { pokemon: 'gastly', weight: 5, levelRange: [5, 8] },
            { pokemon: 'lucario_riolu', weight: 5, levelRange: [6, 9] },
            { pokemon: 'eevee', weight: 5, levelRange: [5, 8] },
            { pokemon: 'scyther', weight: 3, levelRange: [7, 10] }
        ],
        trainers: ['youngster_2', 'bug_catcher_1']
    },
    route_3: {
        name: '3ばんどうろ',
        type: 'grass',
        description: 'ニビシティの さきの みち',
        encounters: [
            { pokemon: 'machop', weight: 10, levelRange: [10, 14] },
            { pokemon: 'geodude', weight: 10, levelRange: [10, 14] },
            { pokemon: 'nidoking', weight: 5, levelRange: [12, 16] },
            { pokemon: 'nidoqueen', weight: 5, levelRange: [12, 16] },
            { pokemon: 'arcanine', weight: 5, levelRange: [12, 15] },
            { pokemon: 'rapidash', weight: 5, levelRange: [11, 15] },
            { pokemon: 'primeape', weight: 8, levelRange: [11, 14] },
            { pokemon: 'heracross', weight: 5, levelRange: [12, 16] },
            { pokemon: 'lucario', weight: 3, levelRange: [13, 16] },
            { pokemon: 'blaziken', weight: 3, levelRange: [13, 16] }
        ],
        trainers: ['hiker_1', 'youngster_3']
    },
    route_4: {
        name: '4ばんどうろ',
        type: 'grass',
        description: 'みずべの みち',
        encounters: [
            { pokemon: 'gyarados', weight: 8, levelRange: [15, 20] },
            { pokemon: 'lapras', weight: 5, levelRange: [16, 20] },
            { pokemon: 'vaporeon', weight: 5, levelRange: [15, 19] },
            { pokemon: 'poliwrath', weight: 8, levelRange: [15, 19] },
            { pokemon: 'greninja', weight: 5, levelRange: [16, 20] },
            { pokemon: 'milotic', weight: 3, levelRange: [17, 21] },
            { pokemon: 'kingdra', weight: 3, levelRange: [17, 21] },
            { pokemon: 'swampert', weight: 5, levelRange: [16, 20] },
            { pokemon: 'dragonite', weight: 3, levelRange: [18, 22] },
            { pokemon: 'salamence', weight: 3, levelRange: [18, 22] }
        ],
        trainers: ['swimmer_1', 'fisherman_1']
    },
    route_5: {
        name: '5ばんどうろ',
        type: 'grass',
        description: 'エスパーポケモンが おおい みち',
        encounters: [
            { pokemon: 'alakazam', weight: 8, levelRange: [22, 28] },
            { pokemon: 'espeon', weight: 8, levelRange: [22, 26] },
            { pokemon: 'latias', weight: 4, levelRange: [24, 28] },
            { pokemon: 'latios', weight: 4, levelRange: [24, 28] },
            { pokemon: 'flygon', weight: 6, levelRange: [22, 27] },
            { pokemon: 'houndoom', weight: 6, levelRange: [22, 26] },
            { pokemon: 'crobat', weight: 8, levelRange: [22, 26] },
            { pokemon: 'zeraora', weight: 3, levelRange: [25, 30] },
            { pokemon: 'darkrai', weight: 2, levelRange: [26, 30] },
            { pokemon: 'chandelure', weight: 5, levelRange: [23, 28] }
        ],
        trainers: ['psychic_1', 'ace_trainer_1']
    },
    route_6: {
        name: '6ばんどうろ',
        type: 'grass',
        description: 'サファリタウンへの みち',
        encounters: [
            { pokemon: 'tyranitar', weight: 6, levelRange: [28, 35] },
            { pokemon: 'aggron', weight: 5, levelRange: [28, 34] },
            { pokemon: 'hydreigon', weight: 4, levelRange: [30, 36] },
            { pokemon: 'volcarona', weight: 4, levelRange: [30, 36] },
            { pokemon: 'aegislash', weight: 5, levelRange: [28, 34] },
            { pokemon: 'scizor', weight: 4, levelRange: [28, 35] },
            { pokemon: 'blaziken', weight: 5, levelRange: [28, 35] },
            { pokemon: 'groudon', weight: 2, levelRange: [32, 38] },
            { pokemon: 'rayquaza', weight: 1, levelRange: [35, 40] },
            { pokemon: 'urshifu', weight: 3, levelRange: [30, 36] }
        ],
        trainers: ['ace_trainer_2', 'veteran_1']
    },
    route_7: {
        name: '7ばんどうろ',
        type: 'grass',
        description: 'シオンタウンへの さびしい みち',
        encounters: [
            { pokemon: 'gengar', weight: 12, levelRange: [25, 32] },
            { pokemon: 'umbreon', weight: 8, levelRange: [25, 30] },
            { pokemon: 'weavile', weight: 6, levelRange: [26, 32] },
            { pokemon: 'mimikyu', weight: 8, levelRange: [25, 31] },
            { pokemon: 'absol', weight: 6, levelRange: [26, 32] },
            { pokemon: 'chandelure', weight: 5, levelRange: [27, 33] },
            { pokemon: 'darkrai', weight: 3, levelRange: [28, 35] },
            { pokemon: 'giratina', weight: 2, levelRange: [30, 38] }
        ],
        trainers: ['medium_1']
    },
    safari_zone: {
        name: 'サファリゾーン',
        type: 'grass',
        description: 'めずらしい ポケモンが いっぱい！',
        encounters: [
            { pokemon: 'rayquaza', weight: 2, levelRange: [35, 45] },
            { pokemon: 'eternatus', weight: 1, levelRange: [40, 50] },
            { pokemon: 'mewtwo', weight: 2, levelRange: [35, 45] },
            { pokemon: 'kyogre', weight: 2, levelRange: [35, 45] },
            { pokemon: 'groudon', weight: 2, levelRange: [35, 45] },
            { pokemon: 'giratina', weight: 2, levelRange: [35, 45] },
            { pokemon: 'zapdos', weight: 3, levelRange: [35, 45] },
            { pokemon: 'zacian', weight: 1, levelRange: [40, 50] },
            { pokemon: 'calyrex', weight: 1, levelRange: [42, 50] },
            { pokemon: 'dragapult', weight: 3, levelRange: [35, 42] },
            { pokemon: 'hydreigon', weight: 3, levelRange: [35, 42] },
            { pokemon: 'volcarona', weight: 3, levelRange: [35, 42] }
        ],
        trainers: []
    },
    pokemon_tower: {
        name: 'ポケモンタワー',
        type: 'tower',
        description: 'ゴーストポケモンの すみか... すこし ふきみだ',
        encounters: [
            { pokemon: 'gastly', weight: 15, levelRange: [22, 30] },
            { pokemon: 'gengar', weight: 10, levelRange: [25, 35] },
            { pokemon: 'mimikyu', weight: 8, levelRange: [24, 32] },
            { pokemon: 'chandelure', weight: 6, levelRange: [26, 34] },
            { pokemon: 'darkrai', weight: 4, levelRange: [28, 38] },
            { pokemon: 'giratina', weight: 3, levelRange: [30, 40] },
            { pokemon: 'absol', weight: 5, levelRange: [25, 33] }
        ],
        trainers: ['medium_2', 'medium_3']
    },
    champion_road: {
        name: 'チャンピオンロード',
        type: 'cave',
        description: 'ポケモンリーグへの さいごの みち',
        encounters: [
            { pokemon: 'metagross', weight: 8, levelRange: [42, 50] },
            { pokemon: 'tyranitar', weight: 8, levelRange: [42, 50] },
            { pokemon: 'salamence', weight: 8, levelRange: [42, 50] },
            { pokemon: 'garchomp', weight: 8, levelRange: [42, 50] },
            { pokemon: 'dragapult', weight: 5, levelRange: [44, 52] },
            { pokemon: 'urshifu', weight: 5, levelRange: [44, 52] },
            { pokemon: 'hydreigon', weight: 5, levelRange: [44, 52] },
            { pokemon: 'zacian', weight: 2, levelRange: [48, 55] },
            { pokemon: 'eternatus', weight: 2, levelRange: [48, 55] }
        ],
        trainers: ['ace_trainer_3', 'veteran_2', 'veteran_3']
    }
};

// ポケモンの進化データ（レベルベース）
// ゲーム内では全てレベル進化に統一（通信進化・石進化もレベルで代用）
window.Game.Data.Evolutions = {
    // 御三家
    bulbasaur:   { evolvedId: 'ivysaur',    levelRequired: 16 },
    ivysaur:     { evolvedId: 'venusaur',   levelRequired: 32 },
    charmander:  { evolvedId: 'charmeleon', levelRequired: 16 },
    charmeleon:  { evolvedId: 'charizard',  levelRequired: 36 },
    squirtle:    { evolvedId: 'wartortle',  levelRequired: 16 },
    wartortle:   { evolvedId: 'blastoise',  levelRequired: 36 },
    // ピカチュウ
    pikachu:     { evolvedId: 'raichu',     levelRequired: 25 },
    // 虫ポケモン
    caterpie:    { evolvedId: 'metapod',    levelRequired: 7 },
    metapod:     { evolvedId: 'butterfree', levelRequired: 10 },
    weedle:      { evolvedId: 'kakuna',     levelRequired: 7 },
    kakuna:      { evolvedId: 'beedrill',   levelRequired: 10 },
    // 鳥ポケモン
    pidgey:      { evolvedId: 'pidgeotto',  levelRequired: 18 },
    pidgeotto:   { evolvedId: 'pidgeot',    levelRequired: 36 },
    // ラッタ
    rattata:     { evolvedId: 'raticate',   levelRequired: 20 },
    // 岩・格闘（通信進化→レベル進化に変更）
    geodude:     { evolvedId: 'graveler',   levelRequired: 25 },
    graveler:    { evolvedId: 'golem',      levelRequired: 40 },
    machop:      { evolvedId: 'machoke',    levelRequired: 28 },
    machoke:     { evolvedId: 'machamp',    levelRequired: 42 },
    // エスパー・ゴースト
    abra:        { evolvedId: 'kadabra',    levelRequired: 16 },
    kadabra:     { evolvedId: 'alakazam',   levelRequired: 38 },
    gastly:      { evolvedId: 'haunter',    levelRequired: 25 },
    haunter:     { evolvedId: 'gengar',     levelRequired: 38 },
    // イーブイ（レベルで進化、ランダム）
    eevee:       { evolvedId: 'jolteon',    levelRequired: 20, randomEvolutions: ['vaporeon', 'jolteon', 'flareon', 'espeon', 'umbreon'] },
    // コイキング
    magikarp:    { evolvedId: 'gyarados',   levelRequired: 20 },
    // リオル
    lucario_riolu: { evolvedId: 'lucario',  levelRequired: 22 },
    // ニドラン
    nidoking:    { evolvedId: 'nidoking',   levelRequired: 99 }, // 既に最終
    nidoqueen:   { evolvedId: 'nidoqueen',  levelRequired: 99 },
    // ストライク→ハッサム
    scyther:     { evolvedId: 'scizor',     levelRequired: 20 },
    // ドラゴン系
    garchomp:    { evolvedId: 'garchomp',   levelRequired: 99 },
    dragonite:   { evolvedId: 'dragonite',  levelRequired: 99 },
    salamence:   { evolvedId: 'salamence',  levelRequired: 99 },
    // メガ進化（高レベル）
    charizard:   { evolvedId: 'mega_charizard',  levelRequired: 50 },
    rayquaza:    { evolvedId: 'mega_rayquaza',   levelRequired: 55 },
    lucario:     { evolvedId: 'mega_lucario',    levelRequired: 45 },
    scizor:      { evolvedId: 'mega_scizor',     levelRequired: 45 },
    gengar:      { evolvedId: 'gengar_mega',     levelRequired: 45 },
    // 追加ポケモン進化
    togetic:     { evolvedId: 'togekiss',   levelRequired: 30 },
};
