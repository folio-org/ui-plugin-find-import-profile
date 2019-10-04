import { matchProfilesShape } from '@folio/data-import/src/settings/MatchProfiles';
import { stripesConnect } from '@folio/stripes-core';

import { AbstractContainer } from './AbstractContainer';

class MatchProfilesContainer extends AbstractContainer {
  static manifest = Object.freeze({ ...matchProfilesShape.manifest });

  render() {
    return super.render({
      ...this.props,
      profileShape: matchProfilesShape,
    });
  }
}

export default stripesConnect(MatchProfilesContainer, { dataKey: 'find_IJP_line' });
