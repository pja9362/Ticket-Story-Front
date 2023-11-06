import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import NextButton from './NextButton';

const Step1 = ({nextStep}) => {
  const [id, setId] = useState('');
  const [isIdCheck, setIsIdCheck] = useState(false);
  const isValid = isIdCheck && id !== '';

  return (
    <View style={styles.container}>
      <Text style={styles.sectionText}>아이디</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.inputBox}
          value={id}
          onChangeText={text => setId(text)}
        />
        <TouchableOpacity
          style={styles.checkBtn}
          onPress={() => setIsIdCheck(true)}>
          <Text style={styles.checkBtnLabel}>중복확인</Text>
        </TouchableOpacity>
      </View>
      <NextButton onClick={nextStep} isValid={isValid} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
    paddingVertical: 36,
  },
  sectionText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  formContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  inputBox: {
    fontSize: 16,
    borderColor: '#d3d3d3',
    borderWidth: 1,
    borderRadius: 8,
    flex: 1,
    padding: 12,
  },
  checkBtn: {
    backgroundColor: '#e4f3fb',
    justifyContent: 'center',
    padding: 6,
    borderRadius: 8,
  },
  checkBtnLabel: {
    color: '#666666',
    fontSize: 14,
  },
});

export default Step1;
