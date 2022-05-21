import {CustomCreep} from "./creeps/CustomCreep";
import {RoomStage} from "./stages/RoomStage";
import {StagesManager} from "../managers/StagesManager";
import {FarmerCreep} from "./creeps/FarmerCreep";
import {AttackerCreep} from "./creeps/AttackerCreep";
import {DefenderCreep} from "./creeps/DefenderCreep";
import {BuilderCreep} from "./creeps/BuilderCreep";
import {Logger} from "../utils/Logger";

export enum RoomState {
  ATTACK,
  DEFENSE,
  FARM
}

export interface MyCreepsList {
  farmers: Array<FarmerCreep>,
  builders: Array<BuilderCreep>,
  attackers: Array<AttackerCreep>,
  defenders: Array<DefenderCreep>
}

let logger = new Logger("CustomRoom");
export class CustomRoom {

  room: Room;
  myCreeps: MyCreepsList = {farmers: [], builders: [], attackers: [], defenders: []};
  hostileCreeps: Array<Creep> = [];
  buildings: Array<OwnedStructure> = [];
  resources: Array<Resource> = [];
  stage: RoomStage = StagesManager.roomStages[0];


  constructor(room: Room, myCreeps: MyCreepsList, hostileCreeps: Array<Creep>, buildings: Array<OwnedStructure>, resources: Array<Resource>) {
    this.room = room;
    this.myCreeps = myCreeps;
    this.hostileCreeps = hostileCreeps;
    this.buildings = buildings;
    this.resources = resources;
  }

  calculate() {

  }

  loop() {
    logger.trace("loop");
    this.calculate();
    this.calculateDefense();

    StagesManager.checkRoomStage(this);

    let allMyCreeps: Array<CustomCreep> = [...this.myCreeps.farmers, ...this.myCreeps.builders, ...this.myCreeps.defenders, ...this.myCreeps.attackers];
    logger.trace(allMyCreeps.length);
    allMyCreeps.forEach(creep => creep.loop());

  }

  hasHostileCreeps(): boolean {
    return false;
  }

  calculateDefense() {

  }

  containsCreep(creep: CustomCreep): boolean {
    return true;
  }

  removeCreep(creep: CustomCreep) {
    this.myCreeps.farmers = this.myCreeps.farmers.filter(c => c != creep);
    this.myCreeps.builders = this.myCreeps.builders.filter(c => c != creep);
    this.myCreeps.defenders = this.myCreeps.defenders.filter(c => c != creep);
    this.myCreeps.attackers = this.myCreeps.attackers.filter(c => c != creep);
  }

  // creeps
  // energy sources
  // structures

  // state (Attack, Defend, Farm)
}
