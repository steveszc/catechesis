import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

import type { QuestionRouteModel } from 'catechesis/routes/catechism/question';

export default class QuestionController extends Controller {
  declare model: QuestionRouteModel;

  get title() {
    if (this.model.current) {
      return `Q${this.model.current.number}. ${this.model.current.question}`;
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
