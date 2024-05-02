import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PoliceHome from "./mainhome";
import Working from "../screen/work";
// import DecisionMaker from "../authority/decision_maker";

const Stack = createNativeStackNavigator()

export default function HappyTime({route}){
    const {id}=route.params
    return(
        <Stack.Navigator initialRouteName="home" screenOptions={{headerShown:false}}>
            <Stack.Screen name="home" component={PoliceHome} initialParams={{id}}/>
            <Stack.Screen name="Working" component={Working} initialParams={{id}} options={{headerShown:true}}/>
        </Stack.Navigator>
    )
}