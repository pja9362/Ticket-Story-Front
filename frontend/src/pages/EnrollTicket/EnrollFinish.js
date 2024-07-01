import React, {useState, useEffect} from 'react';
import {View, Image, StyleSheet, Text, Button, TouchableOpacity, Modal} from 'react-native';
import ticket from '../../images/character_black.png';
import home from '../../images/icon_home.png';
import storycard from '../../images/icon_storycard.png';
import { useDispatch } from 'react-redux';
import addticket from '../../images/icon_addticket.png';
import { CustomText, CustomTextInput } from '../../components/CustomText';
import BottomSheetMenu from '../../components/EnrollTicket/BottomSheetMenu';
import { getTicketDetail, getTicketDetails } from '../../actions/ticket/ticket';

const EnrollFinish = ({navigation, route}) => {
    const dispatch = useDispatch();
    const { ticketId } = route.params;

    const [moveStorycard, setMoveStorycard] = useState(false);
    const [makeCardVisible, setMakeCardVisible] = useState(false); //
    const [reviewCardId, setReviewCardId] = useState(null);
    const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

    useEffect(() => {
        dispatch(getTicketDetail(ticketId))
          .then((response) => {
            
            if (response.reviewImages === null && response.reviewTitle === "" && response.reviewDetails === "") {
              setReviewCardId(response.reviewId);
            } else {
              console.log('bangbang2');
              setMoveStorycard(true);
            }
  
          })
      }, []);

    const openBottomSheet = () => {
        setBottomSheetVisible(true);
    };
    
    const closeBottomSheet = () => {
    setBottomSheetVisible(false);
    };

    const onClick = (action) => {
    if (action === 'scrape') navigation.navigate('EnrollByScrape', {action});
    else navigation.navigate('EnrollAgreement', { action });
    closeBottomSheet();
    }

    const hi = async() => {
        console.log('되는거 확인해야해서',ticketId);

        const editInfo = {
            ticketId : ticketId
        }

        if (moveStorycard) {
          try {
            const response = await getTicketDetails(editInfo);
            if (response !== null) {
              console.log("성공", response);
              console.log(response.contentsDetails);
              
              navigation.navigate('TicketDetail', {
                ticketId: ticketId,
                title : response.contentsDetails.title,
                date : response.contentsDetails.date,
                time : response.contentsDetails.time,
                location : response.contentsDetails.location
               });
      
            } else {
              alert('Fail');
            }
          } catch (error) {
            console.error('Error Moving to StoryCard:', error.response);
          }
        } else {
            setMakeCardVisible(true)
        }
    }

    const handleReviewEdit = async() => {
        const editReview = {
          ticketId : ticketId
        }
        try {
          setMakeCardVisible(false);
          const response = await getTicketDetails(editReview);
          if (response !== null) {
            console.log("성공2", response);
            
            //navigate 하면서 response 값들 보내야함
            navigation.navigate('EditReview', {
              ticketId : ticketId,
              ticketData : response,
              reviewId : reviewCardId
             });
    
          } else {
            alert('Fail');
          }
        } catch (error) {
          console.error('Error Editing ticket review:', error.response);
        }
      }

    return (
        <>
        <View style={styles.container}>
            <Image source={ticket} style={styles.image} />
            <CustomText style={styles.mainText} fontWeight="medium">나의 <CustomText style={styles.mainText} fontWeight="bold">티켓스토리</CustomText>가 등록되었어요.</CustomText>
            <CustomText style={styles.subText}>등록한 티켓은 티켓북에서 확인할 수 있어요.</CustomText>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={{...styles.navButton, backgroundColor: '#5D70F9' }} onPress={() => navigation.navigate('MainStack')}>
                    <Image style={styles.homeIcon} source={home} />
                    <CustomText style={{...styles.btnText, color: '#fff'}} fontWeight="medium">홈으로 가기</CustomText>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton} onPress={hi}>
                    <Image style={styles.storyIcon} source={storycard} />
                    <CustomText style={styles.btnText} fontWeight="medium">스토리 카드 보기</CustomText>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton} onPress={openBottomSheet}>
                    <Image style={styles.addticket} source={addticket} />
                    <CustomText style={styles.btnText} fontWeight="medium">티켓 추가 등록하기</CustomText>
                </TouchableOpacity>
            </View>
        </View>

        <Modal  
            // animationType="slide"
            transparent={true}
            visible={makeCardVisible}
            onRequestClose={() => setMakeCardVisible(false)}
          >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
              <View style={{ backgroundColor: 'white', width: 260, padding: 18, borderRadius: 10 }}>
                <CustomText style={{color: '#000', fontSize: 16, textAlign: 'center', lineHeight: 24}} fontWeight="bold"> 등록된 리뷰나 사진이 없습니다. {'\n'} 지금 등록하시겠어요? </CustomText>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20 }}>
                  <TouchableOpacity onPress={() => setMakeCardVisible(false)} style={{ backgroundColor: '#E8ECEF', width: 100, padding: 10, borderRadius: 5 }}>
                    <CustomText style={{ color: '#000', textAlign : 'center'}} fontWeight="bold">취소</CustomText>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleReviewEdit} style={{ backgroundColor: '#5D70f9', width: 100, padding: 10, borderRadius: 5 }}>
                    <CustomText style={{ color: 'white', textAlign : 'center'}} fontWeight="bold">확인</CustomText>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

        {bottomSheetVisible && (
            <BottomSheetMenu
            closeBottomSheet={closeBottomSheet}
            onClick={onClick}
            />
        )}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems:'center',
        justifyContent: 'center',
    },
    image: {
        width: 130,
        height: 150,
    },
    mainText: {
        fontSize: 18,
        color: '#525252',
        marginTop: 0,
        marginBottom: 10,
    },
    subText: {
        fontSize: 14,
        color: '#B6B6B6',
    },
    buttonContainer: {
        marginTop: '20%',
        paddingHorizontal: 40,
        width: '100%',
        gap: 16,
        marginBottom: -100
    },
    navButton: {
        backgroundColor: '#EEEEEE',
        paddingHorizontal: 18,
        paddingVertical: 15,
        borderRadius: 10,
    },
    btnText: {
        color: '#000',
        fontSize: 18,
        textAlign: 'center',
    },
    homeIcon: {
        width: 22,
        height: 22,
        position: 'absolute',
        left: 20,
        top: '50%',
        marginTop: 3,
      },
    storyIcon: {
        width: 50,
        height: 50,
        position: 'absolute',
        left: 5,
        marginTop: 3,
    },
    addticket: {
        width: 50,
        height: 50,
        position: 'absolute',
        left: 6,
        marginTop: 3,
    },
});

export default EnrollFinish;