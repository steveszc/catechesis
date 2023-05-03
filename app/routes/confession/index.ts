import Route from '@ember/routing/route';

import type { ConfessionRouteModel } from 'catechesis/routes/confession';

type Resolved<P> = P extends Promise<infer T> ? T : P;
export type ConfessionIndexModel = Resolved<
  ReturnType<ConfessionIndexRoute['model']>
>;

export default class ConfessionIndexRoute extends Route {
  async model() {
    const confession = this.modelFor('confession') as ConfessionRouteModel;

    return confession;
  }
}
