import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { getConfessionChapter } from 'catechesis/data';

import type HeadDataService from 'catechesis/services/head-data';
import type {
  ConfessionRouteModel,
  ConfessionRouteParams,
} from 'catechesis/routes/confession';
import type SettingsService from 'catechesis/services/settings';

type Resolved<P> = P extends Promise<infer T> ? T : P;
export type ChapterRouteModel = Resolved<ReturnType<ChapterRoute['model']>>;

interface Params {
  chapter: string;
}

export default class ChapterRoute extends Route {
  @service declare headData: HeadDataService;
  @service declare settings: SettingsService;

  async model({ chapter }: Params) {
    const confessionId = (this.paramsFor('confession') as ConfessionRouteParams)
      .confession;
    const confession = this.modelFor('confession') as ConfessionRouteModel;
    const chapterNumber = parseInt(chapter, 10);

    const chapters = await Promise.allSettled([
      getConfessionChapter(confession, chapterNumber - 1),
      getConfessionChapter(confession, chapterNumber),
      getConfessionChapter(confession, chapterNumber + 1),
    ]);

    const [previous, current, next] = chapters.map((result) =>
      result.status === 'fulfilled' ? result.value : undefined
    );

    if (!current) throw new Error('404');

    this.settings.lastChapter = { confession: confessionId, chapter };

    return { confession, previous, current, next };
  }

  afterModel(model: ChapterRouteModel) {
    this.headData.description = `Q${model.current.chapter} ${model.current.title}`;
    this.headData.ogTitle = model.current.title;
    this.headData.ogDescription = `Chapter ${model.current.chapter} of ${model.confession.metadata.title}`;
  }
}
