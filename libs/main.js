/*!
 * Farfalla - Accessibility in the Cloud
 * http://farfalla-project.org/
 *
 *  Copyright (C) 2010  Andrea Mangiatordi
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Affero General Public License as
 *  published by the Free Software Foundation, either version 3 of the
 *  License, or (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Affero General Public License for more detail
 *
 *   You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/*
Main Farfalla Library: includes the functions used to draw the toolbar and the reusable functions for plugins
*/

jQuery.noConflict();
(function($) {
  $(function() {

    // Main variables

    var options = farfalla_ui_options();
    var active_plugins = new Array();
    if($.cookie('farfalla_active_plugins')){
      var remember_profile = 1
    } else {
      var remember_profile = 0
    }

/*
    #######################################
    #                                     #
    #    Reusable functions for plugins   #
    #                                     #
    #######################################
*/

    // Bridge function for cakephp gettext translations

    $.__ = function (string){
      index = $.inArray(string,strings);
      if(index>=0){
        return translations[index];
      } else {
        return string;
      }
    }

    // A function to move focus and caret to the end of textareas and input elements.
    // Source: http://stackoverflow.com/questions/637287/how-can-you-move-the-cursor-to-the-last-position-of-a-textarea-in-javascript

    $.fn.focusToEnd = function() {
        return this.each(function() {
            var v = $(this).val();
            $(this).focus().val("").val(v);
        });
    };

    // Simple image preloader (to be used for icons till sprites will be implemented)

    $.fn.preload = function() {
      this.each(function(){
        $('<img/>')[0].src = this;
      });
    }


    // Add plugin configuration area

    $.farfalla_create_plugin_options = function ( plugin_name ){

      if($('#'+plugin_name+'_options').length==0){
      $('<div></div>')
        .attr({
          'id': plugin_name+'_options',
          'class':'plugin_options ui-corner-all donttouchme'
        })
        .hide()
        .insertAfter($('#'+plugin_name+'Activator'));

      $('<div></div>')
        .attr({
          'id': plugin_name+'_options_custom',
          'class':'plugin_options_actions donttouchme'
        })
        .appendTo('#'+plugin_name+'_options')
/*
      $('<div></div>')
        .attr({
          'id': plugin_name+'_options_common',
          'class':'plugin_options_actions donttouchme'
        })
        .appendTo('#'+plugin_name+'_options')

      $('<input />')
        .attr({
          'id':plugin_name+'_options_deactivate',
          'class':'plugin_options_deactivate donttouchme',
          'type':'button',
          'value':'X'
        })
        .css({
          'background':'url("'+farfalla_path+'plugins/'+plugin_name+'/icons/'+plugin_name+'_deactivate.png") no-repeat #fff'
        })
        .appendTo('#'+plugin_name+'_options_common')
*/
        var position = $('#'+plugin_name+'Activator').position();
        var width = $('#'+plugin_name+'_options').width();
      }

    }

    // Add plugin-specific UI
    // ...

    $.farfalla_add_ui = function( plugin_name, type, name, value, callback ){
//      console.log('Adding UI for '+plugin_name);
      switch(type){
        case 'slider':
          $('#'+plugin_name+'_options_custom').append('<div id="'+plugin_name+'_slider" class="farfalla_slider"></div>');
          $('#'+plugin_name+'_slider').slider();
        break;

        case 'button':
          if($('#'+name+'_button').length==0){
            $('#'+plugin_name+'_options_custom').append('<input type="button" id="'+name+'_button" class="farfalla_button" name="'+name+'" value="'+value+'"></input>');
            $('#'+name+'_button').addClass('donttouchme').css('background','url("'+farfalla_path+'plugins/'+plugin_name+'/icons/'+name+'.png")').click(callback);
          }
        break;

      }
    }

    // Add plugin-specific section of UI elements
    // ...

    $.farfalla_add_ui_section = function( plugin_name, title ){

        $('#'+plugin_name+'_options_custom').append('<h2>'+title+'</h2>');

      }

    // Add plugin-specific CSS
    // ...

    $.farfalla_add_css = function( plugin_name, sheet_name ) {
      if($('link[href*="'+sheet_name+'"]').length == 0){
        $('<link></link>').attr({
          "rel":"stylesheet",
          "type":"text/css",
          "href":farfalla_path+"plugins/"+plugin_name+"/css/"+sheet_name+".farfalla.css"
        }).appendTo($('head'));
      }
    };

    $.farfalla_remove_plugin_css = function(plugin_name){
      $('link[href*="'+plugin_name+'_"]').remove();
    }

    // A function to add buttons to the toolbar
    // name -> text displayed on the button
    // id -> unique identifier for the button: the final id will be something like button_id
    // accesskey -> the value for the accesskey attribute useful for activating the buttons from the keyboard
    // callback -> a function to be triggered by the button
    // ...

    $.fn.farfalla_add_button = function( name, text, id, accesskey, bgcolor, txtcolor, callback ){
      $('<li></li>').appendTo('#farfalla_buttons ul');
      $('<input></input>')
        .attr({
          'value': text,
          'type':'button',
          'id':'button_'+id,
          'accesskey':accesskey
        })
        .css('cssText',
          'background : '+bgcolor+' !important; /* border : 2px solid '+txtcolor+' !important; */ color : '+txtcolor+' !important;'
        )
        .addClass('ui-corner-all')
        .addClass('plugin-button')
        .appendTo('#farfalla_buttons ul li:last');
      $('#button_'+id).click(callback);
      $('#farfalla_buttons').show();
    };

    // A function for getting options from the Cakephp session array

    $.farfalla_get_option = function( option, callback ){

      $.getJSON(
         farfalla_path+"backend/plugins/get_option/"+option+"/?callback=?",
         {}, callback
      );

    };

    // A function for setting options in the Cakephp session array

    $.farfalla_set_option = function( option, value ){
//  console.log(value);
      if(value==null){
        $.getJSON(farfalla_path+"backend/plugins/set_option/"+option+"/?callback=?");

      } else {
        $.getJSON(farfalla_path+"backend/plugins/set_option/"+option+"/"+value+"/?callback=?");

      }

    };

    // A function for getting the XPath of an element

    $.getXPath = function ( element ) {
    var xpath = '';
    for ( ; element && element.nodeType == 1; element = element.parentNode )
      {
        var id = $(element.parentNode).children(element.tagName).index(element) + 1;
        id > 1 ? (id = '[' + id + ']') : (id = '');
        xpath = '/' + element.tagName.toLowerCase() + id + xpath;
      }
      return xpath;
    }

    $.fn.farfalla_switch_on = function ( plugin_name ) {
      $(this).addClass('active').css({
        'background': 'url("'+farfalla_path+'plugins/'+plugin_name+'/icons/'+plugin_name+'_selected.png") no-repeat'
      })
      $('#'+plugin_name+'_options_switch').addClass('plugin_options_switch_on');
      farfalla_track_plugins(plugin_name,1);
//      console.log('activated '+plugin_name);
    }

    $.fn.farfalla_switch_off = function ( plugin_name ) {
      $(this).removeClass('active').css({
        'background': 'url("'+farfalla_path+'plugins/'+plugin_name+'/icons/'+plugin_name+'.png") no-repeat'
      });
      $('#'+plugin_name+'_options_switch').removeClass('plugin_options_switch_on');
      farfalla_track_plugins(plugin_name,0);
    }

/*
    #######################################
    #                                     #
    #           Core functions            #
    #                                     #
    #######################################
*/


        // Parses the options passed along while including farfalla.js

        function farfalla_ui_options() {
		  // if no options are passed, this is skipped (thanks to the "?" in the matching string)
          var source = $("script[src*='farfalla.js?']").attr('src');
          if (source){
            var optStart = source.search('\\?');
            var options = source.substr(optStart+1).replace(/&/g,'","');
            options = options.replace(/=/g,'":"');
            options = '{"'+options+'"}';
            options = $.parseJSON(options);
          } else { options = 0; }
          return options;
        };

        // Applies custom colors to the toolbar

        function farfalla_toolbar_color() {
          if(options.background){
            if(options.background.match(/^#([0-9a-f]{3}){1,2}$/i)!==null){
              $('#farfalla_container, #farfalla_toolbar, .ui-widget-content').css('background',options.background);
              $('div.ui-tooltip-farfalla, #farfalla_reset_all_button').css('color',options.background);
							              $('<style id="tooltip_colors">div.ui-tooltip-farfalla{border: 2px solid '+options.background+';}</style>').appendTo('head');
            }
          }
        }

        // Applies custom top positioning to the toolbar

        function farfalla_toolbar_top() {
          if(options.top){
            if(options.top.match(/[0-9]+$/i)!==null){
              farfalla_set_top(options.top);
            }
          }
        }

        // Resets all options and cookies

        function farfalla_reset_all() {
          $('.plugin_options_switch_on').click();
          $('.active').click();
          $.getJSON(farfalla_path+"backend/profiles/reset/?callback=?",{});
          farfalla_forget_profile();
          remember_profile = 0;
          $('#farfalla_remember_profile').css('background','url("'+farfalla_path+'images/save.png")')
        }

        // Creates the main toolbar

        function farfalla_toolbar_create() {

            $('<div></div>')
              .attr('id','farfalla_container')
              .addClass('donttouchme')
              .prependTo('body');

            $('<div></div>').attr('id','farfalla_badge').addClass('donttouchme').prependTo('#farfalla_container');
            $('<img />').attr({
              'id':'farfalla_logo',
              'src':farfalla_path+'/images/farfalla_icon.png',
              'height':'34px',
              'width':'48px',
              'alt':'Farfalla logo'
              })
              .appendTo('#farfalla_badge');

/*              if(window.location !== window.parent.location){
                $('#farfalla_container, #farfalla_badge').hide();
              };
            $('<div></div>').html($.__('ft_accessibility')).attr('id','farfalla_badge_label').addClass('donttouchme').hide().appendTo('#farfalla_badge');
            $('<div></div>').attr('id','farfalla_badge_logo').addClass('donttouchme').appendTo('#farfalla_badge');
*/
            $('<div></div>').attr('id','farfalla_toolbar').appendTo('#farfalla_container').hide();
//            $('<div></div>').attr('id','farfalla_toolbar').appendTo('#farfalla_container');

            $('<div></div>').attr('id','farfalla_logo')
/*              .html('<h1><a href="http://farfalla-project.org/" class="donttouchme">'+$.__('ft_farfalla_project')+'</a></h1><p class="donttouchme">'+$.__('ft_accessibility_preferences')+'</p>') */
              .appendTo('#farfalla_toolbar');
            $('<div class="farfalla_toolbar_separator"></div>').appendTo($('#farfalla_toolbar'));
            $('<div></div>').attr('id','farfalla_toolbar_plugins').appendTo('#farfalla_toolbar');
            $('<div class="farfalla_toolbar_separator"></div>').appendTo($('#farfalla_toolbar'));
            $('<div></div>').attr('id','farfalla_remember_profile').css('background','url("'+farfalla_path+'images/save.png") no-repeat').appendTo('#farfalla_toolbar');
            $('<div></div>').attr('id','farfalla_reset_all').css('background','url("'+farfalla_path+'images/reset.png") no-repeat').appendTo('#farfalla_toolbar');

            $('<div></div>').attr({
              'id': 'farfalla_reset_all_options',
              'class':'plugin_options ui-corner-all donttouchme'
            }).hide().insertAfter($('#farfalla_reset_all'));
            $('<div><p><a id="farfalla_reset_all_button" href="#">Reset all</a></p></div>').attr({
              'id': 'farfalla_reset_all_options_custom',
              'class':'plugin_options_actions donttouchme'
            }).appendTo('#farfalla_reset_all_options')
            if(window.location.href.search('jobmetoo.com')=='-1'){
              $('<div></div>').attr('id','jobmetoo_logo').appendTo('#farfalla_toolbar');
              $('<img />').attr({
                'id':'jobmetoo_logo_img',
                'src':farfalla_path+'images/jobmetoo_logo.png',
                'alt':'logo di Jobmetoo', //localization needed
                'width':'164px',
                'height':'32px'
              }).appendTo($('#jobmetoo_logo'));
              $('#jobmetoo_logo_img').wrap('<a href="http://www.jobmetoo.com/" title="Jump to Jobmetoo website"></a>');
            }

            $('<div></div>').attr('id','farfalla_toolbar_shade').addClass('donttouchme').hide().appendTo('body');
//            $('<div title="Reset">Reset?</div>').attr('id','farfalla_reset_dialog').appendTo('body');


/*
            $('#farfalla_toolbar_shade').click( function() {

              $(this).hide();
              $('#farfalla_badge').click();

            });
*/
/*
            if(options.border){
              if($.inArray(options.border, allowedColors)>=0){
                $('#farfalla_badge').css({
                  'border-left': '2px solid '+options.border,
                  'border-top': '2px solid '+options.border,
                  'border-bottom': '2px solid '+options.border
                });
                $('#farfalla_toolbar').css({
                  'border-left': '2px solid '+options.border,
                });
              }
            };
*/

//            $('#farfalla_toolbar').css('height',$(window).height())
//            $('#farfalla_container').addClass('ui-corner-left');

/*
            $('#farfalla_badge_logo')
              .css({
                'background': 'url("'+farfalla_path+'images/farfalla_badge_'+detected_language+'.png")',
                'background-position':'12px 12px',
                'background-repeat':'no-repeat',
                'cursor':'url(\''+farfalla_path+'images/hand.png\'), auto'
              });
*/



            $('#farfalla_badge')
              .mouseup(
                function(){
                  $(this).css('cursor','url(\''+farfalla_path+'images/hand.png\'), auto')
                })
              .mousedown(
                function(){
                  $(this).css('cursor','url(\''+farfalla_path+'images/grab.png\'), auto')
                })
              .click(
                function(){

                $('#farfalla_container').css('left','auto');

                  if($('#farfalla_toolbar').hasClass('visible')){
                    $('#farfalla_toolbar').removeClass('visible').hide();
                  } else {
                    $('#farfalla_toolbar').addClass('visible').show();
                  }
                });
/*
              .mouseover(
                function(){
                  $('#farfalla_badge_label').show();
                })
              .mouseleave(
                function(){
                  $('#farfalla_badge_label').hide();
                })
*/
              $('#farfalla_container')
              .draggable({
                axis:'y',
                containment:'window',
//                handle:'#farfalla_badge',
                stop: function(event, ui) {
                  $.getJSON(farfalla_path+"backend/profiles/top/"+$(this).css('top')+"/?callback=?",{});
                }
              });

            $('#farfalla_remember_profile')
            .toggle(
              function() {
				farfalla_remember_profile();
				remember_profile = 1;
				$(this).css('background','url("'+farfalla_path+'images/save_selected.png")')
              },
              function() {
                farfalla_forget_profile();
                remember_profile = 0;
				$(this).css('background','url("'+farfalla_path+'images/save.png")')
              }
            ).qtip({
              content :  $.__('save_session'),
              position: {
                my: 'center right',
                at: 'center left'
              },
              style: {
                classes: 'ui-tooltip-farfalla ui-tooltip-shadow',
                width: 'auto',
                tip: {
                  corner: 'right center',
                  width: 20,
                  height: 12
                }
              },
              events: {
                render : function() {farfalla_toolbar_color();}
              }
             });
/*
            $('#farfalla_reset_dialog').dialog({
              autoOpen: false,
              modal: true,
              title: 'Reset',
              buttons: [
                  {
                    text: "Ok",
                    click: function() {
                        farfalla_reset_all();
                        $(this).dialog('close');
                      }
                  },
                  {
                    text: "Close",
                    click: function() { $(this).dialog('close'); }
                  }
                ]
            }).parent('div').removeClass('ui-corner-all');
*/
            $('#farfalla_reset_all').click(function(){
              if($('#farfalla_reset_all_options').hasClass('visible')){
                $('#farfalla_reset_all_options').removeClass('visible').hide();
              } else {
                $('#farfalla_reset_all_options').addClass('visible').show();
              }
            });
            $('#farfalla_reset_all_button').click(function(){
              farfalla_reset_all();
              $('#farfalla_reset_all_options').hide();
            });



/*
            .qtip({
              content :  $.__('reset'),
              position: {
                my: 'center right',
                at: 'center left'
              },
              style: {
                classes: 'ui-tooltip-farfalla ui-tooltip-shadow',
                width: 'auto'
              }
             });
*/
            farfalla_toolbar_color();
            farfalla_toolbar_top();


        };

        // Stores a cookie with the list of active plugins

        function farfalla_remember_profile() {
          $.cookie('farfalla_active_plugins', active_plugins, { expires: 7 })
        }

        // Deletes the cookie with the list of active plugins

        function farfalla_forget_profile() {
          $.cookie('farfalla_active_plugins',null)
        }

        // Adds the plugin icons

        function farfalla_toolbar_populate(top) {

            $.getJSON(
//              farfalla_path+"backend/plugins/menu/?callback=?",
              farfalla_path+"json/menu.php?callback=?",
                {},
                function(data) {
                  $.each(data.plugins, function(){
                      var plugin = this.Plugin;

                      if(plugin.visible==1){

                        $('<div></div>')
                          .attr({
                            'id':plugin.name+'Activator'
                          })
                          .addClass('plugin_activator ui-corner-all')
                          .appendTo('#farfalla_toolbar_plugins');

                        $('<input />')
                         .attr({
                           'id':plugin.name+'_options_switch',
                           'class':'plugin_options_switch donttouchme',
                           'type':'button',
                           'value':'X'
                          })
                          .click( function(){
                            head.load(farfalla_path+'plugins/'+plugin.name+'/'+plugin.name+'.farfalla.js');
                            $(this).unbind('click'); // first click only!
                          })
                          .insertBefore('#'+plugin.name+'Activator');

                        $('#'+plugin.name+'Activator')
                        .qtip({
                          content :  $.__(plugin.name),
                          position: {
                            my: 'right bottom',
                            at: 'bottom left',
                            target: $('#'+plugin.name+'Activator')
                          },
                          style: {
                            classes: 'ui-tooltip-farfalla ui-tooltip-shadow',
                            width: 'auto',
                            tip: {
                              corner: 'right center',
                              width: 20,
                              height: 12
                            }
                          },
                          events: {
                            render : function() {farfalla_toolbar_color();}
                          }
                        });

                      $('#'+plugin.name+'Activator').css({'background':'url("'+farfalla_path+'plugins/'+plugin.name+'/icons/'+plugin.name+'.png") no-repeat'});
                      $([farfalla_path+'plugins/'+plugin.name+'/icons/'+plugin.name+'_selected.png']).preload()

                    }

                  })
                  farfalla_autoactivate_plugins();
                });

        };

        // Checks if a profile has already been selected, then initializes what is needed

        function farfalla_check_status() {

          $.getJSON(farfalla_path+"backend/profiles/status/?callback=?", {},
            function(data){

              if(data.top) {
                farfalla_set_top(data.top);
              } else if (options.top) {
                farfalla_set_top(options.top);
              }
/*
              if(data.show==1) {
                $('#farfalla_badge').click()
              }
*/
              farfalla_toolbar_populate(30);

            })
          };

        // Adds the show/hide effect to the toolbar logo

        function farfalla_toggle_visibility() {

            $('#farfalla_badge').toggle(
              function() {
                $('#farfalla_toolbar').show();
                $.getJSON(farfalla_path+"backend/profiles/show/1/?callback=?",{});
              },
              function() {
                $('#farfalla_toolbar').hide();
                $.getJSON(farfalla_path+"backend/profiles/show/0/?callback=?",{});
              }
            );

        }

        // Set 'top' value for toolbar positioning

        function farfalla_set_top(value) {
            if (value !== null){
                $('#farfalla_container').css('top',value+'px');
            } else {
                $('#farfalla_container').css('top','0px');
            }

            // Make the side badge scroll with the page

//            var startingTop = $('#farfalla_badge').position().top;
/*
            $(window).scroll(function(){
              $('#farfalla_badge')
                .css({'top': $(window).scrollTop() + startingTop + 'px'});
              $('#farfalla_toolbar')
                .css({'top': $(window).scrollTop() + 'px'});
            });
*/
        }

        // Track activated/deactivated plugins for consistent browsing in different pages

        function farfalla_track_plugins(name, value) {
          if(value==1){
            if(active_plugins.indexOf(name)==-1){
              active_plugins.push(name);
            }
          } else {
            active_plugins.splice(active_plugins.indexOf(name),1);
          }
          if(remember_profile==1){
            farfalla_remember_profile()
          }
          $.farfalla_set_option('active_plugins',active_plugins);
//          console.log(active_plugins)
        }

        // Track activated/deactivated plugins for consistent browsing in different pages

        function farfalla_autoactivate_plugins() {
          if($.cookie('farfalla_active_plugins')!=null){

            var active = $.cookie('farfalla_active_plugins').split(',');

            $.each(active, function(index, value){
              $('#'+value+'_options_switch').click();
            })

            $('#farfalla_remember_profile').click();

          } else {

            $.farfalla_get_option('active_plugins', function(data){
              if(data.value){

                var active = data.value.split(',');

                $.each(active, function(index, value){
                  $('#'+value+'_options_switch').click();
                })
              }

            })

          }

        }

/*
    #######################################
    #                                     #
    #           Real execution...         #
    #                                     #
    #######################################
*/



// determine wether to add the toolbar or not

    if(window.location.href.search(farfalla_path)=='-1'){

        farfalla_toolbar_create();

        farfalla_check_status();

//        farfalla_autoactivate_plugins();

//        farfalla_toggle_visibility();

// end "if" to determine wether to add the toolbar or not

    };

});
})(jQuery);
