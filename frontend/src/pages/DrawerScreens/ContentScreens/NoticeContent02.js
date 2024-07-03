import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, ScrollView } from 'react-native';
import {CustomText} from '../../../components/CustomText';
import Header from '../../../components/Header';

const NoticeContent02 = () => {

  return (
    <View style={styles.container}>
    <Header title='공지사항'/>
    <ScrollView showsVerticalScrollIndicator={false}>
    <View style={{ flex: 1 }}>
        <CustomText style={styles.menuText} fontWeight="bold">개인정보취급방침 변경 안내</CustomText>
    </View>
    <View style={{marginLeft: 280}}>
        <CustomText style={styles.menuTextDate}>2024.07.01</CustomText>
    </View>
    <View>
        <CustomText style={styles.textcontent}>
          티켓스토리 고객님 안녕하세요. {'\n'}{'\n'}
          아침이 되고 로또리아 가봤더니 문을열고 들어서며 웃는다 카운터엔 이나님이날보며 주문을 받는다 오자마자 감자튀김 혹시 다른 메뉴는 드시나요?
          아닌가요? 정말인가? 그럼그거 하나만 드릴게요 참 이상한 손님이네 아침부터 감자 튀김을먹나 맛있으니 먹는거지 또올테니긴장해~
          점심이 되고 로또리아 가봤더니 문을열고 들어서며 화낸다 카운터엔 이나님이날보며 주문을 받는다 이번에는 뭘먹을까 혹시 셋트 메뉴를 먹으려나 화내면서 포테이토!
          마치 고길동처럼 소리치네 네 녀석은 모를거야 잊을수없는 이맛의 느낌을 맛있으니 먹는거지 또올테니긴장해~ 저녁이 되고 로또리아 가봤더니 문을열고 들어서며 테러해 카운터엔 이나님이날보며 물건을 던진다 사라져라 이 강도야
          지금 감자튀김이 먹고싶냐 다 내꺼야 감자튀김 여기있는 감자튀김 다 내꺼야 고소하고 바삭하고 짭짤한맛 감자튀김을 먹자 조용히 해 돌카스야 다시는오지마라~
        </CustomText>
    </View>
    </ScrollView>
    </View>

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
  menuText: {
    marginTop: 20,
    marginBottom: 18,
    fontSize: 20,
    color: '#525252',
  },
  menuTextDate: {
    fontSize: 14,
    color: '#525252',
    marginBottom: 30,
  },
  textcontent: {
    fontSize: 16,
    color: '#525252',
    lineHeight: 22
  } 
});

export default NoticeContent02;
