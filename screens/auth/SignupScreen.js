import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import * as firebase from 'firebase';

export default class SignupScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      email: "",
      password: "",
      passwordConfirm: "",
    };
  }

  onSignupPress = () => {
    if (this.state.password !== this.state.passwordConfirm){
      Alert.alert("Passwords do not match");
      return;
    }
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        // Successful signup handled in App.js by onAuthChange event listener
      }, (error) => {
        Alert.alert(error.message);
      });
  }

  render(){
    return (
      <View style={styles.container} >
        <View style={styles.content} >
          <View style={styles.signupContainer} >
          <TextInput style={styles.textInput} 
            value={this.state.email}
            onChangeText={(text) => { this.setState({ email: text }) }}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <TextInput style={styles.textInput}
            value={this.state.password}
            onChangeText={(text) => { this.setState({ password: text }) }}
            placeholder="Password"
            secureTextEntry={true}
            autoCorrect={false}
          />

          <TextInput style={styles.textInput}
            value={this.state.passwordConfirm}
            onChangeText={(text) => { this.setState({ passwordConfirm: text }) }}
            placeholder="Confirm Password"
            secureTextEntry={true}
            autoCorrect={false}
          />

          <TouchableOpacity style={styles.buttonBox} onPress={this.onSignupPress} >
            <Text style={styles.buttonText} >Signup</Text>
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
  signupContainer: {
    marginTop: 40,
    alignItems: "center",
  },
  textInput: {
    width: 250,
    height: 40,
    borderWidth: 1,
    marginBottom: 10,
  },
  buttonBox: {
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'skyblue',
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