import { proxy } from 'valtio';

const store = proxy({ mode: 'light', isAnimating: false });

export { store };
