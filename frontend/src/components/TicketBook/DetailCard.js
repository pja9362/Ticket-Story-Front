import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Swiper from 'react-native-swiper';
import { handleShareBtn, handleSaveBtn } from '../../utils/shareAndSaveUtils';
import iconLeft from '../../images/icon_left_pagination.png';
import iconRight from '../../images/icon_right_pagination.png';
import iconLogo from '../../images/logo_navHeader.png';
import iconShare from '../../images/icon_share.png';
import iconSave from '../../images/icon_save.png';
import logo from '../../images/logo_white.png';

const DetailCard = ({ ticket, ticketId }) => {

    const viewRef = useRef();
    const navigation = useNavigation();

    const overlayState = useSelector((state) => state.overlay[ticketId]) || { hideTicketInfo: false, hideTitle: false };
    const { hideTicketInfo, hideTitle } = overlayState;

    const handleShareBtnPress = () => {
        handleShareBtn(viewRef);
    }

    const handleSaveBtnPress = async() => {
        try {
            const response = await handleSaveBtn(viewRef);
            console.log(response);
            
        } catch (error) {
        console.error('Error Saving ticket?:', error.response);
        }
    }

    const handleImagePress = (idx) => {
        navigation.navigate('ShowImageView', {images: ticket.reviewImages, index: idx, ticket: ticket, ticketId: ticketId});
    }

    const handleContentPress = () => {
        navigation.navigate('ShowContentView', {ticket: ticket});
    }

    return (
        ticket &&
        <View style={styles.container}>
            <View ref={viewRef}>
                <View style={styles.imageContainer}>
                    {ticket.reviewImages && ticket.reviewImages.length > 0 ? (
                        <Swiper
                            showsButtons={true}
                            dotStyle={styles.dot}
                            activeDotStyle={styles.activeDot}
                            paginationStyle={{ justifyContent: 'flex-end', right: 20, bottom: 10 }}
                            nextButton={<Image source={iconRight} style={styles.arrowImage} />}
                            prevButton={<Image source={iconLeft} style={styles.arrowImage} />}
                        >
                            {ticket.reviewImages.map((image, index) => (
                            <TouchableOpacity key={index} style={styles.slide} onPress={() => handleImagePress(index)}>
                                <>
                                <Image source={{ uri: image }} style={styles.image} />
                                <Image source={logo} style={styles.logo} />
                                <View style={styles.overlay}>
                                    {(!hideTitle && !hideTicketInfo) && (
                                    <Text style={{ ...styles.overlayText, fontSize: 20 }}>{ticket.title}</Text>
                                    )}
                                    {!hideTicketInfo && (
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
                                </>
                            </TouchableOpacity>
                            ))}
                        </Swiper>
                        ) : (
                        <View style={styles.noImageContainer}>
                            <Text style={styles.noImageText}>No images available</Text>
                        </View>
                        )}
                </View>
                <View style={styles.contentContainer}>
                    <TouchableOpacity onPress={handleContentPress}>
                        <View style={styles.titleContainer}>
                            <Text style={{...styles.mainText, flex: 1}}>{ticket.title}</Text>
                            <Image source={iconLogo} style={{width: 120, height: 40, margin: -15, marginBottom: 5}} />
                        </View>
                        <Text style={styles.subText}>{ticket.date}</Text>
                        <Text style={styles.subText}>{ticket.location}</Text>
                        <View style={styles.reviewContainer}>
                            <Text style={{...styles.mainText, color: '#000', fontSize: 16}}> {ticket.reviewTitle}</Text>
                            <Text style={styles.text}>{ticket.reviewDetails}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.btnContainer}>
                <TouchableOpacity onPress={handleShareBtnPress}>
                    <Image source={iconShare} style={{width: 45, height: 45}} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSaveBtnPress}>
                    <Image source={iconSave} style={{width: 45, height: 45}} />
                </TouchableOpacity>
            </View>

            {/* <Modal  
            // animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <View style={{ backgroundColor: 'white', width: 280, padding: 18, borderRadius: 10 }}>
                    <Text style={{color: '#000', fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}>선택한 티켓을 삭제합니다.</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20 }}>
                    <TouchableOpacity onPress={() => setModalVisible(false)} style={{ backgroundColor: '#E8ECEF', width: 100, padding: 10, borderRadius: 5 }}>
                        <Text style={{ color: '#000', fontWeight: 'bold', textAlign : 'center'}}>취소</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleIconDelete} style={{ backgroundColor: '#5D70f9', width: 100, padding: 10, borderRadius: 5 }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', textAlign : 'center'}}>확인</Text>
                    </TouchableOpacity>
                    </View>
                </View>
                </View>
            </Modal> */}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 50
    },
    imageContainer: {
        height: 356,
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    dot: {
        backgroundColor: '#fff',
        width: 10,
        height: 10,
        borderRadius: 5,
    },
    activeDot: {
        backgroundColor: '#525252',
        width: 10,
        height: 10,
        borderRadius: 5,
    },
    arrowImage: {
        width: 12,
        height: 38,
    },
    contentContainer: {
        padding: 20,
        backgroundColor: '#fff',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 40,
    },
    reviewContainer: {
        marginTop: 15,
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
    text: {
        color: '#525252',
        fontSize: 14,
        lineHeight: 18,
        paddingVertical: 5,
    },
    btnContainer: {
        flexDirection: 'row',
        padding: 20,
        gap: 45,
        justifyContent: 'center',
    },
    overlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 12,
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
    logo: {
        position: 'absolute',
        top: 5,
        right: 10,
        width: 100,
        height: 40,
    },  
    noImageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    noImageText: {
        color: '#777',
        fontSize: 16,
    },
});

export default DetailCard;