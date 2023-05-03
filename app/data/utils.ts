import { catechisms } from './catechisms';
import { confessions } from './confessions';
import type {
  CatechismId,
  CatechismData,
  ConfessionData,
  ConfessionId,
} from './types';

export function isCatechismId(str: string): str is CatechismId {
  return Object.keys(catechisms).includes(str);
}

export function isConfessionId(str: string): str is ConfessionId {
  return Object.keys(confessions).includes(str);
}

export async function getCatechism(id: string): Promise<CatechismData> {
  if (isCatechismId(id)) {
    const module = await import(`./catechisms/${id}`);

    return module.default;
  }

  throw new Error('404');
}

export async function getConfession(id: string): Promise<ConfessionData> {
  if (isConfessionId(id)) {
    const module = await import(`./confessions/${id}`);

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

export async function getConfessionChapter(
  confession: ConfessionData,
  chapterNumber: number
) {
  let chapterData = confession.data.find(
    ({ chapter }) => chapter === `${chapterNumber}`
  );

  if (chapterData) {
    return chapterData;
  }

  throw new Error('404');
}
