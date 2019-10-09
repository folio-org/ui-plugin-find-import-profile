import {
  describe,
  beforeEach,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';

import appInit from '../helpers/appInit';
import FindImportProfileInteractor from '../interactors/findImportProfileInteractor';

const LINES_COUNT = 15;

describe('Find Import Profiles plugin', function () {
  const findProfiles = new FindImportProfileInteractor();

  appInit();

  beforeEach(async function () {
    this.server.createList('jobProfile', LINES_COUNT);
    this.visit('/dummy');
    await findProfiles.whenLoaded();
  });

  describe.only('Pick Profiles button', () => {
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

    it('should display disabled save button', function () {
      return expect(findProfiles.modal.save.isDisabled).to.be.true;
    });

    describe('select a line', function () {
      beforeEach(async function () {
        await findProfiles.modal.instances(1).selectLine();
      });

      it('should enable Save button', function () {
        return expect(findProfiles.modal.save.isDisabled).to.be.false;
      });
    });

    describe('select all', function () {
      beforeEach(async function () {
        await findProfiles.modal.selectAll.click();
      });

      it('should enable Save button', function () {
        return expect(findProfiles.modal.save.isDisabled).to.be.false;
      });
    });
  });
});
