import {
  IState, initialState, startFetch,
  setList,
} from '../store/common';
import { IObservationData } from '../store/observations/types';
import actions from '../store/observations/actions';

type reducerParam = {
  type: string,
  payload: string | number | boolean | Object,
};

export default (
  state: IState<IObservationData> = initialState,
  { type, payload }: reducerParam,
): IState<IObservationData> => {
  switch (type) {
    case actions.GET_OBSERVATIONS: {
      return startFetch(state);
    }
    case actions.SET_OBSERVATIONS: {
      return setList(state, payload);
    }
    default:
      return state;
  }
};
