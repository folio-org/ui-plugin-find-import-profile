import React, {
  Fragment,
  useState,
} from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import {
  PluginFindRecord,
  PluginFindRecordModal,
} from '@folio/stripes-acq-components';
import { ConfirmationModal } from '@folio/stripes-components';
import SafeHTMLMessage from '@folio/react-intl-safe-html';

import {
  ENTITY_KEYS,
  ASSOCIATION_TYPES,
  PROFILE_NAMES,
} from '@folio/data-import/src/utils/constants';
import {
  createOkapiHeaders,
  createUrl,
} from '@folio/data-import/src/utils';

import {
  get,
  isEmpty,
} from 'lodash';

import * as containers from './FindImportProfileContainer';

const profileContainers = {
  [ENTITY_KEYS.JOB_PROFILES]: containers.JobProfilesContainer,
  [ENTITY_KEYS.MATCH_PROFILES]: containers.MatchProfilesContainer,
  [ENTITY_KEYS.ACTION_PROFILES]: containers.ActionProfilesContainer,
  [ENTITY_KEYS.MAPPING_PROFILES]: containers.MappingProfilesContainer,
};

const FindImportProfile = ({
  entityKey,
  parentType,
  addLines,
  isSingleSelect,
  isMultiLink,
  ...rest
}) => {
  const FindImportProfileContainer = profileContainers[entityKey];

  const [isModalOpen, showModal] = useState(false);
  const [selectedProfiles, setSelectedProfiles] = useState([]);
  const [message, setMessage] = useState([]);

  const fetchAssociations = async (props, id) => {
    const { stripes: { okapi } } = props;
    const { url } = okapi;

    const response = await fetch(
      createUrl(
        `${url}/data-import-profiles/profileAssociations/${id}/masters`,
        { detailType: ASSOCIATION_TYPES[entityKey] },
        false
      ),
      { headers: { ...createOkapiHeaders(okapi) } },
    );
    const body = await response.json();

    return get(body, 'childSnapshotWrappers', []);
  };

  const handleProfilesSelect = (associations, confirmationMessage, records, callback) => {
    if (!isMultiLink && !isEmpty(associations)) {
      setMessage(confirmationMessage);
      showModal(true);
    } else {
      callback(records);
    }
  };

  const checkMultipleProfilesAssociations = async (records, props) => {
    setSelectedProfiles(records);
    const { onSaveMultiple } = props;
    const linkedProfilesMessages = [];
    const multiSelectMessage = [];

    for (const record of records) {
      // eslint-disable-next-line no-await-in-loop
      const associations = await fetchAssociations(props, record.id);

      if (!isEmpty(associations)) {
        const currentProfileName = record.name;
        const linkedProfileName = get(associations, [0, 'content', 'name']);
        const linkedProfileType = get(associations, [0, 'contentType']);

        linkedProfilesMessages.push(
          <SafeHTMLMessage
            id="ui-plugin-find-import-profile.confirmationModal.linkedProfiles"
            values={{
              currentProfileName,
              profileType: PROFILE_NAMES[entityKey],
              linkedProfileName,
              linkedProfileType: PROFILE_NAMES[linkedProfileType],
            }}
          />
        );
      }
    }

    if (!isEmpty(linkedProfilesMessages)) {
      multiSelectMessage.push(
        <FormattedMessage id="ui-plugin-find-import-profile.confirmationModal.multiple.body" />,
        linkedProfilesMessages.map((profile, i) => <p key={i}>{profile}</p>),
        <SafeHTMLMessage
          id="ui-plugin-find-import-profile.confirmationModal.note"
          tagName="p"
          values={{
            profileType: PROFILE_NAMES[entityKey],
            parentType: PROFILE_NAMES[parentType],
          }}
        />,
      );
    }

    handleProfilesSelect(linkedProfilesMessages, multiSelectMessage, records, onSaveMultiple);
  };

  const checkProfileAssociations = async (e, record, props) => {
    setSelectedProfiles([record]);
    const singleSelectMessage = [];
    const { onSaveMultiple } = props;
    const associations = await fetchAssociations(props, record.id);

    if (!isEmpty(associations)) {
      const currentProfileName = record.name;
      const linkedProfileName = get(associations, [0, 'content', 'name']);
      const linkedProfileType = get(associations, [0, 'contentType']);

      singleSelectMessage.push(
        <SafeHTMLMessage
          id="ui-plugin-find-import-profile.confirmationModal.single.body"
          tagName="p"
          values={{
            linkedProfileName,
            linkedProfileType: PROFILE_NAMES[linkedProfileType],
            profileType: PROFILE_NAMES[entityKey],
            currentProfileName,
          }}
        />,
        <SafeHTMLMessage
          id="ui-plugin-find-import-profile.confirmationModal.note"
          tagName="p"
          values={{
            profileType: PROFILE_NAMES[entityKey],
            parentType: PROFILE_NAMES[parentType],
          }}
        />,
      );
    }

    handleProfilesSelect(associations, singleSelectMessage, [record], onSaveMultiple);
  };

  return (
    <PluginFindRecord
      {...rest}
      selectRecordsCb={addLines}
    >
      {modalProps => (
        <Fragment>
          <FindImportProfileContainer entityKey={entityKey}>
            {viewProps => (
              <PluginFindRecordModal
                {...viewProps}
                {...modalProps}
                isMultiSelect={!isSingleSelect}
                onSelectRow={(e, record) => checkProfileAssociations(e, record, {
                  ...viewProps,
                  ...modalProps,
                })}
                onSaveMultiple={selectedRecords => checkMultipleProfilesAssociations(selectedRecords, {
                  ...viewProps,
                  ...modalProps,
                })}
              />
            )}
          </FindImportProfileContainer>
          <ConfirmationModal
            id="relink-profile"
            confirmLabel={<FormattedMessage id="ui-plugin-find-import-profile.confirmationModal.label" />}
            heading={(
              <FormattedMessage
                id="ui-plugin-find-import-profile.confirmationModal.heading"
                values={{ profileType: PROFILE_NAMES[entityKey] }}
              />
            )}
            message={message}
            onCancel={() => showModal(false)}
            onConfirm={() => {
              showModal(false);
              addLines(selectedProfiles);
              modalProps.closeModal();
            }}
            open={isModalOpen}
          />
        </Fragment>
      )}
    </PluginFindRecord>
  );
};

FindImportProfile.propTypes = {
  dataKey: PropTypes.string.isRequired,
  addLines: PropTypes.func.isRequired,
  entityKey: PropTypes.string.isRequired,
  parentType: PropTypes.string.isRequired,
  isMultiLink: PropTypes.bool,
  disabled: PropTypes.bool,
  marginBottom0: PropTypes.bool,
  marginTop0: PropTypes.bool,
  searchButtonStyle: PropTypes.string,
  searchLabel: PropTypes.node,
  stripes: PropTypes.object,
  isSingleSelect: PropTypes.bool,
  onSaveMultiple: PropTypes.func,
};

FindImportProfile.defaultProps = {
  disabled: false,
  marginBottom0: true,
  marginTop0: true,
  searchButtonStyle: 'primary',
  searchLabel: <FormattedMessage id="ui-plugin-find-import-profile.addProfile" />,
  isSingleSelect: false,
  isMultiLink: true,
};

export default FindImportProfile;
