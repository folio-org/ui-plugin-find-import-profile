import {
  describe,
  beforeEach,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';

import appInit from '../helpers/appInit';
import FindImportProfileInteractor from '../interactors/findImportProfileInteractor';

const LINES_COUNT = 15;

describe('Find Data Import Profiles plugin with single select option', function () {
  const findProfiles = new FindImportProfileInteractor();

  appInit({ isSingleSelect: true });

  beforeEach(async function () {
    this.server.createList('jobProfile', LINES_COUNT);
    this.visit('/dummy');
    await findProfiles.whenLoaded();
  });

  describe('Pick profiles button', () => {
    it('should be rendered', function () {
      return expect(findProfiles.button.isPresent).to.be.true;
    });

    describe('click action', function () {
      beforeEach(async function () {
        await findProfiles.button.click();
      });

      it('should open a modal', function () {
        return expect(findProfiles.modal.isPresent).to.be.true;
      });
    });
  });

  describe('modal list', function () {
    beforeEach(async function () {
      await findProfiles.button.click();
    });

    it('should return a set of results', function () {
      return expect(findProfiles.modal.instances().length).to.be.equal(LINES_COUNT);
    });

    describe('select a line (click on it)', function () {
      beforeEach(async function () {
        await findProfiles.modal.instances(1).click();
      });

      it('modal is closed', function () {
        return expect(findProfiles.modal.isPresent).to.be.false;
      });
    });
  });
});
