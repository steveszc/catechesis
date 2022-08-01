import Route from '@ember/routing/route';

import type { QuestionRouteModel } from 'catechism/routes/catechism/question';

type Resolved<P> = P extends Promise<infer T> ? T : P;
export type CommentaryModel = Resolved<ReturnType<CommentaryRoute['model']>>;

export default class CommentaryRoute extends Route {
  async model() {
    const questionModel = this.modelFor(
      'catechism.question'
    ) as QuestionRouteModel;

    return questionModel?.current?.commentary;
  }
}
