import React, { useEffect, useState } from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text, Input, Button} from 'react-native-elements';
import firebase from './firebase/firebase';


const SigninScreen = ({navigation}) => {
    const [ email, setEmail ]= useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState('');

    const signIn = async() => {
        try{
            const response = await firebase.auth().signInWithEmailAndPassword(email, password);
            navigation.navigate('Home');
        }
        catch(err){
            setError(err.message);
        }
    }
    return  <View>
                <Input label="Email" value={email} onChangeText={setEmail}></Input>
                <Input label="Password" value={password} onChangeText={setPassword} secureTextEntry></Input>
                {
                    error ? 
                    <Text style={{ color:'red' }}>{error}</Text>
                    : null
                }
                <Button title="SignIn" onPress={() => signIn() }></Button>
                <TouchableOpacity onPress={() =>  navigation.navigate('Signup')}>
                    <Text>Already new? Create an account here</Text>
                </TouchableOpacity>
            </View>
};

export default SigninScreen;