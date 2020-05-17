// @flow
import React, { useState, useEffect, useReducer } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Grid, Header, Loader,
  Dimmer, Button,
} from 'semantic-ui-react';

import RangePicker from '../../components/rangepicker';
import ObservationTable from '../../components/observation-table';

import sActions from '../../store/sources/actions';
import oActions from '../../store/observations/actions';
import { getSource } from '../../services/sources';
import { getObservations } from '../../services/observations';
import displayMode from '../../helpers/display-modes';
import { toYMDFormat, compare } from '../../utils/date';
import { IState, initialState } from '../../store/common';
import { ISource } from '../../store/sources/types';
import { IObservationData } from '../../store/observations/types';
import sourcesReducer from '../../reducers/sources';
import observationsReducer from '../../reducers/observations';

const { GET_SOURCE, SET_CURRENT_SOURCE } = sActions;
const { GET_OBSERVATIONS, SET_OBSERVATIONS } = oActions;

export default () => {
  const [source, sDispatch] = useReducer(sourcesReducer, (initialState: IState<ISource>));
  const [observations, oDispatch] = useReducer(observationsReducer,
    (initialState: IState<IObservationData>));

  const params = useParams();

  const { sourceId } = params;

  useEffect(() => {
    const execute = async () => {
      sDispatch({
        type: GET_SOURCE,
      });

      const response = await getSource(sourceId);

      sDispatch({
        type: SET_CURRENT_SOURCE,
        payload: response.data.data[0],
      });
    };

    execute();
  }, []);

  const [mode, setMode] = useState('');
  const [dateRange, setDateRange] = useState({
    start: new Date(),
    end: new Date(),
  });

  const clickGetObservations = () => {
    const execute = async () => {
      oDispatch({
        type: GET_OBSERVATIONS,
      });

      const start = toYMDFormat(dateRange.start);
      const end = toYMDFormat(dateRange.end);

      const response = await getObservations({
        sourceId,
        range: `${start}/${end}`,
      });

      const display = compare(dateRange.start, dateRange.end)
        ? displayMode.HOURLY : displayMode.DAILY;

      setMode(display);

      oDispatch({
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

  const changeEndDate = (date) => {
    setDateRange({
      ...dateRange,
      end: date,
    });
  };

  const hasCurrent = !!source.current;
  let name = '';
  let shortName = '';
  let municipality = '';


  if (hasCurrent) {
    ({ name, shortName, municipality } = source.current);
  }

  return (
    <>
      <Grid.Column style={{ width: '100%' }}>
        <Grid padded>
          <Button
            content="Back"
            icon="left arrow"
            labelPosition="left"
            as={Link}
            to="/sources"
          />
        </Grid>
        <Grid padded style={{ paddingBottom: '3rem' }}>
          <Grid.Column
            divided="vertically"
          >
            <Grid.Row style={{ display: 'flex' }}>
              <Grid.Column>
                <Header as="h2">
                  <Header.Content>
                    {name}
                  </Header.Content>
                </Header>
                <p>
                  Short Name:&nbsp;
                  <b>{shortName}</b>
                </p>
                <p>
                  Municipality:&nbsp;
                  <b>{municipality}</b>
                </p>
              </Grid.Column>
              <Grid.Column style={{ marginLeft: 'auto' }}>
                <RangePicker
                  start={dateRange.start}
                  end={dateRange.end}
                  onStartChange={changeStartDate}
                  onEndChange={changeEndDate}
                />
                <Button onClick={clickGetObservations}>Filter</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid.Column>
        </Grid>
        <ObservationTable
          data={observations.list}
          display={mode}
        />
      </Grid.Column>
      <Dimmer active={source.fetching || observations.fetching} inverted>
        <Loader size="large">Loading</Loader>
      </Dimmer>
    </>
  );
};
