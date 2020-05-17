// @type
import React from 'react';
import { Table } from 'semantic-ui-react';
import { IObservation } from '../../../store/observations/types';
import DataCells from './data-cells';
import WeatherConditionCell from './weather-condition';

type DataRowProps = {
  rows: number;
  rowSpan: number;
  windObservations: IObservation[];
  tempObservations: IObservation[];
  weatherObservations: IObservation;
}

export default ({
  rows,
  rowSpan,
  windObservations,
  tempObservations,
  weatherObservations,
}: DataRowProps) => (
  <>
    {
      new Array(rows).fill(0).map((o, i) => (
        <Table.Row>
          <DataCells data={tempObservations[i]} />
          <DataCells data={windObservations[i]} />
          {
            i === 0 ? (
              <WeatherConditionCell
                textAlign="center"
                value={weatherObservations}
                rowSpan={rowSpan}
              />
            ) : null
          }
        </Table.Row>
      ))
    }
  </>
);
