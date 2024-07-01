import { createReducer, on } from '@ngrx/store';

import { IgameState } from './game.model';
import { GameActions } from './game.actions';
import { InitialState } from './game.initialState';

export const initialState: IgameState = InitialState;

const screenWidth = 1260;
const alienVictory = 610;
const edge_of_screen = 560; 
const spaceship_y = 535; 
const collision_y = 550;
const spaceship_width = 83; 
const alien_width = 50;
const alien_height = 75; 
const row_gap = 10; 
const column_gap = 55;


export const gameReducer = createReducer(
  initialState,
  on(GameActions.updateState, (state) => {

    let { 
      interval,
      interval_set,
      game_over,
      modal_opacity,
      alien_speed,
      max_right,
      direction,
      counter,
      right_flank,
      left_flank,
      max_left,
      army_position_x,
      army_position_y,
      spaceship_location_x,
      shoot_laser,
      laser_location_x,
      laser_location_y,
      laser_opacity,
      shooting_speed,
      dead_alien_counter,
      dead_rows,
      spaceship_destroyed,
      alien_army_destroyed,
      dead_alien,
      obj0,
      obj1,
      obj2,
      obj3
    } = state;

    let alien_army = state.alien_army.slice(), 
                     dead_columns = state.dead_columns.slice(),
                     target_hit_y = 0, 
                     target_hit_x = 0, 
          
                     old_right = 0, 
                     old_left = 0, 
                     difference_r = 0, 
                     difference_l = 0,
                     keys_pressed = state.keys_pressed.slice();

    const spaceship_speed = 18, laser_speed = 20;

    interval_set = 1;
    interval = 1 - interval;
    if(!game_over){ modal_opacity = 0; }

        //---------move spaceship--------

        if( keys_pressed.includes("ArrowRight") && spaceship_location_x < edge_of_screen && !spaceship_destroyed ) {
          spaceship_location_x += spaceship_speed;
        }
        if( keys_pressed.includes("ArrowLeft") && spaceship_location_x > -edge_of_screen && !spaceship_destroyed ) {
          spaceship_location_x -= spaceship_speed;
        }
    
          //---------check if spaceship collided with alien  --------
    
        const army_height__ = army_position_y + (row_gap*(4-dead_rows)) + (alien_height*(5-dead_rows));

        if( army_height__ >= collision_y) {

          const spaceship_x = spaceship_location_x + screenWidth/2 - army_position_x;
          const ind = Math.floor(spaceship_x/(alien_width + column_gap));
          const alienx = ind*(alien_width + column_gap);
    
          if((spaceship_x >= alienx)&&(spaceship_x <= alienx+alien_width)&&(alien_army[(4-dead_rows)*10+ind])){

            alien_army.splice(((4-dead_rows)*10+ind),1,0);
            dead_alien = ((4-dead_rows)*10+ind);
            spaceship_destroyed = 1;
            game_over = 1;
          }
        }


      //---------alien army manoeuvre ---------

      let move_x = alien_speed>0?(225+(max_right*(alien_width+column_gap))):(225+max_left*(alien_width+column_gap));
      let distance = direction ? 20 : move_x;
  
      counter += Math.abs(alien_speed);
      if(counter >= distance){
            if(direction){ alien_speed*=-1; }
            if(!direction){ max_right = right_flank + left_flank;
                            max_left = right_flank + left_flank;
                          }
            direction = 1-direction;
            counter = 0;
       }
       army_position_x += !direction?alien_speed:0;
       army_position_y += direction?Math.abs(alien_speed):0;
  
       if(army_height__ >= alienVictory){ 
          console.log('alienVictory : ',alienVictory)
          spaceship_destroyed = 1; game_over = 1; 
       }


         //---------shoot laser  --------

         const army_height = army_position_y + (row_gap*4) + (alien_height*5);
         const y = laser_location_y + spaceship_y - army_position_y
   
         let ind_y = Math.ceil(y/(alien_height + row_gap))-5;
         const alien_y = (ind_y*(alien_height + row_gap) + army_height);
    
         const x = laser_location_x - army_position_x;
         const ind_x = Math.floor(x/(alien_width + column_gap));
         const alien_x = ind_x*(alien_width + column_gap);
    
         if(state.shoot_laser){
    
              if(laser_location_y > -edge_of_screen) { 
                laser_location_y -= laser_speed; 
              }
              if(laser_location_y <= army_height &&
                (laser_location_x >= army_position_x) &&
                (laser_location_x <= army_position_x+1000)) {
            
                    if(laser_location_y <= alien_y){
                        ind_y = ind_y+4;
                        target_hit_y = 1;
                    }
                    if( (x >= alien_x) && (x <= alien_x+alien_width) ){ 
                      target_hit_x = 1; 

                    }
              };
    
              if((laser_location_y <= -edge_of_screen)){
                shoot_laser = false;
                laser_location_y = 0;
                if(spaceship_destroyed){ 
                  laser_opacity = 0; 
                }
              }
          }
           //--------alien hit

           if(target_hit_x && target_hit_y && (alien_army[ind_y*10+ind_x])){

            dead_alien = ind_y*10+ind_x;
            dead_alien_counter++;

            alien_army.splice(dead_alien,1,0);
            shoot_laser = false;
            laser_location_y = 0;
            alien_speed *= 1.036;
            shooting_speed -= 1;
            if(spaceship_destroyed){ laser_opacity = 0; }
            if(dead_alien_counter === 50){ alien_army_destroyed = 1; game_over = 1; }
          

          //--------check for dead columns and update army manoeuvre accordingly

          const x_ = dead_alien%10;
          const y_ = ind_y*10;

          if(!alien_army[x_]&&!alien_army[x_+10]&&!alien_army[x_+20]&&!alien_army[x_+30]&&!alien_army[x_+40]){

            dead_columns.splice(x_,1,0);

            const count_dead_colums_left = (arr: number[], left: number) => {
                if ( arr.length && arr[0]===0 ) {
                  arr.shift();
                  count_dead_colums_left(arr,left);
                }
                old_left = left;
                left = 10-arr.length;
                const dif_l = Math.abs(left-old_left);

              return { left,dif_l }
            };

            const count_dead_colums_right = (arr: number[], right: number) => {
                if( arr.length && arr[arr.length-1]===0 ) {
                  arr.pop();
                  count_dead_colums_right(arr,right);
                }
                old_right = right;
                right = 10-arr.length;
                const dif_r = Math.abs(right-old_right);
                return { right,dif_r }
            };


            if(x_ === left_flank) {
                const { left,dif_l } = count_dead_colums_left(dead_columns.slice(),left_flank);
                left_flank = left; difference_l = dif_l; max_left += difference_l;
            }

            if(x_ === 9-right_flank) {
              const { right,dif_r } = count_dead_colums_right(dead_columns.slice(),right_flank);
                right_flank = right; difference_r = dif_r; max_right += difference_r;
            }
          }

          //--------check for dead rows

          let last_row = 4-dead_rows;
          if(alien_army.indexOf(1,last_row*10)===-1){
            dead_rows++;
            let last_living_alien = alien_army.lastIndexOf(1, y_-alien_army.length);
            let more_dead_rows = Math.floor((last_row*10-last_living_alien)/10);
            dead_rows+=more_dead_rows;
          }

        }

         //-----//--------aliens shoot back

        const get_random_alien = (arr: number[], min: number, max: number) => {
          let x = Math.floor(Math.random() * (max-min) + min);
          let y = Math.floor(Math.random()*(5-dead_rows))*10;
          let rand = x + y;
          let res;
          if(arr[rand]){ res = rand; }
          else { let Randfirst = arr.indexOf( 1, rand );
                res = Randfirst > -1 ? Randfirst : arr.lastIndexOf(1, rand - arr.length );
              }
          x = (Number(res.toString().length))===2?(Number(res.toString()[1])):(Number(res.toString()[0]));
          y = (Number(res.toString().length))===2?(Number(res.toString()[0]))*10:0;
          return {x,y}
      };

      const alien_laser_func = (
        pos: { [key: string]: number }, 
        shooter: number, set: number,
        fired: number,
        rand: number,
        count: number,
        opacity: number,
        hit: number
      ) => {

        opacity = fired && !hit ? 1 : 0;

        //set initial laser location

        if(!game_over&&!fired){

          if(!set || !alien_army[shooter]){
              const adjustment_x = army_position_x + (alien_width/2);
              const adjustment_y = army_position_y /*+ (alien_height/2)*/;
              let { x, y } = get_random_alien(alien_army.slice(), left_flank, 10-right_flank);
              shooter = x + y;
              x = x*(alien_width+column_gap) + adjustment_x;
              y = y/10*(alien_height+row_gap) + adjustment_y;
              set = 1;
              pos = { x,y };
          }

          if(set){
              pos = { 
                 x: pos['x'] + (!direction ? alien_speed : 0),
                 y: pos['y'] + (direction ? Math.abs(alien_speed) : 0)
              };

          }

          //set shooting timer and fire laser

          if(!rand){ rand = Math.floor(Math.random()*shooting_speed); }
          count++;
          if(count === rand){
              count = 0;
              rand = 0;
              fired = 1;
          }

        }
        //update laser location and destroy spaceship if hit
        if ( fired ) { 
          pos = { ...pos, y: pos['y'] + laser_speed };
        }

        const adjustment_x_ = 575;
        const spaceship_height = 100;

        if((!spaceship_destroyed) &&
          (pos['y'] >= spaceship_y) &&
          (pos['y'] <= (spaceship_y + spaceship_height)) &&
          ((pos['x'] - adjustment_x_) >= spaceship_location_x) &&
          ((pos['x'] - adjustment_x_) <= (spaceship_location_x + spaceship_width)))
          { hit = 1; spaceship_destroyed = 1; game_over = 1; }

        if((pos['y'] > edge_of_screen+130) && !game_over){ set = 0; fired = 0; opacity = 0; }

        return { pos, shooter, set, fired, rand, count, opacity, hit }
      };


      obj0 = alien_laser_func(obj0.pos, obj0.shooter, obj0.set, obj0.fired, obj0.rand, obj0.count, obj0.opacity, obj0.hit);
      obj1 = alien_laser_func(obj1.pos, obj1.shooter, obj1.set, obj1.fired, obj1.rand, obj1.count, obj1.opacity, obj1.hit);
      obj2 = alien_laser_func(obj2.pos, obj2.shooter, obj2.set, obj2.fired, obj2.rand, obj2.count, obj2.opacity, obj2.hit);
      obj3 = alien_laser_func(obj3.pos, obj3.shooter, obj3.set, obj3.fired, obj3.rand, obj3.count, obj3.opacity, obj3.hit);

        // // // // // // // // // // // // // // // // // // // // // // // // // //

      if(game_over){
        alien_speed = 0;
        modal_opacity = 1;
      }

       

       return { 
           ...state,
           interval,
           interval_set,
           spaceship_location_x,
           spaceship_destroyed,
           alien_army_destroyed,
           laser_location_x,
           laser_location_y,
           laser_opacity,
           shoot_laser,
           alien_army,
           army_position_x,
           army_position_y,
           counter,
           alien_speed,
           right_flank,
           left_flank,
           max_right,
           max_left,
           direction,
           dead_alien,
           dead_alien_counter,
           dead_columns,
           dead_rows,
           shooting_speed,
           obj0,
           obj1,
           obj2,
           obj3,
           game_over,
           modal_opacity
         };


  }),
  on(GameActions.keyDown, (state, payload) => {

    const { key } = payload;
    const  ignore_key = (!["ArrowRight","ArrowLeft","ArrowUp"].includes(key));
    let { 
      keys_pressed, 
      spaceship_destroyed, 
      shoot_laser, 
      spaceship_location_x,
      laser_location_x
    } = state;

    let keys_array = keys_pressed.slice();

    if( (key==="ArrowUp" || keys_array.includes("ArrowUp")) && !spaceship_destroyed && state.interval_set && !shoot_laser ){ 
      shoot_laser = true;
      laser_location_x = spaceship_location_x + screenWidth/2-15
    };
    if( !ignore_key && keys_array[keys_array.length-1] !== key ) {

        if( keys_array.length > 1 ){ 
          keys_array.shift(); 
        }

        keys_array.push(key);
    }
    return {
      ...state, 
      shoot_laser,
      laser_location_x,
      keys_pressed: keys_array, 
    }
  }),
  on(GameActions.keyUp, (state, payload) => {

    const { key } = payload;
    const  ignore_key = (!["ArrowRight","ArrowLeft","ArrowUp"].includes(key));
    let { keys_pressed } = state;
    let keys_array = keys_pressed.slice();
    if( !ignore_key ){ 
      keys_array.splice(keys_array.indexOf(key), 1); 
    }
    return { 
      ...state, 
      keys_pressed: keys_array 
    };
  }),
  on(GameActions.newGame, (state) => {

    if(state.modal_opacity){
      return { ...initialState }
    }
    return state
  }),

);