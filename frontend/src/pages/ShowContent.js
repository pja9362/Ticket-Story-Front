import React, { useRef, useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, Image, TouchableOpacity, View, Modal } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setHideReviewInfo, setHideReviewTitle } from '../reducers/overlaySlice';
import { handleShareBtn, handleSaveBtn } from '../utils/shareAndSaveUtils';
import Header from '../components/Header';
import iconShare from '../images/icon_share.png';
import iconSave from '../images/icon_save.png';
import iconEdit from '../images/icon_edit_no_bg.png';
import iconLogo from '../images/logo_navHeader.png';
import CustomCheckbox from '../components/EnrollTicket/CustomCheckbox';
import {CustomText} from '../components/CustomText';
import { getTicketDetail, getTicketDetails } from '../actions/ticket/ticket';
import { useNavigation } from '@react-navigation/native';
import {scale, verticalScale, moderateScale} from '../utils/sizeUtil'

const ShowContent = ({ route }) => {
    const viewRef = useRef();
    const navigation = useNavigation();

    const dispatch = useDispatch();
    const { ticket, ticketId } = route.params;

    const overlayState = useSelector((state) => state.overlay[ticketId]) || { hideReviewInfo: false, hideReviewTitle: false };
    const { hideReviewInfo, hideReviewTitle } = overlayState;

    const [reviewEdit, setReviewEdit] = useState(null);

    useEffect(() => {
      dispatch(getTicketDetail(ticketId))
        .then((response) => {

          setReviewEdit(response.reviewId);
        //   console.log('33223232',reviewEdit);

        })
    }, []);

    const [modalVisible, setModalVisible] = useState(false);

    const closeModal = () => {
        setModalVisible(false);
    };

    const handleShareBtnPress = () => {
        handleShareBtn(viewRef);
    }

    const handleSaveBtnPress = async() => {
        try {
            const response = await handleSaveBtn(viewRef);
            console.log(response);
            setModalVisible(true);
        } catch (error) {
        console.error('Error Saving ticket?:', error.response);
        }
    }
    
    // const handleEditContent = () => {
    //     console.log('리뷰 수정하기 클릭');
    // }

    const handleEditContent = async() => {
        const editReview = {
          ticketId : ticketId
        }
        try {
          const response = await getTicketDetails(editReview);
          if (response !== null) {
            console.log("성공", response);
            console.log(ticketId);
            console.log(reviewEdit);
            //navigate 하면서 response 값들 보내야함
            navigation.replace('EditReview', {
              ticketId : ticketId,
              ticketData : response,
              reviewId : reviewEdit
             });
    
          } else {
            alert('Fail');
          }
        } catch (error) {
          console.error('Error Editing ticket review:', error.response);
        }
      }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{paddingHorizontal: scale(20), marginBottom: verticalScale(28), backgroundColor: '#fff' }}>
                <Header title="리뷰카드 보기"/>
            </View> 

            <View style={styles.checkboxContainer}>
                <CustomCheckbox
                    checked={hideReviewInfo}
                    onPress={() => dispatch(setHideReviewInfo({ ticketId: ticketId, hideReviewInfo: !hideReviewInfo }))}
                    label="티켓 정보 가리기"
                />
                <CustomCheckbox
                    checked={hideReviewTitle}
                    onPress={() => dispatch(setHideReviewTitle({ ticketId: ticketId, hideReviewTitle: !hideReviewTitle }))}
                    label="콘텐츠 제목만 가리기"
                />
            </View>
            
            <View ref={viewRef} style={styles.contentContainer} collapsable={false}>
                <Image source={iconLogo} style={{position: 'absolute', top: scale(3), right: scale(3), width: scale(120), height: scale(40),}} />
                <View style={styles.overlay}>
                    <View style={styles.titleContainer}>
                        {
                            (!hideReviewTitle && !hideReviewInfo) && <CustomText style={{...styles.mainText, flex: 1}} fontWeight="bold">{ticket.title}</CustomText>
                        }
                    </View>
                    <View style={{position: 'absolute', top: scale(30), right: scale(25)}}>
                        {
                            !hideReviewInfo && (
                                <>
                                    <CustomText style={styles.subText} fontWeight="bold">{ticket.date}</CustomText>
                                    <CustomText style={styles.subText} fontWeight="bold">{ticket.location}</CustomText>
                                </>
                            )
                        }
                    </View>
                </View>
                <View style={styles.reviewContainer}>
                    <CustomText style={{...styles.mainText, color: '#525252', fontSize: scale(16)}} fontWeight="bold"> {ticket.reviewTitle}</CustomText>
                    <CustomText style={{...styles.text, textAlign: 'justify'}}>{ticket.reviewDetails}</CustomText>
                </View>
            </View>
            
            {/* 버튼 내부 좌측에 edit icon */}
            <TouchableOpacity style={styles.selectBtn} onPress={handleEditContent}>
                <Image source={iconEdit} style={{width: scale(24), height: scale(24), position: 'absolute', left: scale(18), top: scale(14)}} />
                <CustomText style={styles.btnText} fontWeight="medium">리뷰 수정하기</CustomText>
            </TouchableOpacity>

            <View style={styles.btnContainer}>
                <TouchableOpacity onPress={handleShareBtnPress}>
                    <Image source={iconShare} style={{width: scale(45), height: scale(45)}} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSaveBtnPress}>
                    <Image source={iconSave} style={{width: scale(45), height: scale(45)}} />
                </TouchableOpacity>
            </View>

            {modalVisible && (
                <Modal  
                transparent={true}
                visible={true}
                onRequestClose={closeModal}
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                      <View style={{ backgroundColor: 'white', height: scale(120), width: scale(280), padding: scale(18), borderRadius: 10 }}>
                        <CustomText style={{color: '#525252', fontSize: scale(16), textAlign: 'center', top: scale(5)}} fontWeight="bold">리뷰카드가 앨범에 저장되었어요</CustomText>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: verticalScale(20) }}>
                          <TouchableOpacity onPress={closeModal} style={{ backgroundColor: '#5D70f9', width: scale(100), padding: scale(10), borderRadius: 5, marginTop: verticalScale(5)}}>
                            <CustomText style={{ color: 'white', textAlign : 'center'}} fontWeight="bold">확인</CustomText>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                </Modal>
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EEEEEE'
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 5
    },
    overlay: {
        position: 'absolute',
        top: verticalScale(20),
        left: 0,
        right: 0,
        padding: scale(10),
    },
    btnContainer: {
        flexDirection: 'row',
        padding: scale(20),
        gap: scale(45),
        justifyContent: 'center',
    },
    checkboxContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: scale(5),
        right: scale(2)
    },
    selectBtn: {
        backgroundColor: '#fff',
        marginHorizontal: scale(38),
        borderRadius: 10
    },
    btnText: {
        color: '#525252',
        fontSize: scale(18),
        padding: scale(15),
        textAlign: 'center',
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        bottom: verticalScale(14),
        left: scale(8),
        gap: scale(40),
        width: scale(200),
    },
    mainText: {
        color: '#525252',
        fontSize: scale(16),
    },
    subText: {
        color: '#B6B6B6',
        fontSize: scale(12),
        textAlign: 'right',
    },
    reviewContainer: {
        marginTop: verticalScale(75),
    },
    text: {
        color: '#525252',
        fontSize: scale(14),
        lineHeight: verticalScale(18),
        paddingVertical: verticalScale(5),
        paddingTop: verticalScale(20)
    },
    contentContainer: {
        width: scale(356),
        height: scale(356),
        // height: 356,
        margin: scale(20),
        padding: scale(20),
        backgroundColor: '#fff',
        // borderBottomLeftRadius: 5,
        // borderBottomRightRadius: 5,
    },
});

export default ShowContent;
