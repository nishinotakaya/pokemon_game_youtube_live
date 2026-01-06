// エフェクト描画処理（グローバルスコープで定義）
window.drawEffect = function (ctx, effect, targetX, targetY, width, height) {
  const time = Date.now();

  switch (effect.type) {
    case 'electric':
      // 電気エフェクト
      ctx.strokeStyle = '#ff0';
      ctx.lineWidth = 3;
      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.moveTo(targetX + (Math.random() - 0.5) * 100, targetY - 200);
        for (let j = 0; j < 8; j++) {
          ctx.lineTo(targetX + (Math.random() - 0.5) * 80, targetY - 200 + j * 30);
        }
        ctx.stroke();
      }
      break;

    case 'water':
      // 水のエフェクト - 水しぶきと波
      ctx.save();
      // 水しぶき
      for (let i = 0; i < 15; i++) {
        const angle = (i / 15) * Math.PI * 2;
        const radius = 40 + Math.sin(time / 100 + i) * 10;
        const x = targetX + Math.cos(angle) * radius;
        const y = targetY + Math.sin(angle) * radius;

        ctx.fillStyle = `rgba(96, 165, 250, ${0.6 + Math.sin(time / 50 + i) * 0.3})`;
        ctx.beginPath();
        ctx.arc(x, y, 8 + Math.sin(time / 80 + i) * 3, 0, Math.PI * 2);
        ctx.fill();
      }
      // 波のエフェクト
      ctx.strokeStyle = '#60a5fa';
      ctx.lineWidth = 3;
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        const waveY = targetY + i * 20;
        for (let x = targetX - 60; x <= targetX + 60; x += 5) {
          const y = waveY + Math.sin((x + time / 10) / 10) * 8;
          if (x === targetX - 60) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      ctx.restore();
      break;

    case 'fire':
      // 炎のエフェクト
      ctx.save();
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 30 + Math.sin(time / 80 + i) * 15;
        const x = targetX + Math.cos(angle) * radius;
        const y = targetY + Math.sin(angle) * radius;

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 20);
        gradient.addColorStop(0, `rgba(255, 100, 0, ${0.8 + Math.sin(time / 60 + i) * 0.2})`);
        gradient.addColorStop(1, 'rgba(255, 200, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, 15 + Math.sin(time / 70 + i) * 5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
      break;

    case 'beam':
      // はかいこうせんのビームエフェクト
      ctx.save();
      const beamProgress = effect.progress || 0;
      const startX = effect.startX || targetX - 200;
      const startY = effect.startY || targetY;
      const endX = targetX;
      const endY = targetY;

      // ビームの本体
      const gradient = ctx.createLinearGradient(startX, startY, endX, endY);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
      gradient.addColorStop(0.3, 'rgba(255, 200, 0, 0.8)');
      gradient.addColorStop(0.6, 'rgba(255, 100, 0, 0.7)');
      gradient.addColorStop(1, 'rgba(255, 50, 0, 0.6)');

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 20 + Math.sin(time / 30) * 5;
      ctx.lineCap = 'round';

      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(startX + (endX - startX) * beamProgress, startY + (endY - startY) * beamProgress);
      ctx.stroke();

      // ビームの光る効果
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(startX + (endX - startX) * beamProgress, startY + (endY - startY) * beamProgress);
      ctx.stroke();

      // ビームの先端の爆発エフェクト
      if (beamProgress > 0.9) {
        const explosionX = startX + (endX - startX) * beamProgress;
        const explosionY = startY + (endY - startY) * beamProgress;
        const explosionSize = (beamProgress - 0.9) * 10 * 50;

        const explosionGradient = ctx.createRadialGradient(explosionX, explosionY, 0, explosionX, explosionY, explosionSize);
        explosionGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        explosionGradient.addColorStop(0.3, 'rgba(255, 200, 0, 0.8)');
        explosionGradient.addColorStop(0.6, 'rgba(255, 100, 0, 0.6)');
        explosionGradient.addColorStop(1, 'rgba(255, 50, 0, 0)');

        ctx.fillStyle = explosionGradient;
        ctx.beginPath();
        ctx.arc(explosionX, explosionY, explosionSize, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
      break;

    case 'bug':
    case 'flying':
      // 切り裂きエフェクト
      ctx.save();
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(targetX - 50, targetY - 50);
      ctx.lineTo(targetX + 50, targetY + 50);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(targetX + 50, targetY - 50);
      ctx.lineTo(targetX - 50, targetY + 50);
      ctx.stroke();
      ctx.restore();
      break;

    case 'shield':
      // シールドエフェクト
      ctx.strokeStyle = '#60a5fa';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(targetX, targetY, 60 + Math.sin(time / 100) * 5, 0, Math.PI * 2);
      ctx.stroke();
      break;

    case 'sparkle':
      // キラキラエフェクト
      ctx.save();
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2 + time / 200;
        const radius = 40 + Math.sin(time / 100 + i) * 10;
        const x = targetX + Math.cos(angle) * radius;
        const y = targetY + Math.sin(angle) * radius;

        ctx.fillStyle = `rgba(255, 255, 0, ${0.8 + Math.sin(time / 50 + i) * 0.2})`;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
      break;

    case 'dragon':
      // ドラゴンタイプのエフェクト
      ctx.save();
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 5;
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#10b981';
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(targetX - 60 + i * 30, targetY - 100);
        ctx.lineTo(targetX - 40 + i * 30, targetY - 50);
        ctx.lineTo(targetX - 20 + i * 30, targetY);
        ctx.stroke();
      }
      ctx.restore();
      break;

    case 'steel':
      // はがねタイプのエフェクト
      ctx.save();
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 4;
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#cbd5e1';
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        const x = targetX + Math.cos(angle) * 50;
        const y = targetY + Math.sin(angle) * 50;
        ctx.beginPath();
        ctx.moveTo(targetX, targetY);
        ctx.lineTo(x, y);
        ctx.stroke();
      }
      ctx.restore();
      break;

    case 'shadow_ball':
      // シャドーボールのエフェクト - ダークなボールが出て当たる
      ctx.save();
      const ballProgress = effect.progress !== undefined ? effect.progress : 0;
      const shadowStartX = effect.startX !== undefined ? effect.startX : targetX - 200;
      const shadowStartY = effect.startY !== undefined ? effect.startY : targetY;
      const shadowEndX = effect.targetX !== undefined ? effect.targetX : targetX;
      const shadowEndY = effect.targetY !== undefined ? effect.targetY : targetY;

      // ボールの軌道
      const currentX = shadowStartX + (shadowEndX - shadowStartX) * ballProgress;
      const currentY = shadowStartY + (shadowEndY - shadowStartY) * ballProgress;

      // ダークなボールの描画
      const ballSize = 35 + Math.sin(time / 100) * 5;
      const darkGradient = ctx.createRadialGradient(currentX, currentY, 0, currentX, currentY, ballSize);
      darkGradient.addColorStop(0, 'rgba(150, 50, 200, 1)');
      darkGradient.addColorStop(0.3, 'rgba(100, 0, 150, 0.9)');
      darkGradient.addColorStop(0.6, 'rgba(50, 0, 100, 0.7)');
      darkGradient.addColorStop(1, 'rgba(0, 0, 0, 0.5)');

      ctx.fillStyle = darkGradient;
      ctx.beginPath();
      ctx.arc(currentX, currentY, ballSize, 0, Math.PI * 2);
      ctx.fill();

      // ボールの周りの闇のオーラ
      ctx.strokeStyle = 'rgba(150, 50, 200, 0.8)';
      ctx.lineWidth = 4;
      ctx.shadowBlur = 25;
      ctx.shadowColor = 'rgba(150, 50, 200, 1)';
      ctx.beginPath();
      ctx.arc(currentX, currentY, ballSize + 8, 0, Math.PI * 2);
      ctx.stroke();
      ctx.shadowBlur = 0; // シャドウをリセット

      // ボールの軌跡（闇の残像）
      for (let i = 1; i <= 4; i++) {
        const trailProgress = ballProgress - (i * 0.08);
        if (trailProgress > 0) {
          const trailX = shadowStartX + (shadowEndX - shadowStartX) * trailProgress;
          const trailY = shadowStartY + (shadowEndY - shadowStartY) * trailProgress;
          const trailAlpha = Math.max(0, 0.4 - (i * 0.1));
          ctx.fillStyle = `rgba(50, 0, 100, ${trailAlpha})`;
          ctx.beginPath();
          ctx.arc(trailX, trailY, ballSize * 0.6, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 当たった時の爆発エフェクト
      if (ballProgress >= 0.9) {
        const explosionProgress = (ballProgress - 0.9) / 0.1; // 0.9から1.0の間で0から1に正規化
        const explosionSize = explosionProgress * 100;
        const explosionGradient = ctx.createRadialGradient(shadowEndX, shadowEndY, 0, shadowEndX, shadowEndY, explosionSize);
        explosionGradient.addColorStop(0, 'rgba(200, 100, 255, 1)');
        explosionGradient.addColorStop(0.3, 'rgba(150, 50, 200, 0.9)');
        explosionGradient.addColorStop(0.6, 'rgba(100, 0, 150, 0.7)');
        explosionGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = explosionGradient;
        ctx.beginPath();
        ctx.arc(shadowEndX, shadowEndY, explosionSize, 0, Math.PI * 2);
        ctx.fill();

        // 爆発の闇のパーティクル
        for (let i = 0; i < 15; i++) {
          const angle = (i / 15) * Math.PI * 2 + time / 100;
          const radius = explosionSize * 0.6 + Math.sin(time / 50 + i) * 25;
          const px = shadowEndX + Math.cos(angle) * radius;
          const py = shadowEndY + Math.sin(angle) * radius;

          const particleAlpha = Math.max(0, 0.9 - explosionProgress);
          ctx.fillStyle = `rgba(100, 0, 150, ${particleAlpha})`;
          ctx.beginPath();
          ctx.arc(px, py, 10 + Math.sin(time / 60 + i) * 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.restore();
      break;

    case 'fighting':
      // 格闘タイプのエフェクト
      ctx.save();
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 5;
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#ef4444';
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2 + time / 200;
        const radius = 50 + Math.sin(time / 100 + i) * 10;
        const x = targetX + Math.cos(angle) * radius;
        const y = targetY + Math.sin(angle) * radius;
        ctx.beginPath();
        ctx.moveTo(targetX, targetY);
        ctx.lineTo(x, y);
        ctx.stroke();
      }
      ctx.restore();
      break;

    case 'ghost':
      // ゴーストタイプのエフェクト（シャドーボールと同じ）
      ctx.save();
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 40 + Math.sin(time / 100 + i) * 15;
        const x = targetX + Math.cos(angle) * radius;
        const y = targetY + Math.sin(angle) * radius;

        ctx.fillStyle = `rgba(100, 50, 150, ${0.7 + Math.sin(time / 80 + i) * 0.3})`;
        ctx.beginPath();
        ctx.arc(x, y, 10 + Math.sin(time / 90 + i) * 4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
      break;

    case 'eternal_storm':
      // ムゲンストームのエフェクト - 強力なドラゴンの嵐
      ctx.save();
      // 嵐の渦巻き
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2 + time / 150;
        const radius = 60 + Math.sin(time / 80 + i) * 20;
        const x = targetX + Math.cos(angle) * radius;
        const y = targetY + Math.sin(angle) * radius;

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 30);
        gradient.addColorStop(0, `rgba(168, 85, 247, ${0.9 + Math.sin(time / 60 + i) * 0.1})`);
        gradient.addColorStop(1, 'rgba(139, 92, 246, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, 25 + Math.sin(time / 70 + i) * 8, 0, Math.PI * 2);
        ctx.fill();
      }

      // 中央の強力なエネルギー
      const centerGradient = ctx.createRadialGradient(targetX, targetY, 0, targetX, targetY, 80);
      centerGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      centerGradient.addColorStop(0.2, 'rgba(168, 85, 247, 0.9)');
      centerGradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.7)');
      centerGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = centerGradient;
      ctx.beginPath();
      ctx.arc(targetX, targetY, 70 + Math.sin(time / 50) * 15, 0, Math.PI * 2);
      ctx.fill();

      // 稲妻のようなエネルギー
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.lineWidth = 4;
      ctx.shadowBlur = 20;
      ctx.shadowColor = '#a855f7';
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(targetX, targetY);
        ctx.lineTo(targetX + Math.cos(angle) * 100, targetY + Math.sin(angle) * 100);
        ctx.stroke();
      }
      ctx.shadowBlur = 0;
      ctx.restore();
      break;

    case 'poison':
      // どくどくのエフェクト - 毒の泡と煙
      ctx.save();
      // 毒の泡
      for (let i = 0; i < 20; i++) {
        const angle = (i / 20) * Math.PI * 2;
        const radius = 50 + Math.sin(time / 100 + i) * 20;
        const x = targetX + Math.cos(angle) * radius;
        const y = targetY + Math.sin(angle) * radius;

        ctx.fillStyle = `rgba(139, 92, 246, ${0.7 + Math.sin(time / 80 + i) * 0.3})`;
        ctx.beginPath();
        ctx.arc(x, y, 12 + Math.sin(time / 90 + i) * 5, 0, Math.PI * 2);
        ctx.fill();

        // 泡のハイライト
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.beginPath();
        ctx.arc(x - 3, y - 3, 4, 0, Math.PI * 2);
        ctx.fill();
      }

      // 毒の煙
      for (let i = 0; i < 5; i++) {
        const smokeX = targetX + (Math.random() - 0.5) * 60;
        const smokeY = targetY - 30 - i * 15;
        const smokeSize = 20 + Math.sin(time / 100 + i) * 10;

        const smokeGradient = ctx.createRadialGradient(smokeX, smokeY, 0, smokeX, smokeY, smokeSize);
        smokeGradient.addColorStop(0, `rgba(139, 92, 246, ${0.6 + Math.sin(time / 80 + i) * 0.2})`);
        smokeGradient.addColorStop(1, 'rgba(139, 92, 246, 0)');

        ctx.fillStyle = smokeGradient;
        ctx.beginPath();
        ctx.arc(smokeX, smokeY, smokeSize, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
      break;

    case 'dragon_meteor':
      // りゅうせいぐんのエフェクト - 流星が降り注ぐ
      ctx.save();
      const meteorProgress = effect.progress !== undefined ? effect.progress : 0;

      // 複数の流星
      for (let i = 0; i < 5; i++) {
        const meteorAngle = (i / 5) * Math.PI * 2 + time / 200;
        const meteorRadius = 150 + Math.sin(time / 100 + i) * 50;
        const meteorX = targetX + Math.cos(meteorAngle) * meteorRadius;
        const meteorY = targetY - 200 + Math.sin(meteorAngle) * meteorRadius * 0.5;

        // 流星の軌跡
        ctx.strokeStyle = `rgba(139, 92, 246, ${0.8 - i * 0.15})`;
        ctx.lineWidth = 3 + i;
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#8b5cf6';
        ctx.beginPath();
        ctx.moveTo(meteorX, meteorY);
        ctx.lineTo(meteorX - 30, meteorY + 40);
        ctx.stroke();

        // 流星の本体
        const meteorGradient = ctx.createRadialGradient(meteorX, meteorY, 0, meteorX, meteorY, 15);
        meteorGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        meteorGradient.addColorStop(0.5, 'rgba(168, 85, 247, 0.9)');
        meteorGradient.addColorStop(1, 'rgba(139, 92, 246, 0)');

        ctx.fillStyle = meteorGradient;
        ctx.beginPath();
        ctx.arc(meteorX, meteorY, 12 + Math.sin(time / 50 + i) * 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // 着地時の爆発
      if (meteorProgress > 0.8) {
        const explosionSize = (meteorProgress - 0.8) / 0.2 * 120;
        const explosionGradient = ctx.createRadialGradient(targetX, targetY, 0, targetX, targetY, explosionSize);
        explosionGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        explosionGradient.addColorStop(0.3, 'rgba(168, 85, 247, 0.9)');
        explosionGradient.addColorStop(0.6, 'rgba(139, 92, 246, 0.7)');
        explosionGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = explosionGradient;
        ctx.beginPath();
        ctx.arc(targetX, targetY, explosionSize, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      ctx.restore();
      break;

    case 'eternal_beam':
      // エターナルビームのエフェクト - より強力なビーム
      ctx.save();
      const eternalProgress = effect.progress !== undefined ? effect.progress : 0;
      const eternalStartX = effect.startX !== undefined ? effect.startX : targetX - 200;
      const eternalStartY = effect.startY !== undefined ? effect.startY : targetY;
      const eternalEndX = effect.targetX !== undefined ? effect.targetX : targetX;
      const eternalEndY = effect.targetY !== undefined ? effect.targetY : targetY;

      // ビームの本体（より太く、より強力に、長さを短く）
      const totalDistance = Math.sqrt(Math.pow(eternalEndX - eternalStartX, 2) + Math.pow(eternalEndY - eternalStartY, 2));
      const beamLength = Math.min(totalDistance * 0.7, totalDistance * eternalProgress); // 最大70%の長さ
      const beamEndProgress = beamLength / totalDistance;
      const eternalCurrentX = eternalStartX + (eternalEndX - eternalStartX) * beamEndProgress;
      const eternalCurrentY = eternalStartY + (eternalEndY - eternalStartY) * beamEndProgress;

      const beamGradient = ctx.createLinearGradient(eternalStartX, eternalStartY, eternalCurrentX, eternalCurrentY);
      beamGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      beamGradient.addColorStop(0.2, 'rgba(255, 200, 255, 0.95)');
      beamGradient.addColorStop(0.4, 'rgba(168, 85, 247, 0.9)');
      beamGradient.addColorStop(0.6, 'rgba(139, 92, 246, 0.8)');
      beamGradient.addColorStop(1, 'rgba(100, 50, 200, 0.7)');

      ctx.strokeStyle = beamGradient;
      ctx.lineWidth = 35 + Math.sin(time / 30) * 8;
      ctx.lineCap = 'round';
      ctx.shadowBlur = 30;
      ctx.shadowColor = '#a855f7';

      ctx.beginPath();
      ctx.moveTo(eternalStartX, eternalStartY);
      ctx.lineTo(eternalCurrentX, eternalCurrentY);
      ctx.stroke();

      // 内側のコア
      ctx.strokeStyle = 'rgba(255, 255, 255, 1)';
      ctx.lineWidth = 15;
      ctx.shadowBlur = 20;
      ctx.shadowColor = '#ffffff';
      ctx.beginPath();
      ctx.moveTo(eternalStartX, eternalStartY);
      ctx.lineTo(eternalCurrentX, eternalCurrentY);
      ctx.stroke();

      // ビームの周りのエネルギーリング
      for (let i = 0; i < 3; i++) {
        const ringX = eternalStartX + (eternalEndX - eternalStartX) * (eternalProgress - i * 0.1);
        const ringY = eternalStartY + (eternalEndY - eternalStartY) * (eternalProgress - i * 0.1);
        if (ringX >= eternalStartX && ringX <= eternalEndX) {
          ctx.strokeStyle = `rgba(168, 85, 247, ${0.6 - i * 0.2})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(ringX, ringY, 20 + i * 5, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // 当たった時の爆発（より強力に）
      if (eternalProgress > 0.9) {
        const explosionProgress = (eternalProgress - 0.9) / 0.1;
        const explosionSize = explosionProgress * 150;
        const explosionGradient = ctx.createRadialGradient(eternalEndX, eternalEndY, 0, eternalEndX, eternalEndY, explosionSize);
        explosionGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        explosionGradient.addColorStop(0.2, 'rgba(255, 200, 255, 0.95)');
        explosionGradient.addColorStop(0.4, 'rgba(168, 85, 247, 0.9)');
        explosionGradient.addColorStop(0.6, 'rgba(139, 92, 246, 0.7)');
        explosionGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = explosionGradient;
        ctx.beginPath();
        ctx.arc(eternalEndX, eternalEndY, explosionSize, 0, Math.PI * 2);
        ctx.fill();

        // 爆発のパーティクル
        for (let i = 0; i < 20; i++) {
          const angle = (i / 20) * Math.PI * 2 + time / 100;
          const radius = explosionSize * 0.7 + Math.sin(time / 50 + i) * 30;
          const px = eternalEndX + Math.cos(angle) * radius;
          const py = eternalEndY + Math.sin(angle) * radius;

          const particleAlpha = Math.max(0, 0.9 - explosionProgress);
          ctx.fillStyle = `rgba(168, 85, 247, ${particleAlpha})`;
          ctx.beginPath();
          ctx.arc(px, py, 12 + Math.sin(time / 60 + i) * 5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.shadowBlur = 0;
      ctx.restore();
      break;

    case 'zeraora_plasma':
      // ゼラオラのプラズマフィストエフェクト - 強力なプラズマボール
      ctx.save();
      const plasmaProgress = effect.progress !== undefined ? effect.progress : 0;
      const plasmaStartX = effect.startX !== undefined ? effect.startX : targetX - 200;
      const plasmaStartY = effect.startY !== undefined ? effect.startY : targetY;
      const plasmaEndX = effect.targetX !== undefined ? effect.targetX : targetX;
      const plasmaEndY = effect.targetY !== undefined ? effect.targetY : targetY;

      // プラズマの軌道
      const plasmaCurrentX = plasmaStartX + (plasmaEndX - plasmaStartX) * plasmaProgress;
      const plasmaCurrentY = plasmaStartY + (plasmaEndY - plasmaStartY) * plasmaProgress;

      // プラズマボールの描画（大きな光るボール）
      const plasmaSize = 50 + Math.sin(time / 60) * 10;
      const plasmaGradient = ctx.createRadialGradient(plasmaCurrentX, plasmaCurrentY, 0, plasmaCurrentX, plasmaCurrentY, plasmaSize);
      plasmaGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      plasmaGradient.addColorStop(0.15, 'rgba(255, 255, 150, 1)');
      plasmaGradient.addColorStop(0.3, 'rgba(255, 255, 0, 1)');
      plasmaGradient.addColorStop(0.5, 'rgba(255, 200, 0, 0.95)');
      plasmaGradient.addColorStop(0.7, 'rgba(255, 150, 0, 0.8)');
      plasmaGradient.addColorStop(1, 'rgba(255, 100, 0, 0)');

      ctx.fillStyle = plasmaGradient;
      ctx.shadowBlur = 50;
      ctx.shadowColor = '#ffff00';
      ctx.beginPath();
      ctx.arc(plasmaCurrentX, plasmaCurrentY, plasmaSize, 0, Math.PI * 2);
      ctx.fill();

      // プラズマの周りの強力な稲妻エフェクト
      ctx.strokeStyle = '#ffff00';
      ctx.lineWidth = 5;
      ctx.shadowBlur = 30;
      ctx.shadowColor = '#ffff00';
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2 + time / 80;
        const radius = plasmaSize + 20 + Math.sin(time / 50 + i) * 15;
        const boltX = plasmaCurrentX + Math.cos(angle) * radius;
        const boltY = plasmaCurrentY + Math.sin(angle) * radius;

        ctx.beginPath();
        ctx.moveTo(plasmaCurrentX, plasmaCurrentY);
        // 稲妻のジグザグパス（より複雑に）
        let prevX = plasmaCurrentX;
        let prevY = plasmaCurrentY;
        for (let j = 1; j <= 5; j++) {
          const progress = j / 5;
          const baseX = plasmaCurrentX + (boltX - plasmaCurrentX) * progress;
          const baseY = plasmaCurrentY + (boltY - plasmaCurrentY) * progress;
          const offsetX = (Math.sin(time / 50 + i + j) * 25) * (1 - progress * 0.5);
          const offsetY = (Math.cos(time / 60 + i + j) * 25) * (1 - progress * 0.5);
          ctx.lineTo(baseX + offsetX, baseY + offsetY);
          prevX = baseX + offsetX;
          prevY = baseY + offsetY;
        }
        ctx.lineTo(boltX, boltY);
        ctx.stroke();
      }

      // プラズマの軌跡（残像）
      for (let i = 1; i <= 6; i++) {
        const trailProgress = plasmaProgress - (i * 0.05);
        if (trailProgress > 0) {
          const trailX = plasmaStartX + (plasmaEndX - plasmaStartX) * trailProgress;
          const trailY = plasmaStartY + (plasmaEndY - plasmaStartY) * trailProgress;
          const trailAlpha = Math.max(0, 0.6 - (i * 0.1));
          ctx.fillStyle = `rgba(255, 255, 150, ${trailAlpha})`;
          ctx.shadowBlur = 25 * trailAlpha;
          ctx.beginPath();
          ctx.arc(trailX, trailY, plasmaSize * 0.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 当たった時の爆発エフェクト（より強力に）
      if (plasmaProgress >= 0.9) {
        const explosionProgress = (plasmaProgress - 0.9) / 0.1;
        const explosionSize = explosionProgress * 140;
        const explosionGradient = ctx.createRadialGradient(plasmaEndX, plasmaEndY, 0, plasmaEndX, plasmaEndY, explosionSize);
        explosionGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        explosionGradient.addColorStop(0.15, 'rgba(255, 255, 150, 1)');
        explosionGradient.addColorStop(0.3, 'rgba(255, 255, 0, 1)');
        explosionGradient.addColorStop(0.5, 'rgba(255, 200, 0, 0.9)');
        explosionGradient.addColorStop(0.7, 'rgba(255, 150, 0, 0.7)');
        explosionGradient.addColorStop(1, 'rgba(255, 100, 0, 0)');

        ctx.fillStyle = explosionGradient;
        ctx.shadowBlur = 60;
        ctx.shadowColor = '#ffff00';
        ctx.beginPath();
        ctx.arc(plasmaEndX, plasmaEndY, explosionSize, 0, Math.PI * 2);
        ctx.fill();

        // 爆発の強力な稲妻パーティクル
        for (let i = 0; i < 25; i++) {
          const angle = (i / 25) * Math.PI * 2 + time / 70;
          const radius = explosionSize * 0.8 + Math.sin(time / 40 + i) * 40;
          const px = plasmaEndX + Math.cos(angle) * radius;
          const py = plasmaEndY + Math.sin(angle) * radius;

          const particleAlpha = Math.max(0, 0.95 - explosionProgress);
          ctx.strokeStyle = `rgba(255, 255, 150, ${particleAlpha})`;
          ctx.lineWidth = 4;
          ctx.shadowBlur = 20;
          ctx.beginPath();
          ctx.moveTo(plasmaEndX, plasmaEndY);
          ctx.lineTo(px, py);
          ctx.stroke();
        }
      }

      ctx.shadowBlur = 0;
      ctx.restore();
      break;

    case 'zeraora_thunder_punch':
      // ゼラオラのかみなりパンチエフェクト - 雷のパンチが直接当たる
      ctx.save();
      const punchProgress = effect.progress !== undefined ? effect.progress : 0;
      const punchStartX = effect.startX !== undefined ? effect.startX : targetX - 200;
      const punchStartY = effect.startY !== undefined ? effect.startY : targetY;
      const punchEndX = effect.targetX !== undefined ? effect.targetX : targetX;
      const punchEndY = effect.targetY !== undefined ? effect.targetY : targetY;

      // パンチの位置
      const punchCurrentX = punchStartX + (punchEndX - punchStartX) * punchProgress;
      const punchCurrentY = punchStartY + (punchEndY - punchStartY) * punchProgress;

      // パンチの手の部分（雷で包まれた拳）
      if (punchProgress < 0.9) {
        const fistSize = 35;
        const fistGradient = ctx.createRadialGradient(punchCurrentX, punchCurrentY, 0, punchCurrentX, punchCurrentY, fistSize);
        fistGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        fistGradient.addColorStop(0.3, 'rgba(255, 255, 0, 1)');
        fistGradient.addColorStop(0.6, 'rgba(255, 200, 0, 0.9)');
        fistGradient.addColorStop(1, 'rgba(255, 150, 0, 0)');

        ctx.fillStyle = fistGradient;
        ctx.shadowBlur = 40;
        ctx.shadowColor = '#ffff00';
        ctx.beginPath();
        ctx.arc(punchCurrentX, punchCurrentY, fistSize, 0, Math.PI * 2);
        ctx.fill();

        // 拳の周りの激しい稲妻
        ctx.strokeStyle = '#ffff00';
        ctx.lineWidth = 4;
        ctx.shadowBlur = 25;
        ctx.shadowColor = '#ffff00';
        for (let i = 0; i < 10; i++) {
          const angle = (i / 10) * Math.PI * 2 + time / 60;
          const radius = fistSize + 10 + Math.sin(time / 40 + i) * 8;
          const boltX = punchCurrentX + Math.cos(angle) * radius;
          const boltY = punchCurrentY + Math.sin(angle) * radius;

          ctx.beginPath();
          ctx.moveTo(punchCurrentX, punchCurrentY);
          // 短い稲妻
          for (let j = 1; j <= 3; j++) {
            const progress = j / 3;
            const baseX = punchCurrentX + (boltX - punchCurrentX) * progress;
            const baseY = punchCurrentY + (boltY - punchCurrentY) * progress;
            const offsetX = Math.sin(time / 30 + i + j) * 15;
            const offsetY = Math.cos(time / 35 + i + j) * 15;
            ctx.lineTo(baseX + offsetX, baseY + offsetY);
          }
          ctx.lineTo(boltX, boltY);
          ctx.stroke();
        }
      }

      // 当たった時の爆発エフェクト（雷のパンチが炸裂）
      if (punchProgress >= 0.9) {
        const explosionProgress = (punchProgress - 0.9) / 0.1;
        const explosionSize = explosionProgress * 100;

        // 中央の爆発
        const explosionGradient = ctx.createRadialGradient(punchEndX, punchEndY, 0, punchEndX, punchEndY, explosionSize);
        explosionGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        explosionGradient.addColorStop(0.2, 'rgba(255, 255, 0, 1)');
        explosionGradient.addColorStop(0.4, 'rgba(255, 200, 0, 0.9)');
        explosionGradient.addColorStop(0.6, 'rgba(255, 150, 0, 0.7)');
        explosionGradient.addColorStop(1, 'rgba(255, 100, 0, 0)');

        ctx.fillStyle = explosionGradient;
        ctx.shadowBlur = 50;
        ctx.shadowColor = '#ffff00';
        ctx.beginPath();
        ctx.arc(punchEndX, punchEndY, explosionSize, 0, Math.PI * 2);
        ctx.fill();

        // 激しい稲妻が四方八方に広がる
        for (let i = 0; i < 16; i++) {
          const angle = (i / 16) * Math.PI * 2 + time / 60;
          const radius = explosionSize * 0.6 + Math.sin(time / 30 + i) * 30;
          const boltEndX = punchEndX + Math.cos(angle) * radius;
          const boltEndY = punchEndY + Math.sin(angle) * radius;

          ctx.strokeStyle = `rgba(255, 255, 150, ${Math.max(0, 0.9 - explosionProgress)})`;
          ctx.lineWidth = 5;
          ctx.shadowBlur = 20;
          ctx.shadowColor = '#ffff00';
          ctx.beginPath();
          ctx.moveTo(punchEndX, punchEndY);
          // 稲妻のパス
          let prevX = punchEndX;
          let prevY = punchEndY;
          for (let j = 1; j <= 4; j++) {
            const progress = j / 4;
            const baseX = punchEndX + (boltEndX - punchEndX) * progress;
            const baseY = punchEndY + (boltEndY - punchEndY) * progress;
            const offsetX = Math.sin(time / 25 + i + j) * 20 * (1 - progress * 0.7);
            const offsetY = Math.cos(time / 30 + i + j) * 20 * (1 - progress * 0.7);
            ctx.lineTo(baseX + offsetX, baseY + offsetY);
            prevX = baseX + offsetX;
            prevY = baseY + offsetY;
          }
          ctx.stroke();
        }

        // パーティクルエフェクト
        for (let i = 0; i < 15; i++) {
          const angle = (i / 15) * Math.PI * 2 + time / 50;
          const radius = explosionSize * 0.5 + Math.sin(time / 40 + i) * 25;
          const px = punchEndX + Math.cos(angle) * radius;
          const py = punchEndY + Math.sin(angle) * radius;

          const particleAlpha = Math.max(0, 0.8 - explosionProgress);
          ctx.fillStyle = `rgba(255, 255, 150, ${particleAlpha})`;
          ctx.shadowBlur = 15;
          ctx.beginPath();
          ctx.arc(px, py, 8 + Math.sin(time / 50 + i) * 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.shadowBlur = 0;
      ctx.restore();
      break;

    case 'zapdos_thunder_bolt':
      // サンダーのでんじほうエフェクト - 強力な雷のビーム
      ctx.save();
      const thunderBoltProgress = effect.progress !== undefined ? effect.progress : 0;
      const thunderBoltStartX = effect.startX !== undefined ? effect.startX : targetX - 200;
      const thunderBoltStartY = effect.startY !== undefined ? effect.startY : targetY - 100;
      const thunderBoltEndX = effect.targetX !== undefined ? effect.targetX : targetX;
      const thunderBoltEndY = effect.targetY !== undefined ? effect.targetY : targetY;

      // 雷のビームの軌道
      const thunderBoltCurrentX = thunderBoltStartX + (thunderBoltEndX - thunderBoltStartX) * thunderBoltProgress;
      const thunderBoltCurrentY = thunderBoltStartY + (thunderBoltEndY - thunderBoltStartY) * thunderBoltProgress;

      // メインの雷ビーム（太くて強力）
      const beamWidth = 30 + Math.sin(time / 50) * 5;
      const thunderBoltGradient = ctx.createLinearGradient(
        thunderBoltStartX, thunderBoltStartY,
        thunderBoltCurrentX, thunderBoltCurrentY
      );
      thunderBoltGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      thunderBoltGradient.addColorStop(0.2, 'rgba(255, 255, 150, 1)');
      thunderBoltGradient.addColorStop(0.4, 'rgba(255, 255, 0, 1)');
      thunderBoltGradient.addColorStop(0.6, 'rgba(255, 200, 0, 0.9)');
      thunderBoltGradient.addColorStop(0.8, 'rgba(255, 150, 0, 0.8)');
      thunderBoltGradient.addColorStop(1, 'rgba(255, 100, 0, 0.6)');

      ctx.strokeStyle = thunderBoltGradient;
      ctx.lineWidth = beamWidth;
      ctx.shadowBlur = 40;
      ctx.shadowColor = '#ffff00';
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // ジグザグの雷のパス
      ctx.beginPath();
      ctx.moveTo(thunderBoltStartX, thunderBoltStartY);
      const segments = 15;
      for (let i = 1; i <= segments; i++) {
        const segmentProgress = i / segments;
        const baseX = thunderBoltStartX + (thunderBoltCurrentX - thunderBoltStartX) * segmentProgress;
        const baseY = thunderBoltStartY + (thunderBoltCurrentY - thunderBoltStartY) * segmentProgress;
        // ジグザグのオフセット
        const zigzagX = baseX + (Math.random() - 0.5) * 30 * (1 - segmentProgress * 0.5);
        const zigzagY = baseY + (Math.random() - 0.5) * 30 * (1 - segmentProgress * 0.5);
        ctx.lineTo(zigzagX, zigzagY);
      }
      ctx.stroke();

      // 周囲の小さな稲妻（複数本）
      for (let i = 0; i < 8; i++) {
        const branchProgress = thunderBoltProgress;
        const branchAngle = (i / 8) * Math.PI * 2 + time / 100;
        const branchLength = 40 + Math.sin(time / 60 + i) * 20;
        const branchX = thunderBoltCurrentX + Math.cos(branchAngle) * branchLength;
        const branchY = thunderBoltCurrentY + Math.sin(branchAngle) * branchLength;

        ctx.strokeStyle = 'rgba(255, 255, 0, 0.7)';
        ctx.lineWidth = 3;
        ctx.shadowBlur = 20;
        ctx.beginPath();
        ctx.moveTo(thunderBoltCurrentX, thunderBoltCurrentY);
        // 小さなジグザグ
        for (let j = 1; j <= 3; j++) {
          const branchSegX = thunderBoltCurrentX + (branchX - thunderBoltCurrentX) * (j / 3) + (Math.random() - 0.5) * 10;
          const branchSegY = thunderBoltCurrentY + (branchY - thunderBoltCurrentY) * (j / 3) + (Math.random() - 0.5) * 10;
          ctx.lineTo(branchSegX, branchSegY);
        }
        ctx.stroke();
      }

      // 雷の軌跡（残像）
      for (let i = 1; i <= 5; i++) {
        const trailProgress = thunderBoltProgress - (i * 0.08);
        if (trailProgress > 0) {
          const trailX = thunderBoltStartX + (thunderBoltEndX - thunderBoltStartX) * trailProgress;
          const trailY = thunderBoltStartY + (thunderBoltEndY - thunderBoltStartY) * trailProgress;
          const trailAlpha = Math.max(0, 0.5 - (i * 0.1));
          ctx.strokeStyle = `rgba(255, 255, 0, ${trailAlpha})`;
          ctx.lineWidth = beamWidth * 0.6;
          ctx.shadowBlur = 20 * trailAlpha;
          ctx.beginPath();
          ctx.moveTo(thunderBoltStartX, thunderBoltStartY);
          const trailSegments = 10;
          for (let j = 1; j <= trailSegments; j++) {
            const segProg = j / trailSegments;
            const segX = thunderBoltStartX + (trailX - thunderBoltStartX) * segProg + (Math.random() - 0.5) * 20;
            const segY = thunderBoltStartY + (trailY - thunderBoltStartY) * segProg + (Math.random() - 0.5) * 20;
            ctx.lineTo(segX, segY);
          }
          ctx.stroke();
        }
      }

      // 当たった時の爆発エフェクト
      if (thunderBoltProgress >= 0.9) {
        const explosionProgress = (thunderBoltProgress - 0.9) / 0.1;
        const explosionSize = explosionProgress * 200;
        const explosionGradient = ctx.createRadialGradient(thunderBoltEndX, thunderBoltEndY, 0, thunderBoltEndX, thunderBoltEndY, explosionSize);
        explosionGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        explosionGradient.addColorStop(0.15, 'rgba(255, 255, 150, 1)');
        explosionGradient.addColorStop(0.3, 'rgba(255, 255, 0, 1)');
        explosionGradient.addColorStop(0.5, 'rgba(255, 200, 0, 0.9)');
        explosionGradient.addColorStop(0.7, 'rgba(255, 150, 0, 0.7)');
        explosionGradient.addColorStop(1, 'rgba(255, 100, 0, 0)');

        ctx.fillStyle = explosionGradient;
        ctx.shadowBlur = 80;
        ctx.shadowColor = '#ffff00';
        ctx.beginPath();
        ctx.arc(thunderBoltEndX, thunderBoltEndY, explosionSize, 0, Math.PI * 2);
        ctx.fill();

        // 爆発の稲妻パーティクル（多数）
        for (let i = 0; i < 30; i++) {
          const angle = (i / 30) * Math.PI * 2 + time / 50;
          const radius = explosionSize * 0.9 + Math.sin(time / 30 + i) * 50;
          const px = thunderBoltEndX + Math.cos(angle) * radius;
          const py = thunderBoltEndY + Math.sin(angle) * radius;

          const particleAlpha = Math.max(0, 0.9 - explosionProgress);
          ctx.strokeStyle = `rgba(255, 255, 0, ${particleAlpha})`;
          ctx.lineWidth = 3;
          ctx.shadowBlur = 25;
          ctx.beginPath();
          ctx.moveTo(thunderBoltEndX, thunderBoltEndY);
          // ジグザグパス
          for (let j = 1; j <= 4; j++) {
            const partProg = j / 4;
            const partX = thunderBoltEndX + (px - thunderBoltEndX) * partProg + (Math.random() - 0.5) * 15;
            const partY = thunderBoltEndY + (py - thunderBoltEndY) * partProg + (Math.random() - 0.5) * 15;
            ctx.lineTo(partX, partY);
          }
          ctx.lineTo(px, py);
          ctx.stroke();
        }

        // 中心の強力な光
        const coreSize = explosionSize * 0.3;
        const coreGradient = ctx.createRadialGradient(thunderBoltEndX, thunderBoltEndY, 0, thunderBoltEndX, thunderBoltEndY, coreSize);
        coreGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        coreGradient.addColorStop(0.5, 'rgba(255, 255, 0, 0.8)');
        coreGradient.addColorStop(1, 'rgba(255, 200, 0, 0)');
        ctx.fillStyle = coreGradient;
        ctx.shadowBlur = 60;
        ctx.beginPath();
        ctx.arc(thunderBoltEndX, thunderBoltEndY, coreSize, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.shadowBlur = 0;
      ctx.restore();
      break;

    case 'lucario_close_combat':
      // ルカリオのきんせつパンチエフェクト - 連続パンチ攻撃
      ctx.save();
      const closeCombatProgress = effect.progress !== undefined ? effect.progress : 0;
      const closeCombatStartX = effect.startX !== undefined ? effect.startX : targetX - 200;
      const closeCombatStartY = effect.startY !== undefined ? effect.startY : targetY + 50;
      const closeCombatEndX = effect.targetX !== undefined ? effect.targetX : targetX;
      const closeCombatEndY = effect.targetY !== undefined ? effect.targetY : targetY;

      // 連続パンチの軌道（複数のパンチが連続で飛ぶ）
      const punchCount = 5; // 5回の連続パンチ
      for (let punchIndex = 0; punchIndex < punchCount; punchIndex++) {
        const punchDelay = punchIndex * 0.15; // 各パンチの遅延
        const punchProgress = Math.max(0, Math.min(1, (closeCombatProgress - punchDelay) / 0.3));

        if (punchProgress > 0) {
          // パンチの現在位置
          const punchCurrentX = closeCombatStartX + (closeCombatEndX - closeCombatStartX) * punchProgress;
          const punchCurrentY = closeCombatStartY + (closeCombatEndY - closeCombatStartY) * punchProgress;

          // パンチのサイズ（最初のパンチが大きく、後続は少し小さく）
          const punchSize = 50 - punchIndex * 5;
          const punchAlpha = Math.min(1, punchProgress * 2) * (1 - punchIndex * 0.1);

          // パンチの描画（光る拳）
          const punchGradient = ctx.createRadialGradient(punchCurrentX, punchCurrentY, 0, punchCurrentX, punchCurrentY, punchSize);
          punchGradient.addColorStop(0, `rgba(59, 130, 246, ${punchAlpha})`); // 青い光
          punchGradient.addColorStop(0.3, `rgba(96, 165, 250, ${punchAlpha * 0.8})`);
          punchGradient.addColorStop(0.6, `rgba(147, 197, 253, ${punchAlpha * 0.6})`);
          punchGradient.addColorStop(1, `rgba(191, 219, 254, 0)`);

          ctx.fillStyle = punchGradient;
          ctx.shadowBlur = 30;
          ctx.shadowColor = 'rgba(59, 130, 246, 0.8)';
          ctx.beginPath();
          ctx.arc(punchCurrentX, punchCurrentY, punchSize, 0, Math.PI * 2);
          ctx.fill();

          // パンチの周りの衝撃波
          if (punchProgress > 0.5) {
            const shockWaveSize = (punchProgress - 0.5) * 2 * 80;
            const shockWaveAlpha = Math.max(0, (1 - punchProgress) * 0.6);
            ctx.strokeStyle = `rgba(59, 130, 246, ${shockWaveAlpha})`;
            ctx.lineWidth = 4;
            ctx.shadowBlur = 20;
            ctx.beginPath();
            ctx.arc(punchCurrentX, punchCurrentY, punchSize + shockWaveSize, 0, Math.PI * 2);
            ctx.stroke();
          }

          // パンチの軌跡（残像）
          for (let i = 1; i <= 3; i++) {
            const trailProgress = punchProgress - (i * 0.1);
            if (trailProgress > 0) {
              const trailX = closeCombatStartX + (closeCombatEndX - closeCombatStartX) * trailProgress;
              const trailY = closeCombatStartY + (closeCombatEndY - closeCombatStartY) * trailProgress;
              const trailAlpha = Math.max(0, 0.4 - (i * 0.1));
              ctx.fillStyle = `rgba(59, 130, 246, ${trailAlpha})`;
              ctx.shadowBlur = 15 * trailAlpha;
              ctx.beginPath();
              ctx.arc(trailX, trailY, punchSize * 0.7, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      }

      // 当たった時の爆発エフェクト（最後のパンチが当たった時）
      if (closeCombatProgress >= 0.9) {
        const explosionProgress = (closeCombatProgress - 0.9) / 0.1;
        const explosionSize = explosionProgress * 150;
        const explosionGradient = ctx.createRadialGradient(closeCombatEndX, closeCombatEndY, 0, closeCombatEndX, closeCombatEndY, explosionSize);
        explosionGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        explosionGradient.addColorStop(0.2, 'rgba(59, 130, 246, 1)');
        explosionGradient.addColorStop(0.4, 'rgba(96, 165, 250, 0.9)');
        explosionGradient.addColorStop(0.6, 'rgba(147, 197, 253, 0.7)');
        explosionGradient.addColorStop(1, 'rgba(191, 219, 254, 0)');

        ctx.fillStyle = explosionGradient;
        ctx.shadowBlur = 60;
        ctx.shadowColor = 'rgba(59, 130, 246, 0.8)';
        ctx.beginPath();
        ctx.arc(closeCombatEndX, closeCombatEndY, explosionSize, 0, Math.PI * 2);
        ctx.fill();

        // 爆発のパーティクル（青い光の粒子）
        for (let i = 0; i < 20; i++) {
          const angle = (i / 20) * Math.PI * 2 + time / 50;
          const radius = explosionSize * 0.8 + Math.sin(time / 30 + i) * 30;
          const px = closeCombatEndX + Math.cos(angle) * radius;
          const py = closeCombatEndY + Math.sin(angle) * radius;

          const particleAlpha = Math.max(0, 0.9 - explosionProgress);
          ctx.fillStyle = `rgba(59, 130, 246, ${particleAlpha})`;
          ctx.shadowBlur = 20;
          ctx.beginPath();
          ctx.arc(px, py, 5 + Math.sin(time / 40 + i) * 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.shadowBlur = 0;
      ctx.restore();
      break;

    case 'lucario_drain_punch':
      // ルカリオのドレインパンチエフェクト - エネルギーを吸収するパンチ
      ctx.save();
      const drainPunchProgress = effect.progress !== undefined ? effect.progress : 0;
      const drainPunchStartX = effect.startX !== undefined ? effect.startX : targetX - 200;
      const drainPunchStartY = effect.startY !== undefined ? effect.startY : targetY + 50;
      const drainPunchEndX = effect.targetX !== undefined ? effect.targetX : targetX;
      const drainPunchEndY = effect.targetY !== undefined ? effect.targetY : targetY;

      // パンチの軌道
      const drainPunchCurrentX = drainPunchStartX + (drainPunchEndX - drainPunchStartX) * drainPunchProgress;
      const drainPunchCurrentY = drainPunchStartY + (drainPunchEndY - drainPunchStartY) * drainPunchProgress;

      // パンチの描画（緑色のエネルギーをまとった拳）
      const drainPunchSize = 45 + Math.sin(time / 60) * 5;
      const drainPunchGradient = ctx.createRadialGradient(drainPunchCurrentX, drainPunchCurrentY, 0, drainPunchCurrentX, drainPunchCurrentY, drainPunchSize);
      drainPunchGradient.addColorStop(0, 'rgba(34, 197, 94, 1)'); // 緑色の光
      drainPunchGradient.addColorStop(0.3, 'rgba(74, 222, 128, 0.9)');
      drainPunchGradient.addColorStop(0.6, 'rgba(134, 239, 172, 0.7)');
      drainPunchGradient.addColorStop(1, 'rgba(187, 247, 208, 0)');

      ctx.fillStyle = drainPunchGradient;
      ctx.shadowBlur = 35;
      ctx.shadowColor = 'rgba(34, 197, 94, 0.8)';
      ctx.beginPath();
      ctx.arc(drainPunchCurrentX, drainPunchCurrentY, drainPunchSize, 0, Math.PI * 2);
      ctx.fill();

      // パンチの周りのエネルギーリング
      for (let i = 0; i < 3; i++) {
        const ringProgress = drainPunchProgress - (i * 0.1);
        if (ringProgress > 0) {
          const ringSize = drainPunchSize + 15 + i * 10;
          const ringAlpha = Math.max(0, (1 - ringProgress) * 0.5);
          ctx.strokeStyle = `rgba(34, 197, 94, ${ringAlpha})`;
          ctx.lineWidth = 3;
          ctx.shadowBlur = 15;
          ctx.beginPath();
          ctx.arc(drainPunchCurrentX, drainPunchCurrentY, ringSize, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // パンチからターゲットへのエネルギー吸収ライン（ドレイン効果）
      if (drainPunchProgress > 0.3) {
        const drainLineAlpha = Math.min(1, (drainPunchProgress - 0.3) / 0.4) * 0.6;
        const drainLineGradient = ctx.createLinearGradient(drainPunchEndX, drainPunchEndY, drainPunchCurrentX, drainPunchCurrentY);
        drainLineGradient.addColorStop(0, `rgba(34, 197, 94, ${drainLineAlpha})`);
        drainLineGradient.addColorStop(0.5, `rgba(74, 222, 128, ${drainLineAlpha * 0.8})`);
        drainLineGradient.addColorStop(1, `rgba(34, 197, 94, 0)`);

        ctx.strokeStyle = drainLineGradient;
        ctx.lineWidth = 4;
        ctx.shadowBlur = 20;
        ctx.beginPath();
        ctx.moveTo(drainPunchEndX, drainPunchEndY);
        ctx.lineTo(drainPunchCurrentX, drainPunchCurrentY);
        ctx.stroke();

        // エネルギー粒子が流れる
        for (let i = 0; i < 8; i++) {
          const particleProgress = (drainPunchProgress - 0.3) / 0.7;
          const particleOffset = (i / 8) * 0.5;
          const particlePos = (particleProgress + particleOffset) % 1;
          const particleX = drainPunchEndX + (drainPunchCurrentX - drainPunchEndX) * particlePos;
          const particleY = drainPunchEndY + (drainPunchCurrentY - drainPunchEndY) * particlePos;

          ctx.fillStyle = `rgba(34, 197, 94, ${drainLineAlpha})`;
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.arc(particleX, particleY, 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // パンチの軌跡（残像）
      for (let i = 1; i <= 4; i++) {
        const trailProgress = drainPunchProgress - (i * 0.08);
        if (trailProgress > 0) {
          const trailX = drainPunchStartX + (drainPunchEndX - drainPunchStartX) * trailProgress;
          const trailY = drainPunchStartY + (drainPunchEndY - drainPunchStartY) * trailProgress;
          const trailAlpha = Math.max(0, 0.5 - (i * 0.1));
          ctx.fillStyle = `rgba(34, 197, 94, ${trailAlpha})`;
          ctx.shadowBlur = 20 * trailAlpha;
          ctx.beginPath();
          ctx.arc(trailX, trailY, drainPunchSize * 0.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 当たった時の爆発エフェクト
      if (drainPunchProgress >= 0.9) {
        const explosionProgress = (drainPunchProgress - 0.9) / 0.1;
        const explosionSize = explosionProgress * 120;
        const explosionGradient = ctx.createRadialGradient(drainPunchEndX, drainPunchEndY, 0, drainPunchEndX, drainPunchEndY, explosionSize);
        explosionGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        explosionGradient.addColorStop(0.2, 'rgba(34, 197, 94, 1)');
        explosionGradient.addColorStop(0.4, 'rgba(74, 222, 128, 0.9)');
        explosionGradient.addColorStop(0.6, 'rgba(134, 239, 172, 0.7)');
        explosionGradient.addColorStop(1, 'rgba(187, 247, 208, 0)');

        ctx.fillStyle = explosionGradient;
        ctx.shadowBlur = 50;
        ctx.shadowColor = 'rgba(34, 197, 94, 0.8)';
        ctx.beginPath();
        ctx.arc(drainPunchEndX, drainPunchEndY, explosionSize, 0, Math.PI * 2);
        ctx.fill();

        // 爆発のパーティクル（緑色の光の粒子）
        for (let i = 0; i < 15; i++) {
          const angle = (i / 15) * Math.PI * 2 + time / 40;
          const radius = explosionSize * 0.7 + Math.sin(time / 25 + i) * 25;
          const px = drainPunchEndX + Math.cos(angle) * radius;
          const py = drainPunchEndY + Math.sin(angle) * radius;

          const particleAlpha = Math.max(0, 0.9 - explosionProgress);
          ctx.fillStyle = `rgba(34, 197, 94, ${particleAlpha})`;
          ctx.shadowBlur = 15;
          ctx.beginPath();
          ctx.arc(px, py, 4 + Math.sin(time / 35 + i) * 2, 0, Math.PI * 2);
          ctx.fill();
        }

        // エネルギー吸収のエフェクト（ターゲットからパンチへ）
        const absorbProgress = Math.min(1, explosionProgress * 1.5);
        if (absorbProgress < 1) {
          const absorbStartX = drainPunchEndX;
          const absorbStartY = drainPunchEndY;
          const absorbEndX = drainPunchStartX;
          const absorbEndY = drainPunchStartY;
          const absorbCurrentX = absorbStartX + (absorbEndX - absorbStartX) * absorbProgress;
          const absorbCurrentY = absorbStartY + (absorbEndY - absorbStartY) * absorbProgress;

          const absorbGradient = ctx.createLinearGradient(absorbStartX, absorbStartY, absorbCurrentX, absorbCurrentY);
          absorbGradient.addColorStop(0, `rgba(34, 197, 94, ${0.8 * (1 - absorbProgress)})`);
          absorbGradient.addColorStop(1, `rgba(34, 197, 94, 0)`);

          ctx.strokeStyle = absorbGradient;
          ctx.lineWidth = 6;
          ctx.shadowBlur = 25;
          ctx.beginPath();
          ctx.moveTo(absorbStartX, absorbStartY);
          ctx.lineTo(absorbCurrentX, absorbCurrentY);
          ctx.stroke();

          // 吸収されるエネルギー粒子
          for (let i = 0; i < 5; i++) {
            const particlePos = (absorbProgress + (i / 5) * 0.3) % 1;
            const particleX = absorbStartX + (absorbEndX - absorbStartX) * particlePos;
            const particleY = absorbStartY + (absorbEndY - absorbStartY) * particlePos;

            ctx.fillStyle = `rgba(34, 197, 94, ${0.9 * (1 - absorbProgress)})`;
            ctx.shadowBlur = 15;
            ctx.beginPath();
            ctx.arc(particleX, particleY, 6, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      ctx.shadowBlur = 0;
      ctx.restore();
      break;

    case 'aura_sphere':
      // はどうだんのエフェクト - 波動が広がるエネルギー弾
      ctx.save();
      const auraProgress = effect.progress !== undefined ? effect.progress : 0;
      const auraStartX = effect.startX !== undefined ? effect.startX : targetX - 200;
      const auraStartY = effect.startY !== undefined ? effect.startY : targetY;
      const auraEndX = effect.targetX !== undefined ? effect.targetX : targetX;
      const auraEndY = effect.targetY !== undefined ? effect.targetY : targetY;

      // 波動弾の軌道
      const auraCurrentX = auraStartX + (auraEndX - auraStartX) * auraProgress;
      const auraCurrentY = auraStartY + (auraEndY - auraStartY) * auraProgress;

      // 波動弾の本体（青いエネルギー球）
      const auraSize = 40 + Math.sin(time / 80) * 5;
      const auraGradient = ctx.createRadialGradient(auraCurrentX, auraCurrentY, 0, auraCurrentX, auraCurrentY, auraSize);
      auraGradient.addColorStop(0, 'rgba(59, 130, 246, 1)'); // 青い光
      auraGradient.addColorStop(0.2, 'rgba(96, 165, 250, 0.95)');
      auraGradient.addColorStop(0.4, 'rgba(147, 197, 253, 0.85)');
      auraGradient.addColorStop(0.6, 'rgba(191, 219, 254, 0.7)');
      auraGradient.addColorStop(1, 'rgba(219, 234, 254, 0)');

      ctx.fillStyle = auraGradient;
      ctx.shadowBlur = 40;
      ctx.shadowColor = 'rgba(59, 130, 246, 0.9)';
      ctx.beginPath();
      ctx.arc(auraCurrentX, auraCurrentY, auraSize, 0, Math.PI * 2);
      ctx.fill();

      // 波動のリング（複数のリングが広がる）
      for (let i = 0; i < 4; i++) {
        const ringProgress = auraProgress - (i * 0.15);
        if (ringProgress > 0) {
          const ringSize = auraSize + 20 + i * 15;
          const ringAlpha = Math.max(0, (1 - ringProgress) * 0.6);
          ctx.strokeStyle = `rgba(59, 130, 246, ${ringAlpha})`;
          ctx.lineWidth = 4 - i * 0.5;
          ctx.shadowBlur = 20;
          ctx.beginPath();
          ctx.arc(auraCurrentX, auraCurrentY, ringSize, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // 波動のエネルギー粒子（周囲に散らばる）
      for (let i = 0; i < 12; i++) {
        const particleAngle = (i / 12) * Math.PI * 2 + time / 100;
        const particleRadius = auraSize + 30 + Math.sin(time / 60 + i) * 15;
        const particleX = auraCurrentX + Math.cos(particleAngle) * particleRadius;
        const particleY = auraCurrentY + Math.sin(particleAngle) * particleRadius;

        const particleAlpha = 0.7 + Math.sin(time / 50 + i) * 0.3;
        ctx.fillStyle = `rgba(59, 130, 246, ${particleAlpha})`;
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(particleX, particleY, 6 + Math.sin(time / 70 + i) * 2, 0, Math.PI * 2);
        ctx.fill();
      }

      // 波動弾の軌跡（残像）
      for (let i = 1; i <= 5; i++) {
        const trailProgress = auraProgress - (i * 0.1);
        if (trailProgress > 0) {
          const trailX = auraStartX + (auraEndX - auraStartX) * trailProgress;
          const trailY = auraStartY + (auraEndY - auraStartY) * trailProgress;
          const trailAlpha = Math.max(0, 0.5 - (i * 0.1));
          ctx.fillStyle = `rgba(59, 130, 246, ${trailAlpha})`;
          ctx.shadowBlur = 20 * trailAlpha;
          ctx.beginPath();
          ctx.arc(trailX, trailY, auraSize * 0.7, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 当たった時の爆発エフェクト（波動が広がる）
      if (auraProgress >= 0.9) {
        const explosionProgress = (auraProgress - 0.9) / 0.1;
        const explosionSize = explosionProgress * 130;

        // 中央の爆発
        const explosionGradient = ctx.createRadialGradient(auraEndX, auraEndY, 0, auraEndX, auraEndY, explosionSize);
        explosionGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        explosionGradient.addColorStop(0.2, 'rgba(59, 130, 246, 1)');
        explosionGradient.addColorStop(0.4, 'rgba(96, 165, 250, 0.9)');
        explosionGradient.addColorStop(0.6, 'rgba(147, 197, 253, 0.7)');
        explosionGradient.addColorStop(1, 'rgba(191, 219, 254, 0)');

        ctx.fillStyle = explosionGradient;
        ctx.shadowBlur = 60;
        ctx.shadowColor = 'rgba(59, 130, 246, 0.8)';
        ctx.beginPath();
        ctx.arc(auraEndX, auraEndY, explosionSize, 0, Math.PI * 2);
        ctx.fill();

        // 広がる波動のリング（複数）
        for (let i = 0; i < 5; i++) {
          const waveProgress = explosionProgress - (i * 0.15);
          if (waveProgress > 0) {
            const waveSize = explosionSize * 0.5 + i * 20;
            const waveAlpha = Math.max(0, (1 - waveProgress) * 0.7);
            ctx.strokeStyle = `rgba(59, 130, 246, ${waveAlpha})`;
            ctx.lineWidth = 5 - i * 0.5;
            ctx.shadowBlur = 25;
            ctx.beginPath();
            ctx.arc(auraEndX, auraEndY, waveSize, 0, Math.PI * 2);
            ctx.stroke();
          }
        }

        // 爆発のパーティクル（青い光の粒子）
        for (let i = 0; i < 25; i++) {
          const angle = (i / 25) * Math.PI * 2 + time / 50;
          const radius = explosionSize * 0.8 + Math.sin(time / 30 + i) * 35;
          const px = auraEndX + Math.cos(angle) * radius;
          const py = auraEndY + Math.sin(angle) * radius;

          const particleAlpha = Math.max(0, 0.9 - explosionProgress);
          ctx.fillStyle = `rgba(59, 130, 246, ${particleAlpha})`;
          ctx.shadowBlur = 20;
          ctx.beginPath();
          ctx.arc(px, py, 6 + Math.sin(time / 40 + i) * 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.shadowBlur = 0;
      ctx.restore();
      break;

    case 'mega_punch':
      // メガパンチのエフェクト - 超強力なパンチ攻撃
      ctx.save();
      const megaPunchProgress = effect.progress !== undefined ? effect.progress : 0;
      const megaPunchStartX = effect.startX !== undefined ? effect.startX : targetX - 200;
      const megaPunchStartY = effect.startY !== undefined ? effect.startY : targetY + 50;
      const megaPunchEndX = effect.targetX !== undefined ? effect.targetX : targetX;
      const megaPunchEndY = effect.targetY !== undefined ? effect.targetY : targetY;

      // パンチの軌道
      const megaPunchCurrentX = megaPunchStartX + (megaPunchEndX - megaPunchStartX) * megaPunchProgress;
      const megaPunchCurrentY = megaPunchStartY + (megaPunchEndY - megaPunchStartY) * megaPunchProgress;

      // パンチの描画（巨大な光る拳）
      if (megaPunchProgress < 0.9) {
        const fistSize = 60 + Math.sin(time / 50) * 8;
        const fistGradient = ctx.createRadialGradient(megaPunchCurrentX, megaPunchCurrentY, 0, megaPunchCurrentX, megaPunchCurrentY, fistSize);
        fistGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        fistGradient.addColorStop(0.2, 'rgba(255, 200, 0, 1)');
        fistGradient.addColorStop(0.4, 'rgba(255, 100, 0, 0.95)');
        fistGradient.addColorStop(0.6, 'rgba(239, 68, 68, 0.9)');
        fistGradient.addColorStop(1, 'rgba(220, 38, 38, 0)');

        ctx.fillStyle = fistGradient;
        ctx.shadowBlur = 50;
        ctx.shadowColor = 'rgba(255, 200, 0, 0.9)';
        ctx.beginPath();
        ctx.arc(megaPunchCurrentX, megaPunchCurrentY, fistSize, 0, Math.PI * 2);
        ctx.fill();

        // 拳の周りの強力なエネルギーリング
        for (let i = 0; i < 5; i++) {
          const ringSize = fistSize + 15 + i * 12;
          const ringAlpha = 0.7 - i * 0.15;
          ctx.strokeStyle = `rgba(255, 200, 0, ${ringAlpha})`;
          ctx.lineWidth = 5 - i * 0.5;
          ctx.shadowBlur = 25;
          ctx.beginPath();
          ctx.arc(megaPunchCurrentX, megaPunchCurrentY, ringSize, 0, Math.PI * 2);
          ctx.stroke();
        }

        // 拳の周りのエネルギー粒子（激しく回転）
        for (let i = 0; i < 16; i++) {
          const particleAngle = (i / 16) * Math.PI * 2 + time / 40;
          const particleRadius = fistSize + 25 + Math.sin(time / 50 + i) * 20;
          const particleX = megaPunchCurrentX + Math.cos(particleAngle) * particleRadius;
          const particleY = megaPunchCurrentY + Math.sin(particleAngle) * particleRadius;

          const particleAlpha = 0.8 + Math.sin(time / 30 + i) * 0.2;
          ctx.fillStyle = `rgba(255, 200, 0, ${particleAlpha})`;
          ctx.shadowBlur = 20;
          ctx.beginPath();
          ctx.arc(particleX, particleY, 8 + Math.sin(time / 60 + i) * 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // パンチの軌跡（強力な残像）
      for (let i = 1; i <= 6; i++) {
        const trailProgress = megaPunchProgress - (i * 0.08);
        if (trailProgress > 0) {
          const trailX = megaPunchStartX + (megaPunchEndX - megaPunchStartX) * trailProgress;
          const trailY = megaPunchStartY + (megaPunchEndY - megaPunchStartY) * trailProgress;
          const trailAlpha = Math.max(0, 0.6 - (i * 0.1));
          const trailSize = 60 - i * 3;
          ctx.fillStyle = `rgba(255, 200, 0, ${trailAlpha})`;
          ctx.shadowBlur = 30 * trailAlpha;
          ctx.beginPath();
          ctx.arc(trailX, trailY, trailSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 当たった時の超強力な爆発エフェクト
      if (megaPunchProgress >= 0.9) {
        const explosionProgress = (megaPunchProgress - 0.9) / 0.1;
        const explosionSize = explosionProgress * 180;

        // 中央の超強力な爆発
        const explosionGradient = ctx.createRadialGradient(megaPunchEndX, megaPunchEndY, 0, megaPunchEndX, megaPunchEndY, explosionSize);
        explosionGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        explosionGradient.addColorStop(0.15, 'rgba(255, 255, 200, 1)');
        explosionGradient.addColorStop(0.3, 'rgba(255, 200, 0, 1)');
        explosionGradient.addColorStop(0.5, 'rgba(255, 100, 0, 0.95)');
        explosionGradient.addColorStop(0.7, 'rgba(239, 68, 68, 0.9)');
        explosionGradient.addColorStop(1, 'rgba(220, 38, 38, 0)');

        ctx.fillStyle = explosionGradient;
        ctx.shadowBlur = 80;
        ctx.shadowColor = 'rgba(255, 200, 0, 0.9)';
        ctx.beginPath();
        ctx.arc(megaPunchEndX, megaPunchEndY, explosionSize, 0, Math.PI * 2);
        ctx.fill();

        // 広がる衝撃波（複数）
        for (let i = 0; i < 6; i++) {
          const shockWaveProgress = explosionProgress - (i * 0.12);
          if (shockWaveProgress > 0) {
            const shockWaveSize = explosionSize * 0.4 + i * 25;
            const shockWaveAlpha = Math.max(0, (1 - shockWaveProgress) * 0.8);
            ctx.strokeStyle = `rgba(255, 200, 0, ${shockWaveAlpha})`;
            ctx.lineWidth = 6 - i * 0.5;
            ctx.shadowBlur = 30;
            ctx.beginPath();
            ctx.arc(megaPunchEndX, megaPunchEndY, shockWaveSize, 0, Math.PI * 2);
            ctx.stroke();
          }
        }

        // 爆発のパーティクル（多数の光の粒子）
        for (let i = 0; i < 30; i++) {
          const angle = (i / 30) * Math.PI * 2 + time / 40;
          const radius = explosionSize * 0.9 + Math.sin(time / 25 + i) * 40;
          const px = megaPunchEndX + Math.cos(angle) * radius;
          const py = megaPunchEndY + Math.sin(angle) * radius;

          const particleAlpha = Math.max(0, 0.95 - explosionProgress);
          ctx.fillStyle = `rgba(255, 200, 0, ${particleAlpha})`;
          ctx.shadowBlur = 25;
          ctx.beginPath();
          ctx.arc(px, py, 8 + Math.sin(time / 50 + i) * 4, 0, Math.PI * 2);
          ctx.fill();
        }

        // 中心の強力な光
        const coreSize = explosionSize * 0.3;
        const coreGradient = ctx.createRadialGradient(megaPunchEndX, megaPunchEndY, 0, megaPunchEndX, megaPunchEndY, coreSize);
        coreGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        coreGradient.addColorStop(0.5, 'rgba(255, 255, 200, 0.9)');
        coreGradient.addColorStop(1, 'rgba(255, 200, 0, 0)');
        ctx.fillStyle = coreGradient;
        ctx.shadowBlur = 70;
        ctx.beginPath();
        ctx.arc(megaPunchEndX, megaPunchEndY, coreSize, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.shadowBlur = 0;
      ctx.restore();
      break;

    case 'psychokinesis':
      // サイコキネシスのエフェクト - 念力で物体を浮かせる
      ctx.save();
      const psychokinesisProgress = effect.progress !== undefined ? effect.progress : 0;
      const psychokinesisStartX = effect.startX !== undefined ? effect.startX : targetX - 200;
      const psychokinesisStartY = effect.startY !== undefined ? effect.startY : targetY;
      const psychokinesisEndX = effect.targetX !== undefined ? effect.targetX : targetX;
      const psychokinesisEndY = effect.targetY !== undefined ? effect.targetY : targetY;

      // サイコエネルギーの軌道
      const psychokinesisCurrentX = psychokinesisStartX + (psychokinesisEndX - psychokinesisStartX) * psychokinesisProgress;
      const psychokinesisCurrentY = psychokinesisStartY + (psychokinesisEndY - psychokinesisStartY) * psychokinesisProgress;

      // サイコエネルギーの波（複数の波が広がる）
      for (let i = 0; i < 5; i++) {
        const waveProgress = psychokinesisProgress - (i * 0.15);
        if (waveProgress > 0) {
          const waveSize = 50 + i * 20;
          const waveAlpha = Math.max(0, (1 - waveProgress) * 0.7);
          ctx.strokeStyle = `rgba(168, 85, 247, ${waveAlpha})`;
          ctx.lineWidth = 4 - i * 0.5;
          ctx.shadowBlur = 25;
          ctx.shadowColor = 'rgba(168, 85, 247, 0.8)';
          ctx.beginPath();
          ctx.arc(psychokinesisCurrentX, psychokinesisCurrentY, waveSize, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // サイコエネルギーの粒子（紫色の光が回転）
      for (let i = 0; i < 16; i++) {
        const particleAngle = (i / 16) * Math.PI * 2 + time / 80;
        const particleRadius = 60 + Math.sin(time / 60 + i) * 20;
        const particleX = psychokinesisCurrentX + Math.cos(particleAngle) * particleRadius;
        const particleY = psychokinesisCurrentY + Math.sin(particleAngle) * particleRadius;

        const particleAlpha = 0.8 + Math.sin(time / 50 + i) * 0.2;
        ctx.fillStyle = `rgba(168, 85, 247, ${particleAlpha})`;
        ctx.shadowBlur = 20;
        ctx.beginPath();
        ctx.arc(particleX, particleY, 8 + Math.sin(time / 70 + i) * 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // 中央のサイコエネルギーボール
      const psychokinesisSize = 45 + Math.sin(time / 70) * 5;
      const psychokinesisGradient = ctx.createRadialGradient(psychokinesisCurrentX, psychokinesisCurrentY, 0, psychokinesisCurrentX, psychokinesisCurrentY, psychokinesisSize);
      psychokinesisGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      psychokinesisGradient.addColorStop(0.2, 'rgba(200, 150, 255, 1)');
      psychokinesisGradient.addColorStop(0.4, 'rgba(168, 85, 247, 0.95)');
      psychokinesisGradient.addColorStop(0.6, 'rgba(139, 92, 246, 0.85)');
      psychokinesisGradient.addColorStop(1, 'rgba(124, 58, 237, 0)');

      ctx.fillStyle = psychokinesisGradient;
      ctx.shadowBlur = 45;
      ctx.shadowColor = 'rgba(168, 85, 247, 0.9)';
      ctx.beginPath();
      ctx.arc(psychokinesisCurrentX, psychokinesisCurrentY, psychokinesisSize, 0, Math.PI * 2);
      ctx.fill();

      // 当たった時の爆発エフェクト
      if (psychokinesisProgress >= 0.9) {
        const explosionProgress = (psychokinesisProgress - 0.9) / 0.1;
        const explosionSize = explosionProgress * 150;
        const explosionGradient = ctx.createRadialGradient(psychokinesisEndX, psychokinesisEndY, 0, psychokinesisEndX, psychokinesisEndY, explosionSize);
        explosionGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        explosionGradient.addColorStop(0.2, 'rgba(200, 150, 255, 1)');
        explosionGradient.addColorStop(0.4, 'rgba(168, 85, 247, 0.9)');
        explosionGradient.addColorStop(0.6, 'rgba(139, 92, 246, 0.7)');
        explosionGradient.addColorStop(1, 'rgba(124, 58, 237, 0)');

        ctx.fillStyle = explosionGradient;
        ctx.shadowBlur = 70;
        ctx.shadowColor = 'rgba(168, 85, 247, 0.9)';
        ctx.beginPath();
        ctx.arc(psychokinesisEndX, psychokinesisEndY, explosionSize, 0, Math.PI * 2);
        ctx.fill();

        // 広がるサイコエネルギーのリング
        for (let i = 0; i < 6; i++) {
          const ringProgress = explosionProgress - (i * 0.12);
          if (ringProgress > 0) {
            const ringSize = explosionSize * 0.5 + i * 20;
            const ringAlpha = Math.max(0, (1 - ringProgress) * 0.8);
            ctx.strokeStyle = `rgba(168, 85, 247, ${ringAlpha})`;
            ctx.lineWidth = 5 - i * 0.5;
            ctx.shadowBlur = 30;
            ctx.beginPath();
            ctx.arc(psychokinesisEndX, psychokinesisEndY, ringSize, 0, Math.PI * 2);
            ctx.stroke();
          }
        }

        // 爆発のパーティクル
        for (let i = 0; i < 25; i++) {
          const angle = (i / 25) * Math.PI * 2 + time / 50;
          const radius = explosionSize * 0.8 + Math.sin(time / 30 + i) * 35;
          const px = psychokinesisEndX + Math.cos(angle) * radius;
          const py = psychokinesisEndY + Math.sin(angle) * radius;

          const particleAlpha = Math.max(0, 0.9 - explosionProgress);
          ctx.fillStyle = `rgba(168, 85, 247, ${particleAlpha})`;
          ctx.shadowBlur = 20;
          ctx.beginPath();
          ctx.arc(px, py, 6 + Math.sin(time / 40 + i) * 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.shadowBlur = 0;
      ctx.restore();
      break;

    case 'psycho_break':
      // サイコブレイクのエフェクト - 強力なサイコエネルギーの衝撃波
      ctx.save();
      const psychoBreakProgress = effect.progress !== undefined ? effect.progress : 0;
      const psychoBreakStartX = effect.startX !== undefined ? effect.startX : targetX - 200;
      const psychoBreakStartY = effect.startY !== undefined ? effect.startY : targetY;
      const psychoBreakEndX = effect.targetX !== undefined ? effect.targetX : targetX;
      const psychoBreakEndY = effect.targetY !== undefined ? effect.targetY : targetY;

      // サイコエネルギーの軌道
      const psychoBreakCurrentX = psychoBreakStartX + (psychoBreakEndX - psychoBreakStartX) * psychoBreakProgress;
      const psychoBreakCurrentY = psychoBreakStartY + (psychoBreakEndY - psychoBreakStartY) * psychoBreakProgress;

      // 強力なサイコエネルギービーム
      const psychoBeamWidth = 40 + Math.sin(time / 50) * 5;
      const psychoBeamGradient = ctx.createLinearGradient(psychoBreakStartX, psychoBreakStartY, psychoBreakCurrentX, psychoBreakCurrentY);
      psychoBeamGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      psychoBeamGradient.addColorStop(0.2, 'rgba(200, 150, 255, 1)');
      psychoBeamGradient.addColorStop(0.4, 'rgba(168, 85, 247, 0.95)');
      psychoBeamGradient.addColorStop(0.6, 'rgba(139, 92, 246, 0.9)');
      psychoBeamGradient.addColorStop(1, 'rgba(124, 58, 237, 0.7)');

      ctx.strokeStyle = psychoBeamGradient;
      ctx.lineWidth = psychoBeamWidth;
      ctx.shadowBlur = 50;
      ctx.shadowColor = 'rgba(168, 85, 247, 0.9)';
      ctx.lineCap = 'round';

      ctx.beginPath();
      ctx.moveTo(psychoBreakStartX, psychoBreakStartY);
      ctx.lineTo(psychoBreakCurrentX, psychoBreakCurrentY);
      ctx.stroke();

      // 内側のコア
      ctx.strokeStyle = 'rgba(255, 255, 255, 1)';
      ctx.lineWidth = 15;
      ctx.shadowBlur = 30;
      ctx.beginPath();
      ctx.moveTo(psychoBreakStartX, psychoBreakStartY);
      ctx.lineTo(psychoBreakCurrentX, psychoBreakCurrentY);
      ctx.stroke();

      // ビームの周りのサイコエネルギーの粒子
      for (let i = 0; i < 12; i++) {
        const particleAngle = (i / 12) * Math.PI * 2 + time / 60;
        const particleRadius = psychoBeamWidth / 2 + 25 + Math.sin(time / 50 + i) * 15;
        const particleX = psychoBreakCurrentX + Math.cos(particleAngle) * particleRadius;
        const particleY = psychoBreakCurrentY + Math.sin(particleAngle) * particleRadius;

        ctx.fillStyle = `rgba(168, 85, 247, ${0.8 + Math.sin(time / 40 + i) * 0.2})`;
        ctx.shadowBlur = 20;
        ctx.beginPath();
        ctx.arc(particleX, particleY, 10 + Math.sin(time / 60 + i) * 4, 0, Math.PI * 2);
        ctx.fill();
      }

      // 当たった時の強力な爆発エフェクト
      if (psychoBreakProgress >= 0.9) {
        const explosionProgress = (psychoBreakProgress - 0.9) / 0.1;
        const explosionSize = explosionProgress * 180;

        // 中央の爆発
        const explosionGradient = ctx.createRadialGradient(psychoBreakEndX, psychoBreakEndY, 0, psychoBreakEndX, psychoBreakEndY, explosionSize);
        explosionGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        explosionGradient.addColorStop(0.15, 'rgba(200, 150, 255, 1)');
        explosionGradient.addColorStop(0.3, 'rgba(168, 85, 247, 1)');
        explosionGradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.9)');
        explosionGradient.addColorStop(0.7, 'rgba(124, 58, 237, 0.7)');
        explosionGradient.addColorStop(1, 'rgba(109, 40, 217, 0)');

        ctx.fillStyle = explosionGradient;
        ctx.shadowBlur = 80;
        ctx.shadowColor = 'rgba(168, 85, 247, 0.9)';
        ctx.beginPath();
        ctx.arc(psychoBreakEndX, psychoBreakEndY, explosionSize, 0, Math.PI * 2);
        ctx.fill();

        // 広がる衝撃波（複数）
        for (let i = 0; i < 7; i++) {
          const shockWaveProgress = explosionProgress - (i * 0.1);
          if (shockWaveProgress > 0) {
            const shockWaveSize = explosionSize * 0.4 + i * 25;
            const shockWaveAlpha = Math.max(0, (1 - shockWaveProgress) * 0.9);
            ctx.strokeStyle = `rgba(168, 85, 247, ${shockWaveAlpha})`;
            ctx.lineWidth = 6 - i * 0.5;
            ctx.shadowBlur = 35;
            ctx.beginPath();
            ctx.arc(psychoBreakEndX, psychoBreakEndY, shockWaveSize, 0, Math.PI * 2);
            ctx.stroke();
          }
        }

        // 爆発のパーティクル（多数）
        for (let i = 0; i < 30; i++) {
          const angle = (i / 30) * Math.PI * 2 + time / 40;
          const radius = explosionSize * 0.9 + Math.sin(time / 25 + i) * 40;
          const px = psychoBreakEndX + Math.cos(angle) * radius;
          const py = psychoBreakEndY + Math.sin(angle) * radius;

          const particleAlpha = Math.max(0, 0.95 - explosionProgress);
          ctx.fillStyle = `rgba(168, 85, 247, ${particleAlpha})`;
          ctx.shadowBlur = 25;
          ctx.beginPath();
          ctx.arc(px, py, 8 + Math.sin(time / 50 + i) * 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.shadowBlur = 0;
      ctx.restore();
      break;

    case 'psycho_shock':
      // サイコショックのエフェクト - 瞬間的なサイコエネルギーの衝撃
      ctx.save();
      const psychoShockProgress = effect.progress !== undefined ? effect.progress : 0;
      const psychoShockStartX = effect.startX !== undefined ? effect.startX : targetX - 200;
      const psychoShockStartY = effect.startY !== undefined ? effect.startY : targetY;
      const psychoShockEndX = effect.targetX !== undefined ? effect.targetX : targetX;
      const psychoShockEndY = effect.targetY !== undefined ? effect.targetY : targetY;

      // サイコエネルギーの軌道
      const psychoShockCurrentX = psychoShockStartX + (psychoShockEndX - psychoShockStartX) * psychoShockProgress;
      const psychoShockCurrentY = psychoShockStartY + (psychoShockEndY - psychoShockStartY) * psychoShockProgress;

      // 瞬間的なサイコエネルギーの閃光
      const flashSize = 50 + Math.sin(time / 40) * 10;
      const flashGradient = ctx.createRadialGradient(psychoShockCurrentX, psychoShockCurrentY, 0, psychoShockCurrentX, psychoShockCurrentY, flashSize);
      flashGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      flashGradient.addColorStop(0.15, 'rgba(200, 150, 255, 1)');
      flashGradient.addColorStop(0.3, 'rgba(168, 85, 247, 0.95)');
      flashGradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.85)');
      flashGradient.addColorStop(1, 'rgba(124, 58, 237, 0)');

      ctx.fillStyle = flashGradient;
      ctx.shadowBlur = 50;
      ctx.shadowColor = 'rgba(168, 85, 247, 0.9)';
      ctx.beginPath();
      ctx.arc(psychoShockCurrentX, psychoShockCurrentY, flashSize, 0, Math.PI * 2);
      ctx.fill();

      // 閃光の周りのサイコエネルギーのリング
      for (let i = 0; i < 4; i++) {
        const ringSize = flashSize + 15 + i * 15;
        const ringAlpha = 0.8 - i * 0.2;
        ctx.strokeStyle = `rgba(168, 85, 247, ${ringAlpha})`;
        ctx.lineWidth = 5 - i * 0.5;
        ctx.shadowBlur = 25;
        ctx.beginPath();
        ctx.arc(psychoShockCurrentX, psychoShockCurrentY, ringSize, 0, Math.PI * 2);
        ctx.stroke();
      }

      // サイコエネルギーの粒子（激しく回転）
      for (let i = 0; i < 20; i++) {
        const particleAngle = (i / 20) * Math.PI * 2 + time / 30;
        const particleRadius = flashSize + 20 + Math.sin(time / 40 + i) * 25;
        const particleX = psychoShockCurrentX + Math.cos(particleAngle) * particleRadius;
        const particleY = psychoShockCurrentY + Math.sin(particleAngle) * particleRadius;

        const particleAlpha = 0.9 + Math.sin(time / 25 + i) * 0.1;
        ctx.fillStyle = `rgba(168, 85, 247, ${particleAlpha})`;
        ctx.shadowBlur = 20;
        ctx.beginPath();
        ctx.arc(particleX, particleY, 9 + Math.sin(time / 50 + i) * 4, 0, Math.PI * 2);
        ctx.fill();
      }

      // 当たった時の強力な爆発エフェクト
      if (psychoShockProgress >= 0.9) {
        const explosionProgress = (psychoShockProgress - 0.9) / 0.1;
        const explosionSize = explosionProgress * 160;

        // 中央の爆発
        const explosionGradient = ctx.createRadialGradient(psychoShockEndX, psychoShockEndY, 0, psychoShockEndX, psychoShockEndY, explosionSize);
        explosionGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        explosionGradient.addColorStop(0.2, 'rgba(200, 150, 255, 1)');
        explosionGradient.addColorStop(0.4, 'rgba(168, 85, 247, 0.95)');
        explosionGradient.addColorStop(0.6, 'rgba(139, 92, 246, 0.8)');
        explosionGradient.addColorStop(1, 'rgba(124, 58, 237, 0)');

        ctx.fillStyle = explosionGradient;
        ctx.shadowBlur = 75;
        ctx.shadowColor = 'rgba(168, 85, 247, 0.9)';
        ctx.beginPath();
        ctx.arc(psychoShockEndX, psychoShockEndY, explosionSize, 0, Math.PI * 2);
        ctx.fill();

        // 広がる衝撃波
        for (let i = 0; i < 6; i++) {
          const shockWaveProgress = explosionProgress - (i * 0.12);
          if (shockWaveProgress > 0) {
            const shockWaveSize = explosionSize * 0.5 + i * 22;
            const shockWaveAlpha = Math.max(0, (1 - shockWaveProgress) * 0.85);
            ctx.strokeStyle = `rgba(168, 85, 247, ${shockWaveAlpha})`;
            ctx.lineWidth = 6 - i * 0.5;
            ctx.shadowBlur = 30;
            ctx.beginPath();
            ctx.arc(psychoShockEndX, psychoShockEndY, shockWaveSize, 0, Math.PI * 2);
            ctx.stroke();
          }
        }

        // 爆発のパーティクル
        for (let i = 0; i < 28; i++) {
          const angle = (i / 28) * Math.PI * 2 + time / 45;
          const radius = explosionSize * 0.85 + Math.sin(time / 30 + i) * 38;
          const px = psychoShockEndX + Math.cos(angle) * radius;
          const py = psychoShockEndY + Math.sin(angle) * radius;

          const particleAlpha = Math.max(0, 0.9 - explosionProgress);
          ctx.fillStyle = `rgba(168, 85, 247, ${particleAlpha})`;
          ctx.shadowBlur = 22;
          ctx.beginPath();
          ctx.arc(px, py, 7 + Math.sin(time / 55 + i) * 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.shadowBlur = 0;
      ctx.restore();
      break;

    case 'dai_monji':
      // だいもんじのエフェクト - 強力な火を吹いて、最後に「大」の文字で当たる
      ctx.save();
      const daiMonjiProgress = effect.progress !== undefined ? effect.progress : 0;
      const daiMonjiStartX = effect.startX !== undefined ? effect.startX : targetX - 200;
      const daiMonjiStartY = effect.startY !== undefined ? effect.startY : targetY;
      const daiMonjiEndX = effect.targetX !== undefined ? effect.targetX : targetX;
      const daiMonjiEndY = effect.targetY !== undefined ? effect.targetY : targetY;

      // 火の軌道
      const daiMonjiCurrentX = daiMonjiStartX + (daiMonjiEndX - daiMonjiStartX) * daiMonjiProgress;
      const daiMonjiCurrentY = daiMonjiStartY + (daiMonjiEndY - daiMonjiStartY) * daiMonjiProgress;

      // 強力な火の炎（複数の炎が激しく燃える）
      for (let i = 0; i < 20; i++) {
        const flameAngle = (i / 20) * Math.PI * 2 + time / 50;
        const flameRadius = 40 + Math.sin(time / 40 + i) * 30;
        const flameX = daiMonjiCurrentX + Math.cos(flameAngle) * flameRadius;
        const flameY = daiMonjiCurrentY + Math.sin(flameAngle) * flameRadius;

        const flameGradient = ctx.createRadialGradient(flameX, flameY, 0, flameX, flameY, 25 + Math.sin(time / 60 + i) * 10);
        flameGradient.addColorStop(0, `rgba(255, 255, 255, ${0.9 + Math.sin(time / 30 + i) * 0.1})`);
        flameGradient.addColorStop(0.2, `rgba(255, 200, 0, ${0.95 + Math.sin(time / 40 + i) * 0.05})`);
        flameGradient.addColorStop(0.4, `rgba(255, 100, 0, ${0.9 + Math.sin(time / 50 + i) * 0.1})`);
        flameGradient.addColorStop(0.6, `rgba(255, 50, 0, ${0.85 + Math.sin(time / 60 + i) * 0.15})`);
        flameGradient.addColorStop(1, 'rgba(200, 0, 0, 0)');

        ctx.fillStyle = flameGradient;
        ctx.shadowBlur = 40;
        ctx.shadowColor = 'rgba(255, 100, 0, 0.9)';
        ctx.beginPath();
        ctx.arc(flameX, flameY, 20 + Math.sin(time / 50 + i) * 8, 0, Math.PI * 2);
        ctx.fill();
      }

      // 火の流れ（炎が前方に流れる）
      for (let i = 0; i < 15; i++) {
        const streamProgress = daiMonjiProgress - (i * 0.05);
        if (streamProgress > 0) {
          const streamX = daiMonjiStartX + (daiMonjiCurrentX - daiMonjiStartX) * streamProgress;
          const streamY = daiMonjiStartY + (daiMonjiCurrentY - daiMonjiStartY) * streamProgress;
          const streamOffset = (Math.sin(time / 30 + i) * 20) * (1 - streamProgress);

          const streamGradient = ctx.createRadialGradient(streamX + streamOffset, streamY, 0, streamX + streamOffset, streamY, 30);
          streamGradient.addColorStop(0, `rgba(255, 255, 0, ${0.8 * (1 - streamProgress)})`);
          streamGradient.addColorStop(0.3, `rgba(255, 150, 0, ${0.7 * (1 - streamProgress)})`);
          streamGradient.addColorStop(0.6, `rgba(255, 50, 0, ${0.6 * (1 - streamProgress)})`);
          streamGradient.addColorStop(1, 'rgba(200, 0, 0, 0)');

          ctx.fillStyle = streamGradient;
          ctx.shadowBlur = 30;
          ctx.beginPath();
          ctx.arc(streamX + streamOffset, streamY, 25 + Math.sin(time / 40 + i) * 5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 当たった時の「大」の文字エフェクト
      if (daiMonjiProgress >= 0.9) {
        const explosionProgress = (daiMonjiProgress - 0.9) / 0.1;

        // 「大」の文字を描画
        ctx.save();
        ctx.translate(daiMonjiEndX, daiMonjiEndY);
        ctx.scale(1 + explosionProgress * 2, 1 + explosionProgress * 2);
        ctx.rotate(Math.sin(time / 100) * 0.1);

        // 文字の影（炎の効果）
        ctx.shadowBlur = 50;
        ctx.shadowColor = 'rgba(255, 100, 0, 1)';
        ctx.fillStyle = 'rgba(255, 255, 0, 1)';
        ctx.font = `bold ${80 + explosionProgress * 40}px "MS Gothic", "Hiragino Kaku Gothic ProN", "Hiragino Sans", sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('大', 0, 0);

        // 文字の外側の炎のエフェクト
        ctx.strokeStyle = 'rgba(255, 200, 0, 1)';
        ctx.lineWidth = 8;
        ctx.shadowBlur = 40;
        ctx.strokeText('大', 0, 0);

        ctx.restore();
      }

      ctx.shadowBlur = 0;
      ctx.restore();
      break;

    case 'steel_wing':
      // はがねのつばさのエフェクト - 鋼の翼が高速で飛んでいく
      ctx.save();
      const steelWingProgress = effect.progress !== undefined ? effect.progress : 0;
      const steelWingStartX = effect.startX !== undefined ? effect.startX : targetX - 200;
      const steelWingStartY = effect.startY !== undefined ? effect.startY : targetY;
      const steelWingEndX = effect.targetX !== undefined ? effect.targetX : targetX;
      const steelWingEndY = effect.targetY !== undefined ? effect.targetY : targetY;

      // 翼の軌道
      const steelWingCurrentX = steelWingStartX + (steelWingEndX - steelWingStartX) * steelWingProgress;
      const steelWingCurrentY = steelWingStartY + (steelWingEndY - steelWingStartY) * steelWingProgress;

      // 鋼の翼の描画（金属的な光沢とスピード感）
      ctx.save();
      ctx.translate(steelWingCurrentX, steelWingCurrentY);
      ctx.rotate(Math.atan2(steelWingEndY - steelWingStartY, steelWingEndX - steelWingStartX));

      // 翼の本体（金属的なグラデーション）
      const wingGradient = ctx.createLinearGradient(-60, -20, 60, 20);
      wingGradient.addColorStop(0, 'rgba(200, 200, 220, 0.9)');
      wingGradient.addColorStop(0.3, 'rgba(150, 150, 180, 0.95)');
      wingGradient.addColorStop(0.5, 'rgba(100, 100, 140, 1)');
      wingGradient.addColorStop(0.7, 'rgba(150, 150, 180, 0.95)');
      wingGradient.addColorStop(1, 'rgba(200, 200, 220, 0.9)');

      ctx.fillStyle = wingGradient;
      ctx.shadowBlur = 30;
      ctx.shadowColor = 'rgba(150, 150, 180, 0.8)';

      // 翼の形状（三角形のような形）
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(-50, -25);
      ctx.lineTo(-30, -15);
      ctx.lineTo(0, -5);
      ctx.lineTo(30, -15);
      ctx.lineTo(50, -25);
      ctx.lineTo(0, 0);
      ctx.closePath();
      ctx.fill();

      // 翼のハイライト（金属の光沢）
      const highlightGradient = ctx.createLinearGradient(-40, -15, 40, 15);
      highlightGradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
      highlightGradient.addColorStop(0.5, 'rgba(200, 200, 220, 0.6)');
      highlightGradient.addColorStop(1, 'rgba(150, 150, 180, 0.4)');
      ctx.fillStyle = highlightGradient;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(-30, -15);
      ctx.lineTo(0, -5);
      ctx.lineTo(30, -15);
      ctx.closePath();
      ctx.fill();

      // 翼の縁（鋭いエッジ）
      ctx.strokeStyle = 'rgba(100, 100, 140, 1)';
      ctx.lineWidth = 3;
      ctx.shadowBlur = 20;
      ctx.beginPath();
      ctx.moveTo(-50, -25);
      ctx.lineTo(-30, -15);
      ctx.lineTo(0, -5);
      ctx.lineTo(30, -15);
      ctx.lineTo(50, -25);
      ctx.stroke();

      ctx.restore();

      // 翼の軌跡（残像エフェクト）
      for (let i = 1; i <= 5; i++) {
        const trailProgress = steelWingProgress - (i * 0.1);
        if (trailProgress > 0) {
          const trailX = steelWingStartX + (steelWingEndX - steelWingStartX) * trailProgress;
          const trailY = steelWingStartY + (steelWingEndY - steelWingStartY) * trailProgress;
          const trailAlpha = Math.max(0, 0.5 - (i * 0.1));

          ctx.save();
          ctx.translate(trailX, trailY);
          ctx.rotate(Math.atan2(steelWingEndY - steelWingStartY, steelWingEndX - steelWingStartX));
          ctx.globalAlpha = trailAlpha;

          ctx.fillStyle = 'rgba(150, 150, 180, 0.6)';
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(-40, -20);
          ctx.lineTo(-20, -12);
          ctx.lineTo(0, -4);
          ctx.lineTo(20, -12);
          ctx.lineTo(40, -20);
          ctx.closePath();
          ctx.fill();

          ctx.restore();
        }
      }

      // 当たった時の爆発エフェクト（金属の破片が飛び散る）
      if (steelWingProgress >= 0.9) {
        const explosionProgress = (steelWingProgress - 0.9) / 0.1;
        const explosionSize = explosionProgress * 120;

        // 中央の爆発
        const explosionGradient = ctx.createRadialGradient(steelWingEndX, steelWingEndY, 0, steelWingEndX, steelWingEndY, explosionSize);
        explosionGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        explosionGradient.addColorStop(0.2, 'rgba(200, 200, 220, 0.9)');
        explosionGradient.addColorStop(0.4, 'rgba(150, 150, 180, 0.8)');
        explosionGradient.addColorStop(0.6, 'rgba(100, 100, 140, 0.6)');
        explosionGradient.addColorStop(1, 'rgba(50, 50, 80, 0)');

        ctx.fillStyle = explosionGradient;
        ctx.shadowBlur = 60;
        ctx.shadowColor = 'rgba(150, 150, 180, 0.9)';
        ctx.beginPath();
        ctx.arc(steelWingEndX, steelWingEndY, explosionSize, 0, Math.PI * 2);
        ctx.fill();

        // 金属の破片が飛び散る
        for (let i = 0; i < 25; i++) {
          const angle = (i / 25) * Math.PI * 2 + time / 40;
          const radius = explosionSize * 0.8 + Math.sin(time / 25 + i) * 40;
          const px = steelWingEndX + Math.cos(angle) * radius;
          const py = steelWingEndY + Math.sin(angle) * radius;

          const particleAlpha = Math.max(0, 0.9 - explosionProgress);
          ctx.fillStyle = `rgba(200, 200, 220, ${particleAlpha})`;
          ctx.shadowBlur = 20;
          ctx.beginPath();
          // 破片の形状（細長い）
          ctx.save();
          ctx.translate(px, py);
          ctx.rotate(angle);
          ctx.fillRect(-8, -3, 16, 6);
          ctx.restore();
        }

        // 衝撃波
        for (let i = 0; i < 5; i++) {
          const shockWaveProgress = explosionProgress - (i * 0.15);
          if (shockWaveProgress > 0) {
            const shockWaveSize = explosionSize * 0.5 + i * 20;
            const shockWaveAlpha = Math.max(0, (1 - shockWaveProgress) * 0.7);
            ctx.strokeStyle = `rgba(200, 200, 220, ${shockWaveAlpha})`;
            ctx.lineWidth = 5 - i * 0.5;
            ctx.shadowBlur = 25;
            ctx.beginPath();
            ctx.arc(steelWingEndX, steelWingEndY, shockWaveSize, 0, Math.PI * 2);
            ctx.stroke();
          }
        }
      }

      ctx.shadowBlur = 0;
      ctx.restore();
      break;

    case 'metal_claw':
      // メタルクローのエフェクト - 金属の爪が切り裂く
      ctx.save();
      const metalClawProgress = effect.progress !== undefined ? effect.progress : 0;
      const metalClawStartX = effect.startX !== undefined ? effect.startX : targetX - 200;
      const metalClawStartY = effect.startY !== undefined ? effect.startY : targetY + 50;
      const metalClawEndX = effect.targetX !== undefined ? effect.targetX : targetX;
      const metalClawEndY = effect.targetY !== undefined ? effect.targetY : targetY;

      // 爪の軌道
      const metalClawCurrentX = metalClawStartX + (metalClawEndX - metalClawStartX) * metalClawProgress;
      const metalClawCurrentY = metalClawStartY + (metalClawEndY - metalClawStartY) * metalClawProgress;

      // 3本の爪を描画
      for (let clawIndex = 0; clawIndex < 3; clawIndex++) {
        const clawOffset = (clawIndex - 1) * 20;
        const clawAngle = Math.atan2(metalClawEndY - metalClawStartY, metalClawEndX - metalClawStartX);
        const clawX = metalClawCurrentX + Math.cos(clawAngle + Math.PI / 2) * clawOffset;
        const clawY = metalClawCurrentY + Math.sin(clawAngle + Math.PI / 2) * clawOffset;

        ctx.save();
        ctx.translate(clawX, clawY);
        ctx.rotate(clawAngle);

        // 爪の本体（金属的なグラデーション）
        const clawGradient = ctx.createLinearGradient(0, 0, 0, -40);
        clawGradient.addColorStop(0, 'rgba(200, 200, 220, 1)');
        clawGradient.addColorStop(0.3, 'rgba(150, 150, 180, 0.95)');
        clawGradient.addColorStop(0.6, 'rgba(100, 100, 140, 0.9)');
        clawGradient.addColorStop(1, 'rgba(80, 80, 120, 0.8)');

        ctx.fillStyle = clawGradient;
        ctx.shadowBlur = 25;
        ctx.shadowColor = 'rgba(150, 150, 180, 0.9)';

        // 爪の形状（鋭い三角形）
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-8, -35);
        ctx.lineTo(0, -40);
        ctx.lineTo(8, -35);
        ctx.closePath();
        ctx.fill();

        // 爪のハイライト
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-4, -30);
        ctx.lineTo(0, -35);
        ctx.lineTo(4, -30);
        ctx.closePath();
        ctx.fill();

        // 爪のエッジ（鋭い線）
        ctx.strokeStyle = 'rgba(100, 100, 140, 1)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-8, -35);
        ctx.lineTo(0, -40);
        ctx.lineTo(8, -35);
        ctx.stroke();

        ctx.restore();
      }

      // 爪の軌跡（残像）
      for (let i = 1; i <= 4; i++) {
        const trailProgress = metalClawProgress - (i * 0.12);
        if (trailProgress > 0) {
          const trailX = metalClawStartX + (metalClawEndX - metalClawStartX) * trailProgress;
          const trailY = metalClawStartY + (metalClawEndY - metalClawStartY) * trailProgress;
          const trailAlpha = Math.max(0, 0.4 - (i * 0.1));

          for (let clawIndex = 0; clawIndex < 3; clawIndex++) {
            const clawOffset = (clawIndex - 1) * 20;
            const clawAngle = Math.atan2(metalClawEndY - metalClawStartY, metalClawEndX - metalClawStartX);
            const clawX = trailX + Math.cos(clawAngle + Math.PI / 2) * clawOffset;
            const clawY = trailY + Math.sin(clawAngle + Math.PI / 2) * clawOffset;

            ctx.save();
            ctx.translate(clawX, clawY);
            ctx.rotate(clawAngle);
            ctx.globalAlpha = trailAlpha;

            ctx.fillStyle = 'rgba(150, 150, 180, 0.5)';
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(-6, -28);
            ctx.lineTo(0, -32);
            ctx.lineTo(6, -28);
            ctx.closePath();
            ctx.fill();

            ctx.restore();
          }
        }
      }

      // 当たった時の切り裂きエフェクト
      if (metalClawProgress >= 0.9) {
        const slashProgress = (metalClawProgress - 0.9) / 0.1;

        // 切り裂きの線（X字）
        for (let i = 0; i < 2; i++) {
          const slashAngle = (i * Math.PI / 2) + Math.atan2(metalClawEndY - metalClawStartY, metalClawEndX - metalClawStartX);
          const slashLength = 80 + slashProgress * 40;
          const slashX1 = metalClawEndX - Math.cos(slashAngle) * slashLength;
          const slashY1 = metalClawEndY - Math.sin(slashAngle) * slashLength;
          const slashX2 = metalClawEndX + Math.cos(slashAngle) * slashLength;
          const slashY2 = metalClawEndY + Math.sin(slashAngle) * slashLength;

          const slashGradient = ctx.createLinearGradient(slashX1, slashY1, slashX2, slashY2);
          slashGradient.addColorStop(0, 'rgba(200, 200, 220, 0)');
          slashGradient.addColorStop(0.5, `rgba(255, 255, 255, ${0.9 * (1 - slashProgress)})`);
          slashGradient.addColorStop(1, 'rgba(200, 200, 220, 0)');

          ctx.strokeStyle = slashGradient;
          ctx.lineWidth = 6;
          ctx.shadowBlur = 30;
          ctx.shadowColor = 'rgba(200, 200, 220, 0.9)';
          ctx.beginPath();
          ctx.moveTo(slashX1, slashY1);
          ctx.lineTo(slashX2, slashY2);
          ctx.stroke();
        }

        // 金属の火花が飛び散る
        for (let i = 0; i < 20; i++) {
          const angle = (i / 20) * Math.PI * 2 + time / 50;
          const radius = 60 + Math.sin(time / 30 + i) * 30;
          const px = metalClawEndX + Math.cos(angle) * radius;
          const py = metalClawEndY + Math.sin(angle) * radius;

          const particleAlpha = Math.max(0, 0.8 - slashProgress);
          ctx.fillStyle = `rgba(255, 255, 255, ${particleAlpha})`;
          ctx.shadowBlur = 15;
          ctx.beginPath();
          ctx.arc(px, py, 4 + Math.sin(time / 40 + i) * 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.shadowBlur = 0;
      ctx.restore();
      break;

    case 'bullet_punch':
      // バレットパンチのエフェクト - 高速の連続パンチ
      ctx.save();
      const bulletPunchProgress = effect.progress !== undefined ? effect.progress : 0;
      const bulletPunchStartX = effect.startX !== undefined ? effect.startX : targetX - 200;
      const bulletPunchStartY = effect.startY !== undefined ? effect.startY : targetY + 50;
      const bulletPunchEndX = effect.targetX !== undefined ? effect.targetX : targetX;
      const bulletPunchEndY = effect.targetY !== undefined ? effect.targetY : targetY;

      // 連続パンチ（高速で複数回）
      const bulletPunchCount = 8;
      for (let punchIndex = 0; punchIndex < bulletPunchCount; punchIndex++) {
        const punchDelay = punchIndex * 0.1;
        const punchProgress = Math.max(0, Math.min(1, (bulletPunchProgress - punchDelay) / 0.3));

        if (punchProgress > 0) {
          const punchCurrentX = bulletPunchStartX + (bulletPunchEndX - bulletPunchStartX) * punchProgress;
          const punchCurrentY = bulletPunchStartY + (bulletPunchEndY - bulletPunchStartY) * punchProgress;
          const punchOffset = (Math.sin(punchIndex) * 15) * (1 - punchProgress);

          // パンチの描画（金属の拳）
          const punchSize = 30 - punchIndex * 2;
          const punchGradient = ctx.createRadialGradient(punchCurrentX + punchOffset, punchCurrentY, 0, punchCurrentX + punchOffset, punchCurrentY, punchSize);
          punchGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
          punchGradient.addColorStop(0.2, 'rgba(200, 200, 220, 0.95)');
          punchGradient.addColorStop(0.4, 'rgba(150, 150, 180, 0.9)');
          punchGradient.addColorStop(0.6, 'rgba(100, 100, 140, 0.85)');
          punchGradient.addColorStop(1, 'rgba(80, 80, 120, 0)');

          ctx.fillStyle = punchGradient;
          ctx.shadowBlur = 35;
          ctx.shadowColor = 'rgba(150, 150, 180, 0.9)';
          ctx.beginPath();
          ctx.arc(punchCurrentX + punchOffset, punchCurrentY, punchSize, 0, Math.PI * 2);
          ctx.fill();

          // パンチの周りの衝撃波
          if (punchProgress > 0.5) {
            const shockWaveSize = (punchProgress - 0.5) * 2 * 60;
            const shockWaveAlpha = Math.max(0, (1 - punchProgress) * 0.6);
            ctx.strokeStyle = `rgba(200, 200, 220, ${shockWaveAlpha})`;
            ctx.lineWidth = 3;
            ctx.shadowBlur = 20;
            ctx.beginPath();
            ctx.arc(punchCurrentX + punchOffset, punchCurrentY, punchSize + shockWaveSize, 0, Math.PI * 2);
            ctx.stroke();
          }
        }
      }

      // 当たった時の爆発エフェクト
      if (bulletPunchProgress >= 0.9) {
        const explosionProgress = (bulletPunchProgress - 0.9) / 0.1;
        const explosionSize = explosionProgress * 100;

        const explosionGradient = ctx.createRadialGradient(bulletPunchEndX, bulletPunchEndY, 0, bulletPunchEndX, bulletPunchEndY, explosionSize);
        explosionGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        explosionGradient.addColorStop(0.2, 'rgba(200, 200, 220, 0.9)');
        explosionGradient.addColorStop(0.4, 'rgba(150, 150, 180, 0.8)');
        explosionGradient.addColorStop(0.6, 'rgba(100, 100, 140, 0.6)');
        explosionGradient.addColorStop(1, 'rgba(50, 50, 80, 0)');

        ctx.fillStyle = explosionGradient;
        ctx.shadowBlur = 50;
        ctx.shadowColor = 'rgba(150, 150, 180, 0.9)';
        ctx.beginPath();
        ctx.arc(bulletPunchEndX, bulletPunchEndY, explosionSize, 0, Math.PI * 2);
        ctx.fill();

        // 金属の火花
        for (let i = 0; i < 30; i++) {
          const angle = (i / 30) * Math.PI * 2 + time / 40;
          const radius = explosionSize * 0.8 + Math.sin(time / 25 + i) * 35;
          const px = bulletPunchEndX + Math.cos(angle) * radius;
          const py = bulletPunchEndY + Math.sin(angle) * radius;

          const particleAlpha = Math.max(0, 0.9 - explosionProgress);
          ctx.fillStyle = `rgba(255, 255, 255, ${particleAlpha})`;
          ctx.shadowBlur = 18;
          ctx.beginPath();
          ctx.arc(px, py, 5 + Math.sin(time / 35 + i) * 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.shadowBlur = 0;
      ctx.restore();
      break;

    case 'iron_head':
      // アイアンヘッドのエフェクト - 強力な頭突き
      ctx.save();
      const ironHeadProgress = effect.progress !== undefined ? effect.progress : 0;
      const ironHeadStartX = effect.startX !== undefined ? effect.startX : targetX - 200;
      const ironHeadStartY = effect.startY !== undefined ? effect.startY : targetY + 50;
      const ironHeadEndX = effect.targetX !== undefined ? effect.targetX : targetX;
      const ironHeadEndY = effect.targetY !== undefined ? effect.targetY : targetY;

      // 頭突きの軌道
      const ironHeadCurrentX = ironHeadStartX + (ironHeadEndX - ironHeadStartX) * ironHeadProgress;
      const ironHeadCurrentY = ironHeadStartY + (ironHeadEndY - ironHeadStartY) * ironHeadProgress;

      // 頭突きの描画（金属の頭）
      if (ironHeadProgress < 0.9) {
        const headSize = 50 + Math.sin(time / 50) * 5;
        const headGradient = ctx.createRadialGradient(ironHeadCurrentX, ironHeadCurrentY, 0, ironHeadCurrentX, ironHeadCurrentY, headSize);
        headGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        headGradient.addColorStop(0.2, 'rgba(200, 200, 220, 0.95)');
        headGradient.addColorStop(0.4, 'rgba(150, 150, 180, 0.9)');
        headGradient.addColorStop(0.6, 'rgba(100, 100, 140, 0.85)');
        headGradient.addColorStop(1, 'rgba(80, 80, 120, 0)');

        ctx.fillStyle = headGradient;
        ctx.shadowBlur = 45;
        ctx.shadowColor = 'rgba(150, 150, 180, 0.9)';
        ctx.beginPath();
        ctx.arc(ironHeadCurrentX, ironHeadCurrentY, headSize, 0, Math.PI * 2);
        ctx.fill();

        // 頭の周りの金属のリング
        for (let i = 0; i < 4; i++) {
          const ringSize = headSize + 10 + i * 12;
          const ringAlpha = 0.8 - i * 0.2;
          ctx.strokeStyle = `rgba(200, 200, 220, ${ringAlpha})`;
          ctx.lineWidth = 4 - i * 0.5;
          ctx.shadowBlur = 25;
          ctx.beginPath();
          ctx.arc(ironHeadCurrentX, ironHeadCurrentY, ringSize, 0, Math.PI * 2);
          ctx.stroke();
        }

        // 頭の周りのエネルギー粒子
        for (let i = 0; i < 12; i++) {
          const particleAngle = (i / 12) * Math.PI * 2 + time / 50;
          const particleRadius = headSize + 15 + Math.sin(time / 40 + i) * 20;
          const particleX = ironHeadCurrentX + Math.cos(particleAngle) * particleRadius;
          const particleY = ironHeadCurrentY + Math.sin(particleAngle) * particleRadius;

          const particleAlpha = 0.8 + Math.sin(time / 30 + i) * 0.2;
          ctx.fillStyle = `rgba(200, 200, 220, ${particleAlpha})`;
          ctx.shadowBlur = 20;
          ctx.beginPath();
          ctx.arc(particleX, particleY, 6 + Math.sin(time / 50 + i) * 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 頭突きの軌跡（残像）
      for (let i = 1; i <= 5; i++) {
        const trailProgress = ironHeadProgress - (i * 0.1);
        if (trailProgress > 0) {
          const trailX = ironHeadStartX + (ironHeadEndX - ironHeadStartX) * trailProgress;
          const trailY = ironHeadStartY + (ironHeadEndY - ironHeadStartY) * trailProgress;
          const trailAlpha = Math.max(0, 0.6 - (i * 0.12));
          const trailSize = 50 - i * 3;
          ctx.fillStyle = `rgba(200, 200, 220, ${trailAlpha})`;
          ctx.shadowBlur = 30 * trailAlpha;
          ctx.beginPath();
          ctx.arc(trailX, trailY, trailSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 当たった時の強力な爆発エフェクト
      if (ironHeadProgress >= 0.9) {
        const explosionProgress = (ironHeadProgress - 0.9) / 0.1;
        const explosionSize = explosionProgress * 150;

        // 中央の爆発
        const explosionGradient = ctx.createRadialGradient(ironHeadEndX, ironHeadEndY, 0, ironHeadEndX, ironHeadEndY, explosionSize);
        explosionGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        explosionGradient.addColorStop(0.15, 'rgba(200, 200, 220, 0.95)');
        explosionGradient.addColorStop(0.3, 'rgba(150, 150, 180, 0.9)');
        explosionGradient.addColorStop(0.5, 'rgba(100, 100, 140, 0.8)');
        explosionGradient.addColorStop(0.7, 'rgba(80, 80, 120, 0.6)');
        explosionGradient.addColorStop(1, 'rgba(50, 50, 80, 0)');

        ctx.fillStyle = explosionGradient;
        ctx.shadowBlur = 70;
        ctx.shadowColor = 'rgba(150, 150, 180, 0.9)';
        ctx.beginPath();
        ctx.arc(ironHeadEndX, ironHeadEndY, explosionSize, 0, Math.PI * 2);
        ctx.fill();

        // 広がる衝撃波（複数）
        for (let i = 0; i < 6; i++) {
          const shockWaveProgress = explosionProgress - (i * 0.12);
          if (shockWaveProgress > 0) {
            const shockWaveSize = explosionSize * 0.4 + i * 25;
            const shockWaveAlpha = Math.max(0, (1 - shockWaveProgress) * 0.8);
            ctx.strokeStyle = `rgba(200, 200, 220, ${shockWaveAlpha})`;
            ctx.lineWidth = 6 - i * 0.5;
            ctx.shadowBlur = 30;
            ctx.beginPath();
            ctx.arc(ironHeadEndX, ironHeadEndY, shockWaveSize, 0, Math.PI * 2);
            ctx.stroke();
          }
        }

        // 金属の破片が飛び散る
        for (let i = 0; i < 35; i++) {
          const angle = (i / 35) * Math.PI * 2 + time / 35;
          const radius = explosionSize * 0.9 + Math.sin(time / 20 + i) * 45;
          const px = ironHeadEndX + Math.cos(angle) * radius;
          const py = ironHeadEndY + Math.sin(angle) * radius;

          const particleAlpha = Math.max(0, 0.95 - explosionProgress);
          ctx.fillStyle = `rgba(255, 255, 255, ${particleAlpha})`;
          ctx.shadowBlur = 22;
          ctx.beginPath();
          // 破片の形状
          ctx.save();
          ctx.translate(px, py);
          ctx.rotate(angle);
          ctx.fillRect(-6, -2, 12, 4);
          ctx.restore();
        }
      }

      ctx.shadowBlur = 0;
      ctx.restore();
      break;

    case 'salt_water':
      // しおみず - 塩水のエフェクト
      ctx.save();
      const saltWaterProgress = effect.progress || 0;
      const saltWaterStartX = effect.startX || targetX - 200;
      const saltWaterStartY = effect.startY || targetY;
      const saltWaterEndX = targetX;
      const saltWaterEndY = targetY;
      const saltWaterCurrentX = saltWaterStartX + (saltWaterEndX - saltWaterStartX) * saltWaterProgress;
      const saltWaterCurrentY = saltWaterStartY + (saltWaterEndY - saltWaterStartY) * saltWaterProgress;

      // 塩水の流れ
      const saltWaterGradient = ctx.createLinearGradient(saltWaterStartX, saltWaterStartY, saltWaterCurrentX, saltWaterCurrentY);
      saltWaterGradient.addColorStop(0, 'rgba(200, 220, 255, 0.9)');
      saltWaterGradient.addColorStop(0.5, 'rgba(150, 200, 255, 0.8)');
      saltWaterGradient.addColorStop(1, 'rgba(100, 180, 255, 0.7)');

      ctx.strokeStyle = saltWaterGradient;
      ctx.lineWidth = 25 + Math.sin(time / 40) * 5;
      ctx.lineCap = 'round';
      ctx.shadowBlur = 20;
      ctx.shadowColor = 'rgba(100, 180, 255, 0.8)';

      ctx.beginPath();
      ctx.moveTo(saltWaterStartX, saltWaterStartY);
      ctx.lineTo(saltWaterCurrentX, saltWaterCurrentY);
      ctx.stroke();

      // 塩の結晶が飛び散る
      for (let i = 0; i < 20; i++) {
        const angle = (i / 20) * Math.PI * 2 + time / 100;
        const radius = saltWaterProgress * 80 + Math.sin(time / 50 + i) * 20;
        const px = saltWaterCurrentX + Math.cos(angle) * radius;
        const py = saltWaterCurrentY + Math.sin(angle) * radius;

        ctx.fillStyle = `rgba(255, 255, 255, ${0.9 - saltWaterProgress * 0.5})`;
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(px, py, 4 + Math.sin(time / 30 + i) * 2, 0, Math.PI * 2);
        ctx.fill();
      }

      // 当たった時の水しぶき
      if (saltWaterProgress >= 0.95) {
        const splashProgress = (saltWaterProgress - 0.95) / 0.05;
        for (let i = 0; i < 30; i++) {
          const angle = (i / 30) * Math.PI * 2;
          const radius = splashProgress * 100;
          const px = saltWaterEndX + Math.cos(angle) * radius;
          const py = saltWaterEndY + Math.sin(angle) * radius;

          ctx.fillStyle = `rgba(150, 200, 255, ${1 - splashProgress})`;
          ctx.beginPath();
          ctx.arc(px, py, 8 + Math.sin(time / 20 + i) * 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.shadowBlur = 0;
      ctx.restore();
      break;

    case 'surf':
      // なみのり - 巨大な波のエフェクト
      ctx.save();
      const surfProgress = effect.progress || 0;
      const surfStartX = effect.startX || targetX - 300;
      const surfStartY = effect.startY || targetY;
      const surfEndX = targetX;
      const surfEndY = targetY;
      const surfCurrentX = surfStartX + (surfEndX - surfStartX) * surfProgress;

      // 巨大な波
      const waveHeight = 80 + Math.sin(time / 30) * 20;
      const waveGradient = ctx.createLinearGradient(surfCurrentX - 150, surfStartY - waveHeight, surfCurrentX - 150, surfStartY + waveHeight);
      waveGradient.addColorStop(0, 'rgba(100, 180, 255, 0.9)');
      waveGradient.addColorStop(0.5, 'rgba(60, 150, 255, 0.8)');
      waveGradient.addColorStop(1, 'rgba(30, 120, 255, 0.7)');

      ctx.fillStyle = waveGradient;
      ctx.shadowBlur = 30;
      ctx.shadowColor = 'rgba(60, 150, 255, 0.8)';

      ctx.beginPath();
      ctx.moveTo(surfCurrentX - 150, surfStartY + waveHeight);
      for (let x = surfCurrentX - 150; x <= surfCurrentX + 150; x += 10) {
        const y = surfStartY - waveHeight + Math.sin((x - surfCurrentX) / 30 + time / 20) * 30;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(surfCurrentX + 150, surfStartY + waveHeight);
      ctx.closePath();
      ctx.fill();

      // 波の先端の白い泡
      for (let i = 0; i < 25; i++) {
        const x = surfCurrentX - 100 + i * 8;
        const y = surfStartY - waveHeight + Math.sin((x - surfCurrentX) / 30 + time / 20) * 30;
        ctx.fillStyle = `rgba(255, 255, 255, ${0.8 + Math.sin(time / 15 + i) * 0.2})`;
        ctx.beginPath();
        ctx.arc(x, y, 5 + Math.sin(time / 20 + i) * 2, 0, Math.PI * 2);
        ctx.fill();
      }

      // 当たった時の大波
      if (surfProgress >= 0.9) {
        const impactProgress = (surfProgress - 0.9) / 0.1;
        const impactSize = impactProgress * 150;
        const impactGradient = ctx.createRadialGradient(surfEndX, surfEndY, 0, surfEndX, surfEndY, impactSize);
        impactGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        impactGradient.addColorStop(0.3, 'rgba(150, 200, 255, 0.8)');
        impactGradient.addColorStop(1, 'rgba(60, 150, 255, 0)');

        ctx.fillStyle = impactGradient;
        ctx.beginPath();
        ctx.arc(surfEndX, surfEndY, impactSize, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.shadowBlur = 0;
      ctx.restore();
      break;

    case 'hydro_pump':
      // ハイドロポンプ - 強力な水のポンプ
      ctx.save();
      const hydroPumpProgress = effect.progress || 0;
      const hydroPumpStartX = effect.startX || targetX - 200;
      const hydroPumpStartY = effect.startY || targetY;
      const hydroPumpEndX = targetX;
      const hydroPumpEndY = targetY;
      const hydroPumpCurrentX = hydroPumpStartX + (hydroPumpEndX - hydroPumpStartX) * hydroPumpProgress;
      const hydroPumpCurrentY = hydroPumpStartY + (hydroPumpEndY - hydroPumpStartY) * hydroPumpProgress;

      // 強力な水のビーム
      const hydroPumpWidth = 35 + Math.sin(time / 25) * 8;
      const hydroPumpGradient = ctx.createLinearGradient(hydroPumpStartX, hydroPumpStartY, hydroPumpCurrentX, hydroPumpCurrentY);
      hydroPumpGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      hydroPumpGradient.addColorStop(0.2, 'rgba(150, 220, 255, 0.95)');
      hydroPumpGradient.addColorStop(0.5, 'rgba(60, 180, 255, 0.9)');
      hydroPumpGradient.addColorStop(1, 'rgba(30, 150, 255, 0.85)');

      ctx.strokeStyle = hydroPumpGradient;
      ctx.lineWidth = hydroPumpWidth;
      ctx.lineCap = 'round';
      ctx.shadowBlur = 25;
      ctx.shadowColor = 'rgba(60, 180, 255, 0.9)';

      ctx.beginPath();
      ctx.moveTo(hydroPumpStartX, hydroPumpStartY);
      ctx.lineTo(hydroPumpCurrentX, hydroPumpCurrentY);
      ctx.stroke();

      // 内側の光るコア
      ctx.strokeStyle = 'rgba(255, 255, 255, 1)';
      ctx.lineWidth = hydroPumpWidth * 0.4;
      ctx.beginPath();
      ctx.moveTo(hydroPumpStartX, hydroPumpStartY);
      ctx.lineTo(hydroPumpCurrentX, hydroPumpCurrentY);
      ctx.stroke();

      // 水の粒子
      for (let i = 0; i < 30; i++) {
        const angle = (i / 30) * Math.PI * 2 + time / 80;
        const radius = hydroPumpWidth / 2 + 20 + Math.sin(time / 40 + i) * 15;
        const px = hydroPumpCurrentX + Math.cos(angle) * radius;
        const py = hydroPumpCurrentY + Math.sin(angle) * radius;

        ctx.fillStyle = `rgba(150, 220, 255, ${0.8 - hydroPumpProgress * 0.3})`;
        ctx.beginPath();
        ctx.arc(px, py, 3 + Math.sin(time / 25 + i) * 2, 0, Math.PI * 2);
        ctx.fill();
      }

      // 当たった時の爆発
      if (hydroPumpProgress >= 0.95) {
        const explosionProgress = (hydroPumpProgress - 0.95) / 0.05;
        const explosionSize = explosionProgress * 120;

        const explosionGradient = ctx.createRadialGradient(hydroPumpEndX, hydroPumpEndY, 0, hydroPumpEndX, hydroPumpEndY, explosionSize);
        explosionGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        explosionGradient.addColorStop(0.2, 'rgba(150, 220, 255, 0.9)');
        explosionGradient.addColorStop(0.5, 'rgba(60, 180, 255, 0.7)');
        explosionGradient.addColorStop(1, 'rgba(30, 150, 255, 0)');

        ctx.fillStyle = explosionGradient;
        ctx.beginPath();
        ctx.arc(hydroPumpEndX, hydroPumpEndY, explosionSize, 0, Math.PI * 2);
        ctx.fill();

        // 水しぶき
        for (let i = 0; i < 40; i++) {
          const angle = (i / 40) * Math.PI * 2;
          const radius = explosionSize * 0.8 + Math.sin(time / 15 + i) * 20;
          const px = hydroPumpEndX + Math.cos(angle) * radius;
          const py = hydroPumpEndY + Math.sin(angle) * radius;

          ctx.fillStyle = `rgba(150, 220, 255, ${1 - explosionProgress})`;
          ctx.beginPath();
          ctx.arc(px, py, 6 + Math.sin(time / 10 + i) * 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.shadowBlur = 0;
      ctx.restore();
      break;

    case 'cold_flare':
      // コールドフレア - 氷のエフェクト
      ctx.save();
      const coldFlareProgress = effect.progress || 0;
      const coldFlareStartX = effect.startX || targetX - 200;
      const coldFlareStartY = effect.startY || targetY;
      const coldFlareEndX = targetX;
      const coldFlareEndY = targetY;
      const coldFlareCurrentX = coldFlareStartX + (coldFlareEndX - coldFlareStartX) * coldFlareProgress;
      const coldFlareCurrentY = coldFlareStartY + (coldFlareEndY - coldFlareStartY) * coldFlareProgress;

      // 氷のビーム
      const coldFlareWidth = 30 + Math.sin(time / 30) * 6;
      const coldFlareGradient = ctx.createLinearGradient(coldFlareStartX, coldFlareStartY, coldFlareCurrentX, coldFlareCurrentY);
      coldFlareGradient.addColorStop(0, 'rgba(200, 240, 255, 1)');
      coldFlareGradient.addColorStop(0.3, 'rgba(150, 220, 255, 0.95)');
      coldFlareGradient.addColorStop(0.7, 'rgba(100, 200, 255, 0.9)');
      coldFlareGradient.addColorStop(1, 'rgba(50, 180, 255, 0.85)');

      ctx.strokeStyle = coldFlareGradient;
      ctx.lineWidth = coldFlareWidth;
      ctx.lineCap = 'round';
      ctx.shadowBlur = 30;
      ctx.shadowColor = 'rgba(150, 220, 255, 0.9)';

      ctx.beginPath();
      ctx.moveTo(coldFlareStartX, coldFlareStartY);
      ctx.lineTo(coldFlareCurrentX, coldFlareCurrentY);
      ctx.stroke();

      // 氷の結晶が飛び散る
      for (let i = 0; i < 25; i++) {
        const angle = (i / 25) * Math.PI * 2 + time / 60;
        const radius = coldFlareProgress * 100 + Math.sin(time / 35 + i) * 25;
        const px = coldFlareCurrentX + Math.cos(angle) * radius;
        const py = coldFlareCurrentY + Math.sin(angle) * radius;

        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(angle + time / 50);
        ctx.fillStyle = `rgba(200, 240, 255, ${0.9 - coldFlareProgress * 0.4})`;
        ctx.shadowBlur = 15;
        ctx.beginPath();
        // 六角形の氷の結晶
        for (let j = 0; j < 6; j++) {
          const a = (j / 6) * Math.PI * 2;
          const r = 5 + Math.sin(time / 20 + i) * 2;
          const x = Math.cos(a) * r;
          const y = Math.sin(a) * r;
          if (j === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      // 当たった時の氷結晶の爆発
      if (coldFlareProgress >= 0.95) {
        const iceExplosionProgress = (coldFlareProgress - 0.95) / 0.05;
        const iceExplosionSize = iceExplosionProgress * 100;

        const iceGradient = ctx.createRadialGradient(coldFlareEndX, coldFlareEndY, 0, coldFlareEndX, coldFlareEndY, iceExplosionSize);
        iceGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        iceGradient.addColorStop(0.3, 'rgba(200, 240, 255, 0.9)');
        iceGradient.addColorStop(0.6, 'rgba(150, 220, 255, 0.7)');
        iceGradient.addColorStop(1, 'rgba(100, 200, 255, 0)');

        ctx.fillStyle = iceGradient;
        ctx.beginPath();
        ctx.arc(coldFlareEndX, coldFlareEndY, iceExplosionSize, 0, Math.PI * 2);
        ctx.fill();

        // 大きな氷の結晶
        for (let i = 0; i < 12; i++) {
          const angle = (i / 12) * Math.PI * 2;
          const radius = iceExplosionSize * 0.7;
          const px = coldFlareEndX + Math.cos(angle) * radius;
          const py = coldFlareEndY + Math.sin(angle) * radius;

          ctx.save();
          ctx.translate(px, py);
          ctx.rotate(angle + time / 30);
          ctx.fillStyle = `rgba(200, 240, 255, ${1 - iceExplosionProgress})`;
          ctx.shadowBlur = 20;
          ctx.beginPath();
          for (let j = 0; j < 6; j++) {
            const a = (j / 6) * Math.PI * 2;
            const r = 12;
            const x = Math.cos(a) * r;
            const y = Math.sin(a) * r;
            if (j === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        }
      }

      ctx.shadowBlur = 0;
      ctx.restore();
      break;

    case 'earthquake':
      // じしん - 地震のエフェクト
      ctx.save();
      const earthquakeProgress = effect.progress || 0;
      const earthquakeX = effect.startX || targetX;
      const earthquakeY = effect.startY || targetY + 50;
      const earthquakeTargetX = targetX;
      const earthquakeTargetY = targetY;

      // 地面の揺れ
      const shakeIntensity = Math.sin(time / 10) * (earthquakeProgress * 15);
      ctx.strokeStyle = 'rgba(139, 69, 19, 0.8)';
      ctx.lineWidth = 8;
      ctx.shadowBlur = 20;
      ctx.shadowColor = 'rgba(139, 69, 19, 0.6)';

      // 地面の亀裂
      for (let i = 0; i < 5; i++) {
        const crackX = earthquakeTargetX - 100 + i * 50 + shakeIntensity;
        const crackY = earthquakeTargetY + 30 + Math.sin(time / 15 + i) * 5;
        const crackLength = 40 + earthquakeProgress * 60;

        ctx.beginPath();
        ctx.moveTo(crackX, crackY);
        for (let j = 0; j < 10; j++) {
          const offsetX = (j / 10) * crackLength + Math.sin(time / 20 + i + j) * 5;
          const offsetY = j * 3 + Math.sin(time / 25 + i + j) * 8;
          ctx.lineTo(crackX + offsetX, crackY + offsetY);
        }
        ctx.stroke();
      }

      // 地面から飛び散る岩
      for (let i = 0; i < 20; i++) {
        const angle = (i / 20) * Math.PI * 2;
        const radius = earthquakeProgress * 120 + Math.sin(time / 20 + i) * 30;
        const px = earthquakeTargetX + Math.cos(angle) * radius + shakeIntensity;
        const py = earthquakeTargetY + 20 + Math.sin(angle) * radius * 0.5;

        ctx.fillStyle = `rgba(101, 67, 33, ${0.9 - earthquakeProgress * 0.3})`;
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(px, py, 6 + Math.sin(time / 15 + i) * 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // 衝撃波
      if (earthquakeProgress >= 0.5) {
        const shockWaveProgress = (earthquakeProgress - 0.5) / 0.5;
        for (let i = 0; i < 4; i++) {
          const waveProgress = shockWaveProgress - (i * 0.2);
          if (waveProgress > 0) {
            const waveSize = 50 + waveProgress * 150 + i * 30;
            const waveAlpha = Math.max(0, (1 - waveProgress) * 0.6);
            ctx.strokeStyle = `rgba(139, 69, 19, ${waveAlpha})`;
            ctx.lineWidth = 6 - i;
            ctx.beginPath();
            ctx.arc(earthquakeTargetX, earthquakeTargetY + 30, waveSize, 0, Math.PI * 2);
            ctx.stroke();
          }
        }
      }

      ctx.shadowBlur = 0;
      ctx.restore();
      break;

    case 'earth_power':
      // だいちのちから - 大地の力のエフェクト
      ctx.save();
      const earthPowerProgress = effect.progress || 0;
      const earthPowerX = effect.startX || targetX;
      const earthPowerY = effect.startY || targetY + 50;
      const earthPowerTargetX = targetX;
      const earthPowerTargetY = targetY;

      // 地面から噴き出すエネルギー
      const energyHeight = earthPowerProgress * 150;
      const energyGradient = ctx.createLinearGradient(earthPowerTargetX, earthPowerTargetY + 50, earthPowerTargetX, earthPowerTargetY - energyHeight);
      energyGradient.addColorStop(0, 'rgba(139, 69, 19, 0.9)');
      energyGradient.addColorStop(0.3, 'rgba(160, 82, 45, 0.8)');
      energyGradient.addColorStop(0.6, 'rgba(205, 133, 63, 0.7)');
      energyGradient.addColorStop(1, 'rgba(255, 200, 150, 0.6)');

      ctx.fillStyle = energyGradient;
      ctx.shadowBlur = 25;
      ctx.shadowColor = 'rgba(205, 133, 63, 0.8)';

      // エネルギー柱
      const energyWidth = 40 + Math.sin(time / 20) * 10;
      ctx.beginPath();
      ctx.ellipse(earthPowerTargetX, earthPowerTargetY - energyHeight / 2, energyWidth / 2, energyHeight / 2, 0, 0, Math.PI * 2);
      ctx.fill();

      // 内側の光るコア
      ctx.fillStyle = 'rgba(255, 220, 180, 0.9)';
      ctx.beginPath();
      ctx.ellipse(earthPowerTargetX, earthPowerTargetY - energyHeight / 2, energyWidth / 4, energyHeight / 2, 0, 0, Math.PI * 2);
      ctx.fill();

      // 周囲の岩の破片
      for (let i = 0; i < 30; i++) {
        const angle = (i / 30) * Math.PI * 2 + time / 50;
        const radius = energyWidth / 2 + 30 + Math.sin(time / 25 + i) * 20;
        const px = earthPowerTargetX + Math.cos(angle) * radius;
        const py = earthPowerTargetY - energyHeight / 2 + Math.sin(angle) * radius * 0.3;

        ctx.fillStyle = `rgba(101, 67, 33, ${0.8 - earthPowerProgress * 0.4})`;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(px, py, 5 + Math.sin(time / 20 + i) * 2, 0, Math.PI * 2);
        ctx.fill();
      }

      // 当たった時の爆発
      if (earthPowerProgress >= 0.95) {
        const explosionProgress = (earthPowerProgress - 0.95) / 0.05;
        const explosionSize = explosionProgress * 130;

        const explosionGradient = ctx.createRadialGradient(earthPowerTargetX, earthPowerTargetY, 0, earthPowerTargetX, earthPowerTargetY, explosionSize);
        explosionGradient.addColorStop(0, 'rgba(255, 220, 180, 1)');
        explosionGradient.addColorStop(0.3, 'rgba(205, 133, 63, 0.9)');
        explosionGradient.addColorStop(0.6, 'rgba(160, 82, 45, 0.7)');
        explosionGradient.addColorStop(1, 'rgba(139, 69, 19, 0)');

        ctx.fillStyle = explosionGradient;
        ctx.beginPath();
        ctx.arc(earthPowerTargetX, earthPowerTargetY, explosionSize, 0, Math.PI * 2);
        ctx.fill();

        // 広がる衝撃波
        for (let i = 0; i < 5; i++) {
          const waveProgress = explosionProgress - (i * 0.15);
          if (waveProgress > 0) {
            const waveSize = explosionSize * 0.5 + i * 25;
            const waveAlpha = Math.max(0, (1 - waveProgress) * 0.7);
            ctx.strokeStyle = `rgba(205, 133, 63, ${waveAlpha})`;
            ctx.lineWidth = 8 - i;
            ctx.beginPath();
            ctx.arc(earthPowerTargetX, earthPowerTargetY, waveSize, 0, Math.PI * 2);
            ctx.stroke();
          }
        }
      }

      ctx.shadowBlur = 0;
      ctx.restore();
      break;

    case 'solar_beam':
      // ソーラービーム - 太陽光線のエフェクト
      ctx.save();
      const solarBeamProgress = effect.progress || 0;
      const solarBeamStartX = effect.startX || targetX - 200;
      const solarBeamStartY = effect.startY || targetY;
      const solarBeamEndX = targetX;
      const solarBeamEndY = targetY;
      const solarBeamCurrentX = solarBeamStartX + (solarBeamEndX - solarBeamStartX) * solarBeamProgress;
      const solarBeamCurrentY = solarBeamStartY + (solarBeamEndY - solarBeamStartY) * solarBeamProgress;

      // 太陽光線のビーム
      const solarBeamWidth = 40 + Math.sin(time / 25) * 8;
      const solarBeamGradient = ctx.createLinearGradient(solarBeamStartX, solarBeamStartY, solarBeamCurrentX, solarBeamCurrentY);
      solarBeamGradient.addColorStop(0, 'rgba(255, 255, 200, 1)');
      solarBeamGradient.addColorStop(0.2, 'rgba(255, 255, 100, 0.95)');
      solarBeamGradient.addColorStop(0.5, 'rgba(255, 220, 0, 0.9)');
      solarBeamGradient.addColorStop(0.8, 'rgba(200, 255, 0, 0.85)');
      solarBeamGradient.addColorStop(1, 'rgba(150, 255, 0, 0.8)');

      ctx.strokeStyle = solarBeamGradient;
      ctx.lineWidth = solarBeamWidth;
      ctx.lineCap = 'round';
      ctx.shadowBlur = 35;
      ctx.shadowColor = 'rgba(255, 255, 100, 0.9)';

      ctx.beginPath();
      ctx.moveTo(solarBeamStartX, solarBeamStartY);
      ctx.lineTo(solarBeamCurrentX, solarBeamCurrentY);
      ctx.stroke();

      // 内側の強烈な光
      ctx.strokeStyle = 'rgba(255, 255, 255, 1)';
      ctx.lineWidth = solarBeamWidth * 0.3;
      ctx.beginPath();
      ctx.moveTo(solarBeamStartX, solarBeamStartY);
      ctx.lineTo(solarBeamCurrentX, solarBeamCurrentY);
      ctx.stroke();

      // 光の粒子
      for (let i = 0; i < 35; i++) {
        const angle = (i / 35) * Math.PI * 2 + time / 60;
        const radius = solarBeamWidth / 2 + 25 + Math.sin(time / 30 + i) * 20;
        const px = solarBeamCurrentX + Math.cos(angle) * radius;
        const py = solarBeamCurrentY + Math.sin(angle) * radius;

        ctx.fillStyle = `rgba(255, 255, 150, ${0.9 - solarBeamProgress * 0.3})`;
        ctx.shadowBlur = 20;
        ctx.beginPath();
        ctx.arc(px, py, 4 + Math.sin(time / 20 + i) * 2, 0, Math.PI * 2);
        ctx.fill();
      }

      // 当たった時の爆発
      if (solarBeamProgress >= 0.95) {
        const explosionProgress = (solarBeamProgress - 0.95) / 0.05;
        const explosionSize = explosionProgress * 140;

        const explosionGradient = ctx.createRadialGradient(solarBeamEndX, solarBeamEndY, 0, solarBeamEndX, solarBeamEndY, explosionSize);
        explosionGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        explosionGradient.addColorStop(0.2, 'rgba(255, 255, 150, 0.95)');
        explosionGradient.addColorStop(0.4, 'rgba(255, 220, 0, 0.9)');
        explosionGradient.addColorStop(0.6, 'rgba(200, 255, 0, 0.7)');
        explosionGradient.addColorStop(1, 'rgba(150, 255, 0, 0)');

        ctx.fillStyle = explosionGradient;
        ctx.beginPath();
        ctx.arc(solarBeamEndX, solarBeamEndY, explosionSize, 0, Math.PI * 2);
        ctx.fill();

        // 広がる光のリング
        for (let i = 0; i < 6; i++) {
          const ringProgress = explosionProgress - (i * 0.12);
          if (ringProgress > 0) {
            const ringSize = explosionSize * 0.4 + i * 30;
            const ringAlpha = Math.max(0, (1 - ringProgress) * 0.8);
            ctx.strokeStyle = `rgba(255, 255, 150, ${ringAlpha})`;
            ctx.lineWidth = 8 - i;
            ctx.beginPath();
            ctx.arc(solarBeamEndX, solarBeamEndY, ringSize, 0, Math.PI * 2);
            ctx.stroke();
          }
        }
      }

      ctx.shadowBlur = 0;
      ctx.restore();
      break;

    case 'magma_storm':
      // マグマストーム - マグマのエフェクト
      ctx.save();
      const magmaStormProgress = effect.progress || 0;
      const magmaStormStartX = effect.startX || targetX - 200;
      const magmaStormStartY = effect.startY || targetY;
      const magmaStormEndX = targetX;
      const magmaStormEndY = targetY;
      const magmaStormCurrentX = magmaStormStartX + (magmaStormEndX - magmaStormStartX) * magmaStormProgress;
      const magmaStormCurrentY = magmaStormStartY + (magmaStormEndY - magmaStormStartY) * magmaStormProgress;

      // マグマの流れ
      const magmaWidth = 45 + Math.sin(time / 20) * 10;
      const magmaGradient = ctx.createLinearGradient(magmaStormStartX, magmaStormStartY, magmaStormCurrentX, magmaStormCurrentY);
      magmaGradient.addColorStop(0, 'rgba(255, 100, 0, 1)');
      magmaGradient.addColorStop(0.2, 'rgba(255, 50, 0, 0.95)');
      magmaGradient.addColorStop(0.5, 'rgba(200, 0, 0, 0.9)');
      magmaGradient.addColorStop(0.8, 'rgba(150, 0, 0, 0.85)');
      magmaGradient.addColorStop(1, 'rgba(100, 0, 0, 0.8)');

      ctx.strokeStyle = magmaGradient;
      ctx.lineWidth = magmaWidth;
      ctx.lineCap = 'round';
      ctx.shadowBlur = 40;
      ctx.shadowColor = 'rgba(255, 100, 0, 0.9)';

      ctx.beginPath();
      ctx.moveTo(magmaStormStartX, magmaStormStartY);
      ctx.lineTo(magmaStormCurrentX, magmaStormCurrentY);
      ctx.stroke();

      // 内側の白熱したコア
      ctx.strokeStyle = 'rgba(255, 255, 200, 1)';
      ctx.lineWidth = magmaWidth * 0.35;
      ctx.beginPath();
      ctx.moveTo(magmaStormStartX, magmaStormStartY);
      ctx.lineTo(magmaStormCurrentX, magmaStormCurrentY);
      ctx.stroke();

      // マグマの粒子と火花
      for (let i = 0; i < 40; i++) {
        const angle = (i / 40) * Math.PI * 2 + time / 50;
        const radius = magmaWidth / 2 + 30 + Math.sin(time / 25 + i) * 25;
        const px = magmaStormCurrentX + Math.cos(angle) * radius;
        const py = magmaStormCurrentY + Math.sin(angle) * radius;

        const particleColor = i % 3 === 0 ? 'rgba(255, 255, 200, 0.9)' : 'rgba(255, 100, 0, 0.8)';
        ctx.fillStyle = particleColor;
        ctx.shadowBlur = 25;
        ctx.beginPath();
        ctx.arc(px, py, 5 + Math.sin(time / 15 + i) * 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // 当たった時のマグマ爆発
      if (magmaStormProgress >= 0.95) {
        const explosionProgress = (magmaStormProgress - 0.95) / 0.05;
        const explosionSize = explosionProgress * 150;

        const explosionGradient = ctx.createRadialGradient(magmaStormEndX, magmaStormEndY, 0, magmaStormEndX, magmaStormEndY, explosionSize);
        explosionGradient.addColorStop(0, 'rgba(255, 255, 200, 1)');
        explosionGradient.addColorStop(0.2, 'rgba(255, 150, 0, 0.95)');
        explosionGradient.addColorStop(0.4, 'rgba(255, 50, 0, 0.9)');
        explosionGradient.addColorStop(0.6, 'rgba(200, 0, 0, 0.8)');
        explosionGradient.addColorStop(1, 'rgba(100, 0, 0, 0)');

        ctx.fillStyle = explosionGradient;
        ctx.beginPath();
        ctx.arc(magmaStormEndX, magmaStormEndY, explosionSize, 0, Math.PI * 2);
        ctx.fill();

        // マグマの破片が飛び散る
        for (let i = 0; i < 50; i++) {
          const angle = (i / 50) * Math.PI * 2;
          const radius = explosionSize * 0.7 + Math.sin(time / 10 + i) * 30;
          const px = magmaStormEndX + Math.cos(angle) * radius;
          const py = magmaStormEndY + Math.sin(angle) * radius;

          const fragmentColor = i % 4 === 0 ? 'rgba(255, 255, 200, 0.9)' : 'rgba(255, 100, 0, 0.8)';
          ctx.fillStyle = fragmentColor;
          ctx.shadowBlur = 20;
          ctx.beginPath();
          ctx.arc(px, py, 7 + Math.sin(time / 12 + i) * 4, 0, Math.PI * 2);
          ctx.fill();
        }

        // 広がる衝撃波
        for (let i = 0; i < 6; i++) {
          const waveProgress = explosionProgress - (i * 0.1);
          if (waveProgress > 0) {
            const waveSize = explosionSize * 0.5 + i * 30;
            const waveAlpha = Math.max(0, (1 - waveProgress) * 0.7);
            ctx.strokeStyle = `rgba(255, 150, 0, ${waveAlpha})`;
            ctx.lineWidth = 10 - i;
            ctx.beginPath();
            ctx.arc(magmaStormEndX, magmaStormEndY, waveSize, 0, Math.PI * 2);
            ctx.stroke();
          }
        }
      }

      ctx.shadowBlur = 0;
      ctx.restore();
      break;

    default:
      break;
  }
};

