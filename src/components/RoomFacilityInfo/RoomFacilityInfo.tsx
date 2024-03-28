import './RoomFacilityInfo.scss';

import { Facility } from '@types';

import CheckIcon from '@assets/icons/ic_check.svg?react';
import CloseIcon from '@assets/icons/ic_close.svg?react';

/**
 * 房間的設施資訊的元件
 *
 * @param list 房間的設施資訊列表
 * @returns
 */
export const RoomFacilityInfo = ({ list }: { list: Facility[] }) => {
  return (
    <ul className="room-facility-info">
      { list.map((facility, index) => (
        <li key={ index }>
          { facility.isProvide ? <CheckIcon /> : <CloseIcon /> }
          <span className="title">{ facility.title }</span>
        </li>
      )) }
    </ul>
  );
};
