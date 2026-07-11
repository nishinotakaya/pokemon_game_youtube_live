// ポケモンデータ定義
const POKEMON_DATA = {
  // === 御三家・進化前 ===
  bulbasaur: {
    id: 1, name: "フシギダネ", type: "grass", hp: 75, speed: 45,
    baseHp: 75, baseAtk: 49, baseDef: 49, baseSpd: 45, growthRate: 1.1,
    color: "#22c55e", moves: ["たいあたり", "ソーラービーム", "どくどく", "きあいだめ"]
  },
  ivysaur: {
    id: 2, name: "フシギソウ", type: "grass", hp: 100, speed: 60,
    baseHp: 100, baseAtk: 62, baseDef: 63, baseSpd: 60, growthRate: 1.0,
    color: "#16a34a", moves: ["ソーラービーム", "どくどく", "たいあたり", "きあいだめ"]
  },
  venusaur: {
    id: 3, name: "フシギバナ", type: "grass", hp: 145, speed: 80,
    baseHp: 145, baseAtk: 82, baseDef: 83, baseSpd: 80, growthRate: 0.9,
    color: "#166534", moves: ["ソーラービーム", "どくどく", "じしん", "はかいこうせん"]
  },
  charmander: {
    id: 4, name: "ヒトカゲ", type: "fire", hp: 69, speed: 65,
    baseHp: 69, baseAtk: 52, baseDef: 43, baseSpd: 65, growthRate: 1.1,
    color: "#f97316", moves: ["たいあたり", "かえんほうしゃ", "でんこうせっか", "きあいだめ"]
  },
  charmeleon: {
    id: 5, name: "リザード", type: "fire", hp: 98, speed: 80,
    baseHp: 98, baseAtk: 64, baseDef: 58, baseSpd: 80, growthRate: 1.0,
    color: "#ea580c", moves: ["かえんほうしゃ", "ほのおのうず", "でんこうせっか", "きあいだめ"]
  },
  // charizard は既存（id:6）
  wartortle: {
    id: 8, name: "カメール", type: "water", hp: 99, speed: 58,
    baseHp: 99, baseAtk: 63, baseDef: 80, baseSpd: 58, growthRate: 1.0,
    color: "#3b82f6", moves: ["みずてっぽう", "なみのり", "たいあたり", "からにこもる"]
  },
  blastoise: {
    id: 9, name: "カメックス", type: "water", hp: 144, speed: 78,
    baseHp: 144, baseAtk: 83, baseDef: 100, baseSpd: 78, growthRate: 0.9,
    color: "#1d4ed8", moves: ["ハイドロポンプ", "なみのり", "はかいこうせん", "からにこもる"]
  },
  // === 追加進化前ポケモン ===
  metapod: {
    id: 11, name: "トランセル", type: "bug", hp: 65, speed: 30,
    baseHp: 65, baseAtk: 20, baseDef: 55, baseSpd: 30, growthRate: 1.3,
    color: "#84cc16", moves: ["たいあたり", "からにこもる", "きあいだめ", "れんぞくぎり"]
  },
  butterfree: {
    id: 12, name: "バタフリー", type: "bug", hp: 100, speed: 70,
    baseHp: 100, baseAtk: 65, baseDef: 50, baseSpd: 70, growthRate: 1.1,
    color: "#e2e8f0", moves: ["エアスラッシュ", "サイコキネシス", "どくどく", "つばめがえし"]
  },
  kakuna: {
    id: 14, name: "コクーン", type: "bug", hp: 65, speed: 35,
    baseHp: 65, baseAtk: 25, baseDef: 50, baseSpd: 35, growthRate: 1.3,
    color: "#a16207", moves: ["たいあたり", "からにこもる", "どくどく", "きあいだめ"]
  },
  beedrill: {
    id: 15, name: "スピアー", type: "bug", hp: 105, speed: 75,
    baseHp: 105, baseAtk: 80, baseDef: 40, baseSpd: 75, growthRate: 1.1,
    color: "#fbbf24", moves: ["どくどく", "シザークロス", "つばめがえし", "きあいだめ"]
  },
  pidgeotto: {
    id: 17, name: "ピジョン", type: "flying", hp: 103, speed: 71,
    baseHp: 103, baseAtk: 60, baseDef: 55, baseSpd: 71, growthRate: 1.1,
    color: "#a8a29e", moves: ["つばめがえし", "エアスラッシュ", "でんこうせっか", "きあいだめ"]
  },
  pidgeot: {
    id: 18, name: "ピジョット", type: "flying", hp: 143, speed: 101,
    baseHp: 143, baseAtk: 80, baseDef: 75, baseSpd: 101, growthRate: 0.9,
    color: "#78716c", moves: ["エアスラッシュ", "つばめがえし", "はかいこうせん", "しんそく"]
  },
  raticate: {
    id: 20, name: "ラッタ", type: "normal", hp: 105, speed: 97,
    baseHp: 105, baseAtk: 81, baseDef: 60, baseSpd: 97, growthRate: 1.0,
    color: "#a8a29e", moves: ["かみくだく", "でんこうせっか", "はかいこうせん", "きあいだめ"]
  },
  graveler: {
    id: 75, name: "ゴローン", type: "ground", hp: 105, speed: 35,
    baseHp: 105, baseAtk: 80, baseDef: 100, baseSpd: 35, growthRate: 1.0,
    color: "#78716c", moves: ["じしん", "ストーンエッジ", "たいあたり", "からにこもる"]
  },
  machoke: {
    id: 67, name: "ゴーリキー", type: "fighting", hp: 120, speed: 45,
    baseHp: 120, baseAtk: 90, baseDef: 65, baseSpd: 45, growthRate: 1.0,
    color: "#9ca3af", moves: ["メガトンパンチ", "スカイアッパー", "インファイト", "きあいだめ"]
  },
  kadabra: {
    id: 64, name: "ユンゲラー", type: "psychic", hp: 70, speed: 105,
    baseHp: 70, baseAtk: 95, baseDef: 40, baseSpd: 105, growthRate: 1.0,
    color: "#fbbf24", moves: ["サイコキネシス", "サイコショック", "シャドーボール", "でんこうせっか"]
  },
  haunter: {
    id: 93, name: "ゴースト", type: "ghost", hp: 80, speed: 95,
    baseHp: 80, baseAtk: 90, baseDef: 45, baseSpd: 95, growthRate: 1.0,
    color: "#6b21a8", moves: ["シャドーボール", "ダークパルス", "どくどく", "ナイトメア"]
  },
  // ===（既存ポケモンここから）===
  pikachu: {
    id: 25, name: "ピカチュウ", type: "electric", hp: 100, speed: 90,
    baseHp: 100, baseAtk: 75, baseDef: 55, baseSpd: 90, growthRate: 1.0,
    color: "#facc15", moves: ["でんきショック", "アイアンテール", "でんこうせっか", "10まんボルト"]
  },
  squirtle: {
    id: 7, name: "ゼニガメ", type: "water", hp: 120, speed: 43,
    baseHp: 120, baseAtk: 65, baseDef: 80, baseSpd: 43, growthRate: 1.0,
    color: "#60a5fa", moves: ["みずてっぽう", "メガトンパンチ", "たいあたり", "からにこもる"]
  },
  scyther: {
    id: 123, name: "ストライク", type: "bug", hp: 110, speed: 105,
    baseHp: 110, baseAtk: 90, baseDef: 60, baseSpd: 105, growthRate: 1.0,
    color: "#4ade80", moves: ["れんぞくぎり", "シザークロス", "つばめがえし", "きあいだめ"]
  },
  scizor: {
    id: 212, name: "ハッサム", type: "steel", hp: 130, speed: 65,
    baseHp: 130, baseAtk: 100, baseDef: 95, baseSpd: 65, growthRate: 1.0,
    color: "#ef4444", moves: ["はがねのつばさ", "メタルクロー", "バレットパンチ", "アイアンヘッド"]
  },
  scyther_alt: {
    id: 900, name: "バサギリ", type: "bug", hp: 115, speed: 75,
    baseHp: 115, baseAtk: 85, baseDef: 70, baseSpd: 75, growthRate: 1.0,
    color: "#4ade80", moves: ["エアスラッシュ", "シザークロス", "つばめがえし", "きあいだめ"]
  },
  zubat: {
    id: 41, name: "ズバット", type: "poison", hp: 70, speed: 55,
    baseHp: 70, baseAtk: 45, baseDef: 35, baseSpd: 55, growthRate: 1.2,
    color: "#6b21a8", moves: ["つばさでうつ", "きゅうけつ", "どくどく", "エアスラッシュ"]
  },
  rayquaza: {
    id: 384, name: "レックウザ", type: "dragon", hp: 150, speed: 95,
    baseHp: 150, baseAtk: 120, baseDef: 80, baseSpd: 95, growthRate: 0.8,
    color: "#10b981", moves: ["りゅうせいぐん", "はがねのつばさ", "かみなり", "だいもんじ"]
  },
  black_rayquaza: {
    id: 384, name: "レックウザ", type: "dragon", hp: 160, speed: 95,
    baseHp: 160, baseAtk: 125, baseDef: 85, baseSpd: 95, growthRate: 0.8,
    color: "#1e293b", moves: ["りゅうせいぐん", "はがねのつばさ", "かみなり", "だいもんじ"]
  },
  charizard: {
    id: 6, name: "リザードン", type: "fire", hp: 140, speed: 100,
    baseHp: 140, baseAtk: 105, baseDef: 70, baseSpd: 100, growthRate: 1.0,
    color: "#f97316", moves: ["かえんほうしゃ", "はかいこうせん", "ほのおのうず", "だいもんじ"]
  },
  lucario: {
    id: 448, name: "ルカリオ", type: "fighting", hp: 135, speed: 90,
    baseHp: 135, baseAtk: 100, baseDef: 75, baseSpd: 90, growthRate: 1.0,
    color: "#3b82f6", moves: ["シャドーボール", "はどうだん", "きんせつパンチ", "ドレインパンチ"]
  },
  eternatus: {
    id: 890, name: "ムゲンダイナ", type: "dragon", hp: 160, speed: 130,
    baseHp: 160, baseAtk: 130, baseDef: 85, baseSpd: 130, growthRate: 0.8,
    color: "#a855f7", moves: ["ムゲンストーム", "どくどく", "りゅうせいぐん", "エターナルビーム"]
  },
  zeraora: {
    id: 807, name: "ゼラオラ", type: "electric", hp: 155, speed: 143,
    baseHp: 155, baseAtk: 115, baseDef: 70, baseSpd: 143, growthRate: 0.8,
    color: "#facc15", moves: ["プラズマフィスト", "10まんボルト", "かみなりパンチ", "ボルテッカー"]
  },
  zapdos: {
    id: 145, name: "サンダー", type: "electric", hp: 160, speed: 100,
    baseHp: 160, baseAtk: 105, baseDef: 80, baseSpd: 100, growthRate: 0.8,
    color: "#facc15", moves: ["でんじほう", "かみなり", "10まんボルト", "はねやすめ"]
  },
  mewtwo: {
    id: 150, name: "ミュウツー", type: "psychic", hp: 160, speed: 130,
    baseHp: 160, baseAtk: 130, baseDef: 80, baseSpd: 130, growthRate: 0.8,
    color: "#a855f7", moves: ["サイコキネシス", "サイコブレイク", "シャドーボール", "サイコショック"]
  },
  kyogre: {
    id: 382, name: "カイオーガ", type: "water", hp: 170, speed: 90,
    baseHp: 170, baseAtk: 120, baseDef: 90, baseSpd: 90, growthRate: 0.8,
    color: "#3b82f6", moves: ["しおみず", "なみのり", "ハイドロポンプ", "コールドフレア"]
  },
  groudon: {
    id: 383, name: "グラードン", type: "ground", hp: 170, speed: 90,
    baseHp: 170, baseAtk: 120, baseDef: 100, baseSpd: 90, growthRate: 0.8,
    color: "#dc2626", moves: ["じしん", "だいちのちから", "ソーラービーム", "マグマストーム"]
  },
  // 進化後のポケモン
  raichu: {
    id: 26, name: "ライチュウ", type: "electric", hp: 120, speed: 110,
    baseHp: 120, baseAtk: 85, baseDef: 65, baseSpd: 110, growthRate: 1.0,
    color: "#facc15", moves: ["10まんボルト", "かみなり", "でんげき", "ボルテッカー"]
  },
  mega_rayquaza: {
    id: 384, name: "メガレックウザ", type: "dragon", hp: 180, speed: 115,
    baseHp: 180, baseAtk: 145, baseDef: 95, baseSpd: 115, growthRate: 0.8,
    color: "#10b981", moves: ["コアエンサー", "りゅうせいぐん", "かみなり", "だいもんじ"]
  },
  mega_charizard: {
    id: 6, name: "メガリザードン", type: "fire", hp: 170, speed: 100,
    baseHp: 170, baseAtk: 130, baseDef: 85, baseSpd: 100, growthRate: 1.0,
    color: "#f97316", moves: ["メガフレイム", "はかいこうせん", "ほのおのうず", "だいもんじ"]
  },
  mega_lucario: {
    id: 448, name: "メガルカリオ", type: "fighting", hp: 160, speed: 112,
    baseHp: 160, baseAtk: 125, baseDef: 85, baseSpd: 112, growthRate: 1.0,
    color: "#3b82f6", moves: ["メガパンチ", "はどうだん", "きんせつパンチ", "シャドーボール"]
  },
  mega_scizor: {
    id: 212, name: "メガハッサム", type: "steel", hp: 150, speed: 75,
    baseHp: 150, baseAtk: 120, baseDef: 110, baseSpd: 75, growthRate: 1.0,
    color: "#ef4444", moves: ["はがねのつばさ", "メタルクロー", "バレットパンチ", "アイアンヘッド"]
  },
  mega_mewtwo_x: {
    id: 10043, name: "メガミュウツーX", type: "fighting", hp: 175, speed: 130,
    baseHp: 175, baseAtk: 145, baseDef: 95, baseSpd: 130, growthRate: 0.8,
    color: "#6d28d9", moves: ["サイコブレイク", "インファイト", "きんせつパンチ", "サイコキネシス"]
  },
  gengar: {
    id: 94, name: "ゲンガー", type: "ghost", hp: 150, speed: 110,
    baseHp: 150, baseAtk: 110, baseDef: 55, baseSpd: 110, growthRate: 1.0,
    color: "#7c3aed", moves: ["ダークヴォルテックス", "ファントムバースト", "シャドウテイル", "ナイトメア"]
  },
  bagfoon: {
    id: 157, name: "バッグフーン", type: "fire", hp: 160, speed: 100,
    baseHp: 160, baseAtk: 105, baseDef: 70, baseSpd: 100, growthRate: 1.0,
    color: "#dc2626", moves: ["インフェルノ", "フレアブリッツ", "れっかパンチ", "ばくえん"]
  },
  latias: {
    id: 380, name: "ラティアス", type: "psychic", hp: 165, speed: 110,
    baseHp: 165, baseAtk: 95, baseDef: 100, baseSpd: 110, growthRate: 0.8,
    color: "#ec4899", moves: ["ミストバースト", "ドラゴンソウル", "しんぴのまい", "はどうほう"]
  },
  latios: {
    id: 381, name: "ラティオス", type: "dragon", hp: 165, speed: 110,
    baseHp: 165, baseAtk: 110, baseDef: 85, baseSpd: 110, growthRate: 0.8,
    color: "#3b82f6", moves: ["ラスターパージ", "ドラゴンブレス", "サイコブースト", "りゅうのいかり"]
  },
  // 追加ポケモン
  garchomp: {
    id: 445, name: "ガブリアス", type: "dragon", hp: 160, speed: 102,
    baseHp: 160, baseAtk: 115, baseDef: 80, baseSpd: 102, growthRate: 0.9,
    color: "#1e40af", moves: ["ドラゴンクロー", "じしん", "げきりん", "ストーンエッジ"]
  },
  dragonite: {
    id: 149, name: "カイリュー", type: "dragon", hp: 155, speed: 80,
    baseHp: 155, baseAtk: 110, baseDef: 85, baseSpd: 80, growthRate: 0.9,
    color: "#f59e0b", moves: ["りゅうせいぐん", "かみなり", "はかいこうせん", "しんそく"]
  },
  tyranitar: {
    id: 248, name: "バンギラス", type: "ground", hp: 170, speed: 61,
    baseHp: 170, baseAtk: 110, baseDef: 100, baseSpd: 61, growthRate: 0.9,
    color: "#065f46", moves: ["ストーンエッジ", "かみくだく", "じしん", "だいもんじ"]
  },
  blaziken: {
    id: 257, name: "バシャーモ", type: "fire", hp: 145, speed: 80,
    baseHp: 145, baseAtk: 105, baseDef: 65, baseSpd: 80, growthRate: 1.0,
    color: "#dc2626", moves: ["ブレイズキック", "スカイアッパー", "フレアドライブ", "ブラストバーン"]
  },
  greninja: {
    id: 658, name: "ゲッコウガ", type: "water", hp: 140, speed: 122,
    baseHp: 140, baseAtk: 100, baseDef: 60, baseSpd: 122, growthRate: 1.0,
    color: "#1e3a5f", moves: ["みずしゅりけん", "あくのはどう", "ハイドロカノン", "かげぶんしん"]
  },
  darkrai: {
    id: 491, name: "ダークライ", type: "ghost", hp: 155, speed: 125,
    baseHp: 155, baseAtk: 110, baseDef: 70, baseSpd: 125, growthRate: 0.8,
    color: "#1a1a2e", moves: ["ダークホール", "ダークパルス", "あくのはどう", "あくむ"]
  },
  giratina: {
    id: 487, name: "ギラティナ", type: "ghost", hp: 175, speed: 90,
    baseHp: 175, baseAtk: 100, baseDef: 110, baseSpd: 90, growthRate: 0.8,
    color: "#4a1a6b", moves: ["シャドーダイブ", "ドラゴンダイブ", "シャドーフォース", "げんしのちから"]
  },
  salamence: {
    id: 373, name: "ボーマンダ", type: "dragon", hp: 155, speed: 100,
    baseHp: 155, baseAtk: 110, baseDef: 75, baseSpd: 100, growthRate: 0.9,
    color: "#2563eb", moves: ["ドラゴンクロー", "だいもんじ", "りゅうのまい", "そらをとぶ"]
  },
  metagross: {
    id: 376, name: "メタグロス", type: "steel", hp: 160, speed: 70,
    baseHp: 160, baseAtk: 110, baseDef: 110, baseSpd: 70, growthRate: 0.9,
    color: "#6b7280", moves: ["コメットパンチ", "サイコキネシス", "バレットパンチ", "じしん"]
  },
  infernape: {
    id: 392, name: "ゴウカザル", type: "fire", hp: 140, speed: 108,
    baseHp: 140, baseAtk: 104, baseDef: 65, baseSpd: 108, growthRate: 1.0,
    color: "#b45309", moves: ["インファイト", "フレアドライブ", "マッハパンチ", "オーバーヒート"]
  },
  // === 追加ポケモン（10体） ===
  snorlax: {
    id: 143, name: "カビゴン", type: "normal", hp: 220, speed: 30,
    baseHp: 220, baseAtk: 90, baseDef: 100, baseSpd: 30, growthRate: 0.9,
    color: "#1e293b", moves: ["のしかかり", "はかいこうせん", "じしん", "からにこもる"]
  },
  gengar_mega: {
    id: 94, name: "メガゲンガー", type: "ghost", hp: 170, speed: 130,
    baseHp: 170, baseAtk: 130, baseDef: 70, baseSpd: 130, growthRate: 0.8,
    color: "#f5f5f5", moves: ["ダークヴォルテックス", "ファントムバースト", "シャドウテイル", "ナイトメア"]
  },
  absol: {
    id: 359, name: "アブソル", type: "ghost", hp: 130, speed: 115,
    baseHp: 130, baseAtk: 120, baseDef: 50, baseSpd: 115, growthRate: 1.0,
    color: "#f8fafc", moves: ["あくのはどう", "サイコキネシス", "かみくだく", "シザークロス"]
  },
  togekiss: {
    id: 468, name: "トゲキッス", type: "flying", hp: 145, speed: 80,
    baseHp: 145, baseAtk: 95, baseDef: 85, baseSpd: 80, growthRate: 1.0,
    color: "#fef9c3", moves: ["エアスラッシュ", "はかいこうせん", "だいもんじ", "はどうだん"]
  },
  milotic: {
    id: 350, name: "ミロカロス", type: "water", hp: 160, speed: 81,
    baseHp: 160, baseAtk: 80, baseDef: 105, baseSpd: 81, growthRate: 0.9,
    color: "#fce7f3", moves: ["ハイドロポンプ", "なみのり", "しんぴのまい", "はかいこうせん"]
  },
  electivire: {
    id: 466, name: "エレキブル", type: "electric", hp: 150, speed: 95,
    baseHp: 150, baseAtk: 110, baseDef: 75, baseSpd: 95, growthRate: 1.0,
    color: "#fbbf24", moves: ["かみなりパンチ", "10まんボルト", "じしん", "かみなり"]
  },
  magmortar: {
    id: 467, name: "ブーバーン", type: "fire", hp: 150, speed: 83,
    baseHp: 150, baseAtk: 110, baseDef: 75, baseSpd: 83, growthRate: 1.0,
    color: "#ef4444", moves: ["だいもんじ", "かえんほうしゃ", "オーバーヒート", "はかいこうせん"]
  },
  weavile: {
    id: 461, name: "マニューラ", type: "ghost", hp: 130, speed: 125,
    baseHp: 130, baseAtk: 115, baseDef: 55, baseSpd: 125, growthRate: 1.0,
    color: "#1e293b", moves: ["あくのはどう", "シザークロス", "かみくだく", "ダークパルス"]
  },
  togetic: {
    id: 176, name: "トゲチック", type: "flying", hp: 115, speed: 60,
    baseHp: 115, baseAtk: 60, baseDef: 85, baseSpd: 60, growthRate: 1.2,
    color: "#fef3c7", moves: ["エアスラッシュ", "はどうだん", "たいあたり", "からにこもる"]
  },
  luxray: {
    id: 405, name: "レントラー", type: "electric", hp: 145, speed: 95,
    baseHp: 145, baseAtk: 105, baseDef: 70, baseSpd: 95, growthRate: 1.0,
    color: "#1e40af", moves: ["かみなり", "10まんボルト", "かみくだく", "でんこうせっか"]
  },
  // === 大量追加ポケモン ===
  pidgey: {
    id: 16, name: "ポッポ", type: "flying", hp: 70, speed: 56,
    baseHp: 70, baseAtk: 45, baseDef: 40, baseSpd: 56, growthRate: 1.2,
    color: "#a8a29e", moves: ["たいあたり", "つばめがえし", "でんこうせっか", "エアスラッシュ"]
  },
  rattata: {
    id: 19, name: "コラッタ", type: "normal", hp: 55, speed: 72,
    baseHp: 55, baseAtk: 56, baseDef: 35, baseSpd: 72, growthRate: 1.2,
    color: "#a855f7", moves: ["たいあたり", "でんこうせっか", "かみくだく", "きあいだめ"]
  },
  caterpie: {
    id: 10, name: "キャタピー", type: "bug", hp: 55, speed: 45,
    baseHp: 55, baseAtk: 30, baseDef: 35, baseSpd: 45, growthRate: 1.3,
    color: "#84cc16", moves: ["たいあたり", "れんぞくぎり", "きあいだめ", "からにこもる"]
  },
  weedle: {
    id: 13, name: "ビードル", type: "bug", hp: 60, speed: 50,
    baseHp: 60, baseAtk: 35, baseDef: 30, baseSpd: 50, growthRate: 1.3,
    color: "#a16207", moves: ["たいあたり", "どくどく", "れんぞくぎり", "きあいだめ"]
  },
  geodude: {
    id: 74, name: "イシツブテ", type: "ground", hp: 70, speed: 20,
    baseHp: 70, baseAtk: 60, baseDef: 80, baseSpd: 20, growthRate: 1.1,
    color: "#78716c", moves: ["たいあたり", "じしん", "ストーンエッジ", "からにこもる"]
  },
  machop: {
    id: 66, name: "ワンリキー", type: "fighting", hp: 80, speed: 35,
    baseHp: 80, baseAtk: 70, baseDef: 50, baseSpd: 35, growthRate: 1.1,
    color: "#9ca3af", moves: ["メガトンパンチ", "スカイアッパー", "きあいだめ", "たいあたり"]
  },
  abra: {
    id: 63, name: "ケーシィ", type: "psychic", hp: 50, speed: 90,
    baseHp: 50, baseAtk: 75, baseDef: 30, baseSpd: 90, growthRate: 1.1,
    color: "#fbbf24", moves: ["サイコキネシス", "サイコショック", "シャドーボール", "でんこうせっか"]
  },
  gastly: {
    id: 92, name: "ゴース", type: "ghost", hp: 55, speed: 80,
    baseHp: 55, baseAtk: 70, baseDef: 30, baseSpd: 80, growthRate: 1.1,
    color: "#6b21a8", moves: ["シャドーボール", "ダークパルス", "どくどく", "ナイトメア"]
  },
  eevee: {
    id: 133, name: "イーブイ", type: "normal", hp: 85, speed: 55,
    baseHp: 85, baseAtk: 55, baseDef: 55, baseSpd: 55, growthRate: 1.2,
    color: "#a16207", moves: ["たいあたり", "でんこうせっか", "かみくだく", "きあいだめ"]
  },
  vaporeon: {
    id: 134, name: "シャワーズ", type: "water", hp: 200, speed: 65,
    baseHp: 200, baseAtk: 80, baseDef: 80, baseSpd: 65, growthRate: 1.0,
    color: "#60a5fa", moves: ["ハイドロポンプ", "なみのり", "みずてっぽう", "からにこもる"]
  },
  jolteon: {
    id: 135, name: "サンダース", type: "electric", hp: 120, speed: 130,
    baseHp: 120, baseAtk: 100, baseDef: 55, baseSpd: 130, growthRate: 1.0,
    color: "#facc15", moves: ["10まんボルト", "かみなり", "でんこうせっか", "でんきショック"]
  },
  flareon: {
    id: 136, name: "ブースター", type: "fire", hp: 120, speed: 65,
    baseHp: 120, baseAtk: 110, baseDef: 70, baseSpd: 65, growthRate: 1.0,
    color: "#f97316", moves: ["かえんほうしゃ", "だいもんじ", "フレアドライブ", "でんこうせっか"]
  },
  gyarados: {
    id: 130, name: "ギャラドス", type: "water", hp: 165, speed: 81,
    baseHp: 165, baseAtk: 110, baseDef: 80, baseSpd: 81, growthRate: 0.9,
    color: "#2563eb", moves: ["ハイドロポンプ", "はかいこうせん", "かみくだく", "りゅうのまい"]
  },
  lapras: {
    id: 131, name: "ラプラス", type: "water", hp: 200, speed: 60,
    baseHp: 200, baseAtk: 85, baseDef: 90, baseSpd: 60, growthRate: 0.9,
    color: "#7dd3fc", moves: ["ハイドロポンプ", "なみのり", "コールドフレア", "はかいこうせん"]
  },
  arcanine: {
    id: 59, name: "ウインディ", type: "fire", hp: 155, speed: 95,
    baseHp: 155, baseAtk: 100, baseDef: 80, baseSpd: 95, growthRate: 0.9,
    color: "#f97316", moves: ["かえんほうしゃ", "フレアドライブ", "しんそく", "だいもんじ"]
  },
  alakazam: {
    id: 65, name: "フーディン", type: "psychic", hp: 110, speed: 120,
    baseHp: 110, baseAtk: 115, baseDef: 50, baseSpd: 120, growthRate: 1.0,
    color: "#fbbf24", moves: ["サイコキネシス", "サイコブレイク", "シャドーボール", "サイコショック"]
  },
  machamp: {
    id: 68, name: "カイリキー", type: "fighting", hp: 155, speed: 55,
    baseHp: 155, baseAtk: 115, baseDef: 80, baseSpd: 55, growthRate: 0.9,
    color: "#9ca3af", moves: ["インファイト", "メガトンパンチ", "スカイアッパー", "じしん"]
  },
  golem: {
    id: 76, name: "ゴローニャ", type: "ground", hp: 145, speed: 45,
    baseHp: 145, baseAtk: 100, baseDef: 120, baseSpd: 45, growthRate: 0.9,
    color: "#78716c", moves: ["じしん", "ストーンエッジ", "だいちのちから", "だいもんじ"]
  },
  onix: {
    id: 95, name: "イワーク", type: "ground", hp: 60, speed: 70,
    baseHp: 60, baseAtk: 45, baseDef: 130, baseSpd: 70, growthRate: 1.0,
    color: "#78716c", moves: ["たいあたり", "ストーンエッジ", "じしん", "からにこもる"]
  },
  steelix: {
    id: 208, name: "ハガネール", type: "steel", hp: 150, speed: 30,
    baseHp: 150, baseAtk: 85, baseDef: 150, baseSpd: 30, growthRate: 0.9,
    color: "#6b7280", moves: ["アイアンヘッド", "じしん", "ストーンエッジ", "からにこもる"]
  },
  staryu: {
    id: 120, name: "ヒトデマン", type: "water", hp: 55, speed: 85,
    baseHp: 55, baseAtk: 55, baseDef: 55, baseSpd: 85, growthRate: 1.1,
    color: "#a8722a", moves: ["みずてっぽう", "なみのり", "でんこうせっか", "からにこもる"]
  },
  starmie: {
    id: 121, name: "スターミー", type: "water", hp: 100, speed: 115,
    baseHp: 100, baseAtk: 95, baseDef: 85, baseSpd: 115, growthRate: 0.9,
    color: "#a855f7", moves: ["ハイドロポンプ", "サイコキネシス", "なみのり", "でんこうせっか"]
  },
  aggron: {
    id: 306, name: "ボスゴドラ", type: "steel", hp: 140, speed: 50,
    baseHp: 140, baseAtk: 100, baseDef: 140, baseSpd: 50, growthRate: 0.9,
    color: "#9ca3af", moves: ["アイアンヘッド", "はがねのつばさ", "じしん", "はかいこうせん"]
  },
  golbat: {
    id: 42, name: "ゴルバット", type: "poison", hp: 110, speed: 90,
    baseHp: 110, baseAtk: 80, baseDef: 70, baseSpd: 90, growthRate: 1.0,
    color: "#5b21b6", moves: ["つばさでうつ", "きゅうけつ", "どくどく", "エアスラッシュ"]
  },
  crobat: {
    id: 169, name: "クロバット", type: "poison", hp: 130, speed: 130,
    baseHp: 130, baseAtk: 85, baseDef: 70, baseSpd: 130, growthRate: 1.0,
    color: "#7c3aed", moves: ["どくどく", "エアスラッシュ", "かみくだく", "つばめがえし"]
  },
  espeon: {
    id: 196, name: "エーフィ", type: "psychic", hp: 120, speed: 110,
    baseHp: 120, baseAtk: 110, baseDef: 65, baseSpd: 110, growthRate: 1.0,
    color: "#d946ef", moves: ["サイコキネシス", "サイコショック", "シャドーボール", "しんそく"]
  },
  umbreon: {
    id: 197, name: "ブラッキー", type: "ghost", hp: 160, speed: 65,
    baseHp: 160, baseAtk: 65, baseDef: 110, baseSpd: 65, growthRate: 1.0,
    color: "#1e293b", moves: ["あくのはどう", "ダークパルス", "からにこもる", "かみくだく"]
  },
  houndoom: {
    id: 229, name: "ヘルガー", type: "fire", hp: 130, speed: 95,
    baseHp: 130, baseAtk: 100, baseDef: 55, baseSpd: 95, growthRate: 1.0,
    color: "#1e293b", moves: ["だいもんじ", "あくのはどう", "かえんほうしゃ", "かみくだく"]
  },
  heracross: {
    id: 214, name: "ヘラクロス", type: "bug", hp: 145, speed: 85,
    baseHp: 145, baseAtk: 115, baseDef: 80, baseSpd: 85, growthRate: 0.9,
    color: "#1d4ed8", moves: ["インファイト", "シザークロス", "メガトンパンチ", "じしん"]
  },
  kingdra: {
    id: 230, name: "キングドラ", type: "dragon", hp: 150, speed: 85,
    baseHp: 150, baseAtk: 95, baseDef: 95, baseSpd: 85, growthRate: 0.9,
    color: "#2563eb", moves: ["ハイドロポンプ", "りゅうせいぐん", "なみのり", "りゅうのまい"]
  },
  flygon: {
    id: 330, name: "フライゴン", type: "dragon", hp: 145, speed: 100,
    baseHp: 145, baseAtk: 100, baseDef: 80, baseSpd: 100, growthRate: 1.0,
    color: "#22c55e", moves: ["ドラゴンクロー", "じしん", "だいもんじ", "りゅうのまい"]
  },
  swampert: {
    id: 260, name: "ラグラージ", type: "water", hp: 170, speed: 60,
    baseHp: 170, baseAtk: 100, baseDef: 90, baseSpd: 60, growthRate: 1.0,
    color: "#3b82f6", moves: ["ハイドロポンプ", "じしん", "なみのり", "はかいこうせん"]
  },
  sceptile: {
    id: 254, name: "ジュカイン", type: "grass", hp: 130, speed: 120,
    baseHp: 130, baseAtk: 100, baseDef: 60, baseSpd: 120, growthRate: 1.0,
    color: "#22c55e", moves: ["ソーラービーム", "ドラゴンクロー", "でんこうせっか", "きあいだめ"]
  },
  staraptor: {
    id: 398, name: "ムクホーク", type: "flying", hp: 140, speed: 100,
    baseHp: 140, baseAtk: 105, baseDef: 65, baseSpd: 100, growthRate: 1.0,
    color: "#78716c", moves: ["つばめがえし", "インファイト", "エアスラッシュ", "しんそく"]
  },
  lucario_riolu: {
    id: 447, name: "リオル", type: "fighting", hp: 70, speed: 60,
    baseHp: 70, baseAtk: 55, baseDef: 40, baseSpd: 60, growthRate: 1.2,
    color: "#60a5fa", moves: ["はどうだん", "メガトンパンチ", "でんこうせっか", "きあいだめ"]
  },
  magikarp: {
    id: 129, name: "コイキング", type: "water", hp: 40, speed: 80,
    baseHp: 40, baseAtk: 10, baseDef: 20, baseSpd: 80, growthRate: 1.3,
    color: "#ef4444", moves: ["たいあたり", "みずてっぽう", "たいあたり", "たいあたり"]
  },
  ditto: {
    id: 132, name: "メタモン", type: "normal", hp: 80, speed: 48,
    baseHp: 80, baseAtk: 48, baseDef: 48, baseSpd: 48, growthRate: 1.2,
    color: "#d946ef", moves: ["たいあたり", "メガトンパンチ", "きあいだめ", "からにこもる"]
  },
  nidoking: {
    id: 34, name: "ニドキング", type: "poison", hp: 150, speed: 85,
    baseHp: 150, baseAtk: 95, baseDef: 75, baseSpd: 85, growthRate: 1.0,
    color: "#7c3aed", moves: ["じしん", "どくどく", "はかいこうせん", "メガトンパンチ"]
  },
  nidoqueen: {
    id: 31, name: "ニドクイン", type: "poison", hp: 155, speed: 76,
    baseHp: 155, baseAtk: 82, baseDef: 87, baseSpd: 76, growthRate: 1.0,
    color: "#60a5fa", moves: ["じしん", "どくどく", "はかいこうせん", "からにこもる"]
  },
  rapidash: {
    id: 78, name: "ギャロップ", type: "fire", hp: 120, speed: 105,
    baseHp: 120, baseAtk: 90, baseDef: 65, baseSpd: 105, growthRate: 1.0,
    color: "#f97316", moves: ["かえんほうしゃ", "フレアドライブ", "しんそく", "だいもんじ"]
  },
  poliwrath: {
    id: 62, name: "ニョロボン", type: "water", hp: 155, speed: 70,
    baseHp: 155, baseAtk: 85, baseDef: 95, baseSpd: 70, growthRate: 1.0,
    color: "#3b82f6", moves: ["ハイドロポンプ", "インファイト", "なみのり", "はどうだん"]
  },
  victreebel: {
    id: 71, name: "ウツボット", type: "grass", hp: 135, speed: 70,
    baseHp: 135, baseAtk: 95, baseDef: 60, baseSpd: 70, growthRate: 1.0,
    color: "#22c55e", moves: ["ソーラービーム", "どくどく", "かみくだく", "きあいだめ"]
  },
  primeape: {
    id: 57, name: "オコリザル", type: "fighting", hp: 120, speed: 95,
    baseHp: 120, baseAtk: 95, baseDef: 55, baseSpd: 95, growthRate: 1.0,
    color: "#d4a06a", moves: ["インファイト", "スカイアッパー", "メガトンパンチ", "きあいだめ"]
  },
  rhydon: {
    id: 112, name: "サイドン", type: "ground", hp: 175, speed: 40,
    baseHp: 175, baseAtk: 110, baseDef: 110, baseSpd: 40, growthRate: 0.9,
    color: "#78716c", moves: ["じしん", "ストーンエッジ", "はかいこうせん", "だいちのちから"]
  },
  magnezone: {
    id: 462, name: "ジバコイル", type: "electric", hp: 140, speed: 60,
    baseHp: 140, baseAtk: 110, baseDef: 105, baseSpd: 60, growthRate: 0.9,
    color: "#9ca3af", moves: ["10まんボルト", "かみなり", "はがねのつばさ", "はかいこうせん"]
  },
  gliscor: {
    id: 472, name: "グライオン", type: "ground", hp: 140, speed: 95,
    baseHp: 140, baseAtk: 90, baseDef: 105, baseSpd: 95, growthRate: 1.0,
    color: "#7c3aed", moves: ["じしん", "エアスラッシュ", "どくどく", "つばめがえし"]
  },
  chandelure: {
    id: 609, name: "シャンデラ", type: "ghost", hp: 120, speed: 80,
    baseHp: 120, baseAtk: 125, baseDef: 70, baseSpd: 80, growthRate: 0.9,
    color: "#7c3aed", moves: ["だいもんじ", "シャドーボール", "ダークパルス", "ナイトメア"]
  },
  hydreigon: {
    id: 635, name: "サザンドラ", type: "dragon", hp: 160, speed: 98,
    baseHp: 160, baseAtk: 115, baseDef: 80, baseSpd: 98, growthRate: 0.8,
    color: "#1e293b", moves: ["りゅうせいぐん", "あくのはどう", "だいもんじ", "はかいこうせん"]
  },
  volcarona: {
    id: 637, name: "ウルガモス", type: "fire", hp: 145, speed: 100,
    baseHp: 145, baseAtk: 115, baseDef: 65, baseSpd: 100, growthRate: 0.8,
    color: "#f97316", moves: ["だいもんじ", "ソーラービーム", "かえんほうしゃ", "りゅうのまい"]
  },
  aegislash: {
    id: 681, name: "ギルガルド", type: "steel", hp: 120, speed: 60,
    baseHp: 120, baseAtk: 120, baseDef: 120, baseSpd: 60, growthRate: 0.9,
    color: "#78716c", moves: ["アイアンヘッド", "シャドーボール", "はがねのつばさ", "からにこもる"]
  },
  mimikyu: {
    id: 778, name: "ミミッキュ", type: "ghost", hp: 115, speed: 96,
    baseHp: 115, baseAtk: 90, baseDef: 80, baseSpd: 96, growthRate: 1.0,
    color: "#fbbf24", moves: ["シャドーボール", "ダークパルス", "シザークロス", "りゅうのまい"]
  },
  toxtricity: {
    id: 849, name: "ストリンダー", type: "electric", hp: 140, speed: 75,
    baseHp: 140, baseAtk: 108, baseDef: 70, baseSpd: 75, growthRate: 1.0,
    color: "#a855f7", moves: ["10まんボルト", "かみなり", "どくどく", "はかいこうせん"]
  },
  dragapult: {
    id: 887, name: "ドラパルト", type: "dragon", hp: 148, speed: 142,
    baseHp: 148, baseAtk: 110, baseDef: 65, baseSpd: 142, growthRate: 0.8,
    color: "#1e293b", moves: ["りゅうせいぐん", "シャドーボール", "だいもんじ", "しんそく"]
  },
  cinderace: {
    id: 815, name: "エースバーン", type: "fire", hp: 145, speed: 119,
    baseHp: 145, baseAtk: 106, baseDef: 65, baseSpd: 119, growthRate: 1.0,
    color: "#ef4444", moves: ["フレアドライブ", "ブレイズキック", "しんそく", "はかいこうせん"]
  },
  inteleon: {
    id: 818, name: "インテレオン", type: "water", hp: 135, speed: 120,
    baseHp: 135, baseAtk: 105, baseDef: 55, baseSpd: 120, growthRate: 1.0,
    color: "#3b82f6", moves: ["ハイドロカノン", "ハイドロポンプ", "しんそく", "エアスラッシュ"]
  },
  urshifu: {
    id: 892, name: "ウーラオス", type: "fighting", hp: 170, speed: 97,
    baseHp: 170, baseAtk: 120, baseDef: 80, baseSpd: 97, growthRate: 0.8,
    color: "#1e293b", moves: ["インファイト", "あくのはどう", "しんそく", "はどうだん"]
  },
  zacian: {
    id: 888, name: "ザシアン", type: "steel", hp: 170, speed: 138,
    baseHp: 170, baseAtk: 140, baseDef: 100, baseSpd: 138, growthRate: 0.8,
    color: "#60a5fa", moves: ["はがねのつばさ", "アイアンヘッド", "しんそく", "はかいこうせん"]
  },
  calyrex: {
    id: 898, name: "バドレックス", type: "psychic", hp: 170, speed: 150,
    baseHp: 170, baseAtk: 135, baseDef: 85, baseSpd: 150, growthRate: 0.8,
    color: "#22c55e", moves: ["サイコブレイク", "サイコキネシス", "ソーラービーム", "はかいこうせん"]
  }
};

// 進化マッピング
const EVOLUTION_MAP = {
  pikachu: { evolved: 'raichu', winsNeeded: 1 },
  rayquaza: { evolved: 'mega_rayquaza', winsNeeded: 1 },
  charizard: { evolved: 'mega_charizard', winsNeeded: 1 },
  lucario: { evolved: 'mega_lucario', winsNeeded: 1 },
  scizor: { evolved: 'mega_scizor', winsNeeded: 1 },
  mewtwo: { evolved: 'mega_mewtwo_x', winsNeeded: 1 }
};

// レベル習得技マップ（ポケモンごとに、指定レベルで新しく習得する技）
// { masterId: { レベル: 技名 } }
const LEARNSET = {
  // 御三家系
  bulbasaur: { 7: 'どくどく', 13: 'ソーラービーム', 20: 'きあいだめ' },
  ivysaur: { 15: 'ソーラービーム', 22: 'どくどく', 30: 'きあいだめ' },
  venusaur: { 32: 'じしん', 40: 'はかいこうせん' },
  charmander: { 8: 'でんこうせっか', 14: 'かえんほうしゃ', 22: 'きあいだめ' },
  charmeleon: { 17: 'ほのおのうず', 25: 'かえんほうしゃ', 34: 'きあいだめ' },
  charizard: { 36: 'そらをとぶ', 44: 'はかいこうせん', 50: 'だいもんじ' },
  squirtle: { 7: 'みずてっぽう', 13: 'からにこもる', 20: 'メガトンパンチ' },
  wartortle: { 16: 'なみのり', 24: 'からにこもる', 32: 'メガトンパンチ' },
  blastoise: { 34: 'ハイドロポンプ', 42: 'なみのり', 48: 'はかいこうせん' },
  scyther: { 6: 'れんぞくぎり', 12: 'つばめがえし', 17: 'きあいだめ', 22: 'シザークロス' },
  scizor: { 24: 'バレットパンチ', 28: 'メタルクロー', 34: 'はがねのつばさ', 40: 'アイアンヘッド' },
  // 伝説・その他
  pikachu: { 8: 'でんこうせっか', 15: '10まんボルト', 24: 'アイアンテール' },
  raichu: { 27: '10まんボルト', 35: 'かみなり', 42: 'はかいこうせん' },
  rayquaza: { 50: 'りゅうせいぐん', 60: 'だいもんじ', 70: 'かみなり' },
  lucario: { 20: 'はどうだん', 30: 'シャドーボール', 40: 'きんせつパンチ' },
  // バタフリー進化系
  metapod: { 10: 'きあいだめ' },
  butterfree: { 14: 'エアスラッシュ', 20: 'サイコキネシス', 28: 'どくどく' },
  // スピアー進化系
  kakuna: { 10: 'どくどく' },
  beedrill: { 14: 'シザークロス', 20: 'つばめがえし', 28: 'どくどく' },
  // ピジョット系
  pidgeotto: { 17: 'つばめがえし', 24: 'エアスラッシュ', 32: 'でんこうせっか' },
  pidgeot: { 36: 'エアスラッシュ', 44: 'はかいこうせん', 50: 'しんそく' },
  // その他のポケモン（覚える技が揃っているものだけ）
  raticate: { 13: 'でんこうせっか', 20: 'かみくだく', 30: 'はかいこうせん' },
  graveler: { 24: 'じしん', 30: 'ストーンエッジ', 38: 'からにこもる' },
  gengar: { 25: 'シャドーボール', 32: 'サイコキネシス', 40: 'はかいこうせん' },
  // バシャーモ進化系
  blaziken: { 36: 'フレアドライブ', 42: 'インファイト', 50: 'ブラストバーン' },
  // ゴウカザル
  infernape: { 36: 'フレアドライブ', 42: 'インファイト', 50: 'オーバーヒート' },
  // ガブリアス
  garchomp: { 48: 'げきりん', 52: 'じしん', 60: 'ストーンエッジ' },
  // ボーマンダ
  salamence: { 50: 'りゅうのまい', 55: 'そらをとぶ', 65: 'はかいこうせん' },
  // メタグロス
  metagross: { 40: 'コメットパンチ', 45: 'アイアンヘッド', 55: 'じしん' },
  // ズバット系
  zubat: { 6: 'つばさでうつ', 12: 'きゅうけつ', 19: 'どくどく', 25: 'エアスラッシュ' },
  golbat: { 22: 'きゅうけつ', 28: 'エアスラッシュ', 35: 'かみくだく' },
  crobat: { 30: 'エアスラッシュ', 38: 'かみくだく', 45: 'つばめがえし' },
};

// learnset を取得（未登録なら空オブジェクト）
function getLearnset(masterId) {
  return LEARNSET[masterId] || {};
}
