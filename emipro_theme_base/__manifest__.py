# -*- coding: utf-8 -*-
{
    # Theme information
    'name': 'Emipro Theme Base',
    'category': 'Base',
    'summary': 'Base module containing common libraries for all Emipro eCommerce themes.',
    'version': '2.2.4',
    'license': 'OPL-1',
    'depends': [
        'website_theme_install',
        'website_sale_wishlist',
	    'website_sale_comparison',
        'website_blog',
    ],

    'data': [
        'templates/template.xml',
        'templates/pwa.xml',
	    'security/ir.model.access.csv',
        'views/social_sharing.xml',
        'views/product_template.xml',
        'wizard/product_brand_wizard_view.xml'
    ],

    #Odoo Store Specific
    'images': [
        'static/description/emipro_theme_base.jpg',
    ],

    # Author
    'author': 'Emipro Technologies Pvt. Ltd.',
    'website': 'https://www.emiprotechnologies.com',
    'maintainer': 'Emipro Technologies Pvt. Ltd.',

    # Technical
    'installable': True,
    'auto_install': False,
    'price': 9.00,
    'currency': 'EUR',
}
