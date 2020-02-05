/* eslint-disable max-classes-per-file */
import {
  interactor,
  scoped,
  collection,
  clickable,
  is,
  property,
} from '@bigtest/interactor';

import ConfirmationModalInteractor from '@folio/stripes-components/lib/ConfirmationModal/tests/interactor';
import { ENTITY_KEYS } from '@folio/data-import/src/utils/constants';

const buttonProperties = {
  click: clickable(),
  isFocused: is(':focus'),
};

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
  actionProfileButton = scoped(`#${ENTITY_KEYS.ACTION_PROFILES} [data-test-plugin-find-record-button]`, buttonProperties);
  jobProfileButton = scoped(`#${ENTITY_KEYS.JOB_PROFILES} [data-test-plugin-find-record-button]`, buttonProperties);
  matchProfileButton = scoped(`#${ENTITY_KEYS.MATCH_PROFILES} [data-test-plugin-find-record-button]`, buttonProperties);
  mappingProfileButton = scoped(`#${ENTITY_KEYS.MAPPING_PROFILES} [data-test-plugin-find-record-button]`, buttonProperties);

  modal = new PluginModalInteractor();

  whenLoaded() {
    return this.timeout(5000).when(() => this.modal.instances.isPresent);
  }
}

export default FindImportProfileInteractor;
