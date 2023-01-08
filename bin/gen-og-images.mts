'use strict';

import { mkdir } from 'node:fs/promises';
import sharp from 'sharp';
const catechisms = {
  'westminster-shorter': 'Westminster Shorter Catechism',
  'westminster-longer': 'Westminster Larger Catechism',
  'for-young-children': 'Catechism For Young Children',
  heidelberg: 'Heidelberg Catechism',
  'new-city': 'New City Catechism',
  keachs: "Keach's Catechism",
  puritan: 'Puritan Catechism',
} as const;

import type { CatechismData } from '../app/data/types';

//const toSvg = (name: string, question: string) => `
const toSvg = (title: string, number: string, question: string) => `
  <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
  <g>
    <text fill="#000000" stroke-width="0" x="54.50705" y="211.0213" id="svg_1" font-size="24" font-family="Sans" text-anchor="start" xml:space="preserve" stroke="#000" transform="matrix(1.62629 0 0 1.62629 -53.9881 -12.2692)">${title}</text>
    <text fill="#000000" stroke-width="0" x="72.78178" y="101.06941" id="svg_2" font-size="24" font-family="Serif" text-anchor="start" xml:space="preserve" stroke="#000" transform="matrix(6.35437 0 0 6.35437 -423.642 -438.435)">Q. ${number}</text>
  </g>
  </svg>
`;

const imports = Object.keys(catechisms).map(
  async (key) => await import(`../app/data/catechisms/${key}.mts`)
);

let catechismData = (await Promise.all(imports)) as Array<
  Record<'default', CatechismData>
>;

const svgs: Record<string, string> = {};

catechismData.forEach(async ({ default: { id, data, metadata } }) =>
  data.forEach(({ number, question }) => {
    svgs[`${String(id)}-${number}`] = toSvg(
      metadata.title,
      `${number}`,
      question
    );
  })
);

for (const svg in svgs) {
  const _svg = svgs[svg];
  if (_svg !== undefined) {
    await sharp(Buffer.from(_svg))
      .resize(300, 300)
      .toFile(`./public/assets/og/${svg}.jpg`);
  }
}
