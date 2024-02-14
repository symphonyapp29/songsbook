// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/
import React, { useState,useCallback } from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
  ScrollView,
  TouchableOpacity,
  Button,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/core";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import {Divider} from  "react-native-paper";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { OtrixDivider } from '@component';
import { splashlogo,sidenavImage } from './common';
import { selectSong,setSongType,setMagazineType,setSongsDonated,setTriconType } from '@actions';
import Fonts from "@helpers/Fonts";
import Share from 'react-native-share';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { Colors } from './helpers';

const { width } = Dimensions.get('screen');
function AccordionItem({ children, title, titleKey }: AccordionItemPros): JSX.Element {
  const [ expanded, setExpanded ] = useState(false);
  

  function toggleItem() {
    setExpanded(!expanded);
  }

  const body = <View style={styles.accordBody}>{ children }</View>;

  return (
    <View>
      <TouchableOpacity style={[styles.accordHeader,{flex: 1,flexDirection: 'row', justifyContent:"flex-start", alignItems:'center'}]} onPress={ toggleItem }>
        {titleKey==='song-book'?<Icon style={{paddingRight:15,width:40,textAlign:'right'}} name='book' size={28} color="#FFFFFF" />:null}
        {titleKey==='magazines'?<Icon style={{paddingRight:15,width:40,textAlign:'right'}} name='file-pdf-o' size={25} color="#ffffff" />:null}
        {titleKey==='tricon'?<Icon style={{paddingRight:15,width:40,textAlign:'right'}} name='film' size={23} color="#FFFFFF" />:null}
        <View style={{flex: 1}}>
          <Text style={{color:'#FFFFFF',fontSize:16, marginTop:2, marginLeft:3, fontFamily: Fonts.Font_Medium}}>{ title }</Text>
        </View>
      </TouchableOpacity>
      { expanded && body }
    </View>
  );
}

const CustomSidebarMenu = (props) => {
  const navigation = useNavigation();
  const {state, descriptors} = props;
  const [custmerData,setCustmerData] = React.useState({});

  let lastGroupName = '';
  let newGroup = true;
  let sameGroup = true;

  const BASE_PATH =
    'https://www.uesiap.com/';
  const proileImage = splashlogo;

  const navigateToRoute = (route,drawerKey) =>{
    props.setSongType(drawerKey);
    navigation.navigate(route.name);
  }
  const navigateToMagazineRoute = (route,drawerKey) =>{
    navigation.navigate(route.name,{
      magazineType: drawerKey
    });
    
  }

  useFocusEffect(
    useCallback(() => {
      // async function checkSongsDonated() {
      //   await AsyncStorage.getItem('songs_donated').then(data=>{
      //     if(data){
      //       props.setSongsDonated(data);
      //     }
      //   });
      // }

     

    }, [])
  )

  const prepareHomeGroup = (value) => {
    return state.routes?.map((route, index) => {
      const {
        drawerLabel,
        activeTintColor,
        groupName
      } = descriptors[route.key].options;
      return (
        groupName==='home'?
      <DrawerItem
          key={route.key}
          label={
            ({color}) =>
            <>
            <View style={styles.accordHeader1}>
              <Icon style={{paddingRight:15,width:40,textAlign:'right'}} name='home' size={25} color="#ffffff" />
                <View style={{flex: 1,flexDirection: 'row', justifyContent:'space-between'}}>
                  <Text style={{color:'#FFFFFF',fontSize:16, marginTop:2, marginLeft:3,fontFamily:Fonts.Font_Bold}}>{drawerLabel}</Text>
                </View>
                </View>
              </>
          }
          focused={
            state.routes.findIndex(
              (e) => e.name === route.name
            ) === state.index
          }
          onPress={() => navigation.navigate(route.name)}
      />:null
      )
  })
      
  }

  const prepareMainSongsGroup = (value) => {
    return state.routes?.map((route, index) => {
      const {
        drawerLabel,
        activeTintColor,
        groupName
      } = descriptors[route.key].options;
      return (
        groupName==='main-songs'?
      <DrawerItem
          key={route.key}
          label={
            ({color}) =>
            <>
            <View style={styles.accordHeader1}>
              <Icon style={{paddingRight:15,width:40,textAlign:'right'}} name='book' size={25} color="#ffffff" />
                <View style={{flex: 1,flexDirection: 'row', justifyContent:'space-between'}}>
                  <Text style={{color:'#FFFFFF',fontSize:16, marginTop:2, marginLeft:3,fontFamily:Fonts.Font_Bold}}>{drawerLabel}</Text>
                </View>
                </View>
              </>
          }
          focused={
            state.routes.findIndex(
              (e) => e.name === route.name
            ) === state.index
          }
          onPress={() => navigation.navigate(route.name)}
      />:null
      )
  })
      
  }
  const prepareChildrenSongsGroup = (value) => {
    return state.routes?.map((route, index) => {
      const {
        drawerLabel,
        activeTintColor,
        groupName
      } = descriptors[route.key].options;
      return (
        groupName==='children-songs'?
      <DrawerItem
          key={route.key}
          label={
            ({color}) =>
            <>
            <View style={styles.accordHeader1}>
              <Icon style={{paddingRight:15,width:40,textAlign:'right'}} name='child' size={25} color="#ffffff" />
                <View style={{flex: 1,flexDirection: 'row', justifyContent:'space-between'}}>
                  <Text style={{color:'#FFFFFF',fontSize:16, marginTop:2, marginLeft:3,fontFamily:Fonts.Font_Bold}}>{drawerLabel}</Text>
                </View>
                </View>
              </>
          }
          focused={
            state.routes.findIndex(
              (e) => e.name === route.name
            ) === state.index
          }
          onPress={() => navigation.navigate(route.name)}
      />:null
      )
  })
      
  }
  const prepareProVersionGroup = (value) => {
    return state.routes?.map((route, index) => {
      const {
        drawerLabel,
        activeTintColor,
        groupName
      } = descriptors[route.key].options;
      return (
        groupName==='pro-version'?
      <DrawerItem
          key={route.key}
          label={
            ({color}) =>
            <>
            <View style={styles.accordHeader1}>
              <Icon style={{paddingRight:15,width:40,textAlign:'right'}} name='shopping-basket' size={25} color="#ffffff" />
                <View style={{flex: 1,flexDirection: 'row', justifyContent:'space-between'}}>
                  <Text style={{color:'#FFFFFF',fontSize:16, marginTop:2, marginLeft:3,fontFamily:Fonts.Font_Bold}}>{drawerLabel}</Text>
                </View>
                </View>
              </>
          }
          focused={
            state.routes.findIndex(
              (e) => e.name === route.name
            ) === state.index
          }
          onPress={() => navigation.navigate(route.name)}
      />:null
      )
  })
      
  }

const prepareSongBookGroup = (value) => {
  return state.routes?.map((route, index) => {
    const {
      drawerLabel,
      activeTintColor,
      groupName,
      drawerKey
    } = descriptors[route.key].options;
    return (
      groupName==='song-book'?
    <DrawerItem style={{left:5,position:'relative'}}
        key={route.key}
        label={
          ({color}) =>

            <Text style={{color:'#FFFFFF',fontSize:15,paddingTop:-10,marginTop:-10,paddingBottom:-10,marginBottom:-10,marginLeft:12, fontFamily:Fonts.Font_Bold}}>
              {drawerLabel}
            </Text>
        }
        focused={
          state.routes.findIndex(
            (e) => e.name === route.name
          ) === state.index
        }
        activeTintColor={activeTintColor}
        onPress={() =>navigateToRoute(route,drawerKey) }
    />:null
    )
})
    
}

const shareApp = ()=>{
  const shareOptions = {
    message:'\n Jeeva Swaraalu Android App: \n https://play.google.com/store/apps/details?id=com.symphony.jeevaswaralu&hl=en&gl=US\n\n'
  };
  Share.open(shareOptions)
  .then((res) => {
      
  })
  .catch((err) => {
      err && console.log(err);
  });
}

const Login = ()=>{
  
}

const prepareAhareAppGroup = (value) => {
  return state.routes?.map((route, index) => {
    const {
      drawerLabel,
      activeTintColor,
      groupName
    } = descriptors[route.key].options;
    return (
      groupName==='share-app'?
    <DrawerItem
        key={route.key}
        label={
          ({color}) =>
          <>
          <View style={styles.accordHeader1}>
            <Icon style={{paddingRight:15,width:40,textAlign:'right'}} name='share-square-o' size={25} color="#ffffff" />
              <View style={{flex: 1,flexDirection: 'row', justifyContent:'space-between'}}>
                <Text style={{color:'#FFFFFF',fontSize:16, marginLeft:3, marginTop:2, fontFamily:Fonts.Font_Bold}}>{drawerLabel}</Text>
              </View>
              </View>
            </>
        }
        focused={
          state.routes.findIndex(
            (e) => e.name === route.name
          ) === state.index
        }
        onPress={() => shareApp()}
    />:null
    )
})
    
}

const prepareLoginGroup = (value) => {
  return state.routes?.map((route, index) => {
    const {
      drawerLabel,
      activeTintColor,
      groupName
    } = descriptors[route.key].options;
    return (
      groupName==='login'?
    <DrawerItem
        key={route.key}
        label={
          ({color}) =>
          <>
          <View style={styles.accordHeader1}>
            <Icon style={{paddingRight:15,width:40,textAlign:'right'}} name='share-square-o' size={25} color="#ffffff" />
              <View style={{flex: 1,flexDirection: 'row', justifyContent:'space-between'}}>
                <Text style={{color:'#FFFFFF',fontSize:16, marginLeft:3, marginTop:2, fontFamily:Fonts.Font_Bold}}>{drawerLabel}</Text>
              </View>
              </View>
            </>
        }
        focused={
          state.routes.findIndex(
            (e) => e.name === route.name
          ) === state.index
        }
        onPress={() => navigation.navigate(route.name)}
    />:null
    )
})
    
}

const prepareAboutUsGroup = (value) => {
  return state.routes?.map((route, index) => {
    const {
      drawerLabel,
      activeTintColor,
      groupName
    } = descriptors[route.key].options;
    return (
      groupName==='about-us'?
    <DrawerItem
        key={route.key}
        label={
          ({color}) =>
          <>
          <View style={styles.accordHeader1}>
            <Icon style={{paddingRight:15,width:40,textAlign:'right'}} name='stack-exchange' size={25} color="#ffffff" />
              <View style={{flex: 1,flexDirection: 'row', justifyContent:'space-between'}}>
                <Text style={{color:'#FFFFFF',fontSize:16, marginLeft:3, marginTop:2, fontFamily:Fonts.Font_Bold}}>{drawerLabel}</Text>
              </View>
              </View>
            </>
        }
        focused={
          state.routes.findIndex(
            (e) => e.name === route.name
          ) === state.index
        }
        onPress={() => navigation.navigate(route.name)}
    />:null
    )
})
    
}

const prepareFeedbackGroup = (value) => {
  return state.routes?.map((route, index) => {
    const {
      drawerLabel,
      activeTintColor,
      groupName
    } = descriptors[route.key].options;
    return (
      groupName==='feedback'?
    <DrawerItem
        key={route.key}
        label={
          ({color}) =>
          <>
          <View style={styles.accordHeader1}>
            <Icon style={{paddingRight:15,width:40,textAlign:'right'}} name='pencil-square-o' size={25} color="#ffffff" />
              <View style={{flex: 1,flexDirection: 'row', justifyContent:'space-between'}}>
                <Text style={{color:'#FFFFFF',fontSize:16, marginLeft:3, marginTop:2, fontFamily:Fonts.Font_Bold}}>{drawerLabel}</Text>
              </View>
              </View>
            </>
        }
        focused={
          state.routes.findIndex(
            (e) => e.name === route.name
          ) === state.index
        }
        onPress={() => navigation.navigate(route.name)}
    />:null
    )
})
    
}

const prepareContactUsGroup = (value) => {
  return state.routes?.map((route, index) => {
    const {
      drawerLabel,
      activeTintColor,
      groupName
    } = descriptors[route.key].options;
    return (
      groupName==='contact-us'?
    <DrawerItem
        key={route.key}
        label={
          ({color}) =>
          <>
          <View style={styles.accordHeader1}>
            <Icon style={{paddingRight:15,width:40,textAlign:'right'}} name='phone' size={25} color="#ffffff" />
              <View style={{flex: 1,flexDirection: 'row', justifyContent:'space-between'}}>
                <Text style={{color:'#FFFFFF',fontSize:16,marginLeft:3, marginTop:2, fontFamily:Fonts.Font_Bold}}>{drawerLabel}</Text>
              </View>
              </View>
            </>
        }
        focused={
          state.routes.findIndex(
            (e) => e.name === route.name
          ) === state.index
        }
        onPress={() => navigation.navigate(route.name)}
    />:null
    )
})
    
}

const prepareTermsAndConditionsGroup = (value) => {
  return state.routes?.map((route, index) => {
    const {
      drawerLabel,
      activeTintColor,
      groupName
    } = descriptors[route.key].options;
    return (
      groupName==='terms-and-conditions'?
    <DrawerItem
        key={route.key}
        label={
          ({color}) =>
          <>
          <View style={styles.accordHeader1}>
            <Icon style={{paddingRight:15,width:40,textAlign:'right'}} name='music' size={25} color="#ffffff" />
              <View style={{flex: 1,flexDirection: 'row', justifyContent:'space-between'}}>
                <Text style={{color:'#FFFFFF',fontSize:16, marginLeft:3, marginTop:2, fontFamily:Fonts.Font_Bold}}>{drawerLabel}</Text>
              </View>
              </View>
            </>
        }
        focused={
          state.routes.findIndex(
            (e) => e.name === route.name
          ) === state.index
        }
        onPress={() => navigation.navigate(route.name)}
    />:null
    )
})
    
}

const preparePrivacyPolicyGroup = (value) => {
  return state.routes?.map((route, index) => {
    const {
      drawerLabel,
      activeTintColor,
      groupName
    } = descriptors[route.key].options;
    return (
      groupName==='privacy-policy'?
    <DrawerItem
        key={route.key}
        label={
          ({color}) =>
          <>
          <View style={styles.accordHeader1}>
            <Icon style={{paddingRight:15,width:40,textAlign:'right'}} name='file-text-o' size={25} color="#ffffff" />
              <View style={{flex: 1,flexDirection: 'row', justifyContent:'space-between'}}>
                <Text style={{color:'#FFFFFF',fontSize:16, marginLeft:3, marginTop:2, fontFamily:Fonts.Font_Bold}}>{drawerLabel}</Text>
              </View>
              </View>
            </>
        }
        focused={
          state.routes.findIndex(
            (e) => e.name === route.name
          ) === state.index
        }
        onPress={() => navigation.navigate(route.name)}
    />:null
    )
})
    
}

  return (
    
    <SafeAreaView style={{flex: 1}}>
      <View style={{height:120,width:'100%', display:'flex', flexDirection:'row',alignItems:'center',backgroundColor:'#303c7e'}}>
        <View style={{padding:10}}>
        <Image 
          source={splashlogo} 
            style={{width: 80, height: 80, borderRadius: 400/ 2}} 
          />
        </View>
        <View>
              <Text style={{color:'#f01819', fontFamily:Fonts.Font_Bold,fontSize:18}}>JEEVA SWARAALU</Text>
              <Text style={{color:'#dedede', fontFamily:Fonts.Font_Medium,fontSize:16,marginTop:-3}}>AR Stevenson</Text>
              <Text style={{color:'#fec30a', fontFamily:Fonts.Font_Bold,fontSize:14,marginTop:-3}}>Songs Book</Text>
                
        </View>
        
      </View>
      <Divider style={{ backgroundColor: '#fff' }} />
      <DrawerContentScrollView {...props} style={{backgroundColor:'#303c7e'}}>
      <View style={styles.sectionContainer}>
      {prepareHomeGroup()}
    </View>
      <View style={styles.sectionContainer}>
      {prepareMainSongsGroup()}
    </View>
      <View style={styles.sectionContainer}>
      {prepareChildrenSongsGroup()}
    </View>
      <View style={styles.sectionContainer}>
      {prepareProVersionGroup()}
    </View>
    <View style={styles.sectionContainer}>
      {prepareAhareAppGroup()}
    </View>
    <View style={styles.sectionContainer}>
      {prepareTermsAndConditionsGroup()}
    </View>
    <View style={styles.sectionContainer}>
      {prepareAboutUsGroup()}
    </View>
    

      {/* <View style={styles.sectionContainer}>
        <AccordionItem title='Vidyarthi Geethavali' titleKey='song-book'>
        {prepareSongBookGroup()}
        </AccordionItem>
    </View> */}
    <View style={styles.sectionContainer}>
      {prepareFeedbackGroup()}
    </View>
    
    
    <View style={styles.sectionContainer}>
      {prepareContactUsGroup()}
    </View>
    <View style={styles.sectionContainer}>
      {prepareLoginGroup()}
    </View>
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    width: '100%',
    height: 140,
    //borderRadius: 10,
    alignSelf: 'center',
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    flex: 1
  },
  accordContainer: {
    paddingBottom: 0
  },
  accordHeader: {
    padding: 10,
    color: '#FFFFFF',
    flex: 1,
    flexDirection: 'row'
  },
  accordHeader1: {
    padding: -5,
    margin: -5,
    color: '#FFFFFF',
    flex: 1,
    flexDirection: 'row',
    justifyContent:"flex-start", alignItems:'center'
  },
  accordTitle: {
    fontSize: 18,
    color: '#FFFFFF',
    //fontWeight: 'bold'
  },
  accordBody: {
    paddingLeft: 20
  },
  textSmall: {
    fontSize: 18
  },
  seperator: {
    height: 12
  },
  sectionContainer:{
    
  }
});

function mapStateToProps(state) {
  return {
      selectedSong: state.song.selectedSong,
      songType: state.song.songType,
      magazineType: state.song.magazineType,
      songsDonated: state.song.songsDonated,
      triconType: state.song.triconType,
      USER_AUTH: state.auth.USER_AUTH,
  }
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({
      setSongType,
      setMagazineType,
      setSongsDonated,
      setTriconType
  }, dispatch)
);
export default connect(mapStateToProps, mapDispatchToProps) (CustomSidebarMenu);