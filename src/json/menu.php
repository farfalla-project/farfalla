<?php
header('Content-Type: application/json');
echo($_GET['callback']); ?>({
    "plugins": [{
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
    }]
});
