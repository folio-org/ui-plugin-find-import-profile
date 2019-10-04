import {
  describe,
  beforeEach,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/helpers';
import FindImportProfileInteractor from '../interactors/findImportProfileInteractor';

const LINES_COUNT = 15;

describe('Find Data Import Profiles plugin with single select option', function () {
  const findProfiles = new FindImportProfileInteractor();

  setupApplication({ isSingleSelect: true });

  beforeEach(async function () {
    this.server.createList('line', LINES_COUNT);
    this.visit('/dummy');
    await findProfiles.whenLoaded();
  });

  describe('Pick profiles button', () => {
    it('should be rendered', function () {
      expect(findProfiles.button.isPresent).to.be.true;
    });

    describe('click action', function () {
      beforeEach(async function () {
        await findProfiles.button.click();
      });

      it('should open a modal', function () {
        expect(findProfiles.modal.isPresent).to.be.true;
      });
    });
  });

  describe('modal list', function () {
    beforeEach(async function () {
      await findProfiles.button.click();
    });

    it('should return a set of results', function () {
      expect(findProfiles.modal.instances().length).to.be.equal(LINES_COUNT);
    });

    describe('select a line (click on it)', function () {
      beforeEach(async function () {
        await findProfiles.modal.instances(1).click();
      });

      it('modal is closed', function () {
        expect(findProfiles.modal.isPresent).to.be.false;
      });
    });
  });
});
