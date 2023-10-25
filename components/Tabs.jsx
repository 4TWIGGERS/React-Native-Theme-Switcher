import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import { SCREEN_WIDTH } from '../utils/dimensions';
import {
 HomeIcon,
 BellIcon,
 SearchIcon,
 GroupIcon,
 EnvelopeIcon,
} from '../utils/svgs';

const Tabs = ({ color }) => {
 return (
  <View style={styles.tabStyle}>
   <HomeIcon color={color} style={styles.iconsStyle} />
   <SearchIcon color={color} style={styles.iconsStyle} />
   <GroupIcon color={color} style={styles.iconsStyle} />
   <BellIcon color={color} style={styles.iconsStyle} />
   <EnvelopeIcon color={color} style={styles.iconsStyle} />
  </View>
 );
};

export default Tabs;

const styles = StyleSheet.create({
 tabStyle: {
  width: SCREEN_WIDTH,
  height: 40,
  position: 'absolute',
  bottom: Platform.OS === 'ios' ? 40 : 40,
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  alignItems: 'center',
 },
 iconsStyle: {
  width: 30,
  height: 30,
 },
});
