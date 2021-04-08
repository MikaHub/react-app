import React, { useState } from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Button} from 'react-native-elements';
import firebase from './firebase/firebase';

const HomeScreen = ({navigation}) => {
    const [ error, setError ] = useState('');

    const logOut = async() => {
        try{
            await firebase.auth().signOut()
            navigation.reset({
                routes: [{name : 'Signup'}]
            })
        }
        catch(err){
            setError(err.message);
        }
    }
    return  <View>
                <Text>Home screen</Text>
                <Button style={styles.button} title="Logout" onPress={() => logOut() }></Button>
                {
                    error ? 
                    <Text style={{ color:'red' }}>{error}</Text>
                    : null
                }
            </View>

};

const styles = StyleSheet.create({
    button: {
        marginLeft: 'auto',
        marginRight: '1rem'
    },
  });

export default HomeScreen;