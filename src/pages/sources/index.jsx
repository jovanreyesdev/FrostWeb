import React, { useReducer, useEffect } from 'react';
import { Loader, Dimmer } from 'semantic-ui-react';
import sourcesReducer from '../../reducers/sources';
import { initialState } from '../../store/common';
import { getSources } from '../../services/sources';
import actions from '../../store/sources/actions';
import SourcesList from './list';

const {
  GET_ALL_SOURCES, SET_SOURCE_LIST,
} = actions;

export default () => {
  const [source, dispatch] = useReducer(sourcesReducer, initialState);

  useEffect(() => {
    const execute = async () => {
      dispatch({
        type: GET_ALL_SOURCES,
      });

      const response = await getSources();

      dispatch({
        type: SET_SOURCE_LIST,
        payload: response.data.data,
      });
    };

    execute();
  }, [dispatch]);

  return (
    <div className="main-container">
      <SourcesList
        sources={source.list}
      />
      <Dimmer active={source.fetching} inverted>
        <Loader size="large">Loading</Loader>
      </Dimmer>
    </div>
  );
};
