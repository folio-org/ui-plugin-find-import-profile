import {
  describe,
  beforeEach,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';

import appInit from '../helpers/appInit';
import FindImportProfileInteractor from '../interactors/findImportProfileInteractor';

const ACTION_PROFILES_COUNT = 8;
const MATCH_PROFILES_COUNT = 10;
const JOB_PROFILES_COUNT = 3;

describe('Find Import Profiles plugin', function () {
  const findProfiles = new FindImportProfileInteractor();

  describe('For action profile', () => {
    appInit({ scenarios: ['fetch-action-profiles-success', 'fetch-users', 'fetch-tags', 'tags-enabled'] });

    beforeEach(async function () {
      this.visit('/dummy');
      await findProfiles.whenLoaded();
    });

    describe('Pick Profiles button', () => {
      it('should be rendered', function () {
        return expect(findProfiles.actionProfileButton.isPresent).to.be.true;
      });

      describe('click action', function () {
        beforeEach(async function () {
          await findProfiles.actionProfileButton.click();
        });

        it('should open a modal', function () {
          return expect(findProfiles.modal.isPresent).to.be.true;
        });
      });
    });

    describe('modal list', function () {
      beforeEach(async function () {
        await findProfiles.actionProfileButton.click();
      });

      it('should return a set of results', function () {
        return expect(findProfiles.modal.instances().length).to.be.equal(ACTION_PROFILES_COUNT);
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

  describe('For job profile', () => {
    appInit({ scenarios: ['fetch-job-profiles-success', 'fetch-users', 'fetch-tags', 'tags-enabled'] });

    beforeEach(async function () {
      this.visit('/dummy');
      await findProfiles.whenLoaded();
    });

    describe('Pick Profiles button', () => {
      it('should be rendered', function () {
        return expect(findProfiles.jobProfileButton.isPresent).to.be.true;
      });

      describe('click action', function () {
        beforeEach(async function () {
          await findProfiles.jobProfileButton.click();
        });

        it('should open a modal', function () {
          return expect(findProfiles.modal.isPresent).to.be.true;
        });
      });
    });

    describe('modal list', function () {
      beforeEach(async function () {
        await findProfiles.jobProfileButton.click();
      });

      it('should return a set of results', function () {
        return expect(findProfiles.modal.instances().length).to.be.equal(JOB_PROFILES_COUNT);
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

  describe('For match profile', () => {
    appInit({ scenarios: ['fetch-match-profiles-success', 'fetch-users', 'fetch-tags', 'tags-enabled'] });

    beforeEach(async function () {
      this.visit('/dummy');
      await findProfiles.whenLoaded();
    });

    describe('Pick Profiles button', () => {
      it('should be rendered', function () {
        return expect(findProfiles.matchProfileButton.isPresent).to.be.true;
      });

      describe('click action', function () {
        beforeEach(async function () {
          await findProfiles.matchProfileButton.click();
        });

        it('should open a modal', function () {
          return expect(findProfiles.modal.isPresent).to.be.true;
        });
      });
    });

    describe('modal list', function () {
      beforeEach(async function () {
        await findProfiles.matchProfileButton.click();
      });

      it('should return a set of results', function () {
        return expect(findProfiles.modal.instances().length).to.be.equal(MATCH_PROFILES_COUNT);
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

  describe('For mapping profile', () => {
    appInit({ scenarios: ['fetch-mapping-profiles-success', 'fetch-users', 'fetch-tags', 'tags-enabled'] });

    beforeEach(async function () {
      this.visit('/dummy');
      await findProfiles.whenLoaded();
    });

    describe('Pick Profiles button', () => {
      it('should be rendered', function () {
        return expect(findProfiles.mappingProfileButton.isPresent).to.be.true;
      });

      describe('click action', function () {
        beforeEach(async function () {
          await findProfiles.mappingProfileButton.click();
        });

        it('should open a modal', function () {
          return expect(findProfiles.modal.isPresent).to.be.true;
        });
      });
    });

    describe('modal list', function () {
      beforeEach(async function () {
        await findProfiles.mappingProfileButton.click();
      });

      it('should return a set of results', function () {
        return expect(findProfiles.modal.instances().length).to.be.equal(5);
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
});
