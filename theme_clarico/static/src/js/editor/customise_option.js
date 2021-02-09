//--------------------------------------------------------------------------
//Customise Option file included
//--------------------------------------------------------------------------
odoo.define('theme_clarico.options', function (require) {
'use strict';

var core = require('web.core');
var QWeb = core.qweb;

QWeb.add_template('/theme_clarico/static/src/xml/customise_option.xml');

})
