import './RoomDetail.scss';

import { Link, useLoaderData } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { Room } from '@types';
import { RoomBasicInfo, RoomFacilityInfo } from '@components';

import MinusIcon from '@assets/icons/ic_minus.svg?react';
import PlusIcon from '@assets/icons/ic_plus.svg?react';

import mainBg from '@assets/images/home_bg_main.png';

const RoomDetail = () => {

  const room = useLoaderData() as Room | null;
  const [ peopleAmount, setPeopleAmount ] = useState(2);
  const [ minusClassName, setMinusClassName ] = useState('icon-button');

  const handleMinus = () => {
    if ( peopleAmount > 1 ) {
      setPeopleAmount(peopleAmount - 1);
    }
  };

  const handlePlus = () => {
    setPeopleAmount(peopleAmount + 1);
  };

  useEffect(() => {
    let className = 'icon-button';
    if ( peopleAmount === 1 ) {
      className += ' disabled';
    }
    setMinusClassName(className);
  }, [ peopleAmount ]);

  if ( !room ) {
    return (
      <div className="room-detail">
        <h2>查無此房型</h2>
      </div>
    );
  }

  return (
    <>
      <div className="gallery-container main-bg">
        <div className="gallery-wrapper">
          <div className="gallery-content">
            <img className="gallery-item" src={mainBg} />
            <img className="gallery-item" src={mainBg} />
            <img className="gallery-item" src={mainBg} />
            <img className="gallery-item" src={mainBg} />
            <img className="gallery-item" src={mainBg} />
          </div>
        </div>
      </div>
      <div className="room-detail main-spacing main-bg flex">
        <div className="main">

          <h1>{ room.name }</h1>
          <p className="body">{ room.description }</p>

          <h5>房型基本資訊</h5>
          <div className="info-container">
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
          </div>

          <h5>房間格局</h5>
          <div className="info-container">
            <RoomFacilityInfo list={ room.layoutInfo } />
          </div>

          <h5>房內設備</h5>
          <div className="info-container">
            <RoomFacilityInfo list={ room.facilityInfo } />
          </div>

          <h5>備品提供</h5>
          <div className="info-container">
            <RoomFacilityInfo list={ room.amenityInfo } />
          </div>

          <h5>訂房須知</h5>
          <ol className="body number-list">
            <li>入住時間為下午3點，退房時間為上午12點。</li>
            <li>如需延遲退房，請提前與櫃檯人員聯繫，視當日房況可能會產生額外費用。</li>
            <li>請勿在房間內抽煙，若有抽煙需求，可以使用設在酒店各樓層的專用吸煙區。</li>
            <li>若發現房間內的設施有損壞或遺失，將會按照價值收取賠償金。</li>
            <li>請愛惜我們的房間與公共空間，並保持整潔。</li>
            <li>如需額外的毛巾、盥洗用品或其他物品，請聯繫櫃檯。</li>
            <li>我們提供免費的Wi-Fi，密碼可以在櫃檯或是房間內的資訊卡上找到。</li>
            <li>請勿帶走酒店房內的物品，如有需要購買，請與我們的櫃檯人員聯繫。</li>
            <li>我們提供24小時櫃檯服務，若有任何需求或疑問，歡迎隨時詢問。</li>
            <li>為了確保所有客人的安全，請勿在走廊或公共區域大聲喧嘩，並遵守酒店的其他規定。</li>
          </ol>
        </div>

        <div className="booking-container">
          <div className="card">
            <h5 className="label">預定房型</h5>
            <h2>{ room.name }</h2>
            <p className="body">{ room.description }</p>
            <div className="date-selector">日期</div>
            <div className="people-selector">
              <span className="title">人數</span>
              <div className="selector-container">
                <span className={ minusClassName } onClick={ handleMinus }>
                  <MinusIcon />
                </span>
                <h6 className="number">{ peopleAmount }</h6>
                <span className="icon-button" onClick={ handlePlus }>
                  <PlusIcon />
                </span>
              </div>
            </div>
            <h5 className="price">NT$ { room.price }</h5>
            <Link to="booking" className="button-like title">立即預訂</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomDetail;
