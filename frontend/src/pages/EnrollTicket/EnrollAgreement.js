import React, {useState, useEffect} from 'react';
import EnrollHeader from '../../components/EnrollTicket/EnrollHeader';
// import TicketAgreement from '../../components/EnrollTicket/TicketAgreement';
import SelectType from '../../components/EnrollTicket/SelectType';
import analytics from '@react-native-firebase/analytics';

const EnrollAgreement = ({route, navigation}) => {
  const { action } = route.params;
  console.log("ACTION : ", action);

  const [showSelectType, setShowSelectType] = useState(false);

  const onClick = (categoryInfo) => {

    const categoryForAnalytics = categoryInfo.category.toLowerCase();

    if (action === 'hand') {
      navigation.navigate('EnrollInfoByHand', { categoryInfo });
      analytics().logEvent('ticket_manual_category', {category: categoryForAnalytics, place: categoryInfo.categoryDetail});
      // analytics().logEvent('ticket_manual_category', {contents: categoryInfo.category, place: categoryInfo.categoryDetail});
    } else if (action === 'camera') {
      navigation.navigate('EnrollByOCR', { categoryInfo });
      analytics().logEvent('ticket_camera_category', {category: categoryForAnalytics, place: categoryInfo.categoryDetail});
      // analytics().logEvent('ticket_camera_category', {contents: categoryInfo.category, place: categoryInfo.categoryDetail});
    }
  };

  const headerTitle = action === 'hand' ? "직접 입력으로 티켓 등록하기" : "카메라로 티켓 등록하기";
  const headerOnClick = action === 'hand' ? () => navigation.navigate('EnrollInfoByHand') : () => navigation.navigate('EnrollByOCR');


  return (
    <>
      <EnrollHeader title={headerTitle}/>
        <SelectType onClick={onClick}/>
    </>
  );
};

export default EnrollAgreement;
