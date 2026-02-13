// 電気タイプエフェクト
window.EFFECT_HANDLERS = window.EFFECT_HANDLERS || {};

window.EFFECT_HANDLERS['electric'] = function (ctx, effect, targetX, targetY, width, height, time) {
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
};

window.EFFECT_HANDLERS['zeraora_plasma'] = function (ctx, effect, targetX, targetY, width, height, time) {
  ctx.save();
  const plasmaProgress = effect.progress !== undefined ? effect.progress : 0;
  const plasmaStartX = effect.startX !== undefined ? effect.startX : targetX - 200;
  const plasmaStartY = effect.startY !== undefined ? effect.startY : targetY;
  const plasmaEndX = effect.targetX !== undefined ? effect.targetX : targetX;
  const plasmaEndY = effect.targetY !== undefined ? effect.targetY : targetY;

  const plasmaCurrentX = plasmaStartX + (plasmaEndX - plasmaStartX) * plasmaProgress;
  const plasmaCurrentY = plasmaStartY + (plasmaEndY - plasmaStartY) * plasmaProgress;

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
    for (let j = 1; j <= 5; j++) {
      const progress = j / 5;
      const baseX = plasmaCurrentX + (boltX - plasmaCurrentX) * progress;
      const baseY = plasmaCurrentY + (boltY - plasmaCurrentY) * progress;
      const offsetX = (Math.sin(time / 50 + i + j) * 25) * (1 - progress * 0.5);
      const offsetY = (Math.cos(time / 60 + i + j) * 25) * (1 - progress * 0.5);
      ctx.lineTo(baseX + offsetX, baseY + offsetY);
    }
    ctx.lineTo(boltX, boltY);
    ctx.stroke();
  }

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
};

window.EFFECT_HANDLERS['zeraora_thunder_punch'] = function (ctx, effect, targetX, targetY, width, height, time) {
  ctx.save();
  const punchProgress = effect.progress !== undefined ? effect.progress : 0;
  const punchStartX = effect.startX !== undefined ? effect.startX : targetX - 200;
  const punchStartY = effect.startY !== undefined ? effect.startY : targetY;
  const punchEndX = effect.targetX !== undefined ? effect.targetX : targetX;
  const punchEndY = effect.targetY !== undefined ? effect.targetY : targetY;

  const punchCurrentX = punchStartX + (punchEndX - punchStartX) * punchProgress;
  const punchCurrentY = punchStartY + (punchEndY - punchStartY) * punchProgress;

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

  if (punchProgress >= 0.9) {
    const explosionProgress = (punchProgress - 0.9) / 0.1;
    const explosionSize = explosionProgress * 100;

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
      for (let j = 1; j <= 4; j++) {
        const progress = j / 4;
        const baseX = punchEndX + (boltEndX - punchEndX) * progress;
        const baseY = punchEndY + (boltEndY - punchEndY) * progress;
        const offsetX = Math.sin(time / 25 + i + j) * 20 * (1 - progress * 0.7);
        const offsetY = Math.cos(time / 30 + i + j) * 20 * (1 - progress * 0.7);
        ctx.lineTo(baseX + offsetX, baseY + offsetY);
      }
      ctx.stroke();
    }

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
};

window.EFFECT_HANDLERS['zapdos_thunder_bolt'] = function (ctx, effect, targetX, targetY, width, height, time) {
  ctx.save();
  const thunderBoltProgress = effect.progress !== undefined ? effect.progress : 0;
  const thunderBoltStartX = effect.startX !== undefined ? effect.startX : targetX - 200;
  const thunderBoltStartY = effect.startY !== undefined ? effect.startY : targetY - 100;
  const thunderBoltEndX = effect.targetX !== undefined ? effect.targetX : targetX;
  const thunderBoltEndY = effect.targetY !== undefined ? effect.targetY : targetY;

  const thunderBoltCurrentX = thunderBoltStartX + (thunderBoltEndX - thunderBoltStartX) * thunderBoltProgress;
  const thunderBoltCurrentY = thunderBoltStartY + (thunderBoltEndY - thunderBoltStartY) * thunderBoltProgress;

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

  ctx.beginPath();
  ctx.moveTo(thunderBoltStartX, thunderBoltStartY);
  const segments = 15;
  for (let i = 1; i <= segments; i++) {
    const segmentProgress = i / segments;
    const baseX = thunderBoltStartX + (thunderBoltCurrentX - thunderBoltStartX) * segmentProgress;
    const baseY = thunderBoltStartY + (thunderBoltCurrentY - thunderBoltStartY) * segmentProgress;
    const zigzagX = baseX + (Math.random() - 0.5) * 30 * (1 - segmentProgress * 0.5);
    const zigzagY = baseY + (Math.random() - 0.5) * 30 * (1 - segmentProgress * 0.5);
    ctx.lineTo(zigzagX, zigzagY);
  }
  ctx.stroke();

  for (let i = 0; i < 8; i++) {
    const branchAngle = (i / 8) * Math.PI * 2 + time / 100;
    const branchLength = 40 + Math.sin(time / 60 + i) * 20;
    const branchX = thunderBoltCurrentX + Math.cos(branchAngle) * branchLength;
    const branchY = thunderBoltCurrentY + Math.sin(branchAngle) * branchLength;

    ctx.strokeStyle = 'rgba(255, 255, 0, 0.7)';
    ctx.lineWidth = 3;
    ctx.shadowBlur = 20;
    ctx.beginPath();
    ctx.moveTo(thunderBoltCurrentX, thunderBoltCurrentY);
    for (let j = 1; j <= 3; j++) {
      const branchSegX = thunderBoltCurrentX + (branchX - thunderBoltCurrentX) * (j / 3) + (Math.random() - 0.5) * 10;
      const branchSegY = thunderBoltCurrentY + (branchY - thunderBoltCurrentY) * (j / 3) + (Math.random() - 0.5) * 10;
      ctx.lineTo(branchSegX, branchSegY);
    }
    ctx.stroke();
  }

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
      for (let j = 1; j <= 4; j++) {
        const partProg = j / 4;
        const partX = thunderBoltEndX + (px - thunderBoltEndX) * partProg + (Math.random() - 0.5) * 15;
        const partY = thunderBoltEndY + (py - thunderBoltEndY) * partProg + (Math.random() - 0.5) * 15;
        ctx.lineTo(partX, partY);
      }
      ctx.lineTo(px, py);
      ctx.stroke();
    }

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
};
