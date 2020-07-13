import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import * as firebase from 'firebase';

export default class ForgotPasswordScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: "",
    };
  }

  onResetPasswordPress = () => {
    firebase.auth().sendPasswordResetEmail(this.state.email)
      .then(() => {
        Alert.alert("Password reset email was sent.")
      }, (error) => {
        Alert.alert(error.message);
      })
  }

  render(){
    return (
      <View style={styles.container} >
        <View style={styles.content} >
        <View style={styles.forgotPassContainer} >
          <Text style={styles.titleText} >Enter your email address below to receive a password reset email</Text>
          <TextInput style={styles.textInput} 
            value={this.state.email}
            onChangeText={(text) => { this.setState({ email: text }) }}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <TouchableOpacity style={styles.buttonBox} onPress={this.onResetPasswordPress} >
              <Text style={styles.buttonText} >Reset Password</Text>
            </TouchableOpacity>
        </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    paddingVertical: 30,
    paddingHorizontal: 35,
    flex: 1,
  },
  forgotPassContainer: {
    marginTop: 60,
    alignItems: "center",
  },
  titleText: {
    fontSize: 21,
    textAlign: 'center',
    marginBottom: 40,
  },
  textInput: {
    width: 250,
    height: 40,
    borderWidth: 1,
    marginBottom: 10,
  },
  buttonBox: {
    borderWidth: 0.5,
    borderRadius: 10,
    backgroundColor: 'lightpink',
    width: '50%',
    padding: 7,
    marginBottom: 10,
    marginTop: 20,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 15,
  },
});