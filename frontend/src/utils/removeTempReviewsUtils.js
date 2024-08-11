import AsyncStorage from "@react-native-async-storage/async-storage";

export const removeTempReviews = async () => {
    try {
        // 모든 키를 가져옴
        const keys = await AsyncStorage.getAllKeys();
    
        const tempReviewKeys = keys && keys.filter(key => key.includes('tempReview'));
    
        await AsyncStorage.multiRemove(tempReviewKeys);
    
        console.log('tempReview를 포함하는 모든 항목이 삭제되었습니다.');
      } catch (error) {
        console.error('항목을 삭제하는 중 오류가 발생했습니다:', error);
    }
};
