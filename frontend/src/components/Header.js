import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const Header = ({title = '', icon, onIconClick}) => {
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
      {icon === '' ? (
        <TouchableOpacity onPress={onIconClick}>
          <Icon name={icon} size={20} color="black" />
          <Text>Icon</Text>
        </TouchableOpacity>
      ) : (
        <View width={24} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 14,
    color: '#000',
  },
});

export default Header;
