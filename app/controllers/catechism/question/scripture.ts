import { htmlSafe } from '@ember/template';
import Controller from '@ember/controller';

import type { ScriptureRouteModel } from 'catechesis/routes/catechism/question/scripture';

export default class ScriptureController extends Controller {
  declare model: ScriptureRouteModel;
  queryParams = ['preserveScrollPosition'];

  htmlSafe = htmlSafe;
}
