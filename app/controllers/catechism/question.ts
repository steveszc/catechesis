import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

import type { QuestionRouteModel } from 'catechesis/routes/catechism/question';
import type SettingsService from 'catechesis/services/settings';

export default class QuestionController extends Controller {
  declare model: QuestionRouteModel;

  @service declare settings: SettingsService;

  get title() {
    if (this.model.current) {
      return `Q${this.model.current.number}`;
    } else {
      return this.model.catechism.metadata.title;
    }
  }

  @tracked isAnswerShown = false;

  @action
  showAnswer() {
    this.isAnswerShown = true;
  }
}
