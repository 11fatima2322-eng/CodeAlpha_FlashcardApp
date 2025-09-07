import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect, useState } from "react"
import {Button, Image, View, Text, ScrollView, Modal, Alert, StyleSheet} from "react-native"
export default function Homepage({navigation}){

    const [showModel, setShowModel] = useState(false);
    const [numCards, setNumCards] = useState(0);

    const removeHandler = async()=>{
        setShowModel(false)
        await AsyncStorage.removeItem('flashCards')
        Alert.alert('All flashcards deleted');
        setNumCards(0);
    }

    useEffect(()=>{
        const loadData = async()=>{
        const cardData = await AsyncStorage.getItem('flashCards');
        const cards = JSON.parse(cardData);
        if(cards!=null) setNumCards(cards.length);
    }
        loadData();
        }, [])

    return(
        <ScrollView style={styles.background}> 
                        
            <View style={styles.addCard}>
                <Button  color='#5280bc' title="Add Flashcard" onPress={()=>{navigation.navigate('AddCard')}}/>
            </View>                   

            <View style={styles.logo}>
                <View style={styles.imageView}>
                    <Image style={styles.image} source={require('../../assets/images/logo.png')}/>
                </View>
                <Text style={styles.logoText}>Knowledge, one card at a time</Text>
            </View>                       

            <View style={styles.home}>
                <Text style={styles.text}>Total flashcards: {numCards}</Text>
                <View style={styles.deleteButton}>
                    <Button color='#b73939f1' title="Delete all cards" onPress={()=>setShowModel(true)}/>
                </View>
                <View style={styles.viewButton}>
                    <Button color='#5280bc' title="View Cards" onPress={()=>navigation.navigate('ViewCards')}/>
                </View>
            </View>                      
                        
            <Modal 
                transparent={true} 
                animationType="none" 
                visible={showModel}
            >
                <View style={styles.outerContainer}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalText}>Delete all flashcards?</Text>
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
            
        </ScrollView>
        
    )
}

const styles = StyleSheet.create(
    {
        background: {
            backgroundColor: 'white',
            padding:10,
            width: '100%',
            height: '100%',
        },

        
        addCard: {
            width: 150,
            alignSelf: 'flex-end',
            marginTop: 10,
            marginBottom: 10,
            marginRight: 5,
        },

        
        logo: {
            alignItems: 'center',
            padding: 10,
            
        },

        imageView: {
            marginTop: 15,
            
        },

        image: {
            height: 300,
            width: 190,
            
        },

        logoText:{
             fontSize: 18,
             marginTop: -80,
             textAlign: 'center',
             fontFamily: 'cursive', 
        },

        
        home: {
            flex: 1,
            textAlign: 'center',
            marginTop: 35,
        },

        text:{
            flex: 1,
            fontSize: 14,
            textAlign: 'center',
            marginTop: 10,

        },

        deleteButton:{
            flex: 2,
            width: 170,
            alignSelf: 'center',
            marginTop: 10,
        },

        viewButton: {
            flex: 2,
            width: 170,
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
        
    }
)