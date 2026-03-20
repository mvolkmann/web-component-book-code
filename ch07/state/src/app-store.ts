import { createStore } from '@stencil/store';

const { state } = createStore({
  name: 'World',
});

export default state;
