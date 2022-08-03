import Route from '@ember/routing/route';
import { getCatechism } from 'catechesis/data';

type Resolved<P> = P extends Promise<infer T> ? T : P;
export type CatechismRouteModel = Resolved<ReturnType<CatechismRoute['model']>>;
interface Params {
  catechism: string;
}
export default class CatechismRoute extends Route {
  model({ catechism }: Params) {
    return getCatechism(catechism);
  }
}
