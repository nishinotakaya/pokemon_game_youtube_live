// エフェクト描画処理
const drawEffect = (ctx, effect, targetX, targetY, width, height) => {
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

    default:
      break;
  }
};

