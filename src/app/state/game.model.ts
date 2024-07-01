
export interface IAlianlaser {
    pos: { [key: string]: any };
    shooter: number;
    set: number;
    fired: number;
    rand: number;
    count: number;
    opacity: number;
    hit: number;
}

export interface IgameState {
    modal_opacity: number;
    interval: number;
    interval_set: number;
    key: string;
    keys_pressed: string[];
    shoot_laser: boolean;
    spaceship_location_x: number;
    spaceship_destroyed: number;
    alien_army_destroyed: number;
    laser_location_x: number;
    laser_location_y: number;
    laser_opacity: number;
    alien_army: number[];
    army_position_x: number;
    army_position_y: number;
    counter: number;
    direction: number;
    alien_speed: number;
    dead_alien: number;
    dead_alien_counter: number;
    right_flank: number;
    left_flank: number;
    max_right: number;
    max_left: number;
    dead_columns: number[];
    dead_rows: number;
    shooting_speed: number;
    obj0: IAlianlaser,
    obj1: IAlianlaser,
    obj2: IAlianlaser,
    obj3: IAlianlaser,
    game_over: number;
};