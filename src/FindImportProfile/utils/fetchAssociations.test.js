import '../../../test/jest/__mock__';

import { fetchAssociations } from './fetchAssociations';

global.fetch = jest.fn();

const mockData = { name: 'test name' };
const profileId = 'testProfileId';
const okapi = {
  url: 'https://test.com',
  tenant: 'tenant',
  token: 'token',
};
const path = `${okapi.url}/data-import-profiles/profileAssociations/${profileId}`;

describe('fetchAssociations function', () => {
  beforeEach(() => {
    global.fetch.mockClear();
  });

  describe('when masterType is equal to parentType', () => {
    it('should fetch details for the entity', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockData,
      });

      const expectedUrl = `${path}/masters?detailType=JOB_PROFILE`;
      const data = await fetchAssociations(okapi, profileId, 'ACTION_PROFILE', 'ACTION_PROFILE', 'jobProfiles');

      expect(global.fetch.mock.calls[0][0]).toBe(expectedUrl);
      expect(data).toEqual(mockData);
    });
  });

  describe('when masterType is not equal to parentType', () => {
    it('should fetch details for the master type', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockData,
      });

      const expectedUrl = `${path}/details?masterType=ACTION_PROFILE`;
      const data = await fetchAssociations(okapi, profileId, 'JOB_PROFILE', 'ACTION_PROFILE', 'actionProfiles');

      expect(global.fetch.mock.calls[0][0]).toBe(expectedUrl);
      expect(data).toEqual(mockData);
    });
  });

  describe('when there is no data', () => {
    it('should return an empty object', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: async () => null,
      });

      const data = await fetchAssociations(okapi, profileId, 'test', 'test', 'jobProfiles');

      expect(data).toEqual({});
    });
  });
});
