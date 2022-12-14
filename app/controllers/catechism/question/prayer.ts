import { htmlSafe } from '@ember/template';
import Controller from '@ember/controller';

import type { PrayerRouteModel } from 'catechesis/routes/catechism/question/prayer';

export default class PrayerController extends Controller {
  declare model: PrayerRouteModel;
  queryParams = ['preserveScrollPosition'];

  htmlSafe = htmlSafe;
}
