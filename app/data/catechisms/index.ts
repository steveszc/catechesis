import { Heidelberg } from './heidelberg';
import { WestminsterShorter } from './westminster-shorter';

export const catechisms = {
  heidelberg: Heidelberg,
  'westminster-shorter': WestminsterShorter,
} as const;
