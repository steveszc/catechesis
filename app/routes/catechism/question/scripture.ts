import Route from '@ember/routing/route';
import fetch from 'fetch';
import { inject as service } from '@ember/service';

import type { CatechismItem } from 'catechesis/data';
import type { QuestionRouteModel } from 'catechesis/routes/catechism/question';

type Resolved<P> = P extends Promise<infer T> ? T : P;
export type ScriptureRouteModel = Resolved<ReturnType<ScriptureRoute['model']>>;

const isPromiseFulfilled = (
  promiseSettledResult?: PromiseSettledResult<any>
): promiseSettledResult is PromiseFulfilledResult<any> => {
  return promiseSettledResult?.status === 'fulfilled';
};

const proofsToScriptures = (
  proofs?: CatechismItem['proofs']
): CatechismItem['scripture'] => {
  return proofs?.flatMap(({ references, id }) =>
    references.split('; ').map((verse) => ({ verse, footnote: `${id}` }))
  );
};

const esvUrlForVerse = (verse: string) => {
  const normalizedVerse = verse.replace('. ', ' ');
  const url = '/api/esv/v3/passage/text/';
  const params = new URLSearchParams({
    q: normalizedVerse,
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

    if (this.fastboot.isFastBoot) return scripture;

    const loadedVerses = await Promise.allSettled(
      scripture.map(async ({ verse, text }) => {
        if (text) {
          return text;
        } else {
          let response = await fetch(esvUrlForVerse(verse));
          let { passages, detail } = await response.json();
          if (!response.ok) {
            return `Could not load verse: ${detail}`;
          }
          return (
            passages.map((p: string) => p.replace('(ESV)', '')).join('\n') +
            '(ESV)'
          );
        }
      })
    );

    const scriptureWithLoadedVerses = scripture.map((item, i) => {
      let loadedVerse = loadedVerses[i];
      return {
        ...item,
        text: isPromiseFulfilled(loadedVerse)
          ? loadedVerse.value
          : loadedVerse?.reason ?? '',
      };
    });

    return scriptureWithLoadedVerses;
  }
}
