// @flow

import React from 'react';
import {
  Header, Button, List,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { ISource } from '../../store/sources/types';

type SourceListProps = {
  sources: ISource[];
}

export default ({ sources }: SourceListProps) => (
  <>
    <Header.Content as="h1">
      SOURCES
      <Header.Subheader as="h3">
        Municipality: HALDEN
      </Header.Subheader>
    </Header.Content>
    <List divided verticalAlign="middle" className="source-list">
      {
        sources.map((s) => (
          <List.Item>
            <List.Content floated="right">
              <Button
                size="tiny"
                as={Link}
                to={`/source/${s.id}`}
              >
                View Observations
              </Button>
            </List.Content>
            <List.Content>
              <Header.Content>
                {s.name}
                <Header.Subheader>
                  {s.shortName}
                </Header.Subheader>
              </Header.Content>
            </List.Content>
          </List.Item>
        ))
      }
    </List>
  </>
);
