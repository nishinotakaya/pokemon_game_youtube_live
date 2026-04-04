// Repository - CRUD ヘルパー
window.Game = window.Game || {};

window.Game.Repository = {
    // === プレイヤー ===
    async createPlayer(name) {
        const id = await window.Game.DB.players.add({
            name,
            money: 3000,
            createdAt: new Date().toISOString()
        });
        // ストーリー進行データも作成
        await window.Game.DB.storyProgress.add({
            playerId: id,
            currentTown: 'masara_town',
            badges: [],
            flags: {},
            defeatedTrainers: []
        });
        // 初期アイテム
        await window.Game.DB.playerItems.add({
            playerId: id,
            itemKey: 'pokeball',
            quantity: 5
        });
        await window.Game.DB.playerItems.add({
            playerId: id,
            itemKey: 'potion',
            quantity: 3
        });
        return id;
    },

    async getPlayer(id) {
        return window.Game.DB.players.get(id);
    },

    async getAllPlayers() {
        return window.Game.DB.players.toArray();
    },

    async updatePlayerMoney(playerId, amount) {
        await window.Game.DB.players.update(playerId, {
            money: amount
        });
    },

    async deletePlayer(id) {
        await window.Game.DB.players.delete(id);
        await window.Game.DB.ownedPokemons.where('playerId').equals(id).delete();
        await window.Game.DB.storyProgress.where('playerId').equals(id).delete();
        await window.Game.DB.playerItems.where('playerId').equals(id).delete();
        await window.Game.DB.battleLogs.where('playerId').equals(id).delete();
    },

    // === 手持ち���ケモン ===
    async addOwnedPokemon(playerId, pokemonData) {
        // パーティの数を確認（最大6匹）
        const partyCount = await window.Game.DB.ownedPokemons
            .where({ playerId, isInParty: 1 })
            .count();

        const id = await window.Game.DB.ownedPokemons.add({
            playerId,
            masterId: pokemonData.masterId,
            nickname: pokemonData.nickname || null,
            name: pokemonData.name,
            type: pokemonData.type,
            level: pokemonData.level,
            exp: pokemonData.exp,
            currentHp: pokemonData.currentHp || pokemonData.maxHp,
            maxHp: pokemonData.maxHp,
            attack: pokemonData.attack,
            defense: pokemonData.defense,
            speed: pokemonData.speed,
            moves: JSON.stringify(pokemonData.moves.map(m => m.name)),
            isInParty: partyCount < 6 ? 1 : 0,
            capturedAt: new Date().toISOString()
        });
        return id;
    },

    async getOwnedPokemons(playerId) {
        const pokemons = await window.Game.DB.ownedPokemons
            .where('playerId').equals(playerId)
            .toArray();
        return pokemons.map(p => ({
            ...p,
            moves: this._parseMoves(p.moves)
        }));
    },

    async getPartyPokemons(playerId) {
        const pokemons = await window.Game.DB.ownedPokemons
            .where({ playerId, isInParty: 1 })
            .toArray();
        return pokemons.map(p => ({
            ...p,
            moves: this._parseMoves(p.moves)
        }));
    },

    async updatePokemon(pokemonId, updates) {
        if (updates.moves && Array.isArray(updates.moves)) {
            updates.moves = JSON.stringify(updates.moves.map(m => typeof m === 'string' ? m : m.name));
        }
        await window.Game.DB.ownedPokemons.update(pokemonId, updates);
    },

    async setPartyMember(pokemonId, inParty) {
        await window.Game.DB.ownedPokemons.update(pokemonId, {
            isInParty: inParty ? 1 : 0
        });
    },

    async healAllParty(playerId) {
        const party = await window.Game.DB.ownedPokemons
            .where({ playerId, isInParty: 1 })
            .toArray();
        for (const p of party) {
            await window.Game.DB.ownedPokemons.update(p.id, {
                currentHp: p.maxHp
            });
        }
    },

    // === ストーリー進行 ===
    async getProgress(playerId) {
        return window.Game.DB.storyProgress
            .where('playerId').equals(playerId)
            .first();
    },

    async updateProgress(playerId, updates) {
        const progress = await this.getProgress(playerId);
        if (progress) {
            await window.Game.DB.storyProgress.update(progress.id, updates);
        }
    },

    async addBadge(playerId, badgeId) {
        const progress = await this.getProgress(playerId);
        if (progress && !progress.badges.includes(badgeId)) {
            const badges = [...progress.badges, badgeId];
            await window.Game.DB.storyProgress.update(progress.id, { badges });
        }
    },

    async setStoryFlag(playerId, flag, value) {
        const progress = await this.getProgress(playerId);
        if (progress) {
            const flags = { ...progress.flags, [flag]: value };
            await window.Game.DB.storyProgress.update(progress.id, { flags });
        }
    },

    async addDefeatedTrainer(playerId, trainerId) {
        const progress = await this.getProgress(playerId);
        if (progress && !progress.defeatedTrainers.includes(trainerId)) {
            const defeatedTrainers = [...progress.defeatedTrainers, trainerId];
            await window.Game.DB.storyProgress.update(progress.id, { defeatedTrainers });
        }
    },

    // === アイテム ===
    async getItems(playerId) {
        return window.Game.DB.playerItems
            .where('playerId').equals(playerId)
            .toArray();
    },

    async addItem(playerId, itemKey, quantity) {
        const existing = await window.Game.DB.playerItems
            .where({ playerId, itemKey })
            .first();
        if (existing) {
            await window.Game.DB.playerItems.update(existing.id, {
                quantity: existing.quantity + quantity
            });
        } else {
            await window.Game.DB.playerItems.add({
                playerId, itemKey, quantity
            });
        }
    },

    async useItem(playerId, itemKey, quantity) {
        const existing = await window.Game.DB.playerItems
            .where({ playerId, itemKey })
            .first();
        if (!existing || existing.quantity < quantity) return false;
        const newQty = existing.quantity - quantity;
        if (newQty <= 0) {
            await window.Game.DB.playerItems.delete(existing.id);
        } else {
            await window.Game.DB.playerItems.update(existing.id, { quantity: newQty });
        }
        return true;
    },

    // === バトルログ ===
    async addBattleLog(playerId, log) {
        await window.Game.DB.battleLogs.add({
            playerId,
            opponentType: log.opponentType,
            opponentName: log.opponentName,
            result: log.result,
            timestamp: new Date().toISOString()
        });
    },

    // === ヘルパー ===
    _parseMoves(movesStr) {
        try {
            const moveNames = JSON.parse(movesStr);
            return moveNames.map(name => {
                const data = MOVES_DATA[name];
                return data ? { name, ...data } : { name, power: 0, acc: 100, type: 'normal' };
            });
        } catch {
            return [];
        }
    }
};
