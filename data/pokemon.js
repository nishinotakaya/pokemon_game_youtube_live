// ポケモンデータ定義
const POKEMON_DATA = {
  pikachu: {
    id: 25, name: "ピカチュウ", type: "electric", hp: 100, speed: 90,
    color: "#facc15", moves: ["でんきショック", "アイアンテール", "でんこうせっか", "10まんボルト"]
  },
  squirtle: {
    id: 7, name: "ゼニガメ", type: "water", hp: 120, speed: 43,
    color: "#60a5fa", moves: ["みずてっぽう", "メガトンパンチ", "たいあたり", "からにこもる"]
  },
  scyther: {
    id: 123, name: "ストライク", type: "bug", hp: 110, speed: 105,
    color: "#4ade80", moves: ["れんぞくぎり", "シザークロス", "つばめがえし", "きあいだめ"]
  },
  scizor: {
    id: 212, name: "ハッサム", type: "steel", hp: 130, speed: 65,
    color: "#ef4444", moves: ["はがねのつばさ", "メタルクロー", "バレットパンチ", "アイアンヘッド"]
  },
  scyther_alt: {
    id: 900, name: "バサギリ", type: "bug", hp: 115, speed: 75,
    color: "#4ade80", moves: ["エアスラッシュ", "シザークロス", "つばめがえし", "きあいだめ"]
  },
  rayquaza: {
    id: 384, name: "レックウザ", type: "dragon", hp: 150, speed: 95,
    color: "#10b981", moves: ["りゅうせいぐん", "はがねのつばさ", "かみなり", "だいもんじ"]
  },
  black_rayquaza: {
    id: 384, name: "レックウザ", type: "dragon", hp: 160, speed: 95,
    color: "#1e293b", moves: ["りゅうせいぐん", "はがねのつばさ", "かみなり", "だいもんじ"]
  },
  charizard: {
    id: 6, name: "リザードン", type: "fire", hp: 140, speed: 100,
    color: "#f97316", moves: ["かえんほうしゃ", "はかいこうせん", "ほのおのうず", "だいもんじ"]
  },
  lucario: {
    id: 448, name: "ルカリオ", type: "fighting", hp: 135, speed: 90,
    color: "#3b82f6", moves: ["シャドーボール", "はどうだん", "きんせつパンチ", "ドレインパンチ"]
  },
  eternatus: {
    id: 890, name: "ムゲンダイナ", type: "dragon", hp: 160, speed: 130,
    color: "#a855f7", moves: ["ムゲンストーム", "どくどく", "りゅうせいぐん", "エターナルビーム"]
  },
  zeraora: {
    id: 807, name: "ゼラオラ", type: "electric", hp: 155, speed: 143,
    color: "#facc15", moves: ["プラズマフィスト", "10まんボルト", "かみなりパンチ", "ボルテッカー"]
  },
  zapdos: {
    id: 145, name: "サンダー", type: "electric", hp: 160, speed: 100,
    color: "#facc15", moves: ["でんじほう", "かみなり", "10まんボルト", "はねやすめ"]
  },
  mewtwo: {
    id: 150, name: "ミュウツー", type: "psychic", hp: 160, speed: 130,
    color: "#a855f7", moves: ["サイコキネシス", "サイコブレイク", "シャドーボール", "サイコショック"]
  },
  kyogre: {
    id: 382, name: "カイオーガ", type: "water", hp: 170, speed: 90,
    color: "#3b82f6", moves: ["しおみず", "なみのり", "ハイドロポンプ", "コールドフレア"]
  },
  groudon: {
    id: 383, name: "グラードン", type: "ground", hp: 170, speed: 90,
    color: "#dc2626", moves: ["じしん", "だいちのちから", "ソーラービーム", "マグマストーム"]
  },
  // 進化後のポケモン
  raichu: {
    id: 26, name: "ライチュウ", type: "electric", hp: 120, speed: 110,
    color: "#facc15", moves: ["10まんボルト", "かみなり", "でんげき", "ボルテッカー"]
  },
  mega_rayquaza: {
    id: 384, name: "メガレックウザ", type: "dragon", hp: 180, speed: 115,
    color: "#10b981", moves: ["コアエンサー", "りゅうせいぐん", "かみなり", "だいもんじ"]
  },
  mega_charizard: {
    id: 6, name: "メガリザードン", type: "fire", hp: 170, speed: 100,
    color: "#f97316", moves: ["メガフレイム", "はかいこうせん", "ほのおのうず", "だいもんじ"]
  },
  mega_lucario: {
    id: 448, name: "メガルカリオ", type: "fighting", hp: 160, speed: 112,
    color: "#3b82f6", moves: ["メガパンチ", "はどうだん", "きんせつパンチ", "シャドーボール"]
  },
  mega_scizor: {
    id: 212, name: "メガハッサム", type: "steel", hp: 150, speed: 75,
    color: "#ef4444", moves: ["はがねのつばさ", "メタルクロー", "バレットパンチ", "アイアンヘッド"]
  },
  gengar: {
    id: 94, name: "ゲンガー", type: "ghost", hp: 150, speed: 110,
    color: "#7c3aed", moves: ["ダークヴォルテックス", "ファントムバースト", "シャドウテイル", "ナイトメア"]
  },
  bagfoon: {
    id: 157, name: "バッグフーン", type: "fire", hp: 160, speed: 100,
    color: "#dc2626", moves: ["インフェルノ", "フレアブリッツ", "れっかパンチ", "ばくえん"]
  },
  latias: {
    id: 380, name: "ラティアス", type: "psychic", hp: 165, speed: 110,
    color: "#ec4899", moves: ["ミストバースト", "ドラゴンソウル", "しんぴのまい", "はどうほう"]
  },
  latios: {
    id: 381, name: "ラティオス", type: "dragon", hp: 165, speed: 110,
    color: "#3b82f6", moves: ["ラスターパージ", "ドラゴンブレス", "サイコブースト", "りゅうのいかり"]
  },
  // 追加ポケモン
  garchomp: {
    id: 445, name: "ガブリアス", type: "dragon", hp: 160, speed: 102,
    color: "#1e40af", moves: ["ドラゴンクロー", "じしん", "げきりん", "ストーンエッジ"]
  },
  dragonite: {
    id: 149, name: "カイリュー", type: "dragon", hp: 155, speed: 80,
    color: "#f59e0b", moves: ["りゅうせいぐん", "かみなり", "はかいこうせん", "しんそく"]
  },
  tyranitar: {
    id: 248, name: "バンギラス", type: "ground", hp: 170, speed: 61,
    color: "#065f46", moves: ["ストーンエッジ", "かみくだく", "じしん", "だいもんじ"]
  },
  blaziken: {
    id: 257, name: "バシャーモ", type: "fire", hp: 145, speed: 80,
    color: "#dc2626", moves: ["ブレイズキック", "スカイアッパー", "フレアドライブ", "ブラストバーン"]
  },
  greninja: {
    id: 658, name: "ゲッコウガ", type: "water", hp: 140, speed: 122,
    color: "#1e3a5f", moves: ["みずしゅりけん", "あくのはどう", "ハイドロカノン", "かげぶんしん"]
  },
  darkrai: {
    id: 491, name: "ダークライ", type: "ghost", hp: 155, speed: 125,
    color: "#1a1a2e", moves: ["ダークホール", "ダークパルス", "あくのはどう", "あくむ"]
  },
  giratina: {
    id: 487, name: "ギラティナ", type: "ghost", hp: 175, speed: 90,
    color: "#4a1a6b", moves: ["シャドーダイブ", "ドラゴンダイブ", "シャドーフォース", "げんしのちから"]
  },
  salamence: {
    id: 373, name: "ボーマンダ", type: "dragon", hp: 155, speed: 100,
    color: "#2563eb", moves: ["ドラゴンクロー", "だいもんじ", "りゅうのまい", "そらをとぶ"]
  },
  metagross: {
    id: 376, name: "メタグロス", type: "steel", hp: 160, speed: 70,
    color: "#6b7280", moves: ["コメットパンチ", "サイコキネシス", "バレットパンチ", "じしん"]
  },
  infernape: {
    id: 392, name: "ゴウカザル", type: "fire", hp: 140, speed: 108,
    color: "#b45309", moves: ["インファイト", "フレアドライブ", "マッハパンチ", "オーバーヒート"]
  }
};

// 進化マッピング
const EVOLUTION_MAP = {
  pikachu: { evolved: 'raichu', winsNeeded: 1 },
  rayquaza: { evolved: 'mega_rayquaza', winsNeeded: 1 },
  charizard: { evolved: 'mega_charizard', winsNeeded: 1 },
  lucario: { evolved: 'mega_lucario', winsNeeded: 1 },
  scizor: { evolved: 'mega_scizor', winsNeeded: 1 }
};
