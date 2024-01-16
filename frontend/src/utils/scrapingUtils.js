export const injectCGVScrapButton = webViewRef => {
  const script = `
      var scrapButton = document.createElement('button');
      scrapButton.innerHTML = '스크랩 하러가기';
      scrapButton.onclick = function() {
        window.location.href = 'https://movielog.cgv.co.kr/movielog/watchMovie';
      };
      document.body.appendChild(scrapButton);
      true;
    `;
  const style = `
      var style = document.createElement('style');
      style.innerHTML = 'button { position: fixed; bottom: 50px; left: 50%; transform: translateX(-50%); width: 50%; background-color: red; color: white; padding: 15px; text-align: center; }';
      document.head.appendChild(style);
      true;
    `;
  webViewRef.current.injectJavaScript(style);
  webViewRef.current.injectJavaScript(script);
};

export const scrapeCGVMovieDetails = webViewRef => {
  const injectScrapButtonScript = `
      setTimeout(function() {
        var movieInfoElement = document.querySelector('.movieLog_detail_movie_info_wrap .btn_movieInfo');
        if (movieInfoElement) {
          var title = movieInfoElement.childNodes[0].textContent.trim(); 
          
          var dateElement = document.querySelector('.movieLog_detail_movie_info_wrap .movieInfo_date');
          var dateTime = dateElement.innerText.replace('관람', '').trim(); 
  
          var locationElement = document.querySelector('.detail_info_list .map');
          var location = locationElement.innerText.replace('map', '').trim();
  
          var seatElement = document.querySelector('.detail_info_list .seat');
          var seat = seatElement.innerText.replace('seat', '').trim();
  
          var cinemaElement = document.querySelector('.detail_info_list .film');
          var cinema = cinemaElement.innerText.replace('film', '').trim();
  
          var memberElement = document.querySelector('.detail_info_list .member');
          var seatCountText = memberElement.innerText.trim();
          var seatCount = seatCountText.split(' ')[1];
  
          var movieDetail = {
            title: title,
            date: dateTime,
            image: document.querySelector('.movie_info_poster_wrap .img_wrap img').getAttribute('data-ng-src'),
            location: location,
            cinema: cinema,
            seat: seat,
            seatCount: seatCount
          };
  
          // Send movieDetail to React Native
          window.ReactNativeWebView.postMessage(JSON.stringify(movieDetail));
        }
      }, 300); 
      true;
    `;
  webViewRef.current.injectJavaScript(injectScrapButtonScript);
};
