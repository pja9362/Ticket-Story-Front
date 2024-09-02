export const getMappedDetailCategory = (category, categoryDetail) => {
    switch (category) {
      case '영화':
        switch (categoryDetail) {
          case 'cgv':
          case 'CGV':
            return { category: 'MOVIE', categoryDetail: 'CGV' };
          case 'lottecinema':
          case 'LOTTECINEMA':
            return { category: 'MOVIE', categoryDetail: 'LOTTECINEMA' };
          case 'megabox':
          case 'MEGABOX':
            return { category: 'MOVIE', categoryDetail: 'MEGABOX' };
          case 'etc':
          case 'ETC':
          case '기타':
            return { category: 'MOVIE', categoryDetail: 'ETC' };
          default:
            return { category: 'MOVIE', categoryDetail: 'MOVIE' };
        }
      case '공연':
        switch (categoryDetail) {
          case '뮤지컬':
          case 'MUSICAL':
            return { category: 'MUSICAL', categoryDetail: '' };
          case '연극':
          case 'PLAY':
            return { category: 'PLAY', categoryDetail: '' };
          default:
            return { category: 'PERFORMANCE', categoryDetail: '' };
        }
      case '스포츠':
        switch (categoryDetail) {
          case '야구':
            return { category: 'SPORTS', categoryDetail: 'BASEBALL' };
          case '축구':
            return { category: 'SPORTS', categoryDetail: 'SOCCER' };
          default:
            return { category: 'SPORTS', categoryDetail: 'ETC' };
        }
      default:
        return { category, categoryDetail };
    }
};

export const getMappedCategory = (category) => {
    switch (category) {
      case '영화':
      case 'MOVIE':
        return 'MOVIE';
      case '공연':
      case 'PERFORMANCE':
        return 'PERFORMANCE';
      case '스포츠':
      case 'SPORTS':
        return 'SPORTS';
      default:
        return '';
    }    
};

export const getReverseMappedCategory = (category) => {
  switch (category) {
    case 'MOVIE':
      return '영화';
    case 'PERFORMANCE':
      return '공연';
    case 'SPORTS':
      return '스포츠';
    default:
      return '';
  }    
};
  