import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import logo from '../../images/icon_splash.png';

const Splash = () => {
    return (
        <View style={styles.container}>
            {/* splash img */}
            <Image source={logo} style={styles.image} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 137,
        height: 152,
    },
});


export default Splash;