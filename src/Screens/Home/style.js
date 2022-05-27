import React from 'react';
import {StyleSheet} from 'react-native';
import { colors } from '../../constants';
import { deviceBasedDynamicDimension } from '../../Utils/ApplicationSpace';
const style=StyleSheet.create({
    mainContainer:{
        flex:1,
        flexDirection:'column',
        padding:deviceBasedDynamicDimension(10,true,1),
        backgroundColor:colors.white,

    },
    firstText:{
        fontSize:deviceBasedDynamicDimension(14,true,1),
        lineHeight:deviceBasedDynamicDimension(18,true,1),
        color:colors.black,
        fontWeight:'600'
    },
    textInputStyle:{
        fontSize:deviceBasedDynamicDimension(14,true,1),
        lineHeight:deviceBasedDynamicDimension(20,true,1),
        height:deviceBasedDynamicDimension(40,true,1),
        borderColor:"gray",
        borderRadius:deviceBasedDynamicDimension(14,true,1),
        borderWidth:deviceBasedDynamicDimension(1,true,1),
        marginVertical:deviceBasedDynamicDimension(14,true,1),
        paddingHorizontal:deviceBasedDynamicDimension(10,true,1),
    }
    ,
    CurrentStatus:{
        fontSize:deviceBasedDynamicDimension(16,true,1),
        lineHeight:deviceBasedDynamicDimension(18,true,1),
        marginVertical:deviceBasedDynamicDimension(18,true,1),
        color:"red",
        fontWeight:'600'
    },
    ImageStyle:{
        marginVertical:deviceBasedDynamicDimension(30,true,1),
        height:deviceBasedDynamicDimension(100,true,1),
        width:deviceBasedDynamicDimension(100,true,1),
    },
    imageView:{
        justifyContent:'center',
        alignItems:'center'
    }
})

export default style;