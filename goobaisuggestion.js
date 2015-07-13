
var language = window.navigator.userLanguage || window.navigator.language;
default_engine = "google";
if((/zh/i).test(language)){
	default_engine = "baidu" ;
}
suggest_engine = default_engine;	
selecting_engine = false;
redraw_pre = true;
(function() {
  var $ = window.goobai || {
    version : "1-1-0"
  };
  $.object = $.object || {};
  /**
   * @param {?} obj
   * @param {Object} properties
   * @return {undefined}
   */
  $.object.extend = function(obj, properties) {
    var prop;
    for (prop in properties) {
      if (properties.hasOwnProperty(prop)) {
        obj[prop] = properties[prop];
      }
    }
  };
  /** @type {function (?, Object): undefined} */
  $.extend = $.object.extend;
  $.hoverEngine = function(engine){
	if(suggest_engine=="baidu"){
	  document.getElementById("BaiduSel").className='enginebaidu_hover';  
	  document.getElementById("GoogleSel").className='enginegoogle'; 	  
	}else if(suggest_engine=="google"){
	  document.getElementById("BaiduSel").className='enginebaidu';  
	  document.getElementById("GoogleSel").className='enginegoogle_hover'; 	
	}
	else{
		return false;
	}
  
  }
  $.setEngine = function(engine,_Suggestion_,inputvalue){ //第二项传入用于listen和call功能的_Suggestion
    if(engine=="baidu"){
		suggest_engine = 'baidu';
		document.getElementById("BaiduSel").className='enginebaidu_hover';
		document.getElementById("GoogleSel").className='enginegoogle';	
		//suggestion_.dispose();
		redraw_pre = false;
		_Suggestion_.call("need_data",inputvalue);	
	}else if(engine=="google"){
		suggest_engine = 'google';
		document.getElementById("BaiduSel").className='enginebaidu';
		document.getElementById("GoogleSel").className='enginegoogle_hover';
		//suggestion_.dispose();
		redraw_pre = false;		
		_Suggestion_.call("need_data",inputvalue);	
	}else{
	  return false;
	}
  
  }
  $.finishSetEngine = function(){
    selecting_engine = false;
    if(suggest_engine=='baidu'){
		document.getElementById("BaiduSel").className='enginebaidu_selected';
		document.getElementById("GoogleSel").className='enginegoogle';	
	}else if(suggest_engine=='google'){
		document.getElementById("BaiduSel").className='enginebaidu';
		document.getElementById("GoogleSel").className='enginegoogle_selected';	
	}else{
		return false;
	}	
  }
  $.getElementsByClassName = function (className, tag, elm){
	if (document.getElementsByClassName) {
		getElementsByClassName = function (className, tag, elm) {
			elm = elm || document;
			var elements = elm.getElementsByClassName(className),
				nodeName = (tag)? new RegExp("\\b" + tag + "\\b", "i") : null,
				returnElements = [],
				current;
			for(var i=0, il=elements.length; i<il; i+=1){
				current = elements[i];
				if(!nodeName || nodeName.test(current.nodeName)) {
					returnElements.push(current);
				}
			}
			return returnElements;
		};
	}
	else if (document.evaluate) {
		getElementsByClassName = function (className, tag, elm) {
			tag = tag || "*";
			elm = elm || document;
			var classes = className.split(" "),
				classesToCheck = "",
				xhtmlNamespace = "http://www.w3.org/1999/xhtml",
				namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace)? xhtmlNamespace : null,
				returnElements = [],
				elements,
				node;
			for(var j=0, jl=classes.length; j<jl; j+=1){
				classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[j] + " ')]";
			}
			try	{
				elements = document.evaluate(".//" + tag + classesToCheck, elm, namespaceResolver, 0, null);
			}
			catch (e) {
				elements = document.evaluate(".//" + tag + classesToCheck, elm, null, 0, null);
			}
			while ((node = elements.iterateNext())) {
				returnElements.push(node);
			}
			return returnElements;
		};
	}
	else {
		getElementsByClassName = function (className, tag, elm) {
			tag = tag || "*";
			elm = elm || document;
			var classes = className.split(" "),
				classesToCheck = [],
				elements = (tag === "*" && elm.all)? elm.all : elm.getElementsByTagName(tag),
				current,
				returnElements = [],
				match;
			for(var k=0, kl=classes.length; k<kl; k+=1){
				classesToCheck.push(new RegExp("(^|\\s)" + classes[k] + "(\\s|$)"));
			}
			for(var l=0, ll=elements.length; l<ll; l+=1){
				current = elements[l];
				match = false;
				for(var m=0, ml=classesToCheck.length; m<ml; m+=1){
					match = classesToCheck[m].test(current.className);
					if (!match) {
						break;
					}
				}
				if (match) {
					returnElements.push(current);
				}
			}
			return returnElements;
		};
	}
	return getElementsByClassName(className, tag, elm);
  };
  $.dom = $.dom || {};
  /**
   * @param {?} obj
   * @return {?}
   */
  $.dom.g = function(obj) {
    if ("string" == typeof obj || obj instanceof String) {
      return document.getElementById(obj);
    } else {
      if (obj && (obj.nodeName && (obj.nodeType == 1 || obj.nodeType == 9))) {
        return obj;
      }
    }
    return null;
  };
  /** @type {function (?): ?} */
  $.g = $.G = $.dom.g;
  /**
   * @param {?} el
   * @return {?}
   */
  $.dom.getDocument = function(el) {
    el = $.dom.g(el);
    return el.nodeType == 9 ? el : el.ownerDocument || el.document;
  };
  $.dom._styleFixer = $.dom._styleFixer || {};
  $.dom._styleFilter = $.dom._styleFilter || [];
  /**
   * @param {string} selector
   * @param {?} event
   * @param {string} prop
   * @return {?}
   */
  $.dom._styleFilter.filter = function(selector, event, prop) {
    /** @type {number} */
    var eventPathIndex = 0;
    var eventPath = $.dom._styleFilter;
    var cur;
    for (;cur = eventPath[eventPathIndex];eventPathIndex++) {
      if (cur = cur[prop]) {
        event = cur(selector, event);
      }
    }
    return event;
  };
  $.string = $.string || {};
  /**
   * @param {string} str
   * @return {?}
   */
  $.string.toCamelCase = function(str) {
    return String(str).replace(/[-_]\D/g, function(charsetPart) {
      return charsetPart.charAt(1).toUpperCase();
    });
  };
  /**
   * @param {Object} el
   * @param {string} property
   * @return {?}
   */
  $.dom.getStyle = function(el, property) {
    var options = $.dom;
    el = options.g(el);
    property = $.string.toCamelCase(property);
    var y = el.style[property];
    if (y) {
      return y;
    }
    var arr = options._styleFixer[property];
    var camelKey = el.currentStyle || ($.browser.ie ? el.style : getComputedStyle(el, null));
    y = "object" == typeof arr && arr.get ? arr.get(el, camelKey) : camelKey[arr || property];
    if (arr = options._styleFilter) {
      y = arr.filter(property, y, "get");
    }
    return y;
  };
  /** @type {function (Object, string): ?} */
  $.getStyle = $.dom.getStyle;
  $.browser = $.browser || {};
  if (/msie (\d+\.\d)/i.test(navigator.userAgent)) {
    /** @type {number} */
    $.ie = $.browser.ie = parseFloat(RegExp.$1);
  }
  if (/opera\/(\d+\.\d)/i.test(navigator.userAgent)) {
    /** @type {number} */
    $.browser.opera = parseFloat(RegExp.$1);
  }
  /** @type {boolean} */
  $.browser.isWebkit = /webkit/i.test(navigator.userAgent);
  /** @type {boolean} */
  $.browser.isGecko = /gecko/i.test(navigator.userAgent) && !/like gecko/i.test(navigator.userAgent);
  /** @type {boolean} */
  $.browser.isStrict = document.compatMode == "CSS1Compat";
  /**
   * @param {Object} el
   * @return {?}
   */
  $.dom.getPosition = function(el) {
    var doc = $.dom.getDocument(el);
    var browser = $.browser;
    el = $.dom.g(el);
    var BUGGY_GECKO_BOX_OBJECT = browser.isGecko > 0 && (doc.getBoxObjectFor && ($.dom.getStyle(el, "position") == "absolute" && (el.style.top === "" || el.style.left === "")));
    var pos = {
      left : 0,
      top : 0
    };
    var viewportElement = browser.ie && !browser.isStrict ? doc.body : doc.documentElement;
    if (el == viewportElement) {
      return pos;
    }
    /** @type {null} */
    var parent = null;
    var box;
    if (el.getBoundingClientRect) {
      box = el.getBoundingClientRect();
      /** @type {number} */
      pos.left = Math.floor(box.left) + Math.max(doc.documentElement.scrollLeft, doc.body.scrollLeft);
      /** @type {number} */
      pos.top = Math.floor(box.top) + Math.max(doc.documentElement.scrollTop, doc.body.scrollTop);
      pos.left -= doc.documentElement.clientLeft;
      pos.top -= doc.documentElement.clientTop;
      if (browser.ie && !browser.isStrict) {
        pos.left -= 2;
        pos.top -= 2;
      }
    } else {
      if (doc.getBoxObjectFor && !BUGGY_GECKO_BOX_OBJECT) {
        box = doc.getBoxObjectFor(el);
        var vpBox = doc.getBoxObjectFor(viewportElement);
        /** @type {number} */
        pos.left = box.screenX - vpBox.screenX;
        /** @type {number} */
        pos.top = box.screenY - vpBox.screenY;
      } else {
        /** @type {Object} */
        parent = el;
        do {
          pos.left += parent.offsetLeft;
          pos.top += parent.offsetTop;
          if (browser.isWebkit > 0 && $.dom.getStyle(parent, "position") == "fixed") {
            pos.left += doc.body.scrollLeft;
            pos.top += doc.body.scrollTop;
            break;
          }
          parent = parent.offsetParent;
        } while (parent && parent != el);
        if (browser.opera > 0 || browser.isWebkit > 0 && $.dom.getStyle(el, "position") == "absolute") {
          pos.top -= doc.body.offsetTop;
        }
        parent = el.offsetParent;
        for (;parent && parent != doc.body;) {
          pos.left -= parent.scrollLeft;
          if (!b.opera || parent.tagName != "TR") {
            pos.top -= parent.scrollTop;
          }
          parent = parent.offsetParent;
        }
      }
    }
    return pos;
  };
  $.event = $.event || {};
  /**
   * @return {undefined}
   */
  $.event._unload = function() {
    var tokenized = $.event._listeners;
    var index = tokenized.length;
    /** @type {boolean} */
    var D = !!window.removeEventListener;
    var e;
    var element;
    for (;index--;) {
      e = tokenized[index];
      element = e[0];
      if (element.removeEventListener) {
        element.removeEventListener(e[1], e[3], false);
      } else {
        if (element.detachEvent) {
          element.detachEvent("on" + e[1], e[3]);
        }
      }
    }
    if (D) {
      window.removeEventListener("unload", $.event._unload, false);
    } else {
      window.detachEvent("onunload", $.event._unload);
    }
  };
  if (window.attachEvent) {
    window.attachEvent("onunload", $.event._unload);
  } else {
    window.addEventListener("unload", $.event._unload, false);
  }
  $.event._listeners = $.event._listeners || [];
  /**
   * @param {Object} el
   * @param {string} type
   * @param {Function} fn
   * @return {?}
   */
  $.event.on = function(el, type, fn) {
    type = type.replace(/^on/i, "");
    if ("string" == typeof el) {
      el = $.dom.g(el);
    }
    /**
     * @param {?} Class
     * @return {undefined}
     */
    var fHandler = function(Class) {
      fn.call(el, Class);
    };
    var listenersArr = $.event._listeners;
    /** @type {Array} */
    listenersArr[listenersArr.length] = [el, type, fn, fHandler];
    if (el.attachEvent) {
      el.attachEvent("on" + type, fHandler);
    } else {
      if (el.addEventListener) {
        el.addEventListener(type, fHandler, false);
      }
    }
    return el;
  };
  /** @type {function (Object, string, Function): ?} */
  $.on = $.event.on;
  /**
   * @param {Object} e
   * @return {undefined}
   */
  $.event.preventDefault = function(e) {
    if (e.preventDefault) {
      e.preventDefault();
    } else {
      /** @type {boolean} */
      e.returnValue = false;
    }
  };
  $.ui = $.ui || {};
  $.suggestion = $.ui.suggestion = $.ui.suggestion || {};
  (function() {
    var elements = {};
    /**
     * @param {Function} listener
     * @return {undefined}
     */
    var on = function(listener) {
      var sounds = {};
      /**
       * @param {string} src
       * @param {Function} func
       * @return {?} 一个src 包含了多个函数
       */
      listener.listen = function(src, func) {
        sounds[src] = sounds[src] || [];
        /** @type {number} */
        var i = 0;
        for (;i < sounds[src].length && sounds[src][i] != func;) {
          i++;
        }
        if (i == sounds[src].length) {
          sounds[src].push(func);
        }
        return listener;
      };
      /**
       * @param {string} name
       * @return {?} 一个src(name) 包含了多个函数	一起调用  
       */
      listener.call = function(name) {
        if (sounds[name]) {
          /** @type {number} */
          var i = 0;
          for (;i < sounds[name].length;i++) {
            sounds[name][i].apply(this, Array.prototype.slice.call(arguments, 1));
          }
        }
        return listener;
      };
    };
    /**
     * @param {?} obj
     * @return {?}
     */
    elements.extend = function(obj) {
      new on(obj); //之后obj就有储存多个函数并同时调用的能力了 不要new也没关系
      return obj;
    };
    elements.extend(elements);
    $.suggestion._Central = elements; //$.suggestion._Central具有此能力，作为listener使用
  })();
  /**
   * @param {Function} fn
   * @param {Node} parent
   * @param {?} res
   * @param {?} proceed
   * @param {Object} self
   * @return {?}
   */
  $.ui.suggestion._Div = function(fn, parent, res, proceed, self) {//parent:input
    /**
     * @param {number} recurring
     * @param {?} items
     * @return {undefined}
     */
    function save(recurring, items) {
      if (element.style.display == "none") {//如果丢失聚焦，再次聚焦并不会弹出，但是按下方向键就能弹出。因为调动了save
		console.log("need_data called in save");
		redraw_pre = false //true; //并不想不redraw，保险起见，除了切换引擎时把redraw_pre调成false，其他一律设为true
        fn.call("need_data", res.getValue());
        return;
      }
      var val = callback()[0];
	  console.log("Previous val:"+val);
      set(); //这个set和下方的set功能是丢失前一个选择，都需要
      if (recurring) {//向上
        if (val == 0) { //从第一个结果按上方向键跳转到选择搜索引擎的时候
          filter(items);
		  //document.getElementById("BaiduSel").className='enginebaidu_hover';
		  $.hoverEngine();
		  selecting_engine = true;		  
          val--;
          return;
        }	  
        if (val == -1) { //从选择搜索引擎向上跳到输入栏
          filter(items);
          val--;
		  console.log("Now val:"+val);
          return;
        }
        if (val == -2) {//初始聚焦状态改为-2 谷歌百度选择栏状态为-1 
          val = obj.length;//如果按了上键盘，则从下方开始聚焦
        }
        val--;
		console.log("Now val:"+val);		
      } else {//向下
        if (val == obj.length - 1) { //到底了 重新开始
          filter(items);
          /** @type {number} */
          val = -2;
		  console.log("Now val:"+val);
          return;
        }
        if (val == -2) { 
          filter(items);
		  //document.getElementById("BaiduSel").className='enginebaidu_hover';
		  $.hoverEngine();
		  selecting_engine = true;			  
          val++;
          return;
        }			
        val++;
		console.log("Now val:"+val);		
      }
      func(val); //能够上下移动,实质是改变元素的class和颜色。这个class很重要，因为callback函数通过它来判断目前选定哪个函数了。
      empty();
      var onComplete = res.getValue();
      filter(val); //能够把选定的搜索提示拷贝到输入框里
      var value = callback();
      self.onpick(onComplete, value[0], value[1], value[2]);
    }
    /**
     * @return {undefined}
     */
    function set() {
      /** @type {number} */
      var i = 0;
      for (;i < codeSegments.length;i++) {
        /** @type {string} */
        codeSegments[i].className = prefix + "ml";
      }
	  /*if(suggest_engine=="baidu"){
		document.getElementById("BaiduSel").className = 'enginebaidu_selected';
		document.getElementById("GoogleSel").className = 'enginegoogle';
	  }
	  if(suggest_engine=="google"){
		document.getElementById("BaiduSel").className = 'enginebaidu';
		document.getElementById("GoogleSel").className = 'enginegoogle_selected';
	  }
	  selecting_engine = false;	*/
	  $.finishSetEngine();
    }
    /**
     * @return {?}
     */
    function callback() {
      if (codeSegments && element.style.display != "none") {
        /** @type {number} */
        var i = 0;
        for (;i < codeSegments.length;i++) {
          if (codeSegments[i].className == prefix + "mo") {
            return[i, obj[i], safe[i]];
          }
        }
		if(document.getElementById("BaiduSel").className=='enginebaidu_hover'||document.getElementById("GoogleSel").className == 'enginegoogle_hover'){
			return[-1,""];
		}		
      }
      return[-2, ""];
    }
    /**
     * @return {undefined}
     */
    function empty() {
      var value = callback();
      self.onhighlight(res.getValue(), value[0], value[1], value[2]);
    }
    /**
     * @param {?} i
     * @return {undefined}
     */
    function func(i) {
      set();
      /** @type {string} */
	  if(i>=0)
      codeSegments[i].className = prefix + "mo";
    }
    /**
     * @param {?} val
     * @return {undefined}
     */
    function filter(val) {
      var name = obj && (typeof val == "number" && typeof obj[val] != "undefined") ? obj[val] : val;
	  console.log("pick_word");
	  console.log(name);
      fn.call("pick_word", name);
    }
    /**
     * @return {?}
     */
    function hide() {//隐藏搜索提示，这里的element是底下创造的新div
      if (element.style.display == "none") {
        return null;
      }
      /** @type {string} */
      iframe.style.display = element.style.display = "none";
	  console.log("Hiding,Element:");
	  console.log(element);
      self.onhide();
    }
    /**
     * @param {number} size
     * @return {?}
     */
    function load(size) {
      /** @type {number} */
      var i = size;
      return function() {
        fn.call("confirm_item", res.getValue(), obj[i], i, safe[i]);
        var onComplete = res.getValue();
        filter(obj[i]);
        self.onpick(onComplete, i, obj[i], safe[i]);
        self.onconfirm(res.getValue(), i, obj[i], safe[i]);
        hide();
      };
    }
    var r20 = this;
    var h;
    var obj;
    var safe;
    var doneResults;
    var prefix = self.class_prefix;
    var codeSegments;
    /** @type {Element} */
    var element = document.createElement("DIV");
    element.id = prefix + (new Date).getTime();
    /** @type {string} */
    element.className = prefix + "wpr";
    /** @type {string} */
    element.style.display = "none";
    /** @type {Element} */
    var iframe = document.createElement("IFRAME");
    /** @type {string} */
    iframe.className = prefix + "sd";
    /** @type {string} */
    iframe.style.display = "none";
    /** @type {string} */
    iframe.style.position = "absolute";
    /** @type {string} */
    iframe.style.borderWidth = "0px";
    if (self.apd_body) {
      document.body.appendChild(element);
    } else {
      parent.parentNode.appendChild(element);
    }
    element.parentNode.insertBefore(iframe, element);
    fn.listen("start", function() {
	  $.on(parent,"blur",function(e){
		console.log("input blur by");
		console.log(document.activeElement);
	  });
      $.on(document, "mousedown", function(e) {
        e = e || window.event;
        var node = e.target || e.srcElement;
		//console.log(parent);
		if(node.id=="BaiduSel"){
			$.event.preventDefault(e);
			$.setEngine("baidu",fn,parent.value);
			parent.focus();
			return;
		}else if(node.id=="GoogleSel") {
			$.event.preventDefault(e);		
			$.setEngine("google",fn,parent.value);
			console.log(parent);
			parent.focus();	
			console.log(document.activeElement);
			return;
		}
        if (node == parent) {
          return;
        }
        for (;node = node.parentNode;) {
          if (node == element) {
            return;
          }
        }
        hide();
      });
      $.on(window, "blur", hide);
    });
    fn.listen("key_enter", function() {
      var value = callback();
      var isError = value[0] == -1 ? doneResults : value[1];
      self.onconfirm(res.getValue(), value[0], isError, value[2], true);
      hide();
    });
    fn.listen("key_up", function(content) {
      save(1, content);
    });
    fn.listen("key_down", function(content) {
      save(0, content);
    });
    fn.listen("key_tab", hide);
    fn.listen("key_esc", hide);
    fn.listen("all_clear", hide);
    fn.listen("data_ready", function(dataAndEvents, data ) { //dataAndEvents 用户搜索的内容，此处并未调用。data是百度返回内容。注意data_ready写在_Div里
      /** @type {Array} */
      doneResults = data;
      /** @type {Array} */
      obj = [];
      /** @type {Array} */
      safe = [];
      /** @type {number} */
      var i = 0;
      var ln = data.length;
      for (;i < ln;i++) {
        if (typeof data[i].input != "undefined") { //其实data[i].input和data[i].selection内容完全相同。从之前赋值情况可以看到。
          obj[i] = data[i].input;
          safe[i] = data[i].selection;
        } else {
          safe[i] = obj[i] = data[i];
        }
      }
      if (obj.length != 0) {
        codeSegments = proceed(element, safe, r20 ); //调用self._draw函数绘制提示 r20是$.ui.suggestion，并未被调用。
        /** @type {number} */
        i = 0;
        ln = codeSegments.length;
        for (;i < ln;i++) {//一系列鼠标控制事件
          $.on(codeSegments[i], "mouseover", function() {
            set();
            /** @type {string} */
            this.className = prefix + "mo";
            empty();
          });
          $.on(codeSegments[i], "mouseout", set);
          $.on(codeSegments[i], "mousedown", function(event) {
            fn.call("mousedown_item");
            if (!$.ie) {
              event.stopPropagation();
              event.preventDefault();
              return false;
            }
          });
          $.on(codeSegments[i], "click", load(i));
        }
      } else {
        hide();
      }
    });
    return{
      element : element,
      shade : iframe,
      /** @type {function (?): undefined} */
      pick : filter,
      /** @type {function (?): undefined} */
      highlight : func,
      /** @type {function (): ?} */
      hide : hide,
      /**
       * @return {undefined}
       */
      dispose : function() {
        element.parentNode.removeChild(element);
      }
    };
  };
  /**
   * @param {Function} callback
   * @param {?} i
   * @return {?}
   */
  $.ui.suggestion._Data = function(callback, i) {//callback传入的是v,即$.suggestion._Central.extend(self); 
    var C = this;
    var object = {};
    callback.listen("response_data", function(data, value,data_ready) { //data代表请求(搜索)内容，value代表返回结果
      object[suggest_engine+data] = value; //代表一种缓存功能，下方的object[key]的和此处的都作用于上方的object = {}
      callback.call("data_ready", data, value,data_ready); //data_ready才是这一系列函数最终触发显示的函数
    });
    callback.listen("need_data", function(key) {
      if (typeof object[suggest_engine+key] == "undefined") {
        i(key);//发出数据请求
      } else {
        callback.call("data_ready", key, object[suggest_engine+key]); //从缓存里读取结果并触发显示
      }
    });
    return{};
  };
  /**
   * @param {Function} src
   * @param {Element} el
   * @param {?} dataAndEvents
   * @return {?}
   */
  $.ui.suggestion._InputWatcher = function(src, el, dataAndEvents) {
    var F = this;
    var tref;
    /** @type {number} */
    var scrollIntervalId = 0;
    /** @type {string} */
    var text = "";
    /** @type {string} */
    var r = "";
    /** @type {string} */
    var value = "";
    var right;
    /** @type {boolean} */
    var I = false;
    /** @type {boolean} */
    var N = false;
    /** @type {boolean} */
    var B = false;
	console.log("B=false");
    el.setAttribute("autocomplete", "off");
    $.on(el, "keydown", function(e) {
	  console.log("keydown");
      if (!B) {
		console.log('keydown calling');
        src.call("start"); //在首次键盘敲击输入框的时候初始化start 注意:只初始化一次，之后通过setInterval不断探测输入变化
        /** @type {boolean} */
        B = true;
		console.log("B=true,set by keydown");
      }
      e = e || window.event;
	  console.log(e.target);
      var i;
      switch(e.keyCode) {
        case 9:
          /** @type {string} */
          i = "tab";
          break;
        case 27:
          /** @type {string} */
          i = "esc";
          break;
        case 13:
          /** @type {string} */
          i = "enter";
          break;
        case 38:
          /** @type {string} */
          i = "up";
          $.event.preventDefault(e);
          break;
        case 40:
          /** @type {string} */
          i = "down";
      }
      if (i) {
		//console.log(src);
        src.call("key_" + i, r); //检测到特殊键盘敲击，调用$.ui.suggestion._Div里注册的一堆函数
      }
	  if(selecting_engine==true){
		if(e.keyCode==37){//left
			$.event.preventDefault(e); //禁止文本框的光标移动，下同
			if(default_engine=="baidu"){		
			  $.setEngine("baidu",src,el.value);
			}else if(default_engine=="google"){		
			  $.setEngine("google",src,el.value);			
			}
		}else if(e.keyCode==39){//Right
			$.event.preventDefault(e);
			if(default_engine=="baidu"){
			  $.setEngine("google",src,el.value);
			}else if(default_engine=="google"){
			  $.setEngine("baidu",src,el.value);			
			}
		}
	  }
    });
    $.on(el, "mousedown", function() {
		console.log('mousedown');
      if (!B) {
		console.log('mousedown calling');
        src.call("start");//在首次鼠标点击输入框的时候初始化start 注意:只初始化一次，之后通过setInterval不断探测输入变化
        /** @type {boolean} */
        B = true;
		console.log("B=true,set by keydown");
      }
    });
    $.on(el, "beforedeactivate", function() {
      if (I) {
        /** @type {boolean} */
        window.event.cancelBubble = true;
        /** @type {boolean} */
        window.event.returnValue = false;
      }
    });
    src.listen("start", function() {//start作用是读取当时的输入框里的值，并call need_data
      value = el.value;
	  console.log("start called, el.value:"+value);
	  //clearInterval(scrollIntervalId); //zbydown edited
      /** @type {number} */
      scrollIntervalId = setInterval(function() { //setInterval循环探测是否有输入框的内容修改
		//console.log("in interval");
		//console.log(suggestion);
        if (N) {
          return;
        }
        if ($.G(el) == null) {
          suggestion.dispose();
        }
        var val = el.value;
        if (val == text && (val != "" && (val != value && val != right))) {
          if (tref == 0) {
            /** @type {number} */
            tref = setTimeout(function() {
			  //redraw_pre = false; //并不想不redraw，保险起见，除了切换引擎时把redraw_pre调成false，其他一律设为true			
			  console.log("need_data called in start");
              src.call("need_data", val);
            }, 100);
          }
        } else {
          clearTimeout(tref);
          /** @type {number} */
          tref = 0;
          if (val == "" && text != "") {
            /** @type {string} */
            right = "";
            src.call("all_clear");
          }
          text = val;
          if (val != right) {
            r = val;
          }
          if (value != el.value) {
            /** @type {string} */
            value = "";
          }
        }
      }, 10);
    });
    src.listen("pick_word", function(value) {
      if (I) {
        el.blur();
      }
      el.value = right = value;
      if (I) {
        el.focus();
      }
    });
    src.listen("mousedown_item", function(dataAndEvents) {
      /** @type {boolean} */
      I = true;
      /** @type {boolean} */
      N = true;
      setTimeout(function() {
        /** @type {boolean} */
        N = false;
        /** @type {boolean} */
        I = false;
      }, 500);
    });
    src.listen("confirm_item", function(dataAndEvents, deepDataAndEvents, textAlt, ignoreMethodDoesntExist) {
      /** @type {boolean} */
      N = false;
      r = text = textAlt;
    });
    return{
      /**
       * @return {?}
       */
      getValue : function() {
        return el.value;
      },
      /**
       * @return {undefined}
       */
      dispose : function() {
        clearInterval(scrollIntervalId);
      }
    };
  };
  /**
   * @param {Element} elem
   * @param {Object} attributes
   * @return {?}
   */
  $.ui.suggestion._Suggestion = function(elem, attributes) {
    var self = this;
    var _MessageDispatcher = $.ui.suggestion._MessageDispatcher;
    self.options = {
      /**
       * @return {undefined}
       */
      onpick : function() {
      },
      /**
       * @return {undefined}
       */
      onconfirm : function() {
      },
      /**
       * @return {undefined}
       */
      onhighlight : function() {
      },
      /**
       * @return {undefined}
       */
      onhide : function() {
      },
      view : null,
      getData : false,
      prepend_html : "",
      append_html : "",
      class_prefix : "tangram_sug_",
      apd_body : false
    };
    $.extend(self.options, attributes);
    if (!(elem = $.G(elem))) {
      return null;
    }
    /** @type {Element} */
    self.inputElement = elem;
    if (elem.id) {
      self.options._inputId = elem.id;
    } else {
      /** @type {string} */
      elem.id = self.options._inputId = self.options.class_prefix + "ipt" + (new Date).getTime();
    }
    /**
     * @param {boolean} dataAndEvents
     * @return {undefined}
     */
    self._adjustPos = function(dataAndEvents) {
      var el = options.element;
      var opts = options.shade;
      /** @type {HTMLDocument} */
      var doc = document;
      /** @type {(Element|null)} */
      var canvas = doc.compatMode == "BackCompat" ? doc.body : doc.documentElement;
      /** @type {number} */
      var viewportHeight = canvas.clientHeight;
      /** @type {number} */
      var viewportWidth = canvas.clientWidth;
      if (el.style.display == "none" && dataAndEvents) {
        return;
      }
      var offset = $.dom.getPosition(elem);
      /** @type {Array} */
      var item = [offset.top + elem.offsetHeight - 1, offset.left, elem.offsetWidth];
      item = typeof self.options.view == "function" ? self.options.view(item) : item;
      /** @type {string} */
      el.style.display = opts.style.display = "block";
      opts.style.top = item[0] + "px";
      opts.style.left = item[1] + "px";
      opts.style.width = item[2] + "px";
      /** @type {number} */
      var size = parseFloat($.getStyle(el, "marginTop")) || 0;
      /** @type {number} */
      var dx = parseFloat($.getStyle(el, "marginLeft")) || 0;
      /** @type {string} */
      el.style.top = item[0] - size + "px";
      /** @type {string} */
      el.style.left = item[1] - dx + "px";
      if ($.ie && document.compatMode == "BackCompat") {
        el.style.width = item[2] + "px";
      } else {
        /** @type {number} */
        var index = parseFloat($.getStyle(el, "borderLeftWidth")) || 0;
        /** @type {number} */
        var stringLength = parseFloat($.getStyle(el, "borderRightWidth")) || 0;
        /** @type {number} */
        var dy = parseFloat($.getStyle(el, "marginRight")) || 0;
        /** @type {string} */
        el.style.width = item[2] - index - stringLength - dx - dy + "px";
      }
      /** @type {string} */
      opts.style.height = el.offsetHeight + "px";
      if (viewportHeight != canvas.clientHeight || viewportWidth != canvas.clientWidth) {
        self._adjustPos();
      }
    };
    /**
     * @param {Element} form
     * @param {Array} values
     * @return {?}
     */
    self._draw = function(form, values , r20 ) {
	  //redraw_pre = redraw_pre||true;
      /** @type {Array} */
      var assigns = [];
      /** @type {Element} */
      var table = document.createElement("TABLE");
      /** @type {number} */
      table.cellPadding = 2;
      /** @type {number} */
      table.cellSpacing = 0;
      /** @type {Element} */
      var thead = document.createElement("TBODY");
      table.appendChild(thead);
      /** @type {number} */
      var i = 0;
      var valuesLen = values.length;
      for (;i < valuesLen;i++) {
        var vvar = thead.insertRow(-1);
        assigns.push(vvar);
        var el = vvar.insertCell(-1);
        el.innerHTML = values[i];
      }
	  if(redraw_pre==true){
		  /** @type {Element} */
		  var div = document.createElement("DIV");
		  /** @type {string} */
		  div.className = self.options.class_prefix + "pre";

		  div.innerHTML = self.options.prepend_html;
		  /** @type {Element} */
	  }else if (redraw_pre==false){
		  var div = $.getElementsByClassName(self.options.class_prefix+'pre', 'div', form)[0];
		  console.log(div)
	  }
      var div2 = document.createElement("DIV");
      /** @type {string} */
      div2.className = self.options.class_prefix + "app";
      div2.innerHTML = self.options.append_html;
      /** @type {string} */
      form.innerHTML = "";
      form.appendChild(div);
      form.appendChild(table);
      form.appendChild(div2);
      self._adjustPos();
	  redraw_pre = false;
      return assigns;
    };
    var v = $.suggestion._Central.extend(self);//self具有listen和call的能力
    var datetmp = new $.ui.suggestion._Data(v, self.options.getData); //在need_data被call时发出数据请求，并注册了response_data response_data的能力
    var d = new $.ui.suggestion._InputWatcher(v, elem, options); //拥有监视键盘动作的能力
    var options = new $.ui.suggestion._Div(v, elem, d, self._draw, self.options);  //处理弹出和之后的动作
    v.listen("start", function() {
      setInterval(function() {//start触发后同时被call 目的是调整位置
		//console.log("In another Interval");
        var div = options.element;
        if (div.offsetWidth != 0 && elem.offsetWidth != div.offsetWidth) {
          self._adjustPos();
        }
      }, 100);
      $.on(window, "resize", function() {
        self._adjustPos(true);
      });
    });
    return{
      pick : options.pick,
      hide : options.hide,
      highlight : options.highlight,
      /**
       * @return {?}
       */
      getElement : function() {
        return options.element;
      },
      getData : self.options.getData,
      /**
       * @param {?} param
       * @param {Array} arg
       * @return {undefined}
       */
      giveData : function(param, arg) {  //param代表请求内容 arg代表返回结果
        v.call("response_data", param, arg);
      },
      /**
       * @return {undefined}
       */
      dispose : function() {
        options.dispose();
        d.dispose();
      }
    };
  };
  /**
   * @param {string} var_args
   * @param {Function} minutes
   * @return {?}
   */
  $.ui.suggestion.create = function(var_args, minutes) {
    return new $.ui.suggestion._Suggestion(var_args, minutes);
  };
  window.goobai = $;
})();
var goobaiSuggestion = function() {
  /**
   * @param {string} str
   * @return {?}
   */
  function eval(str) {
    return document.createElement(str);
  }
  /**
   * @param {(RegExp|string)} other
   * @param {Object} style
   * @param {Function} f
   * @param {Object} value
   * @return {?}
   */
  function init(other, style, f, value) {
    if (!other) {
      return;
    }
    if (typeof other == "string" || other instanceof String) {
      other = goobai.G(other);
    }
    if (!other.sugId) {
      /** @type {number} */
      other.sugId = (new Date).getTime();
    }
    if (cache["sug" + other.sugId]) {
      return false;
    }
    if (style == null) {
      /** @type {Array} */
      style = [];
    } else {
      value = style.sugSubmit;
      var color = style.fontColor ? style.fontColor : "#000";
      var W = style.fontSize ? style.fontSize : "14px";
      var verdana = style.fontFamily ? style.fontFamily : "verdana";
      var U = style.bgcolorHI ? style.bgcolorHI : "#36c";
      var FFF = style.fontColorHI ? style.fontColorHI : "#FFF";
      var Y = style.borderColor ? style.borderColor : "#817f82";
      animate(".bdSug_wpr", "border:1px solid " + Y + ";position:absolute;z-index:9;top:28px;left:0;color:" + color);
      animate(".bdSug_wpr td", "font-size:" + W + ";font-family:" + verdana);
      animate(".bdSug_mo", "background-color:" + U + ";color:" + FFF);
    }
    if (css(document.body, "position") == "relative" || css(document.body, "position") == "absolute") {
      var pos = getOffset(document.body);
      style.XOffset = (style.XOffset ? parseInt(style.XOffset) : 0) + pos.x;
      style.YOffset = (style.YOffset ? parseInt(style.YOffset) : 0) + pos.y;
    }
    cache["sug" + other.sugId] = goobai.suggestion.create(other, doc.createSugOptions(other.sugId, style, f, value ? update(other) : null)); //cache产生了新的$.ui.suggestion._Suggestion
	//console.log("cache created");
    callbacks["give" + other.sugId] = doc.createSugCallback(other.sugId); //新script调用的就是这个callback，把收到的数据整理后激活givedata
  }
  /**
   * @param {Node} val
   * @return {?}
   */
  function update(val) {
    /** @type {Node} */
    var el = val;
    for (;el != document.body && el.tagName != "FORM";) {
      el = el.parentNode;
    }
    return el.tagName == "FORM" ? el : null;
  }
  /**
   * @param {Object} el
   * @return {?}
   */
  function getOffset(el) {
    /** @type {HTMLDocument} */
    var doc = document;
    /** @type {number} */
    var left = 0;
    /** @type {number} */
    var yPos = 0;
    if (el.getBoundingClientRect) {
      var otherElementRect = el.getBoundingClientRect();
      left = otherElementRect.left + Math.max(doc.documentElement.scrollLeft, doc.body.scrollLeft);
      yPos = otherElementRect.top + Math.max(doc.documentElement.scrollTop, doc.body.scrollTop);
      left -= doc.documentElement.clientLeft;
      yPos -= doc.documentElement.clientTop;
    } else {
      for (;el = el.offsetParent;) {
        left += el.offsetLeft;
        yPos += el.offsetTop;
      }
    }
    return{
      x : left,
      y : yPos
    };
  }
  /**
   * @param {string} selector
   * @param {string} css
   * @return {undefined}
   */
  function animate(selector, css) { //对selector插入css属性，注意这些属性并不显示在style中
    /** @type {(StyleSheetList|null)} */
    var stylesheet = document.styleSheets;
    if (!stylesheet || stylesheet.length <= 0) {
      /** @type {Element} */
      var s = document.createElement("STYLE");
      /** @type {string} */
      s.type = "text/css";
      var svg = document.getElementsByTagName("HEAD")[0];
      svg.appendChild(s);
    }
    /** @type {(StyleSheetList|null)} */
    stylesheet = document.styleSheets;
    stylesheet = stylesheet[stylesheet.length - 1];
    if (goobai.ie) {
      stylesheet.addRule(selector, css);
    } else {
      stylesheet.insertRule(selector + " { " + css + " }", stylesheet.cssRules.length);
    }
  }
  /**
   * @param {Object} element
   * @param {string} key
   * @param {(boolean|number|string)} value
   * @return {?}
   */
  function css(element, key, value) {//作用value存在时设置element元素的key的value，不存在的时候读取
    if (!element) {
      return;
    }
    if (value != undefined) {
      /** @type {(boolean|number|string)} */
      element.style[key] = value;
    } else {
      if (element.style[key]) {
        return element.style[key];
      } else {
        if (element.currentStyle) {
          return element.currentStyle[key]; //FOR IE
        } else {
          if (document.defaultView && document.defaultView.getComputedStyle) {
            key = key.replace(/([A-Z])/g, "-$1").toLowerCase();
            var computedStyle = document.defaultView.getComputedStyle(element, "");
            return computedStyle && computedStyle.getPropertyValue(key) || "";
          }
        }
      }
    }
  }
  /**
   * @return {undefined}
   */
  function scrollDown() {
    animate(".bdSug_wpr", "line-height:normal;background:#FFF;padding:0;margin:0;border:1px solid #817F82;position:absolute;z-index:9999;");
    animate(".bdSug_wpr table", "padding:0;width:100%;background:#fff;cursor:default;");
    animate(".bdSug_wpr tr", "padding:0;margin:0");
    animate(".bdSug_wpr td", "padding:2px;margin:0;text-align:left;vertical-align:middle;font:14px verdana;font-weight:normal;text-decoration:none;text-indent:0");
    animate(".bdSug_mo", "background:#36c;color:#fff");
    animate(".bdSug_app", "padding:0;margin:0;background:#fff");
    animate(".bdSug_pre", "padding:0;margin:0");
    animate(".bdsug_copy", "margin:0;background:transparent url(http://www.baidu.com/img/bd.gif) no-repeat;font-size:13px;color:#77c;text-decoration:none;padding:0 2px 0 16px;");
	//animate(".engineselected","background-color:#D3D3D3");
	animate(".enginebaidu","background:url(http://www.baidu.com/img/bd.gif) no-repeat center transparent");
	animate(".enginegoogle","background:url(/img/google.png) no-repeat center transparent");	
	animate(".enginebaidu_selected","background:url(http://www.baidu.com/img/bd.gif) no-repeat center #D3D3D3");
	animate(".enginegoogle_selected","background:url(/img/google.png) no-repeat center #D3D3D3");
	animate(".enginebaidu_hover","background:url(http://www.baidu.com/img/bd.gif) no-repeat center #A9A9A9");
	animate(".enginegoogle_hover","background:url(/img/google.png) no-repeat center #A9A9A9");			
  }
  var callbacks = {};
  var cache = {};
  var doc = {
    /**
     * @param {string} dataAndEvents
     * @param {Object} style
     * @param {Function} method
     * @param {Object} data
     * @return {?}
     */
    createSugOptions : function(dataAndEvents, style, method, data) {
      return{
        class_prefix : "bdSug_",
        /**
         * @param {?} dataAndEvents
         * @param {number} clone
         * @param {?} response
         * @param {?} deepDataAndEvents
         * @param {boolean} keepData
         * @return {undefined}
         */
        onconfirm : function(dataAndEvents, clone, response, deepDataAndEvents, keepData) {
          if (method && clone > -1) {
            try {
              method.apply(window, [response]);
            } catch (T) {
            }
          }
          if (data && !keepData) {
            data.submit();
          }
        },
        /**
         * @param {Array} model
         * @return {?}
         */
        view : function(model) {
          if (style && style.width) {
            /** @type {number} */
            model[2] = parseInt(style.width);
          }
          if (style && (style.XOffset && style.YOffset)) {
            return[model[0] - style.YOffset, model[1] - style.XOffset, model[2]];
          }
          return[model[0], model[1], model[2]];
        },
        /**
         * @param {?} key
         * @return {undefined}
         */
        getData : function(key) {//获取data，这个在var datetmp = new $.ui.suggestion._Data(v, self.options.getData);中使用，注册了response_data response_data的能力
          /** @type {number} */
          var qs = (new Date).getTime();
          var childEl = goobai.G("bdSug_script");
          if (childEl) {
            document.body.removeChild(childEl);
          }
          var script = (0,eval)("script");
		  if(suggest_engine=="baidu"){
			script.setAttribute("charset", "gbk");
		  }
          /** @type {string} */
		  if(suggest_engine=='baidu'){
			script.src = "http://unionsug.baidu.com/su?wd=" + encodeURIComponent(key) + "&p=3&cb=goobaiSuggestion.callbacks.give" + dataAndEvents + "&t=" + qs;
		  }else if(suggest_engine=='google'){
		    script.src = "https://suggestqueries.google.com/complete/search?q=" + encodeURIComponent(key) + "&jsonp=goobaiSuggestion.callbacks.give" + dataAndEvents + "&client=youtube";
		  }
          /** @type {string} */
          script.id = "bdSug_script";
          document.body.appendChild(script);
        },
		prepend_html : suggest_engine=='baidu'?"<div id='BaiduSel' style='display:inline-block;_zoom:1;*display:inline;width:50%;text-align:center;' class='enginebaidu_selected'>&nbsp;</div><div id='GoogleSel' style='display:inline-block;_zoom:1;*display:inline;width:50%;text-align:center;' class='enginegoogle'>&nbsp;</div>":"<div id='GoogleSel' style='display:inline-block;_zoom:1;*display:inline;width:50%;text-align:center;' class='enginegoogle_selected'>&nbsp;</div><div id='BaiduSel' style='display:inline-block;_zoom:1;*display:inline;width:50%;text-align:center;' class='enginebaidu'>&nbsp;</div>",
        //append_html : "<div style='background:#FFF;line-height:normal;border:0;text-align:right;margin:0;padding:0;'><a class='bdsug_copy' href='http://www.baidu.com/search/sug/sugcode.html' ltarget='_blank' >百度搜索框提示</a></div>",
        apd_body : true
      };
    },
    /**
     * @param {string} id
     * @return {?}
     */
	 //百度数据(请求z):{q:"z",p:false,s:["zealer","zol","zara","zero","zara中国官网","zico","zhibo8","zd423","zera","zion.t 权志龙"]}
	 //谷歌数据(请求ob):["ob",[["obamacare",0],["obama",0],["obituaries",0],["obtuse",0],["obsidian",0],["ob gyn",0],["obsessed",0],["obey",0],["obama net worth",0],["oblivion",0]],{"k":1,"q":"bk5JK0y1v47yHT5qqJZ3U6y9W9w"}]
    createSugCallback : function(id) {
      return function(value) { //实际上callbacks.giveXXX包含的是这个函数
        if (!value) {
          return;
        }
        /** @type {Array} */
        var instances = [];
        /** @type {number} */
        var i = 0;
		if(suggest_engine=='baidu'){
			for (;i < value.s.length;i++) {
			  var $scope = {};
			  $scope.input = value.s[i];
			  $scope.selection = value.s[i];
			  instances.push($scope);
			}
			cache["sug" + id].giveData(value.q, instances); //giveData最终触发了response_data,最终触发了显示
		}else if(suggest_engine=='google'){
			for (;i < value[1].length;i++) {
			  var $scope = {};
			  $scope.input = value[1][i][0];
			  $scope.selection = value[1][i][0];
			  instances.push($scope);
			}
			cache["sug" + id].giveData(value[0], instances); //giveData最终触发了response_data,最终触发了显示	
		}
      };
    }
  };
  scrollDown();
  /** @type {NodeList} */
  var inputs = document.body.getElementsByTagName("INPUT");
  /** @type {number} */
  var i = 0;
  /** @type {number} */
  var len = inputs.length;
  for (;i < len;i++) {
    var input = inputs[i];
    if (input && (input.type == "text" && (input.getAttribute("goobaiSug") == 1 || input.getAttribute("goobaiSug") == 2))) {
      /** @type {number} */
      input.sugId = i;
      /** @type {boolean} */
      var udataCur = input.getAttribute("goobaiSug") == 1;
      init(input, null, null, udataCur);//之后的  var_args elem基本都代表具有sugId属性的input   udataCur为true时，用户选中sug词条时默认执行表单提交动作；
    }
  }
  return{
    /** @type {function ((RegExp|string), Object, Function, Object): ?} */
    bind : init,
    callbacks : callbacks
  };
}();
