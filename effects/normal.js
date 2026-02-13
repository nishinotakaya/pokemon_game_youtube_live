// ノーマル・むし・ひこう・どくなど共通エフェクト
window.EFFECT_HANDLERS = window.EFFECT_HANDLERS || {};

var slashEffect = function (ctx, effect, targetX, targetY, width, height, time) {
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
};
window.EFFECT_HANDLERS['bug'] = slashEffect;
window.EFFECT_HANDLERS['flying'] = slashEffect;

window.EFFECT_HANDLERS['shield'] = function (ctx, effect, targetX, targetY, width, height, time) {
  ctx.strokeStyle = '#60a5fa';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(targetX, targetY, 60 + Math.sin(time / 100) * 5, 0, Math.PI * 2);
  ctx.stroke();
};

window.EFFECT_HANDLERS['sparkle'] = function (ctx, effect, targetX, targetY, width, height, time) {
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
};

window.EFFECT_HANDLERS['poison'] = function (ctx, effect, targetX, targetY, width, height, time) {
  ctx.save();
  for (let i = 0; i < 20; i++) {
    const angle = (i / 20) * Math.PI * 2;
    const radius = 50 + Math.sin(time / 100 + i) * 20;
    const x = targetX + Math.cos(angle) * radius;
    const y = targetY + Math.sin(angle) * radius;

    ctx.fillStyle = `rgba(139, 92, 246, ${0.7 + Math.sin(time / 80 + i) * 0.3})`;
    ctx.beginPath();
    ctx.arc(x, y, 12 + Math.sin(time / 90 + i) * 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.beginPath();
    ctx.arc(x - 3, y - 3, 4, 0, Math.PI * 2);
    ctx.fill();
  }

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
};
