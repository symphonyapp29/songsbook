import React, { useEffect } from "react";
import {
    View,
    TouchableOpacity,
    Text,
    useWindowDimensions,
    StyleSheet,
    StatusBar,
    ScrollView,
    Image,
    Alert,
    Linking,
    ToastAndroid,
    SafeAreaView,
    Modal,
    Pressable
} from "react-native";
import { Input } from "native-base"
import { connect } from 'react-redux';
import {
    OtrixContainer, OtrixHeader, OtrixDivider, OtirxBackButton, OtrixContent, OtrixLoader,OtirxHomeButton
} from '@component';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { GlobalStyles, Colors } from '@helpers';
import Fonts from "@helpers/Fonts";
import getApi from "@apis/getApi";
import { logfunction } from "@helpers/FunctionHelper";

import FastImage from 'react-native-fast-image';
import { Button,Card,Avatar,List, Divider } from 'react-native-paper';
import { position } from "native-base/lib/typescript/theme/styled-system";
import { homeScreen } from '../common';
import AsyncStorage from '@react-native-community/async-storage';
import DeviceInfo from 'react-native-device-info';
import { useNetInfo } from "@react-native-community/netinfo";
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getUniqueId, getManufacturer, getDeviceName } from 'react-native-device-info';
import LinearGradient from 'react-native-linear-gradient';
  
function UESIHomeScreen(props) {
    const [state, setState] = React.useState({  email: null, homePageData: [], loading: true, profileImageURL: null });
    const { width } = useWindowDimensions();
    const [expanded, setExpanded] = React.useState(true);
    const handlePress = () => setExpanded(!expanded);
    const netInfo = useNetInfo();
    const [homePageStoredData, setHomeData] = React.useState(null);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [updateAvailable, setUpdateAvailable] = React.useState(false);
    const [emailRequired, setEmailRequired] = React.useState(false);
    const [validEmail, setValidEmail] = React.useState('');
    const [deviceId, setDeviceId] = React.useState('');
    const [deviceName, setDeviceName] = React.useState('');
    const [fcmTocken, setFcmTocken] = React.useState('');

    useEffect(() => {
        async function fetchData() {
            await AsyncStorage.getItem('TOTAL_SONGS').then(data=>{
              if(data){
              }else{
                callAPI();
              }
            });
          }
          async function callAPI() {
             try {
              let sendData = new FormData();
                sendData.append('email', '');
                sendData.append('user_id', '');
                sendData.append('device_id', '');
              getApi.postJSData(
                  "https://adapp.symphonygospelteam.com/service_symphony/get_main_songs",
                  sendData,
              ).then(( async response => {
                //console.log(response[0].data);
                  if(response[1].response.status === 1){
                    await AsyncStorage.setItem('TOTAL_SONGS', JSON.stringify(response[0].data));
                  }
              }));
          } catch (error) {
            console.log(error);
          }
          }
          fetchData();

          async function fetchChildrenData() {
            await AsyncStorage.getItem('CHILDREN_SONGS').then(data=>{
              if(data){
              }else{
                callChildrenSongsAPI();
              }
            });
          }
          async function callChildrenSongsAPI() {
             try {
              let sendData = new FormData();
                sendData.append('email', '');
                sendData.append('user_id', '');
                sendData.append('device_id', '');
              getApi.postJSData(
                  "https://adapp.symphonygospelteam.com/service_symphony/get_children_songs",
                  sendData,
              ).then(( async response => {
                //console.log(JSON.stringify(response))
                  if(response[1].response.status === 1){
                    await AsyncStorage.setItem('CHILDREN_SONGS', JSON.stringify(response[0].data));
                  }
              }));
          } catch (error) {
            console.log(error);
          }
          }
          fetchChildrenData();

    }, []);


    return (
        // <>
        <LinearGradient colors={['#ffad0e', '#f98c0b', '#f86705']}>
        <SafeAreaView style={{height:'100%'}}>
        {/* <View customStyles={{ backgroundColor: Colors().light_white }}>
            <TouchableOpacity style={{position:'absolute',top:10,zIndex:9,left:10}} onPress={() => props.navigation.toggleDrawer()}>
                <OtirxHomeButton />
            </TouchableOpacity>
            </View> */}
            
        <ScrollView>
        
        {/* <View customStyles={{ backgroundColor: Colors().light_white }}> */}
            {/* <TouchableOpacity style={{position:'absolute',top:10,zIndex:9,left:10}} onPress={() => props.navigation.toggleDrawer()}>
                <OtirxHomeButton />
            </TouchableOpacity> */}
            {/* <Image
              source={require("../assets/images/home_screen.jpeg")}
              style={{
                height: 250,
                width: width
              }}
            /> */}
       {/* </View > */}
       <View style={{paddingHorizontal:20,paddingTop:20,paddingBottom:15, display:'flex', flexDirection:'row',justifyContent:'space-between'}}>
        <Card mode="elevated" style={{height:150, width:'48%'}} onPress={() => {props.navigation.navigate('TeluguSongsScreen')}}>
            <Card.Content>
            <Icon style={{textAlign:"center",marginTop:10,paddingBottom:20}} name='book' size={35} color={Colors().themeColor} />
            <Text style={styles.cardTitle}>Main Songs</Text>
            </Card.Content>
        </Card>
        <Card mode="elevated" style={{height:150, width:'48%'}} onPress={() => {props.navigation.navigate('EnglishSongsScreen')}}>
            <Card.Content >
            <Icon style={{textAlign:"center",marginTop:10,paddingBottom:20}} name='child' size={35} color={Colors().themeColor} />
            <Text style={styles.cardTitle}>Children Songs</Text>
            </Card.Content>
        </Card>
       </View>
       <View style={{paddingHorizontal:20,paddingBottom:15, display:'flex', flexDirection:'row',justifyContent:'space-between'}} onPress={() => {props.navigation.navigate('HindiSongsScreen')}}>
        <Card mode="elevated" style={{height:150, width:'48%'}} onPress={() => {props.navigation.navigate('HindiSongsScreen')}}>
            <Card.Content >
            <Icon style={{textAlign:"center",marginTop:10,paddingBottom:20}} name='shopping-basket' size={35} color={Colors().themeColor} />
            <Text style={styles.cardTitle}>Pro Version</Text>
            </Card.Content>
        </Card>
        <Card mode="elevated" style={{height:150, width:'48%'}} onPress={() => {props.navigation.navigate('TermsAndConditionsScreen')}}>
            <Card.Content >
            <Icon style={{textAlign:"center",marginTop:5,paddingBottom:10}} name='music' size={35} color={Colors().themeColor} />
            <Text style={styles.cardTitle}>About Symphony</Text>
            </Card.Content>
        </Card>
       </View>
       <View style={{paddingHorizontal:20,paddingBottom:15, display:'flex', flexDirection:'row',justifyContent:'space-between'}}>
        <Card mode="elevated" style={{height:150, width:'48%'}} onPress={() => {props.navigation.navigate('AboutUsScreen')}}>
            <Card.Content >
            <Icon style={{textAlign:"center",marginTop:5,paddingBottom:10}} name='stack-exchange' size={35} color={Colors().themeColor} />
            <Text style={styles.cardTitle}>About Jeeva Swaralu</Text>
            </Card.Content>
        </Card>
        <Card mode="elevated" style={{height:150, width:'48%'}} onPress={() => {props.navigation.navigate('FeedbackScreen')}}>
            <Card.Content >
            <Icon style={{textAlign:"center",marginTop:10,paddingBottom:25}} name='pencil-square-o' size={35} color={Colors().themeColor} />
            <Text style={styles.cardTitle}>Feedback</Text>
            </Card.Content>
        </Card>
       </View>
       <View style={{paddingHorizontal:20,paddingBottom:10, display:'flex', flexDirection:'row',justifyContent:'space-between'}}>
        <Card mode="elevated" style={{height:150, width:'100%'}} onPress={() => {props.navigation.navigate('ContactUsScreen')}}>
            <Card.Content >
            <Icon style={{textAlign:"center",marginTop:10,paddingBottom:20}} name='phone' size={35} color={Colors().themeColor} />
            <Text style={styles.cardTitle}>Contact</Text>
            </Card.Content>
        </Card>
       </View>
       
       </ScrollView>
       
       </SafeAreaView>
       </LinearGradient>
        // </>

    )
}

function mapStateToProps(state) {
    return {
       
    }
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({

    }, dispatch)
);


export default connect(mapStateToProps, mapDispatchToProps)(UESIHomeScreen);

const styles = StyleSheet.create({
    contentText:{
        fontFamily:Fonts.Font_Reguler,
        fontSize: 15,
        color:'#000000',
        marginTop:10,
        lineHeight:25,
        textAlign:'justify'
    },
    contentTitle:{
        fontFamily:Fonts.Font_Medium,
        fontSize: 15,
        color:'#000000'
    },
    cardTitle:{
        fontFamily:Fonts.Font_Bold,
        fontSize: 17,
        color: Colors().themeColor,
        textAlign:'center'
    },
    box: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: hp('1.5%'),
        backgroundColor: Colors().white,
        marginVertical: hp('1%'),
        marginHorizontal: wp('1%'),
        borderRadius: wp('2%'),
        borderWidth: 0.5,
        borderColor: Colors().custom_gray,
        fontFamily:'Poppins-Medium'
    },
    txt: {
        fontSize: wp('4%'),
        fontFamily: Fonts.Font_Medium,
        color: Colors().text_color,
        textAlign: 'left'
    },
    image: {
        resizeMode: 'contain',
        alignSelf: 'center',
        height: hp('16%'),
        width: wp('30%'),
    },
    ListAccordion:{
        marginTop:-10,
        marginBottom:-10
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