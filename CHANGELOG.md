# Change history for ui-plugin-find-import-profile

## [9.1.0] (IN PROGRESS)

### Features added:
* Introduce filterByRecordType prop to build query for filtered entities. (UIPFIMP-79)

## [9.0.0](https://github.com/folio-org/ui-plugin-find-import-profile/tree/v9.0.0) (2025-03-13)

### Features added:
* `React v19`: refactor away from default props for functional components (UIPFIMP-71)
* CI: migrate to shared GA workflows (UIPFIMP-75)
* *BREAKING* Migrate stripes dependencies to their Sunflower versions. (UIPFIMP-76)
* *BREAKING* Migrate `react-intl` to v7. (UIPFIMP-77)

## [8.0.0](https://github.com/folio-org/ui-plugin-find-import-profile/tree/v8.0.0) (2024-10-31)

### Features added:
* *BREAKING* Bump `stripes` to `v9.2.2` for Ramsons release (UIPFIMP-73)
* Bumped `okapiInterfaces` versions

## [7.1.0](https://github.com/folio-org/ui-plugin-find-import-profile/tree/v7.1.0) (2024-03-22)

### Features added:

* Jest/RTL: Increase test coverage for FindImportProfile component (UIPFIMP-65)
* Jest/RTL: Cover utils with unit tests (UIPFIMP-64)
* Jest/RTL: Increase test coverage for AbstractContainer component (UIPFIMP-66)
* Clean up eslint errors (UIPFIMP-68)
* Bumped folio dependencies and interfaces dependency

## [7.0.0](https://github.com/folio-org/ui-plugin-find-import-profile/tree/v7.0.0) (2023-10-13)

### Features added:
* Add accessibiity testing to automated tests in UIPFIMP (UIPFIMP-57)
* Return profile associations when linking the profile instead of the record itself (UIPFIMP-58)
* Update Node.js to v18 in GitHub Actions (UIPFIMP-60)
* *BREAKING* bump `react` to `v18`, and get rid of bigtest (UIPFIMP-59)
* *BREAKING* bump `react-intl` to `v6.4.4` (UIPFIMP-61)

## [6.0.1](https://github.com/folio-org/ui-plugin-find-import-profile/tree/v6.0.1) (2023-02-24)

### Bugs fixed:
* Fix the version of the @folio/data-import dependency

## [6.0.0](https://github.com/folio-org/ui-plugin-find-import-profile/tree/v6.0.0) (2023-02-24)

### Features added:
* Change imports for ListTemplate component in ui-plugin-find-import-profile (UIPFIMP-53)
* Bump stripes to 8.0.0 for Orchid/2023-R1 (UIPFIMP-56)

## [5.3.1](https://github.com/folio-org/ui-plugin-find-import-profile/tree/v5.3.1) (2022-11-17)

### Bugs fixed:
* React-highlighter is incompatible with react 17 (UIPFIMP-52)

## [5.3.0](https://github.com/folio-org/ui-plugin-find-import-profile/tree/v5.3.0) (2022-10-27)

### Features added:
* Update dependencies versions

## [5.2.0](https://github.com/folio-org/ui-plugin-find-import-profile/tree/v5.2.0) (2022-07-08)

### Features added:
* Replace babel-eslint with @babel/eslint-parser (UIPFIMP-48)

## [5.1.0](https://github.com/folio-org/ui-plugin-find-import-profile/tree/v5.1.0) (2022-03-04)

### Features added:
* Cover `<FindImportProfile>` component with tests (UIPFIMP-42)
* Cover `<FindImportProfileContainer>` container with tests (UIPFIMP-44)
* Update 'source-manager-job-executions' dependency versions (UIPFIMP-45)
* Remove 'react-dropzone' dependency (UIPFIMP-46)

## [5.0.0](https://github.com/folio-org/ui-plugin-find-import-profile/tree/v5.0.0) (2021-10-08)

### Features added:
* Refactor away from react-intl-safe-html (UIPFIMP-37)
* increment stripes to v7 (UIPFIMP-39)
* Validate action profile has a field mapping profile before attaching to job profile (UIDATIMP-990)

## [4.1.0](https://github.com/folio-org/ui-plugin-find-import-profile/tree/v4.1.0) (2021-06-17)

### Features added:
* Compile Translation Files into AST Format (UIPFIMP-33)
* Update version of interfaces due to supporting MARC Authority records (UIPFIMP-38)

## [4.0.0](https://github.com/folio-org/ui-plugin-find-import-profile/tree/v4.0.0) (2021-03-19)

### Features added:
* Update stripes to v6 (UIPFIMP-29)
* Update stripes-cli to v2 (UIPFIMP-32)
* Add personal data disclosure form (UIPFIMP-25)

## [3.0.0](https://github.com/folio-org/ui-plugin-find-import-profile/tree/v3.0.0) (2020-10-15)

### Features added:
* Handle import of stripes-acq-components to modules and platform (UISACQCOMP-3)
* Update dependencies versions
* Reuse utils from `data-transfer-components` rep (UIPFIMP-24)
* Refactor from `bigtest/mirage` to `miragejs`

## [2.0.1](https://github.com/folio-org/ui-plugin-find-import-profile/tree/v2.0.1) (2020-06-18)

### Features added:
* Update dependencies versions (UIPFIMP-21)

## [2.0.0](https://github.com/folio-org/ui-plugin-find-import-profile/tree/v2.0.0) (2020-06-11)

# Features added:
* Update to Stripes v4 (UIPFIMP-18)
* Get rid of "@folio/stripes-core" and "@folio/stripes-smart-components" dependencies
* Update dependencies versions

# Bugs fixed:
* Fix tests

## [1.2.2](https://github.com/folio-org/ui-plugin-find-import-profile/tree/v1.2.2) (2020-04-02)

# Features added:
* Update @folio/stripes-smart-components dependency version (UIDATIMP-485)

# Bugs fixed:
* Update @folio/stripes-acq-components dependency and devDependency version

## [1.2.1](https://github.com/folio-org/ui-plugin-find-import-profile/tree/v1.2.1) (2020-03-19)

# Bugs fixed:
* Update @folio/stripes-acq-components dependency version

## [1.2.0](https://github.com/folio-org/ui-plugin-find-import-profile/tree/v1.2.0) (2020-03-13)

# Features added:
* Job Profile Tree: Changes needed to support Static value submatches (UIPFIMP-11)
* Upgrade Stripes and all the dependencies to version 3.0.0 (UIPFIMP-14)

# Bugs fixed:
* Wording in action profile relink modal is not correct (UIPFIMP-10)

## [1.1.2](https://github.com/folio-org/ui-plugin-find-import-profile/tree/v1.1.2) (2020-01-03)

# Bugs fixed:
* Plugin crashes on list generation when it is used on different pages (UIPFIMP-6)

## [1.1.1](https://github.com/folio-org/ui-plugin-find-import-profile/tree/v1.1.1) (2019-12-04)

# New features:
* Create FindProfiles Plugin Component (UIPFIMP-1)
* Add Re-Link Warning popup and Linked/Unlinked status into FindProfiles Plugin Component (UIPFIMP-2)
* Job Profile Tree: Changes needed to support Static value submatches (UIPFIMP-11)
* Provide default sort order (UIDATIMP-409)
