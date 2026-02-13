// 水・氷タイプエフェクト
window.EFFECT_HANDLERS = window.EFFECT_HANDLERS || {};

window.EFFECT_HANDLERS['water'] = function (ctx, effect, targetX, targetY, width, height, time) {
  ctx.save();
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
};

window.EFFECT_HANDLERS['salt_water'] = function (ctx, effect, targetX, targetY, width, height, time) {
  ctx.save();
  const saltWaterProgress = effect.progress || 0;
  const saltWaterStartX = effect.startX || targetX - 200;
  const saltWaterStartY = effect.startY || targetY;
  const saltWaterEndX = targetX;
  const saltWaterEndY = targetY;
  const saltWaterCurrentX = saltWaterStartX + (saltWaterEndX - saltWaterStartX) * saltWaterProgress;
  const saltWaterCurrentY = saltWaterStartY + (saltWaterEndY - saltWaterStartY) * saltWaterProgress;

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
};

window.EFFECT_HANDLERS['surf'] = function (ctx, effect, targetX, targetY, width, height, time) {
  ctx.save();
  const surfProgress = effect.progress || 0;
  const surfStartX = effect.startX || targetX - 300;
  const surfStartY = effect.startY || targetY;
  const surfEndX = targetX;
  const surfEndY = targetY;
  const surfCurrentX = surfStartX + (surfEndX - surfStartX) * surfProgress;

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

  for (let i = 0; i < 25; i++) {
    const x = surfCurrentX - 100 + i * 8;
    const y = surfStartY - waveHeight + Math.sin((x - surfCurrentX) / 30 + time / 20) * 30;
    ctx.fillStyle = `rgba(255, 255, 255, ${0.8 + Math.sin(time / 15 + i) * 0.2})`;
    ctx.beginPath();
    ctx.arc(x, y, 5 + Math.sin(time / 20 + i) * 2, 0, Math.PI * 2);
    ctx.fill();
  }

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
};

window.EFFECT_HANDLERS['hydro_pump'] = function (ctx, effect, targetX, targetY, width, height, time) {
  ctx.save();
  const hydroPumpProgress = effect.progress || 0;
  const hydroPumpStartX = effect.startX || targetX - 200;
  const hydroPumpStartY = effect.startY || targetY;
  const hydroPumpEndX = targetX;
  const hydroPumpEndY = targetY;
  const hydroPumpCurrentX = hydroPumpStartX + (hydroPumpEndX - hydroPumpStartX) * hydroPumpProgress;
  const hydroPumpCurrentY = hydroPumpStartY + (hydroPumpEndY - hydroPumpStartY) * hydroPumpProgress;

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

  ctx.strokeStyle = 'rgba(255, 255, 255, 1)';
  ctx.lineWidth = hydroPumpWidth * 0.4;
  ctx.beginPath();
  ctx.moveTo(hydroPumpStartX, hydroPumpStartY);
  ctx.lineTo(hydroPumpCurrentX, hydroPumpCurrentY);
  ctx.stroke();

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
};

window.EFFECT_HANDLERS['cold_flare'] = function (ctx, effect, targetX, targetY, width, height, time) {
  ctx.save();
  const coldFlareProgress = effect.progress || 0;
  const coldFlareStartX = effect.startX || targetX - 200;
  const coldFlareStartY = effect.startY || targetY;
  const coldFlareEndX = targetX;
  const coldFlareEndY = targetY;
  const coldFlareCurrentX = coldFlareStartX + (coldFlareEndX - coldFlareStartX) * coldFlareProgress;
  const coldFlareCurrentY = coldFlareStartY + (coldFlareEndY - coldFlareStartY) * coldFlareProgress;

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
};
