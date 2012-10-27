/**
 * $Id: virtualkeyboard.js 489 2008-09-30 06:29:33Z wingedfox $
 * $HeadURL: https://svn.debugger.ru/repos/jslibs/Virtual%20Keyboard/tags/VirtualKeyboard.v3.5.2/virtualkeyboard.js $
 *
 * Virtual Keyboard.
 * (C) 2006 Vladislav SHCHapov, phprus@gmail.com
 * (C) 2006-2007 Ilya Lebedev <ilya@lebedev.net>
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 * See http://www.gnu.org/copyleft/lesser.html
 *
 * Do not remove this comment if you want to use script!
 *
 * @author Vladislav SHCHapov <phprus@gmail.com>
 * @author Ilya Lebedev <ilya@lebedev.net>
 * @version $Rev: 489 $
 * @lastchange $Author: wingedfox $ $Date: 2008-09-30 10:29:33 +0400 (Втр, 30 Сен 2008) $
 */
/*
*  The Virtual Keyboard
*
*  @class VirtualKeyboard
*  @constructor
*/
var VirtualKeyboard = new function () {
  var self = this;
  self.$VERSION$ = " $HeadURL: https://svn.debugger.ru/repos/jslibs/Virtual%20Keyboard/tags/VirtualKeyboard.v3.5.2/virtualkeyboard.js $ ".match(/\/[^\.]*[\.\/]([^\/]+)\/[\w\.\s$]+$/)[1]+"."+(" $Rev: 489 $ ".replace(/\D/g,""));
  /**
   *  Some configurable stuff
   *
   *  @type Object
   *  @scope private
   */
  var options = {
     'layout' : null
  }
  /**
   *  ID prefix
   *
   *  @type String
   *  @scope private
   */
  var idPrefix = 'kb_b';
  /**
   *  This flag is used to enable or disable keyboard animation
   *  This is very useful in the secure environments, like password input. Controlled by the CSS class on the field
   *
   *  @see cssClasses
   *  @type Boolean
   *  @scope private
   */
  var animate = true;
  /**
   *  list of the control keys to be shown
   *
   *  @type Object
   *  @scope private
   */
  var controlkeys = {14:'backspace'
                    ,15:'tab'
                    ,28:'enter'
                    ,29:'caps'
                    ,41:'shift_left'
                    ,52:'shift_right'
                    ,53:'del'
                    ,54:'ctrl_left'
                    ,55:'alt_left'
                    ,56:'space'
                    ,57:'alt_right'
                    ,58:'ctrl_right'};
  /**
   *  Prefixes for the keys
   *
   *  @type Object
   *  @scope private
   */
  var KEY = {
      'SHIFT' : 'shift'
     ,'ALT'   : 'alt'
     ,'CTRL'  : 'ctrl'
     ,'CAPS'  : 'caps'
  }
  /**
   *  Current keyboard mapping
   *
   *  @type Array
   *  @scope private
   */
  var keymap;

  /**
   *  List of the available mappings
   *
   *  @type Object
   *  @scope private
   */
  var keymaps = {
        'QWERTY Standard'     : "À1234567890m=ÜQWERTYUIOPÛÝASDFGHJKL;ÞZXCVBNM¼¾¿"
       ,'QWERTY Canadian'     : "Þ1234567890m=ÜQWERTYUIOPÛÝASDFGHJKL;ÀZXCVBNM¼¾¿"
       ,'QWERTY Dutch'        : "Þ1234567890Û¿ÜQWERTYUIOPÝ;ASDFGHJKL=ÀZXCVBNM¼¾m"
       ,'QWERTY Estonian'     : "¿1234567890m=ÜQWERTYUIOPÞÛASDFGHJKL;ÀZXCVBNM¼¾Ý"
       ,'QWERTY Greek (220)'  : "À1234567890¿ÛÜQWERTYUIOP=ÝASDFGHJKL;ÞZXCVBNM¼¾m"
       ,'QWERTY Greek (319)'  : "À1234567890¿=ÜQWERTYUIOPÛÝASDFGHJKL;ÞZXCVBNM¼¾m"
       ,'QWERTY Gujarati'     : "À1234567890m=XQWERTYUIOPÛÝASDFGHJKL;ÜZXCVBNM¼¾¿"
       ,'QWERTY Italian'      : "Ü1234567890ÛÝ¿QWERTYUIOP;=ASDFGHJKLÀÞZXCVBNM¼¾m"
       ,'QWERTY Kannada'      : "À1234567890m=ZQWERTYUIOPÛÝASDFGHJKL;ÞZXCVBNM¼¾¿"
       ,'QWERTY Portuguese'   : "À1234567890ÛÝ¿QWERTYUIOP=;ASDFGHJKLÞÜZXCVBNM¼¾m"
       ,'QWERTY Scandinavian' : "Ü1234567890=Û¿QWERTYUIOPÝ;ASDFGHJKLÀÞZXCVBNM¼¾m"
       ,'QWERTY Spanish'      : "Ü1234567890mÛ¿QWERTYUIOPÝ;ASDFGHJKLÀÞZXCVBNM¼¾ß"
       ,'QWERTY Tamil'        : "À1234567890m =ZQWERTYUIOPÛÝASDFGHJKL;ÞCVBNM¼¾ ¿"
       ,'QWERTY Turkish'      : "À1234567890ßm¼QWERTYUIOPÛÝASDFGHJKL;ÞZXCVBNM¿Ü¾"
       ,'QWERTY UK'           : "ß1234567890m=ÞQWERTYUIOPÛÝASDFGHJKL;ÀZXCVBNM¼¾¿"
       ,'QWERTZ Albanian'     : "À1234567890m=ÜQWERTZUIOPÛÝASDFGHJKL;ÞYXCVBNM¼¾¿"
       ,'QWERTZ Bosnian'      : "À1234567890¿=ÜQWERTZUIOPÛÝASDFGHJKL;ÞYXCVBNM¼¾m"
       ,'QWERTZ Czech'        : "À1234567890=¿ÜQWERTZUIOPÛÝASDFGHJKL;ÞYXCVBNM¼¾m"
       ,'QWERTZ German'       : "Ü1234567890ÛÝ¿QWERTZUIOP;=ASDFGHJKLÀÞYXCVBNM¼¾m"
       ,'QWERTZ Hungarian'    : "0123456789À¿=ÜQWERTZUIOPÛÝASDFGHJKL;ÞYXCVBNM¼¾m"
       ,'QWERTZ Slovak'       : "À1234567890¿ßÜQWERTZUIOPÛÝASDFGHJKL;ÞYXCVBNM¼¾m"
       ,'QWERTZ Swiss'        : "Ü1234567890ÛÝßQWERTZUIOP;ÞASDFGHJKLÀ¿YXCVBNM¼¾m"
       ,'AZERTY Belgian'      : "Þ1234567890ÛmÜAZERTYUIOPÝ;QSDFGHJKLMÀWXCVBN¼¾¿="
       ,'AZERTY French'       : "Þ1234567890Û=ÜAZERTYUIOPÝ;QSDFGHJKLMÀWXCVBN¼¾¿ß"
       ,',WERTY Bulgarian'    : "À1234567890m¾Ü¼WERTYUIOPÛÝASDFGHJKL;ÞZXCVBNMßQ¿"
       ,'QGJRMV Latvian'      : "À1234567890mFÜQGJRMVNZWXYH;USILDATECÞÛBÝKPOß¼¾¿"
       ,'/,.PYF UK-Dvorak'    : "m1234567890ÛÝÜÀ¼¾PYFGCRL¿=AOEUIDHTNSÞ;QJKXBMWVZ"
       ,'FG;IOD Turkish F'    : "À1234567890=mXFG;IODRNHPQWUÛEAÝTKMLYÞJÜVC¿ZSB¾¼"
       ,';QBYUR US-Dvorak'    : "7ÛÝ¿PFMLJ4321Ü;QBYURSO¾65=mKCDTHEAZ8ÞÀXGVWNI¼09"
       ,'56Q.OR US-Dvorak'    : "m1234JLMFP¿ÛÝÜ56Q¾ORSUYB;=78ZAEHTDCKÞ90X¼INWVGÀ"
  }
  /**
   *  Keyboard mode, bitmap
   *
   *
   *
   *
   *  @type Number
   *  @scope private
   */
  var mode = 0
     ,VK_NORMAL = 0
     ,VK_SHIFT = 1
     ,VK_ALT = 2
     ,VK_CTRL = 4
     ,VK_CAPS = 8
     ,VK_ALT_CTRL = VK_ALT|VK_CTRL
     ,VK_ALT_SHIFT = VK_ALT|VK_SHIFT
     ,VK_SHIFT_CAPS = VK_SHIFT|VK_CAPS
     ,VK_ALL = VK_SHIFT|VK_ALT|VK_CTRL|VK_CAPS;
  /**
   *  Deadkeys, original and mofified characters
   *
   *  @see http://en.wikipedia.org/wiki/Dead_key
   *  @see http://en.wikipedia.org/wiki/Combining_character
   *  @type Array
   *  @scope private
   */
  var deadkeys = [
    // greek tonos
    ["\u0384", "\u03b1\u03ac \u03b5\u03ad \u03b9\u03af \u03bf\u03cc \u03b7\u03ae \u03c5\u03cd \u03c9\u03ce "+
               "\u0391\u0386 \u0395\u0388 \u0399\u038a \u039f\u038c \u0397\u0389 \u03a5\u038e \u03a9\u038f"
    ],
    // greek dialytika tonos
    ["\u0385", "\u03c5\u03b0 \u03b9\u0390"],
    // acute accent
    ["\xb4", "a\xe1 A\xc1 e\xe9 E\xc9 i\xed I\xcd o\xf3 O\xd3 u\xfa U\xda y\xfd Y\xdd "+
             "c\u0107 C\u0106 l\u013a L\u0139 n\u0144 N\u0143 r\u0155 R\u0154 s\u015b S\u015a w\u1e83 W\u1e82 z\u017a Z\u0179"
    ],
    // diaeresis
    ["\xa8", "a\xe4 A\xc4 e\xeb E\xcb i\xef I\xcf j\u0135 J\u0134 "+
             "o\xf6 O\xd6 u\xfc U\xdc y\xff Y\u0178 w\u1e85 W\1e84 "+ //latin
             "\u03c5\u03cb \u03b9\u03ca \u03a5\u03ab \u0399\u03aa"    //greek
    ],
    // circumflex
    ["\x5e", "a\xe2 A\xc2 e\xea E\xca i\xee I\xce o\xf4 O\xd4 u\xfb U\xdb y\u0176 Y\u0177 "+
             "c\u0109 C\u0108 h\u0125 H\u0124 g\u011d G\u011c s\u015d S\u015c w\0175 W\0174 "+ //latin
             "\u0131\xee \u0130\xce " // dotless small i, capital I with dot above
    ],
    // grave
    ["\x60", "a\xe0 A\xc0 e\xe8 E\xc8 i\xec I\xcc o\xf2 O\xd2 u\xf9 U\xd9 y\u1ef3 Y\u1ef2 w\u1e81 W\u1e80"],
    // tilde
    ["\x7e", "a\xe3 A\xc3 o\xf5 O\xd5 u\u0169 U\u0168 n\xf1 N\xd1 y\u1ef8 Y\1ef7"],
    // ring above, degree sign
    ["\xb0", "a\xe5 A\xc5 u\u016f U\u016e"],
    // caron
    ["\u02c7", "e\u011b E\u011a "+
               "c\u010d C\u010c d\u010f D\u010e l\u013e L\u013d n\u0148 N\u0147 "+
               "r\u0158 R\u0158 s\u0161 S\u0160 t\u0165 T\u0164 z\u017e Z\u017d"
    ],
    // ogonek
    ["\u02db", "a\u0105 A\u0104 e\u0119 E\u0118 i\u012f I\u012e c\u010b C\u010a g\u0121 G\u0120 u\u0173 U\u0172"],
    // dot above
    ["\u02d9", "e\u0117 E\u0116 u0131i I\u0130 z\u017c Z\u017b"],
    // middle dot
    ["\xb7", "e\u0117 E\u0116 u0131i I\u0130 z\u017c Z\u017b"],
    // breve
    ["\u02d8", "a\u0103 A\u0102 e\u0115 E\u0114 o\0u14f O\0u14e G\u011f g\u011e"],
    // double acute
    ["\u02dd", "o\u0151 O\u0150 U\u0170 u\u0171"],
    // cedilla
    ["\xb8", "c\xe7 C\xc7 g\u0123 G\u0122 k\u0137 K\u0136 l\u013c L\u013b "+
             "n\u0146 N\u0145 r\u0157 R\u0156 S\u015e s\u015f T\u0162 t\u0163"
    ]
  ]
  /**
   *  CSS classes will be used to style buttons
   *
   *  @type Object
   *  @scope private
   */
  var cssClasses = {
    'buttonUp'      : 'kbButton'
   ,'buttonDown'    : 'kbButtonDown'
   ,'buttonHover'   : 'kbButtonHover'
   ,'buttonNormal'  : 'normal'
   ,'buttonShifted' : 'shifted'
   ,'buttonAlted'   : 'alted'
   ,'capslock'      : 'capsLock'
   ,'deadkey'       : 'deadKey'
   ,'noanim'        : 'VK_no_animate'

  }
  /**
   *  current layout
   *
   *  @type Object
   *  @scope public
   */
  var lang = null;
  /**
   *  Available layouts
   *
   *  Structure:
   *   [
   *    {'name' : {String} layout name to find it using switchLayout
   *     'keys' : {Array} 3-dimensional array of the keyboard codes [normal, shift, alt] keys
   *     'css' : {String} css class to be set on kbDesk when layout is activated
   *     'dk' : {String} list of the active dead keys
   *     'cbk' : {Function} custom input transformations
   *               OR
   *             {Object} { 'load' : optional on load callback
   *                        'activate' : optional activation callback
   *                        'charProcessor' : required input transformation callback
   *                      }
   *     'rtl' : true means the layout is right-to-left
   *
   *    }
   *   ]
   *
   *  @type Array
   *  @scope private
   */
  var layout = []
  /**
   *  Name-to-ID map
   *
   *  @type Object
   *  @scope private
   */
  layout.hash = {}
  /**
   *  Shortcuts to the nodes
   *
   *  @type Object
   *  @scope private
   */
  var nodes = {
      keyboard : null     // Keyboard container @type HTMLDivElement
     ,desk : null         // Keyboard desk @type HTMLDivElement
     ,langbox : null      // Language selector @type HTMLSelectElement
     ,attachedInput : null// Field, keyboard attached to
  }
  /**
   *  Key code to be inserted on the keypress
   *
   *  @type Number
   *  @scope private
   */
  var newKeyCode = null;

  /**************************************************************************
  **  KEYBOARD LAYOUT
  **************************************************************************/
  /**
   *  Add layout to the list
   *
   *  @see #layout
   *  @param {Object} l layout description hash:
   *    { 'code' : {String} layout code
   *     ,'name' : {String} layout name
   *     ,'keys' : {String,Array} keycodes
   *     ,'shift': {Object} optional shift keys, array of string
   *     ,'alt'  : {Array} optional altgr keys
   *     ,'dk'   : {String} list of the active deadkeys
   *     ,'cbk' : {Function} char processing callback
   *                OR
   *              { 'load' : {Function} optional load callback (called from addLayout)
   *               ,'activate' : {Function} optional activation callback (called from switchLayout)
   *               ,'charProcessor' : {Function} required char processing callback
   *              }
   *    }
   *  @scope public
   */
  self.addLayout = function(l) {

      var code = l.code.entityDecode().split("-")
         ,name = l.name.entityDecode()
         ,alpha = __doParse(l.keys)

      if (!isArray(alpha) || 47!=alpha.length) throw new Error ('VirtualKeyboard requires \'keys\' property to be an array with 47 items, '+alpha.length+' detected. Layout code: '+code+', layout name: '+name);

      /*
      *  overwrite keys with parsed data for future use
      */
      l.code = (code[1] || code[0]);
      l.name = name;
      l.keys = alpha;
      l.domain = code[0];

      name = l.code+" "+name
      if (!layout.hash.hasOwnProperty(name)) {
          layout.hash[name] = layout.length;
          l.toString = function(){return this.code+" "+this.name};
          layout.push(l);
      }
      /*
      *  call load handler for the current layout
      */
      if (l.cbk && isFunction(l.cbk.load))
          l.cbk.load.call(this);
  }
  /**
   *  Set current layout
   *
   *  @param {String} code layout name
   *  @return {Boolean} change state
   *  @scope public
   */
  self.switchLayout = function (code) {
    if (!layout.hash.hasOwnProperty(code)) return false;

    /*
    *  hide IME on layout switch
    */
    self.IME.hide();
    /*
    *  if number of the option != number of layouts, regenerate list
    */
    if (layout.length != nodes.langbox.options.length) __buildOptionsList();
    /*
    *  touch the dropdown box
    */
    nodes.langbox.options[layout.hash[code]].selected = true;

    lang = layout[layout.hash[code]];
    if (!isArray(lang)) lang = layout[layout.hash[code]] = __prepareLayout(lang);

    /*
    *  overwrite layout
    */
    nodes.desk.innerHTML = __getKeyboardHtml(lang);

    /*
    *  prevent IE from selecting anything here, otherwise it drops any existing selection
    */
    var els = nodes.desk.getElementsByTagName("*");
    for (var i=0, eL=els.length; i<eL; i++) {
        els[i].unselectable = "on";
    }

    /*
    *  set layout-dependent class names
    */
    nodes.desk.className = lang.domain
    self.IME.css = lang.domain

    /*
    *  reset mode for the new layout
    */
    mode = VK_NORMAL;
    /*
    *  call IME activation method, if exists
    */
    if (isFunction(lang.activate)) {
        lang.activate();
    }
    /*
    *  toggle RTL/LTR state
    */
    __toggleInputDir();
    return true;
  }

  /**
   *  Return the list of the available layouts
   *
   *  @return {Array}
   *  @scope public
   */
  self.getLayouts = function () {
      var lts = [];
      for (var i=0,lL=layout.length;i<lL;i++) {
          lts[lts.length] = [layout[i].code,layout[i].name];
      }
      return lts.sort();
  }
  //---------------------------------------------------------------------------
  // GLOBAL EVENT HANDLERS
  //---------------------------------------------------------------------------
  /**
   *  Do the key clicks, caught from both virtual and real keyboards
   *
   *  @param {HTMLInputElement} key on the virtual keyboard
   *  @param {EventTarget} evt optional event object, to be used to re-map the keyCode
   *  @scope private
   */
  var _keyClicker_ = function (key, evt) {
      var chr = ""
         ,ret = false;
      key = key.replace(idPrefix, "");
      switch (key) {
          case KEY.CAPS  :
          case KEY.SHIFT :
          case "shift_left" :
          case "shift_right" :
          case KEY.ALT   :
          case "alt_left" :
          case "alt_right" :
              return true;
          case 'backspace':
              /*
              *  if layout has char processor and there's any selection, ask it for advice
              */
              if (isFunction(lang.charProcessor) && DocumentSelection.getSelection(nodes.attachedInput).length) {
                  chr = "\x08";
              } else if (evt) {
                  self.IME.hide(true);
                  return true;
              } else {
                  DocumentSelection.deleteAtCursor(nodes.attachedInput, false);
                  self.IME.hide(true);
              }
              break;
          case 'del':
              self.IME.hide(true);
              if (evt)
                  return true;
              DocumentSelection.deleteAtCursor(nodes.attachedInput, true);
              break;
          case 'space':
              chr = " ";
              break;
          case 'tab':
              chr = "\t";
              break;
          case 'enter':
              chr = "\n";
              break;
          default:
                  var el = document.getElementById(idPrefix+key);
                  /*
                  *  replace is used to strip 'nbsp' base char, when its used to display combining marks
                  *  @see __getCharHtmlForKey
                  */
                  try {
                      chr = (el.firstChild.childNodes[Math.min(mode&(VK_ALT_SHIFT),VK_ALT)].firstChild || el.firstChild.firstChild.firstChild).nodeValue;
                      chr = chr.replace("\xa0","").replace("\xa0","");
                  } catch (err) {
                      return;
                  }
                  /*
                  *  do uppercase if either caps or shift clicked, not both
                  *  and only 'normal' key state is active
                  */
                  if (((mode&VK_CAPS)>>3) ^ (mode&VK_SHIFT)) chr = chr.toUpperCase();
              break;
      }
      if (chr) {
          /*
          *  process current selection and new symbol with __charProcessor, it might update them
          */
          if (!(chr = __charProcessor(chr, DocumentSelection.getSelection(nodes.attachedInput)))) return ret;
          /*
          *  try to create an event, then fallback to DocumentSelection, if something fails
          */
          try {
              /*
              *  throw an error when selection is required or multiple chars submitted
              *  it's simpler than write number of nesting if..else statements
              */
              if (chr[1] || chr[0].length>1 || chr.charCodeAt(0)>0x7fff || nodes.attachedInput.contentDocument || '\t' == chr[0]) {
                  throw new Error;
              }
              var ck = chr[0].charCodeAt(0);
              /*
              *  trying to create an event, borrowed from YAHOO.util.UserAction
              */
              if (isFunction(document.createEvent)) {
                  var evt = null;
                  try {
                      evt = document.createEvent("KeyEvents");
                      evt.initKeyEvent('keypress', false, true, nodes.attachedInput.contentWindow, false, false, false, false, 0, ck);
                  } catch (ex) {
                      /*
                      *  Safari implements
                      */
                      evt = document.createEvent("KeyboardEvents");
                      evt.initKeyEvent('keypress', false, true, nodes.attachedInput.contentWindow, false, false, false, false, ck, 0);
                  }
                  evt.VK_bypass = true;
                  nodes.attachedInput.dispatchEvent(evt);
              } else {
                  evt.keyCode = 10==ck?13:ck;
                  ret = true;
              }
          } catch (e) {
              DocumentSelection.insertAtCursor(nodes.attachedInput,chr[0]);
              /*
              *  select as much, as __charProcessor callback requested
              */
              if (chr[1]) {
                  DocumentSelection.setRange(nodes.attachedInput,-chr[1],0,true);
              }
          }
      }
      return ret;
  }
  /**
   *  Captures some keyboard events
   *
   *  @param {Event} keydown
   *  @scope protected
   */
  var _keydownHandler_ = function(e) {
    /*
    *  it's global event handler. do not process event, if keyboard is closed
    */
    if (!self.isOpen()) return;
    /*
    *  record new keyboard mode
    */
    var newMode = mode;
    /*
    *  differently process different events
    */
    var keyCode = e.getKeyCode();
    switch (e.type) {
      case 'keydown' :
        switch (keyCode) {
          case 37:
              if (self.IME.isOpen()) {
                  self.IME.prevPage(e);
                  return;
              }
              break;
          case 39:
              if (self.IME.isOpen()) {
                  self.IME.nextPage(e);
                  return;
              }
              break;
          case 8: // backspace
          case 9: // tab
          case 46: // del
              var el = nodes.desk.childNodes[keymap[keyCode]];
              /*
              *  set the class only 1 time
              */
              if (animate && !e.getRepeat()) DOM.CSS(el).addClass(cssClasses.buttonDown);
              if (!_keyClicker_(el.id, e)) e.preventDefault();

              break;
          case 20: //caps lock
              if (!e.getRepeat()) {
                  newMode = newMode ^ VK_CAPS;
              }
              break;
          case 27:
              if (self.IME.isOpen()) {
                  self.IME.hide();
              } else {
                  VirtualKeyboard.close();
              }
              return false;
          default:
              if (!e.getRepeat()) {
                  newMode = newMode|e.shiftKey|e.ctrlKey<<2|e.altKey<<1;
              }
              if (keymap.hasOwnProperty(keyCode)) {
                  if (!(e.altKey ^ e.ctrlKey)) {
                      var el = nodes.desk.childNodes[keymap[keyCode]];
                      if (animate) DOM.CSS(el).addClass(cssClasses.buttonDown);
                      /*
                      *  assign the key code to be inserted on the keypress
                      */
                      newKeyCode = el.id;
                  }
                  if (e.altKey && e.ctrlKey) {
                      e.preventDefault();
                      /*
                      *  this block is used to print a char when ctrl+alt pressed
                      *  browsers does not invoke "kepress" in this case
                      */
                      if (e.srcElement) {
                          _keyClicker_(nodes.desk.childNodes[keymap[keyCode]].id, e)
                          newKeyCode = "";
                      }
                  }
              } else {
                  self.IME.hide();
              }
              break;
        }
        break;
      case 'keyup' :
        switch (keyCode) {
            case 20:
                break;
            default:
                if (!e.getRepeat()) {
                    newMode = mode&(VK_ALL^(!e.shiftKey|(!e.ctrlKey<<2)|(!e.altKey<<1)));
                }
                if (animate && keymap.hasOwnProperty(keyCode)) {
                    DOM.CSS(nodes.desk.childNodes[keymap[keyCode]]).removeClass(cssClasses.buttonDown);
                }
        }
        break;
      case 'keypress' :
        /*
        *  flag is set only when virtual key passed to input target
        */
        if (newKeyCode && !e.VK_bypass) {
            if (!_keyClicker_(newKeyCode, e)) {
                e.stopPropagation();
                /*
                *  keeps browsers away from running built-in event handlers
                */
                e.preventDefault();
            }
            /*
            *  reset flag
            */
            newKeyCode = null;
        }
        if (!mode^VK_ALT_CTRL && (e.altKey || e.ctrlKey)) {
            self.IME.hide();
        }
        if (0==keyCode && !newKeyCode && !e.VK_bypass  // suppress dead keys from the keyboard driver
          && (!e.ctrlKey && !e.altKey && !e.shiftKey)  // only when no special keys pressed, unblocking system shortcuts
           ) {
            e.preventDefault();
        }
    }
    /*
    *  update layout state
    */
    if (newMode != mode) {
        __updateControlKeys(newMode);
        __updateLayout();
    }
  }
  /**
   *  Handle clicks on the buttons, actually used with mouseup event
   *
   *  @param {Event} mouseup event
   *  @scope protected
   */
  var _btnClick_ = function (e) {
    /*
    *  either a pressed key or something new
    */
    var el = DOM.getParent(e.srcElement||e.target,'a');
    /*
    *  skip invalid nodes
    */
    if (!el || el.parentNode.id.indexOf(idPrefix)<0) return;
    el = el.parentNode;

    switch (el.id.substring(idPrefix.length)) {
      case "caps":
      case "shift_left":
      case "shift_right":
      case "alt_left":
      case "alt_right":
      case "ctrl_left":
      case "ctrl_right":
          return;
    }

    if (DOM.CSS(el).hasClass(cssClasses.buttonDown)) {
        _keyClicker_(el.id);
    }
    if (animate) {
        DOM.CSS(el).removeClass(cssClasses.buttonDown)
    }

    var newMode = mode&(VK_CAPS|e.shiftKey|e.altKey<<1|e.ctrlKey<<2);
    if (mode != newMode) {
        __updateControlKeys(newMode);
        __updateLayout();
    }

  }
  /**
   *  Handle mousedown event
   *
   *  Method is used to set 'pressed' button state and toggle shift, if needed
   *  Additionally, it is used by keyboard wrapper to forward keyboard events to the virtual keyboard
   *
   *  @param {Event} mousedown event
   *  @scope protected
   */
  var _btnMousedown_ = function (e) {
    /*
    *  either pressed key or something new
    */
    var el = DOM.getParent(e.srcElement||e.target, 'a');
    /*
    *  skip invalid nodes
    */
    if (!el || el.parentNode.id.indexOf(idPrefix)<0) return;
    el = el.parentNode;

    var newMode = mode;

    var key = el.id.substring(idPrefix.length);
    switch (key) {
      case "caps":
        newMode = newMode ^ VK_CAPS;
        break;
      case "shift_left":
      case "shift_right":
        /*
        *  Shift is pressed in on both keyboard and virtual keyboard, return
        */
        if (e.shiftKey) break;
        newMode = newMode ^ VK_SHIFT;
        break;
      case "alt_left":
      case "alt_right":
      case "ctrl_left":
      case "ctrl_right":
          newMode = newMode ^ (e.altKey<<1^VK_ALT) ^ (e.ctrlKey<<2^VK_CTRL);
          break;
      /*
      *  any real pressed key
      */
      default:
        if (animate) DOM.CSS(el).addClass(cssClasses.buttonDown)
        break;
    }

    if (mode != newMode) {
        __updateControlKeys(newMode);
        __updateLayout();
    }

    e.preventDefault();
    e.stopPropagation();
  }
  /**
   *  Handle mouseout and mouseover events
   *
   *  Method is used to remove 'pressed' button state
   *
   *  @param {Event} mouseup event
   *  @scope protected
   */
  var _btnMouseInOut_ = function (e) {
    /*
    *  either pressed key or something new
    */
    var el = DOM.getParent(e.srcElement||e.target, 'a')
       ,mtd = {'mouseover': 2, 'mouseout' : 3}
    /*
    *  skip invalid nodes
    */
    if (!el || el.parentNode.id.indexOf(idPrefix)<0) return;
    el = el.parentNode;

    /*
    *  hard-to-avoid IE bug cleaner. if 'hover' state is get removed, button looses it's 'down' state
    *  should be applied for every button, needed to save 'pressed' state on mouseover/out
    */
    if (el.id.indexOf('shift')>-1) {
        /*
        *  both shift keys should be blurred
        */
        __toggleControlKeysState(mtd[e.type], KEY.SHIFT);
    } else if (el.id.indexOf('alt')>-1 || el.id.indexOf('ctrl')>-1) {
        /*
        *  both alt and ctrl keys should be blurred
        */
        __toggleControlKeysState(mtd[e.type], KEY.CTRL);
        __toggleControlKeysState(mtd[e.type], KEY.ALT);
    } else if (el.id.indexOf('caps')>-1) {
        __toggleKeyState(mtd[e.type], null, el.id);
    } else if (animate) {
        __toggleKeyState(mtd[e.type], null, el.id);
        if ('mouseout' == e.type.toLowerCase()) {
            /*
            *  reset 'hover' state
            */
            __toggleKeyState(0, null, el.id);
        }
    }
    e.preventDefault();
    e.stopPropagation();
  }

  /**
   *  Switches keyboard map...
   *
   *  @param {Event} e
   *  @scope private
   */
  var switchMapping = function (e) {
      keymap = keymaps[e.target.value];
  }
  /**********************************************************
  *  MOST COMMON METHODS
  **********************************************************/
  /**
   *  Used to attach keyboard output to specified input
   *
   *  @param {Null, HTMLInputElement,String} element to attach keyboard to
   *  @return {HTMLInputElement, Null}
   *  @scope public
   */
  self.attachInput = function (el) {
    /*
    *  if null is supplied, don't change the target field
    */
    if (!el) return nodes.attachedInput;
    if (isString(el)) el = document.getElementById(el);

    if (el == nodes.attachedInput) return nodes.attachedInput;

    /*
    *  perform initialization...
    */
    if (!lang)
        self.switchLayout(options.layout) || self.switchLayout(layout[0].toString());
    if (!lang)
        throw new Error ('No layouts available');

    /*
    *  detach everything
    */
    self.detachInput();

    if (!el || !el.tagName) {
        nodes.attachedInput = null;
    } else {

        /*
        *  set keyboard animation for the current field
        */
        animate = !DOM.CSS(el).hasClass(cssClasses.noanim);
        /*
        *  set input direction
        */
        __toggleInputDir();
        /*
        *  for iframe target we track its HTML node
        */
        nodes.attachedInput = el;
        if (el.contentWindow) {
            el = el.contentWindow.document.body.parentNode;
        }
        EM.addEventListener(el,'keydown',_keydownHandler_);
        EM.addEventListener(el,'keyup',_keydownHandler_);
        EM.addEventListener(el,'keypress',_keydownHandler_);
        EM.addEventListener(el,'mousedown',self.IME.blurHandler);
    }
    return nodes.attachedInput;
  }

  /**
   *  Detaches input from the virtual keyboard
   *
   *  @return detach state
   *  @scope private
   */
  self.detachInput = function () {
      if (!nodes.attachedInput) return false;
      /*
      *  reset input state, defined earlier
      */
      __toggleInputDir(true);
      /*
      *  force IME hide on field switch
      */
      self.IME.hide();
      /*
      *  remove every VK artifact from the old input
      */
      if (nodes.attachedInput) {
          var oe = nodes.attachedInput
          if (oe.contentWindow) {
              oe = oe.contentWindow.document.body.parentNode
          }
          EM.removeEventListener(oe,'keydown',_keydownHandler_);
          EM.removeEventListener(oe,'keypress',_keydownHandler_);
          EM.removeEventListener(oe,'keyup',_keydownHandler_);
          EM.removeEventListener(oe,'mousedown',self.IME.blurHandler);
      }
      nodes.attachedInput = null;
      return true;
  }

  /**
   *  Returns the attached input node
   *
   *  @return {HTMLInputElement, Null}
   *  @scope public
   */
  self.getAttachedInput = function (el) {
      return nodes.attachedInput;
  }
  /**
   *  Shows keyboard
   *
   *  @param {HTMLElement, String} input element or it to bind keyboard to
   *  @param {String} holder keyboard holder container, keyboard won't have drag-drop when holder is specified
   *  @param {HTMLElement} kpTarget optional target to bind key* event handlers to,
   *                       is useful for frame and popup keyboard placement
   *  @return {Boolean} operation state
   *  @scope public
   */
  self.open =
  self.show = function (input, holder, kpTarget){
    if ( !(input = self.attachInput(nodes.attachedInput || input)) || !nodes.keyboard || !document.body ) return false;

    /*
    *  check pass means that node is not attached to the body
    */
    if (!nodes.keyboard.parentNode || nodes.keyboard.parentNode.nodeType==11) {
        if (isString(holder)) holder = document.getElementById(holder);
        if (!holder.appendChild) return false;
        holder.appendChild(nodes.keyboard);
        /*
        *  we'll bind event handler here
        */
        if (!isUndefined(kpTarget) && input != kpTarget && kpTarget.appendChild) {
            EM.addEventListener(kpTarget,'keydown', _keydownHandler_);
            EM.addEventListener(kpTarget,'keyup', _keydownHandler_);
            EM.addEventListener(kpTarget,'keypress', _keydownHandler_);
        }
    }

    return true;
  }
  /**
   *  Hides the keyboard
   *
   *  @return {Boolean}
   *  @scope public
   */
  self.close =
  self.hide = function () {
    if (!nodes.keyboard || !self.isOpen()) return false;
    self.detachInput();
    nodes.keyboard.parentNode.removeChild(nodes.keyboard);
    return true;
  }
  /**
   *  Toggles keyboard state
   *
   *  @param {HTMLElement, String} input element or it to bind keyboard to
   *  @param {String} holder keyboard holder container, keyboard won't have drag-drop when holder is specified
   *  @param {HTMLElement} kpTarget optional target to bind key* event handlers to,
   *                       is useful for frame and popup keyboard placement
   *  @return {Boolean} operation state
   *  @scope public
   */
  self.toggle = function (input, holder, kpTarget) {
      self.isOpen()?self.close():self.show(input, holder, kpTarget);
  }
  /**
   *  Returns true if keyboard is opened
   *
   *  @return {Boolean}
   *  @scope public
   */
  self.isOpen = function () /* :Boolean */ {
      return (!!nodes.keyboard.parentNode) && nodes.keyboard.parentNode.nodeType == 1;
  }
  //---------------------------------------------------------------------------
  // PRIVATE METHODS
  //---------------------------------------------------------------------------
  /**
   *  Sets input direction mode
   *
   *  @param {Boolean} reset resets input mode to default, when true
   */
  var __toggleInputDir = function (reset) {
      if (nodes.attachedInput) {
          var mode = reset?""
                          :(lang.rtl?'rtl'
                                    :'ltr');
          if (nodes.attachedInput.contentWindow)
              nodes.attachedInput.contentWindow.document.body.dir = mode;
          else 
              nodes.attachedInput.dir = mode;
      }
  }
  /**
   *  Builds options for the layout selection box
   *
   *  @scope private
   */
  var __buildOptionsList = function () {
      var s = layout.sort()
         ,l,o,n
         ,cc = {};
      layout.hash = {};
      nodes.langbox.innerHTML = "";
      for (var i=0,sL=s.length;i<sL;i++) {
          l = layout[i];
          if (cc.label!=l.code) {
              cc = document.createElement('optgroup');
              cc.label = l.code;
              nodes.langbox.appendChild(cc);
          }
          n = l.code+" "+l.name;
          o = document.createElement('option');
          o.value = n;
          o.appendChild(document.createTextNode(l.name));
          o.label = l.name;
          cc.appendChild(o);
          /*
          *  record option position
          */
          layout.hash[n] = i;
      }
  }
  /**
   *  Converts string of chars or array of char codes to the array of chars
   *
   *  @param {Array, String} s source to check&parse
   *  @return {Array}
   *  @scope private
   */
  var __doParse = function(s) {
      if (isString(s))
          return s.match(/\x01.+?\x02|./g).map(function(a){return a.replace(/[\x01-\x03]/g,"")});
      else
          return s.map(function(a){return isArray(a)?a.map(String.fromCharCode).join(""):String.fromCharCode(a)});
  }
  /**
   *  Prepares layout for typing
   *
   *  @param {Object} l layout object to process
   *  @scope private
   */
  var __prepareLayout = function(l) {
      /*
      *  convert layout in machine-aware form
      */
      var alpha = l.keys
         ,shift = l.shift || {}
         ,alt   = l.alt || {}
         ,dk    = l.dk || []
         ,cbk   = l.cbk
         ,ca    = null
         ,cac   = -1
         ,cs    = null
         ,csc   = -1
         ,lt    = []

      lt.name = l.name;
      lt.code = l.code;

      for (var i=0, aL = alpha.length; i<aL; i++) {
         if (shift.hasOwnProperty(i)) {
           cs = __doParse(shift[i]);
           csc = i;
         }
         if (alt.hasOwnProperty(i)) {
           ca = __doParse(alt[i]);
           cac = i;
         }
         lt[i] = [alpha[i],                                          // normal chars
                  (csc>-1&&cs.hasOwnProperty(i-csc)?cs[i-csc]:null), // shift chars
                  (cac>-1&&ca.hasOwnProperty(i-cac)?ca[i-cac]:null)  // alt chars
                 ];
      }
      /*
      *  add control keys
      */
      for (var i in controlkeys) {
          if (controlkeys.hasOwnProperty(i)) {
              lt.splice(i,0,controlkeys[i]);
          }
      }

      lt.dk = __doParse(dk)

      /*
      *  check for right-to-left languages
      */
      lt.rtl = !!lt.toString().match(/[\u05b0-\u06ff]/)

      /*
      *  this CSS will be set on kbDesk
      */
      lt.domain = l.domain
      /*
      *  finalize things by calling loading callback, if exists
      */
      if (isFunction(cbk)) {
          lt.charProcessor = cbk
      } else if (cbk) {
          lt.activate = cbk.activate;
          lt.charProcessor = cbk.charProcessor;
      }
      return lt;
  }
  /**
   *  Toggles layout mode (switch alternative key bindings)
   *
   *  @scope private
   */
  __updateLayout = function () {
    /*
    *  now, process to layout toggle
    */
    var bi = -1
       /*
       *  0 - normal keys
       *  1 - shift keys
       *  2 - alt keys (has priority, when it pressed together with shift)
       */
       ,sh = 0
       ,ca = [cssClasses.buttonNormal,cssClasses.buttonShifted,cssClasses.buttonAlted];

    if ((mode&VK_ALT_CTRL)==VK_ALT_CTRL) {
        sh = 2;
    } else if (mode&VK_SHIFT) {
        sh = 1;
    }
    DOM.CSS(nodes.desk).removeClass(ca).addClass(ca[sh]);

    if (animate) {
        /*
        *  toggle caps state only when animation is allowed
        */
        if (((mode&VK_CAPS)>>3) ^ (mode&VK_SHIFT)) {
            DOM.CSS(nodes.desk).addClass(cssClasses.capslock);
        } else {
            DOM.CSS(nodes.desk).removeClass(cssClasses.capslock);
        }
    }
    for (var i=0, lL=lang.length; i<lL; i++) {
        if (isString(lang[i])) continue;
        bi++;
        var btn = document.getElementById(idPrefix+bi).firstChild.childNodes;
        /*
        *  swap symbols and its CSS classes
        */
        if (btn[sh].firstChild && btn[sh].firstChild.nodeValue.length) {
            DOM.CSS(btn[0]).removeClass(ca).addClass(ca[sh]);
            DOM.CSS(btn[1]).removeClass(ca).addClass([cssClasses.buttonShifted
                                                     ,cssClasses.buttonNormal
                                                     ,cssClasses.buttonShifted][sh]);
            DOM.CSS(btn[2]).removeClass(ca).addClass([cssClasses.buttonAlted
                                                     ,cssClasses.buttonAlted
                                                     ,cssClasses.buttonNormal][sh]);
        }
    }
  }
  /**
   *  Sets specified state on dual keys (like Alt, Ctrl)
   *
   *  @param {String} a1 key suffix to be checked
   *  @param {Number} a2 keyboard mode
   *  @scope private
   */
  var __updateControlKeys = function (newMode) {
      /*
      *  all changed bits will be raised
      */
      var changes = mode ^ newMode;
      if (changes&VK_SHIFT) {
          __toggleControlKeysState(!!(newMode&VK_SHIFT), KEY.SHIFT);
      }
      if (changes&VK_ALT) {
          __toggleControlKeysState(!!(newMode&VK_ALT), KEY.ALT);
      }
      if (changes&VK_CTRL) {
          __toggleControlKeysState(!!(newMode&VK_CTRL), KEY.CTRL);
      }
      if (changes&VK_CAPS) {
          __toggleKeyState(!!(newMode&VK_CAPS), KEY.CAPS);
      }
      mode = newMode;
  }
  /**
   *  Toggles control key state, designed for dual keys only
   *
   *  @param {Number, Boolean} state one of raised (0), down (1), hover (2)
   *  @param {String} prefix key name to be evaluated
   */
  var __toggleControlKeysState = function (state, prefix) {
      var s1 = document.getElementById(idPrefix+prefix+'_left')
         ,s2 = document.getElementById(idPrefix+prefix+'_right');
      switch (0+state) {
          case 0: 
              s1.className = DOM.CSS(s2).removeClass(cssClasses.buttonDown).getClass();
              break;
          case 1:
              s1.className = DOM.CSS(s2).addClass(cssClasses.buttonDown).getClass();
              break;
          case 2:
              s1.className = DOM.CSS(s2).addClass(cssClasses.buttonHover).getClass();
              break;
          case 3:
              s1.className = DOM.CSS(s2).removeClass(cssClasses.buttonHover).getClass();
              break;
      }
  }
  /**
   *  Toggles key state
   *
   *  @param {Number, Boolean} state one of raised (0), down (1), hover (2)
   *  @param {String} suffix optional key suffix
   *  @param {String} name optional key name
   */
  var __toggleKeyState = function (state, suffix, name) {
      var s = document.getElementById(suffix? idPrefix+suffix
                                            : name);
      if (s) {
          switch (0+state) {
              case 0: 
                  DOM.CSS(s).removeClass(cssClasses.buttonDown);
                  break;
              case 1:
                  DOM.CSS(s).addClass(cssClasses.buttonDown);
                  break;
              case 2:
                  DOM.CSS(s).addClass(cssClasses.buttonHover);
                  break;
              case 3:
                  DOM.CSS(s).removeClass(cssClasses.buttonHover);
                  break;
          }
      }
  }
  /**
   *  Char processor
   *
   *  It does process input letter, possibly modifies it
   *
   *  @param {String} char letter to be processed
   *  @param {String} buf current keyboard buffer
   *  @return {Array} new char, flag keep buffer contents
   *  @scope private
   */
  var __charProcessor = function (tchr, buf) {
    var res = [];
    if (isFunction(lang.charProcessor)) {
      /*
      *  call user-supplied converter
      */
      res = lang.charProcessor(tchr,buf);
    } else if (tchr == "\x08") {
      res = ['',0];
    } else {
      /*
      *  process char in buffer first
      *  buffer size should be exactly 1 char to don't mess with the occasional selection
      */
      var fc = buf.charAt(0);
      if ( buf.length==1 && lang.dk.indexOf(fc)>-1 ) {
        /*
        *  dead key found, no more future processing
        *  if new key is not an another deadkey
        */
        res[1] = tchr != fc & lang.dk.indexOf(tchr)>-1;
        res[0] = deadkeys[fc][tchr]?deadkeys[fc][tchr]:tchr;
      } else {
        /*
        *  in all other cases, process char as usual
        */
        res[1] = lang.dk.indexOf(tchr)>-1 && deadkeys.hasOwnProperty(tchr);
        res[0] = tchr;
      }
    }
    return res;
  }
  /**
   * Keyboard layout builder
   *
   * @param {Array} lang keys to put on the keyboard
   * @return {String} serialized HTML
   * @scope private
   */
  var __getKeyboardHtml = function (lang) {
    var inp = document.createElement('span');
    /*
    *  inp is used to calculate real char width and detect combining symbols
    *  @see __getCharHtmlForKey
    */
    document.body.appendChild(inp);
    inp.style.position = 'absolute';
    inp.style.left = '-1000px';

    for (var i=0, aL=lang.length, btns = [], zcnt = 0, chr, title; i<aL; i++) {
      chr = lang[i];
      title = isArray(chr)?chr[0]:chr.replace(/_.+/,'');
      btns.push("<div id='",idPrefix,(isArray(chr)?zcnt++:chr)
               ,"' class='",cssClasses.buttonUp
               ,"'><a href='#",i,"'"
               ,"title='",title,"'"
               ,">",(isArray(chr)?(__getCharHtmlForKey(lang,chr[0],cssClasses.buttonNormal,inp)
                                  +__getCharHtmlForKey(lang,chr[1],cssClasses.buttonShifted,inp)
                                  +__getCharHtmlForKey(lang,chr[2],cssClasses.buttonAlted,inp))
                                 :"<span class='title'>"+title+"</span>")
               ,"</a></div>");
    }
    document.body.removeChild(inp);
    return btns.join("");
  }
  /**
   *  Char html constructor
   *
   *  @param {Object} lyt layout object
   *  @param {String} chr char code
   *  @param {String} css optional additional class names
   *  @param {HTMLInputElement} i input field to test char length against
   *  @return {String} resulting html
   *  @scope private
   */
  var __getCharHtmlForKey = function (lyt, chr, css, inp) {
      var html = []
         ,dk = isArray(lyt.dk) && lyt.dk.indexOf(chr)>-1
         ,i = 0

      /*
      *  if key matches agains current deadchar list
      */
      if (dk) css = css+" "+cssClasses.deadkey;

      inp.innerHTML = chr;
      /*
      *  this is used to detect true combining chars, like THAI CHARACTER SARA I
      *  NBSPs are appended on the both sides to handle ltr and rtl chars at once
      */
      if (chr && inp.offsetWidth < 4) inp.innerHTML = "\xa0"+chr+"\xa0";

      html[i++] = "<span";
      if (css) {
          html[i++] = " class=\""+css+"\"";
      }
      html[i++] = " >"+(chr?inp.innerHTML:"")+"</span>";
      return html.join("");
  }
  /**
   *  Keyboard initializer
   */
  ;(function() {
      /*
      *  process the deadkeys, to make more usable, but non-editable object
      */
      var dk = {};
      for (var i=0, dL=deadkeys.length; i<dL; i++) {
        if (!deadkeys.hasOwnProperty(i)) continue;
        /*
        *  got correct deadkey symbol
        */
        dk[deadkeys[i][0]] = {};
        var chars = deadkeys[i][1].split(" ");
        /*
        *  process char:mod_char pairs
        */
        for (var z=0, cL=chars.length; z<cL; z++) {
          dk[deadkeys[i][0]][chars[z].charAt(0)] = chars[z].charAt(1);
        }
      }
      /*
      *  resulting array:
      *
      *  { '<dead_char>' : { '<key>' : '<modification>', }
      */
      deadkeys = dk;

      /*
      *  create keyboard UI
      */
      nodes.keyboard = document.createElement('div');
      nodes.keyboard.id = 'virtualKeyboard';
      nodes.keyboard.innerHTML = "<div id=\"kbDesk\"><!-- --></div>"
                                +"<select id=\"kb_langselector\"></select>"
                                +"<select id=\"kb_mappingselector\"></select>"
                                +'<div id="copyrights" nofocus="true"><a href="http://debugger.ru/projects/virtualkeyboard" target="_blank">VirtualKeyboard '+self.$VERSION$+'</a><br />&copy; 2006-2008 <a href="http://debugger.ru" target="_blank">Debugger.ru</a></div>';

      nodes.desk = nodes.keyboard.firstChild;

      var el = nodes.keyboard.childNodes.item(1);
      EM.addEventListener(el,'change', function(e){self.switchLayout(this.value)});
      nodes.langbox = el;

      var el = el.nextSibling;
      var mapGroup = "";
      for (var i in keymaps) {
          var map = keymaps[i].split("").map(function(c){return c.charCodeAt(0)});
          /*
          *  add control keys
          */
          map.splice(14,0,8,9);
          map.splice(28,0,13,20);
          map.splice(41,0,16);
          map.splice(52,0,16,46,17,18,32,18,17);
          /*
          *  convert keymap array to the object, to have better typing speed
          */
          var tk = map;
          map = [];
          for (var z=0, kL=tk.length; z<kL; z++) {
              map[tk[z]] = z;
          }
          keymaps[i] = map;

          /*
          *  append mapping to the dropdown box
          */
          tk = i.split(" ",2);
          if (mapGroup.indexOf(mapGroup=tk[0])!=0) {
              el.appendChild(document.createElement('optgroup'))
              el.lastChild.label = mapGroup;
          }
          map = document.createElement('option');
          el.lastChild.appendChild(map);
          map.value = i;
          map.innerHTML = tk[1];
      }
      keymap = keymaps['QWERTY Standard'];

      EM.addEventListener(el,'change', switchMapping);
      /*
      *  insert some copyright information
      */
      EM.addEventListener(nodes.desk,'mousedown', _btnMousedown_);
      EM.addEventListener(nodes.desk,'mouseup', _btnClick_);
      EM.addEventListener(nodes.desk,'mouseover', _btnMouseInOut_);
      EM.addEventListener(nodes.desk,'mouseout', _btnMouseInOut_);
      EM.addEventListener(nodes.desk,'click', EM.preventDefaultAction);

      /*
      *  prevent IE from selecting anything here, otherwise it drops any existing selection
      */
      var els = nodes.keyboard.getElementsByTagName("*");
      for (var i=0, eL=els.length; i<eL; i++) {
          els[i].unselectable = "on";
      }
      nodes.keyboard.onmousedown = function (e) {if (!e || !e.target.tagName || 'select' != e.target.tagName.toLowerCase()) return false}

      /*
      *  check url params for the default layout name
      */
      var opts = getScriptQuery('virtualkeyboard.js');
      if (opts.layout) {
          options.layout = opts.layout;
      }
  })();
}
/**
 *  Container for the custom language IMEs, don't mess with the window object
 *
 *  @type {Object}
 */
VirtualKeyboard.Langs = {};
/**
 *  Simple IME thing to show input tips, supplied by the callback
 *
 *  Usage: 
 *   - call VirtualKeyboard.IME.show(suggestionlist); to show the suggestions
 *   - call VirtualKeyboard.IME.show(keep_selection); to hide IME toolbar and keep selectio if needed
 *
 *  @scope public
 */
VirtualKeyboard.IME = new function () {
    var self = this;
    var html = "<div id=\"VirtualKeyboardIME\"><table><tr><td class=\"IMEControl\"><div class=\"left\"><!-- --></div></td>"
              +"<td class=\"IMEControl IMEContent\"></td>"
              +"<td class=\"IMEControl\"><div class=\"right\"><!-- --></div></td></tr>"
              +"<tr><td class=\"IMEControl IMEInfo\" colspan=\"3\"><div class=\"showAll\"><div class=\"IMEPageCounter\"></div><div class=\"arrow\"></div></div></td></tr></div>";
    var ime = null;
    var chars = "";
    var page = 0;
    var showAll = false;
    var sg = [];
    var target = null;
    var targetWindow = null;

    /**
     *  Shows the IME tooltip
     *
     *  @param {Array} s optional array of the suggestions
     *  @scope public
     */
    self.show = function (s) {
        target = VirtualKeyboard.getAttachedInput();
        var win = DOM.getWindow(target);
        /*
        *  if there's no IME or target window is not the same, as before - create new IME
        */
        if (targetWindow != win) {
            if (ime && ime.parentNode) {
                ime.parentNode.removeChild(ime);
            }
            targetWindow = win;
            __createImeToolbar();
            targetWindow.document.body.appendChild(ime);
        }
        /*
        *  external property, set in the #switchLayout
        */
        ime.className = self.css

        if (s) self.setSuggestions(s);
        if (target && ime && sg.length>0) {
            EM.addEventListener(target,'blur',self.blurHandler);
            ime.style.display = "block";
            self.updatePosition(target);
        } else if ('none' != ime.style.display) {
            self.hide();
        }
    }

    /**
     *  Hides IME
     *
     *  @param {Boolean} keep keeps selection
     *  @scope public
     */
    self.hide = function (keep) {
        if (ime && 'none' != ime.style.display) {
            ime.style.display = "none";
            EM.removeEventListener(target,'blur',self.blurHandler);
            if (target && DocumentSelection.getSelection(target) && !keep) 
                DocumentSelection.deleteSelection(target);
            target = null;
            sg=[];
        }
    }
    /**
     *  Updates position of the IME tooltip
     *
     *  @scope public
     */
    self.updatePosition = function () {
        var xy = DOM.getOffset(target);
        ime.style.left = xy.x+'px';
        var co = DocumentSelection.getSelectionOffset(target);
        ime.style.top = xy.y+co.y+co.h+'px';
    }
    /**
     *  Imports suggestions and applies them
     *
     *  @scope public
     */
    self.setSuggestions = function (arr) {
        if (!isArray(arr)) return false;
        sg = arr;
        page = 0;
        showPage();
        self.updatePosition(target);
    }
    /**
     *  Returns suggestion list
     *
     *  @param {Number} idx optional index in the suggestions array
     *  @return {String, Array} all suggestions, or one by its index
     *  @scope public
     */
    self.getSuggestions = function (idx) {
        return isNumber(idx)?sg[idx]:sg;
    }
    /**
     *  Shows the next page from the suggestions list
     *
     *  @param {Event} e optional event to be cancelled
     *  @scope public
     */
    self.nextPage = function (e) {
         page = Math.max(Math.min(page+1,(Math.ceil(sg.length/10))-1),0);
         showPage();
         if (e) {
             e.stopPropagation();
             e.preventDefault();
             return false;
         }
    }
    /**
     *  Shows the previous page from the suggestions list
     *
     *  @param {Event} e optional event to be cancelled
     *  @scope public
     */
    self.prevPage = function (e) {
         page = Math.max(page-1,0);
         showPage();
         if (e) {
             e.stopPropagation();
             e.preventDefault();
             return false;
         }
    }
    /**
     *  Returns the current page number
     *
     *  @return {Number} page number
     *  @scope public
     */
    self.getPage = function () {
         return page;
    }
    /**
     *  Returns char by its number in the suggestions array
     *
     *  @param {Number} n char number in the current page
     *  @return {String} char
     *  @scope public
     */
    self.getChar = function (n) {
         n = --n<0?9:n;
         return sg[self.getPage()*10+n]
    }
    self.isOpen = function () {
         return ime && 'block' == ime.style.display;
    }
    /**
     *  Gets called on input field blur then closes IME toolbar and removes the selection
     *  
     */
    self.blurHandler = function (e) {
        self.hide();
    }
    /**
     *  Toggles 'all' and 'paged' modes of the toolbar
     *
     *  @param {Event} e optional event to be cancelled
     *  @scope public
     */
    self.toggleShowAll = function (e) {
         var sa = ime.firstChild.rows[1].cells[0].lastChild;
         if (showAll = !showAll) {
             page = 0;
             sa.className = 'showPage';
         } else {
             sa.className = 'showAll';
         }
         showPage();
         if (e) {
             e.stopPropagation();
             e.preventDefault();
             return false;
         }
    }
    /**
     *  Shows currently selected page in the IME tooltip
     *
     *  @scope private
     */
    var showPage = function () {
        var s = ['<table>'];
        if (showAll) {
            for (var z=0,pL=Math.ceil(sg.length/10); z<pL; z++ ) {
                s.push('<tr>');
                for (var i=0,p=z*10; i<10 && !isUndefined(sg[p+i]); i++) {
                    s.push("<td><a href=''>")
                    if (0==z) {
                        s.push("<b>&nbsp;"+((i+1)%10)+": </b>");
                    }
                    s.push(sg[p+i]+"</a></td>");
                }
                s.push('</tr>');
            }
        } else {
            s.push('<tr>');
            for (var i=0,p=page*10; i<10 && !isUndefined(sg[p+i]); i++) {
                s.push("<td><a href=''><b>&nbsp;"+((i+1)%10)+": </b>"+sg[p+i]+"</a></td>");
            }
            s.push('</tr>');
        }
        s.push('</table>');
        ime.firstChild.rows[0].cells[1].innerHTML = s.join("");
        // update page counter
        ime.firstChild.rows[1].cells[0].firstChild.firstChild.innerHTML = (page+1)+"/"+(0+showAll || Math.ceil(sg.length/10));
        // prevent selection in IE
        var els = ime.getElementsByTagName("*");
        for (var i=0,eL=els.length; i<eL; i++) {
            els[i].unselectable = "on";
        }
    }
    /**
     *  Inserts selected choice, replacing possible selection and hides IME toolbar
     *
     *  @param {MousedownEvent} e
     *  @scope protected
     */
    var pasteSuggestion = function (e) {
        var el = DOM.getParent(e.target,'a');
        if (el) {
            DocumentSelection.insertAtCursor(target,el.lastChild.nodeValue);
            self.hide();
        }
        e.preventDefault();
    }

    /**
     *  Just the initializer
     */
    var __createImeToolbar = function () {
        var el = targetWindow.document.createElement('div');
        el.innerHTML = html;
        ime = el.firstChild;
        ime.style.display = 'none';
        var arrl = ime.firstChild.rows[0].cells[0]
           ,arrr = ime.firstChild.rows[0].cells[2]
           ,arrd = ime.firstChild.rows[1].cells[0].lastChild
        EM.addEventListener(arrl,'mousedown',self.prevPage);
        EM.addEventListener(arrr,'mousedown',self.nextPage);
        EM.addEventListener(arrd,'mousedown',self.toggleShowAll);
        /*
        *  blocks any selection
        */
        ime.unselectable = "on";
        var els = ime.getElementsByTagName("*");
        for (var i=0,eL=els.length;i<eL;i++) {
            els[i].unselectable = "on";
        }

        EM.addEventListener(ime,'mousedown',pasteSuggestion);
    }
}
