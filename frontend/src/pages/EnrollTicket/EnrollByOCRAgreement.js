import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Button} from 'react-native';
import EnrollHeader from '../../components/EnrollTicket/EnrollHeader';
import TicketAgreement from '../../components/EnrollTicket/TicketAgreement';
import SelectType from '../../components/EnrollTicket/SelectType';

const EnrollInfoByOCRAgreement = ({navigation}) => {
  const [isModalVisible, setModalVisible] = useState(true);
  const [showSelectType, setShowSelectType] = useState(false);

  const closeModal = () => {
    setModalVisible(false);
    setShowSelectType(true);
  };

  const onClick = () => {
    navigation.navigate('EnrollInfoByOCR');
  };

  return (
    <>
      <EnrollHeader
        title="카메라로 티켓 등록하기"
        onIconClick={() => navigation.navigate('EnrollInfoByOCR')}
      />
      {!showSelectType ? (
        <TicketAgreement isModalVisible={isModalVisible} onClick={closeModal} />
      ) : (
        <SelectType onClick={onClick}/>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 27,
    paddingVertical: 24,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
});

export default EnrollInfoByOCRAgreement;
