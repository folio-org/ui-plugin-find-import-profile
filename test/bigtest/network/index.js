import {
  camelize,
  underscore,
} from 'inflected';

const req = require.context('@folio/data-import/test/bigtest/network', true, /\.\/.*\.js$/);

const modules = req.keys().reduce((acc, modulePath) => {
  const [, moduleType, moduleName] = modulePath.split('/');

  if (moduleType === 'configs') return acc;

  if (moduleName) {
    const moduleKey = camelize(underscore(moduleName.replace('.js', '')), false);

    return Object.assign(acc, {
      [moduleType]: {
        ...(acc[moduleType] || {}),
        [moduleKey]: req(modulePath).default,
      },
    });
  }

  if (modulePath === './config.js') {
    return Object.assign(acc, { baseConfig: req(modulePath).default });
  }

  return acc;
}, {});

export default modules;
