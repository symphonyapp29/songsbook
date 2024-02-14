import React, { useEffect, useState,useCallback } from 'react';
import { View, Text,SafeAreaView, ScrollView, StyleSheet,FlatList,Dimensions, TouchableOpacity,ActivityIndicator, Platform} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Fonts from '../helpers/Fonts';
import { useFocusEffect } from '@react-navigation/native';
import {DataTable, Divider,Button} from  "react-native-paper";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { selectSong,setSongType,setSongs,setSongsDonated, setPaymentModuleType } from '@actions';
const { width, height } = Dimensions.get('screen');
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import getApi from "@apis/getApi";
import { GlobalStyles, Colors, isValidEmail, isValidMobile, } from '@helpers'
import {
  OtrixContainer, OtrixHeader, OtrixContent, OtrixDivider, OtrixAlert, OtrixLoader
} from '@component';

const EnglishSongsScreen = (props) => { 
    const [toastMessage, setToastMessage] = useState('');  
    const [songsList, setSongsList] = useState([]); 
    const [filteredSongsList, setFilteredSongsList] = useState([]); 
    const [songIndexData, setSongIndexData] = useState([]); 
    const [custmerData,setCustmerData] = React.useState(null);
    const [userAccess,setUserAccess] = React.useState(null);

    useFocusEffect(
      useCallback(() => {
       
    fetchData();
        async function fetchData() {
          await AsyncStorage.getItem('CHILDREN_SONGS').then(data=>{
            if(data){
              //console.log(data);
              let allSongs = JSON.parse(data);
              //console.log(allSongs);
              // let songsData = allSongs[0].song_json;
              // songsData = songsData.replaceAll('\"','"');
              // songsData = songsData.replaceAll('"[','[');
              // songsData = songsData.replaceAll(']"',']');
              // if(songs_donated==''){
              //   let songs = JSON.parse(songsData);
              //   let limitedSongs = [];
              //   let count = 0;
              //   songs.map((song,index)=>{
              //     if(count<20 && song.song[0].url!=''){
              //       count++;
              //       limitedSongs.push(song);
              //     }
              //   });
              //   props.setSongs(limitedSongs);
                 //setSongsList(limitedSongs);
              //   //teluguSongIndex(limitedSongs);
              //   setFilteredSongsList(limitedSongs);
              // }else{
                props.setSongs(allSongs);
                setSongsList(allSongs);
                //teluguSongIndex(JSON.parse(songsData));
                //checkSongsUpdate();
              //}
            }else{
              AsyncStorage.setItem('SONG_UPDATE_VERSION','1');
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
               if(response[1].response.status === 1){
                 await AsyncStorage.setItem('TOTAL_SONGS', JSON.stringify(response[0].data));
               }
           }));
       } catch (error) {
         console.log(error);
       }
       }
        async function callAPI() {
           try {
            setToastMessage('Songs Loading, Wait a minute...');
            getApi.getData(
                "getSongs",
                [],
            ).then(( async response => {
                if(response.status === 1){
                  setToastMessage('Songs loaded successfully');
                  setTimeout(()=>{
                    setToastMessage('');
                  },2000);
                  await AsyncStorage.setItem('TOTAL_SONGS', JSON.stringify(response.data));
                  let songsData = response.data[0].song_json;
                  songsData = songsData.replaceAll('\"','"');
                  songsData = songsData.replaceAll('"[','[');
                  songsData = songsData.replaceAll(']"',']');
                  if(songs_donated===''){
                    let songs = JSON.parse(songsData);
                    let limitedSongs = [];
                    let count = 0;
                    songs.map((song,index)=>{
                      if(count<20 && song.song[0].url!=''){
                        count++;
                        limitedSongs.push(song);
                      }
                    });
                    setSongsList(limitedSongs);
                    //teluguSongIndex(limitedSongs);
                    setFilteredSongsList(limitedSongs);
                  }else{
                    setSongsList(JSON.parse(songsData));
                    teluguSongIndex(JSON.parse(songsData));
                  }
                }else{
                  setToastMessage('Songs loading failed');
                }
            }));
        } catch (error) {
          console.log(error);
        }
        }
        //checkSongsDonated();
        
      }, [])
    )

    useEffect(() => {
      props.navigation.setOptions({
        headerRight: () => (
          <>
          <TouchableOpacity style={[{ flex: 0, marginRight:20 }]} onPress={() => searchSong()}>
              <Icon name='search' size={25} color="#ffffff" />
          </TouchableOpacity>
            </>
        ),
      });
      

    }, [props.navigation]);

    const displayLoader = () => {
      return (
        <>
        <View style={styles.centerSection}>
          <View style={styles.bottomIconContainer}>
          <ActivityIndicator animating={true} color='black' />
           <Text style={{color:'#000000',marginLeft:10}}>{toastMessage} </Text>
            </View>
            </View>
            </>
      );
    };
    const showPaymentButton = () => {
      return (
        <>
        <View style={styles.bottomSection}>
          <View style={styles.bottomIconContainer}>
          <OtrixContent>
            <Button style={{marginTop:-10}} onPress={() => openSongRegistrationPage()}>
                      <Text style={styles.buttonText}>Donate for all songs</Text>
            </Button>
          </OtrixContent>
            </View>
            </View>
            </>
      );
    };

    
    const searchSong = () => {
      props.setSongType('english');
      
      props.navigation.navigate('SongSearchScreen');  
    }

    const openSongRegistrationPage = () => {
     props.setPaymentModuleType('song_book');
      //props.navigation.navigate('PaymentScreen');  
       //console.log(custmerData);
      //
      //props.setPaymentModuleType('song_book');

      if(custmerData){
        props.navigation.navigate('PaymentScreen',{paymentModuleType:'song_book'});
      }else{
        props.navigation.push("LoginScreen",{paymentModuleType:'song_book'});
        //props.navigation.navigate('PaymentScreen',{paymentModuleType:'song_book'});
      }
      
      //props.navigation.navigate('SongRegisterScreen');
      

    }

    const openSongPage = (song)=> {
      props.selectSong(song);
      props.setSongType('english');
      try{
        TrackPlayer.reset();
     }catch(error){
        console.log(error);
     }
      props.navigation.navigate('Home');
    }

    const indexClicked = (songs,value) => {
        let filteredList = [];
        songs.map((data, index) => {
          if(data && data.index_letter === value){
            filteredList.push(data);
          }
          if(index === songs.length-1){
            setFilteredSongsList(filteredList);
          }
      });
   }
    const teluguSongIndex = (songs) => {
      if(songs.length>20){
        let teluguSongIndexData = [];
        songs.map((data, index) => {
        let i = teluguSongIndexData.findIndex(song=> song === data.index_letter);
        if(i===-1){
          teluguSongIndexData.push(data.index_letter);
        }
        if(index===songs.length-1){
          setSongIndexData(teluguSongIndexData);
          indexClicked(songs,songs[0].index_letter);
        }
      });
      
    }
  }

  return (
    <>
    <SafeAreaView style={{backgroundColor:'#fff',height:'100%'}}>
        <View>
        {/* {(songsList.length>20)?<ScrollView horizontal>
            <View style={{marginLeft:-20}}>
            <DataTable style={styles.table} >
                <DataTable.Header>
                {songIndexData.map((data, index) => {
                    return <DataTable.Title key={index} style={styles.header} onPress={ () => indexClicked(songsList,data) }> <Text style={styles.tableHeading}>{data}</Text></DataTable.Title>
                })}
                </DataTable.Header>
            </DataTable>
            </View>
        </ScrollView>:null} */}
        <View>
                    <View style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                    <Text style={{flex:1, paddingLeft: 15, paddingTop: 10, paddingBottom: 10, paddingRight: 12, width:width, fontFamily: Fonts.Font_Bold, color:'#000'}}>Song</Text>
                    <Text style={{fontFamily: Fonts.Font_Bold, paddingRight: 10, color:'#000'}}>Song No</Text>
                    </View>
                  <Divider style={{ backgroundColor: '#5b5c5c' }} />
            </View>
      <ScrollView style={{marginBottom:30}}>
      
          <FlatList style={{paddingBottom:50}}
            data={songsList}
            renderItem={({item,index}) => 
            <View>
                    <View style={{display:'flex', flexDirection:'row'}}>
                    <Text style={styles.item} onPress={()=>openSongPage(item)}>{(index+1)+". "+ item.song_title_index}
                    </Text>
                    {/* {item.song[0].url!==''?<Icon style={{position:'absolute',right:15,top:15}} name='musical-notes' size={20} color="#000000" />:''} */}
                    <Text style={{position:'absolute',right:15,top:15,fontFamily: Fonts.Font_Bold, color:'#000'}}>{item.song_no}</Text>
                    </View>
                  <Divider style={{ backgroundColor: '#5b5c5c' }} />
            </View>}
          />
      </ScrollView>
      {/* {toastMessage!==''?displayLoader():null} */}
      {/* {!(userAccess && userAccess?.song_book=='1')?showPaymentButton():null} */}
      </View>
      
    </SafeAreaView>
    </>
    
  )
}

function mapStateToProps(state) {
  return {
      selectedSong: state.song.selectedSong,
      songType: state.song.songType,
      songsDonated: state.song.songsDonated,
      paymentModuleType: state.song.paymentModuleType
  }
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({
      selectSong,
      setSongs,
      setSongType,
      setSongsDonated,
      setPaymentModuleType
  }, dispatch)
);
export default connect(mapStateToProps, mapDispatchToProps) (EnglishSongsScreen);

const styles = StyleSheet.create({
  bottomSection: {
    borderTopColor: '#000000',
    borderTopWidth: 0.5,
    width: width,
    alignItems: 'center',
    paddingVertical: 20,
    position:'absolute',
    top:height-200,
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