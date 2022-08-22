export interface MaintenanceItem {
  description: string;
  date: Date;
  resetRunCount: boolean;
}

export enum RunType {
  TEST = 'test',
  QUALIFYING = 'qualifying',
  ELIMINATIONS = 'eliminations',
}

export interface TimeSlip {
  reactionTime: number;
  sixtyFoot: number;
  threeThirtyFoot: number;
  eighthMile: number;
  mph: number;
}

export interface Run {
  date: Date;
  type: RunType;
  round: number | null;
  opponent: string | null;
  raceTrack: string;
  result: TimeSlip;
}

export interface TimeSlipTrackingFile {
  car: string;
  maintenance: MaintenanceItem[];
  runs: Run[];
}
