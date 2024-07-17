import React, {useState, useEffect} from 'react';
import EnrollHeader from '../../components/EnrollTicket/EnrollHeader';
// import TicketAgreement from '../../components/EnrollTicket/TicketAgreement';
import SelectType from '../../components/EnrollTicket/SelectType';

const EnrollAgreement = ({route, navigation}) => {
  const { action } = route.params;
  console.log("ACTION : ", action);

  const [showSelectType, setShowSelectType] = useState(false);

  const onClick = (categoryInfo) => {
    console.log(categoryInfo);

    if (action === 'hand') {
      navigation.navigate('EnrollInfoByHand', { categoryInfo });
    } else if (action === 'camera') {
      navigation.navigate('EnrollByOCR', { categoryInfo });
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
