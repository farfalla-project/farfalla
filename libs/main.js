
$(function() {


// Inclusion of the needed css stylesheets

    $('<link>').attr('type','text/css').attr('rel','stylesheet').attr('href',farfalla_path+'css/jquery-ui-1.7.2.custom.css').prependTo('head');
    $('<link>').attr('type','text/css').attr('rel','stylesheet').attr('href',farfalla_path+'css/farfalla.css').appendTo('head');

// Farfalla core functions

        // Creates the main toolbar

        function farfalla_toolbar_create() {
            $('<div></div>').attr('id','farfalla_toolbar').addClass('farfalla_toolbar').addClass('ui-corner-left').prependTo('body');

            $('<div></div>').attr('id','farfalla_toolbar_margin').appendTo('#farfalla_toolbar');
            			
            $('<div></div>').attr('id','farfalla_logo').appendTo('#farfalla_toolbar');
            
            $('<div></div>').attr('id','farfalla_home').appendTo('#farfalla_toolbar');
            
              $('#farfalla_logo img').callout({
                msg:"Fare click qui per mostrare o nascondere la barra",
                position: "bottom"
              });
            
            $('<img></img>').attr({
                'src':farfalla_path+'/images/farfalla_icon.png',
                'alt':'Farfalla logo - Click to hide or display the toolbar'
            }).appendTo('#farfalla_logo');
            
            $('<a></a>').attr({
            	'id':'farfalla_home_link',
            	'href':'http://www.farfalla-project.org'
            }).appendTo('#farfalla_home');
            
            $('<img></img>').attr({
            	'id':'farfalla_home_icon',
                'src':farfalla_path+'/images/home_icon.png',
                'alt':'Farfalla logo - Click to hide or display the toolbar'
            }).appendTo('#farfalla_home_link');

            $('<div></div>').attr('id','farfalla_handle')
              .css('cursor','url(\''+farfalla_path+'/images/hand.png\'), auto')
              .appendTo('#farfalla_toolbar');

            $('#farfalla_handle').mouseup(  
              function(){
                $(this).css('cursor','url(\''+farfalla_path+'/images/hand.png\'), auto')
              }
            );
            
            $('#farfalla_handle').mousedown(  
              function(){
                $(this).css('cursor','url(\''+farfalla_path+'/images/grab.png\'), auto')
              }
            );            

            $('<div></div>').attr('id','farfalla_buttons').hide().appendTo('#farfalla_toolbar');
            
            $('<ul></ul>').appendTo('#farfalla_buttons');

            $('#farfalla_toolbar').draggable({
                    handle : '#farfalla_handle',
                    axis: 'y',
                    cursor:'url(\''+farfalla_path+'/images/grab.png\'), auto',
                    stop: function() {
                        $.getJSON(
                            farfalla_path+"backend/profiles/top/"+$(this).css('top')+"/?callback=?",{}
                        );
                    }
                }).css('position','absolute');

        };

        // Adds the profile selection form

        function farfalla_selection_create(top) {

            $('<div></div>').attr('id','farfalla_selection').appendTo('#farfalla_toolbar');

            $('<form></form>').attr({'id':'farfalla_toolbar_form','action':'#','method':'post'}).appendTo('#farfalla_selection');
                $('<select></select>').attr({'id':'farfalla_profile','name':'farfalla_profile'}).addClass('ui-corner-all').appendTo('#farfalla_toolbar_form');
                    $('<option></option>').addClass('choose').html('Loading...').appendTo('#farfalla_profile');
                    $('<option></option>').html('---').css('text-align','center').attr('disabled','disabled').appendTo('#farfalla_profile');
                    
                // $('<input></input>').attr({'type':'submit','id':'farfalla_activator','value':'loading...','disabled':'disabled'}).addClass('ui-corner-all').appendTo('#farfalla_toolbar_form');

//                $('#farfalla_profile').change(function(){
//                    $('#farfalla_activator').removeAttr('disabled');
//                });

                $.getJSON(
                    farfalla_path+"backend/profiles/menu/?callback=?",
                    {},
                    function(data) {
                        $.each(data.profiles, function(){
                            $('<option>')
// title must be substituted with a proper jquery callout
                                .attr(
                                    {'value': this.Profile.id, 'title': this.descriptionTranslation[0].content}
                                )
                                .text(this.nameTranslation[0].content)
                                .appendTo('#farfalla_profile');
                        });
                        $('#farfalla_profile option[class=choose]').html(data.ui.choose);
//                        $('#farfalla_activator').val(data.ui.get);
                    }
                );

        };

        // Adds the plugins listing area

        function farfalla_plugins_listing_create(id) {

            $('<div></div>').attr('id','farfalla_active').appendTo('#farfalla_toolbar');
                $('<ul></ul>').appendTo('#farfalla_active');
                        $('<input></input>').attr({'type':'button','id':'farfalla_change_profile','value':'loading ...'}).addClass('ui-corner-all').prependTo('#farfalla_active');

                            $.getJSON(
                                farfalla_path+'backend/profiles/retrieve/'+id+'/?callback=?',
                                {},
                                function(data) {
                                    $.each(data.description.Plugin, function(i, plugin){
                                        $('#farfalla_active ul').prepend('<li>'+plugin.name+'</li>');
                                        $('#farfalla_selection').hide();
//                                        $('#farfalla_active').show();
                                        jQuery.getScript(farfalla_path+'plugins/'+plugin.name+'/'+plugin.name+'.farfalla.js');
                                    });
                                    $('#farfalla_change_profile').val(data.ui.reset)
                                }
                            );
    
        };

        // Adds interaction to the activation button in the profile selection form

        function farfalla_selection_interaction() {

//            $("#farfalla_activator").click(function() {
            $("#farfalla_profile").change(function() {

            var farfalla_profile = $('#farfalla_profile').val();

            $.getJSON(
                farfalla_path+"backend/profiles/retrieve/"+$('#farfalla_profile').val()+"/?callback=?", {},

                // Recall the plugins

                function(data) {
                    farfalla_plugins_listing_create($('#farfalla_profile').val());
                    farfalla_plugins_listing_interaction();
                    $('#farfalla_toolbar_form').fadeOut('slow');
                    $('#farfalla_active').fadeIn('slow');
                    farfalla_hide_toolbar(0);
                }

            );

            // stop the call to the form "action"
            return false;

        });
        };

        // Adds interaction to the plugins list: reset the profiles selection

        function farfalla_plugins_listing_interaction() {

            $('#farfalla_change_profile').click( function(){
                $('#farfalla_active').fadeOut();
                var jqxhr = $.getJSON(farfalla_path+'backend/profiles/reset/?callback=?');
                jqxhr.complete(function() {window.location.reload()});
            });
        };

        // Checks if a profile has already been selected, then starts what is needed

        function farfalla_check_status() {

                $.getJSON(
                    farfalla_path+"backend/profiles/status/?callback=?",
                    {},
                    function(data) {
                        farfalla_set_top(data.top);
                        if(data.id == null){
                            farfalla_selection_create();
                            farfalla_selection_interaction();
                        } else {
                            farfalla_plugins_listing_create(data.id);
                            farfalla_plugins_listing_interaction();
                            farfalla_hide_toolbar(data.show);
                        };
                    }
                );
        }

        // Adds the show/hide effect to the toolbar logo

        function farfalla_toggle_visibility() {

            $('#farfalla_logo').toggle(
                function() {
                    $('#farfalla_selection, #farfalla_active, #farfalla_home').hide('slow');
                        $.getJSON(
                            farfalla_path+"backend/profiles/show/0/?callback=?",{}
                        );
                },
                function() {
                    $('#farfalla_selection, #farfalla_active, #farfalla_home').show('slow');
                        $.getJSON(
                            farfalla_path+"backend/profiles/show/1/?callback=?",{}
                        );
                });

        }

        // Hides the toolbar

        function farfalla_hide_toolbar(value) {
            if(value == 0){
                $('#farfalla_selection, #farfalla_active, #farfalla_home').hide('slow');
                $.getJSON(
                    farfalla_path+"backend/profiles/show/0/?callback=?",{}
                );
            }
        }

        // Set 'top' value for toolbar positioning

        function farfalla_set_top(value) {
            if (value !== null){
                $('#farfalla_toolbar').css('top',value);
            } else {
                $('#farfalla_toolbar').css('top','30px');
            }
        }

// determine wether to add the toolbar or not

    if(window.location.href.search(farfalla_path)=='-1' && window.location.href.search('lisp8.formazione.unimib.it')=='-1' && window.location == window.parent.location){

        farfalla_toolbar_create();

        farfalla_check_status();

        farfalla_toggle_visibility();

// end "if" to determine wether to add the toolbar or not
    };



/*
    #######################################
    #                                     #
    #    Reusable functions for plugins   #
    #                                     #
    #######################################
*/

    // A function for adding buttons to the toolbar
    // name -> text displayed on the button
    // id -> unique identifier for the button: the final id will be something like button_id
    // accesskey -> the value for the accesskey attribute useful for activating the buttons from the keyboard
    // callback -> a function to be triggered by the button


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
            'background : '+bgcolor+' !important; border : 2px solid '+txtcolor+' !important; color : '+txtcolor+' !important;'
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


});
