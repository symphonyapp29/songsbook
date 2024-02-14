import React, { useEffect, useState,useCallback } from 'react';
import { View, Text,SafeAreaView, ScrollView, Image, Modal, StyleSheet,FlatList,Dimensions, TouchableOpacity,ActivityIndicator, Platform, Alert,Pressable} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Fonts from '../helpers/Fonts';
import { useFocusEffect } from '@react-navigation/native';
import {DataTable, Divider,Button,Card,Avatar} from  "react-native-paper";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { selectSong,setSongType,setSongs,setSongsDonated,setTriconType,setPaymentModuleType } from '@actions';
const { width, height } = Dimensions.get('screen');
//import Icon from 'react-native-ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import getApi from "@apis/getApi";
import { GlobalStyles, Colors, isValidEmail, isValidMobile, } from '@helpers'
import {
  OtrixContainer, OtrixHeader, OtrixContent, OtrixDivider, OtrixAlert, OtrixLoader
} from '@component';
import { Input } from "native-base";
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,//
} from '@react-native-google-signin/google-signin';
import { logfunction } from "@helpers/FunctionHelper";
import RazorpayCheckout from 'react-native-razorpay';
//25:00:3A:55:64:75:03:6C:48:4E:76:2A:C5:C0:DA:42:DB:68:A2:24

//f8:66:e3:ed:17:4e:2d:5e:32:4e:56:cb:ca:36:84:d3:b7:4a:33:31

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
const HindiSongsScreen = (props) => { 
  const [formData, setData] = React.useState({ type:null, firstName: null, lastName: null, email: null, mobileNumber: null, password: null, cpassword: null, submited: false, type: null, message: null, loading: false });
    const [songsList, setSongsList] = useState([]); 
    const [showLoader,setShowLoader]=useState(true);
    const [custmerData,setCustmerData] = React.useState(null);
    const [userAccess,setUserAccess] = React.useState(null);
    const [triconType1,setTriconType1] = React.useState(null);
    //const [songsDonated, setSongsDonated] = useState('false');
    const [modalVisible, setModalVisible] = React.useState(false);
    const [emailRequired, setEmailRequired] = React.useState(false);
    const [validEmail, setValidEmail] = React.useState('');
    const [isPayment, setIsPayment] = React.useState('');


    useEffect(() => {
          GoogleSignin.configure({
            webClientId: '326347457067-je6b2fel9sgvrnuvik95vfki3pc4u3e6.apps.googleusercontent.com',
            scopes: ['profile', 'email'],
            offlineAccess: true
        });
    
    }, [props.navigation]);

    useFocusEffect(
      useCallback(() => {
        async function getUserData(){
          //AsyncStorage.setItem('userProfile',JSON.stringify(data[0].data[0]));
          await AsyncStorage.getItem('userProfile').then(data=>{
            if(data){
              setCustmerData(JSON.parse(data));
              setIsPayment(JSON.parse(data).payment_status);
            }else{
              setIsPayment('');
            }
          });
         }
         getUserData();
      }, []))

     _googleAuth = async () => {
      //console.log('Calling...');
      try {
        // await GoogleSignin.signIn().then(data=>{
        //   console.log("2");
        //   console.log(data)
        // },error=>{
        //   console.log("1");
        //   console.log(error);
        // })
           const userInfo = await GoogleSignin.signIn();
          //console.log(userInfo);
          // //logfunction("Google response ", userInfo)

          if (userInfo.idToken != '') {

              let email = userInfo.user.email;
              let name = userInfo.user.name;
              let device_id = '';//self.httpService.getter('oneSignalId')
              let registered_by = 'google';
              let image = userInfo.user.photo ? userInfo.user.photo : '';

              let sendData = new FormData();
              sendData.append("email", email)
              sendData.append("name", name)
              sendData.append("device_id", device_id)
              sendData.append("registered_by", registered_by)

              sendData.append("password", userInfo.user.id)
              sendData.append("creation", 'G')
              sendData.append('firebase_token', userInfo.idToken)

              //console.log(JSON.stringify(sendData));

              setData({
                  ...formData,
                  loading: true
              });

              //login to our server 🧛🏻‍♀️
              try {
                getApi.postJSData(
                      'https://adapp.symphonygospelteam.com/service_login/nsignup',
                      sendData,
                  ).then((data => {
                    //console.log(JSON.stringify(data[0]));
                    //console.log(JSON.stringify(data[1]));
                      //logfunction("Social RESPONSE ", response)
                     
                          //logfunction("RESPONSE ", 'Success')
                          setData({
                              ...formData,
                              email: null,
                              password: null,
                              loading: false
                          });
                          //props.doLogin(response, navTo);
                          if(data[0].data.length>0 && data[0].data[0].id && data[0].data[0].id!=null){
                            //setModalVisible(false);
                            AsyncStorage.setItem('userProfile',JSON.stringify(data[0].data[0]));
                            //this.isPayment = data[0].data[0].payment_status;
                            setIsPayment(data[0].data[0].payment_status);
                            if(data[0].data[0].payment_status==1){
                              
                              AsyncStorage.setItem("mainSongBook",JSON.stringify([]));
                              AsyncStorage.setItem("mainSongBookOrginalData",JSON.stringify([]));
                              AsyncStorage.setItem("mainSongBookSortedData",JSON.stringify([]));
                              AsyncStorage.setItem("childrenSongBook",JSON.stringify([]));
                              AsyncStorage.setItem("childrenSongBookSortedData",JSON.stringify([]));
                              AsyncStorage.setItem("childrenSongBookOrginalData",JSON.stringify([]));
                            }else{
                              AsyncStorage.setItem("mainSongBook",JSON.stringify([]));
                              AsyncStorage.setItem("mainSongBookOrginalData",JSON.stringify([]));
                              AsyncStorage.setItem("mainSongBookSortedData",JSON.stringify([]));
                              AsyncStorage.setItem("childrenSongBook",JSON.stringify([]));
                              AsyncStorage.setItem("childrenSongBookSortedData",JSON.stringify([]));
                              AsyncStorage.setItem("childrenSongBookOrginalData",JSON.stringify([]));
                            }
                            
                            //self.httpService.showToast(data[1].response.message);
                            //updateSongs(data[0].data[0]);
                          }
                      
                      
                  }));
              } catch (error) {
                  //logfunction("Error", error)
                  setData({
                      ...formData,
                      loading: false
                  });
              }

              //  this.setState({
              // socialName: userInfo.user.name,
              // socialEmail: userInfo.user.email,
              // creation_mode: 'G',
              // social_link: userInfo.user.photo,
              //  });
              // const data = new FormData()
              // data.append("email", userInfo.user.name)
              // data.append("name", userInfo.user.email)
              // data.append("fcm_key", this.state.fcmToken)
              // this.props.socialLogin(data, this.state.returnTo, this.state.stringReturn);
          }
      } catch (error) {
        //console.log(2);
        //console.log(error.code);
          //logfunction("Errors ", error)
      }
  }

  signin = async () =>{
    setModalVisible(true);
  }

  payment = async () =>{
      await AsyncStorage.getItem('userProfile').then(user=>{
        if(user){
          user = JSON.parse(user);
          var options = {
            description: 'Symphony Gospel Team',
            image: 'data:image/png;base64,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',
            currency: 'INR',
            key: 'rzp_live_YzjXKRGrQc5KkH', //'rzp_test_sczJuQC9MiEjRs',
            amount: 20000,
            name: 'Jeevaswaralu Full Songs',
            //order_id: '',//Replace this with an order_id created using Orders API.
            prefill: {
              email: user.email,
              contact: user.telephone,
              name: user.firstname+' '+user.lastname
            },
            theme: {color: '#f76406'},
            //redirect: false,
            // config: {
            //     display: {
            //       hide: [
            //       { method: 'paylater' },
            //       { method: 'emi' },
            //      // { method: 'upi' },
            //       { method: 'wallet' }
            //     ],
            //     preferences: { show_default_blocks: true }
            //     }
            //   }
          }
          try{
            RazorpayCheckout.open(options).then((data) => {
              updatePayment(data,user);
              
              // AsyncStorage.setItem("mainSongBook",JSON.stringify([]));
              // AsyncStorage.setItem("mainSongBookOrginalData",JSON.stringify([]));
              // AsyncStorage.setItem("mainSongBookSortedData",JSON.stringify([]));
              // AsyncStorage.setItem("childrenSongBook",JSON.stringify([]));
              // AsyncStorage.setItem("childrenSongBookSortedData",JSON.stringify([]));
              // AsyncStorage.setItem("childrenSongBookOrginalData",JSON.stringify([]));
              // getSongs();
              //getChildrenSongs(user);
        
            }).catch((error) => {
              // handle failure
              //console.log(error);
              Alert.alert('Error:', error.error.description, [
                  {text: 'OK', onPress: () => {}},
              ]);
            });
          }catch(error){
              console.log(error);
          }



        }
      });

    
   

  }

  updatePayment = (paymentdetails,user) =>{
    //console.log(JSON.stringify(paymentdetails));
    let sendData = new FormData();
    sendData.append("user_id", user.id)
    sendData.append("email", user.email)
    sendData.append("name", user.first_name)
    sendData.append("payment_id", paymentdetails.razorpay_payment_id)
    sendData.append("device_id", user.email)
    sendData.append("total_cost", 200)
    setData({
        ...formData,
        loading: true
    });
    //login to our server 🧛🏻‍♀️
    try {
      getApi.postJSData(
            'https://adapp.symphonygospelteam.com/service_symphony/razor_payment_update',
            sendData,
        ).then((data => {
          //console.log(JSON.stringify(data));
          //console.log(JSON.stringify(data));
            //logfunction("Social RESPONSE ", data)
            if(data[0].data.length>0 && data[0].data[0].id && data[0].data[0].id!=null){
              AsyncStorage.setItem('userProfile',JSON.stringify(data[0].data[0]));
              //this.isPayment = data[0].data[0].payment_status;
              setIsPayment(data[0].data[0].payment_status);
              if(data[0].data[0].payment_status==1){
                
                AsyncStorage.setItem("mainSongBook",JSON.stringify([]));
                AsyncStorage.setItem("mainSongBookOrginalData",JSON.stringify([]));
                AsyncStorage.setItem("mainSongBookSortedData",JSON.stringify([]));
                AsyncStorage.setItem("childrenSongBook",JSON.stringify([]));
                AsyncStorage.setItem("childrenSongBookSortedData",JSON.stringify([]));
                AsyncStorage.setItem("childrenSongBookOrginalData",JSON.stringify([]));
                getSongs();
              }else{
                AsyncStorage.setItem("mainSongBook",JSON.stringify([]));
                AsyncStorage.setItem("mainSongBookOrginalData",JSON.stringify([]));
                AsyncStorage.setItem("mainSongBookSortedData",JSON.stringify([]));
                AsyncStorage.setItem("childrenSongBook",JSON.stringify([]));
                AsyncStorage.setItem("childrenSongBookSortedData",JSON.stringify([]));
                AsyncStorage.setItem("childrenSongBookOrginalData",JSON.stringify([]));
              }
              
              //self.httpService.showToast(data[1].response.message);
              //updateSongs(data[0].data[0]);
            }
        }));
    } catch (error) {
        //logfunction("Error", error)
        setData({
            ...formData,
            loading: false
        });
    }
  }



    // const displayLoader = () => {
    //   return (
    //     <>
    //     <View style={styles.centerSection}>
    //       <View style={styles.bottomIconContainer}>
    //       <ActivityIndicator animating={true} color='black' />
    //        <Text style={{color:'#000000',marginLeft:10}}>{toastMessage} </Text>
    //         </View>
    //         </View>
    //         </>
    //   );
    // };
    const showSubscribeButton = () => {
      return (
        <>
        <View style={styles.bottomSection}>
          <View style={styles.bottomIconContainer}>
          <OtrixContent>
            {/* <Button style={{}} onPress={signin}> */}
            <Button style={{}} onPress={_googleAuth}>
                      <Text style={styles.buttonText}>Subscribe</Text>
            </Button>
          </OtrixContent>
            </View>
            </View>
            <OtrixDivider size={'md'} />
            </>
      );
    };
    const showPaymentButton = () => {
      return (
        <>
        <View style={styles.bottomSection}>
          <View style={styles.bottomIconContainer}>
          <OtrixContent>
            <Button style={{marginTop:5}} onPress={payment}>
                      <Text style={styles.buttonText}>Pay with RazorPay</Text>
            </Button>
          </OtrixContent>
            </View>
            </View>
            <OtrixDivider size={'md'} />
            </>
      );
    };
    const updateSongs = () => {
      return (
        <>
        <View style={styles.bottomSection}>
          <View style={styles.bottomIconContainer}>
          <OtrixContent>
            <Button style={{marginTop:5}} onPress={getSongs}>
                      <Text style={styles.buttonText}>Update Songs</Text>
            </Button>
          </OtrixContent>
            </View>
            </View>
            <OtrixDivider size={'md'} />
            </>
      );
    };
    const confirmClick = () =>{
          if(formData.email == '' || formData.email ==null){
              setEmailRequired(true);
              return true;
          }else{
              setEmailRequired(false);
              let sendData = new FormData();
              sendData.append("email", formData.email)
              sendData.append("name", formData.email)
              sendData.append("device_id", formData.email)
              sendData.append("registered_by", 'google')
              setData({
                  ...formData,
                  loading: true
              });
              //login to our server 🧛🏻‍♀️
              try {
                getApi.postJSData(
                      'https://adapp.symphonygospelteam.com/service_login/nsignup',
                      sendData,
                  ).then((data => {
                    
                    //console.log(JSON.stringify(data));
                      //logfunction("Social RESPONSE ", data)
                      if(data[0].data.length>0 && data[0].data[0].id && data[0].data[0].id!=null){
                        setModalVisible(false);
                        AsyncStorage.setItem('userProfile',JSON.stringify(data[0].data[0]));
                        //this.isPayment = data[0].data[0].payment_status;
                        setIsPayment(data[0].data[0].payment_status);
                        if(data[0].data[0].payment_status==1){
                          
                          AsyncStorage.setItem("mainSongBook",JSON.stringify([]));
                          AsyncStorage.setItem("mainSongBookOrginalData",JSON.stringify([]));
                          AsyncStorage.setItem("mainSongBookSortedData",JSON.stringify([]));
                          AsyncStorage.setItem("childrenSongBook",JSON.stringify([]));
                          AsyncStorage.setItem("childrenSongBookSortedData",JSON.stringify([]));
                          AsyncStorage.setItem("childrenSongBookOrginalData",JSON.stringify([]));
                        }else{
                          AsyncStorage.setItem("mainSongBook",JSON.stringify([]));
                          AsyncStorage.setItem("mainSongBookOrginalData",JSON.stringify([]));
                          AsyncStorage.setItem("mainSongBookSortedData",JSON.stringify([]));
                          AsyncStorage.setItem("childrenSongBook",JSON.stringify([]));
                          AsyncStorage.setItem("childrenSongBookSortedData",JSON.stringify([]));
                          AsyncStorage.setItem("childrenSongBookOrginalData",JSON.stringify([]));
                        }
                        
                        //self.httpService.showToast(data[1].response.message);
                        //updateSongs(data[0].data[0]);
                      }
                  }));
              } catch (error) {
                  //logfunction("Error", error)
                  setData({
                      ...formData,
                      loading: false
                  });
              }
              
          }
  }
  const getChildrenSongs = (user)=> {
    
    let sendData = new FormData();
    sendData.append("email", user.email)
    sendData.append("user_id", user.id)
    sendData.append("device_id", '')
    setData({
        ...formData,
        loading: true
    });

    //login to our server 🧛🏻‍♀️
    try {
      getApi.postJSData(
            'https://adapp.symphonygospelteam.com/service_symphony/get_children_songs',
            sendData,
        ).then((data1 => {
          let data:any= data1[0].data;
          let temp = data1[0].data;
          let originalData = [];
          // this.items = temp;
          temp.forEach((x) => {
            originalData.push(Object.assign({}, x));
          });
          AsyncStorage.setItem("childrenSongBook",JSON.stringify(temp));
          AsyncStorage.setItem('childrenSongBookOrginalData',JSON.stringify(originalData));
          temp.sort(function(a, b) {
            return parseFloat(a.index_no) - parseFloat(b.index_no);
          });
          AsyncStorage.setItem('childrenSongBookSortedData',JSON.stringify(temp));
          AsyncStorage.setItem('CHILDREN_SONGS',JSON.stringify(temp));
          

          props.navigation.navigate('TeluguSongsScreen');  
        }));

  } catch (error) {
    //logfunction("Error", error)
    setData({
        ...formData,
        loading: false
    });
  }
  }
  const getSongs = async ()=> {
    await AsyncStorage.getItem('userProfile').then(user=>{
      
       user = JSON.parse(user);
      let sendData = new FormData();
      sendData.append("email", user.email)
      sendData.append("user_id", user.id)
      sendData.append("device_id", '')
      setData({
          ...formData,
          loading: true
      });
  
      //login to our server 🧛🏻‍♀️
      try {
        getApi.postJSData(
              'https://adapp.symphonygospelteam.com/service_symphony/get_main_songs',
              sendData,
          ).then((data1 => {
            //console.log((data1));
            let data:any= data1[0].data;
            //console.log(data);
            let temp = data1[0].data;
            let originalData = [];
            // this.items = temp;
            temp.forEach((x) => {
              originalData.push(Object.assign({}, x));
            });
            AsyncStorage.setItem("mainSongBook",JSON.stringify(temp));
            AsyncStorage.setItem('mainSongBookOrginalData',JSON.stringify(originalData));
            temp.sort(function(a, b) {
              return parseFloat(a.index_no) - parseFloat(b.index_no);
            });
            AsyncStorage.setItem('mainSongBookSortedData',JSON.stringify(temp));
            AsyncStorage.setItem('TOTAL_SONGS',JSON.stringify(temp));
            
            getChildrenSongs(user);
          }));
  
    } catch (error) {
      //logfunction("Error", error)
      setData({
          ...formData,
          loading: false
      });
    }
    });
  
}
    const openSongPage = (video)=> {
      //props.selectSong(song);
      //props.setSongType('telugu');
      props.navigation.navigate('VideoPlayerScreen',{
        selectedVideo: video
      });
    }

  return (
    <>
    <SafeAreaView style={{backgroundColor:'#fff',height:'100%'}}>
        {/* <View style={{width: '100%',
              height: '85%',
              position: 'absolute',
              justifyContent: 'center',
              alignItems: 'center',zIndex:99999}}>
          <Text>No data Found</Text>
          <Text style={{color:'red'}}>{isPayment}</Text>
        </View> */}
          {custmerData && custmerData.id && custmerData.id!=''? <View style={{padding:10}}>

          {isPayment==='0'?<View>
          <Image
                  source={require('../assets/images/razorpay.jpeg')}
                  style={{width: 30, height: 30, tintColor: 'white'}}
                />
                <Text style={{color:'#000'}}>Make a payment to enjoy full songs</Text>
                <Text style={{color:'#000'}}>Total Payment (₹ 200/-) </Text>
          </View>:null}
          {isPayment!=='0'?<View>

                <Text style={{color:'#000'}}>Already purchased</Text>
          </View>:null}

          </View>:null}

          {!(custmerData && custmerData.id && custmerData.id!='')? <View style={{padding:10}}>
          {isPayment===''?<View>
            <Text style={{color:'#000'}}>ప్రభువైన యేసుక్రీస్తు నామంలో సింఫని గాస్పల్ టీమ్ నుండి మీకు శుభములు. సుమారు 30 సంవత్సరాలలో
    దేవుని కృపను బట్టి నేను రచించి, స్వరపరచిన వాక్యాధార గీతాల పుస్తకం “జీవస్వరాలు” App రూపంలో మీకు
    అందుబాటులోకి తెచ్చినందుకు సంతోషిస్తున్నాం. ఈ App మీకు Trail Version లో 20 పాటలతో ఉచితంగా
    ఇవ్వబడింది.</Text>
    
    <Text style={{color:'#000'}}>తగిన మొత్తాన్ని అన్ లైన్ లో చెల్లించి అన్ని పాటలతో కూడిన పూర్తి పుస్తకాన్ని పొందండి. భవిష్యత్ లో
    పుస్తకంలో చేర్చే పాటలు కూడా ఎప్పటికప్పుడు మీకు అప్డేట్ అవుతాయి.</Text> 
    
    <Text style={{color:'#000'}} >ప్రపంచవ్యాప్తంగా ప్రాచుర్యం పొంది, ప్రజలకు ఆదరణ - ఆశీర్వాదం కలిగిస్తున్న, సుళువుగా నేర్చుకొని
    పాడుకోగలిగిన ఈ అర్ధసహిత వాక్యాధార గీతాలు మీకు తోడుగా ఉండి మిమ్మల్ని ధైర్యపరచి నడిపించాలని
    ఆకాంక్షిస్తూ.</Text>
    
    <Text style={{color:'#000'}}>మీ స్టీవెన్సన్</Text>
    
    <Text style={{color:'#000'}}>గమనిక: ఉచితంగా పొందాలని ఆశించకండి. మా పరిచర్యకు ప్రోత్సాహకరంగా, మీకు దీవెనకరంగా ఉండాలంటే
    తగిన మొత్తాన్ని సంతోషంగా చెల్లించి App ను పొందండి.</Text>
    
    </View>:null}

          </View>:null}


        <View>
        
        <View style={styles1.centeredView}>
       <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          
          //setModalVisible(!modalVisible);
        }}>
        <View style={styles1.centeredView}>
          <View style={styles1.modalView}>
            <Text style={styles1.modalText}>Confirm Your Email</Text>
            <Input variant="outline" placeholder='Email Address' style={GlobalStyles.textInputStyle}
                        keyboardType="email-address"
                        onChangeText={(value) => { setData({ ...formData, email: value })}}
                    />
                    {emailRequired?<Text style={{color:'#d10000'}}>Email is Required</Text>:null}
                    {validEmail!=''?<Text style={{color:'#d10000'}}>{validEmail}</Text>:null}
            <Pressable
              style={[styles1.button, styles1.buttonClose]}
              onPress={() => confirmClick()}>
              <Text style={styles1.textStyle}>Confirm</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
       </View>
      <ScrollView style={{marginBottom:30}}>
      
          <FlatList style={{paddingBottom:50}}
            data={songsList}
            renderItem={({item}) => 
            <View style={{padding:10}}>
                    <Card mode="contained" onPress={()=>openSongPage(item)}>
                      <Card.Cover source={{ uri: item.thumb_url }} />
                      <Text style={{paddingTop:5, paddingLeft:5,color:'#000', fontFamily:Fonts.Font_Medium, fontSize:15}}>{item.small_description}</Text>
                    </Card>
                  <Divider style={{ backgroundColor: '#5b5c5c' }} />
            </View>}
          />
      </ScrollView>
      
      
      </View>
      {isPayment===''?showSubscribeButton():null}
      {isPayment==='0'?showPaymentButton():null}
      {isPayment==='1'?updateSongs():null}
    </SafeAreaView>
    </>
    
  )
}

function mapStateToProps(state) {
  return {
      selectedSong: state.song.selectedSong,
      songType: state.song.songType,
      songsDonated: state.song.songsDonated,
      triconType: state.song.triconType,
      paymentModuleType: state.song.paymentModuleType
  }
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({
      selectSong,
      setSongs,
      setSongType,
      setSongsDonated,
      setTriconType,
      setPaymentModuleType
  }, dispatch)
);
export default connect(mapStateToProps, mapDispatchToProps) (HindiSongsScreen);

const styles = StyleSheet.create({
  bottomSection: {
     borderTopColor: '#000000',
   borderWidth: 0.5,
     width: width-20,
     alignItems: 'center',
     //paddingVertical: 10,
     margin:10,
     
    // position:"absolute",
    // top:height-1,
    // bottom:0,
     backgroundColor:'#ffffff'
  },
  centerSection:{
    borderTopColor: '#000000',
    borderTopWidth: 0.5,
    width: width,
    alignItems: 'center',
    paddingVertical: 20,
    position:'absolute',
    top:height-200,
    backgroundColor:'#ffffff',
    zIndex:99999
  },
  bottomIconContainer: {
    flexDirection: 'row',
    //justifyContent: 'space-between',
    width: '80%',
    marginLeft:-50
  },
  donateButton:{
    height: Platform.isPad === true ? wp('6%') : wp('11%'),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    shadowColor: 'rgba(0,0,0, .4)',
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 2
  },
  buttonText: {
    fontFamily: Fonts.Font_Bold,
    color: Colors().themeColor,
    fontSize: Platform.isPad === true ? wp('2.5%') : wp('3.5%'),
  },
    table:{
        backgroundColor: Colors().themeColor,
        color:'white',
        height:45
    },
    headSection:{
        borderBottomWidth:2,
        borderColor:'black',
        paddingBottom:15,
        
    },
    titleHeading:{
        marginTop:50,
        fontWeight:'bold',
        marginHorizontal:167,
    },
    tableHeading:{
        //fontWeight:'bold',
        color:'white',
        fontSize:18
    },
    header:{
        padding:15,
        borderColor: 'white',
        borderLeftWidth: 1,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderRightWidth: 1
    },
      item: {
        flex:1,
        paddingLeft: 12,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 12,
        fontSize: 18,
        color:'black',
        width:width,
        //fontFamily:'suranna'
      }
      
});
const styles1 = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth:2,
    borderColor:Colors().themeSecondColor,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    marginTop:30,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: Colors().themeColor,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    fontFamily: Fonts.Font_Bold,
    marginBottom: 15,
    textAlign: 'center',
  },
});