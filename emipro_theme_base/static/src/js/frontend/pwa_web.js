odoo.define('emipro_theme_base.pwa_web', function (require) {
"use strict";
    
    var html = document.documentElement;
    var website_id = html.getAttribute('data-website-id') | 0;
    // Detects if device is on iOS
    const isIos = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      return /iphone|ipad|ipod/.test( userAgent );
    }
    // Detects if device is in standalone mode
    const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);

    // Checks if should display install popup notification:
    if (isIos() && !isInStandaloneMode()) {
      var iosPrompt = $(".ios-prompt");
        iosPrompt.show();
        $(iosPrompt).click(function() {
            iosPrompt.hide();
        });
    }
    if ('serviceWorker' in navigator) {
        if(!navigator.onLine){
            var dv_offline = $('.ept_is_offline');
            if(dv_offline){
                dv_offline.show();
            }
        }
        navigator.serviceWorker.register('/service_worker');
    }
});

