import React, { useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, Image, TouchableOpacity, View } from 'react-native';
import { handleShareBtn, handleSaveBtn } from '../utils/shareAndSaveUtils';
import Header from '../components/Header';
import iconShare from '../images/icon_share.png';
import iconSave from '../images/icon_save.png';
import iconEdit from '../images/icon_edit_no_bg.png';
import logo from '../images/logo_white.png';
import CustomCheckbox from '../components/EnrollTicket/CustomCheckbox';

const ShowImage = ({ route }) => {
    const viewRef = useRef();

    const { images, index, ticket } = route.params;
    const dummyImageUrl = images[index];

    const [hideTicketInfo, setHideTicketInfo] = useState(false);
    const [hideTitle, setHideTitle] = useState(false);

    const handleShareBtnPress = () => {
        handleShareBtn(viewRef);
    }

    const handleSaveBtnPress = () => {
        handleSaveBtn(viewRef);
    }
    
    const handleSelectNewImage = () => {
        console.log('사진 다시 선택하기 버튼 클릭');
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{paddingHorizontal: 20, marginBottom: 28, backgroundColor: '#fff' }}>
                <Header title="사진 카드 보기" />
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
            
            <View ref={viewRef} style={styles.imageContainer} collapsable={false}>
                <Image source={{ uri: dummyImageUrl }} style={styles.image}/>
                <Image source={logo} style={styles.logo}/>
                <View style={styles.overlay}>
                    {
                        (!hideTitle && !hideTicketInfo) && <Text style={{...styles.overlayText, fontSize: 20}}>{ticket.title}</Text>
                    }
                    {
                        !hideTicketInfo && (
                            <>
                                <Text style={styles.overlayGuideText}>Date</Text>
                                <Text style={styles.overlayText}>{ticket.date}</Text>
                                <Text style={styles.overlayGuideText}>Time</Text>
                                <Text style={styles.overlayText}>18:00</Text>
                                <Text style={styles.overlayGuideText}>Place</Text>
                                <Text style={styles.overlayText}>{ticket.location}</Text>
                            </>
                        )
                    }
                </View>
            </View>
            
            {/* 버튼 내부 좌측에 edit icon */}
            <TouchableOpacity style={styles.selectBtn} onPress={handleSelectNewImage}>
                <Image source={iconEdit} style={{width: 24, height: 24, position: 'absolute', left: 18, top: 14}} />
                <Text style={styles.btnText}>사진 다시 선택하기</Text>
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
        bottom: 0,
        left: 0,
        right: 0,
        padding: 10,
    },
    logo: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 120,
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
});

export default ShowImage;
