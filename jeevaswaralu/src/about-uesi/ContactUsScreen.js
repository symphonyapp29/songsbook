import React, { useEffect } from "react";
import {
    View,
    TouchableOpacity,
    Text,
    useWindowDimensions,
    StyleSheet,
    Linking,
    SafeAreaView,
    Dimensions
} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { Button,Card } from 'react-native-paper';
import {
    OtrixContainer, OtrixHeader, OtrixDivider, OtirxBackButton, OtrixContent, OtrixLoader
} from '@component';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { GlobalStyles, Colors } from '@helpers';
import Fonts from "@helpers/Fonts";
import getApi from "@apis/getApi";
import { logfunction } from "@helpers/FunctionHelper";
const { width, height } = Dimensions.get('screen');

function ContactUsScreen(props) {

    const [state, setState] = React.useState({ content: [], loading: true, heading: null });
    const { content, heading, loading } = state;


    

    const { width } = useWindowDimensions();
    const tagsStyles = {
        p: {
            color: Colors().black,
            fontSize:15,
            fontFamily: Fonts.Font_Reguler,
            lineHeight: hp('2.5%'),
        }
    };
    const getDirections =()=>{
        Linking.openURL('geo:17.627152042575997, 78.35785009836181');
        
    }
    const openWebsite =()=>{
        Linking.openURL('https://www.JeevaSwaraalu.in/');
    }

    return (

        <SafeAreaView style={{backgroundColor:'#ffffff',height:height}}>
            {/* Orders Content start from here */}
                <View style={{padding:10}}>
                    <Text style={{color:'#000', fontFamily:Fonts.Font_Bold, fontSize:15}}>GET IN TOUCH WITH US</Text>
                    <Text style={{color:'#000', fontFamily:Fonts.Font_Medium, fontSize:14}}>SYMPHONY GOSPEL TEAM</Text>
                    <Text style={{color:'#000', fontFamily:Fonts.Font_Regular, fontSize:14}}>D.No 48-11/1-5/6C,  Guthikonda Dhanunjay Rao St.,</Text>
                    <Text style={{color:'#000', fontFamily:Fonts.Font_Regular, fontSize:14}}>3rd lane, Currency Nagar, Ramavarapadu Ring,</Text>
                    <Text style={{color:'#000', fontFamily:Fonts.Font_Regular, fontSize:14}}>Vijayawada, Krishna Dist, AP, India – 520008.</Text>
                    <Text style={{color:'#000', fontFamily:Fonts.Font_Regular, fontSize:14}}>Phone No: 7569-861-197/ 9440-210-329</Text>
                    <Text style={{color:'#000', fontFamily:Fonts.Font_Regular, fontSize:14}}>Email : symphonyapp29@gmail.com</Text>
                </View>
                

            
        </SafeAreaView>
    )
}

function mapStateToProps(state) {
    return {

    }
}


export default connect(mapStateToProps, {})(ContactUsScreen);

const styles = StyleSheet.create({

    box: {
        justifyContent: 'center',
        //alignItems: 'center',
        padding: hp('1.5%'),
        backgroundColor: Colors().white,
        marginVertical: hp('1%'),
        marginHorizontal: wp('1%'),
        borderRadius: wp('2%'),
        borderWidth: 0.5,
        borderColor: Colors().custom_gray,
        fontFamily: Fonts.Font_Reguler
    },
    txt: {
        fontSize: wp('4%'),
        fontFamily: Fonts.Font_Medium,
        color: Colors().text_color,
        textAlign: 'left'
    }

});