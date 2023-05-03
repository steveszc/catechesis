import Ember from 'ember';
import Service from '@ember/service';
import stored from 'catechesis/decorators/stored';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import type { CatechismId, ConfessionId } from 'catechesis/data/types';
import type RouterService from '@ember/routing/router-service';
import type Transition from '@ember/routing/-private/transition';

export default class SettingsService extends Service {
  @service declare fastboot: { isFastBoot: boolean };
  @service declare router: RouterService;

  @stored alwaysShowAnswers = false;
  @stored pickUpWhereYouLeftOff = true;
  @stored lastQuestion?: { catechism: CatechismId; question: string };
  @stored lastChapter?: { confession: ConfessionId; chapter: string };

  @action doPickupWhereYouLeftOff(transition: Transition) {
    if (Ember.testing || this.fastboot.isFastBoot) return;

    let toCatechism = transition.to.find(({ name }) => name === 'catechism')
      ?.params?.['catechism'];
    let toQuestion = transition.to.find(
      ({ name }) => name === 'catechism.question'
    )?.params?.['question'];

    let lastQuestion = this.lastQuestion;
    let lastCatechism = lastQuestion?.catechism;
    let lastQuestionNumber = lastQuestion?.question;
    let isTransitionToLastQuestion =
      lastQuestion &&
      lastCatechism &&
      lastQuestionNumber &&
      toCatechism &&
      toCatechism === lastCatechism &&
      toQuestion &&
      toQuestion === lastQuestionNumber;
    let shouldTransitionToLastQuestion =
      this.pickUpWhereYouLeftOff && !isTransitionToLastQuestion;

    if (shouldTransitionToLastQuestion && lastCatechism && lastQuestionNumber) {
      this.router.replaceWith(
        'catechism.question',
        lastCatechism,
        lastQuestionNumber
      );
    }
  }
}
