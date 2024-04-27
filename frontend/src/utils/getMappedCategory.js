export const getMappedDetailCategory = (category, categoryDetail) => {
    switch (category) {
      case '영화':
        return { category: 'MOVIE', categoryDetail: 'MOVIE' };
      case '공연':
        switch (categoryDetail) {
          case '뮤지컬':
          case 'MUSICAL':
            return { category: 'MUSICAL', categoryDetail: 'MUSICAL' };
          case '연극':
          case 'PLAY':
            return { category: 'PLAY', categoryDetail: 'PLAY' };
          default:
            return { category: 'PERFORMANCE', categoryDetail: 'PERFORMANCE' };
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
        return 'MOVIE';
      case '공연':
        return 'PERFORMANCE';
      case '스포츠':
        return 'SPORTS';
      default:
        return '';
    }
};
  