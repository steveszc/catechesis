import Route from '@ember/routing/route';

import type { CatechismItem } from 'catechism/data';
import type { QuestionRouteModel } from 'catechism/routes/catechism/question';

type Resolved<P> = P extends Promise<infer T> ? T : P;
export type ScriptureModel = Resolved<ReturnType<ScriptureRoute['model']>>;

const proofsToScriptures = (
  proofs?: CatechismItem['proofs']
): CatechismItem['scripture'] => {
  return proofs?.flatMap(({ references, id }) =>
    references
      .split('; ')
      .map((verse) => ({ verse, text: '', footnote: `${id}` }))
  );
};

export default class ScriptureRoute extends Route {
  async model() {
    const questionModel = this.modelFor(
      'catechism.question'
    ) as QuestionRouteModel;

    return (
      questionModel?.current?.scripture ??
      proofsToScriptures(questionModel?.current?.proofs)
    );
  }
}
