import * as React from 'react';
import {
  noop,
  get,
} from 'lodash';

import { renderWithIntl } from '@folio/stripes-data-transfer-components/test/jest/helpers';

import '../../../test/jest/__mock__';
import {
  buildMutator,
  buildResources,
} from '@folio/stripes-data-transfer-components/test/helpers';
import { buildStripes } from '@folio/data-import/test/jest/helpers';
import { matchProfilesShape } from '@folio/data-import/src/settings/MatchProfiles';
import { translationsProperties } from '../../../test/jest/helpers';

import MatchProfilesContainer from '../MatchProfilesContainer';

const stripesProp = buildStripes();
const resourcesProp = buildResources({ resourceName: 'matchProfiles' });
const mutatorProp = buildMutator({ query: { update: noop } });
const mockedChildren = jest.fn(() => (
  <div>
    <span>Children</span>
  </div>
));

const renderMatchProfilesContainer = () => {
  const component = (
    <MatchProfilesContainer
      stripes={stripesProp}
      resources={resourcesProp}
      mutator={mutatorProp}
      entityKey="matchProfiles"
      profileShape={matchProfilesShape}
    >
      {mockedChildren}
    </MatchProfilesContainer>
  );

  return renderWithIntl(component, translationsProperties);
};

describe('<MatchProfilesContainer>', () => {
  afterEach(() => {
    mockedChildren.mockClear();
  });

  it('renders children', () => {
    const { getByText } = renderMatchProfilesContainer();

    expect(getByText('Children')).toBeInTheDocument();
  });

  it('calls children render prop with appropriate arguments', () => {
    renderMatchProfilesContainer();

    const idPrefix = 'uiPluginFindImportProfile-';
    const expectedData = { records: get(resourcesProp, ['records', 'records'], []) };

    expect(mockedChildren.mock.calls[0][0].columnWidths).toEqual(matchProfilesShape.columnWidths);
    expect(mockedChildren.mock.calls[0][0].visibleColumns).toEqual(matchProfilesShape.visibleColumns);
    expect(mockedChildren.mock.calls[0][0].sortableColumns).toEqual(matchProfilesShape.visibleColumns);
    expect(mockedChildren.mock.calls[0][0].renderFilters).toEqual(noop);
    expect(mockedChildren.mock.calls[0][0].stripes).toEqual(stripesProp);
    expect(mockedChildren.mock.calls[0][0].data).toEqual(expectedData);
    expect(mockedChildren.mock.calls[0][0].idPrefix).toEqual(idPrefix);
  });
});
