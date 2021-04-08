import React, { useState, useEffect } from 'react';
import {View, StyleSheet, Modal, TouchableHighlight, FlatList, Alert} from 'react-native';
import {Text, Button, Input} from 'react-native-elements';
import firebase from '../firebase/firebase';
import 'firebase/firestore';
import { firestore } from 'firebase';

const HomeScreen = ({navigation}) => {
    const [ error, setError ] = useState('');
    const [ firstName, setFirstName ]= useState('');
    const [ lastName, setLastName ] = useState('');
    const [ age, setAge ]= useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const currentUser = firebase.firebase.auth().currentUser.uid;
    const [ listOfData, setListOfData ] = useState([]);

    useEffect(() => {
        const query = firebase.db.collection('users').doc(currentUser).onSnapshot(doc => {
            if(!doc.exists){
                return
            }
            const { firstName, lastName, age } = doc.data();
            setListOfData([...listOfData, {
                firstName,
                lastName,
                age,
                }])
        })
      }, [currentUser]);

    const logOut = async() => {
        try{
            await firebase.firebase.auth().signOut()
            navigation.reset({
                routes: [{name : 'Signup'}]
            })
        }
        catch(err){
            setError(err.message);
        }
    }
    
    const addProfile = async() => {
        firebase.db.collection('users').doc(currentUser).set({
            firstName: firstName,
            lastName: lastName,
            age : age
        })
    }

    const suppProfile = async() => {
        const documentId = firebase.db.collection('users').doc(currentUser)
            documentId.delete().then((res) => {
            alert('Your profile has been deleted');
            setListOfData([])
      })
    }

    function Item({ item }) {
        return (
          <View>
            <Text>{item.age}</Text>
            <Text>{item.firstName}</Text>
            <Text>{item.lastName}</Text>
          </View>
        );
    }

    return  <View>
                <Text>Home screen</Text>
                <Button style={styles.button} title="Logout" onPress={() => logOut() }></Button>
                {
                    error ? 
                    <Text style={{ color:'red' }}>{error}</Text>
                    : null
                }
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    }}>
                    <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Input label="Last name" value={lastName} onChangeText={setLastName}></Input>
                        <Input label="First name" value={firstName} onChangeText={setFirstName}></Input>
                        <Input label="Age" value={age} onChangeText={setAge}></Input>

                        <Button title="addProfile" onPress={() => addProfile() }></Button>

                        <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                        onPress={() => {
                            setModalVisible(!modalVisible);
                        }}>
                        <Text style={styles.textStyle}>Hide Modal</Text>
                        </TouchableHighlight>
                    </View>
                    </View>
                </Modal>
                <TouchableHighlight
                    style={styles.openButton}
                    onPress={() => {
                    setModalVisible(true);
                    }}>
                    <Text style={styles.textStyle}>Show Modal</Text>
                </TouchableHighlight>
                {
                    listOfData>=0 ? 
                    <Text>Aucune données</Text> 
                    : <FlatList style={styles.list} data={listOfData}  renderItem={({ item }) => <Item item={item} /> } keyExtractor={item => item.firstName} />
                }
                <Button title="suppDoc" onPress={() => suppProfile() }></Button>
            </View>
};

const styles = StyleSheet.create({
    button: {
        marginLeft: 'auto',
        marginRight: '1rem'
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      openButton: {
        backgroundColor: '#F194FF',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      },
      list:{
          height: 200,
          marginTop: 200,
      }
  });

export default HomeScreen;