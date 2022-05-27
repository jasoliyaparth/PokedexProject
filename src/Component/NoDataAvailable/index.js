import React, { } from 'react';
import { View, Text, Platform } from 'react-native';
import { STRINGS } from '../../constants';
import { isNull } from '../../Utils';
import styles from './style';
const index = (props) => {
               return (
                    <View {...props}     style={styles.nodatFountMainView}>
                              <View style={styles.lineUpView}></View>
                              <View style={styles.cardstyle}>
                                        <Text style={styles.darkGreyBOld}>{isNull(props.label) == true ? props.label :STRINGS.label_data_not_available}</Text>
                              </View>
                    </View>
          )
}

export default index;
