odoo.define('theme_clarico.dropdown_animate', function (require) {
    "use strict";

    var publicWidget = require('web.public.widget');

    publicWidget.registry.dropdown_animate= publicWidget.Widget.extend({
        selector: "#wrapwrap",
        start: function () {
            self = this;
            self.showDropdown();
        },
        showDropdown: function() {
            $(".te_custom_submenu").parent("li.nav-item").addClass("dropdown");
            $(".te_custom_submenu").siblings("a.nav-link").addClass("dropdown-toggle").attr("data-toggle", "dropdown");
            //$(".static_menu").parent("li.nav-item").css("position", "static");

           //Scroll up
            $(window).on('scroll',function() {
                if ($(this).scrollTop() > 300) {
                    $('.scrollup-div').fadeIn();
                } else {
                    $('.scrollup-div').fadeOut();
                }
            });
            $('.dropdown, .te_header_before_overlay .js_language_selector .dropup').on('show.bs.dropdown', function() {
                $(this).find('.dropdown-menu').first().stop(true, true).slideDown(150);
            });
            $('.dropdown, .te_header_before_overlay .js_language_selector .dropup').on('hide.bs.dropdown', function() {
                $(this).find('.dropdown-menu').first().stop(true, true).slideUp(150);
            });
        },
    });
});