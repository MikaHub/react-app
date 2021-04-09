import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Modal, TouchableHighlight, FlatList, Alert } from 'react-native';
import { Text, Button, Input } from 'react-native-elements';
import firebase from '../firebase/firebase';
import 'firebase/firestore';
import { firestore } from 'firebase';

const HomeScreen = ({ navigation }) => {
    const [error, setError] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const currentUser = firebase.firebase.auth().currentUser.uid;
    const [listOfData, setListOfData] = useState([]);

    useEffect(() => {
        const query = firebase.db.collection('users').doc(currentUser).onSnapshot(doc => {
            if (!doc.exists) {
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


    const LogOut = async () => {
        try {
            await firebase.firebase.auth().signOut()
            navigation.reset({
                routes: [{ name: 'Signin' }]
            })
        }
        catch (err) {
            setError(err.message);
        }
    }

    const AddProfile = async () => {
        firebase.db.collection('users').doc(currentUser).set({
            firstName: firstName,
            lastName: lastName,
            age: age
        })
    }

    const SuppProfile = async () => {
        const documentId = firebase.db.collection('users').doc(currentUser)
        documentId.delete().then((res) => {
            alert('Votre profil à bien été supprimé');
            setListOfData([])
        })
    }
    const test = () => {
        console.log("d");
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

    return <View>
        <Button style={style.buttonLogOut} title="Logout" onPress={() => LogOut()}></Button>
        {
            error ?
                <Text style={{ color: 'red' }}>{error}</Text>
                : null
        }
        {
            listOfData >= 0 ?
                <Text style={style.text}>Vous n'avez pas encore créé de profil !</Text>
                : <FlatList style={style.list} data={listOfData} renderItem={({ item }) => <Item item={item} />} keyExtractor={item => item.firstName} />
        }
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
            }}>
            <View style={style.centeredView}>
                <View style={style.modalView}>
                    <Input label="Last name" value={lastName} onChangeText={setLastName}></Input>
                    <Input label="First name" value={firstName} onChangeText={setFirstName}></Input>
                    <Input label="Age" value={age} onChangeText={setAge}></Input>

                    <Button title="addProfile" onPress={() => AddProfile()}></Button>

                    <TouchableHighlight
                        style={{ ...style.openButton, backgroundColor: '#2196F3' }}
                        onPress={() => {
                            setModalVisible(!modalVisible);
                        }}>
                        <Text style={style.textStyle}>Hide Modal</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </Modal>
        <View style={style.viewButton}>
            {/* <TouchableHighlight
                        style={style.openButton}
                        onPress={() => {
                        setModalVisible(true);
                        }}>
                        <Text style={style.textStyle}>Ajouter un profil</Text>
                    </TouchableHighlight> */}
            <Button style={style.openButton} title="Ajouter un profil" onPress={() => setModalVisible(true)}></Button>
            <Button style={style.openButton} title="Voir les balades" onPress={() => _getLocationAsync()}></Button>
            <Button style={style.openButton} title="Supprimer mon profil" onPress={() => SuppProfile()}></Button>

        </View>
    </View>
};

const style = StyleSheet.create({
    buttonLogOut: {
        marginTop: 10,
        marginLeft: 'auto',
        marginRight: '1rem',
    },
    text: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    viewButton: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: 'space-around',
        marginTop: 80
    },
    openButton: {
        backgroundColor: '#2089DC',
        borderRadius: 5,
        padding: 5,
    },
    textStyle: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18
    },
    list: {
        height: 50,
        marginTop: 10,
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
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});

export default HomeScreen;