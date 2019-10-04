import {
  describe,
  beforeEach,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/helpers';
import FindImportProfileInteractor from '../interactors/findImportProfileInteractor';

const LINES_COUNT = 15;

describe('Find PO Lines plugin', function () {
  const findProfiles = new FindImportProfileInteractor();

  setupApplication();

  beforeEach(async function () {
    this.server.createList('line', LINES_COUNT);
    this.server.create('vendor');
    this.server.create('location');
    this.server.create('fund');
    this.visit('/dummy');
    await findProfiles.whenLoaded();
  });

  describe('Find order lines button', () => {
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

    it('should display disabled save button', function () {
      expect(findProfiles.modal.save.isDisabled).to.be.true;
    });

    describe('select a line', function () {
      beforeEach(async function () {
        await findProfiles.modal.instances(1).selectLine();
      });

      it('should enable Save button', function () {
        expect(findProfiles.modal.save.isDisabled).to.be.false;
      });
    });

    describe('select all', function () {
      beforeEach(async function () {
        await findProfiles.modal.selectAll.click();
      });

      it('should enable Save button', function () {
        expect(findProfiles.modal.save.isDisabled).to.be.false;
      });
    });
  });
});
