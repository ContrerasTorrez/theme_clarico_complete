{
    # Theme information

    'name': 'Theme Clarico',
    'category': 'Theme/eCommerce',
    'summary': 'Fully Responsive Odoo Theme suitable for eCommerce Businesses',
    'version': '1.7.7',
    'license': 'OPL-1',
    'depends': [
        'website_theme_install',
        'website_sale_wishlist',
        'emipro_theme_product_label',
        'emipro_theme_brand',
        'emipro_theme_product_carousel',
        'emipro_theme_category_carousel',
        'emipro_theme_quick_filter',
        'emipro_theme_category_listing',
        'emipro_theme_product_timer',
        'website_sale_stock',
        'pwa_ept',
    ],

    'data': [
        'data/slider_styles_data.xml',
        'data/compare_data.xml',
        'templates/slider.xml',
        'templates/category.xml',
        'templates/compare.xml',
        'templates/assets.xml',
        'templates/assets_pwa.xml',
        'templates/emipro_custom_snippets.xml',
        'templates/odoo_default_snippets.xml',
        'templates/theme_customise_option.xml',
        'templates/customize.xml',
        'templates/blog.xml',
        'templates/shop.xml',
        'templates/header.xml',
        'templates/footer.xml',
        'templates/portal.xml',
        'templates/wishlist.xml',
        'templates/cart.xml',
        'templates/contactus.xml',
        'templates/quick_view.xml',
        'templates/ajax_cart.xml',
        'templates/price_filter.xml',
        'templates/product.xml',
        'templates/product_label.xml',
        'templates/menu_config.xml',
        'templates/404.xml',
        'templates/extra_pages.xml'

    ],

    # Odoo Store Specific
    'live_test_url': 'http://clarico13ee.theme13demo.emiprotechnologies.com/',
    'images': [
        'static/description/main_poster.jpg',
        'static/description/main_screenshot.gif',
    ],

    # Author
    'author': 'Emipro Technologies Pvt. Ltd.',
    'website': 'https://www.emiprotechnologies.com',
    'maintainer': 'Emipro Technologies Pvt. Ltd.',

    # Technical
    'installable': True,
    'auto_install': False,
    'price':190.00,
    'currency': 'EUR',
}
