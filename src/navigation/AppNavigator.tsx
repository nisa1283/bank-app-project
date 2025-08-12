import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screen/LoginScreen';
import PasswordScreen from '../screen/PasswordScreen';
import creatAccountScreen from '../screen/creatAccountScreen';
import HomeScreen from '../screen/BottomScreen/HomeScreen';
import HomeTabs from './HomeTabs';
import UserProfileScreen from '../screen/BottomScreen/UserProfileScreen';
import BillScreen from '../screen/BottomScreen/BillScreen';
import TransferScreen from '../screen/BottomScreen/TransferScreen';
import HelpScreen from '../screen/BottomScreen/HelpScreen';
import ContactScreen from '../screen/BottomScreen/ContactScreen';
import AboutScreen from '../screen/BottomScreen/AboutScreen';
import ReceiptScreen from '../screen/BottomScreen/ReceiptScreen';


export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Password: { phone: string };
  Create: undefined;
  HomeTabs: undefined;
  UserProfile: undefined;
  Home: undefined;
  Bill:undefined;
  Transfer:undefined;
  Help:undefined;
  Contact:undefined;
  About:undefined;
  Receipt:{transaction:any};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (

    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Password" component={PasswordScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Create" component={creatAccountScreen} />
      <Stack.Screen name="HomeTabs" component={HomeTabs} />
      <Stack.Screen name="UserProfile" component={UserProfileScreen} options={{animation: 'slide_from_left',}}/>
      <Stack.Screen name="Bill" component={BillScreen} options={{headerShown:false}}/>
      <Stack.Screen name="Transfer" component={TransferScreen} options={{headerShown:false}} />
      <Stack.Screen name="Help" component={HelpScreen} options={{headerShown:false}} />
      <Stack.Screen name="Contact" component={ContactScreen} options={{headerShown:false}} />
      <Stack.Screen name="About" component={AboutScreen} options={{headerShown:false}} />
      <Stack.Screen name="Receipt" component={ReceiptScreen} options={{headerShown:false}}/>

    </Stack.Navigator>

  );
};

export default AppNavigator;