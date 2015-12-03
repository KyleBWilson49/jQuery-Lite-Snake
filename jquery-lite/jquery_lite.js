(function () {
  var funcArray = [];

  document.onreadystatechange = function () {
    funcArray.forEach(function (fun) {
      fun();
    });
  };

  var $l = window.$l = function (argument) {
    if (argument instanceof HTMLElement) {
      return new DOMNodeCollection([argument]);

    } else if (typeof argument === 'function') {
        if (document.readyState !== 'interactive') {
          funcArray.push(argument);
        } else {
          argument();
        }

    } else {
      var elementList = document.querySelectorAll(argument);
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

  DOMNodeCollection.prototype.parent = function () {
    var parentArray = [];
    this.htmlElements.forEach(function(el) {
      parentArray.push(el.parentNode);
    });
    return new DOMNodeCollection(parentArray);
  };

  DOMNodeCollection.prototype.find = function (selector) {
    var matches = [];
    this.htmlElements.forEach(function (el) {
      matches = matches.concat([].slice.call(el.querySelectorAll(selector)));

    });
    return new DOMNodeCollection(matches);
  };

  DOMNodeCollection.prototype.remove = function () {
    this.htmlElements.forEach( function (el) {
      el.remove();
    });
  };

  DOMNodeCollection.prototype.on = function (type, listener) {
    this.htmlElements.forEach( function (el) {
      el.addEventListener(type, listener);
    });
  };

  DOMNodeCollection.prototype.off = function (type, listener) {
    this.htmlElements.forEach( function (el) {
      el.removeEventListener(type, listener);
    });
  };

  $l.extend = function () {
    var args = [].slice.call(arguments);
    var base = args[0];

    for (var i = 1; i < args.length; i++) {
      for (var attrname in args[i]) {
        base[attrname] = args[i][attrname];
      }
    }
    return base;
  };

  $l.ajax = function (options) {
    var defaults = {
      success: function (data, textStatus, jqXHR) {console.log(textStatus);},
      error: function (jqXHR, textStatus, errorThrown) {console.log(errorThrown);},
      url: window.location.href,
      method: 'GET',
      data: 'hello',
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
    };
    var option = this.extend(defaults, options);
    var xmlhttp = new XMLHttpRequest(option);

    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
       if(xmlhttp.status == 200){
        option.success(JSON.parse(xmlhttp.response), "success", xmlhttp);
       }'There was an error 400')
       else {
        option['error'](xmlhttp, 'failure', 'there was an error!');
       }
      }
    };

    xmlhttp.open(option['method'], option['url'], true);
    xmlhttp.send();
  };
}());
