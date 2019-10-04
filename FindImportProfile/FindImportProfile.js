import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import {
  PluginFindRecord,
  PluginFindRecordModal,
} from '@folio/stripes-acq-components';
import { ENTITY_KEYS } from '@folio/data-import/src/utils/constants';

import * as containers from './FindImportProfileContainer';

const profileContainers = {
  [ENTITY_KEYS.JOB_PROFILES]: containers.JobProfilesContainer,
  [ENTITY_KEYS.MATCH_PROFILES]: containers.MatchProfilesContainer,
  [ENTITY_KEYS.ACTION_PROFILES]: containers.ActionProfilesContainer,
  [ENTITY_KEYS.MAPPING_PROFILES]: containers.MappingProfilesContainer,
};

const FindImportProfile = ({
  entityKey,
  addLines,
  isSingleSelect,
  ...rest
}) => {
  const FindImportProfileContainer = profileContainers[entityKey];

  return (
    <PluginFindRecord
      {...rest}
      selectRecordsCb={addLines}
    >
      {modalProps => (
        <FindImportProfileContainer entityKey={entityKey}>
          {viewProps => (
            <PluginFindRecordModal
              {...viewProps}
              {...modalProps}
              isMultiSelect={!isSingleSelect}
            />
          )}
        </FindImportProfileContainer>
      )}
    </PluginFindRecord>
  );
};

FindImportProfile.propTypes = {
  dataKey: PropTypes.string.isRequired,
  addLines: PropTypes.func.isRequired,
  entityKey: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  marginBottom0: PropTypes.bool,
  marginTop0: PropTypes.bool,
  searchButtonStyle: PropTypes.string,
  searchLabel: PropTypes.node,
  stripes: PropTypes.object,
  isSingleSelect: PropTypes.bool,
};

FindImportProfile.defaultProps = {
  disabled: false,
  marginBottom0: true,
  marginTop0: true,
  searchButtonStyle: 'primary',
  searchLabel: <FormattedMessage id="ui-plugin-find-import-profile.addProfile" />,
  isSingleSelect: false,
};

export default FindImportProfile;
