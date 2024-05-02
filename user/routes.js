import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Theme  = createNativeStackNavigator()
import { GetDocIDFromUserID } from "../API/Firebase/getIDfromPlate";
import { useState } from "react";

// Screen
import UserHome from "./mainhome";
import Userinfo from "../screen/notification";
// import Report1 from "../paperwork/report/1";
import SetAppointment from "./calendar";
import Report1 from "../paperwork/report/1";
import Senko from "../screen/EWallet/routes";
// import VoiceCallPage from "../screen/call";
import Chat from "../screen/call";


export default function UserRoutes({ route }){
    
    // const [id2,setID]=useState()
    // console.log(user_id);
    const {id}=route.params
    // const user_id = async ()=>{
    //     setID(await GetDocIDFromUserID(id))
    // }
    // user_id
    // console.log(id.id);
    return(
        <Theme.Navigator initialRouteName="UserHome"  screenOptions={{headerShown:false}} >
            <Theme.Screen name="UserHome" component={UserHome} initialParams={{id}}/>
            <Theme.Screen name="Senko" component={Senko} initialParams={{id}}/>
            <Theme.Screen name="Notification" component={Userinfo} options={{headerShown:true}} initialParams={{id}}/>
            <Theme.Screen name="Calendar" component={SetAppointment} initialParams={{id}}/>
            <Theme.Screen name="Report" component={Report1} options={{headerShown:true}}/>
            <Theme.Screen name="Chat" component={Chat}/>
        </Theme.Navigator>
    )
}