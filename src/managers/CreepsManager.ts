import {CustomCreep} from "../entities/creeps/CustomCreep";
import {CustomRoom, MyCreepsList} from "../entities/CustomRoom";
import {FarmerCreep} from "../entities/creeps/FarmerCreep";
import {BuilderCreep} from "../entities/creeps/BuilderCreep";
import {DefenderCreep} from "../entities/creeps/DefenderCreep";
import {AttackerCreep} from "../entities/creeps/AttackerCreep";
import {Logger} from "../utils/Logger";
import {RoomsManager} from "./RoomsManager";

let logger = new Logger("CreepsManager");
export namespace CreepsManager {


  export function clearMemoryOfNonExistingCreeps() {
    for (const name in Memory.creeps) {
      if (!(name in Game.creeps)) {
        delete Memory.creeps[name];
      }
    }
  }


  // todo: function to create creeps by memory type or hostile

  // todo: creep type here already
  export function findCreepsByRoom(room: Room): {myCreeps: MyCreepsList, hostileCreeps: Array<Creep>} {
    let myCreeps: MyCreepsList = {farmers: [], builders: [], attackers: [], defenders: []};
    let hostileCreeps: Array<Creep> = [];

    for (let creepsKey in Game.creeps) {
      if (Game.creeps[creepsKey].room == room) {
        if (Game.creeps[creepsKey].my) {
          // todo: different creep by memory type

          switch (Game.creeps[creepsKey].memory.role) {
            case FarmerCreep.name:

              // todo: better distribution of sources and deposits

              let source: Source | null = Game.creeps[creepsKey].pos.findClosestByRange(FIND_SOURCES_ACTIVE);
              let spawn: StructureSpawn | null = Game.spawns.Spawn1;

              if (source && spawn) {
                myCreeps.farmers.push(new FarmerCreep(Game.creeps[creepsKey], source, spawn, (creep: CustomCreep) => onCreepsDeath(creep, room)));
              } else {
                logger.error("No Source found in this Room");
              }

              break;
            case BuilderCreep.name:
              myCreeps.builders.push(new BuilderCreep(Game.creeps[creepsKey], (creep: CustomCreep) => onCreepsDeath(creep, room)));
              break;
            case DefenderCreep.name:
              myCreeps.defenders.push(new DefenderCreep(Game.creeps[creepsKey], (creep: CustomCreep) => onCreepsDeath(creep, room)));
              break;
            case AttackerCreep.name:
              myCreeps.attackers.push(new AttackerCreep(Game.creeps[creepsKey], (creep: CustomCreep) => onCreepsDeath(creep, room)));
              break;
            default:
              logger.error("Creep has unknown type");

              // todo: might self destruct this creep!
          }
        } else {
          // todo: implement HostileCustomCreep
          hostileCreeps.push(Game.creeps[creepsKey]);
        }
      }
    }

    return {myCreeps: myCreeps, hostileCreeps: hostileCreeps};
  }

  export function onCreepsDeath(creep: CustomCreep, room: Room) {
    let customRoom = RoomsManager.findCustomRoomByRoom(room);
    if (customRoom) {
      customRoom.removeCreep(creep);
    }
  }

  // export function creepDied(creep: CustomCreep) {
  //   let room: CustomRoom | undefined = RoomsManager.findRoomByCreep(creep);
  //   room?.removeCreep(creep);
  // }


  // export function calculateFarmerCreepsResources(room: CustomRoom) {
  //   let farmerCreeps = room.myCreeps.sort()
  // }
}

