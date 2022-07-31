import { WestminsterShorter } from 'catechism/data/westminster-shorter';

export const catechisms = {
  'westminster-shorter': WestminsterShorter,
} as const;

export function isCatechism(str: string): str is Catechism {
  return Object.keys(catechisms).includes(str);
}

export async function getCatechism(str: string) {
  if (isCatechism(str)) {
    return catechisms[str];
  }

  throw new Error('404');
}

export type Catechism = keyof typeof catechisms;

export interface CatechismData {
  metadata: {
    title: string;
    year?: string;
    authors: string[];
    location?: string;
    originalLanguage?: string;
    originStory?: string;
    sourceUrl?: string;
    sourceAttribution?: string;
  };
  data: CatechismItem[];
}

interface CatechismItem {
  number: number;
  question: string;
  answer: string;
  audio?: CatechismAudio[];
}

interface CatechismAudio {
  artist?: string;
  album?: string;
  year?: string;
  links: {
    platform: AudioPlatform;
    embed: string;
    link: string;
  }[];
}

type AudioPlatform = 'spotify';
