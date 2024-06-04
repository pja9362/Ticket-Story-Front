import React, { useRef } from 'react';
import { SafeAreaView, StyleSheet, Text, Image, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setHideImageInfo, setHideImageTitle } from '../reducers/overlaySlice';
import { handleShareBtn, handleSaveBtn } from '../utils/shareAndSaveUtils';
import Header from '../components/Header';
import iconShare from '../images/icon_share.png';
import iconSave from '../images/icon_save.png';
import iconEdit from '../images/icon_edit_no_bg.png';
import logo from '../images/logo_white.png';
import CustomCheckbox from '../components/EnrollTicket/CustomCheckbox';


const ShowImage = ({ route }) => {
    const viewRef = useRef();

    const dispatch = useDispatch();
    const { images, ticket, ticketId } = route.params;
    const dummyImageUrl = images;

    const overlayState = useSelector((state) => state.overlay[ticketId]) || { hideImageInfo: false, hideImageTitle: false };
    const { hideImageInfo, hideImageTitle } = overlayState;

    const handleShareBtnPress = () => {
        handleShareBtn(viewRef);
    };

    const handleSaveBtnPress = () => {
        handleSaveBtn(viewRef);
    };
    
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
                {/* <CustomCheckbox
                    checked={hideTicketInfo}
                    // onPress={() => dispatch(setHideTicketInfo({ ticketId: ticketId, hideTicketInfo: !hideTicketInfo }))}
                    label="글씨 어둡게"
                /> */}
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
                <Image source={logo} style={styles.logo} />
                <View style={styles.overlay}>
                    {(!hideImageTitle && !hideImageInfo) && <Text style={{ ...styles.overlayText, fontSize: 20 }}>{ticket.title}</Text>}
                    {!hideImageInfo && (
                        <>
                            <Text style={styles.overlayGuideText}>Date</Text>
                            <Text style={styles.overlayText}>{ticket.date}</Text>
                            <Text style={styles.overlayGuideText}>Time</Text>
                            <Text style={styles.overlayText}>{ticket.time}</Text>
                            <Text style={styles.overlayGuideText}>Place</Text>
                            <Text style={styles.overlayText}>{ticket.location}</Text>
                        </>
                    )}
                </View>
            </View>

            <TouchableOpacity style={styles.selectBtn} onPress={handleSelectNewImage}>
                <Image source={iconEdit} style={{ width: 24, height: 24, position: 'absolute', left: 18, top: 14 }} />
                <Text style={styles.btnText}>사진 다시 선택하기</Text>
            </TouchableOpacity>

            <View style={styles.btnContainer}>
                <TouchableOpacity onPress={handleShareBtnPress}>
                    <Image source={iconShare} style={{ width: 45, height: 45 }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSaveBtnPress}>
                    <Image source={iconSave} style={{ width: 45, height: 45 }} />
                </TouchableOpacity>
            </View>
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
        borderRadius: 5,
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
    },
});

export default ShowImage;
