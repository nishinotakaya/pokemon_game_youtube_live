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

    default:
      break;
  }
};

