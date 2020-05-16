// @flow
import React from 'react';
import { Table } from 'semantic-ui-react';

type EmptyRowProps = {
  cells: number;
}

export default ({ cells }: EmptyRowProps) => (
  <>
    {new Array(cells).fill(0).map(() => <Table.Cell />)}
  </>
);
