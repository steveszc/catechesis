import Route from '@ember/routing/route';

import type { CatechismRouteModel } from 'catechism/routes/catechism';

type Resolved<P> = P extends Promise<infer T> ? T : P;
export type CatechismIndexModel = Resolved<
  ReturnType<CatechismIndexRoute['model']>
>;

export default class CatechismIndexRoute extends Route {
  async model() {
    const catechism = this.modelFor('catechism') as CatechismRouteModel;

    return catechism.data;
  }
}
