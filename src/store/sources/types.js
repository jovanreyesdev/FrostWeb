// @flow

export interface ISource {
  id: string;
  name: string;
  shortName: string;
  country: string;
  countryCode: string;
  geometry: {
    '@type': string;
    coordinates: number[];
    nearest: boolean,
  },
  masl: number;
  validFrom: string;
  county: string;
  countryId: number;
  municipality: string;
  municipalityId: number;
  stationHolders: string[];
  externalIds: string[];
  wigosId: string;
}
