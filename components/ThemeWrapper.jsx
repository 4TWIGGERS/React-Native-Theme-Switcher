import { StyleSheet, Pressable, View, Image, Platform } from 'react-native';
import React, { useState, useEffect, useRef, cloneElement } from 'react';
import ViewShot from 'react-native-view-shot';
import MaskedView from '@react-native-masked-view/masked-view';
import Animated, {
 useSharedValue,
 useAnimatedStyle,
 withTiming,
 runOnJS,
} from 'react-native-reanimated';

import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../utils/dimensions';
import { store } from '../store/store';
import { isDarkMode } from '../utils/mmkv';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const viewShotOptions = { quality: 1, format: 'png' };

const ThemeWrapper = ({ mode, isAnimating, children }, props) => {
 const mods = useRef();
 const imageRef = useRef();
 const imageRef2 = useRef();

 const [isLoading, setLoading] = useState(false);
 const [lightImage, setLightImage] = useState('');
 const [darkImage, setDarkImage] = useState('');

 const width = useSharedValue(0);

 const appColor = mode === 'dark' ? 'light' : 'dark';

 const onSaveImageAsync = () => {
  if (imageRef.current && imageRef2.current) {
   imageRef.current.capture().then((uri) => {
    setDarkImage(uri);
   });

   imageRef2.current.capture().then((uri) => {
    setLightImage(uri);
   });
  }
 };

 const animatedStyles = useAnimatedStyle(() => {
  return {
   width: width.value,
   height: width.value,
   borderRadius: width.value,
   left: SCREEN_WIDTH / 2 - width.value / 2,
   top: Platform.OS === 'android' ? 35 : 80,
   transform: [{ scale: 35 }],
  };
 });

 useEffect(() => {
  onSaveImageAsync();
 }, []);

 useEffect(() => {
  if (isDarkMode()) {
   mods.current = {
    light: darkImage,
    dark: lightImage,
   };
  } else {
   mods.current = {
    light: lightImage,
    dark: darkImage,
   };
  }
 }, [lightImage, darkImage]);

 const clearAnimation = () => {
  setLoading(false);
  width.value = 0;
  store.isAnimating = false;
  store.mode = store.mode === 'dark' ? 'light' : 'dark';
 };

 useEffect(() => {
  if (isAnimating) {
   setLoading(true);
   width.value = withTiming(50, { duration: 900 }, () =>
    runOnJS(clearAnimation)()
   );
  }
 }, [isAnimating]);

 return (
  <View style={styles.maskViewStyle}>
   {isLoading && (
    <MaskedView
     style={[styles.maskViewStyle2, { zIndex: isAnimating ? 1000 : -1 }]}
     maskElement={
      <>
       <AnimatedPressable style={[styles.pressableStyle, animatedStyles]} />
      </>
     }>
     <>
      <View style={styles.screenShotImgContainer}>
       <Image
        source={{
         uri: mods.current[mode],
        }}
        style={[styles.captureImgStyle]}
       />
      </View>
     </>
    </MaskedView>
   )}

   {!lightImage && (
    <ViewShot
     ref={imageRef2}
     options={viewShotOptions}
     style={[
      styles.viewShotContainer,
      { backgroundColor: mode === 'dark' ? 'white' : 'black' },
     ]}>
     {cloneElement(children, { ...props, mode: appColor })}
    </ViewShot>
   )}

   <ViewShot
    ref={imageRef}
    options={viewShotOptions}
    style={[
     styles.viewShotContainer,
     { backgroundColor: mode === 'dark' ? 'black' : 'white' },
    ]}>
    {children}
   </ViewShot>
  </View>
 );
};

export default ThemeWrapper;

const styles = StyleSheet.create({
 maskViewStyle: {
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  zIndex: 100,
 },
 maskViewStyle2: {
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  height: SCREEN_HEIGHT,
 },
 captureImgStyle: {
  flex: 1,
  backgroundColor: 'transparent',
 },
 pressableStyle: {
  position: 'absolute',
  backgroundColor: 'white',
  zIndex: 100,
 },
 screenShotImgContainer: {
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  zIndex: 100,
 },
 viewShotContainer: {
  width: '100%',
  height: '100%',
  height: SCREEN_HEIGHT,
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  zIndex: 500,
 },
});
