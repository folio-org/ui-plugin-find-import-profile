import {
  describe,
  beforeEach,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';

import appInit from '../helpers/appInit';
import FindImportProfileInteractor from '../interactors/findImportProfileInteractor';

describe('Relink confirmation modal', function () {
  const findProfiles = new FindImportProfileInteractor();

  describe('For action profiles', () => {
    describe('In single select mode', () => {
      appInit({
        isSingleSelect: true,
        scenarios: ['fetch-action-profiles-success', 'fetch-users', 'fetch-tags', 'tags-enabled'],
      });

      beforeEach(async function () {
        this.visit('/dummy');
        await findProfiles.whenLoaded();
        await findProfiles.actionProfileButton.click();
      });

      describe('when select a line (click on it)', () => {
        beforeEach(async function () {
          await findProfiles.modal.instances(1).click();
        });

        it('then confirmation modal appears', function () {
          return expect(findProfiles.modal.confirmationModal.isPresent).to.be.true;
        });

        describe('when click on "Cancel" button', () => {
          beforeEach(async function () {
            await findProfiles.modal.confirmationModal.cancelButton.click();
          });

          it('then close the confirmation modal', function () {
            return expect(findProfiles.modal.confirmationModal.isPresent).to.be.false;
          });

          it('and return to the profile component search', function () {
            return expect(findProfiles.modal.isPresent).to.be.true;
          });
        });

        describe('when click on "Relink" button', () => {
          beforeEach(async function () {
            await findProfiles.modal.confirmationModal.confirmButton.click();
          });

          it('then close the confirmation modal', function () {
            return expect(findProfiles.modal.confirmationModal.isPresent).to.be.false;
          });

          it('and close the profile component search', function () {
            return expect(findProfiles.modal.isPresent).to.be.false;
          });
        });
      });
    });

    describe('In multi select mode', () => {
      appInit({ scenarios: ['fetch-action-profiles-success', 'fetch-users', 'fetch-tags', 'tags-enabled'] });

      beforeEach(async function () {
        this.visit('/dummy');
        await findProfiles.whenLoaded();
        await findProfiles.actionProfileButton.click();
      });

      describe('when select a several profiles', () => {
        beforeEach(async function () {
          await findProfiles.modal.instances(3).selectLine();
          await findProfiles.modal.instances(5).selectLine();
        });

        describe('and click on the "Save" button', () => {
          beforeEach(async function () {
            await findProfiles.modal.save.click();
          });

          it('then confirmation modal appears', function () {
            return expect(findProfiles.modal.confirmationModal.isPresent).to.be.true;
          });

          describe('when click on "Cancel" button', () => {
            beforeEach(async function () {
              await findProfiles.modal.confirmationModal.cancelButton.click();
            });

            it('then close the confirmation modal', function () {
              return expect(findProfiles.modal.confirmationModal.isPresent).to.be.false;
            });

            it('and return to the profile component search', function () {
              return expect(findProfiles.modal.isPresent).to.be.true;
            });
          });

          describe('when click on "Relink" button', () => {
            beforeEach(async function () {
              await findProfiles.modal.confirmationModal.confirmButton.click();
            });

            it('then close the confirmation modal', function () {
              return expect(findProfiles.modal.confirmationModal.isPresent).to.be.false;
            });

            it('and close the profile component search', function () {
              return expect(findProfiles.modal.isPresent).to.be.false;
            });
          });
        });
      });
    });
  });

  describe('For job profiles', () => {
    describe('In single select mode', () => {
      appInit({
        isSingleSelect: true,
        scenarios: ['fetch-job-profiles-success', 'fetch-users', 'fetch-tags', 'tags-enabled'],
      });

      beforeEach(async function () {
        this.visit('/dummy');
        await findProfiles.whenLoaded();
        await findProfiles.jobProfileButton.click();
      });

      describe('when select a line (click on it)', () => {
        beforeEach(async function () {
          await findProfiles.modal.instances(1).click();
        });

        it('then confirmation modal does not appears', function () {
          return expect(findProfiles.modal.confirmationModal.isPresent).to.be.false;
        });
      });
    });

    describe('In multi select mode', () => {
      appInit({ scenarios: ['fetch-job-profiles-success', 'fetch-users', 'fetch-tags', 'tags-enabled'] });

      beforeEach(async function () {
        this.visit('/dummy');
        await findProfiles.whenLoaded();
        await findProfiles.jobProfileButton.click();
      });

      describe('when select a several profiles', () => {
        beforeEach(async function () {
          await findProfiles.modal.instances(1).selectLine();
          await findProfiles.modal.instances(2).selectLine();
        });

        describe('and click on the "Save" button', () => {
          beforeEach(async function () {
            await findProfiles.modal.save.click();
          });

          it('then confirmation modal does not appears', function () {
            return expect(findProfiles.modal.confirmationModal.isPresent).to.be.false;
          });
        });
      });
    });
  });

  describe('For match profiles', () => {
    describe('In single select mode', () => {
      appInit({
        isSingleSelect: true,
        scenarios: ['fetch-match-profiles-success', 'fetch-users', 'fetch-tags', 'tags-enabled'],
      });

      beforeEach(async function () {
        this.visit('/dummy');
        await findProfiles.whenLoaded();
        await findProfiles.matchProfileButton.click();
      });

      describe('when select a line (click on it)', () => {
        beforeEach(async function () {
          await findProfiles.modal.instances(1).click();
        });

        it('then confirmation modal appears', function () {
          return expect(findProfiles.modal.confirmationModal.isPresent).to.be.true;
        });

        describe('when click on "Cancel" button', () => {
          beforeEach(async function () {
            await findProfiles.modal.confirmationModal.cancelButton.click();
          });

          it('then close the confirmation modal', function () {
            return expect(findProfiles.modal.confirmationModal.isPresent).to.be.false;
          });

          it('and return to the profile component search', function () {
            return expect(findProfiles.modal.isPresent).to.be.true;
          });
        });

        describe('when click on "Relink" button', () => {
          beforeEach(async function () {
            await findProfiles.modal.confirmationModal.confirmButton.click();
          });

          it('then close the confirmation modal', function () {
            return expect(findProfiles.modal.confirmationModal.isPresent).to.be.false;
          });

          it('and close the profile component search', function () {
            return expect(findProfiles.modal.isPresent).to.be.false;
          });
        });
      });
    });

    describe('In multi select mode', () => {
      appInit({ scenarios: ['fetch-match-profiles-success', 'fetch-users', 'fetch-tags', 'tags-enabled'] });

      beforeEach(async function () {
        this.visit('/dummy');
        await findProfiles.whenLoaded();
        await findProfiles.matchProfileButton.click();
      });

      describe('when select a several profiles', () => {
        beforeEach(async function () {
          await findProfiles.modal.instances(1).selectLine();
          await findProfiles.modal.instances(2).selectLine();
        });

        describe('and click on the "Save" button', () => {
          beforeEach(async function () {
            await findProfiles.modal.save.click();
          });

          it('then confirmation modal appears', function () {
            return expect(findProfiles.modal.confirmationModal.isPresent).to.be.true;
          });

          describe('when click on "Cancel" button', () => {
            beforeEach(async function () {
              await findProfiles.modal.confirmationModal.cancelButton.click();
            });

            it('then close the confirmation modal', function () {
              return expect(findProfiles.modal.confirmationModal.isPresent).to.be.false;
            });

            it('and return to the profile component search', function () {
              return expect(findProfiles.modal.isPresent).to.be.true;
            });
          });

          describe('when click on "Relink" button', () => {
            beforeEach(async function () {
              await findProfiles.modal.confirmationModal.confirmButton.click();
            });

            it('then close the confirmation modal', function () {
              return expect(findProfiles.modal.confirmationModal.isPresent).to.be.false;
            });

            it('and close the profile component search', function () {
              return expect(findProfiles.modal.isPresent).to.be.false;
            });
          });
        });
      });
    });
  });

  describe('For mapping profiles', () => {
    describe('In single select mode', () => {
      appInit({
        isSingleSelect: true,
        scenarios: ['fetch-mapping-profiles-success', 'fetch-users', 'fetch-tags', 'tags-enabled'],
      });

      beforeEach(async function () {
        this.visit('/dummy');
        await findProfiles.whenLoaded();
        await findProfiles.mappingProfileButton.click();
      });

      describe('when select a line (click on it)', () => {
        beforeEach(async function () {
          await findProfiles.modal.instances(0).click();
        });

        it('then confirmation modal appears', function () {
          return expect(findProfiles.modal.confirmationModal.isPresent).to.be.true;
        });

        describe('when click on "Cancel" button', () => {
          beforeEach(async function () {
            await findProfiles.modal.confirmationModal.cancelButton.click();
          });

          it('then close the confirmation modal', function () {
            return expect(findProfiles.modal.confirmationModal.isPresent).to.be.false;
          });

          it('and return to the profile component search', function () {
            return expect(findProfiles.modal.isPresent).to.be.true;
          });
        });

        describe('when click on "Relink" button', () => {
          beforeEach(async function () {
            await findProfiles.modal.confirmationModal.confirmButton.click();
          });

          it('then close the confirmation modal', function () {
            return expect(findProfiles.modal.confirmationModal.isPresent).to.be.false;
          });

          it('and close the profile component search', function () {
            return expect(findProfiles.modal.isPresent).to.be.false;
          });
        });
      });
    });

    describe('In multi select mode', () => {
      appInit({ scenarios: ['fetch-mapping-profiles-success', 'fetch-users', 'fetch-tags', 'tags-enabled'] });

      beforeEach(async function () {
        this.visit('/dummy');
        await findProfiles.whenLoaded();
        await findProfiles.mappingProfileButton.click();
      });

      describe('when select a several profiles', () => {
        beforeEach(async function () {
          await findProfiles.modal.instances(2).selectLine();
          await findProfiles.modal.instances(0).selectLine();
        });

        describe('and click on the "Save" button', () => {
          beforeEach(async function () {
            await findProfiles.modal.save.click();
          });

          it('then confirmation modal appears', function () {
            return expect(findProfiles.modal.confirmationModal.isPresent).to.be.true;
          });

          describe('when click on "Cancel" button', () => {
            beforeEach(async function () {
              await findProfiles.modal.confirmationModal.cancelButton.click();
            });

            it('then close the confirmation modal', function () {
              return expect(findProfiles.modal.confirmationModal.isPresent).to.be.false;
            });

            it('and return to the profile component search', function () {
              return expect(findProfiles.modal.isPresent).to.be.true;
            });
          });

          describe('when click on "Relink" button', () => {
            beforeEach(async function () {
              await findProfiles.modal.confirmationModal.confirmButton.click();
            });

            it('then close the confirmation modal', function () {
              return expect(findProfiles.modal.confirmationModal.isPresent).to.be.false;
            });

            it('and close the profile component search', function () {
              return expect(findProfiles.modal.isPresent).to.be.false;
            });
          });
        });
      });
    });
  });
});
