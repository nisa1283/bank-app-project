import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, ActivityIndicator, Platform } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import NoInternet from './src/NoInternet';
import AppNavigation from './src/navigation/AppNavigator';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    //SplashScreen.hide(); 

    let isMounted = true;

    const initializeApp = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 500)); // Kısa bekleme

        const state = await NetInfo.fetch();
        if (isMounted) {
          setIsConnected(state.isConnected && state.isInternetReachable !== false);
          setIsInitializing(false);
        }
      } catch (error) {
        if (isMounted) {
          setIsConnected(false);
          setIsInitializing(false);
        }
      }
    };

    initializeApp();

    const unsubscribe = NetInfo.addEventListener(state => {
      const isReachable = state.isInternetReachable ?? true;
      if (isMounted && !isInitializing) {
        setIsConnected(state.isConnected && isReachable);
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  const handleConnectionRestored = async () => {
    try {
      const state = await NetInfo.fetch();
      const isReachable = state.isInternetReachable ?? true;

      if (state.isConnected && isReachable) {
        setIsConnected(true);
        return true;
      } else {
        setIsConnected(false);
        return false;
      }
    } catch {
      setIsConnected(false);
      return false;
    }
  };

  if (isInitializing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!isConnected) {
    return <NoInternet onConnectionRestored={handleConnectionRestored} />;
  }

  return (
    <NavigationContainer>
      <AppNavigation />
    </NavigationContainer>
  );
};

export default App;
