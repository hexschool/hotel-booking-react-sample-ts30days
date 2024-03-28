import './RoomBasicInfo.scss';

import AreaInfoIcon from '@assets/icons/area-info-icon.svg?react';
import BedInfoIcon from '@assets/icons/bed-info-icon.svg?react';
import PeopleIcon from '@assets/icons/people-icon.svg?react';

type IconType = 'area' | 'bed' | 'people';

/**
 * 房間的基本資訊的元件
 *
 * @param iconType icon 的類型
 * @param description 描述文字
 * @param param0
 * @returns
 */
export const RoomBasicInfo = ({ iconType, description }: { iconType: IconType, description: string }) => {
  return (
    <div className="room-basic-info">
     { iconType === 'area' && <AreaInfoIcon /> }
      { iconType === 'bed' && <BedInfoIcon /> }
      { iconType === 'people' && <PeopleIcon /> }
      <p className="title">{ description }</p>
    </div>
  );
};
