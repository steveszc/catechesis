import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { getQuestion } from 'catechesis/data';

import type HeadDataService from 'catechesis/services/head-data';
import type { CatechismRouteModel } from 'catechesis/routes/catechism';
import type QuestionController from 'catechesis/controllers/catechism/question';

type Resolved<P> = P extends Promise<infer T> ? T : P;
export type QuestionRouteModel = Resolved<ReturnType<QuestionRoute['model']>>;

interface Params {
  question: string;
}

export default class QuestionRoute extends Route {
  @service declare headData: HeadDataService;

  async model({ question }: Params) {
    const catechism = this.modelFor('catechism') as CatechismRouteModel;
    const questionNumber = parseInt(question, 10);

    const questions = await Promise.allSettled([
      getQuestion(catechism, questionNumber - 1),
      getQuestion(catechism, questionNumber),
      getQuestion(catechism, questionNumber + 1),
    ]);

    const [previous, current, next] = questions.map((result) =>
      result.status === 'fulfilled' ? result.value : undefined
    );

    if (!current) throw new Error('404');

    return { catechism, previous, current, next };
  }

  afterModel(model: QuestionRouteModel) {
    this.headData.description = `Q${model.current.number} ${model.current.question}`;
    this.headData.ogTitle = model.current.question;
    this.headData.ogDescription = `Question ${model.current.number} of ${model.catechism.metadata.title}`;
  }

  resetController(controller: QuestionController) {
    controller.isAnswerShown = false;
  }
}
