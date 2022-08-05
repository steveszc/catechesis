import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class HeadDataService extends Service {
  @tracked description?: string;
  @tracked ogTitle?: string;
  @tracked ogDescription?: string;
  ogSite = 'Catechesis app';
}
