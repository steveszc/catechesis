import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { getConfession } from 'catechesis/data';

import type { ConfessionId } from 'catechesis/data/types';
import type HeadDataService from 'catechesis/services/head-data';

type Resolved<P> = P extends Promise<infer T> ? T : P;
export type ConfessionRouteModel = Resolved<
  ReturnType<ConfessionRoute['model']>
>;
export interface ConfessionRouteParams {
  confession: ConfessionId;
}
export default class ConfessionRoute extends Route {
  @service declare headData: HeadDataService;

  model({ confession }: ConfessionRouteParams) {
    return getConfession(confession);
  }

  afterModel(model: ConfessionRouteModel) {
    this.headData.description = `
${model.metadata.title}
Author: ${model.metadata.authors.join(', ')}
Published: ${model.metadata.year} - ${model.metadata.location}
${model.metadata.sourceAttribution}`;
  }
}
