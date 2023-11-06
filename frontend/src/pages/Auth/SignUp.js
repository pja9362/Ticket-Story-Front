import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const SignUp = () => {
    return (
        <View style={styles.container}>
            <Text>회원가입 화면</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
    }
});

export default SignUp;