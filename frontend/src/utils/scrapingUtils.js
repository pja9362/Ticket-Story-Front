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
          var title = movieInfoElement.childNodes[0].textContent.trim(); 
          
          var dateElement = document.querySelector('.movieLog_detail_movie_info_wrap .movieInfo_date');
          var rawDateTime = dateElement.innerText.replace('관람', '').trim(); 

          var date = rawDateTime.split(' ')[0];
          var time = (rawDateTime.split(')')[1]).split('~')[0].trim();
          
          var locationElement = document.querySelector('.detail_info_list .map');
          var rawLocation = locationElement.innerText.replace('map', '').trim();
          
          var locationParts = rawLocation.split(' ');
          var location = locationParts[0];
          var locationDetail = locationParts.slice(1).join(' ').trim();

          var seats = [];
          var seatElement = document.querySelector('.detail_info_list .seat');
          if (seatElement) {
            seats.push(seatElement.innerText.replace('seat', '').trim());
          }

          var ticketDetail = {
            title: title,
            date: date,
            time: time,
            location: location,
            locationDetail: locationDetail,
            seats: seats,
            category: '영화',
            platform: 'CGV',
          };
  
          window.ReactNativeWebView.postMessage(JSON.stringify(ticketDetail));
        }
      }, 1000); 
      true;
    `;
  webViewRef.current.injectJavaScript(injectScrapButtonScript);
};

// Interpark
export const scrapeInterparkTicketDetails = (webViewRef) => {
  const injectScrapTicketScript = `
    setTimeout(function() {
      var category = document.querySelector("#KindOfGoods").innerText.trim();

      var titleElement = document.querySelector('.performDetailWrap .prodInfoWrap .nameWrap .name');
      var title = titleElement ? titleElement.innerText.trim() : '';

      var dateElement = document.querySelector("#dispPlayDate");
      var rawDateTime = dateElement ? dateElement.innerText.trim() : '';
      
      var date = rawDateTime.split('(')[0];
      var time = (rawDateTime.split(' ')[1]).split(' ')[0].trim();

      var seats = [];
      var sportsLocationDetail = '';

      var seatDetailElements = document.querySelectorAll("#reserveDetail > main > div > section.seatInfoListWrapper > div > div.infoListWrap.checkboxChange > ul > li > div > label > div.checkData");
      seatDetailElements.forEach(seatDetailElement => {
        var seatNumber = seatDetailElement.querySelector("dl:nth-child(4) > dd > span").innerText.trim(); 
        seats.push(seatNumber);

        if(category === '스포츠') {
          var seatGrade = seatDetailElement.querySelector("dl:nth-child(2) > dd > span").innerText.trim();
          if(sportsLocationDetail !== seatGrade) {
            sportsLocationDetail += seatGrade;
          }
        }
      }); 

      var locationElement = document.querySelector('.performDetailWrap .prodInfoWrap .theater span');
      var rawLocation = locationElement ? locationElement.innerText.trim() : '';

      var locationParts = rawLocation.split(' ');
      var location = locationParts[0];
          
      if (category !== '스포츠') {
        var locationDetail = locationParts.slice(1).join(' ').trim();
      } else {
        var locationDetail = sportsLocationDetail !== '' ? sportsLocationDetail : '';
      }

      var ticketDetail = {
        title: title,
        location: location,
        locationDetail: locationDetail,
        date: date,
        time: time,
        seats: seats,
        category: category,
        platform: 'INTERPARK',
      };

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
            var rawLocation = locationElement ? locationElement.innerText.trim() : '';

            var locationParts = rawLocation.split(' ');
            var location = locationParts[0];
            var locationDetail = locationParts.slice(1).join(' ').trim();
  
            var dateElement = movieItem.querySelector('dl > dd.info_cont > dl > dd:nth-child(4)');
            var date = dateElement ? dateElement.innerText.replaceAll('-','.').trim() : '';

            var timeElement = movieItem.querySelector('dl > dd.info_cont > dl > dd:nth-child(6)');
            var time = timeElement ? timeElement.innerText.split('~')[0].trim() : '';

            var ticketDetail = {
              title: title,
              location: location,
              locationDetail: locationDetail,
              date: date,
              time: time,
              seats: [],
              platform: 'LOTTECINEMA',
              category: '영화',
            };

            window.ReactNativeWebView.postMessage(JSON.stringify(ticketDetail));
          };
        });
      }, 1000);
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
            var date = dateElement ? dateElement.innerText.replace('관람일','').trim() : '';

            var locationElement = movieItem.querySelector('div.movie-info-area > div.info-detail > p:nth-child(2)');
            var rawLocation = locationElement ? locationElement.innerText.replace('상영관 ', '').trim() : '';


            var locationParts = rawLocation.split(' ');
            var location = '';
            var locationDetail = '';
            
            if (locationParts.length > 0) {
              location = locationParts[0];
            
              if (locationParts.length > 1) {
                locationDetail = locationParts[locationParts.length - 1];
              }
            }
            
            var ticketDetail = {
              title: title,
              date: date,
              time: '',
              location: location,
              locationDetail: locationDetail,
              seats: [],
              platform: 'MEGABOX',
              category: '영화',
            };

            window.ReactNativeWebView.postMessage(JSON.stringify(ticketDetail));
          };
        });
      }, 1000);
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

          var date = dateTime.split(' ')[0];
          var time = dateTime.split(' ')[1];

          var locationElement = document.querySelector(".goods_loca a");
          var rawLocation = locationElement ? locationElement.innerText.replace('\>', '').trim() : '';

          var locationParts = rawLocation.split(' ');
          var location = locationParts[0];
          var locationDetail = locationParts.slice(1).join(' ').trim();
          
          var seats = [];
          var seatElement = document.querySelectorAll("#ctl00_ContentPlaceHolder1_trSeat td");

          seatElement.forEach(function (seat) {
            seats.push(seat.innerText.replace(' > ', '').trim());
          });

          var ticketDetail = {
            title: title,
            date: date,
            time: time,
            location: location,
            locationDetail: locationDetail,
            seats: seats,
            platform: 'YES24',
            category: '',
          };

          window.ReactNativeWebView.postMessage(JSON.stringify(ticketDetail));
        }
      }, 1000); 
      true;
    `;
  webViewRef.current.injectJavaScript(injectScrapButtonScript);
};

// Ticket Link
export const injectTicketlinkScrapButton = (webViewRef) => {
  setTimeout(function() {
    const script = `
      var loginElement = document.querySelector("#app > div > section")

      if (!loginElement) {
        var scrapButton = document.createElement('button');
        scrapButton.innerHTML = '스크랩 하러가기';
        scrapButton.style.backgroundColor = 'red';
        scrapButton.style.padding = '15px';
        scrapButton.style.color= 'white';
        scrapButton.onclick = function() {
          window.location.href = 'https://m.ticketlink.co.kr/my/reserve/gate/list?page=1&productClass=ALL&searchType=PERIOD&period=MONTH_3&targetDay=RESERVE&year=&month=';
        };

        var floatingDiv = document.createElement('div');
        floatingDiv.classList.add('scrap-button-container'); 
        document.body.appendChild(floatingDiv);

        floatingDiv.appendChild(scrapButton);

        var mainContent = document.querySelector('#m_content');
        if (mainContent) {
          mainContent.appendChild(floatingDiv);
        }
      }

      var style = document.createElement('style');
      style.innerHTML = '.scrap-button-container { position: fixed; bottom: 80px; left: 50%; transform: translateX(-50%); width: 50%; padding: 15px; text-align: center; z-index: 9999; padding: 10px;}';
      document.head.appendChild(style);

      true;
    `;

    webViewRef.current.injectJavaScript(script);
  }, 200);
}

export const scrapeTicketlinkTicketDetails = (webViewRef) => {
  const injectScrapScript = `
    setTimeout(function() {
      var titleElement = document.querySelector("#m_content > div.mypage_cont.detail_page > div.mypage_tit_area > h2");
      var title = titleElement ? titleElement.innerText.trim() : '';

      var seatElements = document.querySelectorAll('.mypage_info_area .mypage_detail_info .info_lst li .stxt span.lb');
      var seats = [];
      
      seatElements.forEach(function(seatElement) {
        var seatInfo = seatElement.innerHTML.split('<br>')[0].trim();
        seats.push(seatInfo);
      });
      
      var ticketInfoElement = document.querySelector('#m_content > div.mypage_cont.detail_page > div.mypage_info_area > div:nth-child(1) > ul');
      if (ticketInfoElement) {
        var dateElement = ticketInfoElement.querySelector("li > ul > li:nth-child(4) > div.stxt > span");
        var rawDateTime = dateElement ? dateElement.innerText.trim() : '';

        var date = rawDateTime.split('(')[0].trim();
        var time = rawDateTime.split(')')[1].trim();

        var locationElement = ticketInfoElement.querySelector("li > ul > li:nth-child(5) > div.stxt > span");
        var rawLocation = locationElement ? locationElement.innerText.trim() : '';

        var locationParts = rawLocation.split(' ');
        var location = locationParts[0];
        var locationDetail = locationParts.slice(1).join(' ').trim();

        var ticketDetail = {
          title: title,
          date: date,
          time: time,
          location: location,
          locationDetail: locationDetail,
          seats: seats,
          platform: 'TICKETLINK',
          category: '',
        };

        window.ReactNativeWebView.postMessage(JSON.stringify(ticketDetail));
      }
    }, 800);
    true;
  `;

  webViewRef.current.injectJavaScript(injectScrapScript);
};