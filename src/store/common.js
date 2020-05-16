// @flow

export interface IState<T> {
  list: T[];
  fetching: boolean;
  current?: T;
}

export const initialState = {
  list: [],
  fetching: false,
};

export const startFetch = <T>(state: IState<T>): IState<T> => ({
  ...state,
  fetching: true,
});

export const setList = <T>(state: IState<T>,
  list: T[]): IState<T> => ({
    ...state,
    list,
    fetching: false,
  });
