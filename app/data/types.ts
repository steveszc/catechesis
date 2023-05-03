import type { catechisms } from './catechisms';
import type { confessions } from './confessions';

export type CatechismId = keyof typeof catechisms;
export type ConfessionId = keyof typeof confessions;

interface Metadata {
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
}

export interface CatechismData {
  id: CatechismId;
  metadata: Metadata;
  data: CatechismItem[];
}

export interface ConfessionData {
  id: ConfessionId;
  metadata: Metadata;
  data: ConfessionChapter[];
}

export interface CatechismItem {
  part?: number;
  number: number;
  question: string;
  questionWithProofs?: string;
  answer: string | { adult: string; children: string };
  answerWithProofs?: string;
  proofs?: { id: number; references: string }[];
  commentary?: Commentary[];
  prayer?: string;
  audio?: Audio[];
  song?: string;
}

export interface Scripture {
  verse: string;
  text?: string;
  footnote?: string;
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

export interface ConfessionChapter {
  chapter: string;
  title: string;
  sections: {
    section: string;
    content: string;
    contentWithProofs?: string;
    proofs?: { id: string | number; references: string[] }[];
  }[];
}
