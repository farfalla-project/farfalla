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
    #    Generic functions for plugins    #
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
          'class':'plugin_options donttouchme',
          'aria-hidden':'true'
        })
        .css({
          'top':($f('#'+plugin_name+'Activator').position().top-2)+'px'
        })
        /*
        .position({
          my: "right top",
          at: "left top",
          of: "#"+plugin_name+"Activator"
        })
        */
        .hide()
        .appendTo('#farfalla_container');
        console.log($f('#'+plugin_name+'Activator').position().top);

/*
      $f('<div></div>')
        .attr({
          'id': plugin_name+'_options_custom',
          'class':'plugin_options_actions donttouchme'
        })
        .appendTo('#'+plugin_name+'_options');
*/
/*
        var position = $f('#'+plugin_name+'Activator').position();
        var width = $f('#'+plugin_name+'_options').width();
*/
      }

    };

    // Add plugin-specific UI
    // ...

    $f.farfalla_add_ui = function( plugin_name, type, name, faicon, value, classes, callback ){
      switch(type){
/*
        case 'slider':
          $f('#'+plugin_name+'_options_custom').append('<div id="'+plugin_name+'_slider" class="farfalla_slider"></div>');
          $f('#'+plugin_name+'_slider').slider();
        break;
*/
        case 'button':
          if($f('#'+name+'_button').length===0){

      //      if(options.background&&options.background!==null){bgcolor=options.background;}
            $f('#'+plugin_name+'_options').append('<div id="'+name+'_button" class="farfalla_button '+classes+'"></div>');
            $f('#'+name+'_button').addClass('donttouchme').html('<i class="fa fa-'+faicon+'" aria-hidden="true"></i><span class="sr-only">'+name+'</span>').click(callback);
            //$f('.farfalla_selected_plugin_option').css('background-color',bgcolor);
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
          "href":farfalla_path+"src/plugins/"+plugin_name+"/css/"+sheet_name+".farfalla.css"
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

    // A function that gets the XPath of an element
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
      _gafarfalla('send', 'event', plugin_name, 'on');
      $f('.plugin_options').attr('aria-hidden','true').hide();
      $f('#'+plugin_name+'Activator').addClass('farfalla_active');
      $f('#'+plugin_name+'_options').css('top',($f('#'+plugin_name+'Activator').position().top-2)+'px');
      $f.farfalla_track_plugins(plugin_name,1);
    };

    $f.fn.farfalla_switch_off = function ( plugin_name ) {
      _gafarfalla('send', 'event', plugin_name, 'off');
      $f('.plugin_options').attr('aria-hidden','true').hide();
      $f('#'+plugin_name+'Activator').removeClass('farfalla_active');
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
          var options = 0;
          if (source){
            var optStart = source.search('\\?');
            options = source.substr(optStart+1).replace(/&/g,'","');
            options = options.replace(/=/g,'":"');
            options = '{"'+options+'"}';
            options = $f.parseJSON(options);
          }
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
        };

        // Creates the main toolbar

        $f.farfalla_toolbar_create = function() {

            // Creates the main container
            $f('<div></div>')
              .attr('id','farfalla_container')
              .addClass('donttouchme')
              .prependTo('body');

            // Creates the visible badge, with a cog icon
            $f('<div></div>')
              .attr('id','farfalla_badge')
              .css('color','#fff')
              .addClass('donttouchme')
              // translation needed
              .html('<i class="fa fa-cog" aria-hidden="true"></i><span class="sr-only">'+$f.__('ft_accessibility_preferences')+'</span>')
              .prependTo('#farfalla_container');

/*
            var farfalla_url = 'http://farfalla-project.org/';
            var farfalla_url_title = $f.__('ft_url_title');

            if(window.location.href.search('jobmetoo.com')>0){
              farfalla_url = 'http://www.jobmetoo.com/page/accessibilita-web';
              farfalla_url_title = $f.__('ft_url_title');
            }

            $f('#farfalla_badge a').attr({
               'href': farfalla_url,
               'title': farfalla_url_title
            });
*/

/*

            TODO: replace with qtip

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
*/
            $f('<div aria-hidden="true"></div>').attr('id','farfalla_toolbar').appendTo('#farfalla_container').hide();

            $f('<div></div>').attr('id','farfalla_toolbar_plugins').appendTo('#farfalla_toolbar');

            $f('<div><i class="fa fa-refresh" aria-hidden="true"></i><span class="sr-only">'+$f.__('reset')+'</span></div>')
              .attr('id','farfalla_reset_all')
              .appendTo('#farfalla_toolbar');
            $f('<div id="farfalla_remember_profile"><i class="fa fa-star" aria-hidden="true"></i><span class="sr-only">'+$f.__('save_session')+'</span></div>')
              .appendTo('#farfalla_toolbar');
            $f('<div></div>').attr('id','farfalla_toolbar_shade').addClass('donttouchme').hide().appendTo('body');

            $f('#farfalla_badge')
              .mouseup(
                function(){
                  $f(this).css('cursor','url(\''+farfalla_path+'dist/images/hand.png\'), auto');
                })
              .mousedown(
                function(){
                  $f(this).css('cursor','url(\''+farfalla_path+'dist/images/grab.png\'), auto');
                })
              .click(
              function(){
                if($f('#farfalla_toolbar').attr('aria-hidden')==='false'){
                  $f('.plugin_options').attr('aria-hidden','true').hide();
                  $f('#farfalla_toolbar, #farfalla_lettering').attr('aria-hidden','true').hide();
                } else {
                  $f('#farfalla_toolbar, #farfalla_lettering').attr('aria-hidden','false').show();
                }

              }
            );
/*
            $f('#farfalla_container')

            .draggable({
              axis:'y',
              containment:'window',
//              handle:'#farfalla_badge',
              stop: function(event, ui) {
                $f.getJSON(farfalla_path+"backend/profiles/top/"+$f(this).position().top+"/?callback=?",{});
                $f(this).css('height','auto');
              }
            });
*/
            $f('#farfalla_remember_profile').click(function(){
              var iteration = $f(this).data('iteration')||1;
              switch(iteration){
                case 1:
                  $f.farfalla_remember_profile();
                  remember_profile = 1;
                  break;
                case 2:
                  $f.farfalla_forget_profile();
                  remember_profile = 0;
                  break;
              }
              iteration++;
              if (iteration>2) iteration=1;
              $f(this).data('iteration',iteration);
            });

// TODO: review this part

            $f('#farfalla_reset_all').click(function(){
              if($f('#farfalla_reset_all_options').attr('aria-hidden')==='true'){
                $f('#farfalla_reset_all_options').attr('aria-hidden','false').hide();
              } else {
                $f('#farfalla_reset_all_options').attr('aria-hidden','true').show();
              }
            });

// TODO: review this part

            $f('#farfalla_reset_all_button').click(function(){
              $f.farfalla_reset_all();
              $f('#farfalla_reset_all_options').hide();
            });

            // Keep the toolbar on the right side of the window on resize
/*
            $f(window).scroll(function(){
              $f('#farfalla_container').css('margin-right',0-$f(window).scrollLeft());
            });
*/
            $f.farfalla_toolbar_color();
            $f.farfalla_toolbar_top();

        };

        // Stores a cookie with the list of active plugins

        $f.farfalla_remember_profile = function() {
//          Cookies.set('farfalla_active_plugins', active_plugins, { expires: 7 });
        };

        // Deletes the cookie with the list of active plugins

        $f.farfalla_forget_profile = function() {
//          Cookies.set('farfalla_active_plugins',null);
        };

        // Adds the plugin icons

        $f.farfalla_toolbar_populate = function() {

            $f.getJSON(
              farfalla_path+"src/json/menu.php?callback=?",
                {},
                function(data) {
                  $f.each(data.plugins, function(){
                      var plugin = this.Plugin;
                      if(plugin.visible==1&&($f.browser.mobile===false||plugin.mobile)){
                        $f('<div><i class="fa fa-'+plugin.icon+' farfalla_plugin_icon" aria-hidden="true"></i><span class="sr-only">'+$f.__(plugin.name)+'</span></div>')
                          .attr({
                            'id' : plugin.name+'Activator'
                          })
                          .addClass('plugin_activator')
                          .appendTo('#farfalla_toolbar_plugins');
                          head.load(farfalla_path+'src/plugins/'+plugin.name+'/'+plugin.name+'.farfalla.js?v='+Math.random());

/*
                        $f('#'+plugin.name+'Activator')
                        .qtip({
                          content :  $f.__(plugin.name),
                          position: {
                            my: 'right center',
                            at: 'center left',
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
*/
/*
                        $f('#'+plugin.name+'Activator')
                          .click( function(){
                            $f('.plugin_options').attr('aria-hidden','true').hide();
                            console.log('first click on '+plugin.name);
                            $f(this).unbind('click'); // first click only!
                            head.load(farfalla_path+'src/plugins/'+plugin.name+'/'+plugin.name+'.farfalla.js?v='+Math.random());
                          });
*/
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

              $f.farfalla_toolbar_populate();

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
            if (value!==null&&value>0){
                $f('#farfalla_container').css('top',value+'px');
            } else {
                $f('#farfalla_container').css('top','0px');
            }

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
/*
          if(Cookies.get('farfalla_active_plugins') && Cookies.get('farfalla_active_plugins')!==null){

            var active = Cookies.get('farfalla_active_plugins').split(',');

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
*/
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
/*
    if(Cookies.get('farfalla_active_plugins')){
      var remember_profile = 1;
    } else {
*/
      var remember_profile = 0;
//    }


    // determine wether to add the toolbar or not

    if(window.location.href.search(farfalla_path)=='-1'){

        $f.farfalla_toolbar_create();

        $f.farfalla_check_status();

    } // end "if" to determine wether to add the toolbar or not
