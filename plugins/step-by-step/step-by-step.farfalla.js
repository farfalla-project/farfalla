﻿// Farfalla plugin: Step by Step.
// Description: Allows moving through the elements of a webpage using the arrow keys. Left and right arrows move from a DOM element to the following or to the preceding one.
// To do:


$(function(){

(function($){var keystrokes='keystrokes';$.event.special[keystrokes]={debug:false,global:{customValidation:null},add:function(obj){var h=obj.handler,data=obj.data,namespace=obj.namespace;var $elem=$(this),delegate=$.event.special[keystrokes]._delegate;var stack=$.isArray(data)?data:[data];stack=$.event.special[keystrokes]._addPrivateKeys.call(this,stack,namespace,h);var tmp_stack=$elem.data('stack');stack=(tmp_stack)?tmp_stack.concat(stack):stack;$elem.data('stack',stack);},remove:function(obj){$.event.special[keystrokes]._removeKeyListeners.call(this,obj.namespace||keystrokes);},setup:function(obj,namespaces,handler){var $elem=$(this),delegate=$.event.special[keystrokes]._delegate;$elem.bind('keyup.'+keystrokes,delegate).bind('keydown.'+keystrokes,delegate);$elem.data('keys_down',[]);$elem.data('keys_string',[]);$elem.data('joined',false);},teardown:function(namespaces){var $elem=$(this);$elem.unbind('keyup.'+keystrokes).unbind('keydown.'+keystrokes);$elem.removeData('keys_down');$elem.removeData('keys_string');$elem.removeData('joined');$elem.removeData('stack');},_delegate:function(e){$.event.special[keystrokes]['_'+e.type].call($.event.special[keystrokes],e,this);},_addPrivateKeys:function(data_stack,namespace,handler){var i=data_stack.length;while(i--){data_stack[i].name=(namespace)?keystrokes+'.'+namespace:keystrokes;data_stack[i]._namespace=namespace||keystrokes;delete handler.data;data_stack[i]._handler=handler;}
return data_stack;},_removeKeyListeners:function(name){var $elem=$(this),stack=$elem.data('stack'),stack_len=stack.length;while(stack_len--){if(stack[stack_len]._namespace===name){stack.splice(stack_len,1);}};$elem.data('stack',stack);},_keydown:function(event,elem){var $elem=$(elem),self=this,temp_keys_down=$elem.data('keys_down');if(elem!=event.target&&(/textarea|select/i.test(event.target.nodeName)||event.target.type==="text")){return;}
temp_keys_down.push(event.keyCode);$elem.data('keys_down',temp_keys_down);$elem.data('joined',false);},_keyup:function(event,elem){var k=event.keyCode,$elem=$(elem),stack=$elem.data('stack'),keys_down=$elem.data('keys_down'),keys_string=$elem.data('keys_string'),stack_len=stack.length;if(elem!=event.target&&(/textarea|select/i.test(event.target.nodeName)||event.target.type==="text")){return;}
if(keys_down.length>1){keys_string.push(this._joinKeyCodesToString(elem));$elem.data('keys_string',keys_string);$elem.data('joined',true);this._log(keys_string);}
else{str=this._getStringFromCode(k);}
if(!$elem.data('joined')){keys_string.push(str);$elem.data('keys_string',keys_string);this._log(keys_string);}
var i=stack_len,keys_s=('|'+keys_string.join('|')+'|');while(i--){if(stack[i]&&keys_s.indexOf('|'+stack[i].keys.join('|')+'|')!==-1){this._valid(elem,event,stack,i);}}
$elem.data('keys_down',[]);},_joinKeyCodesToString:function(elem){var $elem=$(elem),keys=$elem.data('keys_down'),keys_len=keys.length,arr=[],i=0;while(i<keys_len){arr.push(this._getStringFromCode(keys[i]));i++;}
return arr.join('+');},_getStringFromCode:function(code){if(this.codes[code]){return this.codes[code];}
else{this._log('Keycode '+code+' was not found. You can add it by calling $.extend($.event.special.keystrokes.codes, { '+code+' : \'my key\' });');return'undefined';}},_valid:function(elem,event,stack,stack_arr_key){event.type=keystrokes;event[keystrokes]={};event[keystrokes]['stack']=stack;event[keystrokes].stack_item=stack[stack_arr_key];if(typeof(this.global.customValidation)==='function'){var ret=this.global.customValidation.call(elem,event,stack);if(!ret){this._clearKeysString(elem);return;}}
if(typeof(stack[stack_arr_key].customValidation)==='function'){var ret=stack[stack_arr_key].customValidation.call(elem,event,stack);if(!ret){this._clearKeysString(elem);return;}}
if(typeof(stack[stack_arr_key].success)==='function'){stack[stack_arr_key].success.call(elem,event);}
if(stack[stack_arr_key].proceedToMainCallback!==false){stack[stack_arr_key]._handler.apply(elem,[event]);}
this._clearKeysString(elem);},_clearKeysString:function(e){$(e).data('keys_string',[]);},_log:function(str){if(this.debug&&typeof(window.console)!=='undefined'&&window.console.log){console.log(str);}},codes:{8:'backspace',9:'tab',13:'enter',16:'shift',17:'ctrl',18:'alt',19:'pause/break',20:'caps lock',27:'escape',33:'page up',32:'space',34:'page down',35:'end',36:'home',37:'arrow left',38:'arrow up',39:'arrow right',40:'arrow down',44:'print screen',45:'insert',46:'delete',48:'0',49:'1',50:'2',51:'3',52:'4',53:'5',54:'6',55:'7',56:'8',57:'9',59:'semi-colon',61:'add',65:'a',66:'b',67:'c',68:'d',69:'e',70:'f',71:'g',72:'h',73:'i',74:'j',75:'k',76:'l',77:'m',78:'n',79:'o',80:'p',81:'q',82:'r',83:'s',84:'t',85:'u',86:'v',87:'w',88:'x',89:'y',90:'z',91:'left window key',92:'right window key',93:'select key',96:'numpad 0',97:'numpad 1',98:'numpad 2',99:'numpad 3',100:'numpad 4',101:'numpad 5',102:'numpad 6',103:'numpad 7',104:'numpad 8',105:'numpad 9',106:'multiply',107:'add',109:'subtract',110:'decimal point',111:'divide',112:'f1',113:'f2',114:'f3',115:'f4',116:'f5',117:'f6',118:'f7',119:'f8',120:'f9',121:'f10',122:'f11',123:'f12',144:'num lock',145:'scroll lock',182:'my computer (multimedia keyboard)',183:'my calculator (multimedia keyboard)',186:'semi-colon',187:'equal sign',188:'comma',189:'dash',190:'period',191:'forward slash',192:'tilde',219:'open bracket',220:'back slash',221:'close bracket',222:'single quote',224:'command'}}})(jQuery);

// create a div where to put the text to be processed
	$('<div id="monitor">')
//	.html('<p style="font-size:30pt">Farfalla Step By Step module: active</p>')
//	.addClass('monitor')
	.prependTo('body')
	.fadeIn(300);

	$('p:first').addClass('step-by-step-farfalla');

	$(document).bind('keystrokes', {

		keys: ['p']

	}, function(event){

		// for debug purpose: c

		$('#monitor').html('You typed : <em>' + event.keystrokes.stack_item.keys.join(', ') + '</em>');


		$('#monitor').append($('p.step-by-step-farfalla').html());

		$('p.step-by-step-farfalla').next('p').addClass('step-by-step-farfalla');

		$('p.step-by-step-farfalla:first').removeClass('step-by-step-farfalla');

	});




});
