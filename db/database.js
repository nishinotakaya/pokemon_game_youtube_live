// Database Layer - Dexie.js (IndexedDB)
window.Game = window.Game || {};

(function() {
    const db = new Dexie('PokemonAdventureDB');

    db.version(1).stores({
        players: '++id, name, createdAt',
        ownedPokemons: '++id, playerId, masterId, name, level, type, isInParty',
        storyProgress: '++id, playerId',
        playerItems: '++id, playerId, itemKey',
        battleLogs: '++id, playerId, timestamp'
    });

    // 初期データのシード
    async function seedIfNeeded() {
        // プレイヤーデータがなければ何もしない（ゲーム開始時に作成される）
    }

    window.Game.DB = db;
    window.Game.DB.seedIfNeeded = seedIfNeeded;
})();
