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

//   var store = store.namespace('store');

/*
    #######################################
    #                                     #
    #    Generic functions for plugins    #
    #                                     #
    #######################################
*/

    // Plugins list in json

    var plugins = { "plugins" : [
            {
                "name": "fontsize",
                "visible": true,
                "icon":"search-plus",
                "mobile": true
              },
            {
                "name": "hicontrast",
                "visible": true,
                "icon":"adjust",
                "mobile": true
              },
            {
                "name": "bigcursor",
                "visible": true,
                "icon":"mouse-pointer",
                "mobile": false
              },
            {
                "name": "clarifier",
                "visible": true,
                "icon":"lightbulb-o",
                "mobile": true
              },
            {
                "name": "keyboard",
                "visible": true,
                "icon":"keyboard-o",
                "mobile": false
              }
            ]};

    // Translations require improvement

    var detected_language = navigator.language || navigator.userLanguage;

    var strings = new Array(
      "ft_farfalla_project",
      "ft_accessibility",
      "ft_accessibility_preferences",
      "ft_actions",
      "ft_url_title",
      "ft_url_title_jm2",
      "save_session",
      "reset",
      "hicontrast",
      "fontsize",
      "clarifier",
      "magnifier",
      "keyboard",
      "bigcursor",
      "Color_schemes",
      "Actions" );

    var translations_it = new Array(
      "Farfalla project",
      "Accessibilità",
      "Preferenze dell'accessibilità",
      "Azioni",
      "Vai al sito di Farfalla project",
      "Vai alla pagina sull'accessibilità",
      "Salva le impostazioni correnti per il futuro",
      "Azzera tutte le impostazioni",
      "Controllo del contrasto e delle combinazioni dei colori",
      "Controllo delle dimensioni del testo",
      "Alta leggibilità",
      "Ingrandimento selettivo",
      "Tastiera virtuale su schermo",
      "Puntatore del mouse ingrandito",
      "Combinazioni cromatiche",
      "Azioni" );

    var translations_en = new Array(
      "Farfalla project",
      "Accessibility",
      "Accessibility Preferences",
      "Actions",
      "Jump to the Farfalla project website",
      "Jump to the web accessibility page",
      "Save current settings for the future",
      "Reset all settings",
      "Contrast and color scheme control",
      "Font size control",
      "High readability",
      "Selective magnification",
      "Onscreen virtual keyboard",
      "Larger mouse cursor",
      "Color schemes",
      "Actions" );

    // Bridge function for cakephp gettext translations

    $f.__ = function (string){

      index = $f.inArray(string,strings);
      //console.log("Detected language is: "+detected_language);

      switch (detected_language) {
        case 'it-IT':
            translations = translations_it;
          break;
        case 'it':
            translations = translations_it;
          break;
        default:
           translations = translations_en;
      }
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
            var v1 = $f(this).val();
            $f(this).focus().val("").val(v1);
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
        .hide()
        .appendTo('#farfalla_container');
        $f.farfalla_toolbar_color();
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
            $f('#'+plugin_name+'_options').append('<div id="'+name+'_button" class="farfalla_button '+classes+'"></div>');
            $f('#'+name+'_button').addClass('donttouchme').html('<i class="fa fa-'+faicon+'" aria-hidden="true"></i><span class="sr-only">'+name+'</span>').click(callback);
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

    $f.farfalla_get_option = function( option ){
/*
      $f.getJSON(
         farfalla_path+"backend/plugins/get_option/"+option+"/?callback=?",
         {}, callback
      );
*/
//      var value = fstore.find(option);
//      return value;

    };

    // A function that stores an option locally

    $f.farfalla_set_option = function( option, value ){
//      fstore.insert(option, value);
//      console.log(option+' set to '+store.get(option));
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
      _gafarfalla('send', 'event', plugin_name, 'on', window.location.hostname);
      $f('.plugin_options').attr('aria-hidden','true').hide();
      $f('#'+plugin_name+'Activator').addClass('farfalla_active');
      $f('#'+plugin_name+'_options').css('top',($f('#'+plugin_name+'Activator').position().top-2)+'px');
      $f.farfalla_track_plugins(plugin_name,1);
      $f.farfalla_toolbar_color();
    };

    $f.fn.farfalla_switch_off = function ( plugin_name ) {
      _gafarfalla('send', 'event', plugin_name, 'off', window.location.hostname);
      $f('.plugin_options').attr('aria-hidden','true').hide();
      if(options.background){$f('#'+plugin_name+'Activator').css('color','unset');}
      if(options.color){$f('#'+plugin_name+'Activator').css('background','unset');}
      $f('#'+plugin_name+'Activator').removeClass('farfalla_active');
      $f.farfalla_track_plugins(plugin_name,0);

//      $f.farfalla_toolbar_color();
    };

/*
    #######################################
    #                                     #
    #           Core functions            #
    #                                     #
    #######################################
*/


        // Parses the options passed along while including farfalla.js

/* MOVED TO farfalla.js AND REWRITTEN IN BAREMETAL JS
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
*/
        // Applies custom colors to the toolbar background and text

        $f.farfalla_toolbar_color = function() {

          if(options.background && options.background.match(/^#[A-Fa-f0-9]{6}$/i)!==null){

            $f('#farfalla_container, #farfalla_badge, #farfalla_toolbar, .plugin_options, .ui-widget-content')
              .css({
                'background':options.background
              });
            $f('.farfalla_active')
              .css({
                'color':options.background
              });
          }

          if(options.color && options.color.match(/^#[A-Fa-f0-9]{6}$/i)!==null){
            $f('#farfalla_container, #farfalla_badge, #farfalla_toolbar, #farfalla_logo a:link, #farfalla_logo a:visited, .plugin_options, .ui-widget-content')
              .css({
                'color':options.color
              });
            $f('#farfalla_badge, #farfalla_reset_all, #farfalla_logo, .plugin_activator, .plugin_options, .ui-widget-content')
              .css({
                'border-left': '2px solid '+options.color,
              });
            $f('#farfalla_badge, #farfalla_reset_all, .plugin_options, .ui-widget-content')
              .css({
                'border-top': '2px solid '+options.color,
              });
            $f('#farfalla_badge, #farfalla_toolbar, .plugin_options, .ui-widget-content')
              .css({
                'border-bottom': '2px solid '+options.color,
              });
            $f('.plugin_options')
              .css({
              'border-right': '2px solid '+options.color,
              });
            // Text
            $f('.farfalla_active')
              .css({
                'background':options.color,
              });
          }

        };


        // Applies custom top positioning to the toolbar

        $f.farfalla_toolbar_top = function() {
          if(options.top){
            if(options.top.match(/^[0-9]+$/i)!==null){
              $f.farfalla_set_top(options.top);
            }
          }
        };

        // Resets all options and cookies

        $f.farfalla_reset_all = function() {
          $f('.farfalla_active').click();
//          $f.getJSON(farfalla_path+"backend/profiles/reset/?callback=?",{});
          store(false); // clears all items from storage
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
              .addClass('donttouchme')
              // translation needed
              .html('<i class="fa fa-cog" aria-hidden="true"></i><span class="sr-only">'+$f.__('ft_accessibility_preferences')+'</span>')
              .prependTo('#farfalla_container');
/*
            $f('#farfalla_badge').qtip({
              content:
              {
                text: $f.__('ft_accessibility_preferences')
              },
              position:{
                my: 'center right',
                at: 'center left'
              },
              hide:{
                inactive:3000
              }
            });
*/
            $f('<div aria-hidden="true"></div>').attr('id','farfalla_toolbar').appendTo('#farfalla_container').hide();

            $f('<div></div>').attr('id','farfalla_toolbar_plugins').appendTo('#farfalla_toolbar');

            // Add the "reset all" button
            $f('<div><i class="fa fa-refresh" aria-hidden="true"></i><span class="sr-only">'+$f.__('reset')+'</span></div>')
              .attr('id','farfalla_reset_all')
/*              .qtip({
                content:
                {
                  text: $f.__("reset")
                },
                position:{
                  my: 'center right',
                  at: 'center left'
                }
              })*/
              .appendTo('#farfalla_toolbar');

            // Add Farfalla project logo and link to main website
            $f('<div><a href="https://farfalla-project.org"><i class="icon-fp-logo" aria-hidden="true"></i><span class="sr-only">'+$f.__('ft_url_title')+'</span></a></div>')
                .attr('id','farfalla_logo')
/*                .qtip({
                  content:
                  {
                    text: $f.__("ft_url_title")
                  },
                  position:{
                    my: 'center right',
                    at: 'center left'
                  }
                })*/
                .appendTo('#farfalla_toolbar');

            /* Saving preferences is temporarily unavailable
             $f('<div id="farfalla_remember_profile"><i class="fa fa-star" aria-hidden="true"></i><span class="sr-only">'+$f.__('save_session')+'</span></div>')
              .appendTo('#farfalla_toolbar');
              */
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
                  $f.farfalla_toolbar_color();
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

//              stop: function(event, ui) {
//                $f.getJSON(farfalla_path+"backend/profiles/top/"+$f(this).position().top+"/?callback=?",{});
//                $f(this).css('height','auto');
//              }

            });
*/

            $f('#farfalla_remember_profile').click(function(){
              var iteration = $f(this).data('iteration')||1;
              switch(iteration){
                case 1:
                  $f.farfalla_remember_profile();
                  $f(this).addClass('farfalla_active');
                  remember_profile = 1;
                  break;
                case 2:
                  $f.farfalla_forget_profile();
                  $f(this).removeClass('farfalla_active');
                  remember_profile = 0;
                  break;
              }
              iteration++;
              if (iteration>2) iteration=1;
              $f(this).data('iteration',iteration);
            });

// TODO: review this part

            $f('#farfalla_reset_all').click(function(){
              $f.farfalla_reset_all();
/*              if($f('#farfalla_reset_all_options').attr('aria-hidden')==='true'){
                $f('#farfalla_reset_all_options').attr('aria-hidden','false').hide();
              } else {
                $f('#farfalla_reset_all_options').attr('aria-hidden','true').show();
              }
*/
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
    //      Cookies.set('farfalla_active_plugins', active_plugins, { expires: 7 });
        };

        // Deletes the cookie with the list of active plugins

        $f.farfalla_forget_profile = function() {
          // $f('#farfalla_remember_profile').removeClass('farfalla_active');
      //    Cookies.set('farfalla_active_plugins',null);
        };

        // Adds the plugin icons

        $f.farfalla_toolbar_populate = function() {

          var data = {"plugins": [{
              "Plugin": {
                  "name": "fontsize",
                  "visible": true,
                  "icon":"search-plus",
                  "mobile": true
              }
          }, {
              "Plugin": {
                  "name": "hicontrast",
                  "visible": true,
                  "icon":"adjust",
                  "mobile": true
              }
          }, {
              "Plugin": {
                  "name": "bigcursor",
                  "visible": true,
                  "icon":"mouse-pointer",
                  "mobile": false
              }
          }, {
              "Plugin": {
                  "name": "clarifier",
                  "visible": true,
                  "icon":"lightbulb-o",
                  "mobile": true
              }
          }, {
              "Plugin": {
                  "name": "keyboard",
                  "visible": true,
                  "icon":"keyboard-o",
                  "mobile": false
              }
          }]};
/*
            $f.getJSON(
              farfalla_path+"src/json/menu.php?callback=?",
                {},
                function(data) {
*/
                $f.each(data.plugins, function(){
                    var plugin = this.Plugin;

                    if(plugin.visible==1&&($f.browser.mobile===false||plugin.mobile)){
                      $f('<div><i class="fa fa-'+plugin.icon+' farfalla_plugin_icon" aria-hidden="true"></i><span class="sr-only">'+$f.__(plugin.name)+'</span></div>')
                        .attr({
                            'id' : plugin.name+'Activator'
                        })
                        .addClass('plugin_activator')
/*                        .qtip({
                          content:
                          {
                            text: $f.__(plugin.name)
                          },
                          position:{
                            my: 'center right',
                            at: 'center left'
                          }
                        })*/
                        .appendTo('#farfalla_toolbar_plugins')
                        // head.load(farfalla_path+'src/plugins/'+plugin.name+'/'+plugin.name+'.farfalla.js?v='+Math.random());
                        .click( function(){
                          if($f(this).hasClass('farfalla_active')){
                            window[plugin.name+'_off']();
//                            console.log(store.get('active_plugins'));
                          } else {
                            window[plugin.name+'_on']();
//                            console.log(store.get('active_plugins'));
                          }
                        });
                    }
                });
//                $f.farfalla_autoactivate_plugins();

        };

        // Checks if a profile has already been selected, then initializes what is needed

        $f.farfalla_check_status = function() {

          // $f.getJSON(farfalla_path+"backend/profiles/status/?callback=?", {},
          //   function(data){
          //     if(data.top) {
          //       $f.farfalla_set_top(data.top);
          //     } else if (options.top) {
          //       $f.farfalla_set_top(options.top);
          //     }

              $f.farfalla_toolbar_populate();

          // });
          };

        // Adds the show/hide effect to the toolbar logo

        $f.farfalla_toggle_visibility = function() {

            $f('#farfalla_badge').toggle(
              function() {
                $f('#farfalla_toolbar').show();
//                $f.getJSON(farfalla_path+"backend/profiles/show/1/?callback=?",{});
              },
              function() {
                $f('#farfalla_badge_label').removeClass('blocked').hide();
                $f('#farfalla_toolbar').hide();
//                $f.getJSON(farfalla_path+"backend/profiles/show/0/?callback=?",{});
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
          } else if(value===0) {
            active_plugins.splice(active_plugins.indexOf(name),1);
          }
          if(remember_profile==1){
            $f.farfalla_remember_profile();
          }
          $f.farfalla_set_option('active_plugins',active_plugins);
        };

/*
        $f.farfalla_autoactivate_plugins = function() {

          var active = store.get('active_plugins');

          $f('#farfalla_badge').click();

          $f.each(active, function(index, value){
            $f('#'+value+'Activator').click();
          });

          $f('#farfalla_badge').click();

        };
*/
/*
    #######################################
    #                                     #
    #           Real execution...         #
    #                                     #
    #######################################
*/


    // Main variables

    // var options = $f.farfalla_ui_options();
    if(options.substring(0, 6) != '{"http'){
      options = $f.parseJSON(options);
    } else {
      options = "";
    }
/*
    if (fstore.find('active_plugins')){
      var active_plugins = fstore.find('active_plugins');
    } else {
*/
      var active_plugins = [];
//    }

/*
    if(Cookies.get('farfalla_active_plugins')){
      var remember_profile = 1;
    } else {
*/
      var remember_profile = 0;
//    }


    // determine wether to add the toolbar or not

//    if(window.location.href.search(farfalla_path)=='-1'){

        $f.farfalla_toolbar_create();

        $f.farfalla_check_status();

  //  } // end "if" to determine wether to add the toolbar or not
