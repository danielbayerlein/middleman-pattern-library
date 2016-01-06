/* eslint vars-on-top: 0, no-param-reassign: 0 */

/**
 * The MiddlemanPatternLibrary module provides the functionality for the
 * pattern library.
 *
 * @class MiddlemanPatternLibrary
 */
(function MiddlemanPatternLibrary() {
  /**
   * A helper method to loop over a NodeList (querySelectorAll)
   *
   * @param {NodeList} array - The NodeList that forEach is being applied to
   */
  var forEach = function forEach(array, callback, scope) {
    var i;

    for (i = 0; i < array.length; i++) {
      callback.call(scope, array[i]);
    }
  };

  /**
   * Determine the height of the iFrame element
   *
   * @param {HTMLElement} iframeEl - The iFrame element of determining the height
   * @return {string} Return the height of the iFrame element
   */
  var getHeightByIframeEl = function getHeightByIframeEl(iframeEl) {
    return iframeEl.contentWindow.document.documentElement.scrollHeight + 1 + 'px';
  };

  // Converts DIV elements with [data-iframe] into an iFrame element.
  var divElementsToReplace = document.querySelectorAll('[data-iframe]');
  forEach(divElementsToReplace, function forEachDivEl(divEl) {
    var parentNode = divEl.parentNode;
    var iframeEl = document.createElement('iframe');

    iframeEl.srcdoc = divEl.innerHTML;
    parentNode.insertBefore(iframeEl, divEl);
    parentNode.removeChild(divEl);
  });

  // Add a click event listener on tabs. If you click on a tab, the height of
  // the visible iframe is set.
  var tabElements = document.querySelectorAll('.mdl-layout__tab');
  forEach(tabElements, function forEachTabEl(tabEl) {
    tabEl.addEventListener('click', function click() {
      var _this = this;

      setTimeout(function setTimeout() {
        var selector = _this.getAttribute('href') + ' iframe';
        var iframeEl = document.querySelector(selector);
        iframeEl.style.height = getHeightByIframeEl(iframeEl);
      }, 100);
    });
  });

  // Set the correct CSS class for each color palette based on the background
  // color.
  var colorPaletteElements = document.querySelectorAll('.mpl-color-palette .mdl-card');
  forEach(colorPaletteElements, function forEachColorPaletteEl(colorPaletteEl) {
    var pattern = /^rgb\(([0-9]{1,3}), ([0-9]{1,3}), ([0-9]{1,3})\)$/;
    var result = pattern.exec(colorPaletteEl.style.backgroundColor);
    var brightness = Math.round(((result[1] * 299) + (result[2] * 587) + (result[3] * 114)) / 1000);

    if (brightness <= 125) {
      colorPaletteEl
        .querySelector('.mdl-card__title-text')
        .classList
        .add('mpl-lighten-87');

      colorPaletteEl
        .querySelector('.mdl-card__menu')
        .classList
        .add('mpl-lighten-54');
    }
  });

  // After the DOM is ready, the height of all iframes is set.
  document.onreadystatechange = function domReady() {
    var iFrameElements;

    if (document.readyState === 'complete') {
      iFrameElements = document.querySelectorAll('.mpl-layout__content iframe');
      forEach(iFrameElements, function forEachIframeEl(iframeEl) {
        iframeEl.style.height = getHeightByIframeEl(iframeEl);
      });
    }
  };

  // If you resize the window, the height of the visible iframe is set.
  window.addEventListener('resize', function resize() {
    var iframeEl;
    var selector;
    var activeTabEl = document.querySelector('.mdl-layout__tab.is-active');

    if (activeTabEl) {
      selector = activeTabEl.getAttribute('href') + ' iframe';
      iframeEl = document.querySelector(selector);
      iframeEl.style.height = getHeightByIframeEl(iframeEl);
    }
  });
})();
