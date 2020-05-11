// @flow

import React from 'react';
import { Header, Table } from 'semantic-ui-react';
import { ISource } from '../../store/sources/types';
import { SelectSourceButton } from '../../components/buttons';

type SourceListProps = {
  sources: ISource[];
  onSelect: (source: ISource) => void;
}

export default ({ sources, onSelect }: SourceListProps) => (
  <Table selectable celled striped>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Sources</Table.HeaderCell>
        <Table.HeaderCell width="2" />
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {
        sources.map((s) => (
          <Table.Row>
            <Table.Cell collapsing width="14">
              <Header.Content>
                {s.name}
                <Header.Subheader>
                  {s.shortName}
                </Header.Subheader>
              </Header.Content>
            </Table.Cell>
            <Table.Cell collapsing width="14">
              <SelectSourceButton
                onSelect={onSelect}
                source={s}
              />
            </Table.Cell>
          </Table.Row>
        ))
      }
    </Table.Body>
  </Table>
);
