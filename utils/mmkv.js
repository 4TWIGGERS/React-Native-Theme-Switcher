import { MMKV } from 'react-native-mmkv';

const storage = new MMKV({
 id: 'storage',
 isDarkMode: false,
});

const isDarkMode = () => storage.getBoolean('isDarkMode');

export { isDarkMode, storage };
