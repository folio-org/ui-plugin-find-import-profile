import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import {
  get,
  noop,
} from 'lodash';

import { stripesShape } from '@folio/stripes/core';
import { StripesConnectedSource } from '@folio/stripes/smart-components';
import { listTemplate } from '@folio/data-import/src/components/ListTemplate';

const idPrefix = 'uiPluginFindImportProfile-';

export class AbstractContainer extends Component {
  constructor(props, context) {
    super(props, context);

    this.logger = props.stripes.logger;
    this.log = this.logger.log.bind(this.logger);
  }

  componentDidMount() {
    this.source = new StripesConnectedSource(this.props, this.logger);
    this.props.mutator.query.replace('');
  }

  componentDidUpdate() {
    this.source.update(this.props);
  }

  onNeedMoreData = () => {
    if (this.source) {
      this.source.fetchMore(this.props.profileShape.RESULT_COUNT_INCREMENT);
    }
  };

  querySetter = ({
    nsValues,
    state,
  }) => {
    const hasTypeChanged = /reset/.test(state.changeType);

    if (hasTypeChanged) {
      this.props.mutator.query.replace(nsValues);
    } else {
      this.props.mutator.query.update(nsValues);
    }
  };

  queryGetter = () => {
    return get(this.props.resources, 'query', {});
  };

  render(props) {
    const {
      resources,
      children,
      entityKey,
      profileShape,
    } = props;

    const resultsFormatter = listTemplate({
      entityKey,
      searchTerm: '',
      selectRecord: null,
      selectedRecords: [],
    });

    if (this.source) {
      this.source.update(this.props);
    }

    return children({
      columnMapping: get(profileShape, 'renderHeaders', noop)(),
      columnWidths: get(profileShape, 'columnWidths', {}),
      idPrefix,
      modalLabel: (
        <FormattedMessage
          id="ui-plugin-find-import-profile.modal.title"
          values={{ profileType: <FormattedMessage id={`ui-plugin-find-import-profile.entities.${entityKey}`} /> }}
        />
      ),
      onNeedMoreData: this.onNeedMoreData,
      queryGetter: this.queryGetter,
      querySetter: this.querySetter,
      renderFilters: noop,
      resultsFormatter,
      visibleColumns: get(profileShape, 'visibleColumns', []),
      sortableColumns: get(profileShape, 'visibleColumns', []),
      source: this.source,
      data: { records: get(resources, 'records.records', []) },
    });
  }
}

AbstractContainer.propTypes = {
  stripes: stripesShape.isRequired,
  mutator: PropTypes.object.isRequired,
  resources: PropTypes.object.isRequired,
  profileShape: PropTypes.object.isRequired,
};
