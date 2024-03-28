import './RoomMaster.scss';

import { Link, useLoaderData } from 'react-router-dom';

import { Room } from '@types';
import { RoomBasicInfo } from '@components';

import mainBg from '@assets/images/home_bg_main.png';

import ArrowRightIcon from '@assets/icons/arrow-right-icon.svg?react';

const RoomMaster = () => {
  const list = useLoaderData() as Room[];

  if ( list.length === 0 ) {
    return (
      <div className="room-master">
        <h2>查無資料</h2>
      </div>
    );
  }

  return (
    <>
      <div className="home-carousel">
        <div className="carousel-wrapper">
          <div className="carousel-item">
            <img src={ mainBg }></img>
          </div>
        </div>
        <div className="overlay-bg center">
          <div className="description-container">
            <div className="slogan">
              <h2>享樂酒店</h2>
              <h5>Enjoyment Luxury Hotel</h5>
            </div>
            <h1>客房旅宿</h1>
          </div>
        </div>
      </div>
      <div className="room-master main-spacing main-bg">
        <h6>房型選擇</h6>
        <h1>各種房型，任您挑選</h1>
        <ul className="list">
          { list.map((room) => (
            <li key={ room._id }>
              <div className="carousel">
                {/* 先佔位，之後再把 Carousel 做成元件替換 */}
                <img src={ room.imageUrl } />
              </div>
              <div className="description">
                <h2>{ room.name }</h2>
                <p className="body">{ room.description }</p>

                <ul className="basic-info">
                  <li>
                    <RoomBasicInfo
                      iconType="area"
                      description={ room.areaInfo }
                    />
                  </li>
                  <li>
                    <RoomBasicInfo
                      iconType="bed"
                      description={ room.bedInfo }
                    />
                  </li>
                  <li>
                    <RoomBasicInfo
                      iconType="people"
                      description={ room.maxPeople + '人' }
                    />
                  </li>
                </ul>

                <div className="decoration-line"></div>

                <h5>
                NT$ { room.price }
                  <Link to={ room._id ?? '' }><ArrowRightIcon /></Link>
                </h5>
              </div>
            </li>
          )) }
        </ul>
      </div>
    </>
  );
};

export default RoomMaster;
