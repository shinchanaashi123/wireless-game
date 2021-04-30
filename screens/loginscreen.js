import React from "react";
import { FlatList, TextInput, Text, View,StyleSheet,TouchableOpacity,KeyboardAvoidingView,Alert,Image } from "react-native";
import firebase from 'firebase'
export default class LoginScreen extends React.Component {
    constructor() {
        super()
        this.state={
            emailId :'',
            password:'',
        }
    }
    login=async(email,password)=>{
        if (email && password) {
            try{
              alert("try")
                const response=await firebase.auth().signInWithEmailAndPassword(email,password)
                alert("res " + response)
                if(response) {
                    this.props.navigation.navigate('Transaction')
                }
            }
            catch( error ) {
              alert("login error " + error)
                switch (error.code) {
                    case 'auth/user-not-found':
                        alert("user Doesn'T exist")
                        break
                        case 'auth/invalid-email':
                            alert(" incorrect email and password")
                            break
                       
                }
            }
        }
        else{
            alert("enter email and password")
        }
    }
  render() {
      return(
      <KeyboardAvoidingView style={{alignItems:'center',marginTop:20}}>

      <View>
        <Image source={require(".././assets/booklogo.jpg")}
          style={{ width: 200, height: 200 }} />
        <Text style={{ textAlign: 'center', fontSize: 30 }}>wily</Text>
      </View>
      <View >

        <TextInput style={styles.loginBox}
          placeholder="abc@example.com"
          keyboardType='email-address'
          onChangeText={(text) =>{ this.setState({ emailId: text })}}/>
          <TextInput style={styles.loginBox}
          secureTextEntry={true}
          placeholder="enter password"
          onChangeText={text => {this.setState({ password: text })}}/>
          </View>
          <View>
        <TouchableOpacity style={{height:30,width:90,borderWidth:1,marginTop:20,paddingTop:5,borderRadius:7}}
          onPress={() => {
            this.login(this.state.emailId,this.state.password)
          }}>
          <Text style={{textAlign:'center'}}>login </Text>
        </TouchableOpacity>
      </View>
     

    </KeyboardAvoidingView>
  )
}
}

  const styles = StyleSheet.create({
    loginBox:{
     height:40,
     width:300,
     borderWidth:1.5,
     margin:10,
     paddingLeft:10,
     fontSize:20,
     }
    })