import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Button} from 'react-native';
import EnrollHeader from '../../components/EnrollTicket/EnrollHeader';
import TicketAgreement from '../../components/EnrollTicket/TicketAgreement';
import SelectType from '../../components/EnrollTicket/SelectType';

const EnrollInfoByHandAgreement = ({navigation}) => {
  const [isModalVisible, setModalVisible] = useState(true);
  const [showSelectType, setShowSelectType] = useState(false);

  const closeModal = () => {
    setModalVisible(false);
    setShowSelectType(true);
  };

  const onClick = () => {
    navigation.navigate('EnrollInfoByHand');
  };

  return (
    <>
      <EnrollHeader
        title="직접 입력으로 티켓 등록하기"
        onIconClick={() => navigation.navigate('EnrollInfoByHand')}
      />
      {!showSelectType ? (
        <TicketAgreement isModalVisible={isModalVisible} onClick={closeModal} />
      ) : (
        <SelectType onClick={onClick}/>
      )}
    </>
  );
};

export default EnrollInfoByHandAgreement;
