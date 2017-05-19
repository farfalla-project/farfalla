jasmine.getFixtures().fixturesPath = 'specs/javascripts/fixtures';

describe('farfalla_toolbar_create', function(){

  beforeEach(function(){
    loadFixtures('index.html');
  });

  $f.farfalla_toolbar_create();

  it('creates the main container div', function() {
    expect($('#farfalla_container').length).toBe(1);
  });

  it('prepends #farfalla_badge to #farfalla_container', function() {
    expect($('#farfalla_container')).toContainElement('#farfalla_badge i.fa-cog');
  });

});
