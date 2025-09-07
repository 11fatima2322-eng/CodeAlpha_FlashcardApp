import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState } from 'react';
import {View, TextInput, Button, Alert, StyleSheet, Text} from "react-native"
export default function AddCard({navigation}){

    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    const addHandler = async()=>{

        if(question.trim()==='' || answer.trim()===''){
            Alert.alert('Enter a question and answer!')
            return;
        }

        try{
            const newCard = {
                question,
                answer
            }

            console.log('New card: ',newCard)

            const cardData= await AsyncStorage.getItem('flashCards');
            console.log('Card data: ',cardData)
            
            let cards = cardData ? JSON.parse(cardData) : [];
            console.log('Cards:', cards);

            cards.push(newCard);
            console.log('pushed new card');
            console.log(cards)

            await AsyncStorage.setItem('flashCards', JSON.stringify(cards));
            Alert.alert('Flashcard added successfully!');
            setQuestion('');
            setAnswer('');
        }
        
        catch(err){
            Alert.alert('Error adding flashcard', err.message)
        }

    }

    return(
        <View style={styles.background}>
            
            <View style={styles.backButton}>
                <Button  color='#5280bc' title="Back" onPress={()=>{navigation.navigate('Home')}}/>
            </View>

        
            <View style={styles.mainConatiner}>
                <View style={styles.inputContainer}>
                    <View style={styles.inView}>
                        <Text style={styles.text}>Q: </Text>
                        <TextInput style={styles.input} placeholder="Enter Question" onChangeText={(val)=>setQuestion(val)} value={question}/>
                    </View>
                    <View style={styles.inView}>
                        <Text style={styles.text}>A: </Text>
                        <TextInput style={styles.input} placeholder="Enter Answer" onChangeText={(val)=>setAnswer(val)} value={answer}/>
                    </View>
                </View>
                <View style={styles.addButton}>
                    <Button  color='#5280bc' title="Add Flashcard" onPress={addHandler}/>
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({

    background:{
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
    },  

    backButton: {
        width: 80,
        alignSelf: 'flex-start',
        marginTop: 15,
        marginLeft: 15,
    },

    mainConatiner: {
        width: 350,
        height: 230,
        borderWidth: 2,
        borderColor: '#265ca2ff',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 100,
        padding: 15,
    },

    inputContainer: {
        width: 300,
        height: 150,
        marginLeft: 'auto',
        marginRight: 'auto',
    },

    inView: {

        flexDirection: 'row',
        marginTop: 10,
    },

    text : {
        fontSize: 16,
        marginTop: 8,
        color: '#0f3669ff'
    },

    input: {
        borderBottomWidth: 2,
        borderBottomColor: 'grey',
        width: 250,
    },

    addButton: {
        width: 150,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: -10,

    }

})