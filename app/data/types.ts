import type { catechisms } from './catechisms';

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

export interface CatechismItem {
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
