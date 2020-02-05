import { get } from 'lodash';
import {
  createOkapiHeaders,
  createUrl,
} from '@folio/data-import/src/utils';
import { ASSOCIATION_TYPES } from '@folio/data-import/src/utils/constants';

/**
 * Gets a list of profile associations.
 *
 * @param {object} okapi
 * @param {string} profileId
 * @param {string} masterType
 * @param {string} parentType
 * @param {string} entityKey
 * @returns {Promise<object[]>} Returns array of profile associations.
 */
export const fetchAssociations = async (okapi, profileId, masterType, parentType, entityKey) => {
  const { url } = okapi;
  const profileType = masterType === parentType ? 'masters' : 'details';
  const queryProfileType = masterType === parentType ? 'detailType' : 'masterType';
  const baseUrl = `${url}/data-import-profiles/profileAssociations/${profileId}/${profileType}`;

  const response = await fetch(
    createUrl(baseUrl, { [queryProfileType]: ASSOCIATION_TYPES[entityKey] }, false),
    { headers: { ...createOkapiHeaders(okapi) } },
  );
  const body = await response.json();

  return get(body, 'childSnapshotWrappers', []);
};
