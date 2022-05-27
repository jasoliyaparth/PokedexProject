import React from 'react';
import { StyleSheet } from 'react-native';
import { deviceBasedDynamicDimension } from '../../../Utils/ApplicationSpace';
const style = StyleSheet.create({

    mainView: {
        flex: 1,
        margin: deviceBasedDynamicDimension(10, true, 1),
        justifyContent: 'center',
        alignItems: 'flex-start',
        alignContent: 'center',
        overflow: 'hidden'
    },
    textstyleName: {
        fontSize: deviceBasedDynamicDimension(18, true, 1),
        lineHeight: deviceBasedDynamicDimension(20, true, 1),
        color: "black",
        alignSelf: 'center',
        alignContent: 'center',
        fontWeight: 'bold',
        alignSelf: 'center',
        margin: deviceBasedDynamicDimension(10, true, 1),
        textAlign: 'center',
        textAlignVertical: 'center',
        justifyContent: 'center',
    },
})

export default style;
