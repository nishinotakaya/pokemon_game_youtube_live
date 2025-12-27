// ポケモンデータ定義
const POKEMON_DATA = {
  pikachu: {
    id: 25,
    name: "ピカチュウ",
    type: "electric",
    hp: 100,
    color: "#facc15",
    moves: ["でんきショック", "アイアンテール", "でんこうせっか", "10まんボルト"]
  },
  squirtle: {
    id: 7,
    name: "ゼニガメ",
    type: "water",
    hp: 120,
    color: "#60a5fa",
    moves: ["みずてっぽう", "メガトンパンチ", "たいあたり", "からにこもる"]
  },
  scyther: {
    id: 123,
    name: "ストライク",
    type: "bug",
    hp: 110,
    color: "#4ade80",
    moves: ["れんぞくぎり", "シザークロス", "つばめがえし", "きあいだめ"]
  },
  scizor: {
    id: 212,
    name: "ハッサム",
    type: "steel",
    hp: 130,
    color: "#ef4444",
    moves: ["はがねのつばさ", "メタルクロー", "バレットパンチ", "アイアンヘッド"]
  },
  scyther_alt: {
    id: 900,
    name: "バサギリ",
    type: "bug",
    hp: 115,
    color: "#4ade80",
    moves: ["エアスラッシュ", "シザークロス", "つばめがえし", "きあいだめ"]
  },
  rayquaza: {
    id: 384,
    name: "レックウザ",
    type: "dragon",
    hp: 150,
    color: "#10b981",
    moves: ["りゅうせいぐん", "はがねのつばさ", "かみなり", "だいもんじ"]
  },
  black_rayquaza: {
    id: 384,
    name: "ブラックレックウザ",
    type: "dragon",
    hp: 160,
    color: "#1e293b",
    moves: ["りゅうせいぐん", "はがねのつばさ", "かみなり", "だいもんじ"]
  },
  charizard: {
    id: 6,
    name: "リザードン",
    type: "fire",
    hp: 140,
    color: "#f97316",
    moves: ["かえんほうしゃ", "はかいこうせん", "ほのおのうず", "つばめがえし"]
  },
  lucario: {
    id: 448,
    name: "ルカリオ",
    type: "fighting",
    hp: 135,
    color: "#3b82f6",
    moves: ["シャドーボール", "はどうだん", "きんせつパンチ", "ドレインパンチ"]
  },
  eternatus: {
    id: 890,
    name: "ムゲンダイナ",
    type: "dragon",
    hp: 160,
    color: "#a855f7",
    moves: ["ムゲンストーム", "どくどく", "りゅうせいぐん", "エターナルビーム"]
  },
  // 進化後のポケモン
  raichu: {
    id: 26,
    name: "ライチュウ",
    type: "electric",
    hp: 120,
    color: "#facc15",
    moves: ["10まんボルト", "かみなり", "でんげき", "ボルテッカー"]
  },
  mega_rayquaza: {
    id: 384,
    name: "メガレックウザ",
    type: "dragon",
    hp: 180,
    color: "#10b981",
    moves: ["コアエンサー", "りゅうせいぐん", "かみなり", "だいもんじ"]
  },
  mega_charizard: {
    id: 6,
    name: "メガリザードン",
    type: "fire",
    hp: 170,
    color: "#f97316",
    moves: ["メガフレイム", "はかいこうせん", "ほのおのうず", "かえんほうしゃ"]
  },
  mega_lucario: {
    id: 448,
    name: "メガルカリオ",
    type: "fighting",
    hp: 160,
    color: "#3b82f6",
    moves: ["メガパンチ", "はどうだん", "きんせつパンチ", "シャドーボール"]
  }
};

// 進化マッピング
const EVOLUTION_MAP = {
  pikachu: { evolved: 'raichu', winsNeeded: 1 },
  rayquaza: { evolved: 'mega_rayquaza', winsNeeded: 1 },
  charizard: { evolved: 'mega_charizard', winsNeeded: 1 },
  lucario: { evolved: 'mega_lucario', winsNeeded: 1 }
};
