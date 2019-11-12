import {
  interactor,
  scoped,
  collection,
  clickable,
  is,
  property,
} from '@bigtest/interactor';

import ConfirmationModalInteractor from '@folio/stripes-components/lib/ConfirmationModal/tests/interactor';

@interactor
class PluginModalInteractor {
  static defaultScope = '[data-test-find-records-modal]';

  instances = collection('[role=group] [role=row]', {
    click: clickable(),
    selectLine: clickable('input[type="checkbox"]'),
  });

  save = scoped('[data-test-find-records-modal-save]', {
    click: clickable(),
    isDisabled: property('disabled'),
  });

  selectAll = scoped('[data-test-find-records-modal-select-all]', { click: clickable() });
  confirmationModal = new ConfirmationModalInteractor('#relink-profile');
}

@interactor
class FindImportProfileInteractor {
  button = scoped('[data-test-plugin-find-record-button]', {
    click: clickable(),
    isFocused: is(':focus'),
  });

  modal = new PluginModalInteractor();

  whenLoaded() {
    return this.timeout(5000).when(() => this.modal.instances.isPresent);
  }
}

export default FindImportProfileInteractor;
