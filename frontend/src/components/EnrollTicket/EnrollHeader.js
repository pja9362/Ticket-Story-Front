import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const EnrollHeader = ({title = '', onIconClick}) => {
  const navigation = useNavigation();

  const onBackClick = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBackClick}>
        <Icon name="chevron-back-sharp" size={20} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
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
    color: '#000',
    fontWeight: 'bold',
  },
});

export default EnrollHeader;
