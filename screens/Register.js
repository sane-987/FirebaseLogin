import { View, TextInput, Text, StyleSheet, ImageBackground, Button, TouchableHighlight } from 'react-native'
import React, { useState } from 'react'

import { firebase } from "../database/firebase.config"


const Register = ( {navigation} ) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState("")
    const [firstName, setfirstName] = useState("")
    const [lastName, setlastName] = useState("")


    const signUp = async() => {
      console.log("Registering user")
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password, firstName, lastName)
        await firebase.auth().currentUser.sendEmailVerification({
          handleCodeInApp : true,
          url : "https://clone-app-7be93.firebaseapp.com",
            })
        await firebase.firestore().collection("users")
                                  .doc(firebase.auth().currentUser.uid)
                                  .set({
                                    firstName,
                                    lastName,
                                    email
                                  })
      }
      catch(err){
        console.log(err)
      }

    }
    
  return (
    <View style={styles.container}>
      <ImageBackground
      source={require("../assets/images/sukuna.jpg")}
      resizeMode="stretch"
      style= {styles.img}
      blurRadius={2}
      >
        <View style= {styles.loginContainer}>
            <Text style = {styles.welcomMsg}>
              Create Account
            </Text>
            <TextInput style = {styles.input}
                placeholder='Enter Firstname'
                autoCapitalize='none'
                onChangeText={(text) => setfirstName(text)}
            />
            <TextInput style = {styles.input}
                placeholder='Enter Lastname'
                autoCapitalize='none'
                onChangeText={(text) => setlastName(text)}
            />
            <TextInput style = {styles.input}
                placeholder='Enter Email'
                autoCapitalize='none'
                onChangeText={(text) => setEmail(text)}
            />
            <TextInput style = {styles.input}
                placeholder='Enter Password'
                autoCapitalize='none'
                onChangeText={(text) => setPassword(text)}
                secureTextEntry= {true}
            />
            
          <TouchableHighlight
          style= {styles.btn}
          onPress={() => signUp(email, password, firstName, lastName)}
          >
            <Text style = {styles.text}>
              Register
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
          style= {styles.btn}
          onPress={() => navigation.navigate("Login")}
          >
            <Text style = {styles.text}>
              Already a User? Login
            </Text>
          </TouchableHighlight>
        </View>
      </ImageBackground>
    </View>
  )
}

export default Register

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : "center",
        alignItems : "center",
    },
    loginContainer : {
        height : "70%",
        width : "70%",
        alignItems : "center",
        borderRadius : 10,
        justifyContent: "center",
        
    },
    input : {
      width : "100%",
      margin : 10,
      height : 50,
      borderWidth : 1,
      borderRadius : 4,
      padding : 10,
      backgroundColor : "#fff"
    },
    img: { 
        height : "100%",
        width : "100%",
        
        justifyContent: 'center', 
        alignItems: 'center', 
      }, 
    btn : {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: 'black',
      margin : 10,
      width : "80%"
    },
    text : {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    },
    welcomMsg : {
      fontSize : 30,
      fontWeight : "bold",
      color : "white",
      marginRight : 120,
      marginBottom : 30
    }
})