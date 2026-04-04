// Map Renderer - リアルなCanvasタイルマップ + トレーナー歩行
window.Game = window.Game || {};

window.Game.MapRenderer = {
    TILE_SIZE: 40,
    _npcImageCache: {},
    _playerImg: null,

    // NPC画像を取得（キャッシュ付き）
    getNpcImage(type, action) {
        const key = action || type;
        if (this._npcImageCache[key]) return this._npcImageCache[key];

        const Sprites = window.Game.Data.TrainerSprites || {};
        const Leaders = window.Game.Data.LeaderSprites || {};
        const NPCs = window.Game.Data.NPCs || {};
        const Trainers = window.Game.Data.Trainers || {};

        let url = null;
        if (key === 'professor_oak' && NPCs.professor_oak?.image) {
            url = NPCs.professor_oak.image;
        } else if (Trainers[key]?.type && Sprites[Trainers[key].type]) {
            url = Sprites[Trainers[key].type];
        } else if (Sprites[type]) {
            url = Sprites[type];
        }

        if (url) {
            const img = new Image();
            img.src = url;
            this._npcImageCache[key] = img;
            return img;
        }
        return null;
    },

    drawTile(ctx, tileType, sx, sy, ts, t) {
        // === 道 ===
        if (tileType === 0) {
            ctx.fillStyle = '#c9a96e';
            ctx.fillRect(sx, sy, ts, ts);
            // 砂利テクスチャ
            ctx.fillStyle = '#b8965a';
            for (let i = 0; i < 5; i++) {
                const px = sx + ((i*7+3) % ts);
                const py = sy + ((i*11+5) % ts);
                ctx.fillRect(px, py, 2, 2);
            }
        }
        // === 草むら ===
        else if (tileType === 1) {
            ctx.fillStyle = '#3da34d';
            ctx.fillRect(sx, sy, ts, ts);
            const phase = t / 800;
            ctx.fillStyle = '#2d8a3e';
            for (let i = 0; i < 6; i++) {
                const gx = sx + 2 + (i % 3) * 10;
                const gy = sy + 2 + Math.floor(i / 3) * 14;
                const sway = Math.sin(phase + gx * 0.1 + i) * 1.5;
                ctx.save();
                ctx.translate(gx + 2, gy + 12);
                ctx.rotate(sway * 0.08);
                ctx.fillRect(-1, -12, 3, 12);
                ctx.restore();
            }
            // 明るい草
            ctx.fillStyle = '#4ade80';
            for (let i = 0; i < 3; i++) {
                const gx = sx + 5 + i * 9;
                const gy = sy + 6 + (i * 7) % 12;
                const sway = Math.sin(phase + i * 2) * 1;
                ctx.fillRect(gx + sway, gy, 2, 8);
            }
        }
        // === 壁 ===
        else if (tileType === 2) {
            ctx.fillStyle = '#374151';
            ctx.fillRect(sx, sy, ts, ts);
            ctx.fillStyle = '#2d3748';
            ctx.fillRect(sx, sy, ts, 2);
            ctx.fillRect(sx, sy + ts/2, ts, 1);
        }
        // === 家 ===
        else if (tileType === 3) {
            ctx.fillStyle = '#c9a96e';
            ctx.fillRect(sx, sy, ts, ts);
            // 壁
            ctx.fillStyle = '#d4a06a';
            ctx.fillRect(sx + 1, sy + 10, ts - 2, ts - 11);
            // 壁のハイライト
            ctx.fillStyle = '#e0b87a';
            ctx.fillRect(sx + 2, sy + 11, ts - 4, 2);
            // 屋根
            ctx.fillStyle = '#b91c1c';
            ctx.beginPath();
            ctx.moveTo(sx - 2, sy + 12);
            ctx.lineTo(sx + ts / 2, sy + 1);
            ctx.lineTo(sx + ts + 2, sy + 12);
            ctx.fill();
            // 屋根のハイライト
            ctx.fillStyle = '#dc2626';
            ctx.beginPath();
            ctx.moveTo(sx + 2, sy + 11);
            ctx.lineTo(sx + ts / 2, sy + 3);
            ctx.lineTo(sx + ts / 2 + 4, sy + 5);
            ctx.lineTo(sx + 6, sy + 11);
            ctx.fill();
            // 窓
            ctx.fillStyle = '#7dd3fc';
            ctx.fillRect(sx + 5, sy + 16, 8, 7);
            ctx.fillRect(sx + ts - 13, sy + 16, 8, 7);
            // 窓枠
            ctx.strokeStyle = '#78350f';
            ctx.lineWidth = 1;
            ctx.strokeRect(sx + 5, sy + 16, 8, 7);
            ctx.strokeRect(sx + ts - 13, sy + 16, 8, 7);
            // 窓の十字
            ctx.beginPath();
            ctx.moveTo(sx + 9, sy + 16); ctx.lineTo(sx + 9, sy + 23);
            ctx.moveTo(sx + 5, sy + 19.5); ctx.lineTo(sx + 13, sy + 19.5);
            ctx.stroke();
        }
        // === 水 ===
        else if (tileType === 4) {
            const wPhase = t / 600;
            ctx.fillStyle = '#2563eb';
            ctx.fillRect(sx, sy, ts, ts);
            ctx.fillStyle = '#3b82f6';
            for (let i = 0; i < 3; i++) {
                const wy = sy + 6 + i * 10 + Math.sin(wPhase + sx * 0.05 + i) * 3;
                ctx.beginPath();
                ctx.moveTo(sx, wy);
                ctx.quadraticCurveTo(sx + ts * 0.3, wy - 3, sx + ts * 0.5, wy);
                ctx.quadraticCurveTo(sx + ts * 0.7, wy + 3, sx + ts, wy);
                ctx.lineTo(sx + ts, wy + 4);
                ctx.lineTo(sx, wy + 4);
                ctx.fill();
            }
            // 光の反射
            ctx.fillStyle = 'rgba(255,255,255,0.15)';
            const rx = sx + 8 + Math.sin(wPhase * 1.3) * 6;
            ctx.fillRect(rx, sy + 4, 4, 2);
            ctx.fillRect(rx + 10, sy + 14, 3, 2);
        }
        // === 木 ===
        else if (tileType === 5) {
            // 地面
            ctx.fillStyle = '#3da34d';
            ctx.fillRect(sx, sy, ts, ts);
            // 幹
            ctx.fillStyle = '#6b3a1f';
            ctx.fillRect(sx + 12, sy + 18, 8, 14);
            ctx.fillStyle = '#7c4a28';
            ctx.fillRect(sx + 13, sy + 19, 3, 12);
            // 葉（複数レイヤー）
            ctx.fillStyle = '#166534';
            ctx.beginPath(); ctx.arc(sx + ts / 2, sy + 14, 13, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#15803d';
            ctx.beginPath(); ctx.arc(sx + ts / 2 - 5, sy + 11, 9, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#22c55e';
            ctx.beginPath(); ctx.arc(sx + ts / 2 + 3, sy + 10, 7, 0, Math.PI * 2); ctx.fill();
            // 木漏れ日
            ctx.fillStyle = 'rgba(255,255,200,0.15)';
            ctx.beginPath(); ctx.arc(sx + ts / 2 + 2, sy + 9, 4, 0, Math.PI * 2); ctx.fill();
        }
        // === ドア ===
        else if (tileType === 6) {
            ctx.fillStyle = '#c9a96e';
            ctx.fillRect(sx, sy, ts, ts);
            // マット
            ctx.fillStyle = '#8b4513';
            ctx.fillRect(sx + 4, sy + ts - 6, ts - 8, 5);
            // ドア枠
            ctx.fillStyle = '#5c3a1e';
            ctx.fillRect(sx + ts*0.2, sy + 2, ts*0.6, ts - 4);
            // ドア本体
            const doorGrad = ctx.createLinearGradient(sx + ts*0.25, 0, sx + ts*0.75, 0);
            doorGrad.addColorStop(0, '#8b5e3c'); doorGrad.addColorStop(0.5, '#a0724f'); doorGrad.addColorStop(1, '#8b5e3c');
            ctx.fillStyle = doorGrad;
            ctx.fillRect(sx + ts*0.25, sy + 4, ts*0.5, ts - 8);
            // ドアパネル
            ctx.strokeStyle = '#6b3a1f';
            ctx.lineWidth = 1;
            ctx.strokeRect(sx + ts*0.28, sy + 6, ts*0.44, ts*0.35);
            ctx.strokeRect(sx + ts*0.28, sy + ts*0.5, ts*0.44, ts*0.3);
            // ノブ
            ctx.fillStyle = '#fbbf24';
            ctx.beginPath(); ctx.arc(sx + ts*0.62, sy + ts*0.5, 2.5, 0, Math.PI*2); ctx.fill();
            ctx.fillStyle = '#f59e0b';
            ctx.beginPath(); ctx.arc(sx + ts*0.62, sy + ts*0.5, 1.5, 0, Math.PI*2); ctx.fill();
            // 入口の光（点滅アニメーション）
            const doorGlow = 0.15 + Math.sin(t / 300) * 0.1;
            ctx.fillStyle = `rgba(251,191,36,${doorGlow})`;
            ctx.fillRect(sx + ts*0.2, sy + ts - 8, ts*0.6, 6);
            // 上向き矢印（入れますよマーク）
            ctx.fillStyle = `rgba(251,191,36,${0.5 + Math.sin(t / 400) * 0.3})`;
            ctx.font = 'bold 12px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('▲', sx + ts/2, sy - 2);
            ctx.textAlign = 'left';
        }
        // === ポケモンセンター ===
        else if (tileType === 7) {
            ctx.fillStyle = '#c9a96e';
            ctx.fillRect(sx, sy, ts, ts);
            // 建物本体
            ctx.fillStyle = '#fff1f2';
            ctx.fillRect(sx + 1, sy + ts*0.22, ts - 2, ts*0.78);
            // 壁のライン
            ctx.fillStyle = '#fce7f3';
            ctx.fillRect(sx + 2, sy + ts*0.3, ts - 4, 2);
            // 屋根
            ctx.fillStyle = '#ec4899';
            ctx.fillRect(sx - 1, sy + ts*0.12, ts + 2, ts*0.12);
            ctx.fillStyle = '#db2777';
            ctx.fillRect(sx, sy + ts*0.12, ts, 2);
            // 赤い十字マーク（大きく）
            const crossSize = ts * 0.3;
            const ccx = sx + ts/2, ccy = sy + ts*0.55;
            ctx.fillStyle = '#ef4444';
            ctx.fillRect(ccx - crossSize/2, ccy - crossSize/6, crossSize, crossSize/3);
            ctx.fillRect(ccx - crossSize/6, ccy - crossSize/2, crossSize/3, crossSize);
            // 十字の白い内側
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(ccx - crossSize/3, ccy - 1, crossSize*0.66, 2);
            ctx.fillRect(ccx - 1, ccy - crossSize/3, 2, crossSize*0.66);
            // ピンクの光
            const pcGlow = 0.08 + Math.sin(t / 500) * 0.06;
            ctx.fillStyle = `rgba(236,72,153,${pcGlow})`;
            ctx.fillRect(sx, sy + ts*0.12, ts, ts*0.88);
        }
        // === ショップ ===
        else if (tileType === 8) {
            ctx.fillStyle = '#c9a96e';
            ctx.fillRect(sx, sy, ts, ts);
            // 建物
            ctx.fillStyle = '#eff6ff';
            ctx.fillRect(sx + 1, sy + ts*0.22, ts - 2, ts*0.78);
            // 屋根
            ctx.fillStyle = '#2563eb';
            ctx.fillRect(sx - 1, sy + ts*0.12, ts + 2, ts*0.12);
            ctx.fillStyle = '#1d4ed8';
            ctx.fillRect(sx, sy + ts*0.12, ts, 2);
            // ショーウィンドウ
            ctx.fillStyle = '#bfdbfe';
            ctx.fillRect(sx + 4, sy + ts*0.4, ts - 8, ts*0.25);
            ctx.strokeStyle = '#3b82f6';
            ctx.lineWidth = 1;
            ctx.strokeRect(sx + 4, sy + ts*0.4, ts - 8, ts*0.25);
            // MART文字
            ctx.fillStyle = '#1e40af';
            ctx.font = 'bold 9px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('MART', sx + ts/2, sy + ts*0.83);
            ctx.textAlign = 'left';
        }
        // === ジム ===
        else if (tileType === 9) {
            ctx.fillStyle = '#c9a96e';
            ctx.fillRect(sx, sy, ts, ts);
            // 建物（重厚）
            ctx.fillStyle = '#fee2e2';
            ctx.fillRect(sx + 1, sy + ts*0.18, ts - 2, ts*0.82);
            // 壁の装飾
            ctx.fillStyle = '#fecaca';
            ctx.fillRect(sx + 2, sy + ts*0.5, ts - 4, 2);
            // 屋根（赤い三角）
            ctx.fillStyle = '#dc2626';
            ctx.beginPath();
            ctx.moveTo(sx - 2, sy + ts*0.2);
            ctx.lineTo(sx + ts/2, sy + 1);
            ctx.lineTo(sx + ts + 2, sy + ts*0.2);
            ctx.fill();
            ctx.fillStyle = '#b91c1c';
            ctx.beginPath();
            ctx.moveTo(sx, sy + ts*0.18);
            ctx.lineTo(sx + ts/2, sy + 3);
            ctx.lineTo(sx + ts/2 + 3, sy + 6);
            ctx.lineTo(sx + 4, sy + ts*0.18);
            ctx.fill();
            // 大きな星マーク
            ctx.fillStyle = '#fbbf24';
            ctx.font = 'bold 16px serif';
            ctx.textAlign = 'center';
            ctx.shadowBlur = 6;
            ctx.shadowColor = '#fbbf24';
            ctx.fillText('★', sx + ts/2, sy + ts*0.65);
            ctx.shadowBlur = 0;
            // GYM文字
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 8px monospace';
            ctx.fillText('GYM', sx + ts/2, sy + ts*0.85);
            ctx.textAlign = 'left';
            // 赤い光の脈動
            const gymGlow = 0.06 + Math.sin(t / 600) * 0.05;
            ctx.fillStyle = `rgba(220,38,38,${gymGlow})`;
            ctx.fillRect(sx, sy, ts, ts);
        }
        // === NPC位置（道として描画） ===
        else if (tileType === 10) {
            ctx.fillStyle = '#c9a96e';
            ctx.fillRect(sx, sy, ts, ts);
            ctx.fillStyle = '#b8965a';
            for (let i = 0; i < 3; i++) {
                ctx.fillRect(sx + i * 11 + 3, sy + i * 8 + 2, 2, 2);
            }
        }
        // === 看板 ===
        else if (tileType === 11) {
            ctx.fillStyle = '#c9a96e';
            ctx.fillRect(sx, sy, ts, ts);
            // 支柱
            ctx.fillStyle = '#6b3a1f';
            ctx.fillRect(sx + 11, sy + 20, 3, 10);
            ctx.fillRect(sx + 18, sy + 20, 3, 10);
            // 板
            ctx.fillStyle = '#fef3c7';
            ctx.fillRect(sx + 5, sy + 8, 22, 14);
            ctx.strokeStyle = '#78350f';
            ctx.lineWidth = 1.5;
            ctx.strokeRect(sx + 5, sy + 8, 22, 14);
            // 文字っぽい線
            ctx.fillStyle = '#92400e';
            ctx.fillRect(sx + 8, sy + 12, 16, 2);
            ctx.fillRect(sx + 8, sy + 16, 12, 2);
        }
        // === 花 ===
        else if (tileType === 12) {
            ctx.fillStyle = '#c9a96e';
            ctx.fillRect(sx, sy, ts, ts);
            const colors = ['#ef4444', '#fbbf24', '#ec4899', '#a855f7', '#f97316'];
            for (let i = 0; i < 5; i++) {
                ctx.fillStyle = colors[i];
                const fx = sx + 3 + (i % 3) * 10;
                const fy = sy + 5 + Math.floor(i / 3) * 14;
                const fsize = 3 + Math.sin(t / 1000 + i * 1.5) * 0.8;
                ctx.beginPath(); ctx.arc(fx, fy, fsize, 0, Math.PI * 2); ctx.fill();
                // 茎
                ctx.fillStyle = '#16a34a';
                ctx.fillRect(fx - 0.5, fy + fsize, 1, 5);
            }
        }
    },

    // トレーナーを描画（リアル版）
    drawPlayer(ctx, sx, sy, ts, dir, frame, t) {
        const cx = sx + ts / 2;
        const bob = Math.sin(frame * 0.4) * 1.2;

        // 影
        ctx.fillStyle = 'rgba(0,0,0,0.25)';
        ctx.beginPath(); ctx.ellipse(cx, sy + ts - 1, 9, 3.5, 0, 0, Math.PI * 2); ctx.fill();

        // スプライト画像が使えればそちらを描画
        if (!this._playerImg) {
            const Leaders = window.Game.Data.LeaderSprites || {};
            if (Leaders.red) {
                this._playerImg = new Image();
                this._playerImg.src = Leaders.red;
            }
        }
        if (this._playerImg && this._playerImg.complete && this._playerImg.naturalWidth > 0) {
            const imgSize = ts * 1.5;
            ctx.save();
            // 向きに応じて左右反転
            if (dir === 1) { // 左向き
                ctx.scale(-1, 1);
                ctx.drawImage(this._playerImg, -(cx + imgSize / 2), sy + ts - imgSize + bob, imgSize, imgSize);
            } else {
                ctx.drawImage(this._playerImg, cx - imgSize / 2, sy + ts - imgSize + bob, imgSize, imgSize);
            }
            ctx.restore();
            return;
        }

        // 足
        ctx.fillStyle = '#1e293b';
        const legOff = Math.sin(frame * 0.8) * 2.5;
        ctx.fillRect(cx - 5, sy + 25 + bob, 4, 6 + legOff);
        ctx.fillRect(cx + 1, sy + 25 + bob, 4, 6 - legOff);
        // 靴
        ctx.fillStyle = '#dc2626';
        ctx.fillRect(cx - 6, sy + 30 + bob + legOff, 6, 2);
        ctx.fillRect(cx, sy + 30 + bob - legOff, 6, 2);

        // 体
        ctx.fillStyle = '#2563eb';
        ctx.fillRect(cx - 7, sy + 17 + bob, 14, 9);
        // ジャケットのライン
        ctx.fillStyle = '#1d4ed8';
        ctx.fillRect(cx - 1, sy + 17 + bob, 2, 9);

        // 腕
        const armSwing = Math.sin(frame * 0.8) * 4;
        ctx.fillStyle = '#2563eb';
        ctx.fillRect(cx - 9, sy + 18 + bob + armSwing, 3, 7);
        ctx.fillRect(cx + 6, sy + 18 + bob - armSwing, 3, 7);
        // 手
        ctx.fillStyle = '#fcd34d';
        ctx.fillRect(cx - 9, sy + 24 + bob + armSwing, 3, 3);
        ctx.fillRect(cx + 6, sy + 24 + bob - armSwing, 3, 3);

        // 頭
        ctx.fillStyle = '#fcd34d';
        ctx.fillRect(cx - 6, sy + 7 + bob, 12, 11);

        // 髪
        ctx.fillStyle = '#1e293b';
        if (dir === 3) { // 上
            ctx.fillRect(cx - 6, sy + 5 + bob, 12, 6);
        } else {
            ctx.fillRect(cx - 6, sy + 5 + bob, 12, 4);
        }

        // 帽子
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(cx - 7, sy + 3 + bob, 14, 5);
        ctx.fillStyle = '#fbbf24';
        ctx.fillRect(cx - 8, sy + 7 + bob, 16, 2);
        // つば
        if (dir === 0 || dir === 2) {
            ctx.fillStyle = '#ef4444';
            ctx.fillRect(cx + 3, sy + 5 + bob, 6, 3);
        } else if (dir === 1) {
            ctx.fillRect(cx - 9, sy + 5 + bob, 6, 3);
        }

        // 目
        if (dir !== 3) { // 上向き以外
            ctx.fillStyle = '#1e293b';
            if (dir === 0) { // 下
                ctx.fillRect(cx - 4, sy + 11 + bob, 2.5, 3);
                ctx.fillRect(cx + 1.5, sy + 11 + bob, 2.5, 3);
                // ハイライト
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(cx - 3.5, sy + 11.5 + bob, 1, 1);
                ctx.fillRect(cx + 2, sy + 11.5 + bob, 1, 1);
            } else if (dir === 1) { // 左
                ctx.fillRect(cx - 5, sy + 11 + bob, 2.5, 3);
            } else { // 右
                ctx.fillRect(cx + 2.5, sy + 11 + bob, 2.5, 3);
            }
        }

        // 口（下向きのみ）
        if (dir === 0) {
            ctx.fillStyle = '#f87171';
            ctx.fillRect(cx - 1, sy + 15 + bob, 2, 1);
        }
    },

    // NPC描画（リアル版）
    drawNPC(ctx, sx, sy, ts, type, t, action) {
        const cx = sx + ts / 2;
        // 影
        ctx.fillStyle = 'rgba(0,0,0,0.25)';
        ctx.beginPath(); ctx.ellipse(cx, sy + ts - 1, 8, 3, 0, 0, Math.PI * 2); ctx.fill();

        // 画像があれば画像を使う
        const npcImg = this.getNpcImage(type, action);
        if (npcImg && npcImg.complete && npcImg.naturalWidth > 0) {
            const imgSize = ts * 1.5;
            ctx.drawImage(npcImg, cx - imgSize / 2, sy + ts - imgSize, imgSize, imgSize);
            // ！マーク
            const bounce = Math.sin(t / 400) * 3;
            ctx.fillStyle = '#fbbf24';
            ctx.font = 'bold 11px sans-serif';
            ctx.textAlign = 'center';
            ctx.shadowBlur = 4; ctx.shadowColor = '#fbbf24';
            ctx.fillText('!', cx, sy - 2 + bounce);
            ctx.shadowBlur = 0; ctx.textAlign = 'left';
            return;
        }

        if (type === 'professor_oak') {
            // 足
            ctx.fillStyle = '#6b7280';
            ctx.fillRect(cx - 4, sy + 26, 3, 5);
            ctx.fillRect(cx + 1, sy + 26, 3, 5);
            // 白衣
            ctx.fillStyle = '#f1f5f9';
            ctx.fillRect(cx - 7, sy + 14, 14, 13);
            ctx.fillStyle = '#e2e8f0';
            ctx.fillRect(cx - 1, sy + 14, 2, 13);
            // 顔
            ctx.fillStyle = '#fcd34d';
            ctx.fillRect(cx - 5, sy + 6, 10, 9);
            // 髪（白髪）
            ctx.fillStyle = '#d1d5db';
            ctx.fillRect(cx - 5, sy + 4, 10, 4);
            ctx.fillRect(cx - 6, sy + 6, 2, 5);
            ctx.fillRect(cx + 4, sy + 6, 2, 5);
            // 目
            ctx.fillStyle = '#1e293b';
            ctx.fillRect(cx - 3, sy + 9, 2, 2);
            ctx.fillRect(cx + 1, sy + 9, 2, 2);
            // 笑顔
            ctx.fillStyle = '#f87171';
            ctx.fillRect(cx - 1, sy + 12, 2, 1);
        } else {
            // トレーナーNPC
            ctx.fillStyle = '#1e293b';
            ctx.fillRect(cx - 4, sy + 26, 3, 5);
            ctx.fillRect(cx + 1, sy + 26, 3, 5);
            ctx.fillStyle = '#16a34a';
            ctx.fillRect(cx - 6, sy + 16, 12, 11);
            ctx.fillStyle = '#fcd34d';
            ctx.fillRect(cx - 5, sy + 7, 10, 10);
            ctx.fillStyle = '#dc2626';
            ctx.fillRect(cx - 6, sy + 4, 12, 5);
            ctx.fillStyle = '#1e293b';
            ctx.fillRect(cx - 3, sy + 11, 2, 2);
            ctx.fillRect(cx + 1, sy + 11, 2, 2);
        }

        // ！マーク
        const bounce = Math.sin(t / 400) * 3;
        ctx.fillStyle = '#fbbf24';
        ctx.font = 'bold 11px sans-serif';
        ctx.textAlign = 'center';
        ctx.shadowBlur = 4;
        ctx.shadowColor = '#fbbf24';
        ctx.fillText('!', cx, sy - 2 + bounce);
        ctx.shadowBlur = 0;
        ctx.textAlign = 'left';
    },

    // マップ全体描画
    render(ctx, canvas, mapData, px, py, pDir, aFrame, interactions, defeatedTrainers) {
        const ts = this.TILE_SIZE;
        const w = canvas.width, h = canvas.height;
        const t = Date.now();
        const camX = px * ts - w / 2 + ts / 2;
        const camY = py * ts - h / 2 + ts / 2;

        // 背景
        ctx.fillStyle = mapData.bgColor || '#1a332a';
        ctx.fillRect(0, 0, w, h);

        // タイル描画範囲
        const sx = Math.max(0, Math.floor(camX / ts));
        const sy = Math.max(0, Math.floor(camY / ts));
        const ex = Math.min(mapData.width, Math.ceil((camX + w) / ts) + 1);
        const ey = Math.min(mapData.height, Math.ceil((camY + h) / ts) + 1);

        for (let ty = sy; ty < ey; ty++) {
            for (let tx = sx; tx < ex; tx++) {
                const tile = mapData.tiles[ty * mapData.width + tx];
                const screenX = tx * ts - camX;
                const screenY = ty * ts - camY;
                // NPC位置は道として描画
                this.drawTile(ctx, tile === 10 ? 0 : tile, screenX, screenY, ts, t);
            }
        }

        // NPC描画
        if (interactions) {
            for (const inter of interactions) {
                if (inter.type === 'npc' || inter.type === 'trainer') {
                    if (inter.type === 'trainer' && defeatedTrainers?.includes(inter.action)) continue;
                    const scrX = inter.x * ts - camX;
                    const scrY = inter.y * ts - camY;
                    if (scrX > -ts && scrX < w + ts && scrY > -ts && scrY < h + ts) {
                        this.drawNPC(ctx, scrX, scrY, ts, inter.type === 'npc' ? inter.action : 'trainer', t, inter.action);
                    }
                }
            }
        }

        // プレイヤー描画
        this.drawPlayer(ctx, px * ts - camX, py * ts - camY, ts, pDir, aFrame, t);

        // === 建物ラベル描画（ポケセン、ジム、ショップ等） ===
        if (interactions) {
            ctx.textAlign = 'center';
            for (const inter of interactions) {
                const lx = inter.x * ts - camX + ts / 2;
                const ly = inter.y * ts - camY;
                if (lx < -60 || lx > w + 60 || ly < -40 || ly > h + 40) continue;

                let label = null;
                let bgColor = null;
                let icon = '';

                if (inter.type === 'pokecenter') {
                    label = 'ポケモンセンター';
                    bgColor = '#ec4899';
                    icon = '🏥';
                } else if (inter.type === 'shop') {
                    label = 'フレンドリィショップ';
                    bgColor = '#3b82f6';
                    icon = '🛒';
                } else if (inter.type === 'gym') {
                    label = inter.label || 'ポケモンジム';
                    bgColor = '#ef4444';
                    icon = '⭐';
                } else if (inter.type === 'sign') {
                    // 看板は近づいた時だけ表示
                    const dist = Math.abs(px - inter.x) + Math.abs(py - inter.y);
                    if (dist <= 2) {
                        label = '📋';
                        bgColor = null;
                    }
                } else if (inter.type === 'door') {
                    label = inter.label;
                    bgColor = '#78350f';
                    icon = '🚪';
                }

                if (label && bgColor) {
                    ctx.font = 'bold 10px DotGothic16, sans-serif';
                    const textW = ctx.measureText(icon + ' ' + label).width + 12;
                    const labelY = ly - 12;
                    // 背景
                    ctx.fillStyle = bgColor + 'dd';
                    ctx.beginPath();
                    ctx.roundRect(lx - textW / 2, labelY - 10, textW, 16, 4);
                    ctx.fill();
                    // 枠線
                    ctx.strokeStyle = '#ffffff44';
                    ctx.lineWidth = 1;
                    ctx.stroke();
                    // テキスト
                    ctx.fillStyle = '#ffffff';
                    ctx.fillText(icon + ' ' + label, lx, labelY + 2);
                } else if (label) {
                    ctx.font = '12px sans-serif';
                    ctx.fillStyle = '#ffffff';
                    ctx.fillText(label, lx, ly - 4);
                }
            }
            ctx.textAlign = 'left';
        }

        // === ミニマップ（右下） ===
        const mmSize = 80;
        const mmX = w - mmSize - 8;
        const mmY = h - mmSize - 8;
        const mmScale = mmSize / Math.max(mapData.width, mapData.height);
        ctx.fillStyle = 'rgba(0,0,0,0.6)';
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.roundRect(mmX - 2, mmY - 2, mmSize + 4, mmSize + 4, 4); ctx.fill(); ctx.stroke();
        // タイル描画（簡略版）
        for (let my = 0; my < mapData.height; my++) {
            for (let mx = 0; mx < mapData.width; mx++) {
                const tile = mapData.tiles[my * mapData.width + mx];
                let col = '#1e293b';
                if (tile === 0 || tile === 6 || tile === 10 || tile === 11 || tile === 12) col = '#c9a96e';
                else if (tile === 1) col = '#22c55e';
                else if (tile === 5) col = '#166534';
                else if (tile === 3) col = '#92400e';
                else if (tile === 4) col = '#3b82f6';
                else if (tile === 7) col = '#ec4899';
                else if (tile === 8) col = '#60a5fa';
                else if (tile === 9) col = '#ef4444';
                ctx.fillStyle = col;
                ctx.fillRect(mmX + mx * mmScale, mmY + my * mmScale, Math.max(1, mmScale), Math.max(1, mmScale));
            }
        }
        // プレイヤー位置（点滅）
        if (Math.sin(t / 200) > 0) {
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(mmX + px * mmScale, mmY + py * mmScale, 2.5, 0, Math.PI * 2);
            ctx.fill();
        }

        // マップ名表示（上部バー）
        ctx.fillStyle = 'rgba(0,0,0,0.75)';
        ctx.beginPath(); ctx.roundRect(4, 4, 200, 22, 6); ctx.fill();
        ctx.fillStyle = '#fbbf24';
        ctx.font = 'bold 13px DotGothic16, monospace';
        ctx.textAlign = 'left';
        ctx.fillText(mapData.name, 12, 20);
    }
};
