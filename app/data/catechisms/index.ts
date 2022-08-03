import { ForYoungChildren } from './for-young-children';
import { Heidelberg } from './heidelberg';
import { WestminsterShorter } from './westminster-shorter';

export const catechisms = {
  'for-young-children': ForYoungChildren,
  heidelberg: Heidelberg,
  'westminster-shorter': WestminsterShorter,
} as const;
