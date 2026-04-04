// State Machine - 画面遷移管理
window.Game = window.Game || {};

window.Game.StateMachine = {
    // 有効な遷移マップ
    transitions: {
        title:          ['adventure', 'classic_battle'],
        world_map:      ['town', 'pokemon_party', 'bag', 'save_menu'],
        town:           ['world_map', 'route', 'gym_battle', 'shop', 'pokecenter', 'story_scene', 'pokemon_party', 'bag'],
        route:          ['town', 'wild_battle', 'trainer_battle', 'pokemon_party', 'bag'],
        wild_battle:    ['route', 'pokemon_party', 'battle_result'],
        trainer_battle: ['route', 'town', 'pokemon_party', 'battle_result'],
        gym_battle:     ['town', 'pokemon_party', 'battle_result'],
        elite_battle:   ['pokemon_party', 'battle_result', 'ending'],
        battle_result:  ['route', 'town', 'world_map', 'levelup'],
        levelup:        ['route', 'town', 'world_map', 'evolution'],
        evolution:      ['route', 'town', 'world_map'],
        shop:           ['town'],
        pokecenter:     ['town'],
        pokemon_party:  ['_back'],
        bag:            ['_back'],
        save_menu:      ['_back'],
        story_scene:    ['_back', 'town', 'route', 'wild_battle', 'trainer_battle', 'gym_battle'],
        ending:         ['title'],
        classic_battle: ['title']
    },

    // 履歴スタック
    history: [],

    // 遷移
    transition(from, to) {
        if (to === '_back') {
            return this.back();
        }
        this.history.push(from);
        // 履歴が深くなりすぎないよう制限
        if (this.history.length > 20) {
            this.history = this.history.slice(-10);
        }
        return to;
    },

    // 戻る
    back() {
        return this.history.pop() || 'title';
    },

    // 履歴リセット
    reset() {
        this.history = [];
    },

    // 現在の画面から遷移可能か
    canTransition(from, to) {
        const allowed = this.transitions[from];
        if (!allowed) return false;
        return allowed.includes(to) || allowed.includes('_back');
    }
};
