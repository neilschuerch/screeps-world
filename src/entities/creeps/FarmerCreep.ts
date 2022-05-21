import {Logger} from "../../utils/Logger";
import {CustomCreep} from "./CustomCreep";

let logger = new Logger("FarmerCreep");

export class FarmerCreep extends CustomCreep {

  source: Source;
  deposit: StructureSpawn | StructureContainer;

  constructor(creep: Creep, source: Source, deposit: StructureSpawn | StructureContainer, onDeath: (creep: CustomCreep) => void) {
    super(creep, onDeath);
    creep.memory.role = this.constructor.name
    this.source = source;
    this.deposit = deposit;
  }

  override loopAction() {
    logger.trace("loopAction" + this.creep.name);



    if (this.creep.store.getFreeCapacity(RESOURCE_ENERGY)) {
      logger.error("harvest");
      let h = this.creep.harvest(this.source);
      logger.error("Harvest Error: " + h);
      if (h == ERR_NOT_IN_RANGE) {
        logger.error("move")
        let m = this.creep.moveTo(this.source);
        logger.error("Move error: " + m);


      }
      // logger.warn("No Free Capacity. Should not be possible!");
    } else {
      logger.error("transfer")
      let t = this.creep.transfer(this.deposit, RESOURCE_ENERGY);
      logger.info("Transfer Error: " + t);
      if (t == ERR_NOT_IN_RANGE) {
        logger.error("moveSpawn")

        logger.info(Game.spawns.Spawn1);
        let m = this.creep.moveTo(Game.spawns.Spawn1);
        logger.error("Move error: " + m);
      }

    }


  }

  findNearResource() {

  }
}
