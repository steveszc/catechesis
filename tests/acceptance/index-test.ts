import { module, test } from 'qunit';
import { click, visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | index', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /', async function (assert) {
    await visit('/');

    assert.strictEqual(currentURL(), '/');
    assert
      .dom('header h1')
      .hasText('Catechesis', 'Catechesis heading is shown in top bar');

    assert
      .dom('section h2')
      .hasText('Welcome to Catechesis', 'home page shows intro');

    assert
      .dom('[data-catechism-link]')
      .exists({ count: 7 }, 'Shows 7 catechism links');
  });

  test('Navigating to a Catechism', async function (assert) {
    await visit('/');

    await click('[data-catechism-link]');

    assert.strictEqual(
      currentURL(),
      '/westminster-shorter',
      'Clicking the first catechism link navigates to Westminster shorter'
    );
    assert
      .dom('section h2')
      .hasText('Westminster Shorter Catechism', 'Shows Catechism title');
    assert
      .dom('[data-question-link]')
      .exists({ count: 107 }, 'Shows 107 Question links');
  });

  test('Navigating to a Catechism Question', async function (assert) {
    await visit('/westminster-shorter');

    await click('[data-question-link]');

    assert.strictEqual(
      currentURL(),
      '/westminster-shorter/1',
      'Clicking the first catechism link navigates to Westminster shorter'
    );
    assert
      .dom('section article h1')
      .hasText('Question 1', 'Shows Question heading');

    assert
      .dom('[data-test="question"]')
      .hasText('What is the chief end of man?', 'Shows Question text');

    assert
      .dom('[data-test="show-answer"]')
      .hasText('Show answer', 'Has a Show Answer button');

    await click('[data-test="show-answer"]');

    assert
      .dom('[data-test="show-answer"]')
      .doesNotExist('Show answer button disappears');

    assert
      .dom('[data-test="answer"]')
      .hasText(
        "Man's chief end is to glorify God,1 and to enjoy him forever.2",
        'Shows Question text'
      );
  });
});
