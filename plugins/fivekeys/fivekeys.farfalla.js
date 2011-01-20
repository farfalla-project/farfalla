// Farfalla plugin: Five Keys. 
// Description: Allows moving through the elements of a webpage using the arrow keys
// To do: 


$(function(){

/*
 * jQuery Keyboard Navigation Plugin - Current
 *   http://www.amountaintop.com/projects/keynav/
 *
 * To use, download this file to your server, save as keynav.js,
 * and add this HTML into the <head>...</head> of your web page:
 *   <script type="text/javascript" src="keynav.js"></script>
 *
 * Copyright (c) 2006 Mike Hostetler <http://www.amountaintop.com/>
 * Licensed under the MIT License:
 *   http://www.opensource.org/licenses/mit-license.php
 */
  $.keynav = new Object();

  $.fn.keynav = function (onClass,offClass) {
	  //Initialization
	  var kn = $.keynav;
	  if(!kn.init) {
		  kn.el = new Array();

		  $(document).keydown(function(e) {
      var key = 0;
      if (e == null) {
        key = event.keyCode;
      } else { // mozilla
        key = e.which;
      }
			switch(key) {
				case 37: 
				  $.keynav.goLeft();
				  break;
				case 38: 
				  $.keynav.goUp();
				  break;
				case 39: 
				  $.keynav.goRight();
				  break;
				case 40: 
				  $.keynav.goDown();
				  break;
				case 13: 
				  $.keynav.activate();
				  break;
			}
		  });
		  kn.init = true;
	  }

	  return this.each(function() {
		$.keynav.reg(this,onClass,offClass);
	  });
  }
  $.fn.keynav_sethover = function(onClass,offClass) {
	  return this.each(function() {
		this.onClass = onClass;
		this.offClass = offClass;
	  });
  }

  $.keynav.reset = function() {
	  var kn = $.keynav;
	  kn.el = new Array();
  }

  $.keynav.reg = function(e,onClass,offClass) {
	  var kn = $.keynav;
	  e.pos = $.keynav.getPos(e);
	  e.onClass = onClass;
	  e.offClass = offClass;
	  e.onmouseover = function (e) { $.keynav.setActive(this); };
	  kn.el.push(e);
  }
  $.keynav.setActive = function(e) {
	  var kn = $.keynav;
	  var cur = $.keynav.getCurrent();
	  $(cur).trigger('blur');
	  for(var i=0;i<kn.el.length;i++) {
		  var tmp = kn.el[i];
      $(tmp).removeClass(tmp.onClass).addClass(tmp.offClass);
	  }
    $(e).removeClass(e.offClass).addClass(e.onClass);
	  $(e).trigger('focus');
	  kn.currentEl = e;
  }
  $.keynav.getCurrent = function () {
	  var kn = $.keynav;
	  if(kn.currentEl) {
		  var cur = kn.currentEl;
	  }
	  else {
		  var cur = kn.el[0];
	  }
	  return cur;
  }
  $.keynav.quad = function(cur,fQuad) {
	  var kn = $.keynav;
	  var quad = Array();
	  for(i=0;i<kn.el.length;i++) {
		var el = kn.el[i];
		if(cur == el) continue;
		if(fQuad((cur.pos.cx - el.pos.cx),(cur.pos.cy - el.pos.cy)))
		  quad.push(el);
	  }
	  return quad;
  }
  $.keynav.activateClosest = function(cur,quad) {
	  var closest;
	  var od = 1000000;
	  var nd = 0;
	  var found = false;
	  for(i=0;i<quad.length;i++) {
		var e = quad[i];
		nd = Math.sqrt(Math.pow(cur.pos.cx-e.pos.cx,2)+Math.pow(cur.pos.cy-e.pos.cy,2));
		if(nd < od) {
			closest = e;
			od = nd;
			found = true;
		}
	  }
	  if(found)
		$.keynav.setActive(closest);
  }
  $.keynav.goLeft = function () {
	  var cur = $.keynav.getCurrent();
	  var quad = $.keynav.quad(cur,function (dx,dy) { 
										if((dy >= 0) && (Math.abs(dx) - dy) <= 0)
											return true;	
										else
											return false;
								   });
	  $.keynav.activateClosest(cur,quad);
  }
  $.keynav.goRight = function () {
	  var cur = $.keynav.getCurrent();
	  var quad = $.keynav.quad(cur,function (dx,dy) { 
										if((dy <= 0) && (Math.abs(dx) + dy) <= 0)
											return true;	
										else
											return false;
								   });
	  $.keynav.activateClosest(cur,quad);
  }

  $.keynav.goUp = function () {
	  var cur = $.keynav.getCurrent();
	  var quad = $.keynav.quad(cur,function (dx,dy) { 
										if((dx >= 0) && (Math.abs(dy) - dx) <= 0)
											return true;	
										else
											return false;
								   });
	  $.keynav.activateClosest(cur,quad);
  }

  $.keynav.goDown = function () {
	  var cur = $.keynav.getCurrent();
	  var quad = $.keynav.quad(cur,function (dx,dy) { 
										if((dx <= 0) && (Math.abs(dy) + dx) <= 0)
											return true;	
										else
											return false;
								   });
	  $.keynav.activateClosest(cur,quad);
  }

  $.keynav.activate = function () {
	  var kn = $.keynav;
	  $(kn.currentEl).trigger('click');
  }

  /**
   * This function was taken from Stefan's exellent interface plugin
   * http://www.eyecon.ro/interface/
   * 
   * I included it in this library's namespace because the functions aren't
   * quite the same.
   */
  $.keynav.getPos = function (e)
  {
    var l = 0;
    var t  = 0;
    var w = $.intval($.css(e,'width'));
    var h = $.intval($.css(e,'height'));
    while (e.offsetParent){
        l += e.offsetLeft + (e.currentStyle?$.intval(e.currentStyle.borderLeftWidth):0);
        t += e.offsetTop  + (e.currentStyle?$.intval(e.currentStyle.borderTopWidth):0);
        e = e.offsetParent;
    }
    l += e.offsetLeft + (e.currentStyle?$.intval(e.currentStyle.borderLeftWidth):0);
    t += e.offsetTop  + (e.currentStyle?$.intval(e.currentStyle.borderTopWidth):0);
	var cx = Math.round(t+(h/2));
	var cy = Math.round(l+(w/2));
    return {x:l, y:t, w:w, h:h, cx:cx, cy:cy};
  };

  /**
   * This function was taken from Stefan's exellent interface plugin
   * http://www.eyecon.ro/interface/
   */
  $.intval = function (v)
  {
    v = parseInt(v);
    return isNaN(v) ? 0 : v;
  };




//	$.getScript(farfalla_path+'plugins/fivekeys/jquery.keynav.js');
	
// The highlighter div, taken from the magnifier plugin

	$('<div id="highlighter">')
	.addClass('highlighter')
	.prependTo('body');
	
	
/*	$('h1, h2, h3, h4, h5, p, ul, ol, input, textarea, th:hasText, td:last-child, td:hasText, pre, label, dt, dd, div:hasText').each(function() {
		
			
		
		});
*/

		$('body').find('h1, h2, h3, h4, h5, p, li, input, textarea, th:hasText, td:last-child, td:hasText, pre, label, dt, dd').addClass('keynav_box');

		$('body').find('h1, h2, h3, h4, h5, p, li, input, textarea, th:hasText, td:last-child, td:hasText, pre, label, dt, dd').keynav('keynav_focusbox','keynav_box');
 
	    // Set the first div as the one with focus, this is optional

 //   	$('body *:first').removeClass().addClass('keynav_focusbox');
    	
    	
    	
		$('html').keydown(function(event) {

			var offset = $('.keynav_focusbox').offset();
    		$('#highlighter').animate({'height' : $('.keynav_focusbox').height() + 10, 'left' : (offset.left - 6) + 'px', 'top' : (offset.top - 10) + 'px', 'width' : $('.keynav_focusbox').width() + 12 }, 300);			

		});
});
	