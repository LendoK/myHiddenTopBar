/* extension.js
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: GPL-2.0-or-later
 */

/* exported init */

const Main = imports.ui.main;
const Tweener = imports.ui.tweener;

const panel = Main.panel.actor;
const panel_box = panel.get_parent();
const app_menu = Main.panel._leftBox.get_child_at_index(1);


let show_event = false;
let hide_event = false;

let ANIMATION_SPEED = 0.45;

function hide_panel() {
    panel_box.hide();
    Tweener.addTween(panel, {
        opacity: 0,
            time: ANIMATION_SPEED
        });
    panel_box.set_scale(1.0, 0.0);
}

function show_panel() {
    panel_box.show();
    Tweener.addTween(panel, {
        opacity: 255,
            time: ANIMATION_SPEED
        });
    panel_box.set_scale(1.0, 1.0);
}

function addStyles()
{
    Main.panel.add_style_class_name('transparent-top-bar--transparent');
    Main.panel._leftCorner.actor.add_style_class_name('straight-panel-corner');
    Main.panel._rightCorner.actor.add_style_class_name('straight-panel-corner');
}

function removeStyles()
{
    Main.panel.remove_style_class_name('transparent-top-bar--transparent');
    Main.panel._leftCorner.actor.remove_style_class_name('straight-panel-corner');
    Main.panel._rightCorner.actor.remove_style_class_name('straight-panel-corner');
}

function init() {}

function enable() {
    show_event = Main.overview.connect('showing', show_panel);
    hide_event = Main.overview.connect('hiding', hide_panel);
    // app menu
    app_menu.set_scale(0.0,0.0);
    hide_panel();
    addStyles();
}

function disable() {
    if(show_event) Main.overview.disconnect(show_event);
    if(hide_event) Main.overview.disconnect(hide_event);
    // app menu
    app_menu.set_scale(1.0,1.0);
    removeStyles();
    show_panel();
}
