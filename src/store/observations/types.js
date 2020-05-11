// @flow

export interface IObservationLevel {
  levelType: string;
  unit: string;
  value: number;
}

export interface IObservation {
  elementId: string;
  exposureCategory: string;
  level: IObservationLevel;
  performanceCategory: string;
  qualityCode: number;
  timeOffset: string;
  timeResolution: string;
  timeSeriesId: number;
  unit: string;
  value: number;
}

export interface IObservationData {
  referenceTime: string;
  sourceId: string;
  observations: IObservation[];
}
