import { actionProfilesShape } from '@folio/data-import/src/settings/ActionProfiles';
import { stripesConnect } from '@folio/stripes-core';

import { AbstractContainer } from './AbstractContainer';

class ActionProfilesContainer extends AbstractContainer {
  static manifest = Object.freeze({ ...actionProfilesShape.manifest });

  render() {
    return super.render({
      ...this.props,
      profileShape: actionProfilesShape,
    });
  }
}

export default stripesConnect(ActionProfilesContainer, { dataKey: 'find_IJP_line' });
