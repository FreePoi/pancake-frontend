import React from 'react';
import { SvgProps } from './types';

const Icon: React.FC<SvgProps> = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="14px" height="16px">
      <path
        fillRule="evenodd"
        fill="rgb(255, 255, 255)"
        d="M3.650,0.2 L3.650,0.2 C4.975,0.2 6.49,1.33 6.49,2.306 C6.49,2.387 6.45,2.467 6.36,2.547 L5.839,4.376 C5.810,4.656 6.22,4.905 6.314,4.933 C6.485,4.950 6.654,4.885 6.766,4.760 L10.433,0.675 C10.820,0.246 11.381,0.1 11.971,0.2 L11.971,0.2 C13.94,0.1 14.8,0.870 14.11,1.949 C14.13,2.425 13.834,2.886 13.507,3.244 L10.528,6.491 C9.960,7.114 9.895,8.25 10.371,8.716 L12.849,12.321 C13.601,13.413 13.289,14.883 12.153,15.605 C11.750,15.861 11.277,15.998 10.793,15.998 L10.793,15.998 C9.930,15.997 9.130,15.564 8.682,14.854 L6.106,10.769 C5.954,10.528 5.628,10.451 5.378,10.597 C5.237,10.679 5.144,10.820 5.126,10.978 L4.791,13.941 C4.652,15.108 3.624,15.989 2.402,15.988 L2.402,15.988 C1.75,15.987 0.0,14.953 0.0,13.677 C0.1,13.597 0.5,13.518 0.14,13.439 L1.252,2.66 C1.381,0.889 2.418,0.2 3.650,0.2 Z"
      />
    </svg>
  );
};

export default Icon;
