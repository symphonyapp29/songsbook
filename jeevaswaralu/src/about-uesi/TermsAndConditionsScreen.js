import React, { useEffect } from "react";
import {
    View,
    TouchableOpacity,
    Text,
    useWindowDimensions,
    StyleSheet,
} from "react-native";
import { connect } from 'react-redux';
import {
    OtrixContainer, OtrixHeader, OtrixViewider, OtirxBackButton, OtrixContent, OtrixLoader
} from '@component';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { GlobalStyles, Colors } from '@helpers';
import Fonts from "@helpers/Fonts";
import getApi from "@apis/getApi";
import { logfunction } from "@helpers/FunctionHelper";

function TermsAndConditionsScreen(props) {

    const [state, setState] = React.useState({ content: [], loading: true, heading: null });
    const { content, heading, loading } = state;


    // useEffect(() => {
    //     getApi.getData(
    //         "getPages/2",
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
            {/* {
                loading && <OtrixLoader />
            } */}
            <OtrixContent style={{color:'#000'}}>
                <View style={{textAlign:'center'}}>
                    <Text>WELCOME TO SYMPHONY GOSPEL TEAM</Text>
                </View>
                
                <View style={{textAlign:'end'}}><Text>-DIVINE MUSIC THAT TRANSFORMERS</Text></View>
                <View style={{textAlign:'justify'}}>
                <Text style={{textAlign:'justify',color:'#000'}}>Music is the Language of the Soul. If we ever praise God,  we praise him in a song with all musical accompaniments befitting the Highest power and spirit with our  Souls.</Text>
                <Text style={{textAlign:'justify',color:'#000'}}>Symphony Gospel Team is founded and steered by Dr. AR Stevenson to mesmerize and marvel hearts. His songs and music sets souls on fire with deep prayer and worship as they come naturally to him from his heart. The signature Music serves Ministries across all denominations globally. Dr. AR Stevenson writes lyrics inspired from scripture and his reflections and sets them into melodious swaras which flow from his heart. They are playful and boisterous,  meditative and quite reflective depicting all emotions for all occasions and events in life for prayer and worship in Ministries. He has written, composed and recorded over 1000 songs in the form of 105 Albums and still counting. Dr. AR Stevenson's Mission is to serve the Lord through Music- as a Singer, lyricist and composer. He is a Doctorate in his Subject as an Academician but his heart beats for Music and Melody.</Text>
                <Text style={{textAlign:'justify',color:'#000'}}>Dr. AR Stevenson's soulful music influences and serves a large multitudes of Chrstian believers across the globe. Known for its deep content and meaning, uplifting musical renditions and with spiritual sojourns into the valleys of bliss and haromony.  They standout as pure shining Jewels in the Crown of Spiritual  Christian Melodies cutting away from commercial overtures.</Text>
                <Text style={{textAlign:'justify',color:'#000'}}>All the songs are recorded in high standard state-of-the-art studio to give you highest quality and great spiritual experience of melody at its highest best.
                    Be sure to support him by subscribing to the YOUTUBE Channel Symphony Music in his mission to reach and help scores of chrstian believers to wallow and be swayed in praise and worship -  experiencing the true joy in listening and partaking in reflective prayer and spiritual ecstasy.
                    We thank you for partaking in this Great Mission spreading this unique service of  Prayer and Worship through melodious Music to all people across the World!!</Text>
                    
                    
                </View>
                <View style={{textAlign:'right'}}>
                    <Text>Yours in Christian Music and Melody</Text>
                    <Text>Dr. AR Stevenson</Text>
                </View>
                </OtrixContent>
        </View >

    )
}

function mapStateToProps(state) {
    return {

    }
}


export default connect(mapStateToProps, {})(TermsAndConditionsScreen);

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