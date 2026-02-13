// ゴーストタイプエフェクト
window.EFFECT_HANDLERS = window.EFFECT_HANDLERS || {};

window.EFFECT_HANDLERS['shadow_ball'] = function (ctx, effect, targetX, targetY, width, height, time) {
  ctx.save();
  const ballProgress = effect.progress !== undefined ? effect.progress : 0;
  const shadowStartX = effect.startX !== undefined ? effect.startX : targetX - 200;
  const shadowStartY = effect.startY !== undefined ? effect.startY : targetY;
  const shadowEndX = effect.targetX !== undefined ? effect.targetX : targetX;
  const shadowEndY = effect.targetY !== undefined ? effect.targetY : targetY;

  const currentX = shadowStartX + (shadowEndX - shadowStartX) * ballProgress;
  const currentY = shadowStartY + (shadowEndY - shadowStartY) * ballProgress;

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

  ctx.strokeStyle = 'rgba(150, 50, 200, 0.8)';
  ctx.lineWidth = 4;
  ctx.shadowBlur = 25;
  ctx.shadowColor = 'rgba(150, 50, 200, 1)';
  ctx.beginPath();
  ctx.arc(currentX, currentY, ballSize + 8, 0, Math.PI * 2);
  ctx.stroke();
  ctx.shadowBlur = 0;

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

  if (ballProgress >= 0.9) {
    const explosionProgress = (ballProgress - 0.9) / 0.1;
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
};

window.EFFECT_HANDLERS['ghost'] = function (ctx, effect, targetX, targetY, width, height, time) {
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
};

window.EFFECT_HANDLERS['dark_vortex'] = function (ctx, effect, targetX, targetY, width, height, time) {
  try {
    ctx.save();
    const vortexProgress = effect.progress !== undefined ? effect.progress : 0;
    const vortexStartX = (effect.startX != null ? effect.startX : targetX - 200);
    const vortexStartY = (effect.startY != null ? effect.startY : targetY);
    const vortexEndX = (effect.targetX != null ? effect.targetX : targetX);
    const vortexEndY = (effect.targetY != null ? effect.targetY : targetY);
    const vortexX = vortexStartX + (vortexEndX - vortexStartX) * vortexProgress;
    const vortexY = vortexStartY + (vortexEndY - vortexStartY) * vortexProgress;

    const vortexRadius = 50 + vortexProgress * 40 + Math.sin(time / 80) * 15;
    for (let ring = 0; ring < 5; ring++) {
      const r = vortexRadius * (0.3 + ring * 0.2) + Math.sin(time / 100 + ring) * 8;
      ctx.strokeStyle = `rgba(88, 28, 135, ${0.9 - ring * 0.15 - vortexProgress * 0.3})`;
      ctx.lineWidth = 12 - ring * 2;
      ctx.shadowBlur = 30;
      ctx.shadowColor = 'rgba(139, 92, 246, 0.9)';
      ctx.beginPath();
      for (let i = 0; i <= 24; i++) {
        const angle = (i / 24) * Math.PI * 2 + time / 50 + vortexProgress * 4 + ring * 0.5;
        const x = vortexX + Math.cos(angle) * r;
        const y = vortexY + Math.sin(angle) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
    }
    ctx.fillStyle = 'rgba(59, 7, 100, 0.6)';
    ctx.beginPath();
    ctx.arc(vortexX, vortexY, vortexRadius * 0.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.restore();
  } catch (e) { try { ctx.restore(); } catch (_) {} }
};

window.EFFECT_HANDLERS['phantom_burst'] = function (ctx, effect, targetX, targetY, width, height, time) {
  try {
    ctx.save();
    const burstProgress = effect.progress !== undefined ? effect.progress : 0;
    const burstTargetX = (effect.targetX != null ? effect.targetX : targetX);
    const burstTargetY = (effect.targetY != null ? effect.targetY : targetY);

    for (let i = 0; i < 8; i++) {
      const phase = (burstProgress * 1.5 - i * 0.12) % 1;
      if (phase < 0) continue;
      const size = (1 - phase) * 80 + Math.sin(time / 60 + i) * 10;
      const alpha = 1 - phase;
      const offX = (Math.sin(time / 90 + i * 1.2) * 0.5 + 0.5) * 40 - 20;
      const offY = (Math.cos(time / 70 + i * 0.8) * 0.5 + 0.5) * 40 - 20;
      ctx.fillStyle = `rgba(167, 139, 250, ${alpha * 0.8})`;
      ctx.shadowBlur = 40;
      ctx.shadowColor = 'rgba(196, 181, 253, 0.9)';
      ctx.beginPath();
      ctx.arc(burstTargetX + offX, burstTargetY + offY, size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.shadowBlur = 0;
    ctx.restore();
  } catch (e) { try { ctx.restore(); } catch (_) {} }
};

window.EFFECT_HANDLERS['shadow_tail'] = function (ctx, effect, targetX, targetY, width, height, time) {
  try {
    ctx.save();
    const tailProgress = effect.progress !== undefined ? effect.progress : 0;
    const tailStartX = (effect.startX != null ? effect.startX : targetX - 200);
    const tailStartY = (effect.startY != null ? effect.startY : targetY);
    const tailEndX = (effect.targetX != null ? effect.targetX : targetX);
    const tailEndY = (effect.targetY != null ? effect.targetY : targetY);

    const tailX = tailStartX + (tailEndX - tailStartX) * tailProgress;
    const tailY = tailStartY + (tailEndY - tailStartY) * tailProgress;

    ctx.strokeStyle = 'rgba(30, 27, 75, 0.95)';
    ctx.lineWidth = 28;
    ctx.lineCap = 'round';
    ctx.shadowBlur = 35;
    ctx.shadowColor = 'rgba(99, 102, 241, 0.8)';
    ctx.beginPath();
    ctx.moveTo(tailStartX, tailStartY);
    for (let t = 0.1; t <= tailProgress; t += 0.08) {
      const wave = Math.sin(t * 12 + time / 80) * 25;
      const nx = tailStartX + (tailEndX - tailStartX) * t + Math.cos(t * Math.PI) * wave;
      const ny = tailStartY + (tailEndY - tailStartY) * t + Math.sin(t * Math.PI) * wave;
      ctx.lineTo(nx, ny);
    }
    ctx.stroke();
    ctx.lineWidth = 12;
    ctx.strokeStyle = 'rgba(139, 92, 246, 0.9)';
    ctx.beginPath();
    ctx.moveTo(tailStartX, tailStartY);
    for (let t = 0.1; t <= tailProgress; t += 0.08) {
      const wave = Math.sin(t * 12 + time / 80) * 15;
      const nx = tailStartX + (tailEndX - tailStartX) * t + Math.cos(t * Math.PI) * wave;
      const ny = tailStartY + (tailEndY - tailStartY) * t + Math.sin(t * Math.PI) * wave;
      ctx.lineTo(nx, ny);
    }
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.restore();
  } catch (e) { try { ctx.restore(); } catch (_) {} }
};

window.EFFECT_HANDLERS['nightmare'] = function (ctx, effect, targetX, targetY, width, height, time) {
  try {
    ctx.save();
    const nightmareProgress = effect.progress !== undefined ? effect.progress : 0;
    const nightmareTargetX = (effect.targetX != null ? effect.targetX : targetX);
    const nightmareTargetY = (effect.targetY != null ? effect.targetY : targetY);

    const waveRadius = nightmareProgress * 180 + Math.sin(time / 100) * 20;
    const gradient = ctx.createRadialGradient(nightmareTargetX, nightmareTargetY, 0, nightmareTargetX, nightmareTargetY, waveRadius);
    gradient.addColorStop(0, 'rgba(59, 7, 100, 0.9)');
    gradient.addColorStop(0.4, 'rgba(88, 28, 135, 0.7)');
    gradient.addColorStop(0.7, 'rgba(139, 92, 246, 0.3)');
    gradient.addColorStop(1, 'rgba(30, 27, 75, 0)');
    ctx.fillStyle = gradient;
    ctx.shadowBlur = 50;
    ctx.shadowColor = 'rgba(124, 58, 237, 0.8)';
    ctx.beginPath();
    ctx.arc(nightmareTargetX, nightmareTargetY, waveRadius, 0, Math.PI * 2);
    ctx.fill();

    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2 + time / 400;
      const eyeX = nightmareTargetX + Math.cos(angle) * (60 + nightmareProgress * 40);
      const eyeY = nightmareTargetY + Math.sin(angle) * (60 + nightmareProgress * 40);
      const eyeScale = 0.8 + Math.sin(time / 200 + i) * 0.2;
      ctx.fillStyle = 'rgba(254, 240, 138, 0.95)';
      ctx.shadowBlur = 15;
      ctx.shadowColor = 'rgba(250, 204, 21, 0.9)';
      ctx.beginPath();
      ctx.ellipse(eyeX, eyeY, 12 * eyeScale, 18 * eyeScale, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'rgba(30, 27, 75, 1)';
      ctx.beginPath();
      ctx.ellipse(eyeX, eyeY, 4, 6, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.shadowBlur = 0;
    ctx.restore();
  } catch (e) { try { ctx.restore(); } catch (_) {} }
};
