import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import NextButton from './NextButton';

const Step4 = ({prevStep}) => {
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [gender, setGender] = useState('');

  const isValid = year !== '' && month !== '' && day !== '' && gender !== '';

  const handleYearChange = text => {
    setYear(text);
  };

  const handleMonthChange = text => {
    setMonth(text);
  };

  const handleDayChange = text => {
    setDay(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.sectionText}>생년월일</Text>
        <View style={styles.dateContainer}>
          <TextInput
            style={styles.dateInput}
            placeholder="년"
            value={year}
            onChangeText={handleYearChange}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.dateInput}
            placeholder="월"
            value={month}
            onChangeText={handleMonthChange}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.dateInput}
            placeholder="일"
            value={day}
            onChangeText={handleDayChange}
            keyboardType="numeric"
          />
        </View>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.sectionText}>성별</Text>
        <View style={styles.genderContainer}>
          <TouchableOpacity
            style={[
              styles.genderBtn,
              gender === '남자' && {backgroundColor: '#e4f3fb'},
            ]}
            onPress={() => setGender('남자')}>
            <Text>남자</Text>
          </TouchableOpacity>
          <View style={styles.verticalDivider} />
          <TouchableOpacity
            style={[
              styles.genderBtn,
              gender === '여자' && {backgroundColor: '#e4f3fb'},
            ]}
            onPress={() => setGender('여자')}>
            <Text>여자</Text>
          </TouchableOpacity>
        </View>
      </View>

      <NextButton
        isLast={true}
        isValid={isValid}
        onClick={() => {
          console.log('submit form');
        }}
      />
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
    color: '#3b3b3b',
  },
  formContainer: {
    marginBottom: 20,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  dateInput: {
    flex: 1,
    fontSize: 16,
    borderColor: '#d3d3d3',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#d3d3d3',
    borderRadius: 8,
  },
  genderBtn: {
    flex: 1,
    alignItems: 'center',
    padding: 14,
  },
  verticalDivider: {
    width: 1,
    backgroundColor: '#d3d3d3',
  },
});

export default Step4;
