import { fetchData } from '@core';
import { Room } from '@types';
import { FAKE_AMENITY_INFO, FAKE_FACILITY_INFO, FAKE_LAYOUT_INFO } from '@constants';

export const fetchRoomList = async () => fetchData<Room[]>('GET', '/rooms').catch(() => [] as Room[]);

export const fetchRoom = async (id: string) => fetchData<Room>('GET', `/rooms/${ id }`).then((room) => {
  room.facilityInfo = FAKE_FACILITY_INFO;
  room.layoutInfo = FAKE_LAYOUT_INFO;
  room.amenityInfo = FAKE_AMENITY_INFO;

  return room;
}).catch(() => null);
