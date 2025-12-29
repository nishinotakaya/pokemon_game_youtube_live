// 技データ定義
const MOVES_DATA = {
  // ピカチュウの技
  "でんきショック": { power: 40, acc: 100, type: "electric" },
  "アイアンテール": { power: 100, acc: 75, type: "steel" },
  "でんこうせっか": { power: 40, acc: 100, type: "normal" },
  "10まんボルト": { power: 90, acc: 100, type: "electric" },

  // ゼニガメの技
  "みずてっぽう": { power: 40, acc: 100, type: "water" },
  "メガトンパンチ": { power: 80, acc: 85, type: "normal" },
  "たいあたり": { power: 40, acc: 100, type: "normal" },
  "からにこもる": { power: 0, acc: 100, type: "water", status: "def_up" },

  // ストライクの技
  "れんぞくぎり": { power: 40, acc: 95, type: "bug" },
  "シザークロス": { power: 80, acc: 100, type: "bug" },
  "つばめがえし": { power: 60, acc: 100, type: "flying" },
  "きあいだめ": { power: 0, acc: 100, type: "normal", status: "atk_up" },

  // ハッサムの技
  "はがねのつばさ": { power: 70, acc: 90, type: "steel" },
  "メタルクロー": { power: 50, acc: 95, type: "steel" },
  "バレットパンチ": { power: 40, acc: 100, type: "steel" },
  "アイアンヘッド": { power: 80, acc: 100, type: "steel" },

  // バサギリの技
  "エアスラッシュ": { power: 75, acc: 95, type: "flying" },

  // レックウザの技
  "りゅうせいぐん": { power: 130, acc: 90, type: "dragon" },
  "かみなり": { power: 110, acc: 70, type: "electric" },
  "だいもんじ": { power: 110, acc: 85, type: "fire" },

  // リザードンの技
  "かえんほうしゃ": { power: 90, acc: 100, type: "fire" },
  "はかいこうせん": { power: 150, acc: 90, type: "fire", effect: "beam" },
  "ほのおのうず": { power: 100, acc: 85, type: "fire" },
  "そらをとぶ": { power: 90, acc: 95, type: "flying" },

  // ルカリオの技
  "シャドーボール": { power: 120, acc: 100, type: "ghost", effect: "shadow_ball" },
  "はどうだん": { power: 110, acc: 95, type: "fighting" },
  "きんせつパンチ": { power: 100, acc: 100, type: "fighting" },
  "ドレインパンチ": { power: 95, acc: 100, type: "fighting" },

  // ムゲンダイナの技
  "ムゲンストーム": { power: 140, acc: 95, type: "dragon", effect: "eternal_storm" },
  "どくどく": { power: 0, acc: 90, type: "poison", status: "poison", effect: "poison" },
  "りゅうせいぐん": { power: 130, acc: 90, type: "dragon", effect: "dragon_meteor" },
  "エターナルビーム": { power: 160, acc: 90, type: "dragon", effect: "eternal_beam" },

  // メガ進化ポケモンの技
  "ボルテッカー": { power: 120, acc: 100, type: "electric" },
  "でんげき": { power: 100, acc: 100, type: "electric" },
  "コアエンサー": { power: 180, acc: 100, type: "dragon", effect: "dragon_meteor" },
  "メガフレイム": { power: 180, acc: 100, type: "fire", effect: "beam" },
  "メガパンチ": { power: 150, acc: 100, type: "fighting" },

  // ゼラオラの技
  "プラズマフィスト": { power: 160, acc: 95, type: "electric", effect: "zeraora_plasma" },
  "かみなりパンチ": { power: 140, acc: 100, type: "electric", effect: "zeraora_thunder_punch" }
};

// タイプ相性チャート
const TYPE_CHART = {
  electric: { water: 2.0, bug: 1.0, electric: 0.5, steel: 0.5, dragon: 1.0, fire: 1.0, flying: 0.5, fighting: 1.0, ghost: 1.0, psychic: 1.0, poison: 1.0 },
  water: { electric: 1.0, water: 0.5, bug: 1.0, steel: 1.0, dragon: 1.0, fire: 2.0, flying: 1.0, fighting: 1.0, ghost: 1.0, psychic: 1.0, poison: 1.0 },
  bug: { water: 1.0, electric: 1.0, bug: 1.0, flying: 0.5, steel: 0.5, dragon: 1.0, fire: 0.5, fighting: 0.5, ghost: 0.5, psychic: 2.0, poison: 0.5 },
  flying: { bug: 2.0, electric: 0.5, water: 1.0, steel: 0.5, dragon: 1.0, fire: 1.0, fighting: 2.0, ghost: 1.0, psychic: 1.0, poison: 1.0 },
  steel: { electric: 0.5, water: 0.5, bug: 1.0, flying: 1.0, steel: 0.5, dragon: 1.0, fire: 0.5, fighting: 2.0, ghost: 1.0, psychic: 0.5, poison: 0 },
  dragon: { electric: 1.0, water: 1.0, bug: 1.0, flying: 1.0, steel: 0.5, dragon: 2.0, fire: 1.0, fighting: 1.0, ghost: 1.0, psychic: 1.0, poison: 1.0 },
  fire: { electric: 1.0, water: 0.5, bug: 2.0, flying: 1.0, steel: 2.0, dragon: 0.5, fire: 0.5, fighting: 1.0, ghost: 1.0, psychic: 1.0, poison: 1.0 },
  normal: { electric: 1.0, water: 1.0, bug: 1.0, flying: 1.0, steel: 0.5, dragon: 1.0, fire: 1.0, fighting: 2.0, ghost: 0, psychic: 1.0, poison: 1.0 },
  fighting: { electric: 1.0, water: 1.0, bug: 0.5, flying: 0.5, steel: 1.0, dragon: 1.0, fire: 1.0, fighting: 1.0, ghost: 0, psychic: 0.5, poison: 0.5 },
  ghost: { electric: 1.0, water: 1.0, bug: 0.5, flying: 1.0, steel: 1.0, dragon: 1.0, fire: 1.0, fighting: 0, ghost: 2.0, psychic: 2.0, poison: 0.5 },
  psychic: { electric: 1.0, water: 1.0, bug: 2.0, flying: 1.0, steel: 0.5, dragon: 1.0, fire: 1.0, fighting: 2.0, ghost: 2.0, psychic: 0.5, poison: 2.0 },
  poison: { electric: 1.0, water: 1.0, bug: 1.0, flying: 1.0, steel: 0, dragon: 1.0, fire: 1.0, fighting: 1.0, ghost: 0.5, psychic: 2.0, poison: 0.5 }
};

