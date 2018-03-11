import React, { Component } from 'react';
import {
        Text,
        StyleSheet,
        View,
        TextInput,
        Button,
        Image,
        TouchableOpacity,
        KeyboardAvoidingView,
        StatusBar,
        Alert

      } from 'react-native';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this. _talkToServer = this. _talkToServer.bind(this);
        this.state = { username: '', password : '' };
      }
     _talkToServer() {
        var username = this.state.username;
        var password = this.state.password;
       let  formData = { email: username,
                password: password,
                device_id: '1312345432123',
                platform: 'WINDOWS',
                device_name: 'WINDOWS',
                os_version: 'WINDOWS' };
        let URL = 'https://www.josswork.com/api/user/login.json';
        var json = JSON.stringify(formData);
        var xhr = new XMLHttpRequest();
        xhr.open("POST", URL, true);
        xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
        xhr.onload = function () {
            var users = JSON.parse(xhr.responseText);
            if (xhr.readyState == 4 && xhr.status == "200") {
                console.log(users.response.User);
                Alert.alert(users.response.User.username)
            } else {
                Alert.alert('Wrong username or Password')
            }
        }
        xhr.send(json);

    }
  render() {
    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#25a100" />
            <Image style={styles.logo}
                    source={require('../image/JossWork-Beta.png')}
                />

            <View style={styles.loginPanel}>
                     <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor='#25a100'
                        keyboardType='email-address'
                        returnKeyType='next'
                        autoCorrect={false}
                        onSubmitEditing={()=> this.refs.txtPassword.focus()}
                        onChangeText={username => this.setState({username})}
                        
                    />
                     <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor='#25a100'
                        returnKeyType='go'
                        secureTextEntry
                        autoCorrect={false}
                        ref={"txtPassword"}
                        onChangeText={password => this.setState({password})}
                    />
            </View>
            <View style={styles.loginButton}>
                    <TouchableOpacity style={styles.buttonContainer}  onPress={this._talkToServer.bind()}>
                        <Text style={styles.buttonText}>SIGN IN</Text>
                    </TouchableOpacity>

            </View>
                   

       </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e7e7e7',
  },
  logo :{
      width : 220,
      height : 40
  },
  loginPanel : {
    position: 'absolute' ,
      bottom : 60,
      right: 0,
      left: 0,
      padding: 20,
  },
  loginButton : {
    position: 'absolute' ,
    bottom : 0,
    right: 0,
    left: 0,
    padding: 20,
  },
  input :{
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    color: "#25a100"
  },
  buttonContainer: {
    backgroundColor: '#000',
    paddingVertical: 10, 
    marginTop: 15,
},
buttonText: {
    textAlign: 'center',
    color :'#25a100',
    fontWeight: 'bold',
    fontSize: 18
}
});
