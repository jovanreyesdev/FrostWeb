/* eslint-disable react/jsx-props-no-spreading */
// @flow
import React from 'react';
import { Table, Icon } from 'semantic-ui-react';
import EmptyRow from '../empty-row';

type Props = {
  value: number;
}

export default ({ value, ...otherProps }: Props) => (value < 0
  ? <EmptyRow {...otherProps} cells={2} />
  : (
    <>
      <Table.Cell {...otherProps}>
        {value === 1 ? <Icon name="check circle" /> : null}
      </Table.Cell>
      <Table.Cell {...otherProps}>
        {value === 0 ? <Icon name="check circle" /> : null}
      </Table.Cell>
    </>
  ));
