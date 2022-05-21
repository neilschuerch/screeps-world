import {CustomRoom} from "../entities/CustomRoom";
import {RoomStage} from "../entities/stages/RoomStage";

export namespace StagesManager {

  export let roomStages: Array<RoomStage> = [
    {FARMER_CREEPS: 5, DEFENDER_CREEPS: 0} as RoomStage,
  ];

  export function checkRoomStage(room: CustomRoom) {

    //check if stage done
    if(1 === 1) {
      return;
    }


    room.stage = StagesManager.roomStages[0];

    // check if next stage is already satisfied.
    checkRoomStage(room);
  }

}
