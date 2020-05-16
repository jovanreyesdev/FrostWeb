// @flow
import React from 'react';
import { Table } from 'semantic-ui-react';

import { toYMDFormat } from '../../utils/date';
import { getHighestValue } from '../../utils/array';
import displayMode from '../../helpers/display-modes';
import Elements from '../../helpers/elements';
import { IObservationData, IObservation } from '../../store/observations/types';

import AirTemperatureHeader from './components/air-temperature/header';
import WindSpeedHeader from './components/wind-speed/header';
import WeatherConditionRow from './components/weather-condition';
import DataRow from './components/row';

type Props = {
  data: IObservationData[];
  display: string;
}

export default ({ data, display }: Props) => {
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
          <AirTemperatureHeader />
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
          const tempObservations: IObservation[] = d.observations
            .filter((o) => o.elementId === Elements.AIR_TEMPERATURE);

          const windObservations: IObservation[] = d.observations
            .filter((o) => o.elementId === Elements.WIND_SPEED);

          const weatherCondition = d.observations
            .find((o) => o.elementId === Elements.WEATHER_CONDITION);

          const hasWeatherCondition = weatherCondition !== undefined;
          const length = getHighestValue([windObservations.length,
            tempObservations.length]);
          const rows = new Array(length).fill(0);

          return (
            <>
              <Table.Row key={d.sourceId}>
                <Table.Cell rowSpan={rows.length + 1}>
                  {toYMDFormat(d.referenceTime)}
                </Table.Cell>
              </Table.Row>
              {
                rows.map((o, i) => (
                  <Table.Row>
                    <DataRow data={tempObservations[i]} />
                    <DataRow data={windObservations[i]} />
                    <WeatherConditionRow
                      value={hasWeatherCondition ? weatherCondition.value : -1}
                    />
                  </Table.Row>
                ))
              }
            </>
          );
        })}
      </Table.Body>
    </Table>
  );
};
