import { runAxeTest } from '@folio/stripes-testing';
import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react';

import { renderWithIntl } from '@folio/stripes-data-transfer-components/test/jest/helpers';

import '../../../../test/jest/__mock__';

import {
  buildMutator,
  buildResources,
} from '@folio/stripes-data-transfer-components/test/helpers';

import {
  buildStripes,
  translationsProperties,
} from '../../../../test/jest/helpers';

import { AbstractContainer } from '../AbstractContainer';

const mockFetchMore = jest.fn();
const mockUpdateFn = jest.fn();

jest.mock('@folio/stripes/smart-components', () => ({
  ...jest.requireActual('@folio/stripes/smart-components'),
  StripesConnectedSource: () => ({
    fetchMore: mockFetchMore,
    update: mockUpdateFn,
  }),
}));

const mockUpdate = jest.fn();
const mockReplace = jest.fn();

const stripesProp = buildStripes();
const resourcesProp = buildResources({
  resourceName: 'records',
  records: [{ firstRecord: 'firstRecordValue' }],
});
const mutatorProp = buildMutator({
  sources: {},
  resultCount: {},
  query: {
    update: mockUpdate,
    replace: mockReplace,
  },
});

const mockedChildren = jest.fn(({
  onNeedMoreData,
  querySetter,
  queryGetter,
}) => (
  <>
    <span>Children</span>
    <button
      type="button"
      onClick={onNeedMoreData}
    >
      OnNeedMoreData
    </button>
    <button
      type="button"
      onClick={() => querySetter({ state: {} })}
    >
      UpdateQuery
    </button>
    <button
      type="button"
      onClick={queryGetter()}
    >
      GetQuery
    </button>
  </>
));

const profileShape = {
  renderHeaders: () => ({ someColumn: 'someColumnMapped' }),
  columnWidths: { someColumn: 'someColumnWidth' },
  visibleColumns: ['someColumn'],
};

const component = () => (
  <AbstractContainer
    stripes={stripesProp}
    profileShape={profileShape}
    mutator={mutatorProp}
    resources={resourcesProp}
    entityKey="someEntity"
  >
    {mockedChildren}
  </AbstractContainer>
);

const renderAbstractContainer = () => {
  return renderWithIntl(component(), translationsProperties);
};

describe('AbstractContainer', () => {
  it('should render with no axe errors', async () => {
    const { container } = renderAbstractContainer();

    await runAxeTest({ rootNode: container });
  });

  describe('when component updated', () => {
    it('should update source', () => {
      const { rerender } = render(component());

      rerender(component());

      expect(mockUpdateFn).toHaveBeenCalledTimes(2);
    });
  });

  it('should render children', () => {
    const { getByText } = renderAbstractContainer();

    expect(getByText('Children')).toBeInTheDocument();
  });

  it('should pass proper props to children', () => {
    renderAbstractContainer();

    const expectedProps = {
      columnMapping: profileShape.renderHeaders(),
      columnWidths: profileShape.columnWidths,
      data: { records: [{ firstRecord: 'firstRecordValue' }] },
      idPrefix: 'uiPluginFindImportProfile-',
      modalLabel: expect.any(Object),
      onNeedMoreData: expect.any(Function),
      queryGetter: expect.any(Function),
      querySetter: expect.any(Function),
      renderFilters: expect.any(Function),
      sortableColumns: profileShape.visibleColumns,
      source: undefined,
      stripes: expect.any(Object),
      visibleColumns: profileShape.visibleColumns,
    };

    expect(mockedChildren).toHaveBeenCalledWith(
      expect.objectContaining({ ...expectedProps }),
    );
  });

  it('should fetch more data', async () => {
    renderAbstractContainer();

    fireEvent.click(screen.getByText('OnNeedMoreData'));

    expect(mockFetchMore).toHaveBeenCalledTimes(1);
  });

  it('should update data', async () => {
    renderAbstractContainer();

    fireEvent.click(screen.getByText('UpdateQuery'));

    expect(mutatorProp.query.update).toHaveBeenCalled();
  });
});
