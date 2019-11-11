import { mappingProfilesShape } from '@folio/data-import/src/settings/MappingProfiles';
import { stripesConnect } from '@folio/stripes-core';

import { AbstractContainer } from './AbstractContainer';

class MappingProfilesContainer extends AbstractContainer {
  static manifest = Object.freeze({ ...mappingProfilesShape.manifest });

  render() {
    return super.render({
      ...this.props,
      profileShape: mappingProfilesShape,
    });
  }
}

export default stripesConnect(MappingProfilesContainer, { dataKey: 'find_IJP_line' });
