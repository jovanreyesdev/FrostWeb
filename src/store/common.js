// @flow

import pageTypes from '../helpers/page-types';

export interface IState<T> {
  list: T[];
  fetching: boolean;
  current?: T;
  pageMode: string;
}

export const initialState = {
  list: [],
  fetching: false,
  pageMode: pageTypes.LIST,
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
