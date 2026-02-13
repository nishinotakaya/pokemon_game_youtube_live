// 草タイプエフェクト
window.EFFECT_HANDLERS = window.EFFECT_HANDLERS || {};

window.EFFECT_HANDLERS['solar_beam'] = function (ctx, effect, targetX, targetY, width, height, time) {
  ctx.save();
  const solarBeamProgress = effect.progress || 0;
  const solarBeamStartX = effect.startX || targetX - 200;
  const solarBeamStartY = effect.startY || targetY;
  const solarBeamEndX = targetX;
  const solarBeamEndY = targetY;
  const solarBeamCurrentX = solarBeamStartX + (solarBeamEndX - solarBeamStartX) * solarBeamProgress;
  const solarBeamCurrentY = solarBeamStartY + (solarBeamEndY - solarBeamStartY) * solarBeamProgress;

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

  ctx.strokeStyle = 'rgba(255, 255, 255, 1)';
  ctx.lineWidth = solarBeamWidth * 0.3;
  ctx.beginPath();
  ctx.moveTo(solarBeamStartX, solarBeamStartY);
  ctx.lineTo(solarBeamCurrentX, solarBeamCurrentY);
  ctx.stroke();

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
};
