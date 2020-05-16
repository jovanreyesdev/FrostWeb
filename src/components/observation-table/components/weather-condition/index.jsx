// @flow
import React from 'react';
import { Table, Icon } from 'semantic-ui-react';
import EmptyRow from '../empty-row';

type Props = {
  value: number;
}

export default ({ value }: Props) => (
  value < 0 ? <EmptyRow cells={2} /> : (
    <>
      <Table.Cell>
        {value === 1 ? <Icon name="check circle" /> : null}
      </Table.Cell>
      <Table.Cell>
        {value === 0 ? <Icon name="check circle" /> : null}
      </Table.Cell>
    </>
  )
);
