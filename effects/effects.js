// エフェクト描画処理（グローバルスコープで定義）
// タイプ別エフェクトは effects/*.js で EFFECT_HANDLERS に登録される
window.EFFECT_HANDLERS = window.EFFECT_HANDLERS || {};

window.drawEffect = function (ctx, effect, targetX, targetY, width, height) {
  const time = Date.now();
  const handler = window.EFFECT_HANDLERS[effect.type];
  if (handler) {
    handler(ctx, effect, targetX, targetY, width, height, time);
    return;
  }
  if (window.drawEffectLegacy) {
    window.drawEffectLegacy(ctx, effect, targetX, targetY, width, height);
  }
};
