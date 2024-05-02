import { ScrollView,View,Text,TouchableOpacity,TextInput } from "react-native";
import { useState,useEffect } from "react";
import {doc,updateDoc} from "firebase/firestore"
import { db } from "../../../API/Firebase/firebaseConfig";
import GetUser from "../../../API/Firebase/get";
// import Picker from "@react-native-picker/picker"
import RNPickerSelect from 'react-native-picker-select';
import { GetDocIDFromUserID } from "../../../API/Firebase/getIDfromPlate";

export default function Decision0({navigation,route}){
    // const {violator_id} = route.params
    const {id,plateNum}=route.params
    // console.log(id,violator_id);
    const today = new Date()
    const hour = today.getHours()
    const minute = today.getMinutes()
    const day = today.getDate()
    const month = today.getMonth()+1
    const year = today.getFullYear()
    const place = "đường Lê Văn Hiến"
    const [police_name,setPName]=useState("")
    const [position,setPos]=useState("")
    const [violator_name,setVName]=useState("")
    const [address,setAddress]=useState("")
    const [job,setJob]=useState("")
    const [birthdate,setBirth]=useState()
    const [id2,setID]=useState("")
    // const [plateNumber,setPlate]=useState("")
    const [phoneNumber,setPhoneNum]=useState("")
    const author_id = "kQM76I4VHhTr9HicMmni8fMMwH42"
    const [violator,setViolator]=useState()
    // console.log(violator);
    const [violator_docID, setViolatorDocID] = useState("");
    const [violator_info,setV]=useState()

    useEffect(()=>{
        const getData = async ()=>{
            try{
                // const police_info = await GetUser(id)
                if(id2!=0){
                setViolatorDocID( await GetDocIDFromUserID(id2))
                // console.log(violator_docID);
                setV(await GetUser(violator_docID))
                setVName(violator_info.name)
                setAddress(violator_info.address)
                setJob(violator_info.job)
                const birth = violator_info.birthdate.split("/")
                setBirth(birth[2])
                setPhoneNum(violator_info.phoneNumber)
                // console.log(user_info);
               
                // setPName(police_info.name)
                // setPos(police_info.job)
                // setID(user_info.id)
                // setViolate(user_info.violate.length)

                }
            } catch(err){
                console.error(err)
            }
        } 
        getData()
        
    },[id2])

    useEffect(()=>{
        const getData = async ()=>{
            try{
                const police_info = await GetUser(id)
                // console.log(user_info);
               
                setPName(police_info.name)
                setPos(police_info.job)
                // setID(user_info.id)
                // setViolate(user_info.violate.length)

                
            } catch(err){
                console.error(err)
            }
        } 
        getData()
        
    },[id])

    const handle_decision = async()=>{
        
            const author = await GetUser(author_id);
            const author_violate = author.violate // Make sure police_violate is an array
            console.log(author_violate);
            const newReport = {
              type:4,
              police_id: id,
              id: violator_docID,
              date: `${day}/${month}/${year}`,
              time: `${hour}:${minute}`,
              violator: violator,
              plateNum:plateNum
            };
        
            // Update the police_violate array
            author_violate.unshift(newReport);
            console.log(author_violate);
        
            // Update the Firestore document
            const docRef = doc(db, "vcop", author_id);
            await updateDoc(docRef, {
              violate: author_violate,
            });
        
            // setViolate(police_violate); 
            navigation.navigate("Done");
          
    }

    const handleValueChange = (value) => {
        setViolator(value);
        // console.log('Selected option:', value);
      };



    return(
        <ScrollView style={{backgroundColor:"white",flex:1,paddingTop:35,paddingHorizontal:10}}>
            <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                <Text style={{fontSize:11}}>Số:....BB-VPHC</Text>
                <View style={{alignItems:"center"}}>
                    <Text style={{fontSize:12,fontWeight:"bold"}}>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</Text>
                    <Text style={{fontSize:12,fontWeight:"bold"}}>Độc lập - Tự do - Hạnh phúc</Text>
                    <View style={{borderWidth:1,width:150,marginTop:3}}></View>
                </View>
            </View>

            <Text style={{color:"red",fontSize:20,fontWeight:"bold",textAlign:"center",marginTop:30}}>BIÊN BẢN VI PHẠM HÀNH CHÍNH</Text>
            <Text style={{fontSize:11,fontWeight:"bold",textAlign:"center"}}>Trong lĩnh vực giao thông đường bộ, đường sắt</Text>

            <Text style={{fontSize:13,fontWeight:"bold",marginTop:20}} >Hôm nay, hồi {hour} giờ {minute} phút, ngày {day} tháng {month} năm {year}, tại {place}</Text>

            <View style={{flexDirection:"row",justifyContent:"space-between",marginVertical:10}}>
                <Text style={{fontSize:13,fontWeight:"bold"}}>Tôi: {police_name}</Text>
                <Text style={{fontSize:13,fontWeight:"bold"}}>Chức vụ: {position}</Text>
            </View>
            <Text style={{fontSize:13,fontWeight:"bold"}}>Tiến hành lập biên bản VPHC trong lĩnh vực giao thông đường bộ đối với</Text>


            <Text style={{fontSize:13,fontWeight:"bold",marginTop:10}}>Ông (bà) tổ chức :{violator_name} </Text>

          
            <Text style={{fontSize:13,fontWeight:"bold",marginTop:10}}>Địa chỉ: {address}</Text>


            <Text style={{fontSize:13,fontWeight:"bold",marginTop:10}}>Nghề nghiệp(lĩnh vực hoạt động): {job}     Năm sinh:{birthdate}</Text>


               



            <View style={{flexDirection:"row"}}>
            <Text style={{fontSize:13,fontWeight:"bold",marginTop:10}}>Số CMND hoặc hộ chiếu quyết định thành lập ĐKKD: </Text>
            <TextInput style={{top:6}} placeholder="..........." onChangeText={text=>setID(text)}/>
            </View>

            
            <Text style={{fontSize:13,fontWeight:"bold",marginTop:10}}>Ngày cấp: XX/XX/XXXX Nơi cấp: XXXXXXXXX</Text>
            
            
            <Text style={{fontSize:13,fontWeight:"bold",marginTop:10}}>Phương tiện sử dụng khi vi phạm: {plateNum}</Text>

            
            <Text style={{fontSize:13,fontWeight:"bold",marginTop:10}}>Số điện thoại liên lạc:{phoneNumber} </Text>


            <View style={{flexDirection:"row",marginTop:20}}>
                <Text style={{fontSize:13,fontWeight:"bold"}}>Đã có vi phạm hành chính:</Text>
                {/* Droplist */}
                <RNPickerSelect
        onValueChange={handleValueChange}
        style={{marginLeft:40}}
        value={violator}
        placeholder={{ label: 'Lỗi vi phạm', value: null }}
        items={[
          { label: 'Không đội mũ bảo hiểm', value: 'Không đội mũ bảo hiểm' },
          { label: 'Đậu xe không đúng nơi quy định', value: 'Đậu xe không đúng nơi quy định' },
        ]}
      />
            </View>

            <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:20}}>
                <View style={{alignItems:"center"}}>
                    <Text style={{fontSize:10,fontWeight:"bold"}}>CÁ NHÂN VI PHẠM HOẶC ĐẠI DIỆN TỔ CHỨC VI PHẠM</Text>
                    <Text style={{fontSize:10,fontWeight:"bold"}}>(Ký tên, ghi rõ, chức vụ, họ và tên)</Text>
                    {/* Police Sign */}
                </View>

                <View style={{alignItems:"center"}}>
                    <Text style={{fontSize:10,fontWeight:"bold"}}>NGƯỜI LẬP BIÊN BẢN</Text>
                    <Text style={{fontSize:10,fontWeight:"bold"}}>(Ký, ghi rõ họ tên)</Text>
                    {/* Violator Sign */}
                </View>
            </View>

            <TouchableOpacity onPress={handle_decision}  style={{backgroundColor:"#E8ECF4",alignItems:"center",marginHorizontal:40,paddingVertical:20,borderRadius:10,marginTop:100}}>
                <Text>Thông báo cho người vi phạm</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}