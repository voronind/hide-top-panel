
const Main = imports.ui.main;
const Tweener = imports.ui.tweener;

const panel_actor = Main.panel.actor;
const panel_box = panel_actor.get_parent();

let panel_height = panel_actor.get_height();

let show_event = false;
let hide_event = false;

let ANIMATION_SPEED = 0.4;


function hide_panel() {
    Tweener.addTween(panel_actor, {
        translation_y: -panel_height,
        time: ANIMATION_SPEED
    });
}

function show_panel() {
    Tweener.addTween(panel_actor, {
        translation_y: 0,
        time: ANIMATION_SPEED
    });
}


function init() {}

function enable() {
    show_event = Main.overview.connect('showing', show_panel);
    hide_event = Main.overview.connect('hiding', hide_panel);

    panel_box.height = 0;
    hide_panel();
}

function disable() {
    if(show_event) Main.overview.disconnect(show_event);
    if(hide_event) Main.overview.disconnect(hide_event);

    panel_box.height = panel_height;
    show_panel();
}