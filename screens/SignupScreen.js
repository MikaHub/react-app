import React, { useState } from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import {Text, Input, Button} from 'react-native-elements';
import firebase from '../firebase/firebase';

const SignupScreen = ({navigation}) => {
    const [ email, setEmail ]= useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState('');

    const SignUp = async() => {
        try{
            const response = await firebase.firebase.auth().createUserWithEmailAndPassword(email, password);
            navigation.navigate('Home')
        }
        catch(err){
            setError(err.message);
        }
    }

    return  <View style={style.view}>
                <Input label="Email" value={email} onChangeText={setEmail}></Input>
                <Input label="Password" value={password} onChangeText={setPassword} secureTextEntry></Input>
                {
                    error ? 
                    <Text style={{ color:'red' }}>{error}</Text>
                    : null
                }
                <Button style={style.button} title="S'inscire" onPress={() => SignUp() }></Button>
                <TouchableOpacity onPress={() =>  navigation.navigate('Signin')}>
                    <Text style={style.text}>Already have an account? Sign In</Text>
                </TouchableOpacity>
            </View>
   
};

const style = StyleSheet.create({
    view: {
        backgroundColor: '#F6F6F6',
    },
    button:{
        paddingRight: 10,
        paddingLeft: 10,
        marginTop: 30
    },
    text:{
        paddingLeft: 10,
        marginTop: 20,
        color: 'black',
    }
});

export default SignupScreen;