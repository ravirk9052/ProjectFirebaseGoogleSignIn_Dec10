import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import messaging from '@react-native-firebase/messaging';
import React, {useState} from 'react';

import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {responsiveWidth} from 'react-native-responsive-dimensions';


GoogleSignin.configure({
  scopes: ['email', 'https://www.googleapis.com/auth/firebase.messaging'],
  webClientId:
    '199928338875-sq8pgsee0pe470nvp95s1kf2s34a18t3.apps.googleusercontent.com',
  offlineAccess: true,
});

interface IUsers {
  photo: string;
  givenName: string;
  familyName: string;
  email: string;
  name: string;
  id: string;
}

const SignInPage = () => {
  const [userInfoData, setuserInfo] = useState<IUsers>();
  const [loggedIn, setLoggdeIn] = useState<boolean>(false);
  const checkFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log('45-fcmToken',fcmToken);
   } 
  };



  const LoginWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      try {
        const userInfo = (await GoogleSignin.signIn()) as {
          data: {user: IUsers};
        };
        setuserInfo(userInfo?.data?.user);
        setLoggdeIn(true);
      } catch (error) {
        console.log('error', error);
      }
    } catch (e) {
      console.log('error: ' + JSON.stringify(e));
    }
  };

  const onPressLogout = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setLoggdeIn(false);
      setuserInfo(undefined);
    } catch (error) {
      console.error(error);
    }
  };



  const onPressAccessToken = async () => {
    const token = await GoogleSignin.getTokens();
    console.log('92-token', token.accessToken);
  };


  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.formContainer}>
        {loggedIn ? (
          <>
            <View style={styles.profile}>
              <Image
                source={{uri: userInfoData?.photo}}
                style={styles.imagePhoto}
              />
              <View style={styles.profileText}>
                <Text>{userInfoData?.name}</Text>
                <Text>{userInfoData?.email}</Text>
              </View>
            </View>
            <View style={styles.btnContainer}>
              <TouchableOpacity onPress={onPressAccessToken} style={styles.generateBtn}>
                <Text style={styles.generateText}>Generate Access Token</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={checkFcmToken} style={styles.generateBtn}>
                <Text style={styles.generateText}>Generate FCM Token</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View>
            <View>
              <TextInput
                placeholder="Enter your Email"
                placeholderTextColor={'black'}
                style={styles.inputText}
              />
            </View>
            <View>
              <TextInput
                placeholder="Enter your password"
                placeholderTextColor={'black'}
                style={[styles.inputText, styles.passwordText]}
              />
            </View>
            <View>
              <TouchableOpacity
                style={styles.submitButton}
                // onPress={() => DisplayPushNotification()}
                >
                <Text style={styles.submitText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View>
          {loggedIn ? (
            <View>
              <TouchableOpacity onPress={onPressLogout} style={styles.outBtn}>
                <Text style={styles.signOutText}>Signout </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <View style={styles.orSignText}>
                <Text>Or Sign in With</Text>
              </View>
              <GoogleSigninButton
                onPress={LoginWithGoogle}
                style={styles.googleButton}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
              />
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    borderWidth: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // flex: 1,
    margin: 10,
  },
  formContainer: {
    // flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    // borderWidth: 1,
  },
  inputText: {
    borderWidth: 1,
    width: responsiveWidth(90),
    height: 40,
    paddingLeft: 10,
  },
  passwordText: {
    marginTop: 20,
  },
  submitButton: {
    // borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#F97B0F',
    borderRadius: 18,
  },
  submitText: {
    padding: 10,
    fontSize: 18,
  },
  orSignText: {
    // borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  googleText: {
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    padding: 10,
  },
  outBtn: {
    borderWidth: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    padding: 10,
    borderRadius: 12,
    backgroundColor: 'orange',
  },
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  content: {
    width: '100%',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  userInfo: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4285F4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  googleButton: {
    width: responsiveWidth(90),
    height: 55,
    marginTop: 20,
    alignSelf: 'center',
  },
  imagePhoto: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  profile: {
    flexDirection: 'row',
    // borderWidth: 0.1,
    width: responsiveWidth(90),
    backgroundColor: '#eeeeff',
    borderRadius: 20,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileText: {
    marginLeft: 10,
    // marginTop: 10,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  generateBtn: {
    // borderWidth: 0.1,
    padding: 12,
    // paddingLeft: 5,
    // paddingRight: 5,
    borderRadius: 16,
    backgroundColor: '#eeffff',
  },
  generateText: {
    fontSize: 14,
    fontWeight: 500,
  },
  signOutText: {
    fontSize: 18,
    fontWeight: 700,
  }
});

export default SignInPage;
