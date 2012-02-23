// Farfalla plugin: Readability

jQuery.noConflict();
(function($) { 

 $(function() {  

// Create dialog form
  $('body').append('<div id="dialog-form"></div>');
  $('#dialog-form').append('<p class="farfalla_alttext_form">Add an alternative text for the image</p>');
  $('#dialog-form').append('<form></form>');
  $('#dialog-form form').append('<textarea name="farfalla-original-text" style="width:100%; height: 240px;" /></textarea>');
  $('#dialog-form form').append('<textarea name="farfalla-addalt" style="width:100%; height: 240px;" /></textarea>');
  $('#dialog-form').hide()

  $( "#dialog-form" ).dialog({
    autoOpen: false,
    height: 800,
    width: '100%',
    modal: true,
    buttons: {
      "Send your proposal": function() {

        var bValid = true;

        allFields.removeClass( "ui-state-error" );

                    if ( bValid ) {
                        $( "#users tbody" ).append( "<tr>" +
                            "<td>" + name.val() + "</td>" +
                            "<td>" + email.val() + "</td>" +
                            "<td>" + password.val() + "</td>" +
                        "</tr>" );
                        $( this ).dialog( "close" );
                    }

                },
                Cancel: function() {
                    $( this ).dialog( "close" );
                }
            },
            close: function() {
                allFields.val( "" ).removeClass( "ui-state-error" );
            }
        });


// get the current page URL
  var url = $(location).attr('href');

/*
  $.canc = function () {   
    document.esper.testo.value = "";

    document.esper.indiceG.value="89 - (Lp / 10) + (3 x Fr)"
  };

*/


// Calculate the readability of a single block
  $.fn.elab = function (val) {   
    $(this).wrap('<div class="farfalla_readability" id="readability_'+val+'">Readability index: <span class="farfalla_readability_score" id="readability_score_'+val+'"></span> <a href="#" id="farfalla_suggest_'+val+'">Suggest your own version</a></div>');
    var words=$(this).html().split(" ");
    var nW=words.length;
    var lW=0;
    for (var i=0; i<nW; i++) lW += words[i].length;
    var sentences=$(this).html().split(/[.;!?\n]+/);
    var nS=sentences.length;
    $('#readability_score_'+val).html(Math.round(89 - (10 *lW / nW ) + (300*nS/nW)))
  }

// Create the interface for the insertion of alternative text   
  $.fn.addalt = function ( val ) {
    $('#farfalla_suggest_'+val).click(function() {
//      alert('clicked');
      $('#dialog-form').dialog('open');  
      return false;
    });
  }

  
// Send everything to the DB
  $.fn.submitAltText = function (url, xpath, alttext, language) {    
  
    $.post(farfalla_path+'backend/alttexts/add', 
      {
        'data[Alttext][xpath]': xpath,
        'data[Alttext][url]': url,
        'data[Alttext][text]': alttext,
        'data[Alttext][language_id]': language
      }, 
      function(data) {
        alert(data);
      }
    );
      
  };



  $("p:not(.farfalla_alttext_form)").each(
    function(index){
      $(this).elab(index);
      $(this).addalt(index);
      var xpath = $.getXPath(this);
    }
  );


 });

})(jQuery);
