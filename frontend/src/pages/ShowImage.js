import React, { useRef, useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, Image, TouchableOpacity, View, Modal } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setHideImageInfo, setHideImageTitle, setDarkText } from '../reducers/overlaySlice';
import { handleShareBtn, handleSaveBtn } from '../utils/shareAndSaveUtils';
import Header from '../components/Header';
import iconShare from '../images/icon_share.png';
import iconSave from '../images/icon_save.png';
import iconEdit from '../images/icon_edit_no_bg.png';
import logo from '../images/logo_white.png';
import darklogo from '../images/logo_dark.png';
import CustomCheckbox from '../components/EnrollTicket/CustomCheckbox';
import {CustomText} from '../components/CustomText';
import ImagePicker from 'react-native-image-crop-picker';
import { uploadImage, updateReviewImage } from '../actions/ticket/ticket';
import { useNavigation } from '@react-navigation/native';
import {scale, verticalScale, moderateScale} from '../utils/sizeUtil'
import analytics from '@react-native-firebase/analytics';

const ShowImage = ({ route }) => {
    const viewRef = useRef();
    const navigation = useNavigation();

    const dispatch = useDispatch();
    const { images, ticket, ticketId } = route.params;
    const dummyImageUrl = images;
    // const [dummyImageUrl, setDummyImageUrl] = useState(images);

    const overlayState = useSelector((state) => state.overlay[ticketId]) || { hideImageInfo: false, hideImageTitle: false, darkText: false };
    const { hideImageInfo, hideImageTitle, darkText } = overlayState;

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImages, setSelectedImages] = useState(null);

    useEffect(() => {
        analytics().logScreenView({
            screen_name: '이미지카드 보기',
            screen_class: 'storycard'
        })
    }, [])

    const closeModal = () => {
        setModalVisible(false);
    };

    const handleShareBtnPress = () => {
        handleShareBtn(viewRef);
        analytics().logEvent('imagecard_share_click');
    };

    const handleSaveBtnPress = async() => {
        try {
            const response = await handleSaveBtn(viewRef);
            console.log(response);
            setModalVisible(true);
            analytics().logEvent('imagecard_save_click');
        } catch (error) {
        console.error('Error Saving ticket?:', error.response);
        }
    }
    
    const handleSelectNewImage = async () => {
        console.log('사진 다시 선택하기 버튼 클릭');
        console.log(ticketId)
        analytics().logEvent('imagecard_reselect_click');

        try {
    
        const image = await ImagePicker.openPicker({
            cropping: true,
            mediaType: 'photo',
            width: 1000,
            height: 1000
        });
    
        const uploadedImagePath = await uploadImage(image.path);
        console.log(uploadedImagePath);

        const requestData = {
            imageOrder : 0,
            imageUrl : uploadedImagePath
        }

            try {
                const updatedReviewImage = await updateReviewImage(ticket.reviewId, requestData)
                console.log(updatedReviewImage);
                navigation.replace('TicketDetail', {ticketId: ticketId, title: ticket.title, date : ticket.date, time: ticket.time, location: ticket.location})
            } catch (error){
                console.log('Update Review Image Error: ', error);  
            }


        } catch (error) {
        console.log('ImagePicker Error: ', error);
        } 
    };
;


    const shadowTextStyle = !darkText ? styles.textShadow : {};


    return (
        <SafeAreaView style={styles.container}>
            <View style={{ paddingHorizontal: scale(20), marginBottom: verticalScale(28), backgroundColor: '#fff' }}>
                <Header title="이미지카드 보기" />
            </View>

            <View style={styles.checkboxContainer}>
                <CustomCheckbox
                    checked={darkText}
                    onPress={() => dispatch(setDarkText({ ticketId: ticketId, darkText: !darkText }))}
                    label="글씨 어둡게"
                />
                <CustomCheckbox
                    checked={hideImageInfo}
                    onPress={() => dispatch(setHideImageInfo({ ticketId: ticketId, hideImageInfo: !hideImageInfo }))}
                    label="티켓 정보 가리기"
                />
                <CustomCheckbox
                    checked={hideImageTitle}
                    onPress={() => dispatch(setHideImageTitle({ ticketId: ticketId, hideImageTitle: !hideImageTitle }))}
                    label="콘텐츠 제목만 가리기"
                />
            </View>

            <View ref={viewRef} style={styles.imageContainer} collapsable={false}>
                <Image source={{ uri: dummyImageUrl }} style={styles.image} />
                {/* <Image source={{ uri: selectedImages[0] }} style={styles.image} /> */}
                {darkText ? (
                    <Image source={darklogo} style={styles.logo} />
                ) : (
                    <Image source={logo} style={styles.logo} />
                )}
                <View style={styles.overlay}>
                    {/* {(!hideImageTitle && !hideImageInfo) && <CustomText style={darkText ? { ...styles.overlayText, fontSize: scale(20), color: darkText ? '#525252' : '#fff'  } : { ...styles.overlayText, ...styles.textShadow, fontSize: scale(20), color: darkText ? '#525252' : '#fff'  }} fontWeight="bold">{ticket.title}</CustomText>} */}
                    {(!hideImageTitle && !hideImageInfo) && <CustomText style={darkText ? { ...styles.overlayText, fontSize: scale(20), color: darkText ? '#525252' : '#fff'  } : { ...styles.overlayText, fontSize: scale(20), color: darkText ? '#525252' : '#fff'  }} fontWeight="bold">{ticket.title}</CustomText>}
                    {!hideImageInfo && (
                        <>
                            <CustomText style={[styles.overlayGuideText, {color: darkText ? '#525252' : '#fff'}]}>Date</CustomText>
                            {/* <CustomText style={[styles.overlayText, shadowTextStyle, {color: darkText ? '#525252' : '#fff'}]} fontWeight="extrabold">{ticket.date}</CustomText> */}
                            <CustomText style={[styles.overlayText, {color: darkText ? '#525252' : '#fff'}]} fontWeight="extrabold">{ticket.date}</CustomText>
                            <CustomText style={[styles.overlayGuideText, {color: darkText ? '#525252' : '#fff'}]}>Time</CustomText>
                            {/* <CustomText style={[styles.overlayText, shadowTextStyle, {color: darkText ? '#525252' : '#fff'}]} fontWeight="extrabold">{ticket.time}</CustomText> */}
                            <CustomText style={[styles.overlayText, {color: darkText ? '#525252' : '#fff'}]} fontWeight="extrabold">{ticket.time}</CustomText>
                            <CustomText style={[styles.overlayGuideText, {color: darkText ? '#525252' : '#fff'}]}>Place</CustomText>
                            {/* <CustomText style={[styles.overlayText, shadowTextStyle, {color: darkText ? '#525252' : '#fff'}]} fontWeight="extrabold">{ticket.location}</CustomText> */}
                            <CustomText style={[styles.overlayText, {color: darkText ? '#525252' : '#fff'}]} fontWeight="extrabold">{ticket.location}</CustomText>
                        </>
                    )}
                </View>
            </View>

            <TouchableOpacity style={styles.selectBtn} onPress={handleSelectNewImage}>
                <Image source={iconEdit} style={{ width: scale(24), height: scale(24), position: 'absolute', left: scale(18), top: scale(14) }} />
                <CustomText style={styles.btnText} fontWeight="medium">사진 다시 선택하기</CustomText>
            </TouchableOpacity>

            <View style={styles.btnContainer}>
                <TouchableOpacity onPress={handleShareBtnPress}>
                    <Image source={iconShare} style={{ width: scale(45), height: scale(45) }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSaveBtnPress}>
                    <Image source={iconSave} style={{ width: scale(45), height: scale(45) }} />
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
                        <CustomText style={{color: '#525252', fontSize: scale(16), textAlign: 'center', top: scale(5)}} fontWeight="bold">이미지카드가 앨범에 저장되었어요</CustomText>
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
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EEEEEE'
    },
    imageContainer: {
        width: scale(356),
        height: scale(356),
        margin: scale(20),
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        // borderRadius: 5,
    },
    overlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: scale(10),
    },
    logo: {
        position: 'absolute',
        top: verticalScale(2),
        right: scale(2),
        width: scale(110),
        height: scale(42),
    },
    overlayText: {
        color: '#fff',
        fontSize: scale(16),
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.5,
        // shadowRadius: 4,
        // elevation: 5, // Android에서 그림자 효과를 추가하기 위해 사용
        
    },
    textShadow: {
        color: 'white', // 텍스트 색상과 일치하도록 설정
        textShadowColor: 'rgba(0, 0, 0, 0.5)', // 그림자의 투명도를 조절
        textShadowOffset: { width: 0, height: 2 }, // 그림자 오프셋
        textShadowRadius: 4, // 그림자 블러 반경
        elevation: 5, // Android에서 그림자 효과를 추가하기 위해 사용
    },
    overlayGuideText: {
        color: '#fff',
        fontSize: scale(16),
        marginTop: verticalScale(4),
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
        right: scale(2),
        gap: scale(5),
    },
    selectBtn: {
        backgroundColor: '#fff',
        marginHorizontal: scale(38),
        borderRadius: 10,
    },
    btnText: {
        color: '#525252',
        fontSize: scale(18),
        padding: scale(15),
        textAlign: 'center',
    },
});

export default ShowImage;
