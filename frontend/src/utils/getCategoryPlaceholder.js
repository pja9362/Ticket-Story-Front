const getCategoryPlaceholder = (category, placeholderType) => {
  switch (category) {
    case '영화':
      switch (placeholderType) {
        case 'location':
          return '용산아이파크몰';
        case 'locationDetail':
          return '5관';
        case 'seats':
          return 'A12';
        default:
          return '';
      }
    case '공연':
      switch (placeholderType) {
        case 'location':
          return '블루스퀘어';
        case 'locationDetail':
          return '신한카드홀';
        case 'seats':
          return 'A12';
        default:
          return '';
      }
    case '스포츠':
      switch (placeholderType) {
        case 'location':
          return '서울종합운동장 야구장';
        case 'locationDetail':
          return '네이비석';
        case 'seats':
          return '311블럭 16열 189번';
        default:
          return '';
      }
    default:
      return '';
  }
};

export default getCategoryPlaceholder;