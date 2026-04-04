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
  "はがねのつばさ": { power: 70, acc: 90, type: "steel", effect: "steel_wing" },
  "メタルクロー": { power: 50, acc: 95, type: "steel", effect: "metal_claw" },
  "バレットパンチ": { power: 40, acc: 100, type: "steel", effect: "bullet_punch" },
  "アイアンヘッド": { power: 80, acc: 100, type: "steel", effect: "iron_head" },

  // バサギリの技
  "エアスラッシュ": { power: 75, acc: 95, type: "flying" },

  // レックウザの技
  "りゅうせいぐん": { power: 130, acc: 90, type: "dragon", effect: "dragon_meteor" },
  "かみなり": { power: 110, acc: 70, type: "electric" },
  "だいもんじ": { power: 110, acc: 85, type: "fire", effect: "dai_monji" },

  // リザードンの技
  "かえんほうしゃ": { power: 90, acc: 100, type: "fire" },
  "はかいこうせん": { power: 150, acc: 90, type: "fire", effect: "beam" },
  "ほのおのうず": { power: 100, acc: 85, type: "fire" },
  "そらをとぶ": { power: 90, acc: 95, type: "flying" },

  // ルカリオの技
  "シャドーボール": { power: 120, acc: 100, type: "ghost", effect: "shadow_ball" },
  "はどうだん": { power: 110, acc: 95, type: "fighting", effect: "aura_sphere" },
  "きんせつパンチ": { power: 100, acc: 100, type: "fighting", effect: "lucario_close_combat" },
  "ドレインパンチ": { power: 95, acc: 100, type: "fighting", effect: "lucario_drain_punch" },

  // ムゲンダイナの技
  "ムゲンストーム": { power: 140, acc: 95, type: "dragon", effect: "eternal_storm" },
  "どくどく": { power: 0, acc: 90, type: "poison", status: "poison", effect: "poison" },
  "エターナルビーム": { power: 160, acc: 90, type: "dragon", effect: "eternal_beam" },

  // メガ進化ポケモンの技
  "ボルテッカー": { power: 120, acc: 100, type: "electric" },
  "でんげき": { power: 100, acc: 100, type: "electric" },
  "コアエンサー": { power: 180, acc: 100, type: "dragon", effect: "dragon_meteor" },
  "メガフレイム": { power: 180, acc: 100, type: "fire", effect: "beam" },
  "メガパンチ": { power: 150, acc: 100, type: "fighting", effect: "mega_punch" },

  // ゼラオラの技
  "プラズマフィスト": { power: 160, acc: 95, type: "electric", effect: "zeraora_plasma" },
  "かみなりパンチ": { power: 140, acc: 100, type: "electric", effect: "zeraora_thunder_punch" },

  // サンダーの技
  "でんじほう": { power: 180, acc: 90, type: "electric", effect: "zapdos_thunder_bolt" },
  "はねやすめ": { power: 0, acc: 100, type: "flying", status: "def_up" },

  // ミュウツーの技
  "サイコキネシス": { power: 140, acc: 100, type: "psychic", effect: "psychokinesis" },
  "サイコブレイク": { power: 150, acc: 100, type: "psychic", effect: "psycho_break" },
  "サイコショック": { power: 130, acc: 100, type: "psychic", effect: "psycho_shock" },

  // カイオーガの技
  "しおみず": { power: 65, acc: 100, type: "water", effect: "salt_water" },
  "なみのり": { power: 90, acc: 100, type: "water", effect: "surf" },
  "ハイドロポンプ": { power: 110, acc: 80, type: "water", effect: "hydro_pump" },
  "コールドフレア": { power: 100, acc: 90, type: "water", effect: "cold_flare" },

  // グラードンの技
  "じしん": { power: 100, acc: 100, type: "ground", effect: "earthquake" },
  "だいちのちから": { power: 90, acc: 100, type: "ground", effect: "earth_power" },
  "ソーラービーム": { power: 120, acc: 100, type: "grass", effect: "solar_beam" },
  "マグマストーム": { power: 100, acc: 75, type: "fire", effect: "magma_storm" },

  // ゲンガーの技（ゴースト・専用エフェクト）
  "ダークヴォルテックス": { power: 95, acc: 100, type: "ghost", effect: "dark_vortex" },
  "ファントムバースト": { power: 100, acc: 95, type: "ghost", effect: "phantom_burst" },
  "シャドウテイル": { power: 85, acc: 100, type: "ghost", effect: "shadow_tail" },
  "ナイトメア": { power: 110, acc: 90, type: "ghost", effect: "nightmare" },

  // バッグフーンの技（炎・格闘・専用エフェクト）
  "インフェルノ": { power: 110, acc: 85, type: "fire", effect: "bagfoon_inferno" },
  "フレアブリッツ": { power: 120, acc: 100, type: "fire", effect: "bagfoon_flare_blitz" },
  "れっかパンチ": { power: 100, acc: 100, type: "fighting", effect: "bagfoon_blazing_punch" },
  "ばくえん": { power: 95, acc: 100, type: "fire", effect: "bagfoon_explosion" },

  // ラティアスの技（専用エフェクト）
  "ミストバースト": { power: 95, acc: 100, type: "psychic", effect: "latias_mist_burst" },
  "ドラゴンソウル": { power: 100, acc: 95, type: "dragon", effect: "latias_dragon_soul" },
  "しんぴのまい": { power: 90, acc: 100, type: "psychic", effect: "latias_mystic_dance" },
  "はどうほう": { power: 110, acc: 90, type: "dragon", effect: "latias_aura_cannon" },

  // ラティオスの技（専用エフェクト）
  "ラスターパージ": { power: 100, acc: 100, type: "psychic", effect: "latios_luster_purge" },
  "ドラゴンブレス": { power: 95, acc: 100, type: "dragon", effect: "latios_dragon_breath" },
  "サイコブースト": { power: 120, acc: 90, type: "psychic", effect: "latios_psycho_boost" },
  "りゅうのいかり": { power: 110, acc: 100, type: "dragon", effect: "latios_outrage" },

  // ガブリアスの技
  "ドラゴンクロー": { power: 80, acc: 100, type: "dragon", effect: "dragon_meteor" },
  "げきりん": { power: 120, acc: 100, type: "dragon", effect: "dragon_meteor" },
  "ストーンエッジ": { power: 100, acc: 80, type: "ground", effect: "earthquake" },

  // カイリューの技
  "しんそく": { power: 80, acc: 100, type: "normal" },

  // バンギラスの技
  "かみくだく": { power: 80, acc: 100, type: "ghost", effect: "shadow_ball" },

  // バシャーモの技
  "ブレイズキック": { power: 85, acc: 90, type: "fire", effect: "bagfoon_blazing_punch" },
  "スカイアッパー": { power: 85, acc: 95, type: "fighting", effect: "lucario_close_combat" },
  "フレアドライブ": { power: 120, acc: 100, type: "fire", effect: "bagfoon_flare_blitz" },
  "ブラストバーン": { power: 150, acc: 90, type: "fire", effect: "beam" },

  // ゲッコウガの技
  "みずしゅりけん": { power: 80, acc: 100, type: "water", effect: "salt_water" },
  "あくのはどう": { power: 80, acc: 100, type: "ghost", effect: "shadow_ball" },
  "ハイドロカノン": { power: 150, acc: 90, type: "water", effect: "hydro_pump" },
  "かげぶんしん": { power: 0, acc: 100, type: "normal", status: "def_up" },

  // ダークライの技
  "ダークホール": { power: 0, acc: 80, type: "ghost", status: "poison", effect: "poison" },
  "ダークパルス": { power: 80, acc: 100, type: "ghost", effect: "dark_vortex" },
  "あくむ": { power: 95, acc: 100, type: "ghost", effect: "nightmare" },

  // ギラティナの技
  "シャドーダイブ": { power: 90, acc: 100, type: "ghost", effect: "shadow_ball" },
  "ドラゴンダイブ": { power: 100, acc: 75, type: "dragon", effect: "dragon_meteor" },
  "シャドーフォース": { power: 120, acc: 100, type: "ghost", effect: "phantom_burst" },
  "げんしのちから": { power: 60, acc: 100, type: "ground", effect: "earth_power" },

  // ボーマンダの技
  "りゅうのまい": { power: 0, acc: 100, type: "dragon", status: "atk_up" },
  "そらをとぶ": { power: 90, acc: 95, type: "flying" },

  // メタグロスの技
  "コメットパンチ": { power: 100, acc: 90, type: "steel", effect: "iron_head" },

  // ゴウカザルの技
  "インファイト": { power: 120, acc: 100, type: "fighting", effect: "lucario_close_combat" },
  "マッハパンチ": { power: 40, acc: 100, type: "fighting", effect: "mega_punch" },
  "オーバーヒート": { power: 130, acc: 90, type: "fire", effect: "beam" }
};

// タイプ相性チャート（攻撃タイプ → 防御タイプ: 倍率）Gen6+原作準拠
// 1.0の場合は省略（コード側でデフォルト1.0）
const TYPE_CHART = {
  electric: { water: 2.0, flying: 2.0, electric: 0.5, grass: 0.5, ground: 0, dragon: 0.5 },
  water:    { fire: 2.0, ground: 2.0, water: 0.5, grass: 0.5, dragon: 0.5 },
  bug:      { grass: 2.0, psychic: 2.0, fire: 0.5, fighting: 0.5, poison: 0.5, flying: 0.5, ghost: 0.5, steel: 0.5 },
  flying:   { bug: 2.0, fighting: 2.0, grass: 2.0, electric: 0.5, steel: 0.5 },
  steel:    { dragon: 2.0, steel: 0.5, fire: 0.5, water: 0.5, electric: 0.5 },
  dragon:   { dragon: 2.0, steel: 0.5 },
  fire:     { bug: 2.0, grass: 2.0, steel: 2.0, fire: 0.5, water: 0.5, dragon: 0.5 },
  normal:   { ghost: 0, steel: 0.5 },
  fighting: { normal: 2.0, steel: 2.0, bug: 0.5, flying: 0.5, poison: 0.5, psychic: 0.5, ghost: 0 },
  ghost:    { ghost: 2.0, psychic: 2.0, normal: 0, steel: 0.5 },
  psychic:  { fighting: 2.0, poison: 2.0, psychic: 0.5, steel: 0.5 },
  poison:   { grass: 2.0, poison: 0.5, ground: 0.5, ghost: 0.5, steel: 0 },
  ground:   { electric: 2.0, fire: 2.0, poison: 2.0, steel: 2.0, bug: 0.5, grass: 0.5, flying: 0 },
  grass:    { water: 2.0, ground: 2.0, bug: 0.5, fire: 0.5, grass: 0.5, poison: 0.5, flying: 0.5, dragon: 0.5, steel: 0.5 }
};

