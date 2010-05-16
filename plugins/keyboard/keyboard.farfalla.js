/*
jQuery UI Virtual Keyboard Widget
Version 1.3

Author: Jeremy Satterfield
-----------------------------------------
Creative Commons Attribution-Share Alike 3.0 Unported License
http://creativecommons.org/licenses/by-sa/3.0/
-----------------------------------------

An on-screen virtual keyboard embedded within the browser window which
will popup when a specified entry field is focused. The user can then
type and preview their input before Accepting or Canceling.

As a plugin to jQuery UI styling and theme will automatically  
match that used by jQuery UI with the exception of the required
CSS listed below.

Requires: 
    jQuery
    jQuery UI

Usage:
    $('input[type=text], input[type=password], textarea')
        .keyboard({
            layout:"qwerty",
            customLayout:
                [["q w e r t y {bksp}","Q W E R T Y {bksp}"],
                ["s a m p l e {shift}","S A M P L E {shift}"],
                ["{accept} {space} {cancel}","{accept} {space} {cancel}"]]
        });

Options:
    layout
        [String] specify which keyboard layout to use
        qwerty - Standard QWERTY layout (Default)
        alpha  - Alphabetical layout
        dvorak - Dvorak Simplified layout
        num    - Numerical (ten-key) layout
        custom - Uses a custom layout as defined by the customLayout option
    
    customLayout
        [Array] Specify a customer layout
            An Array of arrays
            Each internal array is a new keyboard row
            Each internal array can contain either one or two 
                String elements (Lower case and Upper 
                case respectively)
            Each string element must have each character
                or key seperated by a space
            Special/"Action" keys include:
                {space}     - Spacebar
                {bksp}      - Backspace
                {shift}     - Shift/Capslock
                {return}    - Return/New Line
                {accept}    - Updates element value and closes keyboard
                {cancel}    - Clears changes and closes keyboard
                {dec}       - Decimal for numeric entry, only allows one decimal
                {neg}       - Negative for numeric entry
                {sp:#}      - Replace # with a numerical value, 
                                adds blank space, value of 1 ~ width of one key

CSS:
    .ui-keyboard{padding: .3em; position: absolute; z-index: 16000;}
    .ui-keyboard-button{height: 2em; width: 2em; margin: .1em;}
    .ui-keyboard-actionkey{width: 4em;}
    .ui-keyboard-space{width: 15em;}
    .ui-keyboard-preview{width: 100%; text-align: left;}	

TODO:

Changelog:
	1/17/2010 - 1.3 - Hide keyboard when clicking outside of keyboard
					  Tweek positioning to fit better on screen if page 
					  		scrolled or resized
	1/15/2010 - 1.2 - Align keyboard with element it is called from
					  Append keyboard DOM to elements parent instead of body
    10/30/2009 - 1.1 - Change Preview window to clone the selected element
                            to match the proper formatting of the element
                            (i.e. not showing characters in password fields)
                       Add Return key to insert new lines into textareas
                       Change style of Accept and Cancel buttons 
                            to "ui-state-highlight" to standout
                       Add ability for designer to create a custom keyboard 
                            layout

    10/21/2009 - 1.0 - initial build
*/
jQuery.widget('ui.keyboard', {
    
    layouts: {
        "qwerty": [
            ['1 2 3 4 5 6 7 8 9 0 - = `',
                '! @ # $ % ^ & * ( ) _ + ~'],
            ['q w e r t y u i o p [ ] \\',
                'Q W E R T Y U I O P { } |'],
            ['{sp:.5} a s d f g h j k l ; \' {return}',
                '{sp:.5} A S D F G H J K L : " {return}'],
            ['{sp:1} z x c v b n m , . / {shift}',
                '{sp:1} Z X C V B N M < > ? {shift}' ],
            ['{accept} {space} {cancel} {bksp}',
                '{accept} {space} {cancel} {bksp}']
        ],
        "alpha": [
            ['1 2 3 4 5 6 7 8 9 0 - = `',
                '! @ # $ % ^ & * ( ) _ + ~'],
            ['a b c d e f g h i j [ ] \\',
                'A B C D E F G H I J { } |'],
            ['{sp:.5} k l m n o p q r s ; \' {return}',
                '{sp:.5} K L M N O P Q R S : " {return}'],
            ['{sp:1} t u v w x y z , . / {shift}',
                '{sp:1} T U V W X Y Z < > ? {shift}' ],
            ['{accept} {space} {cancel} {bksp}',
                '{accept} {space} {cancel} {bksp}']
        ],
        "dvorak": [
            ['1 2 3 4 5 6 7 8 9 0 [ ] `',
                '! @ # $ % ^ & * ( ) { } ~'],
            ['\' , . p y f g c r l / = \\',
                '" < > P Y F G C R L ? + |'],
            ['{sp:.5} a o e u i d h t n s - {return}',
                '{sp:.5} A O E U I D H T N S _ {return}'],
            ['{sp:1} ; q j k x b m w v z {shift}',
                '{sp:1} : Q J K X B M W V Z {shift}' ],
            ['{accept} {space} {cancel} {bksp}',
                '{accept} {space} {cancel} {bksp}']
        ],
        "num": [
            ['1 2 3 {bksp}'],
            ['4 5 6 {accept}'],
            ['7 8 9 {cancel}'],
            ['0 {dec} {neg}']
        ]
    },

	_init: function(){
        this.options.layout = this.options.layout || "qwerty";
        this.layouts.custom = this.options.customLayout || [['{cancel}']];
		var ui = this; 
		var element = ui.element;
		var keyboard = this._buildKeyboard(ui);
        var allKeys = keyboard.find('.ui-keyboard-button');
		var inputKeys = allKeys.filter(':not(.ui-keyboard-actionkey)');
        var previewInput = keyboard.find('.ui-keyboard-preview');
        var decBtn = keyboard.find('[name=key_decimal]');
		
		$(document)
			.unbind('mousedown', this._hideonexternalclick)
			.bind('mousedown', this._hideonexternalclick);
		
		element
			.focus(function(){
				jQuery('.ui-keyboard').hide();
                previewInput
                    .attr('value',element.attr('value'));
		
				//glad this function is in jquery-ui
				elementPosition = jQuery.datepicker._findPos(element.get(0));
				
				offset = {
//					left : elementPosition[0],
//					top : elementPosition[1]
				};
				
				//and this one too
				offset = jQuery.datepicker._checkOffset({dpDiv:keyboard, settings:{}}, offset, false);
				
				keyboard.fadeIn('fast'); 
//					.css({
//						position: "absolute",
//						bottom: "36px",
//					})					
					
                previewInput
                    .scrollTop(previewInput.attr('scrollHeight'));
			});
			
		jQuery(element).parent()
			.append(keyboard);

		inputKeys
			.click(function(){
 				previewInput
                    .attr('value', previewInput.attr('value') + this.value)
			});

        allKeys.click(function(){
            previewInput.scrollTop(previewInput.attr('scrollHeight'));
        })

        if(decBtn.length > 0){
            allKeys
                .click(function(){
                    if(/\./.test(previewInput.attr('value'))){
                        decBtn
                            .attr('disabled','disabled')
                            .removeClass('ui-state-default')
                            .addClass('ui-state-disabled');
                    }else{
                        decBtn
                            .removeAttr("disabled") 
                            .addClass('ui-state-default')
                            .removeClass('ui-state-disabled');	
                    }

                });
        }
	},
	
	_hideonexternalclick: function(e){
		if($(e.target).closest('.ui-keyboard').length < 1){
			jQuery('.ui-keyboard').hide();
		}
	},

	_buildKeyboard: function(ui){
		var container = jQuery('<div></div>')
			.addClass('ui-keyboard')
			.addClass('ui-widget-content')
			.addClass('ui-widget')
			.hide();
        
        //build preview display
			
        var previewInput = ui.element.clone()
            .attr('name','preview')
			.attr('readonly','readonly')
			.addClass('ui-state-active')
			.addClass('ui-keyboard-preview');
		
		//build preview container and append preview display
		var entryPreview = jQuery('<div></div>')
			.append(previewInput)
            .appendTo(container);
		
			
		//build default button
		keyBtn = jQuery('<input />')
			.attr('type','button')
			.addClass('ui-keyboard-button')
			.addClass('ui-state-default');
		
        actionKey = keyBtn.clone()
            .addClass('ui-keyboard-actionkey');

        for( row in this.layouts[this.options.layout] ){
            currentRow = this.layouts[this.options.layout][row];
            newRow = jQuery('<div></div>')
			    .attr('id','ui-keyboard-row'+row)
			    .addClass('ui-keyboard-row')
                .appendTo(container);

            for( set in currentRow ){
                newSet = jQuery('<div></div>')
                    .addClass('ui-keyboard-keyset')
                    .appendTo(newRow);
                if(set==1){
                    newSet
                        .addClass('ui-keyboard-shiftset')
                        .hide();
                }
                currentSet = currentRow[set];
                keys = currentSet.split(/\s+/);
                for( key in keys ){

                    //if it's an action key
                    if( /^{\S+}$/.test(keys[key])){
                        
                        action = keys[key].match(/^{(\S+)}$/)[1];
                        
                        if(action == 'space'){
                            actionKey.clone()
                                .attr('name','key_space')
                                .attr('value','Space')
                                .addClass('ui-keyboard-space')
                                .click(function(){
                                    previewInput.attr('value', 
                                        previewInput.attr('value') + ' ');
                                })
                                .appendTo(newSet);
                        }else if(action == 'bksp'){
                            actionKey.clone()
                                .attr('name','key_bksp')
                                .attr('value','<Bksp')
                                .click(function(){
                                    previewInput.attr('value', 
                                        previewInput.attr('value').substring(
                                            0,
                                            previewInput
                                                .attr('value').length - 1
                                        )
                                    );
                                })
                                .appendTo(newSet);
                            
                        }else if(action == 'shift'){
                            actionKey.clone()
                                .attr('name','key_shift')
                                .attr('value','Shift')
                                .click(function(){
                                    hidden = container
                                        .find('.ui-keyboard-keyset:hidden');
                                    visible = container
                                        .find('.ui-keyboard-keyset:visible');
                                    visible.hide();
                                    hidden.show();
                                })
                                .appendTo(newSet);
                        }else if(action == 'accept'){
                            actionKey.clone()
                                .attr('name','key_accept')
                                .attr('value','Accept')
                                .addClass('ui-state-highlight')
                                .removeClass('ui-state-active')
                                .click(function(){
                                    ui.element.attr('value', 
                                        previewInput.attr('value')
                                    );
                                    container.hide();
                                })
                                .appendTo(newSet);
                        }else if(action == 'cancel'){
                            actionKey.clone()
                                .attr('name','key_cancel')
                                .attr('value','Cancel')
                                .addClass('ui-state-highlight')
                                .removeClass('ui-state-active')
                                .click(function(){
                                    container.hide();
                                })
                                .appendTo(newSet);
                        }else if(/^sp:\.?\d+$/.test(action)){
                            margin = action.match(/^sp:(\.?\d+)$/)[1];
                            jQuery('<span>&nbsp;</span>')
                                .css('margin','0 ' + margin + 'em')
                                .appendTo(newSet);
                        }else if(action == "dec"){
                            keyBtn.clone()
                                .attr('name','key_decimal')
                                .attr('value','.')
                                .appendTo(newSet);
                        }else if(action == "neg"){
                            actionKey.clone()
                                .attr('name','key_negative')
                                .attr('value','+/-')
                                .click(function(){
                                    if(/^\-?\d*\.?\d*$/.test(
                                        previewInput.attr('value')
                                    )){
                                        previewInput.attr('value', 
                                            (previewInput.attr('value') * -1)
                                        );
                                    }
                                })
                                .appendTo(newSet);
                        }else if(action == "return"){
                            actionKey.clone()
                                .attr('name','key_return')
                                .attr('value','Return')
                                .click(function(){
                                    previewInput.attr('value', 
                                            previewInput.attr('value') + ' \n'
                                        );
                                })
                                .appendTo(newSet);
                        }
                    }else{
                        keyBtn.clone()
                            .attr('name','key_'+row+'_'+key)
                            .attr('value',keys[key])
                            .appendTo(newSet);
                    }
                }

            }
            
        }
		
		return container;
	}
})


// Farfalla plugin: Virtual Keyboard

$(function() {
	
	$('input[type=text], input[class=lst], input[type=password], textarea').keyboard({
		layout:'qwerty'
	});

	$(window).scroll(function(){
		$('.ui-keyboard')
//			.css('margin-top', ($(window).scrollTop()) + 'px')
			.animate({'marginTop': ($(window).scrollTop()) + 'px'}, 'fast' );
	});


	$('.ui-keyboard').css({
		'width' : '60%',
		'background' : '#999',
		'border' : '1px solid #666',
		'position' : 'fixed', 
		'z-index' : '16000',
		'left' : '20%',
		'right' : '20%',
		'align' : 'center',
		'padding' : '1ex',
		'bottom' : "36px"

	});
	
	$('.ui-keyboard-preview').css({
		'width' : '98%',
		'margin' : '.1em'
	});

	$('.ui-keyboard-button').css({
		width : "7%",
		height : "28px", 
		margin : ".1em",
		display : "inline"
	});

	$('.ui-keyboard-actionkey').css('width', '4em');

	$('.ui-keyboard-space').css('width', '15em');

});
