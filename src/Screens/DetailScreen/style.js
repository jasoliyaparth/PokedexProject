import React from 'react';
import { StyleSheet } from 'react-native';
import { colors } from '../../constants';
import { deviceBasedDynamicDimension } from '../../Utils/ApplicationSpace';
const style = StyleSheet.create({
    MainView: {
        flex: 1,
        flexDirection: 'column',
        padding: deviceBasedDynamicDimension(10, true, 1),
        backgroundColor: 'white',

    },
    StyleFirst: {
        fontSize: deviceBasedDynamicDimension(14, true, 1),
        lineHeight: deviceBasedDynamicDimension(18, true, 1),
        color: "black",
        fontWeight: '500'
    },
    textInputSTyle: {
        fontSize: deviceBasedDynamicDimension(14, true, 1),
        lineHeight: deviceBasedDynamicDimension(20, true, 1),
        height: deviceBasedDynamicDimension(40, true, 1),
        borderColor: "gray",
        borderRadius: deviceBasedDynamicDimension(14, true, 1),
        borderWidth: deviceBasedDynamicDimension(1, true, 1),
        marginVertical: deviceBasedDynamicDimension(14, true, 1),
        paddingHorizontal: deviceBasedDynamicDimension(10, true, 1),
    }
    ,
    CurrentStatus: {
        fontSize: deviceBasedDynamicDimension(16, true, 1),
        lineHeight: deviceBasedDynamicDimension(18, true, 1),
        marginVertical: deviceBasedDynamicDimension(18, true, 1),
        color: "red",
        fontWeight: '600'
    },
    ImageSTyle: {
        marginVertical: deviceBasedDynamicDimension(30, true, 1),
        height: deviceBasedDynamicDimension(100, true, 1),
        width: deviceBasedDynamicDimension(100, true, 1),
    },
    fastImageVIewStyle: {
        height: deviceBasedDynamicDimension(100, true, 1),
        width: deviceBasedDynamicDimension(100, true, 1),
        justifyContent: 'center',
        alignSelf: 'center',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: deviceBasedDynamicDimension(50, true, 1),
        marginVertical: deviceBasedDynamicDimension(50, true, 1),
    },
    graphStyle: {
        backgroundColor: 'white',
        marginVertical: deviceBasedDynamicDimension(50, true, 1),
        alignSelf: 'center',
        justifyContent: 'center'
    },
    headerView: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText:{
        fontSize: deviceBasedDynamicDimension(18, true, 1),
        lineHeight: deviceBasedDynamicDimension(18, true, 1),
        color: "black",
        fontWeight: '500',
        textTransform:'capitalize'
    },
    textstyleName:{
        fontSize:deviceBasedDynamicDimension(14,true,1),
        paddingHorizontal:10,
        color:"black",
        alignSelf:'center',
        alignContent:'center',
        fontWeight:'bold',
        alignSelf:'center',
        textAlign:'center',
        textAlignVertical:'center',
        justifyContent:'center',
    },
    downloadBtn:{
        height:deviceBasedDynamicDimension(50,false,1),
        width:deviceBasedDynamicDimension(50,false,1),
        alignItems:'center',
        justifyContent:'center',
        borderRadius:50,
        backgroundColor:colors.milkblue,
        position:'absolute',
        bottom:20,
        right:20
    },
    downloadImage:{
        height:deviceBasedDynamicDimension(25,false,1),
        width:deviceBasedDynamicDimension(25,false,1),
        resizeMode:'contain',
        tintColor:colors.white
    }

})

export default style;