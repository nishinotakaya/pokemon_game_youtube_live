// Trainers, Gym Leaders, Elite Four Data
window.Game = window.Game || {};
window.Game.Data = window.Game.Data || {};

// トレーナークラス別画像URL
const TRAINER_SPRITES = {
    youngster: 'https://play.pokemonshowdown.com/sprites/trainers/youngster.png',
    lass: 'https://play.pokemonshowdown.com/sprites/trainers/lass.png',
    bug_catcher: 'https://play.pokemonshowdown.com/sprites/trainers/bugcatcher.png',
    hiker: 'https://play.pokemonshowdown.com/sprites/trainers/hiker.png',
    swimmer: 'https://play.pokemonshowdown.com/sprites/trainers/swimmer.png',
    fisherman: 'https://play.pokemonshowdown.com/sprites/trainers/fisherman.png',
    psychic: 'https://play.pokemonshowdown.com/sprites/trainers/psychic.png',
    ace_trainer: 'https://play.pokemonshowdown.com/sprites/trainers/acetrainer.png',
    veteran: 'https://play.pokemonshowdown.com/sprites/trainers/veteran.png',
    medium: 'https://play.pokemonshowdown.com/sprites/trainers/medium.png',
};

// ジムリーダー・四天王画像URL
const LEADER_SPRITES = {
    brock: 'https://play.pokemonshowdown.com/sprites/trainers/brock.png',
    misty: 'https://play.pokemonshowdown.com/sprites/trainers/misty.png',
    surge: 'https://play.pokemonshowdown.com/sprites/trainers/ltsurge.png',
    erika: 'https://play.pokemonshowdown.com/sprites/trainers/erika.png',
    giovanni: 'https://play.pokemonshowdown.com/sprites/trainers/giovanni.png',
    lorelei: 'https://play.pokemonshowdown.com/sprites/trainers/lorelei-gen1.png',
    bruno: 'https://play.pokemonshowdown.com/sprites/trainers/bruno.png',
    agatha: 'https://play.pokemonshowdown.com/sprites/trainers/agatha-gen1.png',
    lance: 'https://play.pokemonshowdown.com/sprites/trainers/lance.png',
    green: 'https://play.pokemonshowdown.com/sprites/trainers/blue.png',
    oak: 'https://play.pokemonshowdown.com/sprites/trainers/oak.png',
    red: 'https://play.pokemonshowdown.com/sprites/trainers/red-gen1.png',
};

window.Game.Data.TrainerSprites = TRAINER_SPRITES;
window.Game.Data.LeaderSprites = LEADER_SPRITES;

// ルートトレーナー
window.Game.Data.Trainers = {
    youngster_1: {
        name: 'たんぱんこぞうの タカシ',
        type: 'youngster',
        reward: 300,
        team: [
            { pokemon: 'pikachu', level: 5 }
        ],
        dialogue: {
            before: 'よう！ しょうぶだぜ！',
            after: 'やるな おまえ！'
        }
    },
    lass_1: {
        name: 'ミニスカートの ユキ',
        type: 'lass',
        reward: 350,
        team: [
            { pokemon: 'squirtle', level: 6 }
        ],
        dialogue: {
            before: 'わたしの ポケモン つよいわよ！',
            after: 'あら... まけちゃった'
        }
    },
    youngster_2: {
        name: 'たんぱんこぞうの ケンタ',
        type: 'youngster',
        reward: 500,
        team: [
            { pokemon: 'pikachu', level: 8 },
            { pokemon: 'scyther', level: 7 }
        ],
        dialogue: {
            before: 'むしポケモンは さいこうだぜ！',
            after: 'まだまだ つよくなるぞ！'
        }
    },
    bug_catcher_1: {
        name: 'むしとりしょうねんの ヒロシ',
        type: 'bug_catcher',
        reward: 400,
        team: [
            { pokemon: 'scyther', level: 9 },
            { pokemon: 'scyther_alt', level: 8 }
        ],
        dialogue: {
            before: 'むしポケモンの みりょくを みせてやる！',
            after: 'むむ... まだ しゅぎょうが たりないか'
        }
    },
    hiker_1: {
        name: 'やまおとこの ゴウ',
        type: 'hiker',
        reward: 700,
        team: [
            { pokemon: 'groudon', level: 13 },
            { pokemon: 'tyranitar', level: 12 }
        ],
        dialogue: {
            before: 'いわタイプは てっぺきだ！',
            after: 'がっはっは！ やりおる！'
        }
    },
    youngster_3: {
        name: 'たんぱんこぞうの リョウ',
        type: 'youngster',
        reward: 600,
        team: [
            { pokemon: 'blaziken', level: 14 },
            { pokemon: 'infernape', level: 13 }
        ],
        dialogue: {
            before: 'ほのおの パワーを みせるぜ！',
            after: 'あちち... まけた'
        }
    },
    swimmer_1: {
        name: 'かいパンやろうの テツヤ',
        type: 'swimmer',
        reward: 800,
        team: [
            { pokemon: 'kyogre', level: 18 },
            { pokemon: 'greninja', level: 17 }
        ],
        dialogue: {
            before: 'みずの ちからを あじわえ！',
            after: 'つよいな おまえ...'
        }
    },
    fisherman_1: {
        name: 'つりびとの コウジ',
        type: 'fisherman',
        reward: 750,
        team: [
            { pokemon: 'greninja', level: 18 },
            { pokemon: 'squirtle', level: 16 }
        ],
        dialogue: {
            before: 'おおもの つれたぞ！',
            after: 'にがした さかなは おおきかった...'
        }
    },
    psychic_1: {
        name: 'サイキッカーの マサト',
        type: 'psychic',
        reward: 1200,
        team: [
            { pokemon: 'mewtwo', level: 25 },
            { pokemon: 'latias', level: 24 }
        ],
        dialogue: {
            before: 'きみの うごきは すべて よめている...',
            after: 'よめなかった... この けっかは'
        }
    },
    ace_trainer_1: {
        name: 'エリートトレーナーの サクラ',
        type: 'ace_trainer',
        reward: 1500,
        team: [
            { pokemon: 'latios', level: 26 },
            { pokemon: 'zeraora', level: 25 },
            { pokemon: 'darkrai', level: 27 }
        ],
        dialogue: {
            before: 'わたしは まけない',
            after: 'いいバトルだったわ'
        }
    },
    ace_trainer_2: {
        name: 'エリートトレーナーの ダイキ',
        type: 'ace_trainer',
        reward: 2000,
        team: [
            { pokemon: 'rayquaza', level: 32 },
            { pokemon: 'scizor', level: 30 },
            { pokemon: 'salamence', level: 31 }
        ],
        dialogue: {
            before: 'このルートの ばんにんだ',
            after: 'とおるが いい...'
        }
    },
    veteran_1: {
        name: 'ベテランの ヨシオ',
        type: 'veteran',
        reward: 2500,
        team: [
            { pokemon: 'metagross', level: 33 },
            { pokemon: 'tyranitar', level: 34 },
            { pokemon: 'groudon', level: 35 }
        ],
        dialogue: {
            before: 'わしの けいけんを なめるなよ',
            after: 'わかものの ちからは おそろしい'
        }
    },
    medium_1: {
        name: 'ミディアムの レイコ',
        type: 'medium',
        reward: 1000,
        team: [
            { pokemon: 'gengar', level: 28 },
            { pokemon: 'darkrai', level: 30 }
        ],
        dialogue: {
            before: 'この タワーの れいが よんでいる...',
            after: 'れいも おまえを みとめている...'
        }
    },
    medium_2: {
        name: 'ミディアムの カオル',
        type: 'medium',
        reward: 1200,
        team: [
            { pokemon: 'gengar', level: 30 },
            { pokemon: 'giratina', level: 32 }
        ],
        dialogue: {
            before: 'ここから さきは いけないわ...',
            after: 'あなたなら... だいじょうぶね'
        }
    },
    medium_3: {
        name: 'ミディアムの トモコ',
        type: 'medium',
        reward: 1500,
        team: [
            { pokemon: 'giratina', level: 35 },
            { pokemon: 'gengar', level: 33 },
            { pokemon: 'darkrai', level: 34 }
        ],
        dialogue: {
            before: 'タワーの ぬしを おこらせるな...',
            after: 'ぬしは まんぞく しているようだ...'
        }
    },
    ace_trainer_3: {
        name: 'エリートトレーナーの シンジ',
        type: 'ace_trainer',
        reward: 3000,
        team: [
            { pokemon: 'metagross', level: 45 },
            { pokemon: 'salamence', level: 44 },
            { pokemon: 'garchomp', level: 46 }
        ],
        dialogue: {
            before: 'チャンピオンロードを なめるなよ',
            after: 'リーグに いく しかくが あるな'
        }
    },
    veteran_2: {
        name: 'ベテランの マサミ',
        type: 'veteran',
        reward: 3500,
        team: [
            { pokemon: 'dragonite', level: 46 },
            { pokemon: 'tyranitar', level: 47 },
            { pokemon: 'blaziken', level: 45 },
            { pokemon: 'metagross', level: 48 }
        ],
        dialogue: {
            before: 'わしも むかしは チャンピオンを めざした',
            after: 'おまえなら チャンピオンに なれるかもな'
        }
    },
    veteran_3: {
        name: 'ベテランの タダシ',
        type: 'veteran',
        reward: 4000,
        team: [
            { pokemon: 'eternatus', level: 48 },
            { pokemon: 'rayquaza', level: 47 },
            { pokemon: 'kyogre', level: 47 },
            { pokemon: 'groudon', level: 49 }
        ],
        dialogue: {
            before: 'リーグまえの さいごの かべだ',
            after: 'みごとだ... いってこい！'
        }
    }
};

// ジムリーダー（原作FRLG準拠、ゲーム内ポケモンで再現）
window.Game.Data.GymLeaders = {
    nibi_gym: {
        leader: { name: 'ジムリーダー タケシ', title: 'いわタイプの つかいて' },
        image: LEADER_SPRITES.brock,
        badge: 'nibi_badge', badgeName: 'グレーバッジ', type: 'ground', reward: 2000, rewardItem: 'tm_stone_edge',
        team: [
            { pokemon: 'geodude', level: 12 },
            { pokemon: 'onix', level: 14 }
        ],
        dialogue: {
            before: 'おれは いわのように かたい おとこ タケシだ！\nおまえの ポケモンの じつりょくを みせてみろ！',
            after: 'おまえの ちからは ほんものだ！\nグレーバッジを うけとれ！'
        }
    },
    hanada_gym: {
        leader: { name: 'ジムリーダー カスミ', title: 'みずタイプの つかいて' },
        image: LEADER_SPRITES.misty,
        badge: 'hanada_badge', badgeName: 'ブルーバッジ', type: 'water', reward: 3500, rewardItem: 'tm_surf',
        team: [
            { pokemon: 'staryu', level: 18 },
            { pokemon: 'starmie', level: 21 }
        ],
        dialogue: {
            before: 'あたしが ハナダジムの カスミよ！\nみずポケモンの うつくしさと つよさを みなさい！',
            after: 'やるじゃない！ ブルーバッジ あげるわ！'
        }
    },
    kuchiba_gym: {
        leader: { name: 'ジムリーダー マチス', title: 'でんきタイプの つかいて' },
        image: LEADER_SPRITES.surge,
        badge: 'kuchiba_badge', badgeName: 'オレンジバッジ', type: 'electric', reward: 5000, rewardItem: 'tm_thunderbolt',
        team: [
            { pokemon: 'pikachu', level: 18 },
            { pokemon: 'luxray', level: 21 },
            { pokemon: 'raichu', level: 24 }
        ],
        dialogue: {
            before: 'ゴッド・オブ・サンダー マチスだ！\nでんきの パワーで ビリビリ いくぜ！',
            after: 'HAHAHA！ まけたぜ！ オレンジバッジだ！'
        }
    },
    tamamushi_gym: {
        leader: { name: 'ジムリーダー エリカ', title: 'くさタイプの つかいて' },
        image: LEADER_SPRITES.erika,
        badge: 'tamamushi_badge', badgeName: 'レインボーバッジ', type: 'grass', reward: 7000, rewardItem: 'tm_solar_beam',
        team: [
            { pokemon: 'victreebel', level: 29 },
            { pokemon: 'sceptile', level: 29 },
            { pokemon: 'venusaur', level: 32 }
        ],
        dialogue: {
            before: 'わたくしの くさポケモンたちと\nあそんで いただけるかしら？',
            after: 'まあ... おみごとですわ\nレインボーバッジを どうぞ'
        }
    },
    tokiwa_gym: {
        leader: { name: 'ジムリーダー サカキ', title: 'じめんタイプの つかいて' },
        image: LEADER_SPRITES.giovanni,
        badge: 'tokiwa_badge', badgeName: 'グリーンバッジ', type: 'ground', reward: 10000, rewardItem: 'tm_earthquake',
        team: [
            { pokemon: 'nidoqueen', level: 35 },
            { pokemon: 'nidoking', level: 37 },
            { pokemon: 'golem', level: 36 },
            { pokemon: 'rhydon', level: 40 }
        ],
        dialogue: {
            before: 'わたしが さいごの ジムリーダー サカキだ...\nちからを みせてみろ',
            after: 'おまえは... つよい\nグリーンバッジだ とっておけ'
        }
    }
};

// 四天王 + チャンピオン（原作FRLG準拠）
window.Game.Data.EliteFour = [
    {
        name: 'してんのう カンナ',
        title: 'こおり＆みずの つかいて',
        image: LEADER_SPRITES.lorelei,
        reward: 8000,
        team: [
            { pokemon: 'lapras', level: 54 },
            { pokemon: 'milotic', level: 52 },
            { pokemon: 'vaporeon', level: 51 },
            { pokemon: 'gyarados', level: 52 }
        ],
        dialogue: {
            before: 'ポケモンリーグへ ようこそ\nわたしは してんのうの カンナ',
            after: 'あなたの ねつい... かんじたわ\nつぎへ おすすみなさい'
        }
    },
    {
        name: 'してんのう シバ',
        title: 'かくとうタイプの つかいて',
        image: LEADER_SPRITES.bruno,
        reward: 9000,
        team: [
            { pokemon: 'machamp', level: 56 },
            { pokemon: 'lucario', level: 53 },
            { pokemon: 'blaziken', level: 53 },
            { pokemon: 'heracross', level: 54 }
        ],
        dialogue: {
            before: 'おれは かくとうタイプの シバ！\nこぶしで かたる！',
            after: 'おまえの ちからは ほんものだ！'
        }
    },
    {
        name: 'してんのう キクコ',
        title: 'ゴーストタイプの つかいて',
        image: LEADER_SPRITES.agatha,
        reward: 10000,
        team: [
            { pokemon: 'gengar', level: 54 },
            { pokemon: 'gengar', level: 58 },
            { pokemon: 'haunter', level: 53 },
            { pokemon: 'crobat', level: 56 }
        ],
        dialogue: {
            before: 'ヒッヒッヒ...\nゴーストの せかいへ ようこそ',
            after: 'ヒッヒ...\nおまえは おもしろい こだね'
        }
    },
    {
        name: 'してんのう ワタル',
        title: 'ドラゴンタイプの つかいて',
        image: LEADER_SPRITES.lance,
        reward: 12000,
        team: [
            { pokemon: 'gyarados', level: 56 },
            { pokemon: 'dragonite', level: 60 },
            { pokemon: 'garchomp', level: 58 },
            { pokemon: 'salamence', level: 57 }
        ],
        dialogue: {
            before: 'わたしは ドラゴンつかいの ワタル\nさいきょうの してんのうだ',
            after: 'みごとだ...\nチャンピオンが おまえを まっている'
        }
    }
];

window.Game.Data.Champion = {
    name: 'チャンピオン グリーン',
    title: 'ポケモンリーグ チャンピオン',
    image: LEADER_SPRITES.green,
    reward: 20000,
    team: [
        { pokemon: 'pidgeot', level: 59 },
        { pokemon: 'alakazam', level: 57 },
        { pokemon: 'rhydon', level: 59 },
        { pokemon: 'gyarados', level: 61 },
        { pokemon: 'arcanine', level: 59 },
        { pokemon: 'charizard', level: 63 }
    ],
    dialogue: {
        before: 'ようやく ここまで きたか！\nだが チャンピオンは このおれだ！',
        after: '... まけた\nおまえが あたらしい チャンピオンだ'
    }
};

// 博士
window.Game.Data.NPCs = {
    professor_oak: {
        name: 'オーキドはかせ',
        image: LEADER_SPRITES.oak,
        dialogue: {
            first_meeting: [
                'おお！ きみが あたらしい トレーナーか！',
                'わしは ポケモンけんきゅうの オーキドじゃ',
                'ここに 3びきの ポケモンが おる',
                'すきな ポケモンを えらぶがよい！'
            ],
            starter_given: [
                'よい ポケモンを えらんだな！',
                'これで きみも りっぱな トレーナーじゃ',
                'さあ ぼうけんに でかけるのじゃ！'
            ]
        },
        starterPokemon: ['pikachu', 'charmander', 'squirtle', 'bulbasaur', 'scyther', 'zubat']
    }
};
