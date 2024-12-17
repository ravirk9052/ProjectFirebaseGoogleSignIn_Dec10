import {Alert, PermissionsAndroid, Pressable} from 'react-native';
import PushNotification from 'react-native-push-notification';


export const DisplayPushNotification = async (title: string|undefined,body: string|undefined) => {
  console.log('5-push', title,body);
  try {
    const permissionStatus = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    console.log('7', permissionStatus);
    if (permissionStatus === PermissionsAndroid.RESULTS.GRANTED) {
      const key = Date.now().toString();
      PushNotification.createChannel(
          {
              channelId: key,
              channelName: 'Extended WebApp Tech',
              channelDescription: 'Notification for local message',
              importance: 4,
              vibrate: true,
          },
          (created) => console.log(`createChannel returned '${created}'`)
      )
      PushNotification.localNotification({
          channelId: key,
          title: `${title}`,
          message: `${body}`,
      })
    } else if (permissionStatus === PermissionsAndroid.RESULTS.DENIED){
        Alert.alert('Notification Persmission Denied !!')
    }
  } catch (error) {
    Alert.alert('Failed to display Notifications...');
  }
};


