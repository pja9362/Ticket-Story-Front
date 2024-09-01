// import React from 'react';
import React, {useState} from 'react';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { View, TouchableOpacity, Text, StyleSheet, Image, Modal, Alert } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import iconx from '../images/icon_x.png'
import {CustomText} from '../components/CustomText';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logoutRequest } from '../actions/auth/auth';
import { useDispatch } from 'react-redux';
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";

const CustomDrawerContent = ( props ) => {

  const navigation = useNavigation();

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

  const handleQuit = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      console.log(accessToken);

      if (!accessToken) {
        console.log("Access token not found");
        return;
      }

      const decoded = jwtDecode(accessToken);

      console.log(decoded);

      if(decoded.OAUTH_TYPE != null) {
        AsyncStorage.setItem('userType', decoded.OAUTH_TYPE);
      }

      if (decoded && (decoded.OAUTH_TYPE == 'KAKAO' || decoded.OAUTH_TYPE == 'APPLE')) {
        console.log("소셜 로그인 유저")
        navigation.navigate('ResignReason');
      } else {
        console.log("일반 로그인 유저")
        navigation.navigate('ResignScreen');
      }
      // 여기에서 OAUTH_TYPE 확인 후 처리
    } catch (error) {
      console.error('JWT Decoding Error:', error);
    }
  };

  const handleChangePW = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      console.log(accessToken);

      if (!accessToken) {
        console.log("Access token not found");
        return;
      }

      const decoded = jwtDecode(accessToken);

      console.log(decoded);

      if(decoded.OAUTH_TYPE != null) {
        AsyncStorage.setItem('userType', decoded.OAUTH_TYPE);
      }

      if (decoded && (decoded.OAUTH_TYPE == 'KAKAO' || decoded.OAUTH_TYPE == 'APPLE')) {
        console.log("소셜 로그인 유저")
        Alert.alert('소셜 로그인 유저는 비밀번호 변경이 불가합니다.');
      } else {
        console.log("일반 로그인 유저")
        navigation.navigate('ChangePassword');
      }
    } catch (error) {
      console.error('JWT Decoding Error:', error);
    }
  }

  
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
      <TouchableOpacity onPress={handleChangePW} style={styles.menuItem}>
        <CustomText style={styles.menuText} fontWeight="medium">비밀번호 변경</CustomText>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.menuItem}>
      {/* <TouchableOpacity onPress={() => navigation.navigate('Init')} style={styles.menuItem}> */}
        <CustomText style={styles.menuText} fontWeight="medium">로그아웃</CustomText>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleQuit} style={styles.menuItem}>
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
        <View style={{ backgroundColor: 'white', width: 280, padding: 15, borderRadius: 10 }}>
          <CustomText style={{color: '#525252', fontSize: 16, textAlign: 'center', marginTop: 5}} fontWeight="bold">로그아웃 하시겠어요?</CustomText>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={{ backgroundColor: '#E8ECEF', width: 120, padding: 10, borderRadius: 12 }}>
              <CustomText style={{ color: '#000', textAlign : 'center', fontSize: 16}} fontWeight="medium">취소</CustomText>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout} style={{ backgroundColor: '#5D70f9', width: 120, padding: 10, borderRadius: 12 }}>
            {/* <TouchableOpacity onPress={() => navigation.replace('Init')} style={{ backgroundColor: '#5D70f9', width: 100, padding: 10, borderRadius: 5 }}> */}
              <CustomText style={{ color: 'white', textAlign : 'center', fontSize: 16}} fontWeight="medium">확인</CustomText>
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
