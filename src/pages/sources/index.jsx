import React, { useReducer, useEffect } from 'react';
import { Loader, Dimmer } from 'semantic-ui-react';
import sourcesReducer from '../../reducers/sources';
import { initialState } from '../../store/common';
import { getSources } from '../../services/sources';
import { ISource } from '../../store/sources/types';
import actions from '../../store/sources/actions';
import pageTypes from '../../helpers/page-types';
import SourcesList from './list';
import SourceObservations from './observations';

const {
  GET_SOURCES, SET_SOURCES, SET_PAGE_MODE,
  SELECT_SOURCE,
} = actions;

export default () => {
  const [source, dispatch] = useReducer(sourcesReducer, initialState);

  useEffect(() => {
    const execute = async () => {
      dispatch({
        type: GET_SOURCES,
      });

      const response = await getSources();

      dispatch({
        type: SET_SOURCES,
        payload: response.data.data,
      });
    };

    execute();
  }, [dispatch]);

  const onSourceSelect = (selectedSource: ISource) => {
    dispatch({
      type: SET_PAGE_MODE,
      payload: pageTypes.VIEW_OBSERVATIONS,
    });
    dispatch({
      type: SELECT_SOURCE,
      payload: selectedSource,
    });
  };

  let component = null;

  if (source.pageMode === pageTypes.LIST) {
    component = (
      <SourcesList
        sources={source.list}
        onSelect={onSourceSelect}
      />
    );
  } else if (source.pageMode === pageTypes.VIEW_OBSERVATIONS) {
    component = <SourceObservations source={source.current} />;
  }

  return (
    <div
      style={{
        minHeight: 'calc(100vh - 110px)',
        flexFlow: 'row',
        display: 'flex',
      }}
    >
      {component}
      <Dimmer active={source.fetching} inverted>
        <Loader size="large">Loading</Loader>
      </Dimmer>
    </div>
  );
};
