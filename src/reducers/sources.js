import {
  IState, initialState, startFetch,
  setList,
} from '../store/common';
import { ISource } from '../store/sources/types';
import actions from '../store/sources/actions';

type reducerParam = {
  type: string,
  payload: string | number | boolean | Object,
};

export default (
  state: IState<ISource> = initialState,
  { type, payload }: reducerParam,
): IState<ISource> => {
  switch (type) {
    case actions.GET_ALL_SOURCES: {
      return startFetch(state);
    }
    case actions.SET_SOURCE_LIST: {
      return setList(state, payload);
    }
    case actions.GET_SOURCE: {
      return startFetch(state);
    }
    case actions.SET_CURRENT_SOURCE: {
      return {
        ...state,
        current: payload,
        fetching: false,
      };
    }
    default:
      return state;
  }
};
