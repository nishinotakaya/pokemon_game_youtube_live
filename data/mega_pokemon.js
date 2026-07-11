// メガポケモン関連の処理

// 背景透過処理を行う共通関数
const processTransparentBackground = (img, callback) => {
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  // 白い背景を透過させる
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    // 白に近い色（閾値調整可能）を透過させる
    if (r > 240 && g > 240 && b > 240) {
      data[i + 3] = 0; // アルファチャンネルを0に
    }
  }

  ctx.putImageData(imageData, 0, 0);
  callback(canvas);
};

// メガリザードン背後画像の読み込み
const loadMegaCharizardBackImage = (megaCharizardBackImageRef) => {
  if (!megaCharizardBackImageRef.current) {
    const img = new Image();
    img.onload = () => {
      processTransparentBackground(img, (canvas) => {
        megaCharizardBackImageRef.current = canvas;
      });
    };
    img.onerror = () => {
      console.log('メガリザードン背後画像の読み込みに失敗しました');
    };
    img.src = 'メガリザードン背後.png';
  }
};

// メガルカリオ背後画像の読み込み
const loadMegaLucarioBackImage = (megaLucarioBackImageRef) => {
  if (!megaLucarioBackImageRef.current) {
    const img = new Image();
    img.onload = () => {
      processTransparentBackground(img, (canvas) => {
        megaLucarioBackImageRef.current = canvas;
      });
    };
    img.onerror = () => {
      console.log('メガルカリオ背後画像の読み込みに失敗しました');
    };
    img.src = 'メガルカリオ背後.png';
  }
};

// メガレックウザ背後画像の読み込み
const loadMegaRayquazaBackImage = (megaRayquazaBackImageRef) => {
  if (!megaRayquazaBackImageRef.current) {
    const img = new Image();
    img.onload = () => {
      processTransparentBackground(img, (canvas) => {
        megaRayquazaBackImageRef.current = canvas;
      });
    };
    img.onerror = () => {
      console.log('メガレックウザ背後画像の読み込みに失敗しました');
    };
    img.src = 'メガレックウザ.png';
  }
};

// メガハッサム背後画像の読み込み
const loadMegaScizorBackImage = (megaScizorBackImageRef) => {
  if (!megaScizorBackImageRef.current) {
    const img = new Image();
    img.onload = () => {
      processTransparentBackground(img, (canvas) => {
        megaScizorBackImageRef.current = canvas;
      });
    };
    img.onerror = () => {
      console.log('メガハッサム背後画像の読み込みに失敗しました');
    };
    img.src = 'メガハッサム_背後.png';
  }
};

// メガハッサム表画像の読み込み
const loadMegaScizorFrontImage = (megaScizorFrontImageRef, setMegaScizorFrontImageUrl) => {
  if (!megaScizorFrontImageRef.current) {
    const img = new Image();
    img.onload = () => {
      processTransparentBackground(img, (canvas) => {
        megaScizorFrontImageRef.current = canvas;
        // canvas要素を画像URLに変換して保存（選択画面と進化完了後の表示で使用）
        const imageUrl = canvas.toDataURL('image/png');
        setMegaScizorFrontImageUrl(imageUrl);
      });
    };
    img.onerror = () => {
      console.log('メガハッサム表画像の読み込みに失敗しました');
    };
    img.src = 'メガハッサム_表.png';
  }
};

// CPU側メガリザードン表画像の読み込み
const MEGA_CHARIZARD_FRONT_URL = 'https://zukan.pokemon.co.jp/zukan-api/up/images/index/0c2f066d11c448109862cec46eb62521.png';
const loadMegaCharizardFrontImage = (megaCharizardFrontImageRef) => {
  if (!megaCharizardFrontImageRef.current) {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      megaCharizardFrontImageRef.current = img;
    };
    img.onerror = () => {
      console.log('メガリザードン表画像の読み込みに失敗しました');
    };
    img.src = MEGA_CHARIZARD_FRONT_URL;
  }
};

// CPU側メガレックウザ表画像の読み込み
const MEGA_RAYQUAZA_FRONT_URL = 'https://zukan.pokemon.co.jp/zukan-api/up/images/index/8ac25cd367875f2ddafc63bd9e0081c4.png';
const loadMegaRayquazaFrontImage = (megaRayquazaFrontImageRef) => {
  if (!megaRayquazaFrontImageRef.current) {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      megaRayquazaFrontImageRef.current = img;
    };
    img.onerror = () => {
      console.log('メガレックウザ表画像の読み込みに失敗しました');
    };
    img.src = MEGA_RAYQUAZA_FRONT_URL;
  }
};

// CPU側メガルカリオ表画像の読み込み
const MEGA_LUCARIO_FRONT_URL = 'https://zukan.pokemon.co.jp/zukan-api/up/images/index/4e646ee4f6ad9d9ea4b4022f74d63805.png';
const loadMegaLucarioFrontImage = (megaLucarioFrontImageRef) => {
  if (!megaLucarioFrontImageRef.current) {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      megaLucarioFrontImageRef.current = img;
    };
    img.onerror = () => {
      console.log('メガルカリオ表画像の読み込みに失敗しました');
    };
    img.src = MEGA_LUCARIO_FRONT_URL;
  }
};

// プレイヤー側のメガポケモン描画
const drawMegaPokemonPlayer = (ctx, actualP1Key, p1X, p1Y, p1Size, p1Action, imageRefs) => {
  const { megaCharizardBackImageRef, megaRayquazaBackImageRef, megaLucarioBackImageRef, megaScizorBackImageRef } = imageRefs;

  if (actualP1Key === 'mega_charizard' && megaCharizardBackImageRef.current) {
    ctx.save();
    if (p1Action === 'hit') {
      ctx.filter = 'brightness(3) sepia(1) hue-rotate(-50deg)';
      ctx.translate((Math.random() - 0.5) * 10, 0);
    }
    // 画像自体は小さく、横幅を広げて描画（回転なし）
    const baseSize = p1Size * 0.7; // 30%小さく
    const drawWidth = baseSize * 1.3; // 横幅を30%広げる
    const drawHeight = baseSize; // 高さはそのまま
    const adjustedX = p1X - (drawWidth - p1Size) / 2;
    const adjustedY = p1Y - (drawHeight - p1Size) / 2;
    // canvas要素の場合はそのまま描画
    if (megaCharizardBackImageRef.current instanceof HTMLCanvasElement) {
      ctx.drawImage(megaCharizardBackImageRef.current, adjustedX, adjustedY, drawWidth, drawHeight);
    } else if (megaCharizardBackImageRef.current.complete && megaCharizardBackImageRef.current.naturalWidth > 0) {
      ctx.drawImage(megaCharizardBackImageRef.current, adjustedX, adjustedY, drawWidth, drawHeight);
    }
    ctx.restore();
    return true;
  } else if (actualP1Key === 'mega_rayquaza' && megaRayquazaBackImageRef.current) {
    ctx.save();
    if (p1Action === 'hit') {
      ctx.filter = 'brightness(3) sepia(1) hue-rotate(-50deg)';
      ctx.translate((Math.random() - 0.5) * 10, 0);
    }
    // 画像自体は小さく、横幅を広げて描画（回転なし）
    const baseSize = p1Size * 0.7; // 30%小さく
    const drawWidth = baseSize * 1.5; // 横幅を50%広げる
    const drawHeight = baseSize; // 高さはそのまま
    const adjustedX = p1X - (drawWidth - p1Size) / 2;
    const adjustedY = p1Y - (drawHeight - p1Size) / 2;
    // canvas要素の場合はそのまま描画
    if (megaRayquazaBackImageRef.current instanceof HTMLCanvasElement) {
      ctx.drawImage(megaRayquazaBackImageRef.current, adjustedX, adjustedY, drawWidth, drawHeight);
    } else if (megaRayquazaBackImageRef.current.complete && megaRayquazaBackImageRef.current.naturalWidth > 0) {
      ctx.drawImage(megaRayquazaBackImageRef.current, adjustedX, adjustedY, drawWidth, drawHeight);
    }
    ctx.restore();
    return true;
  } else if (actualP1Key === 'mega_lucario' && megaLucarioBackImageRef.current) {
    ctx.save();
    if (p1Action === 'hit') {
      ctx.filter = 'brightness(3) sepia(1) hue-rotate(-50deg)';
      ctx.translate((Math.random() - 0.5) * 10, 0);
    }

    // ピカピカエフェクト（光る効果）
    const time = Date.now();
    const sparkleIntensity = 0.3 + Math.sin(time * 0.01) * 0.2; // 0.1〜0.5の間で変化
    ctx.shadowBlur = 30;
    ctx.shadowColor = `rgba(59, 130, 246, ${sparkleIntensity})`; // 青い光

    // そのまま描画（回転なし、元のサイズのまま）
    if (megaLucarioBackImageRef.current instanceof HTMLCanvasElement) {
      ctx.drawImage(megaLucarioBackImageRef.current, p1X, p1Y, p1Size, p1Size);
    } else if (megaLucarioBackImageRef.current.complete && megaLucarioBackImageRef.current.naturalWidth > 0) {
      ctx.drawImage(megaLucarioBackImageRef.current, p1X, p1Y, p1Size, p1Size);
    }

    // 追加の光るエフェクト（複数の光の点）
    ctx.shadowBlur = 20;
    ctx.shadowColor = `rgba(255, 255, 255, ${sparkleIntensity * 0.5})`;
    for (let i = 0; i < 5; i++) {
      const angle = (time * 0.002 + i * Math.PI * 2 / 5) % (Math.PI * 2);
      const radius = p1Size * 0.4;
      const sparkleX = p1X + p1Size / 2 + Math.cos(angle) * radius;
      const sparkleY = p1Y + p1Size / 2 + Math.sin(angle) * radius;
      ctx.fillStyle = `rgba(255, 255, 255, ${sparkleIntensity})`;
      ctx.beginPath();
      ctx.arc(sparkleX, sparkleY, 3, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
    return true;
  } else if (actualP1Key === 'mega_scizor' && megaScizorBackImageRef.current) {
    ctx.save();
    if (p1Action === 'hit') {
      ctx.filter = 'brightness(3) sepia(1) hue-rotate(-50deg)';
      ctx.translate((Math.random() - 0.5) * 10, 0);
    }
    // そのまま描画（背景透過処理済みのcanvas要素を使用）
    if (megaScizorBackImageRef.current instanceof HTMLCanvasElement) {
      ctx.drawImage(megaScizorBackImageRef.current, p1X, p1Y, p1Size, p1Size);
    } else if (megaScizorBackImageRef.current.complete && megaScizorBackImageRef.current.naturalWidth > 0) {
      ctx.drawImage(megaScizorBackImageRef.current, p1X, p1Y, p1Size, p1Size);
    }
    ctx.restore();
    return true;
  }
  return false;
};

// CPU側のメガポケモン描画
const drawMegaPokemonCPU = (ctx, p2Key, p2Action, w, h, cpuMegaImageRefs) => {
  const drawMegaAt = (imgOrCanvas, x, y, size) => {
    ctx.save();
    if (p2Action === 'hit') {
      ctx.filter = 'brightness(3) sepia(1) hue-rotate(-50deg)';
      ctx.translate((Math.random() - 0.5) * 10, 0);
    }
    if (imgOrCanvas instanceof HTMLCanvasElement) {
      ctx.drawImage(imgOrCanvas, x, y, size, size);
    } else if (imgOrCanvas && imgOrCanvas.complete && imgOrCanvas.naturalWidth > 0) {
      ctx.drawImage(imgOrCanvas, x, y, size, size);
    }
    ctx.restore();
  };

  const x = w * 0.65;
  const y = h * 0.05;
  const size = 160;

  if (p2Key === 'mega_charizard' && cpuMegaImageRefs.megaCharizardFrontImageRef?.current) {
    drawMegaAt(cpuMegaImageRefs.megaCharizardFrontImageRef.current, x, y, size);
    return true;
  }
  if (p2Key === 'mega_rayquaza' && cpuMegaImageRefs.megaRayquazaFrontImageRef?.current) {
    drawMegaAt(cpuMegaImageRefs.megaRayquazaFrontImageRef.current, x, y, size);
    return true;
  }
  if (p2Key === 'mega_lucario' && cpuMegaImageRefs.megaLucarioFrontImageRef?.current) {
    drawMegaAt(cpuMegaImageRefs.megaLucarioFrontImageRef.current, x, y, size);
    return true;
  }
  if (p2Key === 'mega_scizor' && cpuMegaImageRefs.megaScizorFrontImageRef?.current) {
    drawMegaAt(cpuMegaImageRefs.megaScizorFrontImageRef.current, x, y, size);
    return true;
  }
  return false;
};

// 進化演出でのメガポケモン画像取得
const getMegaPokemonEvolutionImage = (evolvedKey, imageRefs, evolvedPokemonImageRef) => {
  const { megaScizorFrontImageRef } = imageRefs;

  if (evolvedKey === 'mega_charizard') {
    const imageUrl = 'https://zukan.pokemon.co.jp/zukan-api/up/images/index/0c2f066d11c448109862cec46eb62521.png';
    if (!evolvedPokemonImageRef.current || evolvedPokemonImageRef.current.src !== imageUrl) {
      const img = new Image();
      img.onerror = () => {
        console.log('画像の読み込みに失敗しました:', imageUrl);
      };
      img.src = imageUrl;
      evolvedPokemonImageRef.current = img;
    }
    return evolvedPokemonImageRef.current;
  } else if (evolvedKey === 'mega_rayquaza') {
    const imageUrl = 'https://zukan.pokemon.co.jp/zukan-api/up/images/index/8ac25cd367875f2ddafc63bd9e0081c4.png';
    if (!evolvedPokemonImageRef.current || evolvedPokemonImageRef.current.src !== imageUrl) {
      const img = new Image();
      img.onerror = () => {
        console.log('画像の読み込みに失敗しました:', imageUrl);
      };
      img.src = imageUrl;
      evolvedPokemonImageRef.current = img;
    }
    return evolvedPokemonImageRef.current;
  } else if (evolvedKey === 'mega_lucario') {
    const imageUrl = 'https://zukan.pokemon.co.jp/zukan-api/up/images/index/4e646ee4f6ad9d9ea4b4022f74d63805.png';
    if (!evolvedPokemonImageRef.current || evolvedPokemonImageRef.current.src !== imageUrl) {
      const img = new Image();
      img.onerror = () => {
        console.log('画像の読み込みに失敗しました:', imageUrl);
      };
      img.src = imageUrl;
      evolvedPokemonImageRef.current = img;
    }
    return evolvedPokemonImageRef.current;
  } else if (evolvedKey === 'mega_scizor') {
    // メガハッサムは表画像を使用（進化演出用）
    return megaScizorFrontImageRef.current;
  }
  return null;
};

// 選択画面・進化完了後の表示でのメガポケモン画像URL取得
const getMegaPokemonImageUrl = (key, megaScizorFrontImageUrl) => {
  if (key === 'mega_charizard') {
    return 'https://zukan.pokemon.co.jp/zukan-api/up/images/index/0c2f066d11c448109862cec46eb62521.png';
  } else if (key === 'mega_rayquaza') {
    return 'https://zukan.pokemon.co.jp/zukan-api/up/images/index/8ac25cd367875f2ddafc63bd9e0081c4.png';
  } else if (key === 'mega_lucario') {
    return 'https://zukan.pokemon.co.jp/zukan-api/up/images/index/4e646ee4f6ad9d9ea4b4022f74d63805.png';
  } else if (key === 'mega_scizor') {
    return megaScizorFrontImageUrl || 'メガハッサム_表.png';
  }
  return null;
};

// 専用画像・特殊描画を持つメガポケモンかどうかをチェック（描画処理用）
const isMegaPokemon = (key) => {
  return key === 'mega_charizard' || key === 'mega_rayquaza' || key === 'mega_lucario' || key === 'mega_scizor';
};

// メガシンカ形態かどうかをチェック（ダメージ1.5倍の判定用。専用描画の有無とは独立）
const MEGA_FORM_KEYS = ['mega_charizard', 'mega_rayquaza', 'mega_lucario', 'mega_scizor', 'mega_mewtwo_x', 'gengar_mega'];
const isMegaForm = (key) => MEGA_FORM_KEYS.includes(key);

