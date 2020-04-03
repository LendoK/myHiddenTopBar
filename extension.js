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

const panel = Main.panel.actor;
const panel_box = panel.get_parent();

let show_event = false;
let hide_event = false;

function hide_panel() {
    panel_box.hide();
    panel_box.set_scale(1.0, 0.0);
}

function show_panel() {
    panel_box.show();
    panel_box.set_scale(1.0, 1.0);
}

function init() {}

function enable() {
    show_event = Main.overview.connect('showing', show_panel);
    hide_event = Main.overview.connect('hiding', hide_panel);
    hide_panel();
}

function disable() {
    if(show_event) Main.overview.disconnect(show_event);
    if(hide_event) Main.overview.disconnect(hide_event);
    show_panel();
}
