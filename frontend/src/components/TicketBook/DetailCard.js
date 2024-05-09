import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import { handleShareBtn, handleSaveBtn } from '../../utils/shareAndSaveUtils';
import iconLeft from '../../images/icon_left_pagination.png';
import iconRight from '../../images/icon_right_pagination.png';
import iconLogo from '../../images/logo_navHeader.png';
import iconShare from '../../images/icon_share.png';
import iconSave from '../../images/icon_save.png';

// 더미 데이터
const dummyImages = [
    'https://source.unsplash.com/random/356x356',
    'https://source.unsplash.com/random/356x356',
    'https://source.unsplash.com/random/356x356',
];

const dummyReview = [
    '한화는 \"류현진은 2006년 한화이글스 소속으로 KBO리그에 데뷔해 그해 18승 6패 1세이브 204탈삼진 평균자책점 2.23을 기록하며 신인왕과 MVP를 동시에 획득했다. 이후 2012년까지 통산 98승 52패 1세이브 1238탈삼진 평균자책점 2.80을 기록하며 국내 최고의 투수로 우뚝 섰다"고 돌아온 에이스를 설명했다. 이어 \"2013년부터는 메이저리그에 진출해 지난해까지 78승 48패 1세이브 934탈삼진 평균자책점 3.27를 기록, 세계 최고의 무대에서도 수준급 선발투수로 활약을 펼쳤다. 특히 2019년에는 LA다저스 소속으로 14승 5패 163탈삼진 평균자책점 2.32의 성적으로 내셔널리그 사이영상 투표 2위에 오르며 최고의 시즌을 보냈다"고 되돌아봤다. 한 이정도 쓰면 적당한 길이일 것 같다.'
];

const DetailCard = ({ ticket }) => {
    const viewRef = useRef();
    const navigation = useNavigation();

    const handleShareBtnPress = () => {
        handleShareBtn(viewRef);
    }

    const handleSaveBtnPress = () => {
        handleSaveBtn(viewRef);
    }

    const handleImagePress = () => {
        navigation.navigate('ShowImageView', {images: dummyImages, index: 0, ticket: ticket});
    }

    return (
        ticket &&
        <View style={styles.container}>
            <View ref={viewRef}>
                <View style={styles.imageContainer}>
                    <Swiper
                        showsButtons={true}
                        dotStyle={styles.dot}
                        activeDotStyle={styles.activeDot}
                        paginationStyle={{justifyContent: 'flex-end', right: 20, bottom: 10}}
                        nextButton={<Image source={iconRight} style={styles.arrowImage}/>}
                        prevButton={<Image source={iconLeft} style={styles.arrowImage}/>}
                    >
                        {dummyImages.map((image, index) => (
                            <TouchableOpacity key={index} style={styles.slide} onPress={handleImagePress}>
                                <>
                                    <Image source={{uri: image}} style={styles.image} />
                                    {/* Overlay Text */}
                                    <View style={styles.overlay}>
                                        <Text style={{...styles.overlayText, fontSize: 20}}>{ticket.title}</Text>
                                        <Text style={styles.overlayGuideText}>Date</Text>
                                        <Text style={styles.overlayText}>{ticket.date}</Text>
                                        <Text style={styles.overlayGuideText}>Time</Text>
                                        <Text style={styles.overlayText}>18:00</Text>
                                        <Text style={styles.overlayGuideText}>Place</Text>
                                        <Text style={styles.overlayText}>{ticket.location}</Text>
                                    </View>
                                </>
                            </TouchableOpacity>
                        ))}
                    </Swiper>
                </View>
                <View style={styles.contentContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={{...styles.mainText, flex: 1}}>{ticket.title}</Text>
                        <Image source={iconLogo} style={{width: 120, height: 40, margin: -15, marginBottom: 5}} />
                    </View>
                    <Text style={styles.subText}>{ticket.date}</Text>
                    <Text style={styles.subText}>{ticket.location}</Text>
                    <View style={styles.reviewContainer}>
                        <Text style={{...styles.mainText, color: '#000', fontSize: 16}}> 제목제목이다</Text>
                        <Text style={styles.text}>{dummyReview[0]}</Text>
                    </View>
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
});

export default DetailCard;