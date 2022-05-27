import { useNavigation } from '@react-navigation/native';
import React,{useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { ScreenNameHomeDetailsScreen } from '../../RouteStack/ScreenNames';
import { deviceBasedDynamicDimension } from '../../Utils/ApplicationSpace';
import style from './style';
const Home = (props) => {

    const [hidden, setHidden] = React.useState(false);
    const [status, setstatus] = React.useState("");
    const navigation = useNavigation()

    useEffect(() => {
        if (status === "Ready!") {
            setHidden(true)
        } else {
            setHidden(false)
        }
    }, [status]);

    return (
            <View style={style.mainContainer}>
                {
                    hidden == true &&
                    <TouchableOpacity style={style.imageView} onPress={() => {
                        navigation.navigate(ScreenNameHomeDetailsScreen)
                    }}>
                        <Image
                            height={deviceBasedDynamicDimension(50,false,1)}
                            width={deviceBasedDynamicDimension(50,false,1)}
                            source={{ uri: "https://www.freeiconspng.com/uploads/file-pokeball-png-0.png" }}
                            style={style.ImageStyle}>

                        </Image>
                    </TouchableOpacity>
                }
                <Text style={style.firstText}>
                    Are you ready to be a pokemon master?
                </Text>
                <TextInput
                    value={status}
                    defaultValue={status}
                    onChangeText={(text) => {
                        setstatus(text)
                    }}
                    style={style.textInputStyle}>

                </TextInput>

                <Text style={style.firstText}>
                    Are you ready to be a pokemon master?
                </Text>

                {
                    !hidden &&
                    <Text style={style.CurrentStatus}>
                        I am not ready yet!
                    </Text>
                }
            </View>
    )
}


export default Home;
