import {
  describe,
  beforeEach,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';

import appInit from '../helpers/appInit';
import FindImportProfileInteractor from '../interactors/findImportProfileInteractor';

const MORE_LINES_COUNT = 8;
const LESS_LINES_COUNT = 3;

describe('Find Data Import Profiles plugin with single select option', function () {
  const findProfiles = new FindImportProfileInteractor();

  describe('For action profiles', () => {
    appInit({
      isSingleSelect: true,
      scenarios: ['fetch-action-profiles-success', 'fetch-users', 'fetch-tags', 'tags-enabled'],
    });

    beforeEach(async function () {
      this.visit('/dummy');
      await findProfiles.whenLoaded();
    });

    describe('Pick profiles button', () => {
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
        return expect(findProfiles.modal.instances().length).to.be.equal(MORE_LINES_COUNT);
      });
    });
  });

  describe('For job profiles', () => {
    appInit({
      isSingleSelect: true,
      scenarios: ['fetch-job-profiles-success', 'fetch-users', 'fetch-tags', 'tags-enabled'],
    });

    beforeEach(async function () {
      this.visit('/dummy');
      await findProfiles.whenLoaded();
    });

    describe('Pick profiles button', () => {
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
        return expect(findProfiles.modal.instances().length).to.be.equal(LESS_LINES_COUNT);
      });
    });
  });

  describe('For match profiles', () => {
    appInit({
      isSingleSelect: true,
      scenarios: ['fetch-match-profiles-success', 'fetch-users', 'fetch-tags', 'tags-enabled'],
    });

    beforeEach(async function () {
      this.visit('/dummy');
      await findProfiles.whenLoaded();
    });

    describe('Pick profiles button', () => {
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
        return expect(findProfiles.modal.instances().length).to.be.equal(MORE_LINES_COUNT);
      });
    });
  });

  describe('For mapping profiles', () => {
    appInit({
      isSingleSelect: true,
      scenarios: ['fetch-mapping-profiles-success', 'fetch-users', 'fetch-tags', 'tags-enabled'],
    });

    beforeEach(async function () {
      this.visit('/dummy');
      await findProfiles.whenLoaded();
    });

    describe('Pick profiles button', () => {
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
        return expect(findProfiles.modal.instances().length).to.be.equal(LESS_LINES_COUNT);
      });
    });
  });
});
