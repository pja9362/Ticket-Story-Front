import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Modal from 'react-native-modal';
import noCheck from '../../images/no_check.png';
import check from '../../images/check.png';

const TicketAgreement = ({isModalVisible, onClick}) => {
  const [isChecked, setIsChecked] = useState(false);

  const data = [
    '• 티켓 인증 및 리뷰 작성은 실명 확인 계정으로만 이용 가능합니다.',
    "• 티켓 인증 및 리뷰 작성을 위해서는 티켓스토리 이용약관 및 '티켓 수집 및 이용 동의'에 대한 최초 1회 동의가 필요합니다.",
    '• 자세한 이용 정책은 티켓스토리 이용정책과 티켓 데이터 이용정책을 확인해주세요.',
  ];

  const onHandleAgree = () => {
    setIsChecked(!isChecked);
  };

  return (
    <View style={styles.container}>
      <Modal
        isVisible={isModalVisible}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropOpacity={0.5}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>
            티켓을 등록하기 위해 동의가 필요합니다.
          </Text>
          <View>
            {data.map((item, index) => (
              <View key={index} style={styles.listItem}>
                <Text style={styles.listText}>{item}</Text>
              </View>
            ))}
          </View>

          <View style={styles.agreeBox}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 10,
              }}>
              <Text style={styles.title}>티켓 수집 및 이용 동의 (필수)</Text>
              <TouchableOpacity onPress={onHandleAgree}>
                {isChecked ? (
                  <Image source={check} style={styles.checkbox} />
                ) : (
                  <Image source={noCheck} style={styles.checkbox} />
                )}
              </TouchableOpacity>
            </View>
            <Text style={styles.paragraph}>
              다 내 거야 감자튀김 여기 있는 감자튀김 다 내 거야
              다 내 거야 감자튀김 여기 있는 감자튀김 다 내 거야
              다 내 거야 감자튀김 여기 있는 감자튀김 다 내 거야
              다 내 거야 감자튀김 여기 있는 감자튀김 다 내 거야
              다 내 거야 감자튀김 여기 있는 감자튀김 다 내 거야
              다 내 거야 감자튀김 여기 있는 감자튀김 다 내 거야
            </Text>
          </View>

          <TouchableOpacity
            onPress={onClick}
            style={[styles.button, isChecked && {backgroundColor: '#565656'}]}
            disabled={!isChecked}>
            <Text style={styles.buttonText}>티켓 등록하기</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 18,
    paddingVertical: 25,
    borderRadius: 10,
    height: '60%',
    width: '85%',
    alignSelf: 'center',
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
  },
  listItem: {
    marginTop: 10,
    marginLeft: 4,
  },
  listText: {
    fontSize: 12,
    color: '#000',
  },
  agreeBox: {
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 10,
    padding: 15,
    marginVertical: 15,
  },
  checkbox: {
    width: 28,
    height: 28,
  },
  paragraph: {
    fontSize: 12,
    color: '#000',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#D9D9D9',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 15,
    margin: 0,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default TicketAgreement;
