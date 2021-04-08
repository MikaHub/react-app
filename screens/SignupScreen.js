import React, { useState } from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text, Input, Button} from 'react-native-elements';
import firebase from './firebase/firebase';

const SignupScreen = ({navigation}) => {
    const [ email, setEmail ]= useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState('');

    const signUp = async() => {
        try{
            const response = await firebase.auth().createUserWithEmailAndPassword(email, password);
            navigation.navigate('Home')
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
                <Button title="SignUp" onPress={() => signUp() }></Button>
                <TouchableOpacity onPress={() =>  navigation.navigate('Signin')}>
                    <Text>Already have an account? Sign In</Text>
                </TouchableOpacity>
            </View>
   
};

export default SignupScreen;