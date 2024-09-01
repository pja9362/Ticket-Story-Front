const getCategoryPlaceholder = (category, placeholderType) => {
  switch (category) {
    case 'MOVIE':
      switch (placeholderType) {
        case 'title':
          return '영화 제목';
        case 'location':
          return 'CGV 대학로';
        case 'locationDetail':
          return '5관';
        case 'seats':
          return 'A열 12번';
        default:
          return '';
      }
    case 'MUSICAL':
    case 'PLAY':
      switch (placeholderType) {
        case 'title':
          return '공연 제목';
        case 'location':
          return '블루스퀘어';
        case 'locationDetail':
          return '신한카드홀';
        case 'seats':
          return 'A열 12번';
        default:
          return '';
      }
    case 'SPORTS':
      switch (placeholderType) {
        case 'title':
          return '한화 vs 두산';
        case 'location':
          return '잠실야구장';
        case 'locationDetail':
          return '네이비석';
        case 'seats':
          return '321블럭 19열 241번';
        default:
          return '';
      }
    default:
      return '';
  }
};

export default getCategoryPlaceholder;