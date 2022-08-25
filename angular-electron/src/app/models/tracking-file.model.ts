export interface MaintenanceItem {
  description: string;
  date: Date;
  resetRunCount: boolean;
}

export enum RunType {
  TEST = 'Testing',
  QUALIFYING = 'Q',
  ELIMINATIONS = 'E',
}

export interface TimeSlip {
  reactionTime: number;
  sixtyFoot: number;
  threeThirtyFoot: number;
  eighthMile: number;
  mph: number;
}

export enum Outcome {
  WIN,
  LOSS,
}

export interface Run {
  id: number;
  date: Date;
  type: RunType;
  round: number | null;
  opponent: string | null;
  raceTrack: string | null;
  result: TimeSlip;
  outcome: Outcome | null;
  notes: string | null;
}

export interface TimeSlipTrackingFile {
  car: string;
  idCounter: number;
  maintenance: MaintenanceItem[];
  runs: Run[];
}
