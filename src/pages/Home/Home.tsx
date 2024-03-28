import './Home.scss';

import { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

import { Culinary, News, Room } from '@types';

import mainBg from '@assets/images/home_bg_main.png';
import ArrowLeftIcon from '@assets/icons/arrow-left-icon.svg?react';
import ArrowRightIcon from '@assets/icons/arrow-right-icon.svg?react';
import CarIcon from '@assets/icons/ic_car.svg?react';
import LuxuryCarIcon from '@assets/icons/ic_luxurycar.svg?react';

const Home = () => {
  const [ newsList, culinaryList, roomList ] = useLoaderData() as [ News[], Culinary[], Room[] ];
  const [ currentRoomIndex, setCurrentRoomIndex ] = useState(0);
  const [ currentRoom, setCurrentRoom ] = useState(roomList[currentRoomIndex]);

  useEffect(() => {
    setCurrentRoom(roomList[currentRoomIndex]);
  }, [ currentRoomIndex ]);

  const handlePrevRoom = () => {
    let index = currentRoomIndex - 1;
    if ( index < 0 ) {
      index = roomList.length - 1;
    }
    setCurrentRoomIndex(index);
  };

  const handleNextRoom = () => {
    let index = currentRoomIndex + 1;
    if ( index >= roomList.length ) {
      index = 0;
    }
    setCurrentRoomIndex(index);
  };

  return (
    <>
      <div className="home-carousel">
        <div className="carousel-wrapper">
          {/* 先佔位，之後再把 Carousel 做成元件替換 */}
          <div className="carousel-item">
            <img src={ mainBg }></img>
          </div>
        </div>
        <div className="overlay-bg">
          <div className="description-container">
            <div className="slogan">
              <h2>享樂酒店</h2>
              <h5>Enjoyment Luxury Hotel</h5>
            </div>
            <div className="glassmorphism-bg">
              <div className="description">
                <h1>高雄<br />豪華住宿之選</h1>
                <h3>我們致力於為您提供無與倫比的奢華體驗與優質服務</h3>
                <p><Link className="button-like big" to="/booking">立即訂房<span className="line"></span></Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="news-container main-spacing main-bg flex">
        <div className="h1">最新消息</div>
        <ul className="news-list">
          { newsList.map((news, index) => (
            <li key={ `${ news._id }-${ index }` } className="news-item">
              <div className="news-item-image">
                <img src={ news.image }></img>
              </div>
              <div className="news-item-content">
                <h3>{ news.title }</h3>
                <p className="body">{ news.description }</p>
              </div>
            </li>
          )) }
        </ul>
      </div>
      <div className="about-us-container">
        <div className="bg-image"></div>
        <div className="about-us-content">
          <div className="h1">關於我們</div>
          <div className="about-us-description">
            <p className="body">享樂酒店，位於美麗島高雄的心臟地帶，是這座城市的璀璨瑰寶與傲人地標。<br />我們的存在，不僅僅是為了提供奢華的住宿體驗，更是為了將高雄的美麗與活力，獻給每一位蒞臨的旅客。</p>
            <p className="body">我們的酒店，擁有時尚典雅的裝潢，每一個細節都充滿著藝術與設計的精緻。<br />我們的員工，都以熱情的服務與專業的態度，讓每一位客人都能感受到賓至如歸的溫暖。 </p>
            <p className="body">在這裡，您可以遙望窗外，欣賞高雄的城市景色，感受這座城市的繁華與活力；您也可以舒適地坐在我們的餐廳，品嚐精緻的佳餚，體驗無與倫比的味覺盛宴。</p>
            <p className="body">享樂酒店，不僅是您在高雄的住宿之選，更是您感受高雄魅力的最佳舞台。我們期待著您的蒞臨，讓我們共同編織一段難忘的高雄故事。</p>
          </div>
        </div>
      </div>
      <div className="room-carousel-container secondary-bg">
        <div className="room-carousel-wrapper">
          <div className="room-carousel-item">
            <div className="room-carousel-item-image-wrapper">
              { currentRoom.imageUrlList.map((image, index) => (
                <div className="room-carousel-item-image" key={ `${ currentRoom._id }-${ index }` }>
                  <img src={ image }></img>
                </div>
              )) }
            </div>
            <div className="room-carousel-item-description">
              <h2>{ currentRoom.name }</h2>
              <p className="body">{ currentRoom.description }</p>
              <h3>NT$ { currentRoom.price }</h3>
              <Link to={ `/room/${ currentRoom._id }` } className="button-like big">查看更多<span className="line"></span></Link>
              <div className="button-container">
                <div className="icon-button" onClick={ handlePrevRoom }>
                  <ArrowLeftIcon />
                </div>
                <div className="icon-button" onClick={ handleNextRoom }>
                  <ArrowRightIcon />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="culinary-container main-bg">
        <div className="h1">佳餚美饌</div>
        <div className="culinary-list-wrapper">
          <ul className="culinary-list">
          { culinaryList.map((culinary, index) => (
            <li key={ `${ culinary._id }-${ index }` } className="culinary-item">
              <div className="culinary-item-image">
                <img src={ culinary.image }></img>
              </div>
              <div className="culinary-item-content">
                <h5>{ culinary.title }
                  <span className="title">{ culinary.diningTime }</span>
                </h5>
                <p className="body">{ culinary.description }</p>
              </div>
            </li>
          )) }
        </ul>
        </div>
      </div>
      <div className="transfer-way-container secondary-bg">
        <div className="h1">交通方式</div>
        <div className="transfer-way-content">
          <p className="title">台灣高雄市新興區六角路123號</p>
          <div className="map-container"></div>
          <ul className="transfer-way-list">
            <li>
              <div className="icon">
                <CarIcon />
              </div>
              <h5>自行開車</h5>
              <p className="body">如果您選擇自行開車，可以透過國道一號下高雄交流道，往市區方向行駛，並依路標指示即可抵達「享樂酒店」。飯店內設有停車場，讓您停車方便。</p>
            </li>
            <li>
              <div className="icon">
                <LuxuryCarIcon />
              </div>
              <h5>高鐵/火車</h5>
              <p className="body">如果您是搭乘高鐵或火車，可於左營站下車，外頭有計程車站，搭乘計程車約20分鐘即可抵達。或者您也可以轉乘捷運紅線至中央公園站下車，步行約10分鐘便可抵達。</p>
            </li>
            <li>
              <div className="icon">
                <LuxuryCarIcon />
              </div>
              <h5>禮賓車服務</h5>
              <p className="body">承億酒店提供禮賓專車接送服務，但因目的地遠近會有不同的收費，請撥打電話將由專人為您服務洽詢專線：(07)123-4567</p>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Home;
