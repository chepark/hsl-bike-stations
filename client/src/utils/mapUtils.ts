import L from 'leaflet';
import { StationType } from '../models/stationsInterface';

export function chooseIconBasedonZoom(zoom: number) {
  const circleIcon = L.divIcon({
    html: `
      <svg
      width="11"
      height="11"
      viewBox="0 0 11 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="5.5" cy="5.5" r="5.5" fill="#007AC9" />
    </svg>`,
    className: 'circle-icon',
    iconSize: [11, 11],
  });

  const bikeIcon = L.divIcon({
    html: `
    <svg width="32" height="28" viewBox="0 0 32 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 4C0 1.79086 1.79086 0 4 0H28C30.2091 0 32 1.79086 32 4V24C32 26.2091 30.2091 28 28 28H4C1.79086 28 0 26.2091 0 24V4Z" fill="#007AC9"/>
    <path d="M23.1977 12.2169C23.0113 12.2169 22.8274 12.2276 22.6461 12.2472L22.1031 9.46802C22.1753 9.42548 22.2405 9.36858 22.2926 9.29618L23.905 7.05576L25.3723 8.07516C25.6544 8.27105 26.042 8.20131 26.2381 7.91923C26.434 7.63707 26.3642 7.2495 26.0821 7.05352L24.1123 5.68504C23.8336 5.49121 23.4508 5.5569 23.2526 5.8325L21.7897 7.86507L21.5607 6.69315C21.4949 6.35609 21.169 6.13548 20.831 6.202C20.4938 6.26785 20.2739 6.59454 20.3398 6.93177L20.7391 8.9752L15.0641 12.6864L13.9079 9.75209L14.8551 9.38135C15.1335 9.27237 15.2952 8.98383 15.2397 8.68998C15.1842 8.39605 14.9274 8.18646 14.6284 8.18646H11.5425C11.0636 8.18646 10.6738 8.57303 10.6738 9.05208C10.6738 9.79364 11.2764 10.3954 12.017 10.3954C12.1655 10.3954 12.3127 10.3699 12.4546 10.3212C12.463 10.3183 12.4711 10.3149 12.4793 10.3118L12.7495 10.2058L14.0011 13.3819L12.816 14.1569C11.9124 13.0071 10.5275 12.2523 8.96788 12.2025C7.50874 12.1566 6.1435 12.7117 5.13455 13.7534C4.16467 14.7548 3.65493 16.075 3.69947 17.4708C3.78506 20.1529 5.95307 22.3208 8.63505 22.4065C8.69086 22.4082 8.74602 22.4091 8.80142 22.4091C10.1958 22.4091 11.4981 21.8574 12.4684 20.8556C13.4383 19.8541 13.9481 18.5339 13.9035 17.1381C13.8865 16.6058 13.7863 16.0942 13.6176 15.6147L21.0827 10.7328L21.4341 12.5314C19.486 13.2509 18.0932 15.1266 18.0932 17.3216C18.0932 20.1364 20.383 22.4263 23.1978 22.4263C26.0125 22.4263 28.3025 20.1364 28.3025 17.3216C28.3025 14.5069 26.0125 12.2169 23.1977 12.2169ZM12.2455 17.1909C12.2756 18.1338 11.9316 19.0254 11.2768 19.7015C10.5954 20.4049 9.67252 20.7797 8.68796 20.7485C6.87808 20.6908 5.41513 19.2277 5.35741 17.4178C5.3273 16.4749 5.67124 15.5833 6.32604 14.9073C6.98109 14.231 7.86024 13.8584 8.8015 13.8584C8.83924 13.8584 8.87689 13.8591 8.91488 13.8603C9.91669 13.8922 10.8116 14.3552 11.4214 15.0687L10.0912 15.9385C9.74899 15.6211 9.29126 15.4266 8.78881 15.4266C7.73176 15.4266 6.87186 16.2865 6.87186 17.3435C6.87186 18.4006 7.73176 19.2606 8.78881 19.2606C9.7849 19.2606 10.6057 18.4969 10.6971 17.5242L12.1667 16.5631C12.2114 16.7665 12.2387 16.9762 12.2455 17.1909ZM23.1977 20.7674C21.2977 20.7674 19.7519 19.2215 19.7519 17.3215C19.7519 15.9351 20.5754 14.738 21.7585 14.1918L22.0715 15.7936C21.5927 16.1425 21.2807 16.7071 21.2807 17.3436C21.2807 18.4007 22.1407 19.2606 23.1977 19.2606C24.2548 19.2606 25.1147 18.4007 25.1147 17.3436C25.1147 16.31 24.2923 15.4654 23.2676 15.4284L22.9659 13.8843C23.0426 13.8792 23.1197 13.8757 23.1976 13.8757C25.0977 13.8757 26.6435 15.4215 26.6435 17.3215C26.6435 19.2216 25.0977 20.7674 23.1977 20.7674Z" fill="white"/>
    </svg>
    `,
    className: 'bike-icon',
    iconSize: [21, 31],
  });

  if (zoom < 15) return circleIcon;
  return bikeIcon;
}

export const getCenterValue = (station: StationType): [number, number] => {
  const latitude = Number(station.station_latitude);
  const longitude = Number(station.station_longitude);

  return [latitude, longitude];
};
