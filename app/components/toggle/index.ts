import Component from '@glimmer/component';
import { action } from '@ember/object';

interface ToggleSignature {
  Element: HTMLElement;
  Args: {
    label: string;
    isChecked: boolean;
    name?: string;
    onChange?: (event: Event) => void;
  };
  Blocks: {};
}

export default class ToggleComponent extends Component<ToggleSignature> {
  @action onChange(event: Event) {
    this.args?.onChange?.(event);
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    Toggle: typeof ToggleComponent;
  }
}
