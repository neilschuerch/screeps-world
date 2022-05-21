import {Logger} from "../utils/Logger";
import {CreepsManager} from "./CreepsManager";
import {CustomRoom, MyCreepsList} from "../entities/CustomRoom";
import {CustomCreep} from "../entities/creeps/CustomCreep";
import {StagesManager} from "./StagesManager";




let logger = new Logger("RoomsManager");
export namespace RoomsManager {

  export let myRooms: Array<CustomRoom> = [];
  export let enemyRooms: Array<CustomRoom> = [];


  export function getRooms() {
    logger.trace("loadRooms");
    for (let roomsKey in Game.rooms) {
      let roomCreeps: { myCreeps: MyCreepsList, hostileCreeps: Array<Creep> } = CreepsManager.findCreepsByRoom(Game.rooms[roomsKey]);
      // todo: load resources and buildings
      let customRoom: CustomRoom = new CustomRoom(Game.rooms[roomsKey], roomCreeps.myCreeps, roomCreeps.hostileCreeps, [], []);

      if (Game.rooms[roomsKey].controller?.my) {
        logger.trace(`Room ${Game.rooms[roomsKey]} found (my)`)
        myRooms.push(customRoom);

        StagesManager.checkRoomStage(customRoom);

      } else {
        logger.trace(`Room ${Game.rooms[roomsKey]} found (not my)`)
        enemyRooms.push(customRoom);
      }
    }



  }

  export function loopMyRooms() {
    logger.trace("loopMyRooms");
    myRooms.forEach(room => {
      room.loop();
    });
  }

  export function findRoomByCreep(creep: CustomCreep): CustomRoom | undefined {
    return [...myRooms, ...enemyRooms].find(room => room.containsCreep(creep));
  }

  export function findCustomRoomByRoom(room: Room): CustomRoom | undefined {
    return [...myRooms, ...enemyRooms].find(customRoom => customRoom.room == room);
  }

  export function findResourcesByRoom(): Array<Resource> {
    return [];

  }

  export function findBuildingsByRoom(): Array<Structure> {
    return [];

  }

  export function findConstructionSitesByRoom(): Array<ConstructionSite> {
    return [];
  }

}
