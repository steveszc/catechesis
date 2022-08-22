import { catechisms } from './catechisms';
import type { CatechismId, CatechismData } from './types';

export function isCatechismId(str: string): str is CatechismId {
  return Object.keys(catechisms).includes(str);
}

export async function getCatechism(id: string): Promise<CatechismData> {
  if (isCatechismId(id)) {
    const module = await import(`./catechisms/${id}`);

    return module.default;
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
