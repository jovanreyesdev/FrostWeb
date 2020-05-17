// @flow
import React from 'react';
import { Table } from 'semantic-ui-react';

import { toYMDFormat } from '../../utils/date';
import { getHighestValue, filterByElement, findByElement } from '../../utils/array';
import displayMode from '../../helpers/display-modes';
import Elements from '../../helpers/elements';
import { IObservationData, IObservation } from '../../store/observations/types';

import TemperatureHeader from './components/headers/temp';
import WindSpeedHeader from './components/headers/wind';
import DataRow from './components/data-row';

type ObservationTableProps = {
  data: IObservationData[];
  display: string;
}

export default ({ data, display }: ObservationTableProps) => {
  let observationData = data;

  if (display === displayMode.DAILY) {
    observationData = data.filter((d) => d.referenceTime.includes('T12:00:00.000Z'));
  }

  return (
    <Table celled structured>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell rowSpan="2">
            Reference Time
          </Table.HeaderCell>
          <Table.HeaderCell colSpan="4">
            Air
          </Table.HeaderCell>
          <Table.HeaderCell colSpan="4">
            Wind
          </Table.HeaderCell>
          <Table.HeaderCell colSpan="2">
            Weather Condition
          </Table.HeaderCell>
        </Table.Row>
        <Table.Row>
          <TemperatureHeader />
          <WindSpeedHeader />
          <Table.HeaderCell>
            Sunny
          </Table.HeaderCell>
          <Table.HeaderCell>
            Cloudy
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {observationData.map((d) => {
          const temp: IObservation[] = filterByElement(d.observations, Elements.AIR_TEMPERATURE);
          const wind: IObservation[] = filterByElement(d.observations, Elements.WIND_SPEED);
          const weather = findByElement(d.observations, Elements.WEATHER_CONDITION);

          const weatherValue = weather !== undefined ? weather.value : -1;
          const length = getHighestValue([wind.length, temp.length]);
          const rowSpan = length + 1;

          return (
            <>
              <Table.Row key={d.sourceId}>
                <Table.Cell rowSpan={rowSpan}>
                  {toYMDFormat(d.referenceTime)}
                </Table.Cell>
              </Table.Row>
              <DataRow
                rows={length}
                rowSpan={rowSpan}
                tempObservations={temp}
                windObservations={wind}
                weatherObservations={weatherValue}
              />
            </>
          );
        })}
      </Table.Body>
    </Table>
  );
};
