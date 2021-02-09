# -*- coding: utf-8 -*-
"""
    This model is used to create a website wise dynamic category listing
"""

from odoo import api, fields, models
from odoo.tools.translate import _
from odoo.http import request

class WebsiteMenu(models.Model):

    _inherit = 'website.menu'

    is_dynamic_menu = fields.Boolean(string="Is Dynamic Menu", default=False)
    menu_label_text = fields.Char(string="Menu Label Text",
                                    help="Menu Label text to display on the menu link", translate=True)
    menu_label_text_color = fields.Char(string="Menu Label Text Color")

    def write(self,vals):
        return super(WebsiteMenu, self).write(vals)
    # Overide get_tree method to add is_dynamic_menu field
    @api.model
    def get_tree(self, website_id, menu_id=None):
        """
        Overide get_tree method to add custom is_dynamic_menu field
        :param website_id: current website id
        :param menu_id: menu id default none
        :return: make_tree function which is recursively called
        """
        def make_tree(node):
            is_homepage = bool(node.page_id and self.env['website'].browse(website_id).homepage_id.id == node.page_id.id)
            menu_node = {
                'fields': {
                    'id': node.id,
                    'name': node.name,
                    'url': node.page_id.url if node.page_id else node.url,
                    'new_window': node.new_window,
                    'is_mega_menu': node.is_mega_menu,
                    'sequence': node.sequence,
                    'parent_id': node.parent_id.id,
                    'is_dynamic_menu': node.is_dynamic_menu,
                    'menu_label_text': node.menu_label_text,
                    'menu_label_text_color': node.menu_label_text_color,
                },
                'children': [],
                'is_homepage': is_homepage,
            }
            for child in node.child_id:
                menu_node['children'].append(make_tree(child))
            return menu_node

        menu = menu_id and self.browse(menu_id) or self.env['website'].browse(website_id).menu_id
        return make_tree(menu)

    @api.model
    def save(self, website_id, data):
        """
        Removed the records from the ir.translation for the all the language when menu_lable_text is set to blank.
        :param website_id:
        :param data:
        :return:res
        """

        res = super(WebsiteMenu, self).save(website_id, data)
        if self.env['website'].browse(website_id).theme_id.name == 'theme_clarico_vega':
            for menu in data['data']:
                if menu['menu_label_text'] == '':
                    menu_id = self.browse(menu['id'])
                    menu_id.write({'menu_label_text':menu['menu_label_text']})
                    transaltion_records = self.env["ir.translation"].search([('name', '=', 'website.menu,menu_label_text'), ('res_id', '=', menu['id'])])
                    for rec in transaltion_records:
                        rec.unlink()
                    self._cr.execute("update website_menu set menu_label_text=NULL where id=%s"%(menu_id.id))

            return True