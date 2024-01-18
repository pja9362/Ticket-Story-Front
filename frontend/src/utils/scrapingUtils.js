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

export const scrapeCGVTicketDetails = webViewRef => {
  const injectScrapButtonScript = `
      setTimeout(function() {
        var movieInfoElement = document.querySelector('.movieLog_detail_movie_info_wrap .btn_movieInfo');
        if (movieInfoElement) {
          var title = movieInfoElement.childNodes[0].innerText.trim(); 
          
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
  const injectScrapScript = `
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

            var imageElement = movieItem.querySelector('div.bx_thm > a > img');
            var image = imageElement ? imageElement.getAttribute('src') : '';
  
            var movieDetail = {
              title: title,
              location: location,
              date: date,
              time: time,
              seatCount: seatCount,
              image: image,
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
  webViewRef.current.injectJavaScript(injectScrapScript);
};


// Megabox
export const injectMegaboxScrapButton = (webViewRef) => {
  const script = `
    var isLoggedIn = document.querySelector('.myMagaWrap') !== null;

    if (isLoggedIn) {
      var scrapButton = document.createElement('button');
      scrapButton.innerHTML = '스크랩 하러가기';
      scrapButton.style.backgroundColor = 'red';
      scrapButton.style.padding = '15px';
      scrapButton.style.color= 'white';
      scrapButton.onclick = function() {
        window.location.href = 'https://m.megabox.co.kr/mypage/moviestory?divCd=WATCHED';
      };

      var floatingDiv = document.createElement('div');
      floatingDiv.classList.add('scrap-button-container'); 
      document.body.appendChild(floatingDiv);

      floatingDiv.appendChild(scrapButton);

      var mainContent = document.querySelector('.container');
      if (mainContent) {
        mainContent.appendChild(floatingDiv);
      }
    }

    var style = document.createElement('style');
    style.innerHTML = '.scrap-button-container { position: fixed; bottom: 50px; left: 50%; transform: translateX(-50%); width: 50%; padding: 15px; text-align: center; z-index: 9999; padding: 10px;}';
    document.head.appendChild(style);

    true;
  `;

  webViewRef.current.injectJavaScript(script);
};

export const scrapeMegaboxTicketDetails = (webViewRef) => {
  const injectScrapScript = `
      setTimeout(function() {
        var movieItems = document.querySelectorAll('#movieList > li');

        movieItems.forEach(function (movieItem) {
          movieItem.style.cursor = 'pointer'; 

          var posterWrap = movieItem.querySelector('div.poster-area > div');
          if (posterWrap) {
            posterWrap.removeAttribute('onclick');
          }

          var titleElement = movieItem.querySelector('div.movie-info-area > p');
          if (titleElement) {
            titleElement.removeAttribute('onclick');
          }

          movieItem.onclick = function(event) {
            event.preventDefault();

            var titleElement = movieItem.querySelector('div.movie-info-area > p');
            var title = titleElement ? titleElement.innerText.trim() : '';

            var dateElement = movieItem.querySelector('div.movie-info-area > div.info-detail > p:nth-child(1)');
            var date = dateElement ? dateElement.innerText.trim() : '';

            var locationElement = movieItem.querySelector('div.movie-info-area > div.info-detail > p:nth-child(2)');
            var location = locationElement ? locationElement.innerText.trim() : '';

            var imageElement = movieItem.querySelector('div.poster-area > div > img');
            var image = imageElement ? imageElement.getAttribute('src') : '';
  
            var movieDetail = {
              title: title,
              date: date,
              location: location,
              image: image,
            };

            window.ReactNativeWebView.postMessage(JSON.stringify(movieDetail));
          };
        });
      }, 1500);
    true;
  `;

  const style = `
    var style = document.createElement('style');
    style.innerHTML = '#movieList > li { cursor: pointer; }'; 
    document.head.appendChild(style);
    true;
  `;

  webViewRef.current.injectJavaScript(style);
  webViewRef.current.injectJavaScript(injectScrapScript);
};

// Yes24
export const scrapeYes24TicketDetails = (webViewRef) => {
  const injectScrapButtonScript = `
      setTimeout(function() {
        var ticketInfoElement = document.querySelector(".goods_gBox ul li");
        if (ticketInfoElement) {
          var title = ticketInfoElement.querySelector(".goods_name").innerText.trim();
          
          var dateTimeElement = document.querySelector("#ctl00_ContentPlaceHolder1_trPerfDateTime td.txt");
          var dateTime = dateTimeElement ? dateTimeElement.innerText.trim() : '';

          var locationElement = document.querySelector(".goods_loca a");
          var location = locationElement ? locationElement.innerText.replace('\>', '').trim() : '';

          var seatElement = document.querySelector("#ctl00_ContentPlaceHolder1_trSeat > td");
          var seat = seatElement ? seatElement.innerText.replace(' > ', '').trim() : '';
          
          var seatCountElement = document.querySelector("#ctl00_ContentPlaceHolder1_trSeat > th > strong")
          var seatCount = seatCountElement ? seatCountElement.innerText.trim() : '';
  
          var imageElement = document.querySelector(".goods_img img");
          var image = imageElement ? imageElement.getAttribute("src") : '';

          var movieDetail = {
            title: title,
            date: dateTime,
            image: image,
            location: location,
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

// TimeTicket
export const scrapeTimeticketTicketDetails = (webViewRef) => {
  const injectScrapScript = `
    setTimeout(function() {
      var ticketItems = document.querySelectorAll('.buy_rows_wrap');

      ticketItems.forEach(function (ticketItem) {
        ticketItem.style.cursor = 'pointer';

        ticketItem.onclick = function() {
          
          var titleElement = ticketItem.querySelector('.product_title a');
          var title = titleElement ? titleElement.innerText.trim() : '';

          var optionElement = ticketItem.querySelector('.right_wrap .options');
          var option = optionElement ? optionElement.innerText.trim() : '';

          var imageElement = ticketItem.querySelector('.left img');
          var imageUrlRelative = imageElement ? imageElement.getAttribute('src') : '';
          var imageUrl = new URL(imageUrlRelative, window.location.origin).href;

          var movieDetail = {
            title: title,
            option: option,
            image: imageUrl,
          };

          window.ReactNativeWebView.postMessage(JSON.stringify(movieDetail));
        };
      });
    }, 1500);
    true;
  `;

  const style = `
    var style = document.createElement('style');
    style.innerHTML = '.buy_rows_wrap { cursor: pointer; }'; 
    document.head.appendChild(style);
    true;
  `;

  webViewRef.current.injectJavaScript(style);
  webViewRef.current.injectJavaScript(injectScrapScript);
};