/*
*  $Id: documentselection.js 474 2008-09-09 07:56:51Z wingedfox $
*  $HeadURL: https://svn.debugger.ru/repos/jslibs/BrowserExtensions/tags/BrowserExtensions.020/documentselection.js $
*
*  Class implements cross-browser work with text selection
*
*  @author Ilya Lebedev
*  @author $Author: wingedfox $
*  @modified $Date: 2008-09-09 11:56:51 +0400 (Втр, 09 Сен 2008) $
*  @version $Rev: 474 $
*  @license LGPL
*/
/*
*  @class DocumentSelection
*/
DocumentSelection = new function () {
  var self = this;
  /*
  *  Stores hash of keys, applied to elements
  *
  *  @type Object
  *  @scope private
  */
  var keys = {
     'prevCalcNode' : '__prevCalcNode'
  }
  //---------------------------------------------------------------------------
  //  PRIVATES
  //---------------------------------------------------------------------------
  /**
   *  Calls specified method with the supplied params
   *  This is done to process only correct requests
   *
   *  @param {Function} method to call
   *  @param {Array} arguments of [target, param1, paramN]
   *  @return {Object} method call result or false, if any error happened
   *  @scope private
   */
  var callMethod = function (m, arg) {
      var el = arg[0]
         ,id
         ,module = ""
      if (!el || !el.tagName) return false;
      switch (arg[0].tagName.toLowerCase()) {
          case 'input':
              if (el.type && el.type != 'text' && el.type != 'password') return false;
          case 'textarea':
              module = "input";
              break;
          case 'iframe':
              module = "frame";
              arg[0] = el.contentWindow;
              break;
          default:
              return false;
      }
      /*
      *  instantiate the module
      */
      if ('function' == typeof self.module[module]) 
          self.module[module] = new self.module[module](keys);
      /*
      *  throw the exception, is method is not implemented
      */
      if (!self.module[module] || !self.module[module][m])
          throw new Error ('Method \''+m+'\' is not implemented for DocumentSelection \''+module+'\' module.');

      return self.module[module][m].apply(self,arg);
  }
  /**
   *  Keeps scrolling on the place for browsers, those don't support this natively
   *
   *  @param {HTMLElement} el target element
   *  @param {Number} ot old scrollTop property
   *  @param {Number} ol old scrollLeft property
   *  @scope private
   */
  var keepScroll = function (el,ot,ol) {
      if (window.getSelection && 'iframe'!=el.tagName.toLowerCase()) {
          var q = self.getSelectionOffset(el)
          if (el.contentWindow) el = el.contentWindow.document.body;

          if (ot>q.y)                      el.scrollTop = q.y;
          else if (ot+el.clientHeight>q.y) el.scrollTop = ot;
          else                             el.scrollTop = q.y-el.clientHeight/2; 

          if (ol>q.x)                      el.scrollLeft = q.x;
          else if (ol+el.clientWidth>q.x)  el.scrollLeft = ol;
          else                             el.scrollLeft = q.x-el.clientWidth/2; 
      }
  }
  //---------------------------------------------------------------------------
  //  SETTERS
  //---------------------------------------------------------------------------
  /**
   *  getSelectionRange wrapper/emulator
   *
   *  @param {HTMLElement}
   *  @param {Number} start position
   *  @param {Number} end position
   *  @param {Boolean} related indicates calculation of range relatively to current start point
   *  @return void
   *  @scope public
   */
  self.setRange = function(el, start, end, related) {
      var ot = el.scrollTop
         ,ol = el.scrollLeft
      /*
      *  set range on relative coordinates
      */
      if (related) {
          var st = self.getStart(el);
          end = st+end;
          start = st+start;
      }
      if (start < 0) start = 0;
      if (end < start) end = start;

      callMethod ('setRange',[el,start,end]);

      keepScroll(el,ot,ol);
  }
  //---------------------------------------------------------------------------
  //  GETTERS
  //---------------------------------------------------------------------------
  /**
   *  Return contents of the current selection
   *
   *  @param {HTMLElement} el element to look position on
   *  @return {String}
   *  @scope public
   */
  self.getSelection = function(el) {
      return callMethod('getSelection',[el]);
  }
  /**
   *  getSelectionStart wrapper/emulator
   *  adapted version
   *
   *  @param {HTMLElement} el element to calculate end position for
   *  @return {Number} start position
   *  @scope public
   */
  self.getStart = function (el) {
      return callMethod('getPos',[el,true]);
  }
  /*
  *  getSelectionEnd wrapper/emulator
  *  adapted version
  *
  *  @param {HTMLElement} el element to calculate end position for
  *  @return {Number} start position
  *  @scope public
  */
  self.getEnd = function (el) {
      return callMethod('getPos',[el,false]);
  }
  /*
  *  Return cursor position for supplied field
  *
  *  @param {HTMLElement} element to get cursor position from
  *  @return {Number} position
  *  @scope public
  */
  self.getCursorPosition = function (el) {
      return self.getStart(el);
  }
  //---------------------------------------------------------------------------
  //  MISC FUNCTIONS
  //---------------------------------------------------------------------------
  /*
  *  Insert text at cursor position
  *
  *  @param {HTMLElement} text field to insert text
  *  @param {String} text to insert
  *  @scope public
  */
  self.insertAtCursor = function (el, val, keep) {
      var ot = el.scrollTop
         ,ol = el.scrollLeft
      if (!keep) {
          callMethod('del',[el]);
      }
      var pos = callMethod('ins',[el,val]);
      keepScroll(el,ot,ol);
      return pos;
  }
  /*
  *  Wraps selection with start and end text
  *
  *  @param {HTMLElement} text field to insert text
  *  @param {String} start text at the beginnging of the selection
  *  @param {String} end text at the end of the selection
  *  @scope public
  */
  self.wrapSelection = function (el, start, end) {
    var s = self.getCursorPosition(el)
       ,e = self.getEnd(el)
    if (s==e) {
        self.insertAtCursor(el,start+end);
    } else {
        self.insertAtCursor(el,start,true);
        self.setRange(el,e+start.length,e+start.length);
        self.insertAtCursor(el,end,true);
    }
  }

  /*
  *  Deletes char at cursor position
  *
  *  @param {HTMLElement} text field to delete text
  *  @param {Boolean} delete text before (backspace) or after (del) cursor
  *  @scope public
  */
  self.deleteAtCursor = function (el, after) {
      if (!self.getSelection(el)) {
          if (after)
              self.setRange(el,0,1,true);
          else
              self.setRange(el,-1,0,true);
      }
      return self.deleteSelection(el);
  }
  /**
   *  Removes the selection, if available
   * 
   *  @param {HTMLElement} el field to delete text from
   *  @scope public
   */
  self.deleteSelection = function (el) {
      var ol = el.scrollLeft
         ,ot = el.scrollTop
         ,ret = callMethod('del',[el]);
      keepScroll(el,ot,ol);
      return ret;
  }
  /**
   *  Method is used to caclulate pixel offsets for the selection in TextArea (other inputs are not tested yet)
   *
   *  @param {HTMLTextareaElement} el target to calculate offsets
   *  @return {Object} {x: horizontal offset, y: vertical offset, h: height offset}
   *  @scope public
   */
  self.getSelectionOffset = function (el) {
      return callMethod('getSelectionOffset',[el],true);
  }

}
DocumentSelection.module = {
    /**
     *  Module processing selection in the 'input' and 'textarea' fields
     *
     *  @param {Object} keys properties, registered for use in DS
     *  @scope protected
     */
    'input' : function (keys) {
        var self=this;
        /**
         *  Special document node, used to calculate range offsets in Mozilla
         *
         *  @type HtmlDivElement
         *  @scope private
         */
        var offsetCalculator = null;
        /**
         *  Returns selection start or end position in absolute chars from the field start
         *
         *  @param {HTMLInputElement, HTMLTextareaElement} el input or textarea to get position from
         *  @param {Boolean} start get start or end selection position
         *  @return {Number} offset from the beginning
         *  @scope private
         */
        self.getPos = function (el, start) {
            var off;
            try {
                el.setActive();
                if (start)
                    off = Math.abs(el.document.selection.createRange().moveStart("character", -100000000));
                else
                    off = Math.abs(el.document.selection.createRange().moveEnd("character", -100000000));
                /*
                *  test for the TEXTAREA's dumb behavior
                */
                if (el.tagName.toLowerCase() != 'input') {
                    /*
                    *  calculate node offset
                    */
                    var r = el.document.body.createTextRange();
                    r.moveToElementText(el);
                    var sTest = Math.abs(r.moveStart("character", -100000000));
                    off -= sTest;
                }
            } catch (e) {
                try {
                    off = (start?el.selectionStart:el.selectionEnd);
                } catch (e) {
                    off = 0;
                }
            }
            return off;
        }
        /**
         *  Removes the selection, if available
         * 
         *  @param {HTMLElement} el field to delete text from
         *  @return {String} deleted substring
         *  @scope public
         */
        self.del = function (el) {
            var ret = ""
               ,s = self.getPos(el,true)
               ,e = self.getPos(el,false)
            if (s!=e) {
                /*
                *  check for IE, because Opera does use \r\n sequence, but calculate positions correctly
                */
                var tmp = document.selection&&!window.opera?el.value.replace(/\r/g,""):el.value;
                ret = tmp.substring(s,e);
                el.value = tmp.substring(0, s)+tmp.substring(e,tmp.length);
                self.setRange(el,s,s);
            }
            return ret;
        }
        /**
         *  Inserts text to the textarea
         *
         *  @param {HTMLElement} text field to insert text
         *  @param {String} text to insert
         *  @return {Number} new cursor position
         *  @scope public
         */
        self.ins = function (el,val) {
            var ret = ""
               ,s = self.getPos(el,true)
            /*
            *  check for IE, because Opera does use \r\n sequence, but calculate positions correctly
            */
            var tmp = document.selection&&!window.opera?el.value.replace(/\r/g,""):el.value;
            el.value = tmp.substring(0,s)+val+tmp.substring(s,tmp.length);
            s += val.length;
            self.setRange(el,s,s);
            return s;
        }
        /**
         *  Return contents of the current selection
         *
         *  @param {HTMLElement} el element to look position on
         *  @param {Number} s start position
         *  @param {Number} e end position
         *  @return {String}
         *  @scope public
         */
        self.getSelection = function (el) {
            var s = self.getPos(el,true),
                e = self.getPos(el,false)
            /*
            *  w/o this check content might be duplicated on delete
            */
            if (e<s) e = s;
            /*
            *  check for IE, because Opera does use \r\n sequence, but calculate positions correctly
            */
            var tmp = document.selection&&!window.opera?el.value.replace(/\r/g,""):el.value;
            return tmp.substring(s,e);
        }
        /**
         *  Sets the selection range
         *
         *  @param {HTMLElement}
         *  @param {Number} start position
         *  @param {Number} end position
         *  @return void
         *  @scope public
         */
        self.setRange = function (el,start,end) {
            if ('function' == typeof el.setSelectionRange) {
                /*
                *  for Mozilla
                */
                try {el.setSelectionRange(start, end)} catch (e) {}
            } else {
                /*
                *  for IE
                */
                var range;
                /*
                *  just try to create a range....
                */
                try {
                    range = el.createTextRange();
                } catch(e) {
                    try {
                        range = el.document.body.createTextRange();
                        range.moveToElementText(el);
                    } catch(e) {
                        return false;
                    }
                }
                el.setActive();
                range.collapse(true);
                range.moveStart("character", start);
                range.moveEnd("character", end - start);
                range.select();
            }
        }
        /**
         *  Method is used to caclulate pixel offsets for the selection in TextArea (other inputs are not tested yet)
         *
         *  @param {HTMLTextareaElement} el target to calculate offsets
         *  @return {Object} {x: horizontal offset, y: vertical offset, h: height offset}
         *  @scope public
         */
        self.getSelectionOffset = function (el) {
            var range
               ,doc = DOM.getWindow(el).document;
            if ('function' == typeof el.setSelectionRange) {
                /*
                *  For Mozilla
                */
                if (!offsetCalculator) {
                    /*
                    *  create hidden div, which will 'emulate' the textarea
                    *  it's put 'below the ground', because toggling block/none is too expensive
                    */
                    offsetCalculator = doc.createElement('td');
            
                    doc.body.appendChild(offsetCalculator);
                }
                /*
                *  store the reference to last-checked object, to prevent recalculation of styles
                */
                if (offsetCalculator[keys.prevCalcNode] != el) {
                    offsetCalculator[keys.prevCalcNode] = el;
                    var cs = doc.defaultView.getComputedStyle(el, null);
                    for (var i in cs) {
                        try {if (cs[i]) offsetCalculator.style[i] = cs[i];}catch(e){}
                    }
                    offsetCalculator.style.overflow = 'auto';
                    offsetCalculator.style.position = 'absolute';
                    offsetCalculator.style.visibility = 'hidden';
                    offsetCalculator.style.zIndex = '-10';
                    offsetCalculator.style.left="-10000px";
                    offsetCalculator.style.top="-10000px";
                    offsetCalculator.style.backgroundColor = 'yellow';
                }
                /*
                *  caclulate offsets to target and move div right below it
                */
                var range = doc.createRange()
                   ,val = el.value || " ";
            
                if ('input'==el.tagName.toLowerCase()) {
                    offsetCalculator.style.width = 'auto'
                    offsetCalculator.style.whiteSpace =  'nowrap';
                } else {
                    offsetCalculator.style.whiteSpace = 'off'==el.getAttribute('wrap')?"pre":"";
                }
                
                val = val.replace(/\x20\x20/g,"\x20\xa0").replace(/</g,"&lt;").replace(/>/g,"&gt");
                offsetCalculator.innerHTML = ( val.substring(0,el.selectionStart-1)+"<span>"+val.substring(el.selectionStart-1,el.selectionStart)+"</span>"
                                              +val.substring(el.selectionStart)).replace(/\n/g,"<br />")
                                                                                .replace(/\t/g,"<em style=\"white-space:pre\">\t</em>")
                /*
                *  span is used to find the offsets
                */
                var span = offsetCalculator.getElementsByTagName('span')[0];
                span.style.border = '1px solid red';
                range.offsetLeft = span.offsetLeft// - el.scrollLeft + span.clientWidth;
                range.offsetTop = span.offsetTop// - el.scrollTop;
                range.offsetHeight = span.offsetHeight;
                if ("\n"==val.charAt(el.selectionStart-1)) range.offsetTop += range.offsetHeight*2;
                span = null;
            } else if (doc.selection && doc.selection.createRange) {
                /*
                *  For IE
                */
                range = doc.selection.createRange();
                /*
                *  IE does not allow to calculate lineHeight, but this check is easy
                */
                range.offsetHeight = Math.round(range.boundingHeight/(range.text.replace(/[^\n]/g,"").length+1));
                if (el.tagName && 'textarea'==el.tagName.toLowerCase()) {
                    var xy = DOM.getOffset(el)
                    range = {
                        'offsetTop' : range.offsetTop-xy.y+DOM.getBodyScrollTop(el)
                       ,'offsetLeft' : range.offsetLeft-xy.x+DOM.getBodyScrollLeft(el)
                       ,'offsetHeight' : range.offsetHeight
                    }
                }
            }
            if (range) {
                return {'x': range.offsetLeft, 'y': range.offsetTop, 'h': range.offsetHeight};
            }
            return {'x': 0, 'y': 0, 'h': 0};
        }
    }
   ,'frame' : function () {
        var self=this;
        /**
         *  Returns selection start or end position in absolute chars from the field start
         *
         *  @param {HTMLInputElement, HTMLTextareaElement} el input or textarea to get position from
         *  @param {Boolean} start get start or end selection position
         *  @return {Number} offset from the beginning
         *  @scope private
         */
        self.getPos = function (el, start) {
            var pos = 0
            if ('function' == typeof el.getSelection) {
                /*
                *  we need to calculate both start and end points, because range could be reversed
                *  but we can't move selection end point before start one
                */
                var sel = el.getSelection()
                   ,sn = sel.anchorNode
                   ,so = sel.anchorOffset
                   ,en = sel.focusNode
                   ,eo = sel.focusOffset
                   ,ss = false
                   ,es = false
                   ,sc = 0
                   ,ec = 0
                   ,cn
                   ,tw=document.createTreeWalker(el.document.body,NodeFilter.SHOW_TEXT,null,false)
                while (sn && sn.nodeType != 3) {
                    sn = sn.childNodes[so]
                    so = 0;
                }
                while (en && en.nodeType != 3) {
                    en = en.childNodes[eo]
                    eo = 0;
                }
                while (cn=tw.nextNode()) {
                    if (cn == en) {
                        ec += eo
                        es = true
                    }
                    if (cn == sn) {
                        sc += so
                        ss = true
                    }
                    if (!es) ec += cn.nodeValue.length
                    if (!ss) sc += cn.nodeValue.length
                    if (es && ss) break;
                }
                pos = start?Math.min(ec,sc):Math.max(ec,sc)
            } else {
                el.document.body.setActive();
                pos = Math.abs(el.document.selection.createRange()[start?"moveStart":"moveEnd"]("character", -100000000));
            }
            return pos;
        }
        /**
         *  Removes the selection, if available
         * 
         *  @param {HTMLElement} el field to delete text from
         *  @return {String} deleted substring
         *  @scope public
         */
        self.del = function (el) {
            if ('function' == typeof el.getSelection) {
                var s = el.getSelection()
                   ,i = s.rangeCount
                while (--i>-1) s.getRangeAt(i).deleteContents();
            } else if (el.document && el.document.selection) {
                el.document.selection.createRange().text = "";
                el.document.selection.createRange().select();
            }
        }
        /**
         *  Inserts text to the textarea
         *
         *  @param {HTMLElement} text field to insert text
         *  @param {String} text to insert
         *  @scope public
         */
        self.ins = function (el,val) {
            var p = self.getPos(el,true)+val.length;
            if ('function' == typeof el.getSelection) {
                var n = el.document.createTextNode(val)
                   ,s = el.getSelection()
                s.getRangeAt(0).insertNode(n);
                n.parentNode.normalize();
            } else if (el.document && el.document.selection) {
                el.document.body.setActive();
                el.document.selection.createRange().text = val;
            }
            self.setRange(el,p,p)
            return p;
        }
        /**
         *  Return contents of the current selection
         *
         *  @param {HTMLElement} el element to look position on
         *  @param {Number} s start position
         *  @param {Number} e end position
         *  @return {String}
         *  @scope public
         */
        self.getSelection = function (el,s,e) {
            if ('function' == typeof el.getSelection) {
                var s = el.getSelection();
                return s?s.toString():"";
            } else if (el.document && el.document.selection) {
                return el.document.selection.createRange().text;
            }
        }
        /**
         *  Sets the selection range
         *
         *  @param {HTMLElement}
         *  @param {Number} start position
         *  @param {Number} end position
         *  @return void
         *  @scope public
         */
        self.setRange = function (el,start,end) {
            if ('function' == typeof el.getSelection) {
                var sel = el.getSelection();
                sel.removeAllRanges();
                var r = el.document.createRange()
                   ,cnt = 0
                   ,cl = 0
                   ,cn
                   ,pn
                   ,tw=document.createTreeWalker(el.document.body,NodeFilter.SHOW_TEXT,null,false);
            
                while ((cn=tw.nextNode())&&(!cn.nodeValue.length||(cnt+cn.nodeValue.length < start))) {
                    pn = cn;
                    cnt += cn.nodeValue.length;
                }
                /*
                *  explicitly set range borders
                */
                if (cn||(cn=pn)) {
                    r.setStart(cn,start-cnt);
                    r.setEnd(cn,start-cnt);
                }
                if (cn) {
                    do {
                        if (cn.nodeType != 3) continue;
                        if (cnt+cn.nodeValue.length < end) {
                            cnt += cn.nodeValue.length;
                        } else {
                            r.setEnd(cn,end-cnt);
                            break;
                        }
                    } while (cn=tw.nextNode())
                }
                sel.addRange(r);
            } else if (el.document && el.document.selection) {
                el.document.body.setActive();
                var r = el.document.selection.createRange()
                r.moveToElementText(el.document.body);
                r.move("character",start);
                r.moveEnd("character",end-start);
                r.select();
            }
        }
        /**
         *  Method is used to calculate pixel offsets for the selection in TextArea (other inputs are not tested yet)
         *
         *  @param {HTMLTextareaElement} el target to calculate offsets
         *  @return {Object} {x: horizontal offset, y: vertical offset, h: height offset}
         *  @scope public
         */
        self.getSelectionOffset = function (el) {
            var off = {'x':0, 'y':0, 'h':0};
            if ('function' == typeof el.getSelection) {
                var r = el.getSelection().getRangeAt(0)
                   ,e = r.endOffset
                   ,s = el.document.createElement('span')
                   ,n = s;
                s.style.borderLeft='1px solid red';
                r.insertNode(s);
                off.h = n.offsetHeight;
                while (n.offsetParent) {
                    off.x += n.offsetLeft;
                    off.y += n.offsetTop;
                    n = n.offsetParent
                }
                s.parentNode.removeChild(s);
                if (e-r.endOffset) {
                    r.setEnd(r.endContainer.nextSibling,e-r.endOffset);
                    el.getSelection().addRange(r)
                }
            } else if (el.document && el.document.selection) {
                var r = el.document.selection.createRange()
                off.h = r.boundingHeight
                off.x = r.offsetLeft;
                off.y = r.offsetTop;
            }
            return off;
        }
    }
}