QUnit.test( "String Translation", function( assert ) {
  assert.equal($f.__("notranslation"), "notranslation" );
  assert.equal($f.__("ft_url_title"), "Vai al sito di Farfalla project" );
});

QUnit.test( "Focus to end", function( assert ) {
  assert.ok($f.fn.focusToEnd());
});