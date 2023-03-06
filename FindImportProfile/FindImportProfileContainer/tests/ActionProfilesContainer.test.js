import * as React from 'react';
import {
  noop,
  get,
} from 'lodash';
import {
  axe,
  toHaveNoViolations,
} from 'jest-axe';

import { renderWithIntl } from '@folio/stripes-data-transfer-components/test/jest/helpers';

import '../../../test/jest/__mock__';
import {
  buildMutator,
  buildResources,
} from '@folio/stripes-data-transfer-components/test/helpers';
import { buildStripes } from '@folio/data-import/test/jest/helpers';
import { actionProfilesShape } from '@folio/data-import/src/settings/ActionProfiles';
import { translationsProperties } from '../../../test/jest/helpers';

import ActionProfilesContainer from '../ActionProfilesContainer';

expect.extend(toHaveNoViolations);

const mockUpdate = jest.fn();
const mockReplace = jest.fn();

const stripesProp = buildStripes();
const resourcesProp = buildResources({ resourceName: 'actionProfiles' });
const mutatorProp = buildMutator({
  query: {
    update: mockUpdate,
    replace: mockReplace,
  },
});
const mockedChildren = jest.fn(() => (
  <div>
    <span>Children</span>
  </div>
));

const renderActionProfilesContainer = () => {
  const component = (
    <ActionProfilesContainer
      stripes={stripesProp}
      resources={resourcesProp}
      mutator={mutatorProp}
      entityKey="actionProfiles"
      profileShape={actionProfilesShape}
    >
      {mockedChildren}
    </ActionProfilesContainer>
  );

  return renderWithIntl(component, translationsProperties);
};

describe('<ActionProfilesContainer>', () => {
  afterEach(() => {
    mockedChildren.mockClear();
    mockUpdate.mockClear();
    mockReplace.mockClear();
  });

  it('should be rendered with no axe errors', async () => {
    const { container } = renderActionProfilesContainer();
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it('renders children', () => {
    const { getByText } = renderActionProfilesContainer();

    expect(getByText('Children')).toBeInTheDocument();
  });

  it('calls children render prop with correct arguments', () => {
    renderActionProfilesContainer();

    const idPrefix = 'uiPluginFindImportProfile-';
    const expectedData = { records: get(resourcesProp, ['records', 'records'], []) };

    expect(mockedChildren.mock.calls[0][0].columnWidths).toEqual(actionProfilesShape.columnWidths);
    expect(mockedChildren.mock.calls[0][0].visibleColumns).toEqual(actionProfilesShape.visibleColumns);
    expect(mockedChildren.mock.calls[0][0].sortableColumns).toEqual(actionProfilesShape.visibleColumns);
    expect(mockedChildren.mock.calls[0][0].data).toEqual(expectedData);
    expect(mockedChildren.mock.calls[0][0].stripes).toEqual(stripesProp);
    expect(mockedChildren.mock.calls[0][0].renderFilters).toEqual(noop);
    expect(mockedChildren.mock.calls[0][0].idPrefix).toEqual(idPrefix);
    expect(mockedChildren.mock.calls[0][0].queryGetter()).toEqual({});
  });

  it('allows to set query', () => {
    renderActionProfilesContainer();

    const nsValues1 = {
      'users.query': 'test1',
      'users.filters': 'active',
      userId: 1,
    };
    const nsValues2 = {
      'users.query': 'test2',
      'users.filters': 'active',
      userId: 2,
    };
    const state1 = { changeType: 'reset' };
    const state2 = { changeType: 'update' };

    mockedChildren.mock.calls[0][0].querySetter({
      nsValues: nsValues1,
      state: state1,
    });
    mockedChildren.mock.calls[0][0].querySetter({
      nsValues: nsValues2,
      state: state2,
    });

    expect(mockReplace.mock.calls[0][0]).toEqual(nsValues1);
    expect(mockUpdate.mock.calls[1][0]).toEqual(nsValues2);
  });
});
