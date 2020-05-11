import {
  IState, initialState, startFetch,
  setList,
} from '../store/common';
import { ISource } from '../store/sources/types';
import actions from '../store/sources/actions';

type reducerParam = {
  type: string,
  payload: Object,
};

export default (
  state: IState<ISource> = initialState,
  { type, payload }: reducerParam,
): IState<ISource> => {
  switch (type) {
    case actions.GET_SOURCES: {
      return startFetch(state);
    }
    case actions.SET_SOURCES: {
      return setList(state, payload);
    }
    case actions.SELECT_SOURCE: {
      return {
        ...state,
        current: payload,
      };
    }
    case actions.SET_PAGE_MODE: {
      return {
        ...state,
        pageMode: payload,
      };
    }
    default:
      return state;
  }
};
