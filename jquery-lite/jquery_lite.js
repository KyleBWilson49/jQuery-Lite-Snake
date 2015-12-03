(function () {
  var $l = window.$l = function (selector) {
    if (selector instanceof HTMLElement) {
      return new DOMNodeCollection([selector]);
    } else {
      var elementList = document.querySelectorAll(selector);
      return new DOMNodeCollection([].slice.call(elementList));
    }
  };

  function DOMNodeCollection (htmlElements) {
    this.htmlElements = htmlElements;
    return this;
  }

  DOMNodeCollection.prototype.html = function (string) {
    if (string === undefined) {
      return this.htmlElements[0].innerHTML;
    } else {
      this.htmlElements.forEach(function(el) {
        el.innerHTML = string;
      });
    }
  };

  DOMNodeCollection.prototype.empty = function () {
    this.html('');
  };

  DOMNodeCollection.prototype.append = function (arg) {
    this.htmlElements.forEach(function(el) {
      if (arg instanceof DOMNodeCollection) {
        arg.htmlElements.forEach(function(htmlEl) {
          el.appendChild(htmlEl);
        });
      } else {
        el.innerHTML += arg;
      }
    });
  };

  DOMNodeCollection.prototype.attr = function (searchAttribute, value) {
    var resultAttr;
    this.htmlElements.forEach(function (el) {
      if (!value && !resultAttr) {
        resultAttr = el.attributes[searchAttribute].value;
      } else {
        el.attributes[searchAttribute].value = value;
      }
    });
    return resultAttr;
  };

  DOMNodeCollection.prototype.addClass = function (classStr) {
    this.htmlElements.forEach(function (el) {
      el.classList.add(classStr);
    });
  };

  DOMNodeCollection.prototype.removeClass = function (classStr) {
    this.htmlElements.forEach(function (el) {
      el.classList.remove(classStr);
    });
  };

  DOMNodeCollection.prototype.children = function () {
    var childrenArray = [];
    this.htmlElements.forEach( function (el) {
      childrenArray.push(el.children);
    });
    return new DOMNodeCollection(childrenArray);
  };
}());
