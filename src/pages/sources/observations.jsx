// @flow
import React, { useState, useReducer } from 'react';
import {
  Grid, Header, Loader,
  Dimmer, Button,
} from 'semantic-ui-react';
import RangePicker from '../../components/rangepicker';
import actions from '../../store/observations/actions';
import { ISource } from '../../store/sources/types';
import { getObservations } from '../../services/observations';
import { toYMDFormat } from '../../helpers/date';
import { initialState } from '../../store/common';
import observationsReducer from '../../reducers/observations';

type Props = {
  source: ISource;
}

const { GET_OBSERVATIONS, SET_OBSERVATIONS } = actions;


export default ({ source }: Props) => {
  const [observations, dispatch] = useReducer(observationsReducer, initialState);

  const [dateRange, setDateRange] = useState({
    start: new Date(),
    end: new Date(),
  });

  const clickGetObservations = () => {
    const execute = async () => {
      dispatch({
        type: GET_OBSERVATIONS,
      });

      const start = toYMDFormat(dateRange.start);
      const end = toYMDFormat(dateRange.end);

      const response = await getObservations({
        sourceId: source.id,
        range: `${start}/${end}`,
      });

      dispatch({
        type: SET_OBSERVATIONS,
        payload: response.data.data,
      });
    };

    execute();
  };

  const changeStartDate = (date) => {
    setDateRange({
      ...dateRange,
      start: date,
    });
  };

  const changesEndDate = (date) => {
    setDateRange({
      ...dateRange,
      end: date,
    });
  };

  return (
    <>
      <Grid style={{ width: '100%', margin: '0 auto', maxWidth: '90rem' }}>
        <Grid.Column>
          <Grid padded>
            <Button
              content="Back"
              icon="left arrow"
              labelPosition="left"
              style={{ marginLeft: '1rem' }}
            />
          </Grid>
          <Grid padded>
            <Grid.Column
              divided="vertically"
            >
              <Grid.Row style={{ display: 'flex' }}>
                <Grid.Column>
                  <Header as="h2">
                    <Header.Content>
                      {source.name}
                    </Header.Content>
                  </Header>
                  <p>
                    Short Name:&nbsp;
                    <b>{source.shortName}</b>
                  </p>
                  <p>
                    Municipality:&nbsp;
                    <b>{source.municipality}</b>
                  </p>
                </Grid.Column>
                <Grid.Column style={{ marginLeft: 'auto' }}>
                  <RangePicker
                    start={dateRange.start}
                    end={dateRange.end}
                    onStartChange={changeStartDate}
                    onEndChange={changesEndDate}
                  />
                  <Button onClick={clickGetObservations}>Filter</Button>
                </Grid.Column>
              </Grid.Row>
            </Grid.Column>
          </Grid>
        </Grid.Column>
      </Grid>
      <Dimmer active={observations.fetching} inverted>
        <Loader size="large">Loading</Loader>
      </Dimmer>
    </>
  );
};
