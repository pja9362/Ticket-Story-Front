import React, { useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, Image, TouchableOpacity, View } from 'react-native';
import { handleShareBtn, handleSaveBtn } from '../utils/shareAndSaveUtils';
import Header from '../components/Header';
import iconShare from '../images/icon_share.png';
import iconSave from '../images/icon_save.png';
import iconEdit from '../images/icon_edit_no_bg.png';
import iconLogo from '../images/logo_navHeader.png';
import CustomCheckbox from '../components/EnrollTicket/CustomCheckbox';

const ShowContent = ({ route }) => {
    const viewRef = useRef();

    const { ticket } = route.params;

    const [hideTicketInfo, setHideTicketInfo] = useState(false);
    const [hideTitle, setHideTitle] = useState(false);

    const handleShareBtnPress = () => {
        handleShareBtn(viewRef);
    }

    const handleSaveBtnPress = () => {
        handleSaveBtn(viewRef);
    }
    
    const handleEditContent = () => {
        console.log('리뷰 수정하기 클릭');
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{paddingHorizontal: 20, marginBottom: 28, backgroundColor: '#fff' }}>
                <Header title="리뷰 카드 보기" />
            </View> 

            <View style={styles.checkboxContainer}>
                <CustomCheckbox
                    checked={hideTicketInfo}
                    onPress={() => setHideTicketInfo(!hideTicketInfo)}
                    label="티켓 정보 가리기"
                />
                <CustomCheckbox
                    checked={hideTitle}
                    onPress={() => setHideTitle(!hideTitle)}
                    label="콘텐츠 제목만 가리기"
                />
            </View>
            
            <View ref={viewRef} style={styles.contentContainer} collapsable={false}>
                <Image source={iconLogo} style={{position: 'absolute', top: 3, right: 3, width: 120, height: 40,}} />
                <View style={styles.overlay}>
                    <View style={styles.titleContainer}>
                        {
                            (!hideTitle && !hideTicketInfo) && <Text style={{...styles.mainText, flex: 1}}>{ticket.title}</Text>
                        }
                    </View>
                    <View style={{position: 'absolute', top: 30, right: 25,}}>
                        {
                            !hideTicketInfo && (
                                <>
                                    <Text style={styles.subText}>{ticket.date}</Text>
                                    <Text style={styles.subText}>{ticket.location}</Text>
                                </>
                            )
                        }
                    </View>
                </View>
                <View style={styles.reviewContainer}>
                    <Text style={{...styles.mainText, color: '#000', fontSize: 16}}> {ticket.reviewTitle}</Text>
                    <Text style={styles.text}>{ticket.reviewDetails}</Text>
                </View>
            </View>
            
            {/* 버튼 내부 좌측에 edit icon */}
            <TouchableOpacity style={styles.selectBtn} onPress={handleEditContent}>
                <Image source={iconEdit} style={{width: 24, height: 24, position: 'absolute', left: 18, top: 14}} />
                <Text style={styles.btnText}>리뷰 수정하기</Text>
            </TouchableOpacity>

            <View style={styles.btnContainer}>
                <TouchableOpacity onPress={handleShareBtnPress}>
                    <Image source={iconShare} style={{width: 45, height: 45}} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSaveBtnPress}>
                    <Image source={iconSave} style={{width: 45, height: 45}} />
                </TouchableOpacity>
            </View>
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
        gap: 10,
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
    },
    mainText: {
        color: '#525252',
        fontSize: 18,
        fontWeight: 'bold',
    },
    subText: {
        color: '#B6B6B6',
        fontSize: 14,
        fontWeight: 'bold',
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
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    },
});

export default ShowContent;
