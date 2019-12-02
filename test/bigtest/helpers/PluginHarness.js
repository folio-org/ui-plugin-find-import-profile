import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import noop from 'lodash/noop';

import { Pluggable } from '@folio/stripes/core';
import { ENTITY_KEYS } from '@folio/data-import/src/utils/constants';

const {
  ACTION_PROFILES,
  JOB_PROFILES,
  MATCH_PROFILES,
  MAPPING_PROFILES,
} = ENTITY_KEYS;

const PluginHarness = props => {
  const layout = keys => keys.map((item, i) => (
    <div
      key={i}
      id={item}
    >
      <Pluggable
        aria-haspopup="true"
        type="find-import-profile"
        id="clickable-find-import-action-profile"
        searchLabel={<FormattedMessage id="ui-plugin-find-import-profile.pluggable.caption" />}
        searchButtonStyle="default"
        addLines={noop}
        entityKey={item}
        dataKey={item}
        disabled={false}
        isMultiLink={false}
        marginTop0
        data-test-plugin-find-record-button
        {...props}
      >
        <span data-test-no-plugin-available>
          <FormattedMessage id="ui-plugin-find-import-profile.pluggable.errors.plugin.disabled" />
        </span>
      </Pluggable>
    </div>
  ));

  return (
    <Fragment>
      {layout([ACTION_PROFILES, JOB_PROFILES, MATCH_PROFILES, MAPPING_PROFILES])}
    </Fragment>
  );
};

export default PluginHarness;
