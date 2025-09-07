import { Text, View } from "react-native";
import Homepage from './components/Homepage'
import AddCard from './components/AddCard'
import ViewCards from './components/ViewCards'
import EditCard from './components/EditCard'
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function Index() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Homepage}  options={{headerShown: false}}/>
      <Stack.Screen name="AddCard" component={AddCard} options={{headerShown: false}}/>
      <Stack.Screen name="ViewCards" component={ViewCards} options={{headerShown: false}}/>
      <Stack.Screen name="EditCard" component={EditCard} options={{headerShown: false}}/>
    </Stack.Navigator>
  );
}
