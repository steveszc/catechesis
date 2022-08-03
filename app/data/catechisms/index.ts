import { ForYoungChildren } from './for-young-children';
import { Heidelberg } from './heidelberg';
import { Keachs } from './keachs';
import { Puritan } from './puritan';
import { WestminsterLonger } from './westminster-longer';
import { WestminsterShorter } from './westminster-shorter';

export const catechisms = {
  'for-young-children': ForYoungChildren,
  heidelberg: Heidelberg,
  keachs: Keachs,
  puritan: Puritan,
  'westminster-longer': WestminsterLonger,
  'westminster-shorter': WestminsterShorter,
} as const;
