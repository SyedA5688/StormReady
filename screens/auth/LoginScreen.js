import React from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert, TouchableOpacity, ScrollView } from 'react-native';
import MonitorInfo from '../../components/monitorInfo';
import * as firebase from 'firebase';

export default class LoginScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  onLoginPress = () => {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        //console.log("Logged in successfully");
      }, (error) => {
        Alert.alert("Was not able to log in, try again");
      });
    //console.log("Called login method");
  }

  onCreateAccountPress = () => {
    this.props.navigation.navigate("Signup");
  }

  onForgotPasswordPress =() => {
    this.props.navigation.navigate("Forgot Password");
  }

  render(){
    return (
      <View style={styles.container} >
        <ScrollView>
          <View style={styles.content} >
            <MonitorInfo />
            <View style={styles.loginContainer} >
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

              {/* Buttons */}
              <View style={styles.buttonContainer} >
                <TouchableOpacity style={[styles.buttonBox, {backgroundColor: 'mediumaquamarine',}]} onPress={this.onLoginPress} >
                  <Text style={styles.buttonText} >Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.buttonBox, {backgroundColor: 'skyblue',}]} onPress={this.onCreateAccountPress} >
                  <Text style={styles.buttonText} >Create An Account</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.buttonBox, {backgroundColor: 'lightpink',}]} onPress={this.onForgotPasswordPress} >
                  <Text style={styles.buttonText} >Forgot Password</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
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
  loginContainer: {
    marginTop: 15,
    marginBottom: 50,
    alignItems: "center",
    borderWidth: 1,
    paddingTop: 18,
    paddingBottom: 5,
    borderRadius: 8
  },
  textInput: {
    width: '75%',
    height: 40,
    borderWidth: 1,
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom:  20,
    alignItems: 'center',
    width: '100%',
  },
  buttonBox: {
    borderWidth: 1,
    borderRadius: 10,
    width: '60%',
    padding: 7,
    marginBottom: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 15,
  },
});