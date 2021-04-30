import React from "react";
import { FlatList, TextInput, Text, View,StyleSheet,TouchableOpacity } from "react-native";
import db from "../config";
import {ScrollView} from 'react-native-gesture-handler'
export default class SearchScreen extends React.Component {
  constructor(props){
    super(props)
    this.state={allTransactions:[],lastVisibleTransaction:null,search:''}
  }
  fetchMoreTransactions=async()=>{
    var text=this.state.search.toUpperCase()
    var enteredText=text.split("")
    if (enteredText[0].toUpperCase()==='B') {
      const query=await db.collection("transactions").where('bookId','==',text).startAfter(this.state.lastVisibleTransaction).limit(10).get()
      query.docs.map((doc)=>{
        this.setState({
          allTransactions:[...this.state.allTransactions,doc.data()],
          lastVisibleTransaction:doc
        })
      })
    }
    else  if (enteredText[0].toUpperCase()==='S') {
      const query=await db.collection("transactions").where('bookId','==',text).startAfter(this.state.lastVisibleTransaction).limit(10).get()
      query.docs.map((doc)=>{
        this.setState({
          allTransactions:[...this.state.allTransactions,doc.data()],
          lastVisibleTransaction:doc
  })
})
    }
  }
  searchTransactions=async(text)=>{
    var enteredText=text.split("")
    if (enteredText[0].toUpperCase()==='B') {
    const transaction=await db.collection("transactions").where('bookId','==',text)
    transition.docs.map((doc)=>{
      this.setState({
        allTransactions:[...this.state.allTransactions,doc.data()],
        lastVisibleTransaction:doc
  })
})
    }
    else  if (enteredText[0].toUpperCase()==='S') {
      const transaction=await db.collection("transactions").where('bookId','==',text)
      transition.docs.map((doc)=>{
        this.setState({
          allTransactions:[...this.state.allTransactions,doc.data()],
          lastVisibleTransaction:doc
        })
      })
    }
  }
 
  componentDidMount=async()=>{
    const query=await db.collection("transactions").get()
    query.docs.map((doc)=>{
      this.setState({
        allTransactions:[],
        lastVisibleTransaction:doc
      })
    })
  }
  render(){
  return  (
    <View style={styles.container}>
       <View style={styles.searchBar}>
       <TextInput style ={styles.bar} placeholder = "Enter Book Id or Student Id"
        onChangeText={(text)=>{this.setState({search:text})}}/>
         <TouchableOpacity style = {styles.searchButton}
          onPress={()=>{this.searchTransactions(this.state.search)}} >
             <Text>Search</Text> </TouchableOpacity> </View>

    <FlatList data={this.state.allTransactions}
    renderItem={({item})=>
      (
       
            <View key={index}style={{borderBottomWidth:2}}>
              <Text>{"Book Id:"+transition.bookId}</Text>
              <Text>{"Student Id:"+transition.studentId}</Text>
              <Text>{"Transaction Type:"+transition.transitionType}</Text>
              <Text>{"Date:"+transition.date.toDate()}</Text>
              </View>
          )}
          keyExtractor={(item,index)=>index.toString()}
          onEndReached={this.fetchMoreTransactions}
          onEndReachedThreshold={0.7}
             />
             </View>
          )
        }
      }
      const styles = StyleSheet.create({
        container: {
          flex: 1,
        marginTop:20,
        },
        searchBar:{
         flexDirection:'row',
         height:40,
         width:'autu',
         borderWidth:0.5,
         alignItems:'center',
         backgroundColor:"white",
         },
        bar: {
         borderWidth:2,
         height:30,
         width:300,
         paddingLeft:10
        },
      
        searchButton: {
          backgroundColor: "red",
          width: 50,
          height:30,
          alignItems:'center',
          justifyContent:'center',
          borderWidth:1
      
        }
      })
      
    
  

  

