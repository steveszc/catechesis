'use strict';

import { Buffer } from 'node:buffer';
import sharp from 'sharp';
import { catechisms } from '../app/data/catechisms/index.mjs';

import type { CatechismData } from '../app/data/types';

const toSvg = (title: string, number: string) => `
  <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="white"/>
  <rect width="100%" height="15%" fill="rgb(21 94 117)" y="85%" />
  <g>
    <text fill="rgb(203 213 225)" stroke-width="0" x="-10" y="60%" font-size="280" font-family="Serif" text-anchor="start" xml:space="preserve">Q</text>
    <text fill="rgb(100 116 139)" stroke-width="0" x="70%" y="60%" font-size="140" font-family="Serif" text-anchor="middle" xml:space="preserve">${number}</text>
    <text fill="#fff" stroke-width="0" x="50%" y="95%" font-size="24" width="100%" font-family="Sans" text-anchor="middle" xml:space="preserve">${title}</text>
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
  data.forEach(({ number }) => {
    svgs[`${String(id)}-${number}`] = toSvg(metadata.title, `${number}`);
  })
);

for (const svg in svgs) {
  const _svg = svgs[svg];
  if (_svg !== undefined) {
    await sharp(Buffer.from(_svg))
      .resize(300, 300)
      .png()
      .toFile(`./public/assets/og/${svg}.png`);
  }
}
