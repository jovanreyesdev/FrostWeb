// @flow
import React from 'react';
import { Table } from 'semantic-ui-react';
import { IObservation } from '../../../store/observations/types';
import units from '../../../helpers/units';
import EmptyRow from './empty-row';

type Props = {
  data: IObservation;
}

export default ({ data }: Props) => {
  let component = <EmptyRow cells={4} />;

  if (data) {
    component = (
      <>
        <Table.Cell>
          {`${data.value}${units[data.unit]}`}
        </Table.Cell>
        <Table.Cell>
          {data.exposureCategory}
        </Table.Cell>
        <Table.Cell>
          {data.performanceCategory}
        </Table.Cell>
        <Table.Cell>
          {`${data.level.value}${units[data.level.unit]} ${data.level.levelType}`}
        </Table.Cell>
      </>
    );
  }

  return component;
};
