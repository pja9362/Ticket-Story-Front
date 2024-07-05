import React, {useState} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, ScrollView, Modal } from 'react-native';
import {CustomText} from '../../components/CustomText';
import Header from '../../components/Header';
import { deleteAccount } from '../../actions/auth/auth';

const ResignReason = ({route}) => {

    const [reasonNumber, setReasonNumber] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const handleIconDelete = async () => {
        
        try {
            const deletedAccount = await deleteAccount(reasonNumber, route.params.token);
            if (deletedAccount) {
            setModalVisible(false);
            navigation.navigate('Init');
            } else {
            setModalVisible(false);
            alert('회원 탈퇴 실패');
            }
        } catch {
            alert('나중에 다시 시도해주세요.');
        }
    }

    const selectReason = (reason) => {
        setModalVisible(true);
        setReasonNumber(reason)
    }


  return (
    <>
        <View style={styles.container}>
            <Header title='회원탈퇴'/>
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ flex: 1 }}>
                <CustomText style={styles.mainText} fontWeight="bold">티켓스토리를 떠나시는 건가요?🥹</CustomText>
            </View>
            <View>
                <CustomText style={styles.detailText}>
                    그동안 티켓스토리를 이용해주셔서 감사드립니다. {'\n'}
                    탈퇴를 결정하신 이유를 알려주시면 고객님의 의견을 토대로 더 나은 서비스를 만들 수 있도록 노력하겠습니다.
                </CustomText>
            </View>
            <View style={{marginTop:30}}>
                <TouchableOpacity style={{marginTop:20}} onPress={() => selectReason("1")} >
                    <CustomText style={styles.textContent} fontWeight="bold"> 콘텐츠 검색이 만족스럽지 않아요 </CustomText>
                </TouchableOpacity>
                <TouchableOpacity style={{marginTop:20}} onPress={() => selectReason("2")}>
                    <CustomText style={styles.textContent} fontWeight="bold"> 티켓 인식이 잘 되지 않아요 </CustomText>
                </TouchableOpacity>
                <TouchableOpacity style={{marginTop:20}} onPress={() => selectReason("3")}>
                    <CustomText style={styles.textContent} fontWeight="bold"> 원하는 기능이 없어요 </CustomText>
                </TouchableOpacity>
                <TouchableOpacity style={{marginTop:20}} onPress={() => selectReason("4")}>
                    <CustomText style={styles.textContent} fontWeight="bold"> 앱 사용법이 어려워요 </CustomText>
                </TouchableOpacity>
                <TouchableOpacity style={{marginTop:20}} onPress={() => selectReason("5")}>
                    <CustomText style={styles.textContent} fontWeight="bold"> 오류가 잦아요 </CustomText>
                </TouchableOpacity>
            </View>

            <View style={{marginTop:120}}>
                <TouchableOpacity style={styles.touchableArea} onPress={() => selectReason("x")}>
                    <CustomText style={{color:'#B6B6B6', fontSize:16, textDecorationLine: 'underline'}}> 넘어가기 </CustomText>
                </TouchableOpacity>
            </View>


            </ScrollView>
        </View>

        <Modal  
                // animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
                >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={{ backgroundColor: 'white', width: 280, padding: 18, borderRadius: 10 }}>
                    <CustomText style={{color: '#000', fontSize: 18, textAlign: 'center', marginTop: 4, lineHeight: 30}} fontWeight="bold">
                        탈퇴 시 저장한 티켓, 리뷰 등 {'\n'}
                        데이터가 모두 삭제되며 {'\n'}
                        복구할 수 없습니다. {'\n'}
                    </CustomText>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: -10 }}>
                        <TouchableOpacity onPress={() => setModalVisible(false)} style={{ backgroundColor: '#E8ECEF', width: 115, padding: 10, borderRadius: 10 }}>
                        <CustomText style={{ color: '#000', textAlign : 'center', fontSize: 17 }} fontWeight="medium">취소</CustomText>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleIconDelete} style={{ backgroundColor: '#5D70f9', width: 115, padding: 10, borderRadius: 10 }}>
                        <CustomText style={{ color: 'white', textAlign : 'center', fontSize: 17 }} fontWeight="medium">탈퇴</CustomText>
                        </TouchableOpacity>
                    </View>
                    </View>
                </View>
        </Modal>
    </>

  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 0
  },
  menuItem: {
    paddingLeft: 10,
    marginTop: 20,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderBottomStartRadius : 10, 
    borderBottomEndRadius : 10, 
  },
  mainText: {
    marginTop: 25,
    marginBottom: 15,
    fontSize: 20,
    color: '#525252',
  },
  detailText: {
    fontSize: 16,
    color: '#525252',
    marginBottom: 30,
    lineHeight: 22
  },
  textContent: {
    fontSize: 20,
    color: '#525252',
    lineHeight: 22
  },
  touchableArea: {
    alignItems: 'center', // 수직 방향 가운데 정렬
    justifyContent: 'center', // 수평 방향 가운데 정렬
    padding: 10,
    borderRadius: 5,
  },
});

export default ResignReason;
