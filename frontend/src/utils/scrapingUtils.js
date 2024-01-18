// CGV
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
          var seatCountText = memberElement.innerText.replace('member', '').trim();
          var seatCount = seatCountText.split(' ')[0];
  
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
      }, 500); 
      true;
    `;
  webViewRef.current.injectJavaScript(injectScrapButtonScript);
};

// Interpark
export const scrapeInterparkTicketDetails = (webViewRef) => {
  const injectScrapTicketScript = `
    setTimeout(function() {
      // Extracting image, title, and location
      var imageElement = document.querySelector('.performDetailWrap .col.imgWrap img');
      var relativeSrc = imageElement ? imageElement.getAttribute('src') : '';
      var absoluteSrc = relativeSrc ? (window.location.protocol + relativeSrc) : '';

      var nameElement = document.querySelector('.performDetailWrap .prodInfoWrap .nameWrap .name');
      var title = nameElement ? nameElement.innerText.trim() : '';

      var locationElement = document.querySelector('.performDetailWrap .prodInfoWrap .theater span');
      var location = locationElement ? locationElement.innerText.trim() : '';

      var dateElement = document.querySelector("#dispPlayDate");
      var date = dateElement ? dateElement.innerText.trim() : '';
      
      var seatDetails = [];

      // Extracting seat details
      var seatDetailElements = document.querySelectorAll("#reserveDetail > main > div > section.seatInfoListWrapper > div > div.infoListWrap.checkboxChange > ul > li > div > label > div.checkData");
      seatDetailElements.forEach(seatDetailElement => {
        var seatGrade = seatDetailElement.querySelector("dl:nth-child(2) > dd > span").innerText.trim();
        var priceGrade = seatDetailElement.querySelector("dl:nth-child(3) > dd > span").innerText.trim();
        var seatNumber = seatDetailElement.querySelector("dl:nth-child(4) > dd > span").innerText.trim(); 
      
        seatDetails.push({
          seatGrade: seatGrade,
          priceGrade: priceGrade,
          seatNumber: seatNumber,
        });
      }); 

      var ticketDetail = {
        image: absoluteSrc,
        title: title,
        location: location,
        date: date,
        seatCount: document.querySelector("#BSeatCnt").innerText.trim(),
        seatDetails: seatDetails,
      };

      // Send ticketDetail to React Native
      window.ReactNativeWebView.postMessage(JSON.stringify(ticketDetail));
    }, 1000);
    true;
  `;

  webViewRef.current.injectJavaScript(injectScrapTicketScript);
};

// Lotte Cinema
export const scrapeLotteCinemaTicketDetails = (webViewRef) => {
  const injectScrapButtonScript = `
      setTimeout(function() {
        var movieItems = document.querySelectorAll('.list_movie_type2 li');

        movieItems.forEach(function (movieItem) {
          movieItem.style.cursor = 'pointer'; 

          movieItem.onclick = function() {

            var titleElement = movieItem.querySelector('.bx_tit strong.tit');
            var title = titleElement ? titleElement.innerText.trim() : '';

            var locationElement = movieItem.querySelector('dl > dd.info_cont > dl > dd:nth-child(2)');
            var location = locationElement ? locationElement.innerText.trim() : '';

            var dateElement = movieItem.querySelector('dl > dd.info_cont > dl > dd:nth-child(4)');
            var date = dateElement ? dateElement.innerText.trim() : '';

            var timeElement = movieItem.querySelector('dl > dd.info_cont > dl > dd:nth-child(6)');
            var time = timeElement ? timeElement.innerText.trim() : '';

            var seatCountElement = movieItem.querySelector('dl > dd.info_cont > dl > dd:nth-child(8)');
            var seatCount = seatCountElement ? seatCountElement.innerText.trim() : '';

            var movieDetail = {
              image: document.querySelector(' div.bx_thm > a > img').getAttribute('src'),
              title: title,
              location: location,
              date: date,
              time: time,
              seatCount: seatCount,
            };

            window.ReactNativeWebView.postMessage(JSON.stringify(movieDetail));
          };
        });
      }, 1500);
    true;
  `;

  const style = `
    var style = document.createElement('style');
    style.innerHTML = '.list_movie_type2 li { cursor: pointer; }'; 
    document.head.appendChild(style);
    true;
  `;

  webViewRef.current.injectJavaScript(style);
  webViewRef.current.injectJavaScript(injectScrapButtonScript);
};

