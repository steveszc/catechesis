import { WestminsterShorter } from './westminster-shorter';
import { WestminsterLonger } from './westminster-longer';
import { ForYoungChildren } from './for-young-children';
import { Heidelberg } from './heidelberg';
import { NewCity } from './new-city';
import { Puritan } from './puritan';
import { Keachs } from './keachs';

export const catechisms = {
  'westminster-shorter': WestminsterShorter,
  'westminster-longer': WestminsterLonger,
  'for-young-children': ForYoungChildren,
  heidelberg: Heidelberg,
  'new-city': NewCity,
  keachs: Keachs,
  puritan: Puritan,
} as const;
