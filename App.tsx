import React, {useEffect} from 'react';
import {View, Text, Button, Alert} from 'react-native';
import SignInPage from './src/Screens/SignInForm';
import {DisplayPushNotification} from '././PushNotifications';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

export interface IParams {
  title: string | undefined;
  body: string | undefined;
}

const App = () => {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      const title: string | undefined = remoteMessage?.notification?.title;
      const body: string | undefined = remoteMessage?.notification?.body;

      DisplayPushNotification(title, body);
      // NotifeeNotification(title,body);
    });

    return unsubscribe;
  }, []);

  const NotifeeNotification = async (title: IParams, body: IParams) => {
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    await notifee.displayNotification({
      title: `${title}`,
      body: `${body}`,
      android: {
        channelId,
      },
    });
  };

  return (
    <View>
      <SignInPage />
    </View>
  );
};

export default App;
