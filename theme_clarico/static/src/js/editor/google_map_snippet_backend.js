//--------------------------------------------------------------------------
// Add value of latitude and longitude of google map snippet
//--------------------------------------------------------------------------
odoo.define('theme_clarico.google_map_snippet_backend',function(require) {
'use strict';
    var core = require('web.core');
    var options = require('web_editor.snippets.options');
    var wUtils = require('website.utils');
    var _t = core._t;
        var set_js_map_generate = options.Class.extend({
            popup_template_id: "google_map_editor_template",
            popup_title: _t("Address information"),
            value_configure: function(type,value) {
                var self = this;
                var def = wUtils.prompt({
                    'id': this.popup_template_id,
                    'window_title': this.popup_title,
                     input: _t("Your location"),
                     init: function () {
                        var $group = this.$dialog.find('div.form-group');
                        $group.find('input').after("<span class='show-format-span'>Either Address or Latitude and Longitude as below.</span><span class='address_span'>- 16a, Little London, Milton Keynes, MK19 6HT</span><span class='lat_long_span'>- 57.815637,-101.137504</span>");
                        $group.append("<div class='google_map_size_div'><label class='col-md-4 col-form-label'>Map Width:</label><div class='width_div col-md-8'><input type='text' name='width' class='map_input_ele' value=''/> PX</div><label class='col-md-4 col-form-label'>Map Height:</label><div class='height_div col-md-8'><input type='text' name='height' class='map_input_ele' value=''/> PX</div></div>");
                     }
                });
                def.then(function (result) {

                    var val = result.val;
                    var $dialog = result.dialog;
                    if (!val) {
                        return;
                    }
                    else{
                        self.$target.attr("data-date", result);
                        var getValue = result.val;
                        var lat_long = getValue.split(',');
                        var dialog = self.$($dialog).find('.btn-primary');
                        var width_val = $dialog.find('.width_div input').val();
                        var height_val = $dialog.find('.height_div input').val();
                        if($.isNumeric(lat_long)){
                            $('#wrapwrap').find('.google_map_div').append('<div class="mapouter"><div class="gmap_canvas"><iframe width="100%" height="100%" id="gmap_canvas" src="https://maps.google.com/maps?q=' + lat_long[0] + ',' + lat_long[1] +'&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=&amp;output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" allowfullscreen></iframe></div><style>.mapouter{width:'+ width_val +'px;height:'+ height_val +'px;}.gmap_canvas {overflow:hidden;background:none!important;height:100%;width:100%;}</style></div>');
                        }
                        else{
                            $('#wrapwrap').find('.google_map_div').append('<div class="mapouter"><div class="gmap_canvas"><iframe width="100%" height="100%" id="gmap_canvas" src="https://maps.google.com/maps?q=' + lat_long +'&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=&amp;output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" allowfullscreen></iframe></div><style>.mapouter{width:'+ width_val +'px;height:'+ height_val +'px;}.gmap_canvas {overflow:hidden;background:none!important;height:100%;width:100%;}</style></div>');
                        }
                        dialog.trigger('click');
                    }
                });
                return def;
            },
             onBuilt: function () {
                var self = this;
                this._super();
                this.value_configure('click').guardedCatch(function () {
                    self.getParent()._onRemoveClick($.Event( "click" ));
                });
             },
        });
        options.registry.js_map_generate = set_js_map_generate.extend({
            cleanForSave: function(){
                this.$target.empty();
            }
        });

});

