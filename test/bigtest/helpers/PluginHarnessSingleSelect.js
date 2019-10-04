import React from 'react';
import { FormattedMessage } from 'react-intl';
import noop from 'lodash/noop';

import { Pluggable } from '@folio/stripes/core';

const PluginHarnessSingleSelect = props => (
  <Pluggable
    aria-haspopup="true"
    type="find-import-profile"
    id="clickable-find-import-profile"
    searchLabel={<FormattedMessage id="ui-plugin-find-import-profile.pluggable.caption" />}
    marginTop0
    searchButtonStyle="link"
    addLines={noop}
    isSingleSelect
    {...props}
  >
    <span data-test-no-plugin-available>
      <FormattedMessage id="ui-plugin-find-import-profile.pluggable.errors.plugin.disabled" />
    </span>
  </Pluggable>
);

export default PluginHarnessSingleSelect;
