import React from 'react';
import { FormattedMessage } from 'react-intl';
import noop from 'lodash/noop';

import { Pluggable } from '@folio/stripes/core';
import { ENTITY_KEYS } from '@folio/data-import/src/utils/constants';

const PluginHarness = props => (
  <Pluggable
    aria-haspopup="true"
    type="find-import-profile"
    id="clickable-find-import-profile"
    searchLabel={<FormattedMessage id="ui-plugin-find-import-profile.pluggable.caption" />}
    searchButtonStyle="default"
    addLines={noop}
    entityKey={ENTITY_KEYS.JOB_PROFILES}
    dataKey={ENTITY_KEYS.JOB_PROFILES}
    disabled={false}
    marginTop0
    data-test-plugin-find-record-button
    {...props}
  >
    <span data-test-no-plugin-available>
      <FormattedMessage id="ui-plugin-find-import-profile.pluggable.errors.plugin.disabled" />
    </span>
  </Pluggable>
);

export default PluginHarness;
