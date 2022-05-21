import {Logger, LogLevel} from "./utils/Logger";
import {RoomsManager} from "./managers/RoomsManager";
import {CustomCreep} from "./entities/creeps/CustomCreep";
import {FarmerCreep} from "./entities/creeps/FarmerCreep";
import {CreepsManager} from "./managers/CreepsManager";

Logger.config({logLevel: LogLevel.DEBUG, colored: true, logObjects: true});

let logger = new Logger("GameManager");

export namespace GameManager {

  export function setup() {
    logger.debug("setup");

    RoomsManager.getRooms();
  }

  export function loop() {
    logger.debug("loop");

    // set logLevel to Memory env if defined (for debug in Prod)
    if (Memory.logger == undefined) {
      Memory.logger = {logLevel: undefined, colored: undefined, logObjects: undefined};
    } else {
      if (Memory.logger.logLevel != undefined) {
        Logger.globalLogLevel =  Memory.logger.logLevel;
      }
    }

    // Automatically delete memory of missing creeps
    CreepsManager.clearMemoryOfNonExistingCreeps();

    RoomsManager.loopMyRooms();

    // for (let creepsKey in Game.creeps) {
    //   logger.info(Game.creeps[creepsKey]);
    // }


    // let fcreep = new FarmerCreep(Game.creeps.testCreep);
    // let ccreep = fcreep as CustomCreep;
    //
    // ccreep.loop();

    // run every 10 ticks
    if (Game.time % 10 === 0) {
      logger.trace("every 10 ticks");
    }
  }
}




/*

Loop:
  Rooms:
    CustomRoom:
      Calculate:
        Status:
        Needed Buildings:
          Path
          Containers
          Towers
      Creeps:
        Calculate:
          Spawn:

        Creep:
          Calculate:
            Paths
            What to do

          Farmer:
            Farm Resources
          Builders:
            Builder
          Attacker:
          Defender:


    Share Resources?
    Share Creeps?










 */
