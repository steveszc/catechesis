import { htmlSafe } from '@ember/template';
import Controller from '@ember/controller';

import type { PrayerRouteModel } from 'catechism/routes/catechism/question/prayer';

export default class PrayerController extends Controller {
  declare model: PrayerRouteModel;

  htmlSafe = htmlSafe;
}
