import Route from '@ember/routing/route';

import type { QuestionRouteModel } from 'catechesis/routes/catechism/question';

type Resolved<P> = P extends Promise<infer T> ? T : P;
export type PrayerRouteModel = Resolved<ReturnType<PrayerRoute['model']>>;

export default class PrayerRoute extends Route {
  async model() {
    const questionModel = this.modelFor(
      'catechism.question'
    ) as QuestionRouteModel;

    return questionModel?.current?.prayer;
  }
}
