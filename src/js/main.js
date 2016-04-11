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

/*
   We don't want any conflict :)
*/

   $f=jQuery.noConflict(true);

/*
    #######################################
    #                                     #
    #    Reusable functions for plugins   #
    #                                     #
    #######################################
*/

    // Bridge function for cakephp gettext translations

    $f.__ = function (string){
      index = $f.inArray(string,strings);
      if(index>=0){
        return translations[index];
      } else {
        return string;
      }
    };

    // A function to move focus and caret to the end of textareas and input elements.
    // Source: http://stackoverflow.com/questions/637287/how-can-you-move-the-cursor-to-the-last-position-of-a-textarea-in-javascript

    $f.fn.focusToEnd = function() {
        return this.each(function() {
            var v = $f(this).val();
            $f(this).focus().val("").val(v);
        });
    };

    // Add plugin configuration area

    $f.farfalla_create_plugin_options = function ( plugin_name ){

      if($f('#'+plugin_name+'_options').length===0){
      $f('<div></div>')
        .attr({
          'id': plugin_name+'_options',
          'class':'plugin_options donttouchme'
        })
        .hide()
        .insertAfter($f('#'+plugin_name+'Activator'));

      $f('<div></div>')
        .attr({
          'id': plugin_name+'_options_custom',
          'class':'plugin_options_actions donttouchme'
        })
        .appendTo('#'+plugin_name+'_options');
        var position = $f('#'+plugin_name+'Activator').position();
        var width = $f('#'+plugin_name+'_options').width();
      }

    };

    // Add plugin-specific UI
    // ...

    $f.farfalla_add_ui = function( plugin_name, type, name, value, neutral_bg, callback ){
      switch(type){
/*
        case 'slider':
          $f('#'+plugin_name+'_options_custom').append('<div id="'+plugin_name+'_slider" class="farfalla_slider"></div>');
          $f('#'+plugin_name+'_slider').slider();
        break;
*/
        case 'button':
          if($f('#'+name+'_button').length===0){
		    neutral_bg = neutral_bg || 0;
            var bgcolor = '#000';
            if(options.background&&options.background!==null){bgcolor=options.background;}
            if(neutral_bg == 1){bgcolor='transparent';}
            $f('#'+plugin_name+'_options_custom').append('<input type="button" id="'+name+'_button" class="farfalla_button" name="'+name+'" value="'+value+'"></input>');
            $f('#'+name+'_button').addClass('donttouchme').css('background',bgcolor+' url("'+farfalla_path+'plugins/'+plugin_name+'/icons/'+name+'.png") no-repeat scroll center').click(callback);
            $f('.farfalla_selected_plugin_option').css('background-color',bgcolor);
          }
        break;

      }
    };

    // Add plugin-specific section of UI elements
    // ...

    $f.farfalla_add_ui_section = function( plugin_name, title ){

        $f('#'+plugin_name+'_options_custom').append('<h2>'+title+'</h2>');

      };

    // Add plugin-specific CSS
    // ...

    $f.farfalla_add_css = function( plugin_name, sheet_name ) {
      if($f('link[href*="'+sheet_name+'"]').length===0){
        $f('<link></link>').attr({
          "rel":"stylesheet",
          "type":"text/css",
          "href":farfalla_path+"plugins/"+plugin_name+"/css/"+sheet_name+".farfalla.css"
        }).prependTo($f('head'));
      }
    };

    $f.farfalla_remove_plugin_css = function(plugin_name){
      $f('link[href*="'+plugin_name+'_"]').remove();
    };

    // A function to add buttons to the toolbar
    // name -> text displayed on the button
    // id -> unique identifier for the button: the final id will be something like button_id
    // accesskey -> the value for the accesskey attribute useful for activating the buttons from the keyboard
    // callback -> a function to be triggered by the button
    // ...

    $f.fn.farfalla_add_button = function( name, text, id, accesskey, bgcolor, txtcolor, callback ){
      $f('<li></li>').appendTo('#farfalla_buttons ul');
      $f('<input></input>')
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
      $f('#button_'+id).click(callback);
      $f('#farfalla_buttons').show();
    };

    // A function for getting options from the Cakephp session array

    $f.farfalla_get_option = function( option, callback ){

      $f.getJSON(
         farfalla_path+"backend/plugins/get_option/"+option+"/?callback=?",
         {}, callback
      );

    };

    // A function for setting options in the Cakephp session array

    $f.farfalla_set_option = function( option, value ){
      if(value===null){
        $f.getJSON(farfalla_path+"backend/plugins/set_option/"+option+"/?callback=?");
      } else {
        $f.getJSON(farfalla_path+"backend/plugins/set_option/"+option+"/"+value+"/?callback=?");
      }
    };

    // A function for getting the XPath of an element
/*
    $f.getXPath = function ( element ) {
    var xpath = '';
    for ( ; element && element.nodeType == 1; element = element.parentNode )
      {
        var id = $f(element.parentNode).children(element.tagName).index(element) + 1;
        id > 1 ? (id = '[' + id + ']') : (id = '');
        xpath = '/' + element.tagName.toLowerCase() + id + xpath;
      }
      return xpath;
    };
*/
    $f.fn.farfalla_switch_on = function ( plugin_name ) {
      $f(this).addClass('farfalla_active');
      $f('#'+plugin_name+'_options_switch').attr('value','h').addClass('plugin_options_switch_on');
      $f.farfalla_track_plugins(plugin_name,1);
    };

    $f.fn.farfalla_switch_off = function ( plugin_name ) {
      $f(this).removeClass('farfalla_active');
      $f('#'+plugin_name+'_options_switch').attr('value','i').removeClass('plugin_options_switch_on');
      $f.farfalla_track_plugins(plugin_name,0);
    };

/*
    #######################################
    #                                     #
    #           Core functions            #
    #                                     #
    #######################################
*/


        // Parses the options passed along while including farfalla.js

        $f.farfalla_ui_options = function() {
		  // if no options are passed, this is skipped (thanks to the "?" in the matching string)
          var source = $f("script[src*='farfalla.js?']").attr('src');
          var optStart = source.search('\\?');
          var options = source.substr(optStart+1).replace(/&/g,'","');
          if (source){
            options = options.replace(/=/g,'":"');
            options = '{"'+options+'"}';
            options = $f.parseJSON(options);
          } else { options = 0; }
          return options;
        };

        // Applies custom colors to the toolbar

        $f.farfalla_toolbar_color = function() {
          if(options.background){
            if(options.background.match(/^#([A-Fa-f0-9]{6})$/i)!==null){
              $f('#farfalla_container, #farfalla_toolbar, .ui-widget-content').css('background',options.background);
              $f('div.ui-tooltip-farfalla, #farfalla_reset_all_button').css('color',options.background);
              $f('<style id="tooltip_colors">div.ui-tooltip-farfalla{border: 2px solid '+options.background+';}</style>').appendTo('head');
            }
          }
        };

        // Applies custom top positioning to the toolbar

        $f.farfalla_toolbar_top = function() {
          if(options.top){
            if(options.top.match(/[0-9]+$f/i)!==null){
              $f.farfalla_set_top(options.top);
            }
          }
        };

        // Resets all options and cookies

        $f.farfalla_reset_all = function() {
          $f('.plugin_options_switch_on').click();
          $f('.farfalla_active').click();
          $f.getJSON(farfalla_path+"backend/profiles/reset/?callback=?",{});
          $f.farfalla_forget_profile();
          remember_profile = 0;
          $f('#farfalla_remember_profile').css('background','url("'+farfalla_path+'dist/images/save.png")');
        };

        // Creates the main toolbar

        $f.farfalla_toolbar_create = function() {

            $f('<div></div>')
              .attr('id','farfalla_container')
              .addClass('donttouchme')
              .prependTo('body');


            $f('<div></div>').attr('id','farfalla_badge').addClass('donttouchme').prependTo('#farfalla_container');

            $f('<img />').attr({
              'id':'farfalla_logo',
              'src':farfalla_path+'dist/images/farfalla_icon.png',
              'height':'34px',
              'width':'48px',
              'alt':'Farfalla logo'
              })
              .appendTo('#farfalla_badge');

            var farfalla_url = 'http://farfalla-project.org/';
            var farfalla_url_title = $f.__('ft_url_title');

            if(window.location.href.search('jobmetoo.com')>0){
              farfalla_url = 'http://www.jobmetoo.com/page/accessibilita-web';
              farfalla_url_title = $f.__('ft_url_title');
            }

            $f('<div><a>Farfalla project</a></div>')
              .attr('id','farfalla_lettering')
              .addClass('donttouchme')
              .hide()
              .appendTo('#farfalla_badge');

            $f('#farfalla_badge a').attr({
               'href': farfalla_url,
               'title': farfalla_url_title
            });

            $f('<div></div>').html($f.__('ft_accessibility')).attr('id','farfalla_badge_label').addClass('donttouchme').hide().prependTo('#farfalla_badge');

            $f('#farfalla_badge')
              .mouseover(
                function(){
                  $f('#farfalla_badge_label').show();
                })
              .mouseleave(
                function(){
                  if($f('#farfalla_badge_label').hasClass('blocked')===false){
                    $f('#farfalla_badge_label').hide();
                  }
                });

            $f('<div></div>').attr('id','farfalla_toolbar').appendTo('#farfalla_container').hide();
            $f('<div class="farfalla_toolbar_separator"></div>').appendTo($f('#farfalla_toolbar'));
            $f('<div></div>').attr('id','farfalla_toolbar_plugins').appendTo('#farfalla_toolbar');
            $f('<div class="farfalla_toolbar_separator"></div>').appendTo($f('#farfalla_toolbar'));
            $f('<div></div>').attr('id','farfalla_remember_profile').css('background','url("'+farfalla_path+'dist/images/save.png") no-repeat').appendTo('#farfalla_toolbar');
            $f('<div></div>').attr('id','farfalla_reset_all').css('background','url("'+farfalla_path+'dist/images/reset.png") no-repeat').appendTo('#farfalla_toolbar');

            $f('<div></div>').attr({
              'id': 'farfalla_reset_all_options',
              'class':'plugin_options ui-corner-all donttouchme'
            }).hide().insertAfter($f('#farfalla_reset_all'));
            $f('<div><p><a id="farfalla_reset_all_button" href="#">'+$f.__('reset')+'</a></p></div>').attr({
              'id': 'farfalla_reset_all_options_custom',
              'class':'plugin_options_actions donttouchme'
            }).appendTo('#farfalla_reset_all_options');
            if(window.location.href.search('jobmetoo.com')=='-1'){
              $f('<div></div>').attr('id','jobmetoo_logo').appendTo('#farfalla_toolbar');
              $f('<p>Powered by</p>')
              .appendTo($f('#jobmetoo_logo'));
              $f('<img />').attr({
                'id':'jobmetoo_logo_img',
                'src':farfalla_path+'dist/images/jobmetoo_logo.png',
                'alt':'logo di Jobmetoo', //localization needed
                'width':'152px',
                'height':'30px'
              }).appendTo($f('#jobmetoo_logo'));
              $f('#jobmetoo_logo_img').wrap('<a href="http://www.jobmetoo.com/" title="Jump to Jobmetoo website"></a>');
            }

            $f('<div></div>').attr('id','farfalla_toolbar_shade').addClass('donttouchme').hide().appendTo('body');

            $f('#farfalla_badge')
              .mouseup(
                function(){
                  $f(this).css('cursor','url(\''+farfalla_path+'dist/images/hand.png\'), auto');
                })
              .mousedown(
                function(){
                  $f(this).css('cursor','url(\''+farfalla_path+'dist/images/grab.png\'), auto');
                });

            $f('#farfalla_logo')
            .click(
              function(){
                $f('#farfalla_container').css('left','auto');
                if($f('#farfalla_toolbar').hasClass('visible')){
                  $f('#farfalla_badge_label').removeClass('blocked').hide();
                  $f('#farfalla_toolbar, #farfalla_lettering').removeClass('visible').hide();
                } else {
                  $f('#farfalla_badge_label').addClass('blocked').show();
                  $f('#farfalla_toolbar, #farfalla_lettering').addClass('visible').show();
                }
              }
            );

            $f('#farfalla_container')
            .draggable({
              axis:'y',
              containment:'window',
//              handle:'#farfalla_badge',
              stop: function(event, ui) {
                $f.getJSON(farfalla_path+"backend/profiles/top/"+$f(this).css('top')+"/?callback=?",{});
              }
            });

            $f('#farfalla_remember_profile')
            .toggle(
              function() {
				$f.farfalla_remember_profile();
				remember_profile = 1;
				$f(this).css('background','url("'+farfalla_path+'dist/images/save_selected.png")');
              },
              function() {
                $f.farfalla_forget_profile();
                remember_profile = 0;
				$f(this).css('background','url("'+farfalla_path+'dist/images/save.png")');
              }
            )
            .qtip({
              content :  $f.__('save_session'),
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
                render : function() {$f.farfalla_toolbar_color();}
              }
             });
/*
            $f('#farfalla_reset_dialog').dialog({
              autoOpen: false,
              modal: true,
              title: 'Reset',
              buttons: [
                  {
                    text: "Ok",
                    click: function() {
                        $f.farfalla_reset_all();
                        $f(this).dialog('close');
                      }
                  },
                  {
                    text: "Close",
                    click: function() { $f(this).dialog('close'); }
                  }
                ]
            }).parent('div').removeClass('ui-corner-all');
*/
            $f('#farfalla_reset_all').click(function(){
              if($f('#farfalla_reset_all_options').hasClass('visible')){
                $f('#farfalla_reset_all_options').removeClass('visible').hide();
              } else {
                $f('#farfalla_reset_all_options').addClass('visible').show();
              }
            });
            $f('#farfalla_reset_all_button').click(function(){
              $f.farfalla_reset_all();
              $f('#farfalla_reset_all_options').hide();
            });

            // Keep the toolbar on the right side of the window on resize
            $f(window).scroll(function(){
              $f('#farfalla_container').css('margin-right',0-$f(window).scrollLeft());
            });

/*
            .qtip({
              content :  $f.__('reset'),
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
            $f.farfalla_toolbar_color();
            $f.farfalla_toolbar_top();

        };

        // Stores a cookie with the list of active plugins

        $f.farfalla_remember_profile = function() {
          $f.cookie('farfalla_active_plugins', active_plugins, { expires: 7 });
        };

        // Deletes the cookie with the list of active plugins

        $f.farfalla_forget_profile = function() {
          $f.cookie('farfalla_active_plugins',null);
        };

        // Adds the plugin icons

        $f.farfalla_toolbar_populate = function(top) {

            $f.getJSON(
//              farfalla_path+"backend/plugins/menu/?callback=?",
              farfalla_path+"src/json/menu.php?callback=?",
                {},
                function(data) {
                  $f.each(data.plugins, function(){
                      var plugin = this.Plugin;
                      if(plugin.visible==1&&($f.browser.mobile===false||plugin.mobile)){
                        $f('<div><span class="farfalla_plugin_icon">'+plugin.glyph+'</a></div>')
                          .attr({
                            'id':plugin.name+'Activator'
                          })
                          .addClass('plugin_activator ui-corner-all')
                          .appendTo('#farfalla_toolbar_plugins');

                        $f('<input />')
                         .attr({
                           'id':plugin.name+'_options_switch',
                           'class':'plugin_options_switch donttouchme',
                           'type':'button',
                           'value':'i'
                          })
                          .click( function(){
                            head.load(farfalla_path+'plugins/'+plugin.name+'/'+plugin.name+'.farfalla.js?v='+version);
                            $f(this).attr('value','h').unbind('click'); // first click only!
                          })
                          .appendTo('#'+plugin.name+'Activator');

                        $f('#'+plugin.name+'Activator')
                        .qtip({
                          content :  $f.__(plugin.name),
                          position: {
                            my: 'right bottom',
                            at: 'bottom left',
                            target: $f('#'+plugin.name+'Activator')
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
                            render : function() {$f.farfalla_toolbar_color();}
                          }
                        });

                        $f('#'+plugin.name+'Activator span.farfalla_plugin_icon')
                        .click(function(){ $f('#'+plugin.name+'_options_switch').click(); });
                    }
                  });

                  $f.farfalla_autoactivate_plugins();
                });

        };

        // Checks if a profile has already been selected, then initializes what is needed

        $f.farfalla_check_status = function() {

          $f.getJSON(farfalla_path+"backend/profiles/status/?callback=?", {},
            function(data){

              if(data.top) {
                $f.farfalla_set_top(data.top);
              } else if (options.top) {
                $f.farfalla_set_top(options.top);
              }
/*
              if(data.show==1) {
                $f('#farfalla_badge').click()
              }
*/
              $f.farfalla_toolbar_populate(30);

            });
          };

        // Adds the show/hide effect to the toolbar logo

        $f.farfalla_toggle_visibility = function() {

            $f('#farfalla_badge').toggle(
              function() {
                $f('#farfalla_toolbar').show();
                $f.getJSON(farfalla_path+"backend/profiles/show/1/?callback=?",{});
              },
              function() {
                $f('#farfalla_badge_label').removeClass('blocked').hide();
                $f('#farfalla_toolbar').hide();
                $f.getJSON(farfalla_path+"backend/profiles/show/0/?callback=?",{});
              }
            );

        };

        // Set 'top' value for toolbar positioning

        $f.farfalla_set_top = function(value) {
            if (value!==null){
                $f('#farfalla_container').css('top',value+'px');
            } else {
                $f('#farfalla_container').css('top','0px');
            }

            // Make the side badge scroll with the page

//            var startingTop = $f('#farfalla_badge').position().top;
/*
            $f(window).scroll(function(){
              $f('#farfalla_badge')
                .css({'top': $f(window).scrollTop() + startingTop + 'px'});
              $f('#farfalla_toolbar')
                .css({'top': $f(window).scrollTop() + 'px'});
            });
*/
        };

        // Track activated/deactivated plugins for consistent browsing in different pages

        $f.farfalla_track_plugins = function(name, value) {
          if(value==1){
            if(active_plugins.indexOf(name)==-1){
              active_plugins.push(name);
            }
          } else {
            active_plugins.splice(active_plugins.indexOf(name),1);
          }
          if(remember_profile==1){
            $f.farfalla_remember_profile();
          }
          $f.farfalla_set_option('active_plugins',active_plugins);
        };

        // Track activated/deactivated plugins for consistent browsing in different pages

        $f.farfalla_autoactivate_plugins = function() {

          if($f.cookie('farfalla_active_plugins') && $f.cookie('farfalla_active_plugins')!==null){

            var active = $f.cookie('farfalla_active_plugins').split(',');

            $f.each(active, function(index, value){
              $f('#'+value+'_options_switch').click();
            });

            $f('#farfalla_remember_profile').click();

          } else {

            $f.farfalla_get_option('active_plugins', function(data){
              if(data.value){

                var active = data.value.split(',');

                $f.each(active, function(index, value){
                  $f('#'+value+'_options_switch').click();
                });
              }

            });

          }

        };

/*
    #######################################
    #                                     #
    #           Real execution...         #
    #                                     #
    #######################################
*/


    // Main variables

    var options = $f.farfalla_ui_options();

    var active_plugins = new Array([]);
    if($f.cookie('farfalla_active_plugins')){
      var remember_profile = 1;
    } else {
      var remember_profile = 0;
    }


// determine wether to add the toolbar or not

    if(window.location.href.search(farfalla_path)=='-1'){

        $f.farfalla_toolbar_create();

        $f.farfalla_check_status();

    } // end "if" to determine wether to add the toolbar or not

