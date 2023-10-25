import React from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';

import { TwiggersIcon } from '../utils/svgs';

const Header = ({ onPress, color }) => {
 return (
  <Pressable style={styles.twiggersIcon} onPress={onPress}>
   <TwiggersIcon color={color} />
  </Pressable>
 );
};

export default Header;

const styles = StyleSheet.create({
 twiggersIcon: {
  height: 70,
  justifyContent: 'center',
  marginTop: Platform.OS === 'ios' ? 70 : 20,
  flexDirection: 'row',
 },
});
