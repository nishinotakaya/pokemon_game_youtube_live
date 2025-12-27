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

    default:
      break;
  }
};

