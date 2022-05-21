import {Logger} from "../../utils/Logger";
import {CustomCreep} from "./CustomCreep";

let logger = new Logger("BuilderCreep");
export class BuilderCreep extends CustomCreep{

  constructor(creep: Creep, onDeath: (creep: CustomCreep) => void) {
    super(creep, onDeath);
    creep.memory.role = this.constructor.name
  }

  override loopAction() {
    logger.trace("loopAction");
  }
}
