'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const { Webpack } = require('@embroider/webpack');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

function isProduction() {
  return EmberApp.env() === 'production';
}

async function urls({ visit }) {
  const urls = [];

  let page = await visit('/');
  if (page.statusCode === 200) {
    let html = await page.html();
    let dom = new JSDOM(html);

    // crawl the catechism list
    for (let aTag of [
      ...dom.window.document.querySelectorAll('[data-catechism-link]'),
    ]) {
      if (aTag.href) {
        urls.push(aTag.href);
      }
      // visit each catechism
      let page = await visit(aTag.href);
      if (page.statusCode === 200) {
        let html = await page.html();
        let dom = new JSDOM(html);

        // crawl the catechism's question list
        for (let aTag of [
          ...dom.window.document.querySelectorAll('[data-question-link]'),
        ]) {
          if (aTag.href) {
            urls.push(aTag.href);
          }
        }
      }
    }
  }

  return urls;
}

module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    prember: { urls },
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  const compiledApp = require('@embroider/compat').compatBuild(app, Webpack, {
    staticAddonTestSupportTrees: true,
    staticAddonTrees: true,
    staticHelpers: true,
    staticModifiers: true,
    staticComponents: true,
    packagerOptions: {
      publicAssetURL: '/', // publicAssetURL is similar to Ember CLI's asset fingerprint prepend option.
      cssLoaderOptions: {
        sourceMap: isProduction() === false,
        modules: {
          mode: 'global', // we set to global mode to avoid hashing tailwind classes
          localIdentName: isProduction()
            ? '[sha512:hash:base64:5]'
            : '[path][name]__[local]',
        },
      },
      webpackConfig: {
        module: {
          rules: [
            {
              // When webpack sees an import for a CSS files
              test: /\.css$/i,
              exclude: /node_modules/,
              use: [
                {
                  loader: 'postcss-loader',
                  options: {
                    sourceMap: isProduction() === false,
                    postcssOptions: {
                      config: './postcss.config.js',
                    },
                  },
                },
              ],
            },
          ],
        },
      },
    },
    extraPublicTrees: [],
  });

  return require('prember').prerender(app, compiledApp);
};
