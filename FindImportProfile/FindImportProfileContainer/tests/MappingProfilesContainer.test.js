import * as React from 'react';
import {
  noop,
  get,
} from 'lodash';
import { runAxeTest } from '@folio/stripes-testing';

import { renderWithIntl } from '@folio/stripes-data-transfer-components/test/jest/helpers';

import '../../../test/jest/__mock__';
import {
  buildMutator,
  buildResources,
} from '@folio/stripes-data-transfer-components/test/helpers';
import { buildStripes } from '@folio/data-import/test/jest/helpers';
import { mappingProfilesShape } from '@folio/data-import/src/settings/MappingProfiles';
import { translationsProperties } from '../../../test/jest/helpers';

import MappingProfilesContainer from '../MappingProfilesContainer';

const stripesProp = buildStripes();
const resourcesProp = buildResources({ resourceName: 'mappingProfiles' });
const mutatorProp = buildMutator({ query: { update: noop } });
const mockedChildren = jest.fn(() => (
  <div>
    <span>Children</span>
  </div>
));

const renderMappingProfilesContainer = () => {
  const component = (
    <MappingProfilesContainer
      stripes={stripesProp}
      resources={resourcesProp}
      mutator={mutatorProp}
      entityKey="mappingProfiles"
      profileShape={mappingProfilesShape}
    >
      {mockedChildren}
    </MappingProfilesContainer>
  );

  return renderWithIntl(component, translationsProperties);
};

describe('<MappingProfilesContainer>', () => {
  afterEach(() => {
    mockedChildren.mockClear();
  });

  it('should render with no axe errors', async () => {
    const { container } = renderMappingProfilesContainer();

    await runAxeTest({ rootNode: container });
  });

  it('renders children', () => {
    const { getByText } = renderMappingProfilesContainer();

    expect(getByText('Children')).toBeInTheDocument();
  });

  it('calls children render prop with appropriate arguments', () => {
    renderMappingProfilesContainer();

    const idPrefix = 'uiPluginFindImportProfile-';
    const expectedData = { records: get(resourcesProp, ['records', 'records'], []) };

    expect(mockedChildren.mock.calls[0][0].columnWidths).toEqual(mappingProfilesShape.columnWidths);
    expect(mockedChildren.mock.calls[0][0].visibleColumns).toEqual(mappingProfilesShape.visibleColumns);
    expect(mockedChildren.mock.calls[0][0].sortableColumns).toEqual(mappingProfilesShape.visibleColumns);
    expect(mockedChildren.mock.calls[0][0].data).toEqual(expectedData);
    expect(mockedChildren.mock.calls[0][0].renderFilters).toEqual(noop);
    expect(mockedChildren.mock.calls[0][0].stripes).toEqual(stripesProp);
    expect(mockedChildren.mock.calls[0][0].idPrefix).toEqual(idPrefix);
  });
});
