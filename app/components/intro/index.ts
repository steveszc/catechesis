import templateOnlyComponent from '@ember/component/template-only';

interface IntroSignature {
  Element: HTMLElement;
  Args: {};
}

const IntroComponent = templateOnlyComponent<IntroSignature>();

export default IntroComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    Intro: typeof IntroComponent;
  }
}
