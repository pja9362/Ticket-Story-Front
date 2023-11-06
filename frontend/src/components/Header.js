import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const Header = ({title = "", icon, onIconClick}) => {
    const navigation = useNavigation();

    const onBackClick = () => {
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onBackClick}>
                <Icon name="chevron-back-sharp" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
            {
                icon == ''? 
                <TouchableOpacity onPress={onIconClick}>
                    <Icon name={icon} size={24} color="black" />
                    <Text>Icon</Text>
                </TouchableOpacity>
                :
                <View style={{width: 24}}></View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingVertical: 24,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    }
});

export default Header;
