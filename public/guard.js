(function () {
  'use strict';

  var ALLOWED = ['soulotherways.com', 'cdn.poehali.dev', 'functions.poehali.dev', 'fonts.googleapis.com', 'fonts.gstatic.com', 'localhost', '127.0.0.1', 'poehali.dev'];

  function hostOf(url) {
    try {
      return new URL(url, location.href).hostname;
    } catch (e) {
      return '';
    }
  }

  function allowed(url) {
    if (!url) return true;
    if (url.indexOf('data:') === 0 || url.indexOf('blob:') === 0) return true;
    var host = hostOf(url);
    if (!host) return true;
    for (var i = 0; i < ALLOWED.length; i++) {
      if (host === ALLOWED[i] || host.slice(-(ALLOWED[i].length + 1)) === '.' + ALLOWED[i]) return true;
    }
    return false;
  }

  var observer = new MutationObserver(function (records) {
    for (var i = 0; i < records.length; i++) {
      var nodes = records[i].addedNodes;
      for (var j = 0; j < nodes.length; j++) {
        var node = nodes[j];
        if (node.nodeType !== 1) continue;
        var tag = node.tagName;
        if (tag === 'SCRIPT' || tag === 'IFRAME' || tag === 'EMBED' || tag === 'OBJECT') {
          var src = node.src || node.getAttribute('data') || '';
          if (!allowed(src)) {
            node.remove();
          }
        }
      }
    }
  });

  observer.observe(document.documentElement, { childList: true, subtree: true });

  if (window.top !== window.self) {
    try {
      if (hostOf(document.referrer) !== location.hostname) {
        document.documentElement.innerHTML = '';
        window.top.location = window.self.location;
      }
    } catch (e) {
      document.documentElement.style.display = 'none';
    }
  }
})();
