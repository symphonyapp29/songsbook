import React, { useEffect, useState } from 'react'
import { View, Text,SafeAreaView, ScrollView, StyleSheet,FlatList,Dimensions,Keyboard} from 'react-native';
import { Button, DataTable, Divider,Searchbar,TextInput } from  "react-native-paper";
const { width } = Dimensions.get('screen');
import Ionicons from 'react-native-vector-icons/Ionicons';
import { bindActionCreators } from "redux";
import { selectSong,setSongType } from '@actions';
import { connect } from 'react-redux';
import Fonts from "@helpers/Fonts";
import { Colors } from './../helpers';
const teluguSongIndexList =  require('../common/telugu-song-index-list.json');
const englishSongIndexList =  require('../common/english-song-index-list.json');
const hindiSongIndexList =  require('../common/hindi-song-index-list.json');
const newSongIndexList =  require('../common/new-song-index-list.json');

const SongSearchScreen = (props) => {  
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [keyboardStatus, setKeyboardStatus] = useState('');
  const [autoFocus, setAutoFocus] = useState(true);
  //let navigation = props.navigation;
  useEffect(() => { 
      setFilteredDataSource(props.selectedSongsList);
        const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
          setKeyboardStatus('Keyboard Shown');
        });
        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
          setKeyboardStatus('Keyboard Hidden');
        });
    
        return () => {
          showSubscription.remove();
          hideSubscription.remove();
        };
      
  }, [props.navigation]);

  const goback = (props) =>{
    props.navigation.goBack()
  }
  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    setAutoFocus(false);
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = props.selectedSongsList.filter(function (item) {
        // Applying filter for the inserted text in search bar
        let itemData = item.song_title_english ? ''+item.song_title_english.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        //console.log(item);
        let itemDataSongNumber = item.song_no ? ''+item.song_no : '';
        if(itemData.search(textData)>-1){
          return (itemData.search(textData)>-1);
        }else if(itemDataSongNumber.search(textData)>-1){
          return (itemDataSongNumber.search(textData)>-1);
        }{
          return false;
        }
        // if(itemData.search(textData) > -1){
        //   return itemData.search(textData) > -1;
        // }else{
        //   let itemData = item.song_no
        //   ? item.song_no
        //   : '';
        //   return itemData.search(textData) > -1;
        // }
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(props.selectedSongsList);
      setSearch(text);
    }
  };

  const ItemView = ({ item }) => {
    return (
      <>
      {(props.songType==='english' || props.songType==='hindi')?(<View>
                    <View style={{display:'flex', flexDirection:'row'}}>
                    <Text style={styles.item} onPress={()=>getItem(item)}>{(index+1)+". "+ item.song_title_index}
                    </Text>
                    {/* {item.song[0].url!==''?<Icon style={{position:'absolute',right:15,top:15}} name='musical-notes' size={20} color="#000000" />:''} */}
                    <Text style={{position:'absolute',right:15,top:15,fontFamily: Fonts.Font_Bold, color:'#000'}}>{item.song_no}</Text>
                    </View>
                  <Divider style={{ backgroundColor: '#5b5c5c' }} />
            </View>):null}
      {(props.songType==='telugu' || props.songType==='new')?(<Text style={styles.itemTelugu} onPress={() => getItem(item)}>
        {item.song_no}
        {'.  '}
        {item.song_title_index.toUpperCase()}
      </Text>):null}
      {/* <Text style={{position:'absolute',right:5,top:15}}>
        {item.song[0].url!==''?<Ionicons name='musical-notes' size={20} color="#000000" />:''}
      </Text> */}
      </>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  const getItem = (item) => {
    // Function for click on an item
    //alert('Id : ' + item.song_no + ' Title : ' + item.song_title_index);
   // navigation.goback();
   try{
      TrackPlayer.reset();
   }catch(error){
      console.log(error);
   }
    props.selectSong(item);
    //props.setSongType('telugu');
    props.navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={{backgroundColor:'#fff',height:'100%'}}>
      <View>
        <View style={{display:'flex', flexDirection:'row',backgroundColor:Colors().themeColor,alignItems:'center'}}>
          <Button onPress={() => goback(props)} style={{marginLeft:-10,marginTop:3}}><Ionicons name='arrow-back' size={25} color="#ffffff" /></Button>
            <TextInput
              autoFocus={autoFocus}
              style={styles.textInputStyle}
              onChangeText={(text) => searchFilterFunction(text)}
              onSubmitEditing={Keyboard.dismiss}
              value={search}
              cursorColor='#ffffff'
              color='#ffffff'
              selectionColor="#ffffff"
              placeholder="Search Here"
              placeholderTextColor="#FFFFF7"
              activeUnderlineColor="red"
              borderColor="red"
              theme={{
                colors: {
                      text: 'white'
                  }
            }}

            />
        </View>
        <View>
                    <View style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                    <Text style={{flex:1, paddingLeft: 15, paddingTop: 10, paddingBottom: 10, paddingRight: 12, width:width, fontFamily: Fonts.Font_Bold, color:'#000'}}>Song</Text>
                    <Text style={{fontFamily: Fonts.Font_Bold, paddingRight: 10, color:'#000'}}>Song No</Text>
                    </View>
                  <Divider style={{ backgroundColor: '#5b5c5c' }} />
            </View>
        <ScrollView>
        <FlatList style={{marginBottom:80}}
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={({item,index}) => 
          <View>
                  <View style={{display:'flex', flexDirection:'row'}}>
                  <Text style={styles.item} onPress={()=>getItem(item)}>{(index+1)+". "+ item.song_title_index}
                  </Text>
                  {/* {item.song[0].url!==''?<Icon style={{position:'absolute',right:15,top:15}} name='musical-notes' size={20} color="#000000" />:''} */}
                  <Text style={{position:'absolute',right:15,top:15,fontFamily: Fonts.Font_Bold, color:'#000'}}>{item.song_no}</Text>
                  </View>
                <Divider style={{ backgroundColor: '#5b5c5c' }} />
          </View>}
        />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingBottom: 60,
    marginBottom: 60
  },
  itemStyle: {
    padding: 10,
    color:'#000000',
    fontSize:18,
    fontFamily: Fonts.Font_Reguler
  },
  itemTelugu: {
      flex:1,
      paddingLeft: 12,
      paddingTop: 10,
      paddingBottom: 10,
      paddingRight: 12,
      fontSize: 18,
      color:'black',
      width:width,
      //fontFamily:'suranna'
  },
  textInputStyle: {
    height: 60,
    borderWidth: 1,
    paddingLeft: -10,
    marginLeft: -15,
    marginTop: 0,
    backgroundColor: Colors().themeColor,
    borderColor:Colors().themeColor,
    tintColor:'#ffffff',
    width: width,
    fontWeight:'700',
    color:'#fff',
    textColor:'#fff',
    underlineColor:Colors().themeColor
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
function mapStateToProps(state) {
  return {
      selectedSong: state.song.selectedSong,
      songType: state.song.songType,
      selectedSongsList: state.song.selectedSongsList
  }
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({
      selectSong,
      setSongType
  }, dispatch)
);
export default connect(mapStateToProps, mapDispatchToProps) (SongSearchScreen);