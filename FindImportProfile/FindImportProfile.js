import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import {
  get,
  isEmpty,
  noop,
  flattenDeep,
} from 'lodash';

import { ConfirmationModal } from '@folio/stripes/components';
import {
  PluginFindRecord,
  PluginFindRecordModal,
} from '@folio/stripes-acq-components';

import {
  ENTITY_KEYS,
  PROFILE_NAMES,
} from '@folio/data-import/src/utils/constants';
import { listTemplate } from '@folio/data-import/src/components/ListTemplate';

import * as containers from './FindImportProfileContainer';
import { fetchAssociations } from './utils/fetchAssociations';

const profileContainers = {
  [ENTITY_KEYS.JOB_PROFILES]: containers.JobProfilesContainer,
  [ENTITY_KEYS.MATCH_PROFILES]: containers.MatchProfilesContainer,
  [ENTITY_KEYS.ACTION_PROFILES]: containers.ActionProfilesContainer,
  [ENTITY_KEYS.MAPPING_PROFILES]: containers.MappingProfilesContainer,
};

const FindImportProfile = ({
  entityKey,
  parentType,
  masterType,
  profileType,
  profileName,
  onLink,
  onClose,
  isSingleSelect,
  isMultiLink,
  filterParams,
  ...rest
}) => {
  const FindImportProfileContainer = profileContainers[entityKey];

  const [isModalOpen, showModal] = useState(false);
  const [isLinkingAllowed, setIsLinkingAllowed] = useState(false);
  const [selectedProfiles, setSelectedProfiles] = useState([]);
  const [confirmationLabel, setConfirmationLabel] = useState(null);
  const [confirmationHeading, setConfirmationHeading] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleProfilesSelect = (associations, confirmationModalMessage, records, callback) => {
    setIsLinkingAllowed(true);

    if (!isMultiLink && !isEmpty(associations)) {
      setConfirmationMessage(confirmationModalMessage);
      showModal(true);
    } else {
      callback(records);
    }
  };

  const handleAttachingToJobProfile = (associations, records, onSave) => {
    setIsLinkingAllowed(false);

    const confirmationModalMessage = (
      <FormattedMessage id="ui-plugin-find-import-profile.confirmationModal.notAttached.body" />
    );
    const confirmLabel = <FormattedMessage id="ui-plugin-find-import-profile.confirmationModal.ok" />;
    const confirmHeading = (
      <FormattedMessage id="ui-plugin-find-import-profile.confirmationModal.notAttached.heading" />
    );

    if (isEmpty(flattenDeep(associations))) {
      setConfirmationHeading(confirmHeading);
      setConfirmationLabel(confirmLabel);
      setConfirmationMessage(confirmationModalMessage);
      showModal(true);
    } else {
      onSave(records);
    }
  };

  const filterAssociations = associations => (!isEmpty(associations)
    ? associations.filter(association => association.contentType === parentType)
    : []);

  const getMessage = (associations, isSingle) => {
    const messageContent = [];

    if (!isEmpty(associations)) {
      const currentProfileName = profileName ? `"${profileName}"` : '';
      const linkedProfileName = get(associations, [0, 'content', 'name']);
      const linkedProfileType = get(associations, [0, 'contentType']);
      const note = (
        <FormattedMessage
          key="relink-modal-note"
          id="ui-plugin-find-import-profile.confirmationModal.note"
          tagName="p"
          values={{
            profileType: PROFILE_NAMES[entityKey],
            parentType: PROFILE_NAMES[parentType],
          }}
        />
      );
      const singleMessageBody = (
        <FormattedMessage
          key="relink-modal-single-message-body"
          id="ui-plugin-find-import-profile.confirmationModal.single.body"
          tagName="p"
          values={{
            linkedProfileName,
            linkedProfileType: PROFILE_NAMES[linkedProfileType],
            profileType: PROFILE_NAMES[entityKey],
            currentProfileName,
          }}
        />
      );
      const multipleMessageBody = (
        <FormattedMessage
          key="relink-modal-multiple-message-body"
          id="ui-plugin-find-import-profile.confirmationModal.multiple.body"
          tagName="p"
          values={{
            profileType: PROFILE_NAMES[entityKey],
            linkedProfileType: PROFILE_NAMES[linkedProfileType],
            currentProfileName,
          }}
        />
      );
      const messageBody = isSingle ? singleMessageBody : multipleMessageBody;

      messageContent.push(messageBody, note);
    }

    return messageContent;
  };

  const checkProfilesAssociations = async (records, props) => {
    setSelectedProfiles(records);

    const {
      onSaveMultiple,
      stripes: { okapi },
    } = props;
    const isSingleSelected = records.length === 1;
    const requests = records.map(record => fetchAssociations(okapi, record.id, masterType, parentType, entityKey));

    try {
      const associations = await Promise.all(requests);

      if (profileType === ENTITY_KEYS.JOB_PROFILES && entityKey === ENTITY_KEYS.ACTION_PROFILES) {
        handleAttachingToJobProfile(associations, records, onSaveMultiple);
      } else {
        const filteredAssociations = filterAssociations(flattenDeep(associations));
        const confirmationModalMessage = getMessage(filteredAssociations, isSingleSelected);
        const confirmLabel = <FormattedMessage id="ui-plugin-find-import-profile.confirmationModal.label" />;
        const confirmHeading = (
          <FormattedMessage
            id="ui-plugin-find-import-profile.confirmationModal.heading"
            values={{ profileType: PROFILE_NAMES[entityKey] }}
          />
        );

        setConfirmationHeading(confirmHeading);
        setConfirmationLabel(confirmLabel);

        handleProfilesSelect(filteredAssociations, confirmationModalMessage, records, onSaveMultiple);
      }
    } catch (error) {
      console.error(error); // eslint-disable-line no-console
    }
  };

  return (
    <PluginFindRecord
      {...rest}
      selectRecordsCb={onLink}
    >
      {modalProps => (
        <>
          <FindImportProfileContainer
            entityKey={entityKey}
            filterParams={filterParams}
          >
            {viewProps => (
              <PluginFindRecordModal
                onSearchChange={term => setSearchTerm(term)}
                resultsFormatter={listTemplate({
                  entityKey,
                  searchTerm,
                  selectRecord: null,
                  selectedRecords: [],
                })}
                {...viewProps}
                {...modalProps}
                isMultiSelect={!isSingleSelect}
                onSelectRow={(e, record) => checkProfilesAssociations([record], {
                  ...viewProps,
                  ...modalProps,
                })}
                onSaveMultiple={selectedRecords => checkProfilesAssociations(selectedRecords, {
                  ...viewProps,
                  ...modalProps,
                })}
                closeModal={() => {
                  setSearchTerm('');
                  modalProps.closeModal();
                  onClose();
                }}
              />
            )}
          </FindImportProfileContainer>
          <ConfirmationModal
            id="relink-profile"
            confirmLabel={confirmationLabel}
            bodyTag="div"
            heading={confirmationHeading}
            message={confirmationMessage}
            onCancel={() => showModal(false)}
            onConfirm={() => {
              showModal(false);
              if (isLinkingAllowed) {
                onLink(selectedProfiles);
              }
              modalProps.closeModal();
            }}
            open={isModalOpen}
          />
        </>
      )}
    </PluginFindRecord>
  );
};

FindImportProfile.propTypes = {
  dataKey: PropTypes.string.isRequired,
  entityKey: PropTypes.string.isRequired,
  parentType: PropTypes.string.isRequired,
  masterType: PropTypes.string.isRequired,
  profileType: PropTypes.string.isRequired,
  filterParams: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  profileName: PropTypes.string,
  isMultiLink: PropTypes.bool,
  disabled: PropTypes.bool,
  marginBottom0: PropTypes.bool,
  marginTop0: PropTypes.bool,
  searchButtonStyle: PropTypes.string,
  searchLabel: PropTypes.node,
  stripes: PropTypes.object,
  isSingleSelect: PropTypes.bool,
  onLink: PropTypes.func.isRequired,
  onSaveMultiple: PropTypes.func,
  onClose: PropTypes.func,
};

FindImportProfile.defaultProps = {
  disabled: false,
  marginBottom0: true,
  marginTop0: true,
  searchButtonStyle: 'primary',
  searchLabel: <FormattedMessage id="ui-plugin-find-import-profile.addProfile" />,
  isSingleSelect: false,
  isMultiLink: true,
  onClose: noop,
};

export default FindImportProfile;
