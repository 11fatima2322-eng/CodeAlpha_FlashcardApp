import { useEffect, useState } from "react";
import {View, Button, TextInput, Alert, Text, StyleSheet, Modal} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function EditCard({navigation, route}){
    const index = route.params.index;
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [cards, setCards] = useState([]);
    const [showModel, setShowModel] = useState(false);
    
    const getCard = async()=>{
        const cardData = await AsyncStorage.getItem('flashCards');
        const cardArr = JSON.parse(cardData);
        console.log('cards arr', cardArr)
        setCards(cardArr)
        setQuestion(cardArr[index].question);
        setAnswer(cardArr[index].answer)
    }

    const removeHandler = async()=>{
        setShowModel(false)
        const updatedArr = cards.filter((_, i)=>i !== index)
        console.log(updatedArr)
        await AsyncStorage.setItem('flashCards', JSON.stringify(updatedArr))
        navigation.navigate('ViewCards', {index: index})
    }

    useEffect(()=>{
        getCard();
    },[])

    const updateHandler = async()=>{
        const cardUpdated = {question, answer};
        console.log('cards: ', cards);
        console.log('Updated: ', cardUpdated)

        let newArr = cards.map((card, i)=>{
            return index === i? cardUpdated : card
        })

        console.log(newArr);
        setCards(newArr);
        console.log(cards)
        await AsyncStorage.setItem('flashCards', JSON.stringify(newArr));
        Alert.alert('Flashcard updated successfully!');
        console.log('Updated successfully')
        getCard();

    }

    return(
        <View style={styles.background}>

            <View style={styles.backButton}>
                <Button  color='#5280bc' title="Back" onPress={()=>{navigation.navigate('ViewCards',{index: index})}}/>
            </View>

            <View style={styles.mainConatiner}>
                <View style={styles.inputContainer}>

                    <View style={styles.inView}>
                        <Text style={styles.text}>Q: </Text>
                        <TextInput style={styles.input} value={question} onChangeText={(val)=>setQuestion(val)}/>
                    </View>

                    <View style={styles.inView}>
                        <Text style={styles.text}>A: </Text>
                        <TextInput style={styles.input} value={answer} onChangeText={(val)=>setAnswer(val)}/>
                    </View>

                </View>   

                <View style={styles.saveButton}>
                    <Button  color='#5280bc' title="Save" onPress={updateHandler}/>
                </View>    

                <View style={styles.delete}>
                    <Button  color='#b73939f1' title="Delete" onPress={()=>setShowModel(true)}/>
                </View>

            </View>

            <Modal 
                transparent={true} 
                animationType="none" 
                visible={showModel}
            >
                <View style={styles.outerContainer}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalText}>Delete flashcard?</Text>
                        <View style={styles.modalButtons}>
                            <View style={styles.modalCancel}>
                                <Button color='#4980c8ff' style={styles.buttons} title="Cancel" onPress={()=>setShowModel(false)}/>
                            </View>
                            <View style={styles.modalDelete}>
                                <Button color='#b73939f1' title="Delete" onPress={removeHandler}/>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>

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

    saveButton: {
        width: 100,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: -30,

    },

    delete:{
            width: 100,
            alignSelf: 'center',
            marginTop: 10,
        },

    outerContainer: {
            backgroundColor: 'white',
            width: 300,
            height: 120,
            alignSelf: 'center',
            margin: 'auto',
            backgroundColor: '#4b7ec2ff',
            padding: 5,
       },

       modalContainer: {
            borderWidth: 2,
            borderColor: '#4980c8ff',
            flex: 1,
            backgroundColor: '#e7ebf0ff',
       },

       modalText: {
        textAlign: 'center',
        flex: 1,
        fontSize: 16,
        marginTop: 15,
       },

       modalButtons: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: -25,
       },

       modalCancel: {
            width: 80,
            marginLeft: 'auto',
            marginRight: 40,
            marginTop: 10,

       },

       modalDelete: {
            width: 80,
            marginRight: 'auto',
            marginLeft: 40,
            marginTop: 10,
       }
        



})