$(function(){
  // choose either the full version
//  $(".multiselect").multiselect();
  // or disable some features
//  $(".multiselect").multiselect({sortable: false, searchable: false});


/* $('.multiselect').simpleMultiSelect({
    classesOnly : true, 
    pseudoSelect : 'custom-select-box', 
    selected : 'custom-select',
    unselected : 'custom-unselect',
    disabled : 'custom-disabled',
    optgroup : 'custom-optgroup',
    optgroupLabel : 'custom-optgroup-label'
}); */

$('.checkbox input').button();

$('.actions ul li a').button();

$('.submit input').button();

});