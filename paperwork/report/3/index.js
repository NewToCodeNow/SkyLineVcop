import {View,Text,TouchableOpacity,SafeAreaView,ScrollView,Image} from 'react-native'
import {useState,useEffect,useMemo} from 'react'
import {styles} from "./styles"
import {doc,updateDoc} from "firebase/firestore"
import { db } from '../../../API/Firebase/firebaseConfig'
import GetUser from '../../../API/Firebase/get'
import React from 'react'

export default function Report3({ navigation, route }){
    const {item}= route.params
    const {id}=route.params
    const [dataFetched, setDataFetched] = useState(false);
    // const getUserMemoized = useMemo(() => GetUser, [item.id, id]);
    // let day
    const [date,setDate]=useState("")
    const [month,setMonth]=useState("")
    const [year,setYear]=useState("")
    const [organization,setOrganization]=useState("")
    const [violator,setViolator]=useState()

    const day = item.date.split("/")
    setDate(day[0])
    setMonth(day[1])
    setYear(day[2])
    const [bornDate,setBD]=useState()
    const [bornMonth,setBM]=useState()
    const [bornYear,setBY]=useState()
    const [job,setVJOB]=useState()
    const [address,setAddress]=useState()

    // useEffect(() => {
    //     const getData = async () => {
    //       try {
    //         const [user_info, author_info] = await Promise.all([GetUser(item.id), GetUser(id)]);
    //         setOrganization(user_info.name);
    //         const [day, month, year] = user_info.birthdate.split("/");
    //         setBD(day);
    //         setBM(month);
    //         setBY(year);
    //         setVJOB(user_info.job);
    //         setAddress(user_info.address);
    //         setAName(author_info.name);
    //         // setAJOB(author_info.job);
    //       } catch (err) {
    //         console.error(err);
    //       }
    //     };
    //     getData();
    //   }, []);

    const fetchDataOnce = async () => {
        try {
          const [user_info, author_info] = await Promise.all([GetUser(item.id), GetUser(id)]);
          setOrganization(user_info.name);
          const [day, month, year] = user_info.birthdate.split("/");
          setBD(day);
          setBM(month);
          setBY(year);
          setVJOB(user_info.job);
          setAddress(user_info.address);
          setAName(author_info.name);
          // setAJOB(author_info.job);
          setDataFetched(true); // Set the flag to true once data is fetched
        } catch (err) {
          console.error(err);
        }
      };
    
      // Call fetchDataOnce only if data hasn't been fetched yet
      if (!dataFetched) {
        fetchDataOnce();
      }
      
      const [username, setAName] = useState("");
      const [AJob, setAJOB] = useState("");
      const units = "Đơn vị 3";

    const rule = 3
    const rule2 = 4
    const title = "..........."
    const fine = 4000000
    const today = new Date()
    const tdate = today.getDate()
    const hour = today.getHours()
    const tmonth = today.getMonth()+1
    const tyear = today.getFullYear()
    const position = "Người có thẩm quyền"

    const handle_report = async()=>{
        const user = await GetUser(item.id);
        const user_violate =user.violate // Make sure police_violate is an array
        console.log(user_violate);
        const newReport = {
          type:2,
          author_id: id,
          date: `${tdate}/${tmonth}/${tyear}`,
          time: `${hour}:${today.getMinutes()}`,
          fine:fine,
          violator:violator
        };
    
        // Update the police_violate array
        user_violate.unshift(newReport);
        console.log(user_violate);
    
        // Update the Firestore document
        const docRef = doc(db, "vcop", item.id);
        await updateDoc(docRef, {
          violate: user_violate,
        });
    
        // setViolate(police_violate); 
        navigation.navigate("Done");
    }



    return(
        <ScrollView style={{backgroundColor:"white"}}>
            <View style={{marginTop:"10%"}}>
                
                <View style={styles.leading}>
                    <Text>Số:......QĐ-XPVPHC</Text>
                    <View style={styles.alignCenter}>
                        <Text style={styles.black}>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</Text>
                        <Text style={styles.black}>Độc lập- Tự do-Hạnh phúc</Text>
                    </View>
                </View>

                <Text style={styles.judgedDate}>Đà Nẵng Ngày {date}tháng {month}năm {year}</Text>

                <Text style={[styles.Bred,{marginTop:"10%"}]}>QUYẾT ĐỊNH</Text>
                <Text style={styles.Bblack}>Xử phạt vi phạm hành chính không lập biên bản</Text>

                <View style={{marginLeft:"6%",marginTop:"10%"}}>
                    <Text>Căn cứ Điều {rule} Luật xử lý vi phạm hành chính</Text>
                    <Text>Căn cứ {rule2}: {title} </Text>
                    <Text>Căn cứ Văn bản giao quyền số .../... ngày ... tháng ... năm ... (nếu có),</Text>
                    <View>
                        <Text>Tôi: {username} </Text>
                        <Text>Chức vụ: {position}</Text>
                        <Text>Đơn vị: {units}</Text>
                    </View>


                    <Text style={styles.Bblack}>QUYẾT ĐỊNH:</Text>

                    <Text style={{marginTop:"5%"}}><Text style={styles.black}>Điều 1.</Text> Xử phạt vi phạm hành chính theo thủ tục xử phạt không lập biên bản đối với:</Text>
                    <Text>Ông (Bà)/Tổ chức: {organization}</Text>
                    <View>
                    <Text>Ngày {bornDate} tháng {bornMonth} năm sinh {bornYear} </Text>
                    <Text>Quốc tịch: Việt Nam</Text>
                    </View>
                    <Text>Nghề nghiệp/lĩnh vực hoạt động: {job}</Text>
                    <Text>Địa chỉ: {address}</Text>
                    <Text>Giấy CMND hoặc hộ chiếu/Quyết định thành lập hoặc ĐKKD số:{item.id}</Text>
                    <Text>Cấp ngày: XX / XX / XXXX Nơi cấp: XXXXXX</Text>
                    <View style={{flexDirection:"row"}}>
                    <Text>Đã thực hiện hành vi vi phạm hành chính </Text>
                    <Text>{item.violator}</Text>
                    </View>
                    <Text>Địa điểm xảy ra vi phạm: đường Lê Văn Hiến</Text>
                    <Text>Các tình tiết liên quan đến giải quyết vi phạm (nếu có): </Text>

                    <Text style={{marginTop:"5%"}}><Text style={styles.black}>Điều 2.</Text> Các hình thức xử phạt và biện pháp khắc phục hậu quả được áp dụng:</Text>
                    <Text>1. Hình thức xử phạt chính:</Text>
                    <Text>Mức phạt: {fine}</Text>
                    <Text>2. Hình thức xử phạt bổ sung: </Text>
                    <Text>3. Biện pháp khắc phục hậu quả:</Text>

                    <Text style={{marginTop:"5%"}}><Text style={styles.black}>Điều 3.</Text> Quyết định này có hiệu lực thi hành kể từ ngày {tdate} / {tmonth} /{tmonth} và được lập thành 03 bản có nội dung và giá trị như nhau, 01 bản giao cho người vi phạm hoặc đại diện tổ chức vi phạm, 01 bản giao cho Kho bạc Nhà nước nơi thu tiền phạt, 01 bản lưu hồ sơ cơ quan xử lý vi phạm hành chính..</Text>

                    
                </View>

                <View style={styles.sign}>
                    <View style={{alignItems:"center",top:"-3%"}}>
                        <Text style={styles.black}>Quyết định này đã được giao cho</Text>
                        <Text style={styles.black}> người vi phạm hoặc đại diện</Text>
                        <Text style={styles.black}>cho tổ chức vi phạm lúc {hour} giờ ngày</Text>
                        <Text style={styles.black}>{tdate}//{tmonth}//{tyear}</Text>
                        <Text >(Người nhận ký ghi rõ họ tên)</Text>
                    </View>

                    <View style={{alignItems:"center"}}>
                        <Text style={styles.black}>Người ra quyết định</Text>
                        <Text>(Ký ghi rõ họ tên và đóng dấu)</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.btn} onPress={()=>handle_report}>
                    <Text>THÔNG BÁO CHO NGƯỜI VI PHẠM</Text>
                </TouchableOpacity>
            
            </View>
        </ScrollView>
        
    )
}