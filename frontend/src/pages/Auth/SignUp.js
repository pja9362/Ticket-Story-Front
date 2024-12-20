import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import Header from '../../components/Header';
import Step1 from '../../components/SignUp/Step1';
import Step2 from '../../components/SignUp/Step2';
import Step3 from '../../components/SignUp/Step3';
import Step4 from '../../components/SignUp/Step4';
import LineIndicator from '../../components/SignUp/LineIndicator';
import Icon from 'react-native-vector-icons/Ionicons';
import {CustomText} from '../../components/CustomText';
import backButton from '../../images/back_button.png';

const SignUp = ({navigation}) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const nextStep = () => {
    setStep(step + 1);
  };


  const previousStep = () => {
    if ( step !== 1) {
      setStep(step - 1);
    } else {
      navigation.goBack()
    }
  }

  const goLogin = () => {
    navigation.navigate('Login');
  }

  const updateFormData = (name, value) => {
    setFormData({...formData, [name]: value});
  };

  return (
    <View style={styles.container}>

      <View style={styles.headerContainer}>
        {step !== 4 ? (
          <TouchableOpacity onPress={previousStep}>
            {/* <Icon name="chevron-back-sharp" size={20} color="black" /> */}
            <Image source={backButton} style={{width: 28, height: 28}}/>
          </TouchableOpacity>
        ) : (
          // <View width={20} />
          <View style={{width: 28, height: 28}} />
        )}
        <View style={styles.titleContainer} pointerEvents="none">
          <CustomText style={styles.title} fontWeight="bold">회원가입</CustomText>
        </View>
        {/* <View width={20} /> */}
        <View style={{width: 28, height: 28}} />
      </View>



      <LineIndicator step={step} />
      {step === 1 && (
        <Step1
          nextStep={nextStep}
          handleChange={(name, value) => updateFormData(name, value)}
          values={formData}
        />
      )}
      {step === 2 && (
        <Step2
          nextStep={nextStep}
          handleChange={(name, value) => updateFormData(name, value)}
          values={formData}
        />
      )}
      {step === 3 && (
        <Step3
          nextStep={nextStep}
          handleChange={(name, value) => updateFormData(name, value)}
          values={formData}
        />
      )}
      {step === 4 && (
         <Step4 nextStep={goLogin}/>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 0,
  },
  headerContainer: {
    width: '100%',
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    color: '#525252',
  },
  titleContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    // backgroundColor: 'red'
  },
});

export default SignUp;
