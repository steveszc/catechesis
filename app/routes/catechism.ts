import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { getCatechism } from 'catechesis/data';

import type { CatechismId } from 'catechesis/data/types';
import type HeadDataService from 'catechesis/services/head-data';

type Resolved<P> = P extends Promise<infer T> ? T : P;
export type CatechismRouteModel = Resolved<ReturnType<CatechismRoute['model']>>;
export interface CatechismRouteParams {
  catechism: CatechismId;
}
export default class CatechismRoute extends Route {
  @service declare headData: HeadDataService;

  model({ catechism }: CatechismRouteParams) {
    return getCatechism(catechism);
  }

  afterModel(model: CatechismRouteModel) {
    this.headData.description = `
${model.metadata.title}
Author: ${model.metadata.authors.join(', ')}
Published: ${model.metadata.year} - ${model.metadata.location}
${model.metadata.sourceAttribution}`;
  }
}
