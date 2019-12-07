/**
 * ドキュメントの読み込みが開始したら実行
 */
const docReady = () => {
  console.log('ok!');
};

/**
 * ドキュメントが読み込み終わったら実行
 */
const onLoad = () => {
};

/**
 * リサイズ時に実行
 */
const onResize = () => {
};

/**
 * スクロール時に実行
 */
const onScroll = () => {
  const _scroll = window.pageYOffset;
};

/**
 * Init
 */
const init = () => {
  "use strict";
  if (document.readyState !== 'loading') {
    docReady();
  } else {
    document.addEventListener('DOMContentLoaded', docReady, false);
  }
  window.addEventListener('load', onLoad, false);
  window.addEventListener('resize', onResize, false);
  window.addEventListener('scroll', onScroll, false);
};
init();
