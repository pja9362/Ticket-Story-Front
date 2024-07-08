import React, { useEffect, useState, useCallback, useRef } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Image, Dimensions, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import TicketItem from '../../components/TicketBook/TicketItem';
import NavHeader from '../../components/NavHeader';
import { useSelector, useDispatch } from 'react-redux';
import { getMyTickets, resetUpdateTicket } from '../../actions/ticket/ticket';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import noTicket from '../../images/no_ticket.png';
import addIcon from '../../images/icon_add_ticket.png';
import BottomSheetMenu from '../../components/EnrollTicket/BottomSheetMenu';
import DropDownPicker from 'react-native-dropdown-picker';
import iconUp from '../../images/icon_up.png'
import iconDown from '../../images/icon_down.png'
import iconLine from '../../images/icon_line.png'


const imageHeight = Dimensions.get('window').width * 0.45 * 1.43;
const imageWidth = Dimensions.get('window').width * 0.45;

const TicketBook = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const auth = useSelector((state) => state.auth.isAuthenticated);
  const ticketData = useSelector((state) => state.ticket.myTickets);
  const totalPages = useSelector((state) => state.ticket.myTickets.totalPages);
  const ticketUpdated = useSelector((state) => state.ticket.ticketUpdated);

  const [isDesc, setIsDesc] = useState(true);
  const [orderText, setOrderText] = useState('DESC')

  const [page, setPage] = useState(0);
  const [allTickets, setAllTickets] = useState([]);

  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

  const [openOrder, setOpenOrder] = useState(false);
  const [openType, setOpenType] = useState(false);
  const [defaultOrder, setDefaultOrder] = useState('eventTime');
  const [defaultType, setDefaultType] = useState("");
  const [orders, setOrders] = useState([
    {label: '관람일순', value: 'eventTime'},
    {label: '등록일순', value: 'registerTime'},
    {label: '콘텐츠 평점순', value: 'rating'},
  ]);
  const [types, setTypes] = useState([
    {label: '전체', value: ""},
    {label: '영화', value: 'movie'},
    {label: '공연', value: 'performance'},
    {label: '스포츠', value: 'sport'},
  ]);

  const scrollViewRef = useRef(null);
  const scrollPosition = useRef(0);
  const pageRef = useRef(page);
  
  useEffect(() => {
    pageRef.current = page;
  }, [page])

  const openBottomSheet = () => {
    setBottomSheetVisible(true);
  };

  const closeBottomSheet = () => {
    setBottomSheetVisible(false);
  };

  const onClick = (action) => {
    if (action === 'scrape') navigation.navigate('EnrollByScrape', {action});
    else navigation.navigate('EnrollAgreement', { action });
    closeBottomSheet();
  }


  const saveScrollPosition = (event) => {
    scrollPosition.current = event.nativeEvent.contentOffset.y;
  };

  const restoreScrollPosition = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: scrollPosition.current, animated: false });
    }
  };

  const refreshTickets = useCallback(async () => {
    if (auth) {
      // saveScrollPosition();
      console.log('좀 말좀 들어라',defaultOrder);
      dispatch(getMyTickets(0, (pageRef.current + 1) * 10, orderText, defaultOrder, (newTickets) => {
        setAllTickets([]);
        setAllTickets(newTickets);
        setTimeout(restoreScrollPosition, 0);
        // console.log('?',newTickets);
      }));
      setOpenOrder(false);
      setOpenType(false);
    }
  }, [auth, dispatch, defaultOrder, orderText]);

  useEffect(() => {
    if (ticketUpdated) {
      const refreshAndReset = async () => {
        await refreshTickets();
        dispatch(resetUpdateTicket());
      };
      refreshAndReset();
    }
  }, [ticketUpdated, refreshTickets, dispatch]);



  useEffect(() => {
    console.log('이건 제대로?',defaultOrder);
    if (auth && page > 0) {
      dispatch(getMyTickets(page, 10, orderText, defaultOrder, (newTickets) => {
        setAllTickets((prevTickets) => [...prevTickets, ...newTickets]);
      }));
    }
  }, [auth, page]);


  const handleScroll = (event) => {
    saveScrollPosition(event);
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 30;
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom) {
      if (page <= totalPages - 1) {
        setPage(page + 1);
      }
    }
  };


  const deleteTicketById = (ticketId) => {
    setAllTickets((prevTickets) => prevTickets.filter(ticket => ticket.ticketId !== ticketId));
  };

  const closeSelectBox = () => {
    setOpenOrder(false);
    setOpenType(false);
  }

  const changeArrow = async () => {
   setOrderText(prevOrderText => (prevOrderText === 'DESC' ? 'ASC' : 'DESC'));
  }

  useEffect(() => {

    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
    // if (orderText) {
    console.log(orderText);
    dispatch(getMyTickets(0, 10, orderText, defaultOrder, (newTickets) => {
      setPage(0);
      setAllTickets([]);
      setAllTickets(newTickets);
    }));
    // }

  }, [orderText]);
  

  const onOrderChange = (value) => {
    console.log('선택된 값:', value);
    setDefaultOrder(value);

    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }

    dispatch(getMyTickets(0, 10, orderText, value, (newTickets) => {
      setPage(0);
      setAllTickets([]);
      setAllTickets(newTickets);
    }));
  };

  const onTypeChange = (value) => {
    console.log('선택된 값:', value);
    // setDefaultOrder(value);

    // if (scrollViewRef.current) {
    //   scrollViewRef.current.scrollTo({ y: 0, animated: true });
    // }

    // dispatch(getMyTickets(0, 10, orderText, value, (newTickets) => {
    //   setPage(0);
    //   setAllTickets([]);
    //   setAllTickets(newTickets);
    // }));
  };


  return (
    <TouchableWithoutFeedback onPress={closeSelectBox}>
    <View style={{flex:1}}>
    <SafeAreaView style={styles.container}>
      <NavHeader />
        <View style={{flexDirection:'row', zIndex:1, alignItems: 'center', justifyContent: 'space-between'}}>
          <View style={{flexDirection:'row'}}>
            <DropDownPicker
            style={{width: 130, minHeight: 30, borderColor: '#525252'}}
            containerStyle={{marginLeft:15, marginBottom:15, width: 130, minHeight: 30}}
            dropDownContainerStyle={{borderColor: '#525252'}}
            labelStyle={{fontFamily: 'Pretendard-Medium', fontSize: 14}}
            textStyle={{fontFamily: 'Pretendard-Regular', fontSize: 14}}
            listItemContainerStyle={{height:30, borderBottomWidth: 1, borderBottomColor: '#EEEEEE', borderBottomStartRadius : 10, borderBottomEndRadius : 10}}
            selectedItemLabelStyle={{fontFamily: 'Pretendard-Medium'}}
            showTickIcon={false}
            // ArrowUpIconComponent={({style}) => <MyArrowUpIcon style={style} />}
            // ArrowDownIconComponent={({style}) => <MyArrowDownIcon style={style} />}
            open={openOrder}
            value={defaultOrder}
            items={orders}
            setOpen={setOpenOrder}
            // setValue={setDefaultOrder}
            setValue={(callback) => {
              const value = callback(defaultOrder);
              // setDefaultOrder(value);
              onOrderChange(value);
            }}
            setItems={setOrders}
            />

            <Image source={iconLine} style={{marginHorizontal: 7, width:1.5, height: 30}}/>
            
            <TouchableOpacity onPress={changeArrow} >
              <Image source={orderText === 'DESC' ? iconDown : iconUp} style={{width: 35, height: 35, marginTop: -3, marginLeft: -6}}/>
            </TouchableOpacity>
          </View>

          <DropDownPicker
          style={{width: 90, minHeight: 30, borderColor: '#525252'}}
          containerStyle={{marginBottom:15, width: 90, minHeight: 30, marginRight: 15}}
          dropDownContainerStyle={{borderColor: '#525252'}}
          labelStyle={{fontFamily: 'Pretendard-Medium', fontSize: 14}}
          textStyle={{fontFamily: 'Pretendard-Regular', fontSize: 14}}
          listItemContainerStyle={{height:30, borderBottomWidth: 1, borderBottomColor: '#EEEEEE', borderBottomStartRadius : 10, borderBottomEndRadius : 10}}
          selectedItemLabelStyle={{fontFamily: 'Pretendard-Medium'}}
          showTickIcon={false}
          // ArrowUpIconComponent={({style}) => <MyArrowUpIcon style={style} />}
          // ArrowDownIconComponent={({style}) => <MyArrowDownIcon style={style} />}
          open={openType}
          value={defaultType}
          items={types}
          setOpen={setOpenType}
          // setValue={setDefaultType}
          setValue={(callback) => {
            const value = callback(defaultType);
            setDefaultType(value);
            onTypeChange(value);
          }}
          setItems={setTypes}
          />

        </View>
              
      <ScrollView 
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollViewContent}
        onScroll={handleScroll}
        scrollEventThrottle={300}>
        <View style={styles.rowContainer}>
          {allTickets && allTickets.length !== 0 ? allTickets.map((ticket, index) => (
            <View key={index}>
              <TicketItem {...ticket} deleteTicketById={deleteTicketById} />
            </View>
          ))
          : (
            <View style={styles.noTicketContainer}>
              <Image source={noTicket} style={styles.ticketCard} />
              <TouchableOpacity onPress={openBottomSheet}>
                <Image source={addIcon} style={styles.addIcon} />
              </TouchableOpacity>
            </View>
          )
        }
        </View>
      </ScrollView>
      
    </SafeAreaView>

    {bottomSheetVisible && (
      <BottomSheetMenu
        closeBottomSheet={closeBottomSheet}
        onClick={onClick}
      />
    )}
    </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    width: '92%',
    alignSelf: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  ticketCard: {
    width: imageWidth,
    height: imageHeight,
    resizeMode: 'cover',
  },
  noTicketContainer: {
    width: imageWidth,
    height: imageHeight,
    alignItems: 'center',
  },
  addIcon: {
    width: 31, 
    height: 31,  
    bottom: imageHeight*0.6,
  },
});

export default TicketBook;
