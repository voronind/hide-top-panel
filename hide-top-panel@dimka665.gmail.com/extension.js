
const Main = imports.ui.main;
const Tweener = imports.ui.tweener;

const panel = Main.panel.actor;
const panel_box = panel.get_parent();

/* Panel's top does not have to be 0, if the primary screen is some pixels "below" another one. */
let panel_y = panel.get_y();
let panel_height = panel.get_height();

let show_event = false;
let hide_event = false;

let ANIMATION_SPEED = 0.45;


function hide_panel() {
    Tweener.addTween(panel, {
	translation_y: 0,
        time: ANIMATION_SPEED
    });
}

function show_panel() {
    Tweener.addTween(panel, {
        translation_y: panel_height,
        time: ANIMATION_SPEED
    });
}


function init() {}

function enable() {
    show_event = Main.overview.connect('showing', show_panel);
    hide_event = Main.overview.connect('hiding', hide_panel);

    panel_box.set_position(0, panel_y - panel_height);
    hide_panel();
}

function disable() {
    if(show_event) Main.overview.disconnect(show_event);
    if(hide_event) Main.overview.disconnect(hide_event);

    panel_box.set_position(0, panel_y);
    panel.translation_y = 0;
}
