import { jobProfilesShape } from '@folio/data-import/src/settings/JobProfiles';
import { stripesConnect } from '@folio/stripes/core';

import { AbstractContainer } from './AbstractContainer';

class JobProfilesContainer extends AbstractContainer {
  static manifest = Object.freeze(jobProfilesShape.manifest);
  static defaultProps = { profileShape: jobProfilesShape };

  render() {
    return super.render({
      ...this.props,
      profileShape: jobProfilesShape,
    });
  }
}

export default stripesConnect(JobProfilesContainer, { dataKey: 'find_IJP_line' });
