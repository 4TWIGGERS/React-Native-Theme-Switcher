import { useFonts } from 'expo-font';
import { useSnapshot } from 'valtio';
import React, { useEffect } from 'react';
import { Platform, StatusBar } from 'react-native';

import { store } from './store/store';
import NavigationContainer from './components/NavigationContainer';
import { isDarkMode, storage } from './utils/mmkv';
import ThemeWrapper from './components/ThemeWrapper';

if (Platform.OS === 'android') {
 StatusBar.setTranslucent(true);
 StatusBar.setBackgroundColor('transparent');
}

const App = () => {
 const [fontsLoaded] = useFonts({
  MontserratRegular: require('./assets/fonts/Montserrat-Regular.ttf'),
  MontserratBold: require('./assets/fonts/Montserrat-Bold.ttf'),
 });

 const { mode, isAnimating } = useSnapshot(store);

 const onToggle = () => {
  store.isAnimating = !store.isAnimating;
  storage.set('isDarkMode', !isDarkMode());
 };

 useEffect(() => {
  if (isDarkMode()) {
   store.mode = 'dark';
  }
 }, []);

 if (fontsLoaded) {
  return (
   <ThemeWrapper mode={mode} isAnimating={isAnimating}>
    <NavigationContainer
     mode={mode}
     isAnimating={isAnimating}
     onPress={onToggle}
    />
   </ThemeWrapper>
  );
 }

 return null;
};

export default App;
