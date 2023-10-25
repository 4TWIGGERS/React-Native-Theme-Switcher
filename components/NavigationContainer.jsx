import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import Post from './Post';
import Tabs from './Tabs';
import Story from './Story';
import Header from './Header';

const usersArray = [
 {
  name: 'Nika Gabunia',
  role: 'Chief Executive Officer',
 },
 {
  name: 'Jeko Tediashvili',
  role: 'Web/Mobile Developer',
 },
 {
  name: 'Niko Chopikashvili',
  role: 'NodeJS Developer',
 },
 {
  name: 'Alexander Pataridze',
  role: "Neighbor's Kid",
 },
 {
  name: 'Miranda Pagava',
  role: 'Project Manager',
 },
 {
  name: 'Nika Kereselidze',
  role: 'NodeJS Developer',
 },
];

const NavigationContainer = ({ mode, onPress }) => {
 const color = mode === 'light' ? 'black' : 'white';

 return (
  <View style={styles.screenContainerStyle}>
   <Header onPress={onPress} color={color} />

   <Story color={color} />

   <ScrollView style={styles.scrollViewStyle}>
    {usersArray.map((user, i) => (
     <Post color={color} user={user} key={i} />
    ))}
   </ScrollView>

   <Tabs color={color} />
  </View>
 );
};

export default NavigationContainer;

const styles = StyleSheet.create({
 scrollViewStyle: { marginBottom: 60, top: 0, flex: 1 },
 screenContainerStyle: {
  flex: 1,
  backgroundColor: 'transparent',
 },
});
