import {
  describe,
  beforeEach,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';

import appInit from '../helpers/appInit';
import FindImportProfileInteractor from '../interactors/findImportProfileInteractor';

const ACTION_PROFILES_COUNT = 6;
const MATCH_PROFILES_COUNT = 10;
const JOB_PROFILES_COUNT = 3;

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

    // eslint-disable-next-line no-only-tests/no-only-tests
    describe.skip('Pick profiles button', () => {
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

      it('list should be sorted by the "name" column by default', () => {
        expect(findProfiles.modal.instances(0).name).to.be.equal('Name 0');
        expect(findProfiles.modal.instances(1).name).to.be.equal('Name 1');
        expect(findProfiles.modal.instances(2).name).to.be.equal('Name 2');
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
        return expect(findProfiles.modal.instances().length).to.be.equal(JOB_PROFILES_COUNT);
      });

      it('list should be sorted by the "name" column by default', () => {
        expect(findProfiles.modal.instances(0).name).to.be.equal('Approval plan records');
        expect(findProfiles.modal.instances(1).name).to.be.equal('Create orders from acquisitions');
        expect(findProfiles.modal.instances(2).name).to.be.equal('DDA discovery records');
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
        return expect(findProfiles.modal.instances().length).to.be.equal(MATCH_PROFILES_COUNT);
      });

      it('list should be sorted by the "name" column by default', () => {
        expect(findProfiles.modal.instances(0).name).to.be.equal('001 to Instance HRID');
        expect(findProfiles.modal.instances(1).name).to.be.equal('EDI regular');
        expect(findProfiles.modal.instances(2).name).to.be.equal('Invoice check');
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
        return expect(findProfiles.modal.instances().length).to.be.equal(5);
      });

      it('list should be sorted by the "name" column by default', () => {
        expect(findProfiles.modal.instances(0).name).to.be.equal('Name 0');
        expect(findProfiles.modal.instances(1).name).to.be.equal('Name 1');
        expect(findProfiles.modal.instances(2).name).to.be.equal('Name 2');
      });
    });
  });
});
