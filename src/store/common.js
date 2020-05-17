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
  list: state.list,
  fetching: true,
});

export const setList = <T>(state: IState<T>,
  list: T[]): IState<T> => ({
    list,
    fetching: false,
  });
