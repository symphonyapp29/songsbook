import React, { useEffect } from "react";
import {
    View,
    TouchableOpacity,
    Text,
    useWindowDimensions,
    StyleSheet
} from "react-native";
import { connect } from 'react-redux';
import {
    OtrixContainer, OtrixHeader, OtrixDivider, OtirxBackButton, OtrixContent, OtrixLoader
} from '@component';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { GlobalStyles, Colors } from '@helpers';
import Fonts from "@helpers/Fonts";
import getApi from "@apis/getApi";
import { logfunction } from "@helpers/FunctionHelper";

function AboutUsScreen(props) {

    const [state, setState] = React.useState({ content: [], loading: true, heading: null });
    const { content, heading, loading } = state;


    // useEffect(() => {
    //     getApi.getData(
    //         "getPages/6",
    //         [],
    //     ).then((response => {
    //         if (response.status == 1) {
    //             logfunction("RESPONSEEE ", response)
    //             setState({
    //                 ...state,
    //                 heading: response.data.heading,
    //                 content: response.data.description,
    //                 loading: false
    //             });
    //         }
    //     }));
    // }, []);

    const { width } = useWindowDimensions();
    const tagsStyles = {
        p: {
            color: Colors().black,
            fontFamily: Fonts.Font_Reguler,
            fontSize: wp('3.5%'),
            lineHeight: hp('2.4%'),
        }
    };

    return (
        <View customStyles={{ backgroundColor: Colors().light_white }}>

            {/* Header */}
            {/* <OtrixHeader customStyles={{ backgroundColor: Colors().light_white }}>
                <TouchableOpacity style={GlobalStyles.headerLeft} onPress={() => props.navigation.goBack()}>
                    <OtirxBackButton />
                </TouchableOpacity>
                <View style={[GlobalStyles.headerCenter, { flex: 1 }]}>
                    <Text style={GlobalStyles.headingTxt}> {heading}</Text>
                </View>
            </OtrixHeader> */}

            {/* Orders Content start from here */}
            <OtrixContent style={{color:'#000'}}>
            <Text style={{color:'#000'}}>Symphony Gospel Team is the fruit of God’s calling to Dr AR Stevenson for using the God given talents to win souls for Him through music and for reviving Church ministries.</Text>
        <Text style={{color:'#000'}}>Dr A.R. Stevenson, the Founder and President of the Symphony gospel team is continuing in God's ministry as lyricist, singer and music director, while working as a physics lecturer in Government polytechnic College. God inspired Dr. A.R. Stevenson through Holy Spirit to write 1000 songs, compose music to them and release them in the form of 105 albums so far.</Text>
        <Text style={{color:'#000'}}>All these songs are compiled by him, in the form of this book ‘Jeevaswaraalu’, for the benefit of the believers across the globe. All the songs are scripture-based and are meaningful with great literary, spiritual and musical values. These songs bring relief to the tormented souls. Dr. A.R. Stevenson, by the grace of God, has produced songs which stand out from the cacophony of commercially oriented Christian songs of these contemporary days. May God bless each of us through these songs in a mighty way.</Text>
                </OtrixContent>


        </View >

    )
}

function mapStateToProps(state) {
    return {

    }
}


export default connect(mapStateToProps, {})(AboutUsScreen);

const styles = StyleSheet.create({

    box: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: hp('1.5%'),
        backgroundColor: Colors().white,
        marginVertical: hp('1%'),
        marginHorizontal: wp('1%'),
        borderRadius: wp('2%'),
        borderWidth: 0.5,
        borderColor: Colors().custom_gray
    },
    txt: {
        fontSize: wp('4%'),
        fontFamily: Fonts.Font_Medium,
        color: Colors().text_color,
        textAlign: 'left'
    }

});