import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image,Platform } from 'react-native';
import { IMAGE } from '../../constants';
import { deviceBasedDynamicDimension } from '../../Utils/ApplicationSpace';

const Index = (props) => {
    const [Search, setSearch] = React.useState("")
    return (
        <View style={style.MainView}>
            <TextInput
                value={Search}
                defaultValue={Search}
                placeholder={"Search"}
                placeholderTextColor={"Gray"}

                onChangeText={(text) => {
                    setSearch(text)
                    if (props?.change != null && props?.change != undefined) {
                        props?.change(text)
                    }

                }}
                style={style.textView}></TextInput>
            <TouchableOpacity
                onPress={() => {
                    setSearch("")
                    if (props?.change != null && props?.change != undefined) {
                        props?.change("")
                    }
                }}
                style={style.TouchableView}>
                <Image
                    source={IMAGE.CROSSIMAGE}
                    style={style.ImageStyle}>

                </Image>
            </TouchableOpacity>
        </View>
    )
}


const style = StyleSheet.create({
    MainView: {
        flexDirection: 'row',
        flex: 0.90,
        backgroundColor: 'white',
        borderRadius: deviceBasedDynamicDimension(10, false, 1),
        borderColor: 'gray',
        borderWidth: deviceBasedDynamicDimension(0.5, false, 1),
        justifyContent: 'center',
        alignItems:'center',
    },
    textView: {
        textAlignVertical: 'center',
        textAlign: 'left',
        marginHorizontal: deviceBasedDynamicDimension(1, false, 1),
        justifyContent: 'center',
        backgroundColor: 'white',
        alignSelf: 'center',
        flex: 0.80,
        fontSize: deviceBasedDynamicDimension(16, false, 1),
        color: 'black'
    },
    TouchableView: {
        height: deviceBasedDynamicDimension(30, false, 1),
        width: deviceBasedDynamicDimension(30, false, 1),
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        alignSelf: 'center'

    },
    ImageStyle: {
        height: deviceBasedDynamicDimension(20, false, 1),
        width: deviceBasedDynamicDimension(20, false, 1),
        tintColor: 'green',
        alignSelf: 'center'

    }
})

export default Index;