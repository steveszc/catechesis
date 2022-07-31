import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

import type { QuestionRouteModel } from 'catechism/routes/catechism/question';

export default class QuestionController extends Controller {
  declare model: QuestionRouteModel;

  @tracked isAnswerShown = false;

  @action
  showAnswer() {
    this.isAnswerShown = true;
  }
}
