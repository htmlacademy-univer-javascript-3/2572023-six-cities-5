import { NameSpace } from '@const';
import { State } from '@typings/state';
import { SortType } from '@const';
import { City } from '@typings/city';

export const getCity = (state: State): City => state[NameSpace.App].city;
export const getSortType = (state: State): SortType => state[NameSpace.App].sortType;
export const getError = (state: State): string | null => state[NameSpace.App].error;
