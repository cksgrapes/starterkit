const Main = {
  init: () => {
    "use strict";
    if (document.readyState !== 'loading') {
      Main.docReady();
    } else {
      document.addEventListener('DOMContentLoaded', Main.docReady, false);
    }
    window.addEventListener('load', Main.onLoad, false);
    window.addEventListener('resize', Main.onResize, false);
    window.addEventListener('scroll', Main.onScroll, false);
  },
  docReady: () => {
    console.log('ok!');
    return null;
  },
  onLoad: () => {
    return null;
  },
  onResize: () => {
    return null;
  },
  onScroll: () => {
    const _scroll = window.pageYOffset;
    return null;
  }
};

Main.init();
