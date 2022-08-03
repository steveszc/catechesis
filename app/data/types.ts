import type { catechisms } from './catechisms';

export type Catechism = keyof typeof catechisms;

export interface CatechismData {
  metadata: {
    title: string;
    alternativeTitles?: string[];
    year?: string;
    authors: string[];
    location?: string;
    originalLanguage?: string;
    originStory?: string;
    sourceUrl?: string;
    sourceAttribution?: string;
    creedFormat: string;
  };
  data: CatechismItem[];
}

export interface CatechismItem {
  part?: number;
  number: number;
  question: string;
  questionWithProofs?: string;
  answer: string | { adult: string; children: string };
  answerWithProofs?: string;
  proofs?: { id: number; references: string }[];
  scripture?: Scripture[];
  commentary?: Commentary[];
  prayer?: string;
  audio?: Audio[];
  song?: string;
}

export interface Scripture {
  footnote?: string;
  verse: string;
  text: string;
}

export interface Commentary {
  author: string;
  body: string;
  source?: string;
  date?: string;
  link?: string;
}

export interface Audio {
  artist?: string;
  album?: string;
  year?: string;
  links: {
    platform: AudioPlatform;
    embed?: string;
    link?: string;
    id?: string;
  }[];
}

type AudioPlatform = 'spotify';
