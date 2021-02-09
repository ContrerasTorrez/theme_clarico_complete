/**************************************************
        01. Search in Header
        02. Page Scroll up
        03. Theme Wishlist
        04. Shop Events
        05. cart Popover
        06. Theme layout
        07. Compare short name
**************************************************/
odoo.define('theme_clarico.theme_script', function(require) {
    'use strict';

    var sAnimations = require('website.content.snippets.animation');
    var publicWidget = require('web.public.widget');
    var Widget = require('web.Widget');
    var core = require('web.core');
    var _t = core._t
    var ajax = require('web.ajax');
    var config = require('web.config');

    //------------------------------------------
    // 01. Search in Header
    //------------------------------------------
    sAnimations.registry.themeSearch = sAnimations.Class.extend({
        selector: '#wrapwrap',
        read_events: {
            'click .te_srch_icon': '_onSearchClickOpen',
            'click .te_srch_close': '_onSearchClickClose',
        },
        start: function() {
            if ($(window).innerWidth() > 1200) {
                $("#top_menu > .dropdown").each(function() {
                    $(this).find("a.o_mega_menu_toggle").click(function() {
                        if(!$('.editor_enable').length == 1){
                            var get_href = $(this).attr('href');
                            document.location.href = get_href;
                            $(this).removeAttr('aria-expanded');
                            return false;
                        }
                    });
                    if (!$(this).closest(".o_extra_menu_items").length) {
                        $(this).closest("a").click(function() {
                            return false;
                        });
                        $(this).hover(function() {
                            $(this).toggleClass('open');
                            $(this).find(".dropdown-menu").toggleClass('te_mega_animation');
                            $(this).removeClass('show');
                            $(this).find('.dropdown-menu').removeClass('show');
                        }, function() {
                            $(this).toggleClass('open');
                            $(this).find(".dropdown-menu").toggleClass('te_mega_animation');
                            $(this).removeClass('show');
                            $(this).find('.dropdown-menu').removeClass('show');
                        });
                    }
                });
            }
            $('.variant_attribute  .list-inline-item').find('.active').parent().addClass('active_li');
            $( ".list-inline-item .css_attribute_color" ).change(function(ev) {
                var $parent = $(ev.target).closest('.js_product');
                $parent.find('.css_attribute_color').parent('.list-inline-item').removeClass("active_li");
                $parent.find('.css_attribute_color').filter(':has(input:checked)').parent('.list-inline-item').addClass("active_li");
            });

        },
        _onSearchClickOpen: function(ev) {
            var self = ev.currentTarget;
            //style1
            if ($(".te_header_1_right").length) {
                $(".te_search_popover").addClass("visible");
                $(self).hide();
                $(".te_srch_close").show();
                setTimeout(function(){
                    $('input[name="search"]').focus();
                }, 500);
            }
            //style 2 3 and 4 resp view
            if ($(window).width() < 768) {
                if ($(".te_header_style_2_right").length || $(".te_header_3_search").length || $(".te_header_style_4_inner_first").length) {
                    $(".te_search_popover").addClass("visible");
                    $(self).hide();
                    $(".te_srch_close").show();
                    setTimeout(function(){
                        $('input[name="search"]').focus();
                    }, 500);
                }
            }
            //style5
            if ($(".te_header_5_search").length) {
                $(".te_search_5_form").addClass("open_search");
                var $h_menu = $("#oe_main_menu_navbar").height();
                $(".te_search_5_form").css({
                    top: $h_menu + 0
                });
                setTimeout(function(){
                    $('input[name="search"]').focus();
                }, 500);
            }
            //style6
            if ($(".te_header_6_srch_icon").length) {
                $(".te_header_before_right").addClass("search_animate");
                if ($(window).width() < 768) {
                    $(".te_header_before_left").addClass("search_animate");
                }
                $(".te_header_search input").css("width","100%");
                setTimeout(function(){
                    if ($(window).width() > 768) {
                        $(".te_header_before_right").hide();
                    }else{
                        $(".te_header_before_right").hide();
                        $(".te_header_before_left").hide();
                    }
                    $(".te_header_search").show();
                    $('input[name="search"]').focus();
                }, 500);
            }
            //style7
            if ($(".te_searchform__popup").length) {
                $(".te_searchform__popup").addClass("open");
                $(".te_srch_close").show();
                setTimeout(function(){
                    $('input[name="search"]').focus();
                }, 500);
            }
        },
        _onSearchClickClose: function(ev) {
            var self = ev.currentTarget;
            //style1
            if ($(".te_header_1_right").length) {
                $(".te_search_popover").removeClass("visible");
                $(self).hide();
                $(".te_srch_icon").show();
            }
            //style 2 and 3 resp view
            if ($(window).width() < 768) {
                if ($(".te_header_style_2_right").length || $(".te_header_3_search").length || $(".te_header_style_4_inner_first").length) {
                    $(".te_search_popover").removeClass("visible");
                    $(self).hide();
                    $(".te_srch_icon").show();
                }
            }
            //style5
            if ($(".te_header_5_search").length) {
                $(".te_search_5_form").removeClass("open_search");
                $(".te_search_icon_5").css("display", "inline-block");
            }
            //style6
            if ($(".te_header_6_srch_icon").length) {
                $(".te_header_before_left, .te_header_before_right").removeClass("search_animate").show();
                $(".te_header_search").hide();
                $(".te_header_search input").css("width", "0%");
                $(".te_srch_icon").css("display", "inline-block")
            }
            //style7
            if ($(".te_searchform__popup").length) {
                $(".te_searchform__popup").removeClass("open");
                $(".te_srch_icon").show();
            }
        },
    });

    //------------------------------------------
    // 02. Page Scroll up
    //------------------------------------------
    sAnimations.registry.themeLayout = sAnimations.Class.extend({
        selector: '.o_footer',
        read_events: {
            'click .scrollup-div': '_onClickAnimate',
        },
        _onClickAnimate: function(ev) {
            $("html, body").animate({
                scrollTop: 0
            }, 1000);
        },
    });
    //------------------------------------------
    // 03. Theme Wishlist
    //------------------------------------------
    sAnimations.registry.themeWishlist = sAnimations.Class.extend({
        selector: '#o_comparelist_table',
        read_events: {
            'click .o_wish_rm': '_onRemoveClick',
        },
        _onRemoveClick: function(ev) {
            var ajax = require('web.ajax');
            var tr = $(ev.currentTarget).parents('tr');
            var wish = tr.data('wish-id');
            var route = '/shop/wishlist/remove/' + wish;
            ajax.jsonRpc(route, 'call', {
                'wish': wish
            }).then(function(data) {
                $(tr).hide();
                if ($('.t_wish_table tr:visible').length == 0) {
                    window.location.href = '/shop';
                }
            })
        },

    });

    //------------------------------------------
    // 04. Shop Events
    //------------------------------------------
    sAnimations.registry.themeEvent = sAnimations.Class.extend({
        selector: '.js_sale .oe_website_sale',
        read_events: {
            'click .te_attr_title': '_onAttribSection',
            'click .te_view_more_attr': '_onViewMore',
            'click .te_view_less_attr': '_onViewLess',
            'click .te_shop_filter_resp': '_onRespFilter',
            'click .te_filter_close': '_onFilterClose',
            'click .te_color-name':'_oncolorattr',
            'click .te_show_category':'_onShowCategBtnResp',
            'click .te_show_option':'_onShowOptionBtnResp',
        },
        start: function() {
            this.onShowClearVariant();
            this.onSelectAttribute();
        },
        onShowClearVariant: function() {
            $("form.js_attributes input:checked, form.js_attributes select").each(function() {
                var self = $(this);
                var type = ($(self).prop("tagName"));
                var type_value;
                var attr_value;
                var target_select;
                var curr_parent;
                var target_select = self.parents("li.nav-item").find("a.te_clear_all_variant");
                if ($(type).is("input")) {
                    type_value = this.value;
                    attr_value = $(this).parent("label").find("span").html();
                    curr_parent = self.parents("ul");
                    target_select = curr_parent.parent("li.nav-item").find("a.te_clear_all_variant");
                    if (self.parent("label").hasClass("css_attribute_color")) {
                        attr_value = self.parent("label").next(".te_color-name").html();
                    }
                    var first_li = self.closest("ul").find("li").first();
                    var selected_li = self.closest("li.nav-item");
                    $(first_li).before(selected_li);
                    if (!curr_parent.hasClass("open_ul")) {
                        curr_parent.parent("li.nav-item").find('.te_attr_title').click();
                    }
                } else if ($(type).is("select")) {
                    type_value = self.find("option:selected").val();
                    attr_value = self.find("option:selected").html();
                    target_select = self.parents("li.nav-item").find("a.te_clear_all_variant");
                }
                if (type_value) {
                    target_select.css("display", "inline-block");
                    $(".te_clear_all_form_selection").css("display", "inline-block");
                    $(".te_view_all_filter_div").css("display", "inline-block");
                    if (target_select) {
                    var temp_attr_value = attr_value.toString().split('(');
                    var cust_attr_value = '';
                        switch(parseInt(temp_attr_value.length)) {
                          case 4:
                            cust_attr_value += temp_attr_value[0] +' ('+ temp_attr_value[1] +' ('+temp_attr_value[2];
                            break;
                          case 3:
                            cust_attr_value += temp_attr_value[0] +'('+ temp_attr_value[1];
                            break;
                          default:
                            cust_attr_value += temp_attr_value[0];
                        }
                        $(".te_view_all_filter_inner").append("<div class='attribute'>" + cust_attr_value + "<a data-id='" + type_value + "' class='te_clear_attr_a'>x</a></div>");
                    }
                }
            });
        },
        // If any attribute are selected then automatically this section is Expand(only for type select)
        onSelectAttribute: function(ev){
            var main_li = $(".te_attr_title").parents("li.nav-item");
            var curr_selected = $(main_li).find(":selected").text();
            var curr_selected_parent = $(main_li).find("select");
            
             _.each(curr_selected, function(ev) {
                if(!curr_selected_parent.hasClass("open_select")){
                    curr_selected_parent.parent("li.nav-item").find('select').addClass("open_select").slideDown('slow');
                }

                if(curr_selected_parent.hasClass("open_select")){
                    $(curr_selected_parent).parent('.nav-item').find("i").removeClass('fa-caret-right').addClass('fa-caret-down');
                }
            })
        },
        _onClearAttribInd: function(ev) {
            var self = ev.currentTarget;
            var id = $(self).attr("data-id");
            if (id) {
                $("form.js_attributes option:selected[value=" + id + "]").remove();
                $("form.js_attributes").find("input[value=" + id + "]").removeAttr("checked");
            }
            ajaxorformload(ev);
        },
        _onClearAttribAll: function(ev) {
            $("form.js_attributes option:selected").remove();
            $("form.js_attributes").find("input:checked").removeAttr("checked");
            ajaxorformload(ev);
        },
        _onClearAttribDiv: function(ev) {
            var self = ev.currentTarget;
            var curent_div = $(self).parents("li.nav-item");
            var curr_divinput = $(curent_div).find("input:checked");
            var curr_divselect = $(curent_div).find("option:selected");
            _.each(curr_divselect, function(ev) {
                $(curr_divselect).remove();
            });
            _.each(curr_divinput, function(ev) {
                $(curr_divinput).removeAttr("checked");
            });
            ajaxorformload(ev);
        },
        _onAttribSection: function(ev) {
            var self = ev.currentTarget;
            var main_li = $(self).parents("li.nav-item");
            var ul_H = main_li.find("ul").height();
            if (main_li.find("select").length == 1) {
                $("select.form-control.open_select").css('display','block');
                var main_select = main_li.find("select");
                if (main_select.hasClass("open_select")) {
                    main_select.removeClass("open_select");
                    main_select.parent(".nav-item").find("i").css({"transform":"rotate(0deg)","transition":"transform 0.5s ease-out","text-align":"center"});
                    main_select.toggle('slow');
                }
                else {
                    main_select.addClass("open_select");
                    main_select.parent(".nav-item").find("i").css({"transform":"rotate(90deg)"});
                    main_select.toggle('slow');
                }
            }

            var main_ul = main_li.find("ul");

            if (main_ul.hasClass("open_ul")) {
                main_ul.removeClass("open_ul");
                $(main_ul).parent('.nav-item').find(".te_attr_title i").css({"transform":"rotate(0deg)","transition":"transform 0.5s ease-out","text-align":"center"});
                main_ul.toggle('slow');

                main_li.find('.te_view_more_attr').removeClass('active');
                main_li.find('.te_view_more_attr').css("display", "none");
            } else {
                main_ul.addClass("open_ul");
                $(main_ul).parent('.nav-item').find(".te_attr_title i").css({"transform":"rotate(90deg)"});
                main_ul.toggle('slow');

                if (ul_H >= 190) {
                    main_li.find('.te_view_more_attr').addClass('active');
                    main_li.find('.te_view_more_attr').css("display", "inline-block");
                }
            }
        },
        _onViewMore: function(ev) {
            var self = ev.currentTarget;
            var clicks = $(self).data('clicks');
            $(self).parent('li.nav-item').find('ul').css({
                "overflow": "auto"
            });
            $(self).addClass('d-none').removeClass('active').hide();
            $(self).siblings('.te_view_less_attr').removeClass('d-none').addClass('active').css('display','inline-block');
            $(self).data("clicks", !clicks);
        },
        /* Added for show less attribute */
        _onViewLess: function(ev) {
            var self = ev.currentTarget;
            var clicks = $(self).data('clicks');
            $(self).parent('li.nav-item').find("ul").css({
                "overflow": "hidden"
            });
            $(self).addClass('d-none').removeClass('active').hide();
            $(self).siblings('.te_view_more_attr').removeClass('d-none').addClass('active').css('display','inline-block');
            $(self).data("clicks", !clicks);
            $(self).parent('li.nav-item').find('.nav-pills').animate({
                scrollTop: 0
            }, 'slow');
        },
        _onRespFilter: function(ev) {
            $("#products_grid_before").toggleClass("te_filter_slide");
            $("#wrapwrap").toggleClass("wrapwrap_trans");
            $('body').css("overflow-x", "hidden");
            $("#wsale_products_attributes_collapse").addClass("show");
            if($("#wsale_products_attributes_collapse .show")){
                $(".te_show_option").find("i").addClass('fa-chevron-down').removeClass('fa-chevron-right');
            }
        },
        _onFilterClose: function(ev) {
            $("#products_grid_before").removeClass("te_filter_slide")
            $("#wrapwrap").removeClass("wrapwrap_trans");
        },
        _oncolorattr: function(ev){

            var self=ev.currentTarget;
             //$(self).parents("li.color-with-name-divmaxW").find("input").click();
             $(self).parent().find("input").click();
        },
         _onShowCategBtnResp: function(ev){
            $(".te_show_category").find("i").toggleClass('fa-chevron-right fa-chevron-down');
        },
        _onShowOptionBtnResp: function(ev){
            $(".te_show_option").find("i").toggleClass('fa-chevron-down fa-chevron-right');
        },
        stickySidebar: function(ev){
            return true;
        },
    });
    /*---- Shop Functions ------*/
    //function for ajax form load
    function ajaxorformload(ev) {
        var ajax_load = $(".ajax_loading").val();
        if (ajax_load == 'True') {
            ajaxform(ev);
        } else {
            $("form.js_attributes input,form.js_attributes select").closest("form").submit();
        }
    }
    sAnimations.registry.WebsiteSale.include({
        /*
         Adds the stock checking to the regular _onChangeCombination method
        @override
        */
        _updateProductImage: function (){

        this._super.apply(this, arguments);
        },
  });

    //------------------------------------------
    // 05. cart Popover
    //------------------------------------------
    var timeout;
    sAnimations.registry.websiteSaleCartLink = sAnimations.Class.extend({
        selector: ' a#my_cart[href$="/shop/cart"]',
        read_events: {
            'click': '_onClickCart',
        },
        start: function() {
            var def = this._super.apply(this, arguments);
            //var def
            if (this.editableMode) {
                return def;
            }
            this.$el.popover({
                trigger: 'manual',
                animation: true,
                html: true,
                title: function() {
                    return _t("My Cart");
                },
                container: 'body',
                placement: 'right',
                template: '<div class="popover mycart-popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="te_cross">X</div><div class="popover-body"></div></div>'
            });
            return def;
        },
        _onClickCart: function(ev) {
            if ($(window).width() > 1000) {
                ev.preventDefault();
                var self = this;
                clearTimeout(timeout);
                $(this.selector).not(ev.currentTarget).popover('hide');
                timeout = setTimeout(function() {
                    if ($('.mycart-popover:visible').length) {
                        return;
                    }
                    $.get("/shop/cart", {
                        type: 'popover',
                    }).then(function(data) {

                        self.$el.data("bs.popover").config.content = data;
                        self.$el.popover("show");
                        $(".mycart-popover").addClass("te_open");
                        $("#wrapwrap").addClass("te_overlay");
                        $(".te_cross").click(function() {
                            self.$el.popover("hide");
                            $(".mycart-popover").removeClass("te_open");
                            $("#wrapwrap").removeClass("te_overlay");
                        });
                    });
                }, 100);
            }
        },
    });
    //------------------------------------------
    // 06. Theme layout
    //------------------------------------------
        $(document).ready(function($) {
        $(document).on('click',".quick_close",function(ev) {
            $('.modal-backdrop').remove();
            setTimeout(function () {
                $('body').css("padding-right","0");
            },500);
        });
        $(document).mouseup(function(ev)
		{
		    var container = $(".quick_view_modal");
		    if (!container.is(ev.target) && container.has(ev.target).length === 0)
		    {
		        if($('#quick_view_model_shop').hasClass("show"))
		        {
                    $('.modal-backdrop').remove();
                    setTimeout(function () {
                        $('body').css("padding-right","0");
                    },500);
                }
		    }
		});
        if($(document).find('.te_recently_viewed'))
        {
            var r_name = $("#te_rect_cnt").text();
            $('.te_recently_viewed').find('h6').each(function(){

                $(document).find('h6.card-title').addClass("te_rect_name")
                if(r_name == 2)
                {
                    $('h6.card-title').addClass('te_2_line');
                }
                if(r_name == 3)
                {
                    $('h6.card-title').addClass('te_3_line');
                }
            });
        }
        //extra menu dropdown
        $('.o_extra_menu_items .dropdown-menu').css("display", "none")
        $('li.o_extra_menu_items .dropdown').click(function(event) {
            event.stopImmediatePropagation();
            $(this).find(".dropdown-menu").slideToggle();
        });
        //Header top when transparent header
        var header_before_height = $(".te_header_before_overlay").outerHeight();
        if ($("body").find(".o_header_overlay").length > 0) {
            $("header:not(.o_header_affix)").addClass("transparent_top")
            $(".transparent_top").css("top", header_before_height);
            $(".o_header_affix.affix").removeClass("transparent_top")
        }
        //Category mega menu
        $("#custom_menu li").each(function() {
            var has_ctg = $(this).find("ul.t_custom_subctg").length > 0
            if (has_ctg) {
                $(this).append("<span class='ctg_arrow fa fa-angle-right' />")
                $(".ctg_arrow").click(function(ev) {
                    ev.preventDefault();
                    ev.stopPropagation();
                    var self = $(this).siblings("ul.t_custom_subctg");
                    var ul_index = $(self).parents("ul").length;
                    $(self).stop().animate({
                        width: "100%"
                    });
                    $(self).css({
                        "display": "block",
                        "transition": "0.3s easeout",
                        "z-index": ul_index
                    })
                    $(self).parent().parent(".t_custom_subctg").css("overflow-y", "hidden");
                    $(self).parent().parent(".t_custom_subctg").scrollTop(0);
                    $(this).parents("#custom_menu").scrollTop(0);
                    $(this).parents("#custom_menu").css("overflow-y", "hidden");
                })
                $(this).find("ul.t_custom_subctg").children(".te_prent_ctg_heading").click(function(ev) {
                    ev.preventDefault();
                    ev.stopPropagation();
                    $(this).parent("ul#custom_recursive").stop().animate({
                        width: "0"
                    }, function() {
                        $(this).css("display", "none")
                        $(this).parent().parent(".t_custom_subctg").css("overflow-y", "auto");
                    });
                })
            }
        })
        $("#custom_menu > li > ul.t_custom_subctg > .te_prent_ctg_heading").click(function() {
            $(this).parents("#custom_menu").css("overflow-y", "auto");
        })
        //Changed search form action in theme's search when website search is installed
        if ($("body").find(".website_search_form_main").length > 0) {
            $(".te_header_search,.te_searchform__popup").each(function() {
                $(this).find("form").attr("action", "/search-result");
            })
            $(".website_search_form_main").html("");
        }
        //Recently viewed title
        if ($('#carousel_recently_view .carousel-inner .img_hover').length >= 1) {
            $('.te_product_recent_h2').css('display', 'block')
        }
        //expertise progress bar
        $('.progress').each(function() {
            var area_val = $(this).find('.progress-bar').attr("aria-valuenow")
            $(this).find('.progress-bar').css("max-width", area_val + "%")
        })
        //Remove images in extra menu
        $("li.o_extra_menu_items").find("img").removeAttr("src alt");

    // if slider then active first slide
    if ($('.recommended_product_slider_main').length) {
        $(".theme_carousel_common").each(function() {
            $(this).find(".carousel-item").first().addClass("active");
        })
    }
    // Change in carousel to display two slide
    $('.theme_carousel_common .carousel-item').each(function() {
        var next = $(this).next();
        if (!next.length) {
            next = $(this).siblings(':first');
        }
        next.children(':first-child').clone().appendTo($(this));
    });
    // quantity design in cart lines when promotion app installed
    $(".te_cart_table .css_quantity > span").siblings("div").css("display", "none")
    // Portal script
    if ($('div').hasClass('o_portal_my_home')) {
        if (!$('a').hasClass('list-group-item')) {
            $(".page-header").css({
                'display': 'none'
            })
        }
    }
    })

    //------------------------------------------
    // 07. Compare short name
    //------------------------------------------
    $(document).ready(function(){
        var maxLength = 26;
        var number_compare_item = $("#o_comparelist_table").find('tr:first').find('td').length;
        if(number_compare_item == 4)
        {
            maxLength = 35;
        }
        else if(number_compare_item == 3)
        {
            maxLength = 46;
        }

        var ellipsestext = "...";
        $(".more").each(function(){
            var myStr = $(this).text();
            if($.trim(myStr).length > maxLength){
                var newStr = myStr.substring(0, maxLength);
                var html = newStr + '<span class="moreellipses">' + ellipsestext+ '</span>';
                $(this).html(html);
            }
        });

        var owl_rtl = false;
        if ($('#wrapwrap').hasClass('o_rtl')) {
            owl_rtl = true;
        }

        var self = $('.accessory_product_main.full-width .owl-carousel, .alternative_product_main.full-width .owl-carousel').owlCarousel({
            loop: false,
            rtl: owl_rtl,
            rewind: true,
            margin: 10,
            nav: true,
            dots: false,
            autoplay: true,
            autoplayTimeout: 4000,
            navText : ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
            autoplayHoverPause:true,
            items: 4,
            responsive: {
                0: {
                    items: 1,
                },
                576: {
                    items: 2,
                },
                991: {
                    items: 3,
                },
                1200: {
                    items: 4,
                }
            }
        });

        var myCarousel_acce_prod = $('.accessory_product_main .owl-carousel, .alternative_product_main .owl-carousel').owlCarousel({
            loop: false,
            rtl: owl_rtl,
            rewind: true,
            margin: 10,
            nav: true,
            dots: false,
            autoplay: true,
            autoplayTimeout: 4000,
            navText : ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
            autoplayHoverPause:true,
            items: 2,
            responsive: {
                0: {
                    items: 1,
                },
                576: {
                    items: 2,
                }
            }
        });
    });

    /** Product image gallery for product page */
    sAnimations.registry.product_detail = sAnimations.Class.extend({
        selector: "#product_detail",
        start: function() {
        },
        productGallery: function(){
            var slider = $('#mainSlider .owl-carousel');
            var thumbnailSlider = $('#thumbnailSlider .owl-carousel');
            $('#mainSlider').show();
            $('#thumbnailSlider').show();
            var duration = 400;
            var img_length = $('#len-ept-image').val();

            if($('#len-ept-image').val() < 2) {
                $('#mainSlider').addClass('mainslider-full');
            }
            var owl_rtl = false;
            if ($('#wrapwrap').hasClass('o_rtl')) {
                owl_rtl = true;
            }

            if($('#len-ept-image').val() > 5) {
                var slider_length = ($('#len-ept-image').val() - 2);
                var thumb_length =  $('#len-ept-image').val() - ($('#len-ept-image').val() - 5);
            } else {
                var slider_length = 0;
                var thumb_length = 0;
            }
            slider.owlCarousel({
                nav:true,
                navText : ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
                items:1,
                rtl: owl_rtl,
                loop: $('#len-ept-image').val() > 1 ? true : false,
                rewind: true,
            }).on('changed.owl.carousel', function (event) {
                // On change of main item to trigger thumbnail item
                let currentIndex = event.item.index + slider_length;
                thumbnailSlider.trigger('to.owl.carousel', [currentIndex, duration, true]);
                if($('#len-ept-image').val() <= 5) {
                    thumbnailSlider.find('.owl-item').removeClass('center');
                    thumbnailSlider.find('.owl-item').eq(currentIndex - 2).addClass('center');
                }
            });

                // carousel function for thumbnail slider
            thumbnailSlider.owlCarousel({
                loop: $('#len-ept-image').val() > 5 ? true : false,
                center: $('#len-ept-image').val() > 5 ? true : false,
                margin: 4,
                rtl: owl_rtl,
                nav:true,
                navText : ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
                responsive:{
                    0:{
                        items:5,
                    },
                    600:{
                        items:5
                    },
                    1000:{
                        items:5
                    }
                }
            }).on('click', '.owl-item', function () {
                // On click of thumbnail items to trigger same main item
                let currentIndex = $(this).find('li').attr('data-slide-to');
                slider.trigger('to.owl.carousel', [currentIndex, duration, true]);
            }).on('refreshed.owl.carousel', function () {
                if($('#len-ept-image').val() <= 5) {
                    $('#thumbnailSlider .owl-carousel .owl-item').first().addClass('center');
                }
            });
            var thumb_width = $('#thumbnailSlider').find('.owl-item').width();
            $('#thumbnailSlider').find('.owl-item').height(thumb_width);
            if ($(window).width() > 767) {
                if($('.o_rtl').length == 1){
                    $('#thumbnailSlider').find('.owl-carousel').css('right', (0-(thumb_width*2)));
                }
                $('#thumbnailSlider').find('.owl-carousel').css('left', (0-(thumb_width*2)));
                $('#thumbnailSlider').find('.owl-carousel').css('top', (thumb_width*2)+26);
            }
        },
    });
    $(document).ready(function(){
        var product_detail = new sAnimations.registry.product_detail();
        product_detail.productGallery();
    });
    $(".o_portal_my_doc_table tr").click(function(){
      window.location = $(this).find('td > a').attr("href");
      return false;
    });

    publicWidget.registry.productsRecentlyViewedSnippet.include({
        /*
         Adds the stock checking to the regular _render method
        @override
        */
        _render: function (){
            this._super.apply(this, arguments);
            var r_name = $("#te_rect_cnt").text();
            $('.te_recently_viewed').find('h6').each(function(){
                $(this).addClass("te_rect_name")
                if(r_name == 2) {
                    $('h6.card-title').addClass('te_2_line');
                }
                if(r_name == 3) {
                    $('h6.card-title').addClass('te_3_line');
                }
            });
        },
    });

    $(window).on("orientationchange",function(){
      location.reload();
    });
});
