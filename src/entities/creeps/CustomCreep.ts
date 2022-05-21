import {Logger} from "../../utils/Logger";
import {CreepsManager} from "../../managers/CreepsManager";

let logger = new Logger("CustomCreep")
export class CustomCreep {

  creep: Creep;
  onDeath: (creep: CustomCreep) => void;

  constructor(creep: Creep, onDeath: (creep: CustomCreep) => void) {
    this.creep = creep;
    this.onDeath = onDeath;
    creep.memory.role = this.constructor.name
  }

  loop() {
    logger.trace("loop");

    if (this.isDead) {
      logger.info("Creep died");
      this.onDeath(this);
      return;
    }

    this.loopAction();
  }

  get isDead(): boolean {
    return this.creep == null;
  }

  loopAction() {
    logger.trace("loopAction");
  }
}
