import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import EnrollHeader from '../../components/EnrollTicket/EnrollHeader';
import StarRating from '../../components/EnrollTicket/StarRating';
import addPhoto from '../../images/icon_add_photo.png';

const EnrollReviewByHand = ({navigation}) => {
  const [artRating, setArtRating] = useState(0);
  const [seatRating, setSeatRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const handleStarPress = (category, rating) => {
    if (category === 'art') {
      setArtRating(rating);
    } else if (category === 'seat') {
      setSeatRating(rating);
    }
  };

  const handleTextChange = text => {
    if (text.length <= 500) {
      setReviewText(text);
    }
  };

  return (
    <>
      <EnrollHeader title="티켓 후기 입력" />
      <View style={styles.container}>
        <Text style={{fontSize: 16, fontWeight: 'bold', color: '#000'}}>
          관람한 자전차왕 엄복동의 후기를 알려주세요.
        </Text>

        <Text style={styles.sectionText}>작품 평점</Text>
        <View style={styles.inputBox}>
          <StarRating
            category="art"
            rating={artRating}
            onPress={handleStarPress}
          />
        </View>

        <Text style={styles.sectionText}>좌석 평점</Text>
        <View style={styles.inputBox}>
          <StarRating
            category="seat"
            rating={seatRating}
            onPress={handleStarPress}
          />
        </View>
        <Text style={styles.sectionText}>작품 후기</Text>
        <TouchableOpacity>
          <Image source={addPhoto} style={styles.image} />
        </TouchableOpacity>
        <Text style={{width: 48, textAlign: 'center'}}>0 / 5</Text>

        <TextInput
          style={styles.inputArea}
          multiline={true}
          value={reviewText}
          onChangeText={handleTextChange}
          maxLength={500}
        />
        <Text style={{textAlign: 'right', marginRight: 10}}>
          {reviewText.length} / 500
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 27,
    paddingVertical: 24,
  },
  sectionText: {
    fontSize: 16,
    marginTop: 15,
    marginBottom: 8,
    color: '#000',
  },
  inputBox: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    padding: 10,
  },
  image: {
    width: 48,
    height: 48,
    marginTop: 10,
  },
  inputArea: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    height: 200,
    marginVertical: 15,
    padding: 12,
  },
});

export default EnrollReviewByHand;
