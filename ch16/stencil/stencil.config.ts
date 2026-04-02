import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'trafficlight',
  srcDir: 'src',
  outputTargets: [
    {
      type: 'dist'
    },
    {
      type: 'www',
      serviceWorker: null
    }
  ]
};
