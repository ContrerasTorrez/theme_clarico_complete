{
    #Module information
    'name': 'Emipro PWA',
    'category': 'eCommerce',
    'summary': 'This app provide shortcut of the website like an application.',
    'version': '1.0.1',
    'license': 'OPL-1',
    "depends": ['website', 'web', 'emipro_theme_base'],
    'data': [
	    'views/website_pwa.xml',
        'templates/assets.xml',
        'templates/offilne.xml',
    ],

    #Odoo Store Specific
    'images': [
        'static/description/PWA_cover.png',
    ],

    # Author
    'author': 'Emipro Technologies Pvt. Ltd.',
    'website': 'https://www.emiprotechnologies.com',
    'maintainer': 'Emipro Technologies Pvt. Ltd.',

    # Technical
    'installable': True,
    'auto_install': False
}
