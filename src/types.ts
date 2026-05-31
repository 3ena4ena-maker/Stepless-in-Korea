/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type StatusType = 'OPERATIONAL' | 'MAINTENANCE' | 'BLOCKED';

export interface PathStep {
  id: string;
  name: string; // e.g., "지상", "대합실", "승강장"
  desc: string; // e.g., "롯데백화점, 서면시장 방면"
  facilityType: 'ELEVATOR' | 'ESCALATOR' | 'RAMP' | 'STAIRS' | 'GATE';
  tip: string; // Detailed tip for this step
  status: StatusType;
  subwayLine?: string[]; // If specific line applies
  extraInfo?: string[]; // Badges like "빠른 환승 1-1", "안전 발판"
  detailsIcon?: string; // Optional icon name
}

export interface ExitInfo {
  number: string;
  isAccessible: boolean; // Stroller/Wheelchair passable
  hasElevator: boolean;
  hasEscalator: boolean;
  isStrollerFriendly: boolean; // Carrier / heavy bag friendly
  tip: string; // "서면역 7번 출구는 롯데백화점과 직접 연결되어 있어..."
  status: StatusType;
  directionDesc: string; // e.g., "롯데백화점, 서면시장 방면, 쥬디스태화 방면"
  latitude: number; // for path/mapping reference
  longitude: number;
  kakaoMapUrl: string; // Navigation link
  naverMapUrl: string; // Navigation link
  pathwayTimeline: PathStep[]; // Steps from Platform to Ground or vice versa
  facilityDirection?: 'UP' | 'DOWN' | 'BOTH'; // 상행(UP), 하행(DOWN), 둘다 가능(BOTH)
}

export interface Station {
  id: string; // e.g., "seomyeon"
  name: string; // e.g., "서면역"
  englishName: string;
  lines: string[]; // ["1", "2"]
  elevatorCount: number;
  escalatorCount: number;
  toiletLocation: string; // "개찰구 내", "개찰구 외", "지하상가 통로"
  isTransferStation: boolean;
  accentColor: string; // Tailwind color class or hex
  exits: ExitInfo[];
  alertNotice?: string; // "환승 통로 일시 정지" or something
}

export interface FacilityReport {
  id: string;
  stationId: string;
  stationName: string;
  exitNumber: string;
  facilityType: 'ELEVATOR' | 'ESCALATOR' | 'RAMP' | 'TOILET' | 'OTHER';
  reportType: 'BROKEN' | 'MAINTENANCE' | 'CONSTRUCTION' | 'OTHER';
  details: string;
  image?: string; // Data URL or text representation
  status: 'PENDING' | 'VERIFIED' | 'RESOLVED';
  createdAt: string;
}
