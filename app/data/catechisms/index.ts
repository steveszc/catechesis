import { ForYoungChildren } from './for-young-children';
import { Heidelberg } from './heidelberg';
import { WestminsterLonger } from './westminster-longer';
import { WestminsterShorter } from './westminster-shorter';

export const catechisms = {
  'for-young-children': ForYoungChildren,
  heidelberg: Heidelberg,
  'westminster-longer': WestminsterLonger,
  'westminster-shorter': WestminsterShorter,
} as const;
