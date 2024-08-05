// import React from 'react';
import React, {useState} from 'react';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { View, TouchableOpacity, Text, StyleSheet, Image, Modal } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import iconx from '../images/icon_x.png'
import {CustomText} from '../components/CustomText';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logoutRequest } from '../actions/auth/auth';
import { useDispatch } from 'react-redux';


const CustomDrawerContent = ( props ) => {

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false); 

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('refreshToken');
      
      props.navigation.closeDrawer()
      setModalVisible(false);
      navigation.navigate('Init');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  // 지우면 안됨!! 
  // const handleLogout = async () => {
  //   try {
  //     dispatch(logoutRequest(([result, response]) => {
  //       if(result) {
  //         setModalVisible(false);
  //         navigation.navigate('Init');
  //       } else {
  //         setModalVisible(false);
  //         alert('로그아웃 에러');
  //       }
  //     }));  

  //   } catch (error) {
  //     console.error('Error during logout:', error);
  //     alert('로그아웃 에러');
  //   }
  // };
  

  return (
    <>
    <TouchableOpacity onPress={() => props.navigation.closeDrawer()} style={styles.closeButton}>
      <Image source={iconx} style={{...styles.closeIcon, width: 25, height: 25,}}/>
    </TouchableOpacity>

    <DrawerContentScrollView {...props}>
    <View style={{ flex: 1 }}>
      {/* Navigation Items */}
      <CustomText style={{marginLeft:20, fontSize : 18, color:"#525252"}} fontWeight="bold">이용 안내</CustomText>
      {/* <TouchableOpacity onPress={() => console.log('공지사항 클릭')} style={styles.menuItem}> */}
      <TouchableOpacity onPress={() => navigation.navigate('NoticeList')} style={styles.menuItem}>
        <CustomText style={styles.menuText} fontWeight="medium">공지사항</CustomText>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('AskScreen')} style={styles.menuItem}>
        <CustomText style={styles.menuText} fontWeight="medium">문의하기</CustomText>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('ServiceScreen')} style={styles.menuItem}>
        <CustomText style={styles.menuText} fontWeight="medium">서비스 이용약관</CustomText>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('PrivacyScreen')} style={styles.menuItem}>
        <CustomText style={styles.menuText} fontWeight="medium">개인정보 처리방침</CustomText>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('LicenseList')} style={styles.menuEndItem}>
        <CustomText style={styles.menuText} fontWeight="medium">오픈소스 라이선스</CustomText>
      </TouchableOpacity>

      <CustomText style={{marginLeft:20, fontSize : 18, marginTop: 25, color:"#525252"}} fontWeight="bold">계정 관리</CustomText>
      <TouchableOpacity onPress={() => navigation.navigate('ChangePassword')} style={styles.menuItem}>
        <CustomText style={styles.menuText} fontWeight="medium">비밀번호 변경</CustomText>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.menuItem}>
      {/* <TouchableOpacity onPress={() => navigation.navigate('Init')} style={styles.menuItem}> */}
        <CustomText style={styles.menuText} fontWeight="medium">로그아웃</CustomText>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('ResignScreen')} style={styles.menuItem}>
        <CustomText style={styles.menuText} fontWeight="medium">회원 탈퇴</CustomText>
      </TouchableOpacity>

    </View>
    </DrawerContentScrollView>

    <Modal  
      // animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <View style={{ backgroundColor: 'white', width: 280, padding: 18, borderRadius: 10 }}>
          <CustomText style={{color: '#000', fontSize: 16, textAlign: 'center', marginTop: 2}} fontWeight="bold">로그아웃 하시겠어요?</CustomText>
          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20 }}>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={{ backgroundColor: '#E8ECEF', width: 100, padding: 10, borderRadius: 5 }}>
              <CustomText style={{ color: '#000', textAlign : 'center'}} fontWeight="bold">취소</CustomText>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout} style={{ backgroundColor: '#5D70f9', width: 100, padding: 10, borderRadius: 5 }}>
            {/* <TouchableOpacity onPress={() => navigation.replace('Init')} style={{ backgroundColor: '#5D70f9', width: 100, padding: 10, borderRadius: 5 }}> */}
              <CustomText style={{ color: 'white', textAlign : 'center'}} fontWeight="bold">확인</CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
    </>
  );
};


const styles = StyleSheet.create({
  closeButton: {
    padding: 10,
    alignItems: 'flex-end',
  },
  closeIcon: {
    marginTop: 10,
    marginRight: 10,
  },
  menuItem: {
    marginLeft : 20,
    marginTop: 22,
    // padding: 20,
    // borderBottomWidth: 1,
    // borderBottomColor: '#ccc',
    // borderBottomStartRadius : 20, 
    // borderBottomEndRadius : 20, 
  },
  menuEndItem: {
    // marginLeft : 20,
    paddingLeft: 20,
    marginTop: 22,
    paddingBottom: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderBottomStartRadius: 20, 
    borderBottomEndRadius: 20,   
  },
  menuText: {
    fontSize: 16,
    color:"#525252",
  },
});

export default CustomDrawerContent;
