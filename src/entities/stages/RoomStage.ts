
export interface RoomStage {
  FARMER_CREEPS: number;
  DEFENDER_CREEPS: number;
  STRUCTURES: {
    BUILD_ROADS_TO_RESOURCES: boolean;
    CONTAINERS: Array<{
      x: number,
      y: number,
      type: string
    }>;
    TOWERS: Array<{
      x: number,
      y: number
    }>;
  } | undefined;
}
