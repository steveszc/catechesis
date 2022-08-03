import { htmlSafe } from '@ember/template';
import Controller from '@ember/controller';

import type { ScriptureRouteModel } from 'catechism/routes/catechism/question/scripture';

export default class ScriptureController extends Controller {
  declare model: ScriptureRouteModel;

  htmlSafe = htmlSafe;
}
