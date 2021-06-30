import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import AppRoute from './src/navigation';
import { store } from './src/redux-toolkit/store';
import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

export default function App() {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('remote msg', remoteMessage);
      const { notification } = remoteMessage;
      PushNotificationIOS.addNotificationRequest({
        id: remoteMessage.messageId as string,
        body: notification?.body,
        title: notification?.title,
      });
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppRoute />
      </NavigationContainer>
    </Provider>
  );
}
