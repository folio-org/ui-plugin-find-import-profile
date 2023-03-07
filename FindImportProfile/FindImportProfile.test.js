/* eslint-disable import/order */
/* eslint-disable react/prop-types */
import React from 'react';
import { act } from '@testing-library/react';
import { noop } from 'lodash';
import { axe } from 'jest-axe';

import { renderWithIntl } from '@folio/stripes-data-transfer-components/test/jest/helpers';

import '../test/jest/__mock__';
import { buildStripes } from '@folio/data-import/test/jest/helpers';
import { translationsProperties } from '../test/jest/helpers';

import FindImportProfile from './FindImportProfile';

import { fetchAssociations } from './utils/fetchAssociations';
import { PluginFindRecordModal } from '@folio/stripes-acq-components';
import { ConfirmationModal } from '@folio/stripes/components';

const mockModalProps = {
  closeModal: () => {},
  onSaveMultiple: () => {},
  stripes: { ...buildStripes() },
};

jest.mock('@folio/stripes/components', () => ({
  ...jest.requireActual('@folio/stripes/components'),
  ConfirmationModal: jest.fn(({
    open,
    onCancel,
    onConfirm,
  }) => (open ? (
    <div>
      <span>Confirmation modal</span>
      <button
        type="button"
        onClick={onCancel}
      >
        Cancel
      </button>
      <button
        type="button"
        id="confirmButton"
        onClick={onConfirm}
      >
        Confirm
      </button>
    </div>
  ) : null)),
}));
jest.mock('@folio/stripes-acq-components', () => ({
  ...jest.requireActual('@folio/stripes-acq-components'),
  PluginFindRecord: ({ children }) => (
    <>
      <span>PluginFindRecord</span>
      {children(mockModalProps)}
    </>
  ),
  PluginFindRecordModal: jest.fn(() => 'PluginFindRecordModal'),
}));
jest.mock('./FindImportProfileContainer', () => ({
  JobProfilesContainer: ({
    children,
    ...props
  }) => (
    <>
      <span>JobProfilesContainer</span>
      {children(props)}
    </>
  ),
  ActionProfilesContainer: ({
    children,
    ...props
  }) => (
    <>
      <span>ActionProfilesContainer</span>
      {children(props)}
    </>
  ),
}));
jest.mock('./utils/fetchAssociations', () => {
  return { fetchAssociations: jest.fn(() => Promise.resolve({ contentType: 'ACTION_PROFILE' })) };
});

const onClose = jest.fn();
const findImportProfileProps = {
  onLink: noop,
  parentType: 'ACTION_PROFILE',
  masterType: 'JOB_PROFILE',
  dataKey: 'testDataKey',
  profileType: 'actionProfiles',
  entityKey: 'jobProfiles',
};

const renderFindImportProfile = ({
  onLink,
  parentType,
  masterType,
  dataKey,
  profileType,
  entityKey,
  profileName,
  isMultiLink = false,
}) => {
  const component = (
    <FindImportProfile
      onLink={onLink}
      onClose={onClose}
      parentType={parentType}
      masterType={masterType}
      dataKey={dataKey}
      profileType={profileType}
      entityKey={entityKey}
      profileName={profileName}
      isMultiLink={isMultiLink}
    />
  );

  return renderWithIntl(component, translationsProperties);
};

describe('FindImportProfile', () => {
  it('should be rendered with no axe errors', async () => {
    const { container } = renderFindImportProfile(findImportProfileProps);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it('should be rendered', () => {
    const { getByText } = renderFindImportProfile(findImportProfileProps);

    expect(getByText('JobProfilesContainer')).toBeDefined();
  });

  describe('when closing a modal', () => {
    it('should call a proper handler', async () => {
      await act(async () => {
        renderFindImportProfile(findImportProfileProps);
        PluginFindRecordModal.mock.calls[0][0].closeModal();
      });

      expect(onClose).toHaveBeenCalled();
    });
  });

  describe('when saving multiple', () => {
    it('should call a proper handler', async () => {
      await act(async () => {
        await renderFindImportProfile(findImportProfileProps);
        await PluginFindRecordModal.mock.calls[0][0].onSaveMultiple([{}]);
      });

      expect(fetchAssociations).toHaveBeenCalled();
    });

    describe('and there are several associations', () => {
      it('should handle profile select', async () => {
        await act(async () => {
          renderFindImportProfile(findImportProfileProps);
          await PluginFindRecordModal.mock.calls[0][0].onSaveMultiple([{}, {}]);
        });

        expect(fetchAssociations).toHaveBeenCalled();
      });
    });

    describe('and there are no associations', () => {
      it('should handle profile select with empty array', async () => {
        await act(async () => {
          fetchAssociations.mockClear();
          fetchAssociations.mockImplementationOnce(() => Promise.resolve());

          renderFindImportProfile(findImportProfileProps);
          await PluginFindRecordModal.mock.calls[0][0].onSaveMultiple([]);
        });

        expect(fetchAssociations).not.toHaveBeenCalled();
      });
    });
  });

  describe('when selecting row', () => {
    it('should check associations', async () => {
      await act(async () => {
        fetchAssociations.mockClear();
        fetchAssociations.mockImplementationOnce(() => Promise.resolve({ contentType: 'ACTION_PROFILE' }));

        renderFindImportProfile(findImportProfileProps);
        await PluginFindRecordModal.mock.calls[0][0].onSelectRow(Event, {});
      });

      expect(fetchAssociations).toHaveBeenCalled();
    });
  });

  describe('confirmation modal window', () => {
    it('should close plugin window when confirmed', async () => {
      let queryByText;

      await act(async () => {
        queryByText = renderFindImportProfile(findImportProfileProps).queryByText;
        ConfirmationModal.mock.calls[0][0].onConfirm();
      });

      expect(onClose).toHaveBeenCalled();
      expect(queryByText('Confirmation modal')).toBeNull();
    });

    it('should be closed when canceled', async () => {
      let queryByText;

      await act(async () => {
        queryByText = renderFindImportProfile(findImportProfileProps).queryByText;
        ConfirmationModal.mock.calls[0][0].onCancel();
      });

      expect(queryByText('Confirmation modal')).toBeNull();
    });
  });
});
