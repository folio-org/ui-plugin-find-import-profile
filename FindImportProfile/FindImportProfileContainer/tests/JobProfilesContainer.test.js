import * as React from 'react';
import {
  noop,
  get,
} from 'lodash';
import { axe } from 'jest-axe';

import { renderWithIntl } from '@folio/stripes-data-transfer-components/test/jest/helpers';

import '../../../test/jest/__mock__';
import {
  buildMutator,
  buildResources,
} from '@folio/stripes-data-transfer-components/test/helpers';
import { buildStripes } from '@folio/data-import/test/jest/helpers';
import { jobProfilesShape } from '@folio/data-import/src/settings/JobProfiles';
import { translationsProperties } from '../../../test/jest/helpers';

import JobProfilesContainer from '../JobProfilesContainer';

const stripesProp = buildStripes();
const resourcesProp = buildResources({ resourceName: 'jobProfiles' });
const mutatorProp = buildMutator({ query: { update: noop } });
const mockedChildren = jest.fn(() => (
  <div>
    <span>Children</span>
  </div>
));

const renderJobProfilesContainer = () => {
  const component = (
    <JobProfilesContainer
      stripes={stripesProp}
      resources={resourcesProp}
      mutator={mutatorProp}
      entityKey="jobProfiles"
      profileShape={jobProfilesShape}
    >
      {mockedChildren}
    </JobProfilesContainer>
  );

  return renderWithIntl(component, translationsProperties);
};

describe('<JobProfilesContainer>', () => {
  afterEach(() => {
    mockedChildren.mockClear();
  });

  it('should be rendered with no axe errors', async () => {
    const { container } = renderJobProfilesContainer();
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it('renders children', () => {
    const { getByText } = renderJobProfilesContainer();

    expect(getByText('Children')).toBeInTheDocument();
  });

  it('calls children render prop with appropriate arguments', () => {
    renderJobProfilesContainer();

    const idPrefix = 'uiPluginFindImportProfile-';
    const expectedData = { records: get(resourcesProp, ['records', 'records'], []) };

    expect(mockedChildren.mock.calls[0][0].columnWidths).toEqual(jobProfilesShape.columnWidths);
    expect(mockedChildren.mock.calls[0][0].visibleColumns).toEqual(jobProfilesShape.visibleColumns);
    expect(mockedChildren.mock.calls[0][0].sortableColumns).toEqual(jobProfilesShape.visibleColumns);
    expect(mockedChildren.mock.calls[0][0].stripes).toEqual(stripesProp);
    expect(mockedChildren.mock.calls[0][0].data).toEqual(expectedData);
    expect(mockedChildren.mock.calls[0][0].renderFilters).toEqual(noop);
    expect(mockedChildren.mock.calls[0][0].idPrefix).toEqual(idPrefix);
  });
});
