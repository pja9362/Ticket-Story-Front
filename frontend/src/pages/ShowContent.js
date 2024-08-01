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
            <View style={{paddingHorizontal: 20, marginBottom: 28, backgroundColor: '#fff' }}>
                <Header title="리뷰 카드 보기"/>
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
                <Image source={iconLogo} style={{position: 'absolute', top: 3, right: 3, width: 120, height: 40,}} />
                <View style={styles.overlay}>
                    <View style={styles.titleContainer}>
                        {
                            (!hideReviewTitle && !hideReviewInfo) && <CustomText style={{...styles.mainText, flex: 1}} fontWeight="bold">{ticket.title}</CustomText>
                        }
                    </View>
                    <View style={{position: 'absolute', top: 30, right: 25,}}>
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
                    <CustomText style={{...styles.mainText, color: '#525252', fontSize: 16}} fontWeight="bold"> {ticket.reviewTitle}</CustomText>
                    <CustomText style={styles.text} fontWeight="medium">{ticket.reviewDetails}</CustomText>
                </View>
            </View>
            
            {/* 버튼 내부 좌측에 edit icon */}
            <TouchableOpacity style={styles.selectBtn} onPress={handleEditContent}>
                <Image source={iconEdit} style={{width: 24, height: 24, position: 'absolute', left: 18, top: 14}} />
                <CustomText style={styles.btnText} fontWeight="medium">리뷰 수정하기</CustomText>
            </TouchableOpacity>

            <View style={styles.btnContainer}>
                <TouchableOpacity onPress={handleShareBtnPress}>
                    <Image source={iconShare} style={{width: 45, height: 45}} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSaveBtnPress}>
                    <Image source={iconSave} style={{width: 45, height: 45}} />
                </TouchableOpacity>
            </View>

            {modalVisible && (
                <Modal  
                transparent={true}
                visible={true}
                onRequestClose={closeModal}
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                      <View style={{ backgroundColor: 'white', height: 120, width: 280, padding: 18, borderRadius: 10 }}>
                        <CustomText style={{color: '#000', fontSize: 16, textAlign: 'center', top: 5}} fontWeight="bold">리뷰카드가 앨범에 저장됐어요</CustomText>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20 }}>
                          <TouchableOpacity onPress={closeModal} style={{ backgroundColor: '#5D70f9', width: 100, padding: 10, borderRadius: 5, marginTop: 5}}>
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
    },
    imageContainer: {
        height: 356,
        margin: 20
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 5
    },
    overlay: {
        position: 'absolute',
        top: 20,
        left: 0,
        right: 0,
        padding: 10,
    },
    logo: {
        position: 'absolute',
        top: 5,
        right: 10,
        width: 100,
        height: 40,
    },    
    overlayGuideText: {
        color: '#fff',
        fontSize: 16,
        marginTop: 4,
    },
    btnContainer: {
        flexDirection: 'row',
        padding: 20,
        gap: 45,
        justifyContent: 'center',
    },
    checkboxContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 5,
        right: 2
    },
    selectBtn: {
        backgroundColor: '#fff',
        marginHorizontal: 38,
        borderRadius: 10
    },
    btnText: {
        color: '#525252',
        fontSize: 18,
        padding: 15,
        textAlign: 'center',
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        bottom: 14,
        left: 8,
        gap: 40,
        width: 200,
    },
    mainText: {
        color: '#525252',
        fontSize: 18,
    },
    subText: {
        color: '#B6B6B6',
        fontSize: 14,
        textAlign: 'right',
    },
    reviewContainer: {
        marginTop: 75,
    },
    text: {
        color: '#525252',
        fontSize: 14,
        lineHeight: 18,
        paddingVertical: 5,
    },
    contentContainer: {
        height: 356,
        margin: 20,
        padding: 20,
        backgroundColor: '#fff',
        // borderBottomLeftRadius: 5,
        // borderBottomRightRadius: 5,
    },
});

export default ShowContent;
