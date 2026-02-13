// 炎タイプエフェクト
window.EFFECT_HANDLERS = window.EFFECT_HANDLERS || {};

window.EFFECT_HANDLERS['fire'] = function (ctx, effect, targetX, targetY, width, height, time) {
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
};

window.EFFECT_HANDLERS['beam'] = function (ctx, effect, targetX, targetY, width, height, time) {
  ctx.save();
  const beamProgress = effect.progress || 0;
  const startX = effect.startX || targetX - 200;
  const startY = effect.startY || targetY;
  const endX = targetX;
  const endY = targetY;

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

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(startX + (endX - startX) * beamProgress, startY + (endY - startY) * beamProgress);
  ctx.stroke();

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
};

window.EFFECT_HANDLERS['dai_monji'] = function (ctx, effect, targetX, targetY, width, height, time) {
  ctx.save();
  const daiMonjiProgress = effect.progress !== undefined ? effect.progress : 0;
  const daiMonjiStartX = effect.startX !== undefined ? effect.startX : targetX - 200;
  const daiMonjiStartY = effect.startY !== undefined ? effect.startY : targetY;
  const daiMonjiEndX = effect.targetX !== undefined ? effect.targetX : targetX;
  const daiMonjiEndY = effect.targetY !== undefined ? effect.targetY : targetY;

  const daiMonjiCurrentX = daiMonjiStartX + (daiMonjiEndX - daiMonjiStartX) * daiMonjiProgress;
  const daiMonjiCurrentY = daiMonjiStartY + (daiMonjiEndY - daiMonjiStartY) * daiMonjiProgress;

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

  if (daiMonjiProgress >= 0.9) {
    const explosionProgress = (daiMonjiProgress - 0.9) / 0.1;

    ctx.save();
    ctx.translate(daiMonjiEndX, daiMonjiEndY);
    ctx.scale(1 + explosionProgress * 2, 1 + explosionProgress * 2);
    ctx.rotate(Math.sin(time / 100) * 0.1);

    ctx.shadowBlur = 50;
    ctx.shadowColor = 'rgba(255, 100, 0, 1)';
    ctx.fillStyle = 'rgba(255, 255, 0, 1)';
    ctx.font = `bold ${80 + explosionProgress * 40}px "MS Gothic", "Hiragino Kaku Gothic ProN", "Hiragino Sans", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('大', 0, 0);

    ctx.strokeStyle = 'rgba(255, 200, 0, 1)';
    ctx.lineWidth = 8;
    ctx.shadowBlur = 40;
    ctx.strokeText('大', 0, 0);

    ctx.restore();
  }

  ctx.shadowBlur = 0;
  ctx.restore();
};

window.EFFECT_HANDLERS['magma_storm'] = function (ctx, effect, targetX, targetY, width, height, time) {
  ctx.save();
  const magmaStormProgress = effect.progress || 0;
  const magmaStormStartX = effect.startX || targetX - 200;
  const magmaStormStartY = effect.startY || targetY;
  const magmaStormEndX = targetX;
  const magmaStormEndY = targetY;
  const magmaStormCurrentX = magmaStormStartX + (magmaStormEndX - magmaStormStartX) * magmaStormProgress;
  const magmaStormCurrentY = magmaStormStartY + (magmaStormEndY - magmaStormStartY) * magmaStormProgress;

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

  ctx.strokeStyle = 'rgba(255, 255, 200, 1)';
  ctx.lineWidth = magmaWidth * 0.35;
  ctx.beginPath();
  ctx.moveTo(magmaStormStartX, magmaStormStartY);
  ctx.lineTo(magmaStormCurrentX, magmaStormCurrentY);
  ctx.stroke();

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
};

window.EFFECT_HANDLERS['bagfoon_inferno'] = function (ctx, effect, targetX, targetY, width, height, time) {
  try {
    ctx.save();
    const infProgress = effect.progress != null ? effect.progress : 0;
    const infX = (effect.targetX != null ? effect.targetX : targetX);
    const infY = (effect.targetY != null ? effect.targetY : targetY);
    const infRadius = 40 + infProgress * 120 + Math.sin(time / 60) * 15;
    const infGrad = ctx.createRadialGradient(infX, infY, 0, infX, infY, infRadius);
    infGrad.addColorStop(0, 'rgba(255, 255, 220, 1)');
    infGrad.addColorStop(0.15, 'rgba(255, 180, 0, 0.95)');
    infGrad.addColorStop(0.4, 'rgba(255, 80, 0, 0.9)');
    infGrad.addColorStop(0.7, 'rgba(220, 20, 0, 0.7)');
    infGrad.addColorStop(1, 'rgba(120, 0, 0, 0)');
    ctx.fillStyle = infGrad;
    ctx.shadowBlur = 60;
    ctx.shadowColor = 'rgba(255, 100, 0, 0.9)';
    ctx.beginPath();
    ctx.arc(infX, infY, infRadius, 0, Math.PI * 2);
    ctx.fill();
    for (let r = 0; r < 3; r++) {
      const spiralR = infRadius * (0.3 + r * 0.35) + Math.sin(time / 40 + r * 2) * 12;
      ctx.strokeStyle = `rgba(255, 200, 50, ${0.9 - r * 0.25})`;
      ctx.lineWidth = 14 - r * 4;
      ctx.beginPath();
      for (let i = 0; i <= 36; i++) {
        const a = (i / 36) * Math.PI * 4 + time / 80 + r * 1.5;
        const x = infX + Math.cos(a) * spiralR;
        const y = infY + Math.sin(a) * spiralR;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    for (let i = 0; i < 24; i++) {
      const a = (i / 24) * Math.PI * 2 + time / 30;
      const r = infRadius * 0.6 + Math.sin(time / 50 + i) * 20;
      ctx.fillStyle = `rgba(255, 255, 200, ${0.9 - i * 0.03})`;
      ctx.shadowBlur = 25;
      ctx.beginPath();
      ctx.arc(infX + Math.cos(a) * r, infY + Math.sin(a) * r, 8 + Math.sin(time / 20 + i) * 4, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.shadowBlur = 0;
    ctx.restore();
  } catch (e) { try { ctx.restore(); } catch (_) {} }
};

window.EFFECT_HANDLERS['bagfoon_flare_blitz'] = function (ctx, effect, targetX, targetY, width, height, time) {
  try {
    ctx.save();
    const fbProgress = effect.progress != null ? effect.progress : 0;
    const fbStartX = (effect.startX != null ? effect.startX : targetX - 200);
    const fbStartY = (effect.startY != null ? effect.startY : targetY);
    const fbEndX = (effect.targetX != null ? effect.targetX : targetX);
    const fbEndY = (effect.targetY != null ? effect.targetY : targetY);
    const fbX = fbStartX + (fbEndX - fbStartX) * fbProgress;
    const fbY = fbStartY + (fbEndY - fbStartY) * fbProgress;
    ctx.shadowBlur = 45;
    ctx.shadowColor = 'rgba(255, 150, 0, 0.95)';
    for (let t = 0; t <= fbProgress; t += 0.08) {
      const trailX = fbStartX + (fbEndX - fbStartX) * t;
      const trailY = fbStartY + (fbEndY - fbStartY) * t;
      const trailW = 35 + (1 - t) * 25 + Math.sin(time / 25) * 8;
      const trailGrad = ctx.createRadialGradient(trailX, trailY, 0, trailX, trailY, trailW);
      trailGrad.addColorStop(0, `rgba(255, 255, 200, ${0.9 * (1 - t)})`);
      trailGrad.addColorStop(0.4, `rgba(255, 120, 0, ${0.8 * (1 - t)})`);
      trailGrad.addColorStop(1, 'rgba(255, 50, 0, 0)');
      ctx.fillStyle = trailGrad;
      ctx.beginPath();
      ctx.arc(trailX, trailY, trailW, 0, Math.PI * 2);
      ctx.fill();
    }
    const coreW = 50 + Math.sin(time / 50) * 15;
    const coreGrad = ctx.createRadialGradient(fbX, fbY, 0, fbX, fbY, coreW);
    coreGrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    coreGrad.addColorStop(0.2, 'rgba(255, 220, 100, 0.95)');
    coreGrad.addColorStop(0.5, 'rgba(255, 100, 0, 0.8)');
    coreGrad.addColorStop(1, 'rgba(255, 50, 0, 0)');
    ctx.fillStyle = coreGrad;
    ctx.beginPath();
    ctx.arc(fbX, fbY, coreW, 0, Math.PI * 2);
    ctx.fill();
    if (fbProgress >= 0.9) {
      const burst = (fbProgress - 0.9) / 0.1;
      const burstR = burst * 100;
      ctx.strokeStyle = `rgba(255, 200, 0, ${1 - burst})`;
      ctx.lineWidth = 12;
      ctx.beginPath();
      ctx.arc(fbEndX, fbEndY, burstR, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.shadowBlur = 0;
    ctx.restore();
  } catch (e) { try { ctx.restore(); } catch (_) {} }
};

window.EFFECT_HANDLERS['bagfoon_blazing_punch'] = function (ctx, effect, targetX, targetY, width, height, time) {
  try {
    ctx.save();
    const bpProgress = effect.progress != null ? effect.progress : 0;
    const bpStartX = (effect.startX != null ? effect.startX : targetX - 200);
    const bpStartY = (effect.startY != null ? effect.startY : targetY);
    const bpEndX = (effect.targetX != null ? effect.targetX : targetX);
    const bpEndY = (effect.targetY != null ? effect.targetY : targetY);
    const bpX = bpStartX + (bpEndX - bpStartX) * bpProgress;
    const bpY = bpStartY + (bpEndY - bpStartY) * bpProgress;
    const fistR = 45 + Math.sin(time / 30) * 10;
    const fistGrad = ctx.createRadialGradient(bpX, bpY, 0, bpX, bpY, fistR);
    fistGrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    fistGrad.addColorStop(0.2, 'rgba(255, 200, 80, 0.95)');
    fistGrad.addColorStop(0.5, 'rgba(255, 100, 0, 0.9)');
    fistGrad.addColorStop(0.8, 'rgba(220, 50, 0, 0.7)');
    fistGrad.addColorStop(1, 'rgba(180, 20, 0, 0)');
    ctx.fillStyle = fistGrad;
    ctx.shadowBlur = 50;
    ctx.shadowColor = 'rgba(255, 150, 0, 0.95)';
    ctx.beginPath();
    ctx.arc(bpX, bpY, fistR, 0, Math.PI * 2);
    ctx.fill();
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2 + time / 60;
      const r = fistR * 0.8 + Math.sin(time / 40 + i) * 15;
      ctx.fillStyle = 'rgba(255, 255, 220, 0.9)';
      ctx.beginPath();
      ctx.arc(bpX + Math.cos(a) * r, bpY + Math.sin(a) * r, 6, 0, Math.PI * 2);
      ctx.fill();
    }
    if (bpProgress >= 0.85) {
      const hit = (bpProgress - 0.85) / 0.15;
      const hitR = hit * 80;
      ctx.strokeStyle = `rgba(255, 180, 0, ${1 - hit})`;
      ctx.lineWidth = 10;
      ctx.beginPath();
      ctx.arc(bpEndX, bpEndY, hitR, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.shadowBlur = 0;
    ctx.restore();
  } catch (e) { try { ctx.restore(); } catch (_) {} }
};

window.EFFECT_HANDLERS['bagfoon_explosion'] = function (ctx, effect, targetX, targetY, width, height, time) {
  try {
    ctx.save();
    const exProgress = effect.progress != null ? effect.progress : 0;
    const exX = (effect.targetX != null ? effect.targetX : targetX);
    const exY = (effect.targetY != null ? effect.targetY : targetY);
    const exRadius = exProgress * 140 + Math.sin(time / 50) * 10;
    const exGrad = ctx.createRadialGradient(exX, exY, 0, exX, exY, exRadius);
    exGrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    exGrad.addColorStop(0.1, 'rgba(255, 230, 150, 0.98)');
    exGrad.addColorStop(0.25, 'rgba(255, 150, 0, 0.95)');
    exGrad.addColorStop(0.5, 'rgba(255, 60, 0, 0.85)');
    exGrad.addColorStop(0.75, 'rgba(200, 20, 0, 0.5)');
    exGrad.addColorStop(1, 'rgba(100, 0, 0, 0)');
    ctx.fillStyle = exGrad;
    ctx.shadowBlur = 70;
    ctx.shadowColor = 'rgba(255, 100, 0, 0.9)';
    ctx.beginPath();
    ctx.arc(exX, exY, exRadius, 0, Math.PI * 2);
    ctx.fill();
    for (let w = 0; w < 5; w++) {
      const waveProgress = exProgress - w * 0.15;
      if (waveProgress > 0) {
        const waveR = exRadius * 0.5 + w * 35 + Math.sin(time / 80) * 8;
        const alpha = Math.max(0, (1 - waveProgress * 1.2) * 0.8);
        ctx.strokeStyle = `rgba(255, 180, 50, ${alpha})`;
        ctx.lineWidth = 14 - w * 2;
        ctx.beginPath();
        ctx.arc(exX, exY, waveR, 0, Math.PI * 2);
        ctx.stroke();
      }
    }
    for (let i = 0; i < 30; i++) {
      const a = (i / 30) * Math.PI * 2 + time / 100;
      const r = exRadius * 0.7 + Math.sin(time / 30 + i) * 25;
      ctx.fillStyle = `rgba(255, 255, 200, ${0.9 - exProgress * 0.5})`;
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.arc(exX + Math.cos(a) * r, exY + Math.sin(a) * r, 5 + Math.sin(time / 25 + i) * 3, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.shadowBlur = 0;
    ctx.restore();
  } catch (e) { try { ctx.restore(); } catch (_) {} }
};
