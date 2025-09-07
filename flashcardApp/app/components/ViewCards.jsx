import AsyncStorage from "@react-native-async-storage/async-storage"
import { useCallback, useState } from "react"
import { Button, View, Text, Alert, Modal, StyleSheet } from "react-native"
import { useFocusEffect } from "@react-navigation/native"

export default function ViewCards({navigation, route}){

    const [cards, setCards]= useState([])
    const [currentIndex, setCurrentIndex] = useState(route.params? route.params.index:0)
    const [showAnswer, setShowAnswer] = useState(false);
    const [total, setTotal] = useState(0);

    

    const getCards = async()=>{
        try{
            const cardData = await AsyncStorage.getItem('flashCards');
            const cardArr = cardData? JSON.parse(cardData): [];

            setCards(cardArr);
            setTotal(cardArr.length)
        }
        catch(err)
        {
            Alert.alert('Error in retrieving flashcards', err.message)
        }
    }

    useFocusEffect(
        useCallback(()=>{
            getCards();
        }, [])
    )

    const nextHandler = ()=>{
            setShowAnswer(false);
            setCurrentIndex(currentIndex+1);
    }

    const prevHandler = ()=>{
        setShowAnswer(false);
        setCurrentIndex(currentIndex-1);
    }

    return(
        <View style={styles.background}>
            <View style={styles.back}>
                <Button color='#5280bc' title="Back" onPress={()=>{navigation.navigate('Home')}}/>
            </View>
            {
                cards.length>0?(
                    <>
                    <Text style={styles.heading}>Flashcard {currentIndex+1} of {total}</Text>
                    <View style={styles.card}>
                        <View style={styles.textInfo}>
                            <Text style={styles.question}>Q: {cards[currentIndex].question}</Text>
                            {
                                showAnswer && (
                                    <Text style={styles.answer}>A: {cards[currentIndex].answer}</Text>
                                ) 
                            }
                            </View>
                            {
                            !showAnswer && (
                                <View style={styles.show}>
                                    <Button color='#5280bc' title="Show Answer" onPress={()=>setShowAnswer(true)}/>
                                </View>
                            )
                            }

                            {
                                showAnswer && (
                                <View style={styles.show}>
                                    <Button color='#5280bc' title="Hide Answer" onPress={()=>setShowAnswer(false)}/>
                                </View>
                            )
                            }


                            <View style={styles.edit}>
                                <Button color='#5280bc' title="Edit" onPress={()=>{navigation.navigate('EditCard', {index: currentIndex})}}/>
                            </View>


                        <View style={styles.info}>
                            { 
                            currentIndex > 0 && <View style={styles.previous}>
                                <Button color='#5280bc' title="Previous" onPress={prevHandler}/>
                            </View> 
                            }

                            {
                            currentIndex < cards.length-1 && <View style={styles.next}>
                                <Button color='#5280bc' title="Next" onPress={nextHandler}/>
                            </View>
                            }
                        </View>
                    </View>
                    </>
                ):(
                    <View style={styles.noInfo}>
                        <Text style={styles.noText}>No flashcards added</Text>
                    </View>
                )
            }
        </View>
    )

}

const styles = StyleSheet.create({
        background: {
            backgroundColor: 'white',
            width: '100%',
            height: '100%',
        },

        back: {
            width: 80,
            alignSelf: 'flex-start',
            marginTop: 10,
            marginBottom: 10,
            marginLeft: 10,
        },

        card:{
            padding: 5,
        },

        edit: {
            width: 200,
            alignSelf: 'center',
            marginTop: 10,
        },

        info:{
            flexDirection: 'row',
            padding: 10,
            marginTop: 30,
        },

        previous:{
            width: 100,
            marginRight: 'auto',
        },

        textInfo:{
            borderColor: '#5280bc',
            borderWidth: 2,
            alignSelf: 'center',
            width: 300,
            marginTop: 15,
            marginBottom: 10,
            height: 100,
            width: 400,
            padding: 10,
        },

        question:{
            marginTop: 'auto',
            marginBottom: 'auto',
            fontSize: 16,
        },

        answer:{
            marginTop: 'auto',
            marginBottom: 'auto',
            fontSize: 16,
            color: 'grey'
        },

        next:{
            width: 70,
            marginLeft: 'auto',
        },

        show:{
            width: 200,
            alignSelf: 'center',
            marginTop: 10,
            marginBottom: 5
        },

        heading: {
            textAlign: 'center',
            fontFamily: 'Arial',
            fontSize: 16,
            fontStyle: 'italic',
            marginTop: 35,
        },

        noInfo:{

        },

        noText:{
            textAlign: 'center',
            fontSize: 18,
            fontFamily: 'Arial'
        }

    })