// じめんタイプエフェクト
window.EFFECT_HANDLERS = window.EFFECT_HANDLERS || {};

window.EFFECT_HANDLERS['earthquake'] = function (ctx, effect, targetX, targetY, width, height, time) {
  ctx.save();
  const earthquakeProgress = effect.progress || 0;
  const earthquakeTargetX = targetX;
  const earthquakeTargetY = targetY;

  const shakeIntensity = Math.sin(time / 10) * (earthquakeProgress * 15);
  ctx.strokeStyle = 'rgba(139, 69, 19, 0.8)';
  ctx.lineWidth = 8;
  ctx.shadowBlur = 20;
  ctx.shadowColor = 'rgba(139, 69, 19, 0.6)';

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
};

window.EFFECT_HANDLERS['earth_power'] = function (ctx, effect, targetX, targetY, width, height, time) {
  ctx.save();
  const earthPowerProgress = effect.progress || 0;
  const earthPowerTargetX = targetX;
  const earthPowerTargetY = targetY;

  const energyHeight = earthPowerProgress * 150;
  const energyGradient = ctx.createLinearGradient(earthPowerTargetX, earthPowerTargetY + 50, earthPowerTargetX, earthPowerTargetY - energyHeight);
  energyGradient.addColorStop(0, 'rgba(139, 69, 19, 0.9)');
  energyGradient.addColorStop(0.3, 'rgba(160, 82, 45, 0.8)');
  energyGradient.addColorStop(0.6, 'rgba(205, 133, 63, 0.7)');
  energyGradient.addColorStop(1, 'rgba(255, 200, 150, 0.6)');

  ctx.fillStyle = energyGradient;
  ctx.shadowBlur = 25;
  ctx.shadowColor = 'rgba(205, 133, 63, 0.8)';

  const energyWidth = 40 + Math.sin(time / 20) * 10;
  ctx.beginPath();
  ctx.ellipse(earthPowerTargetX, earthPowerTargetY - energyHeight / 2, energyWidth / 2, energyHeight / 2, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = 'rgba(255, 220, 180, 0.9)';
  ctx.beginPath();
  ctx.ellipse(earthPowerTargetX, earthPowerTargetY - energyHeight / 2, energyWidth / 4, energyHeight / 2, 0, 0, Math.PI * 2);
  ctx.fill();

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
};
