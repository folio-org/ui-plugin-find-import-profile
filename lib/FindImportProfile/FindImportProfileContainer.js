import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  omitProps,
} from '@folio/stripes/components';
import className from 'classnames';
import { FormattedMessage } from 'react-intl';
import { noop } from 'lodash';

import FindImportProfileModal from './FindImportProfileModal';

import css from './FindImportProfileContainer.css';

class FindImportProfileContainer extends React.Component {
  constructor(props) {
    super(props);

    this.connectedModal = props.stripes.connect(FindImportProfileModal, { dataKey: this.props.dataKey });
  }

  state = { openModal: false };

  getStyle() {
    const { marginTop0 } = this.props;

    return className(
      css.searchControl,
      { [css.marginTop0]: marginTop0 },
    );
  }

  openModal = () => this.setState({ openModal: true });

  closeModal = () => this.setState({ openModal: false });

  render() {
    const {
      disabled,
      searchButtonStyle,
      searchLabel,
      marginBottom0,
    } = this.props;
    const props = omitProps(this.props, ['disabled', 'searchButtonStyle', 'searchLabel', 'marginBottom0', 'marginTop0']);

    return (
      <div className={this.getStyle()}>
        <Button
          data-test-plugin-find-contact-button
          buttonStyle={searchButtonStyle}
          data-test-add-contact
          disabled={disabled}
          key="searchButton"
          marginBottom0={marginBottom0}
          onClick={this.openModal}
        >
          {searchLabel}
        </Button>
        {this.state.openModal && (
          <this.connectedModal
            closeCB={this.closeModal}
            {...props}
          />
        )}
      </div>
    );
  }
}

FindImportProfileContainer.defaultProps = {
  disabled: false,
  marginBottom0: true,
  marginTop0: true,
  searchButtonStyle: 'primary',
  searchLabel: <FormattedMessage id="ui-plugin-find-contact.button.addContact" />,
  addContacts: noop,
};

FindImportProfileContainer.propTypes = {
  disabled: PropTypes.bool,
  marginBottom0: PropTypes.bool,
  marginTop0: PropTypes.bool,
  searchButtonStyle: PropTypes.string,
  searchLabel: PropTypes.node,
  stripes: PropTypes.object,
  dataKey: PropTypes.string.isRequired,
  addContacts: PropTypes.func,
};

export default FindImportProfileContainer;
