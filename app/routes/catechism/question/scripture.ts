import Route from '@ember/routing/route';
import fetch from 'fetch';
import { inject as service } from '@ember/service';

import type { CatechismItem, Scripture } from 'catechesis/data/types';
import type { QuestionRouteModel } from 'catechesis/routes/catechism/question';

interface EsvApiPassageResponse {
  detail?: string; // only if the response is no okay
  query: string;
  canonical: string;
  passage_meta: Array<{ canonical: string }>;
  passages: string[];
}

type Resolved<P> = P extends Promise<infer T> ? T : P;
export type ScriptureRouteModel = Resolved<ReturnType<ScriptureRoute['model']>>;

const proofsToScriptures = (proofs?: CatechismItem['proofs']): Scripture[] => {
  return Array.isArray(proofs)
    ? proofs.flatMap(({ references, id }) =>
        references
          .split(';')
          .map((verse) => ({
            verse: verse.trim(),
            text: '',
            footnote: `${id}`,
          }))
          .map((scripture) => {
            let [chapter, verses] = scripture.verse.split(':');
            let verseNums = verses?.split(',').map((num) => num.trim());
            let scriptures = verseNums?.map((num) => ({
              ...scripture,
              verse: `${chapter}:${num}`,
            }));
            return scriptures || scripture;
          })
          .flat()
      )
    : [];
};

const esvUrlForVerse = (q: string) => {
  const url = '/api/esv/v3/passage/text/';
  const params = new URLSearchParams({
    q,
    'include-passage-references': 'false',
    'include-verse-numbers': 'false',
    'include-footnotes': 'false',
  });

  return `${url}?${params.toString()}`;
};

const scripturesToQuery = (scriptures: Scripture[] = []) => {
  return scriptures.map(({ verse }: Scripture) => verse).join(';');
};

export default class ScriptureRoute extends Route {
  @service declare fastboot: { isFastBoot: boolean };

  async model() {
    const questionModel = this.modelFor(
      'catechism.question'
    ) as QuestionRouteModel;

    const scripture = proofsToScriptures(questionModel.current.proofs);

    if (this.fastboot.isFastBoot || scripture.length === 0) return scripture;

    const verseQuery = scripturesToQuery(scripture);

    let response = await fetch(esvUrlForVerse(verseQuery));
    let { passages, passage_meta, detail } =
      (await response.json()) as EsvApiPassageResponse;
    if (!response.ok) {
      return [
        {
          verse: 'error',
          text: `Could not load verse: ${detail}`,
        } as Scripture,
      ];
    }
    const verses = passage_meta.map(
      ({ canonical }: { canonical: string }, i: number) => ({
        verse: canonical,
        text: passages[i] ?? '',
        footnote: scripture[i]?.footnote,
      })
    );

    if (verses.length !== scripture.length) {
      return [
        {
          verse: 'error',
          text: 'Verse mismatch',
        } as Scripture,
      ];
    }

    return verses;
  }
}
