import React from 'react';
import { Platform, StyleSheet, Image, Text, View } from 'react-native';
import { NavigationContainer, createNavigationContainerRef } from "@react-navigation/native";
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { connect } from 'react-redux';
import { SplashScreen} from './screens/index';
import { bottomHome, bottomHomeFill, bottomCategory, bottomCategoryFill, bottomCart, bottomProfile, bottomProfileFill, bottomSetting, bottomSettingFill } from '@common';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors, GlobalStyles } from '@helpers';
import { Badge } from "native-base"
import Fonts from './helpers/Fonts';
import { _roundDimensions } from './helpers/util';
import store from './redux/store/store';
const SettingStack = createStackNavigator();
export const navigationRef = createNavigationContainerRef()
import {createDrawerNavigator} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { bindActionCreators } from 'redux';
import { addToWishList, storeFCM } from '@actions';

import Home from './song-book/Home';
import CustomSidebarMenu from './CustomSidebarMenu';
import TeluguSongsScreen from './song-book/TeluguSongsScreen';
import EnglishSongsScreen from './song-book/EnglishSongsScreen';
import HindiSongsScreen from './song-book/HindiSongsScreen';
import SongSearchScreen from './song-book/SongSearchScreen';
import UESIHomeScreen from './home/UESIHomeScreen';
import ShareScreen from './about-uesi/ShareScreen';
import AboutUsScreen from './about-uesi/AboutUsScreen';
import FeedbackScreen from './about-uesi/FeedbackScreen';
import ContactUsScreen from './about-uesi/ContactUsScreen';
import TermsAndConditionsScreen from './about-uesi/TermsAndConditionsScreen';
import DeleteAccountScreen from './song-book/DeleteAccountScreen';


let cartCount = 0;
let globalAuthStatus = false;
export function navigate(name, params) {
    if (navigationRef.isReady()) {
        navigationRef.navigate(name, params);
    }
}







const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
    return (
        <Drawer.Navigator screenOptions={{
            itemStyle: {marginVertical: 5}
          }}
          drawerContent={props => <CustomSidebarMenu {...props} />}>
        {/* <Drawer.Screen name="Songs Book" component={SongBookNavigator}/> */}
        <Drawer.Screen name="UESIHomeScreen" component={UESIHomeScreen} options={{
            headerShown: true,
            drawerLabel: 'Home',
            title: 'Welcome to Jeeva Swaralu',
            groupName: 'home',
            headerStyle: {
                backgroundColor: Colors().themeColor,
                alignItems:'center',
                fontFamily:Fonts.Font_Bold
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            drawerKey:'home'
          }}/>
        <Drawer.Screen name="TeluguSongsScreen" component={TeluguSongsScreen} options={{
            drawerLabel: 'Main Songs',
            title: 'Main Songs',
            groupName: 'main-songs',
            headerStyle: {
                backgroundColor: Colors().themeColor,
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowColor: 'black',
              shadowOpacity: 1,
              shadowRadius: 3.84,
              elevation: 15,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            drawerKey:'main'
          }}/>
        <Drawer.Screen name="EnglishSongsScreen" component={EnglishSongsScreen} options={{
            drawerLabel: 'Children Songs',
            title: 'Children Songs',
            groupName: 'children-songs',
            headerStyle: {
                backgroundColor: Colors().themeColor,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            drawerKey:'children'
          }}/>
        <Drawer.Screen name="HindiSongsScreen" component={HindiSongsScreen} options={{
            drawerLabel: 'Pro Version',
            title: 'Pro Version',
            groupName: 'pro-version',
            headerStyle: {
                backgroundColor: Colors().themeColor,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            drawerKey:'pro-version'
          }}/>
          
       

       
         
          <Drawer.Screen name="Share App" component={ShareScreen}  options={{
            drawerLabel: 'Share App',
            title: 'Share App',
            groupName: 'share-app',
            headerStyle: {
                backgroundColor: Colors().themeColor,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
          }}/>
          <Drawer.Screen name="DeleteAccountScreen" component={DeleteAccountScreen}  options={{
            drawerLabel: 'Deactivate',
            title: 'Deactivate',
            groupName: 'login',
            headerStyle: {
                backgroundColor: Colors().themeColor,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
          }}/>
          <Drawer.Screen name="AboutUsScreen" component={AboutUsScreen}  options={{
            drawerLabel: 'About Jeeva Swaralu',
            title: 'About Jeeva Swaralu',
            groupName: 'about-us',
            headerStyle: {
                backgroundColor: Colors().themeColor,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
          }}/>
          <Drawer.Screen name="FeedbackScreen" component={FeedbackScreen}  options={{
            drawerLabel: 'Feedback',
            title: 'Feedback',
            groupName: 'feedback',
            headerStyle: {
                backgroundColor: Colors().themeColor,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
          }}/>
          <Drawer.Screen name="ContactUsScreen" component={ContactUsScreen}  options={{
            drawerLabel: 'Contact Us',
            title: 'Contact Us',
            groupName: 'contact-us',
            headerStyle: {
                backgroundColor: Colors().themeColor,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
          }}/>
          <Drawer.Screen name="TermsAndConditionsScreen" component={TermsAndConditionsScreen}  options={{
            drawerLabel: 'About Symphony',
            title: 'About Symphony',
            groupName: 'terms-and-conditions',
            headerStyle: {
                backgroundColor: Colors().themeColor,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
          }}/>
      </Drawer.Navigator>
      
    );
  }


const Stack = createStackNavigator();
function AppNavigator(props) {
    const { cartCount, authStatus } = props;
    globalAuthStatus = authStatus;
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator initialRouteName="SplashScreen">
                <Stack.Screen name='SplashScreen' component={SplashScreen}
                    options={{
                        headerShown: false,
                    }}
                />
                {/* <Stack.Screen {...props} name="MainScreen" component={() => <MyTabs cartCounts={cartCount} auth={authStatus}></MyTabs>} options={{ headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, }} countProp={cartCount} initialParams={{ 'count': cartCount }} /> */}

                <Stack.Screen {...props} name="MainScreen" options={{ headerShown: false, }} >
                    {props => <DrawerNavigator cartCounts={cartCount} auth={authStatus} />}
                </Stack.Screen>
                <Stack.Screen name="Home" component={Home} options={({ navigation, route }) =>({
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: Colors().themeColor,
                    },
                    headerTintColor: '#fff',
                    headerTitle: props.songType==='telugu'?'Main Songs':(props.songType==='english'?'Children Songs':(props.songType==='hindi'?'Hindi Songs':'New Songs')),
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    }
                })} />
                <Stack.Screen name="SongSearchScreen" component={SongSearchScreen} options={{
                    headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS
                }} />
            </Stack.Navigator>


        </NavigationContainer>
    )
}


//export default connect(mapStateToProps, {})(AppNavigator);

function mapStateToProps(state) {
    return {
        cartCount: state.cart.cartCount ? state.cart.cartCount : null,
        authStatus: state.auth.USER_AUTH,
        songType: state.song.songType,
        USER_AUTH: state.auth.USER_AUTH,
        paymentModuleType: state.song.paymentModuleType
    }
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        storeFCM
    }, dispatch)
);


export default connect(mapStateToProps, mapDispatchToProps)(AppNavigator);

const styles = StyleSheet.create({
    bottomTabIcon: {
        height: wp('6%'),
        width: wp('6%'),
    },
    tabbarStyle: {
        backgroundColor: Colors().white,
    },
    cartIconView: {
        backgroundColor: Colors().light_white,
        height: _roundDimensions()._height * 0.068,
        width: _roundDimensions()._height * 0.068,
        borderRadius: _roundDimensions()._borderRadius,
        justifyContent: 'center',
        alignItems: 'center',
        bottom: hp('2%'),
        position: 'relative',
        zIndex: 9999999999
    },
    count: {
        backgroundColor: Colors().white,
    },
    countText: {
        color: Colors().link_color,
        fontFamily: Fonts.Font_Bold
    }
});