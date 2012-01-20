// Farfalla plugin: Readability

$(function() {  

  $.canc = function () {   
    document.esper.testo.value = "";

    document.esper.indiceG.value="89 - (Lp / 10) + (3 x Fr)"
  };


  $.fn.elab = function (val) {   
    $(this).wrap('<div class="farfalla_readability" id="readability_'+val+'">Readability index: <span class="farfalla_readability_score" id="readability_score_'+val+'"></span></div>');
    var words=$(this).html().split(" ");
    var nP=words.length;
    var LP=0;
    for (var i=0; i<nP; i++) LP += words[i].length;
    var sentences=$(this).html().split(".");
    var nF=sentences.length;
    $('#readability_score_'+val).html(Math.round(89 - (10 *LP / nP ) + (300*nF/nP)))
  }


  $('p').each(
    function(index){
      $(this).elab(index);
    }
  );

});