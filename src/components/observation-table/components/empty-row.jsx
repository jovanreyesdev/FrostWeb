/* eslint-disable react/jsx-props-no-spreading */
// @flow
import React from 'react';
import { Table } from 'semantic-ui-react';

type EmptyRowProps = {
  cells: number;
}

export default ({ cells, ...otherProps }: EmptyRowProps) => (
  <>
    {new Array(cells).fill(0).map(() => <Table.Cell {...otherProps} />)}
  </>
);
