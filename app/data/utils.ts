import { catechisms } from './catechisms';
import type { Catechism, CatechismData } from './types';

export function isCatechism(str: string): str is Catechism {
  return Object.keys(catechisms).includes(str);
}

export async function getCatechism(str: string) {
  if (isCatechism(str)) {
    return catechisms[str];
  }

  throw new Error('404');
}

export async function getQuestion(
  catechism: CatechismData,
  question: string | number
) {
  const questionNumber = parseInt(`${question}`, 10);

  let questionData = catechism.data.find(
    ({ number }) => number === questionNumber
  );

  if (questionData) {
    return questionData;
  }

  throw new Error('404');
}
