// Farfalla plugin: AxsJAX Integration. Simply includes the AxsJAX library by C. L. Chen and T. V. Raman

$(function() {

// alert('AxsJAX was activated. This webpage should now be better compliant with the WAI-ARIA guidelines.');

});

// Pasted code

function loadScript(scriptURL) {
	var scriptElem = document.createElement('SCRIPT');
	scriptElem.setAttribute('language', 'JavaScript');
	scriptElem.setAttribute('src', scriptURL);
	document.body.appendChild(scriptElem);
	}

	loadScript('http://google-axsjax.googlecode.com/svn/trunk/common/axsScriptChooser.js');