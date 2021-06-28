//imports
import 'react-native-gesture-handler';
import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Button,
  useColorScheme,
  View,
} from 'react-native';
//navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//onesignal
import OneSignal from 'react-native-onesignal';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

//page navigation
const Stack = createStackNavigator();

//reference to stack navigation
const navigationRef = React.createRef();

//OneSignal Init Code
OneSignal.setLogLevel(6, 0);
//change AppID for testing
OneSignal.setAppId("bd536548-96ff-43ea-a13c-a55a3c10c3b7");

//Method for sending user to second screen on alert press
OneSignal.setNotificationOpenedHandler(notification => {
  //debug for navigationRef variable set
  console.log("navigationRef:", navigationRef);
  navigationRef.current?.navigate('Second');
});

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

//basic home screen with second page navigation
function HomeScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', 
    justifyContent: 'center' }}>
      <Button
        title = "Second Page Test"
        onPress = {() =>
        navigation.navigate('Second')}
      />
    </View>
  );
};

//second page
function SecondScreen() {
  return(
    <View style={{ flex: 1, alignItems: 'center', 
    justifyContent: 'center' }}>
      <Text>Second Screen</Text>
    </View>
  );
};

function App() {
  //create page stack with the 2 pages
  return(
    //attatch navigationRef to container
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName = "Home">
        <Stack.Screen name = "Home"
        component = {HomeScreen}/>
        <Stack.Screen name = "Second"
        component = {SecondScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
