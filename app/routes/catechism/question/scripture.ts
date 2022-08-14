import Route from '@ember/routing/route';
import fetch from 'fetch';
import { inject as service } from '@ember/service';

import type { CatechismItem } from 'catechesis/data';
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

const proofsToScriptures = (
  proofs?: CatechismItem['proofs']
): CatechismItem['scripture'] => {
  return proofs?.flatMap(({ references, id }) =>
    references.split('; ').map((verse) => ({ verse, footnote: `${id}` }))
  );
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

export default class ScriptureRoute extends Route {
  @service declare fastboot: { isFastBoot: boolean };

  async model() {
    const questionModel = this.modelFor(
      'catechism.question'
    ) as QuestionRouteModel;

    const scripture =
      questionModel?.current?.scripture ??
      proofsToScriptures(questionModel?.current?.proofs) ??
      [];

    const hasTexts = scripture.every(({ text }) => text);

    if (this.fastboot.isFastBoot || hasTexts) return scripture;

    const verseQuery = scripture.map(({ verse }) => verse).join(';');

    let response = await fetch(esvUrlForVerse(verseQuery));
    let { passages, passage_meta, detail } =
      (await response.json()) as EsvApiPassageResponse;
    if (!response.ok) {
      return `Could not load verse: ${detail}`;
    }
    const verses = passage_meta.map(
      ({ canonical }: { canonical: string }, i: number) => ({
        verse: canonical,
        text: passages[i],
      })
    );

    return verses;
  }
}
