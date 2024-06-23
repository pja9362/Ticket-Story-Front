import React, { useRef, useState } from 'react';
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


const ShowImage = ({ route }) => {
    const viewRef = useRef();

    const dispatch = useDispatch();
    const { images, ticket, ticketId } = route.params;
    const dummyImageUrl = images;

    const overlayState = useSelector((state) => state.overlay[ticketId]) || { hideImageInfo: false, hideImageTitle: false, darkText: false };
    const { hideImageInfo, hideImageTitle, darkText } = overlayState;

    const [modalVisible, setModalVisible] = useState(false);

    const closeModal = () => {
        setModalVisible(false);
    };

    const handleShareBtnPress = () => {
        handleShareBtn(viewRef);
    };

    const handleSaveBtnPress = async() => {
        try {
            const response = await handleSaveBtn(viewRef);
            console.log(response);
            setModalVisible(true);
        } catch (error) {
        console.error('Error Saving ticket?:', error.response);
        }
    }
    
    const handleSelectNewImage = () => {
        console.log('사진 다시 선택하기 버튼 클릭');
        console.log(ticketId)
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ paddingHorizontal: 20, marginBottom: 28, backgroundColor: '#fff' }}>
                <Header title="이미지 카드 보기" />
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
                {darkText ? (
                    <Image source={darklogo} style={styles.logo} />
                ) : (
                    <Image source={logo} style={styles.logo} />
                )}
                <View style={styles.overlay}>
                    {(!hideImageTitle && !hideImageInfo) && <CustomText style={{ ...styles.overlayText, fontSize: 20, color: darkText ? '#525252' : '#fff'  }}>{ticket.title}</CustomText>}
                    {!hideImageInfo && (
                        <>
                            <CustomText style={[styles.overlayGuideText, {color: darkText ? '#525252' : '#fff'}]}>Date</CustomText>
                            <CustomText style={[styles.overlayText, {color: darkText ? '#525252' : '#fff'}]}>{ticket.date}</CustomText>
                            <CustomText style={[styles.overlayGuideText, {color: darkText ? '#525252' : '#fff'}]}>Time</CustomText>
                            <CustomText style={[styles.overlayText, {color: darkText ? '#525252' : '#fff'}]}>{ticket.time}</CustomText>
                            <CustomText style={[styles.overlayGuideText, {color: darkText ? '#525252' : '#fff'}]}>Place</CustomText>
                            <CustomText style={[styles.overlayText, {color: darkText ? '#525252' : '#fff'}]}>{ticket.location}</CustomText>
                        </>
                    )}
                </View>
            </View>

            <TouchableOpacity style={styles.selectBtn} onPress={handleSelectNewImage}>
                <Image source={iconEdit} style={{ width: 24, height: 24, position: 'absolute', left: 18, top: 14 }} />
                <CustomText style={styles.btnText}>사진 다시 선택하기</CustomText>
            </TouchableOpacity>

            <View style={styles.btnContainer}>
                <TouchableOpacity onPress={handleShareBtnPress}>
                    <Image source={iconShare} style={{ width: 45, height: 45 }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSaveBtnPress}>
                    <Image source={iconSave} style={{ width: 45, height: 45 }} />
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
                        <CustomText style={{color: '#000', fontSize: 16, fontWeight: 'bold', textAlign: 'center', top: 5}}>이미지카드가 앨범에 저장됐어요</CustomText>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20 }}>
                          <TouchableOpacity onPress={closeModal} style={{ backgroundColor: '#5D70f9', width: 100, padding: 10, borderRadius: 5, marginTop: 5}}>
                            <CustomText style={{ color: 'white', fontWeight: 'bold', textAlign : 'center'}}>확인</CustomText>
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
    },
    imageContainer: {
        height: 356,
        margin: 20,
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
        padding: 10,
    },
    logo: {
        position: 'absolute',
        top: 2,
        right: 2,
        width: 110,
        height: 42,
    },
    overlayText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
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
        right: 2,
        gap: 5,
    },
    selectBtn: {
        backgroundColor: '#fff',
        marginHorizontal: 38,
        borderRadius: 10,
    },
    btnText: {
        color: '#525252',
        fontSize: 18,
        padding: 15,
        textAlign: 'center',
        fontWeight: '500',
    },
});

export default ShowImage;
