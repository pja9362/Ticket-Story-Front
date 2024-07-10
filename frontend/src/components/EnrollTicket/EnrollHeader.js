import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import { CustomText } from '../../components/CustomText';

const EnrollHeader = ({title = '', onIconClick, backDestination, backParams}) => {
  const navigation = useNavigation();

  const onBackClick = () => {
    if (backDestination) {
      navigation.navigate(backDestination, backParams);
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBackClick}>
        <Icon name="chevron-back-sharp" size={20} color="black" />
      </TouchableOpacity>
      <CustomText style={styles.title} fontWeight="bold">{title}</CustomText>
      <TouchableOpacity onPress={onIconClick}>
        <Icon name="chevron-forward-sharp" size={20} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 16,
    color: '#525252',
  },
});

export default EnrollHeader;
