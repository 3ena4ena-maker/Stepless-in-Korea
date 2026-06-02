/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Station, FacilityReport } from './types';

export const STATIONS: Station[] = [
  {
    id: 'seomyeon',
    name: '서면역',
    englishName: 'Seomyeon Station',
    lines: ['1', '2'],
    elevatorCount: 12,
    escalatorCount: 24,
    toiletLocation: '개찰구 내 및 대합실 중앙',
    isTransferStation: true,
    accentColor: 'from-[#004481] to-[#1b6d24]',
    alertNotice: '1호선 노포방면 일부 에스컬레이터 노후 안전 점검 중 (대체 경로 안내 제공)',
    exits: [
      {
        number: '5번 출구',
        isAccessible: false,
        isStrollerFriendly: true,
        hasElevator: false,
        hasEscalator: true,
        facilityDirection: 'BOTH',
        tip: '상행 및 하행 에스컬레이터가 모두 완비되어 있어 계단을 오르내리지 않고 편리하게 지상으로 출입하실 수 있습니다.',
        status: 'OPERATIONAL',
        directionDesc: '서면로, 신한은행 서면점, 부전2동 행정복지센터 방면',
        latitude: 35.157152,
        longitude: 129.058348,
        kakaoMapUrl: 'https://map.kakao.com/link/search/서면역 5번출구',
        naverMapUrl: 'https://map.naver.com/v5/search/서면역 5번출구',
        pathwayTimeline: [
          {
            id: 'sm5-step1',
            name: '승강장 플랫폼 (B2F)',
            desc: '1·2호선 상/하선 승강 플랫폼',
            facilityType: 'ESCALATOR',
            tip: '승강장에서 에스컬레이터 혹은 엘리베이터를 이용하여 지하 1층 대합실로 오르십시오.',
            status: 'OPERATIONAL'
          },
          {
            id: 'sm5-step2',
            name: '대합실 개찰구 (B1F)',
            desc: '대합실 및 개찰구 구역',
            facilityType: 'GATE',
            tip: '대합실 개찰구를 통과 후 5번 출구 유도 사인을 따라 나아가십시오.',
            status: 'OPERATIONAL'
          },
          {
            id: 'sm5-step3',
            name: '에스컬레이터 (B1F ↔ 1F)',
            desc: '5번 출구 양방향 에스컬레이터',
            facilityType: 'ESCALATOR',
            tip: '양방향(상/하행) 에스컬레이터를 타고 지상 인도로 편리하게 이동하십시오.',
            status: 'OPERATIONAL'
          }
        ]
      },
      {
        number: '7번 출구',
        isAccessible: true,
        isStrollerFriendly: true,
        hasElevator: true,
        hasEscalator: false,
        facilityDirection: 'BOTH',
        tip: '롯데백화점 부산본점 지상 및 지하와 평탄하게 직결되는 엘리베이터 전용 출구입니다. 유모차와 휠체어 이용객이 가장 안전하고 편안하게 보행할 수 있는 노선입니다.',
        status: 'OPERATIONAL',
        directionDesc: '롯데백화점 부산본점, 서면시장, 가야 및 범천 방면',
        latitude: 35.157582,
        longitude: 129.058441,
        kakaoMapUrl: 'https://map.kakao.com/link/search/서면역 7번출구',
        naverMapUrl: 'https://map.naver.com/v5/search/서면역 7번출구',
        pathwayTimeline: [
          {
            id: 'sm7-step1',
            name: '승강장 (B2F)',
            desc: '1·2호선 상/하선 승강장 하차 지점',
            facilityType: 'GATE',
            tip: '1호선 4-3, 2호선 5-2 하차 후 바로 앞 승강장 전용 승강기(엘리베이터) 탑승 후 지하 1층 대합실로 편리하게 승급 이동하세요.',
            status: 'OPERATIONAL',
            subwayLine: ['1', '2'],
            extraInfo: ['[스타벅스 7번출구점] 방면 엘리베이터 직결', '휠체어 전용 승하차 존 적용']
          },
          {
            id: 'sm7-step2',
            name: '대합실 & 개찰구 (B1F)',
            desc: '롯데백화점 연결광장 및 분수대 사거리',
            facilityType: 'GATE',
            tip: '개찰구를 통과 후 왼편의 [롯데백화점 부산본점] 지하 입구(스타벅스 및 올리브영 인접) 광장으로 곧바로 진입하세요.',
            status: 'OPERATIONAL',
            extraInfo: ['광폭 개찰구 우측 통과', '장애인 남녀 구분 화장실']
          },
          {
            id: 'sm7-step3',
            name: '지상 연결 엘리베이터 (B1F → 1F)',
            desc: '롯데백화점 정문 우측 전용 수직 엘리베이터',
            facilityType: 'ELEVATOR',
            tip: '7번 출구 메인 엘리베이터(양방향 운행)는 지상 도로변뿐만 아니라 백화점 정문 앞 광장 보도와 경사 없이 연결되어 유모차를 밀기 매우 훌륭합니다.',
            status: 'OPERATIONAL',
            extraInfo: ['양방향(상/하행) 엘리베이터 완비', '스타벅스 부산본점 보도 10m 인접']
          },
          {
            id: 'sm7-step4',
            name: '지상 도로 (1F)',
            desc: '롯데백화점 본관 지상 정문 및 서면시장 앞 도로',
            facilityType: 'RAMP',
            tip: '스타벅스 커피 및 서면시장 먹자골목으로 수평 휠체어 주행이 지원되는 평탄한 유도 보도블록입니다.',
            status: 'OPERATIONAL'
          }
        ]
      },
      {
        number: '9번 출구',
        isAccessible: false,
        isStrollerFriendly: true,
        hasElevator: false,
        hasEscalator: true,
        facilityDirection: 'BOTH',
        tip: '영광도서 및 서면문화로 방향 출구로, 상행과 하행 에스컬레이터가 모두 깔끔하게 완비되어 보행 편의성이 매우 뛰어납니다.',
        status: 'OPERATIONAL',
        directionDesc: '영광도서, 서면문화로, 부산시민공원 방면',
        latitude: 35.158220,
        longitude: 129.058319,
        kakaoMapUrl: 'https://map.kakao.com/link/search/서면역 9번출구',
        naverMapUrl: 'https://map.naver.com/v5/search/서면역 9번출구',
        pathwayTimeline: [
          {
            id: 'sm9-step1',
            name: '승강장 (B2F)',
            desc: '1·2호선 상/하선 승강 플랫폼',
            facilityType: 'ESCALATOR',
            tip: '승강장에서 에스컬레이터를 타고 지하 1층 동편 대합실 방향으로 원활히 오릅니다.',
            status: 'OPERATIONAL'
          },
          {
            id: 'sm9-step2',
            name: '대합실 개찰구 (B1F)',
            desc: '개찰 사거리 및 대합실 구역',
            facilityType: 'GATE',
            tip: '대합실 개찰구를 빠져나와 9번 출구로 연결되는 넓은 대기 구역을 향해 보행하십시오.',
            status: 'OPERATIONAL'
          },
          {
            id: 'sm9-step3',
            name: '에스컬레이터 (B1F ↔ 1F)',
            desc: '9번 출구 상하행 양방향 에스컬레이터',
            facilityType: 'ESCALATOR',
            tip: '상하행 양방향 에스컬레이터가 작동하고 있어 계단 없이 가볍게 승하차할 수 있습니다.',
            status: 'OPERATIONAL'
          }
        ]
      },
      {
        number: '10번 출구',
        isAccessible: false,
        isStrollerFriendly: true,
        hasElevator: false,
        hasEscalator: true,
        facilityDirection: 'UP',
        tip: '상행 전용 에스컬레이터가 준비되어 지상 1층으로 올라갈 때는 계단 없이 아주 쾌적하게 탑승 이동할 수 있습니다. (내려올 때는 계단만 존재하오니 주의바랍니다)',
        status: 'OPERATIONAL',
        directionDesc: '부산진소방서, 전포동 아파트 방면, 전포초등학교 방면',
        latitude: 35.157814,
        longitude: 129.060142,
        kakaoMapUrl: 'https://map.kakao.com/link/search/서면역 10번출구',
        naverMapUrl: 'https://map.naver.com/v5/search/서면역 10번출구',
        pathwayTimeline: [
          {
            id: 'sm10-step1',
            name: '대합실 개찰구 (B1F)',
            desc: '개찰 수속 대기라인',
            facilityType: 'GATE',
            tip: '개찰 카드를 접촉하고 10번 출구 방향 유도선을 따라 보행 유닛 이동.',
            status: 'OPERATIONAL'
          },
          {
            id: 'sm10-step2',
            name: '에스컬레이터 (B1F → 1F)',
            desc: '10번 출구 상행 에스컬레이터 (상행 전용)',
            facilityType: 'ESCALATOR',
            tip: '올라갈 때는 상행 전용 에스컬레이터가 부드럽게 연동되오나, 하행 시에는 다른 엘리베이터 출구를 활용하십시오.',
            status: 'OPERATIONAL'
          }
        ]
      },
      {
        number: '11번 출구',
        isAccessible: true,
        isStrollerFriendly: true,
        hasElevator: true,
        hasEscalator: true,
        facilityDirection: 'BOTH',
        tip: '지상행 상행 에스컬레이터와 양방향 엘리베이터가 모두 설치되어 있어, 영광도서 및 부암역 방향으로 통행하시는 휠체어와 유모차 동선에 최고의 편안함을 제공합니다.',
        status: 'OPERATIONAL',
        directionDesc: '영광도서 서면본점, 부산진구청, 부암동 방면',
        latitude: 35.158431,
        longitude: 129.058983,
        kakaoMapUrl: 'https://map.kakao.com/link/search/서면역 11번출구',
        naverMapUrl: 'https://map.naver.com/v5/search/서면역 11번출구',
        pathwayTimeline: [
          {
            id: 'sm11-step1',
            name: '승강장 (B2F)',
            desc: '1·2호선 상/하선 통합 승강 플랫폼',
            facilityType: 'ELEVATOR',
            tip: '환승용 복도를 피해 안편에 배치된 개찰 엘리베이터를 구동해 지하 1층 대합실로 원활하게 진입하세요.',
            status: 'OPERATIONAL'
          },
          {
            id: 'sm11-step2',
            name: '중앙 분수 홀 대합실 (B1F)',
            desc: '영광도서 연결통로 & 대현프리몰 입구',
            facilityType: 'RAMP',
            tip: '분수대 광장 바닥에 시공된 11번 파란색 안전 도우미 선을 따라 30m 직진하십시오. 전 구간 단차 턱이 제어되었습니다.',
            status: 'OPERATIONAL',
            extraInfo: ['[영광도서] 직결 바닥 실선 표기', '주요 약방/약국 거리 연계']
          },
          {
            id: 'sm11-step3',
            name: '엘리베이터 및 에스컬레이터 (B1F ↔ 1F)',
            desc: '11번 영광도서앞 지상 연계 시설',
            facilityType: 'ELEVATOR',
            tip: '올라갈 때는 상행 에스컬레이터를 타고 편리하며, 휠체어/유모차는 영광도서 빌딩 바로 옆 지상 화단으로 즉시 연결되는 배리어프리 전용 엘리베이터를 통해 탑승 경사 없이 올라갈 수 있습니다.',
            status: 'OPERATIONAL'
          }
        ]
      },
      {
        number: '12번 출구',
        isAccessible: true,
        isStrollerFriendly: true,
        hasElevator: true,
        hasEscalator: false,
        facilityDirection: 'BOTH',
        tip: '수직형 배리어프리 엘리베이터 전용 출구로, 대현프리몰 지하상가 초입 및 신한은행 금융골목 방향으로 차별 없이 안전하고 쾌적한 무단차 이동을 원하시는 관광객에게 최적으로 가이드됩니다.',
        status: 'OPERATIONAL',
        directionDesc: '대현프리몰 지하상가, 버거킹 서면중앙점, 신한은행 금융골목 방면',
        latitude: 35.158302,
        longitude: 129.059631,
        kakaoMapUrl: 'https://map.kakao.com/link/search/서면역 12번출구',
        naverMapUrl: 'https://map.naver.com/v5/search/서면역 12번출구',
        pathwayTimeline: [
          {
            id: 'sm12-step1',
            name: '대합실 중앙 (B1F)',
            desc: '12번 출입 전용 진입 구역',
            facilityType: 'GATE',
            tip: '카드 접촉 개찰 후 대현상가 방면 분기점에서 12번 부스 방향 계단 옆 엘리베이터 홀로 직진.',
            status: 'OPERATIONAL'
          },
          {
            id: 'sm12-step2',
            name: '지상 연결 엘리베이터 (B1F ↔ 1F)',
            desc: '12번 전용 지상 배리어프리 엘리베이터',
            facilityType: 'ELEVATOR',
            tip: '12번 전용 엘리베이터를 타고 버거킹 정문 앞으로 보도 단차 없이 올라갈 수 있습니다.',
            status: 'OPERATIONAL'
          }
        ]
      },
      {
        number: '13번 출구',
        isAccessible: true,
        isStrollerFriendly: true,
        hasElevator: true,
        hasEscalator: true,
        facilityDirection: 'BOTH',
        tip: '지상용 엘리베이터 및 상향 에스컬레이터가 모두 완비된 배리어프리 출구입니다. 올리브영 서면로점과 신한은행 서면점, 부전시장 초입 방향으로 수월하게 관광하실 때 가장 편안하게 권장되는 최고 추천 동선입니다.',
        status: 'OPERATIONAL',
        directionDesc: '신한은행 서면지점, 부전동 행정복지센터, 서면 메디컬스트리트, 부전시장 방면',
        latitude: 35.157121,
        longitude: 129.060152,
        kakaoMapUrl: 'https://map.kakao.com/link/search/서면역 13번출구',
        naverMapUrl: 'https://map.naver.com/v5/search/서면역 13번출구',
        pathwayTimeline: [
          {
            id: 'sm13-step1',
            name: '승강장 (B2F)',
            desc: '1호선 승강장 하차 플랫폼',
            facilityType: 'GATE',
            tip: '하차 후 중앙 엘리베이터를 이용하여 지하 1층 대합실 통로 방향으로 오르십시오.',
            status: 'OPERATIONAL',
            subwayLine: ['1']
          },
          {
            id: 'sm13-step2',
            name: '대합실 동편 통로 (B1F)',
            desc: '신한은행 서면점 지하 대합실 복도',
            facilityType: 'GATE',
            tip: '13번 출구 이정표를 향해 나아가며, 우측의 [올리브영] 쇼핑몰 복도를 통과하여 평탄한 대기선으로 진전하세요.',
            status: 'OPERATIONAL',
            extraInfo: ['단차 없는 매끈한 우레탄 바닥']
          },
          {
            id: 'sm13-step3',
            name: '엘리베이터 및 에스컬레이터 (B1F ↔ 1F)',
            desc: '13번 지상 연계 설비 (양방향 엘리베이터 + 상행 에스컬레이터)',
            facilityType: 'ELEVATOR',
            tip: '휠체어/대형 유모차 이용 시에는 양방향 엘리베이터를 타시고, 일반 도보 이용자는 상향 에스컬레이터를 이용하여 편리하게 지상 신한은행 건물 앞 광장으로 이동하십시오.',
            status: 'OPERATIONAL'
          }
        ]
      }
    ]
  },
  {
    id: 'jeonpo',
    name: '전포역',
    englishName: 'Jeonpo Station',
    lines: ['2'],
    elevatorCount: 4,
    escalatorCount: 8,
    toiletLocation: '지하 10m 대합실 개찰구 외부',
    isTransferStation: false,
    accentColor: 'from-[#1b6d24] to-[#004960]',
    alertNotice: '전포 카페거리 관광 특화 구역 무장애 지상 경사 보도블록 정비 완료',
    exits: [
      {
        number: '3번 출구',
        isAccessible: true,
        isStrollerFriendly: true,
        hasElevator: true,
        hasEscalator: false,
        facilityDirection: 'BOTH',
        tip: '3번과 4번 출구 사이에 위치한 지상 엘리베이터를 통해 부산진소방서 방면으로 단차 없이 출로할 수 있어 휠체어와 유모차 이동에 탁월합니다.',
        status: 'OPERATIONAL',
        directionDesc: '부산진소방서, 전포돌산공원, 전포1파출소, 도로교통공단 부산지부 방면',
        latitude: 35.152861,
        longitude: 129.062222,
        kakaoMapUrl: 'https://map.kakao.com/link/search/전포역 3번출구',
        naverMapUrl: 'https://map.naver.com/v5/search/전포역 3번출구',
        pathwayTimeline: [
          {
            id: 'jp3-step1',
            name: '승강장 플랫폼 (B2F)',
            desc: '2호선 승강 플랫폼 하차',
            facilityType: 'ELEVATOR',
            tip: '열차 승강장에 마련된 내부 엘리베이터를 탑승하여 지하 1층 대합실 통로로 진수하십시오.',
            status: 'OPERATIONAL'
          },
          {
            id: 'jp3-step2',
            name: '대합실 동코너 (B1F)',
            desc: '카드 개찰구 구역',
            facilityType: 'GATE',
            tip: '개찰 게이트를 통과한 후 3·4번 출구 방향의 지상 수직 엘리베이터 승차장 부스로 보행하세요.',
            status: 'OPERATIONAL'
          },
          {
            id: 'jp3-step3',
            name: '중앙 엘리베이터 (B1F → 1F)',
            desc: '3번·4번 출구 중간 무장애 엘리베이터',
            facilityType: 'ELEVATOR',
            tip: '3번과 4번 출구 사이에 배치된 우수 엘리베이터로 휠체어 승하차가 매우 안락합니다.',
            status: 'OPERATIONAL'
          }
        ]
      },
      {
        number: '4번 출구',
        isAccessible: true,
        isStrollerFriendly: true,
        hasElevator: true,
        hasEscalator: false,
        facilityDirection: 'BOTH',
        tip: '경남공고 및 전포1동 주민센터로 향하는 4번 출구에는 편안한 지상형 엘리베이터가 연결되어 있고 대형 유모차가 진입하기에도 여유롭습니다.',
        status: 'OPERATIONAL',
        directionDesc: '경남공업고등학교, 한강아파트, 전포1동 주민센터, 전포종합사회복지관 방면',
        latitude: 35.153351,
        longitude: 129.062261,
        kakaoMapUrl: 'https://map.kakao.com/link/search/전포역 4번출구',
        naverMapUrl: 'https://map.naver.com/v5/search/전포역 4번출구',
        pathwayTimeline: [
          {
            id: 'jp4-step1',
            name: '승강장 플랫폼 (B2F)',
            desc: '2호선 승강 플랫폼',
            facilityType: 'ELEVATOR',
            tip: '승강장 중심부의 엘리베이터를 통해 단차 없이 대합실 이동.',
            status: 'OPERATIONAL'
          },
          {
            id: 'jp4-step2',
            name: '대합실 중앙 (B1F)',
            desc: '4번 출구 무장애 진입 복도',
            facilityType: 'GATE',
            tip: '시각 안내 점자판 및 안전 리드가 정비된 게이트를 평탄하게 지나쳐 이동하십시오.',
            status: 'OPERATIONAL'
          },
          {
            id: 'jp4-step3',
            name: '수직 엘리베이터 (B1F → 1F)',
            desc: '3, 4번 출구 공용 엘리베이터',
            facilityType: 'ELEVATOR',
            tip: '경남공고 앞 평탄한 인도까지 직결되는 배리어프리 엘리베이터입니다.',
            status: 'OPERATIONAL'
          }
        ]
      },
      {
        number: '7번 출구',
        isAccessible: false,
        isStrollerFriendly: true,
        hasElevator: false,
        hasEscalator: true,
        facilityDirection: 'BOTH',
        tip: '전포사잇길 및 카페거리 북단 방향으로 이동하는 7번 출구에는 편안한 상행 및 하행 에스컬레이터가 모두 완비되어 있어 한 단계 더 쾌적하게 보행 이동을 단축해줍니다.',
        status: 'OPERATIONAL',
        directionDesc: '전포사잇길, 놀이마루, 전포테마거리, 전포 카페거리 북측 방면',
        latitude: 35.154231,
        longitude: 129.062531,
        kakaoMapUrl: 'https://map.kakao.com/link/search/전포역 7번출구',
        naverMapUrl: 'https://map.naver.com/v5/search/전포역 7번출구',
        pathwayTimeline: [
          {
            id: 'jp7-step1',
            name: '대합실 북측 개찰구 (B1F)',
            desc: '7번 출구 진입 게이트',
            facilityType: 'GATE',
            tip: '대합실 방향에서 7번 출입구 유도 유닛을 따라 진입하세요.',
            status: 'OPERATIONAL'
          },
          {
            id: 'jp7-step2',
            name: '에스컬레이터 (B1F ↔ 1F)',
            desc: '7번 출구 양방향 에스컬레이터',
            facilityType: 'ESCALATOR',
            tip: '상행 및 하행 양방향 에스컬레이터가 모두 가동 중이므로, 계단을 이용할 필요 없이 안전하게 출입하실 수 있습니다.',
            status: 'OPERATIONAL'
          }
        ]
      },
      {
        number: '8번 출구',
        isAccessible: false,
        isStrollerFriendly: true,
        hasElevator: false,
        hasEscalator: true,
        facilityDirection: 'BOTH',
        tip: '서면 아이파크 아파트 단지 및 버거샵 전포점 방향의 8번 출구는 상행 및 하행 양방향 에스컬레이터가 모두 완비되어 있어 지상 1층까지 완전히 평탄하게 왕복할 수 있습니다.',
        status: 'OPERATIONAL',
        directionDesc: '서면 아이파크 아파트, 버거샵 전포점, 부산진여자중학교, 전포고개 방면',
        latitude: 35.153921,
        longitude: 129.062921,
        kakaoMapUrl: 'https://map.kakao.com/link/search/전포역 8번출구',
        naverMapUrl: 'https://map.naver.com/v5/search/전포역 8번출구',
        pathwayTimeline: [
          {
            id: 'jp8-step1',
            name: '대합실 동코너 (B1F)',
            desc: '서면 아이파크 방면 카드 개찰구',
            facilityType: 'GATE',
            tip: '개찰구 통과 후 8번 에스컬레이터 지상 통행구로 보행 이동.',
            status: 'OPERATIONAL'
          },
          {
            id: 'jp8-step2',
            name: '에스컬레이터 (B1F ↔ 1F)',
            desc: '지상 8번 에스컬레이터 (양방향 완비)',
            facilityType: 'ESCALATOR',
            tip: '지상 및 지하 왕복용 상하행 양방향 에스컬레이터가 원활하게 작동 중입니다.',
            status: 'OPERATIONAL'
          }
        ]
      }
    ]
  },
  {
    id: 'bujeon',
    name: '부전역',
    englishName: 'Bujeon Station',
    lines: ['1', '동해'],
    elevatorCount: 2,
    escalatorCount: 2,
    toiletLocation: '무장애 개찰구 내부 통로 지하 1층',
    isTransferStation: true,
    accentColor: 'from-[#004481] to-[#004960]',
    alertNotice: '부전역 내에는 에스컬레이터가 전혀 없으며, 3번과 6번 출구의 엘리베이터를 이용하여 전용 탑승하셔야 합니다.',
    exits: [
      {
        number: '3번 출구',
        isAccessible: true,
        isStrollerFriendly: true,
        hasElevator: true,
        hasEscalator: false,
        facilityDirection: 'BOTH',
        tip: '3번 출구에 엘리베이터가 단독 설치되어 있어, 휠체어나 무거운 유모차를 동반한 대중교통 승객이 보도 단차 없이 인도까지 안전하고 수평하게 진출입하기 최상입니다.',
        status: 'OPERATIONAL',
        directionDesc: '부전지구대, 부전1동 주민센터 방면',
        latitude: 35.159981,
        longitude: 129.059152,
        kakaoMapUrl: 'https://map.kakao.com/link/search/부전역 3번출구',
        naverMapUrl: 'https://map.naver.com/v5/search/부전역 3번출구',
        pathwayTimeline: [
          {
            id: 'bj3-step1',
            name: '승강장 (B2F)',
            desc: '1호선 승강장 하차 플랫폼',
            facilityType: 'ELEVATOR',
            tip: '승강장 중앙 엘리베이터를 즉시 탑승하여 B1F 대합실로 다이렉트 이동하세요.',
            status: 'OPERATIONAL'
          },
          {
            id: 'bj3-step2',
            name: '대합실 분기 (B1F)',
            desc: '부전역 지하 개찰구 구역',
            facilityType: 'GATE',
            tip: '와이드 무장애 개찰구를 통과 후 3번 출구 엘리베이터 전용 통로 방향으로 무단차 이동.',
            status: 'OPERATIONAL'
          },
          {
            id: 'bj3-step3',
            name: '지상 엘리베이터 (B1F ↔ 1F)',
            desc: '3번 출입 지상 연계 엘리베이터',
            facilityType: 'ELEVATOR',
            tip: '3번 출구 방면 전용 엘리베이터를 타고 단차 없는 지상 인도로 안전하게 오릅니다.',
            status: 'OPERATIONAL'
          }
        ]
      },
      {
        number: '서면지하도상가 부전몰 5번 출구',
        isAccessible: false,
        isStrollerFriendly: true,
        hasElevator: false,
        hasEscalator: true,
        facilityDirection: 'BOTH',
        tip: '상행 및 하행 에스컬레이터가 모두 제공되어 계단을 오르내리지 않고 편리하게 부전시장 방면 지상으로 오갈 수 있는 편리한 통로입니다.',
        status: 'OPERATIONAL',
        directionDesc: '부전전통시장, 부전약국, 서면 부전몰 지하상가 방면',
        latitude: 35.160121,
        longitude: 129.059421,
        kakaoMapUrl: 'https://map.kakao.com/link/search/서면지하도상가 부전몰 5번출구',
        naverMapUrl: 'https://map.naver.com/v5/search/서면지하도상가 부전몰 5번출구',
        pathwayTimeline: [
          {
            id: 'bj-bjm5-step1',
            name: '지하상가/대합실 (B1F)',
            desc: '서면지하도상가 부전몰 연결 통로',
            facilityType: 'GATE',
            tip: '부전몰 지하상가 길을 따라 5번 출구 분기점으로 이동해 주십시오.',
            status: 'OPERATIONAL'
          },
          {
            id: 'bj-bjm5-step2',
            name: '부전몰 5번 출구 에스컬레이터 (B1F ↔ 1F)',
            desc: '지상 인도 연결 상하행 에스컬레이터',
            facilityType: 'ESCALATOR',
            tip: '상행과 하행 에스컬레이터 모두 원활하게 탑승 및 이용 가능하여 유모차나 캐리어 소지자(에스컬레이터 이용 가능자) 편의를 대폭 올려줍니다.',
            status: 'OPERATIONAL'
          }
        ]
      },
      {
        number: '6번 출구',
        isAccessible: true,
        isStrollerFriendly: true,
        hasElevator: true,
        hasEscalator: false,
        facilityDirection: 'BOTH',
        tip: '6번 출구에 쾌적한 엘리베이터가 완비되어 있어, 코레일 부전역(기차역 일반열차) 환승 및 부전인삼시장, 전통시장 이용객이 턱과 장벽 없이 안전하게 이동할 수 있는 유일한 기차역 연계 수송구입니다.',
        status: 'OPERATIONAL',
        directionDesc: '부전 기차역(국철/ITX 환승), 부전인삼시장, 부전전통시장 방면',
        latitude: 35.161321,
        longitude: 129.060128,
        kakaoMapUrl: 'https://map.kakao.com/link/search/부전역 6번출구',
        naverMapUrl: 'https://map.naver.com/v5/search/부전역 6번출구',
        pathwayTimeline: [
          {
            id: 'bj6-step1',
            name: '승강장 (B2F)',
            desc: '1호선 승강장 하차 플랫폼',
            facilityType: 'ELEVATOR',
            tip: '승강장 중앙 전용 승강장 엘리베이터를 탑승하여 B1F 대합실로 상향 이동하십시오.',
            status: 'OPERATIONAL'
          },
          {
            id: 'bj6-step2',
            name: '대합실 동코너 (B1F)',
            desc: '기차역 방향 표지 개찰구',
            facilityType: 'GATE',
            tip: '교통약자 와이드 센서 개찰구를 거쳐 즉시 왼편에 마련된 6번 엘리베이터로 직진 통행.',
            status: 'OPERATIONAL'
          },
          {
            id: 'bj6-step3',
            name: '지상 엘리베이터 (B1F ↔ 1F)',
            desc: '6번 출구 연계 지상형 엘리베이터',
            facilityType: 'ELEVATOR',
            tip: '기차역 환승 야외 인도로 계단 및 단차 없이 부드럽게 상승 연동해주는 양방향 엘리베이터입니다.',
            status: 'OPERATIONAL'
          }
        ]
      }
    ]
  },
  {
    id: 'haeundae',
    name: '해운대역',
    englishName: 'Haeundae Station',
    lines: ['2'],
    elevatorCount: 4,
    escalatorCount: 0,
    toiletLocation: '대합실 지하 1층 개찰구 외측 (5, 7번 출구 방향)',
    isTransferStation: false,
    accentColor: 'from-[#00a862] to-[#00572F]',
    exits: [
      {
        number: '엘리베이터 (2·4번 출구 사이)',
        isAccessible: true,
        isStrollerFriendly: true,
        hasElevator: true,
        hasEscalator: false,
        facilityDirection: 'BOTH',
        tip: '2번출구와 4번출구 사이 야외 인도변에 위치한 외부 무장애 전용 엘리베이터입니다. 계단 통행이 불가능하거나 캐리어/유모차가 동반된 승객이 우동 및 해운대 주거지 방면으로 완벽히 턱 없이 지상 이동할 수 있는 최적 경로입니다.',
        status: 'OPERATIONAL',
        directionDesc: '해운대 우동, 기계공고, 서포1길 및 해운대 세무서 방면',
        latitude: 35.163351,
        longitude: 129.159152,
        kakaoMapUrl: 'https://map.kakao.com/link/search/해운대역 엘리베이터',
        naverMapUrl: 'https://map.naver.com/v5/search/해운대역 엘리베이터',
        pathwayTimeline: [
          {
            id: 'hu-elv2-step1',
            name: '2호선 승강장 (B2F)',
            desc: '열차 플랫폼 전용 엘리베이터',
            facilityType: 'ELEVATOR',
            tip: '열차에서 하차한 뒤 승강장 중앙의 교통약자 배리어 프리 엘리베이터를 이용하여 B1F 대합실로 상향 이동하십시오.',
            status: 'OPERATIONAL'
          },
          {
            id: 'hu-elv2-step2',
            name: '지하 대합실 및 우동방면 게이트 (B1F)',
            desc: 'B1F 대합실 중심 대형 보안 무장애 게이트',
            facilityType: 'GATE',
            tip: '비상 게이트 센서를 접촉하고 나선 뒤, 2번과 4번 출입구 이정표를 따라서 통로 우측 안쪽으로 직진 주행하십시오.',
            status: 'OPERATIONAL'
          },
          {
            id: 'hu-elv2-step3',
            name: '지상 연결 외부 엘리베이터 (B1F ↔ 1F)',
            desc: '2·4번출구 사이 야외 직동 엘리베이터',
            facilityType: 'ELEVATOR',
            tip: '엘리베이터를 타고 지상 1층 인도로 수직 이동 시 단차 없는 우동 보행자 통로로 진출하며, 완만한 연속 경사로 보도가 마련되어 이동이 매우 자연스럽습니다.',
            status: 'OPERATIONAL'
          }
        ]
      },
      {
        number: '엘리베이터 (5·7번 출구 사이)',
        isAccessible: true,
        isStrollerFriendly: true,
        hasElevator: true,
        hasEscalator: false,
        facilityDirection: 'BOTH',
        tip: '5번출구와 7번출구 사이 야외 인도 중앙에 수직으로 작동하는 무장애 전용 실외 엘리베이터입니다. 승강장 엘리베이터부터 지상까지 단 하나의 계단도 밟지 않고 지상 휠체어 전용 경사로까지 연결되는 완전한 배리어 프리 동선입니다.',
        status: 'OPERATIONAL',
        directionDesc: '해운대 구남로 광장, 해운대해수욕장 휠체어/유모차 전용 통로',
        latitude: 35.162981,
        longitude: 129.158702,
        kakaoMapUrl: 'https://map.kakao.com/link/search/해운대역 엘리베이터',
        naverMapUrl: 'https://map.naver.com/v5/search/해운대역 엘리베이터',
        pathwayTimeline: [
          {
            id: 'hu-elv-step1',
            name: '2호선 승강장 (B2F)',
            desc: '열차 하차 후 승강장 전용 엘리베이터',
            facilityType: 'ELEVATOR',
            tip: '장산방면 2-4 하차 지점 부근, 혹은 사상방면 5-3 부근에 있는 엘리베이터에 탑승하여 B1F 대합실로 다이렉트 통과합니다.',
            status: 'OPERATIONAL'
          },
          {
            id: 'hu-elv-step2',
            name: '지하 대합실 및 전용 게이트 (B1F)',
            desc: '개찰구 내 장애인 전용 점자 통로 및 와이드 게이트',
            facilityType: 'GATE',
            tip: '비상 통화 벨이 탑재된 넓은 개찰구로 나오셔서, 5번과 7번출구 방향 사이에 설계된 지상 통로 안쪽 전용 엘리베이터 앞에 도달하세요.',
            status: 'OPERATIONAL'
          },
          {
            id: 'hu-elv-step3',
            name: '지상 수직 내부 엘리베이터 (B1F ↔ 1F)',
            desc: '5·7번출구 사이 수직 대용량 엘리베이터',
            facilityType: 'ELEVATOR',
            tip: '야외 엘리베이터를 타고 1층 인도로 내리시면, 완만한 무턱 보도가 깔려 있어 휠체어 및 쌍둥이 대형 유모차도 바퀴 걸림 없이 즉시 구남로 인도로 직결 진출합니다.',
            status: 'OPERATIONAL'
          }
        ]
      }
    ]
  },
  {
    id: 'gwangan',
    name: '광안역',
    englishName: 'Gwangan Station',
    lines: ['2'],
    elevatorCount: 4,
    escalatorCount: 0,
    toiletLocation: '대합실 지하 1층 개찰구 내부 (휠체어 규격 유효 화장실 완비)',
    isTransferStation: false,
    accentColor: 'from-[#00a862] to-[#0b5430]',
    exits: [
      {
        number: '5번 출구',
        isAccessible: true,
        isStrollerFriendly: true,
        hasElevator: true,
        hasEscalator: false,
        facilityDirection: 'BOTH',
        tip: '5번 출구 바로 옆 인도변에 세워진 배리어 프리 엘리베이터입니다. 광안대교 전망의 아름다운 광안리 해변 방향 인도로 완만한 무턱 보도가 즉각 배치됩니다.',
        status: 'OPERATIONAL',
        directionDesc: '광안리 해수욕장, 민락수변공원, 광안2동 행정복지센터 방면',
        latitude: 35.157621,
        longitude: 129.115421,
        kakaoMapUrl: 'https://map.kakao.com/link/search/광안역 5번출구 엘리베이터',
        naverMapUrl: 'https://map.naver.com/v5/search/광안역 5번출구 엘리베이터',
        pathwayTimeline: [
          {
            id: 'ga5-step1',
            name: '승강장 플랫폼 (B2F)',
            desc: '2호선 승강장 중심부',
            facilityType: 'ELEVATOR',
            tip: '하차하자마자 한눈에 보이는 대용량 엘리베이터를 타고 편안하고 안전하게 B1F 대합실로 상향 이동하십시오.',
            status: 'OPERATIONAL'
          },
          {
            id: 'ga5-step2',
            name: '지하 대합실 및 전용 게이트 (B1F)',
            desc: '비접촉식 무장애 휠체어/유모차 전용 와이드 개찰구',
            facilityType: 'GATE',
            tip: '넓은 규격의 전용 비상 게이트로 통과하여, 보행 유도 유색 블록을 거쳐 5번 출구 엘리베이터 앞으로 진입하십시오.',
            status: 'OPERATIONAL'
          },
          {
            id: 'ga5-step3',
            name: '지상 연결 엘리베이터 (B1F ↔ 1F)',
            desc: '5번 출구 외부 전용 엘리베이터',
            facilityType: 'ELEVATOR',
            tip: '지상 수직 내부 엘리베이터를 나와 즉시 1층 평평한 보도로 진출할 수 있으며, 광안리 바다 방향 광장으로 턱 없이 주행 가능합니다.',
            status: 'OPERATIONAL'
          }
        ]
      },
      {
        number: '6번 출구',
        isAccessible: true,
        isStrollerFriendly: true,
        hasElevator: true,
        hasEscalator: false,
        facilityDirection: 'BOTH',
        tip: '6번 출구 인도 안쪽에 위치하고 있는 전용 야외 엘리베이터입니다. 가성비 높은 복복 쇼핑점, 한바다중학교 및 인접 밀집 주택 보행 구역 방향으로 장애 없이 이동하기 가장 안전합니다.',
        status: 'OPERATIONAL',
        directionDesc: '수영동 행정복지센터, 한바다중학교, 홈플러스익스프레스 광안점, 광안4동 방면',
        latitude: 35.158121,
        longitude: 129.114821,
        kakaoMapUrl: 'https://map.kakao.com/link/search/광안역 6번출구 엘리베이터',
        naverMapUrl: 'https://map.naver.com/v5/search/광안역 6번출구 엘리베이터',
        pathwayTimeline: [
          {
            id: 'ga6-step1',
            name: '승강장 플랫폼 (B2F)',
            desc: '2호선 승강장 대칭 엘리베이터 구획',
            facilityType: 'ELEVATOR',
            tip: '열차 플랫폼 정가운데의 무장애 교통약자 엘리베이터를 이용해 안전하게 대합실 지하 1층으로 상향 승합합니다.',
            status: 'OPERATIONAL'
          },
          {
            id: 'ga6-step2',
            name: '지하 대합실 및 게이트 (B1F)',
            desc: '대합실 중앙 무턱 안심 게이트',
            facilityType: 'GATE',
            tip: '장애인 전용 개방 통로 게이트를 지난 다음, 사거리의 6번출구 사인을 보며 안쪽 우측 복도로 완만히 직진 주행하세요.',
            status: 'OPERATIONAL'
          },
          {
            id: 'ga6-step3',
            name: '지상 연결 엘리베이터 (B1F ↔ 1F)',
            desc: '6번 출구 인도 연동 엘리베이터',
            facilityType: 'ELEVATOR',
            tip: '수직 저상 전용 야외 엘리베이터를 내리자마자 턱 없는 안정적인 지상 평탄 도보 블록에 즉시 착지합니다.',
            status: 'OPERATIONAL'
          }
        ]
      }
    ]
  },
  {
    id: 'nampo',
    name: '남포역',
    englishName: 'Nampo Station',
    lines: ['1'],
    elevatorCount: 4,
    escalatorCount: 8,
    toiletLocation: '지하 1층 대합실 내부 중앙 (광복지하상가 연결부 인접 무장애 화장실)',
    isTransferStation: false,
    accentColor: 'from-[#f37021] to-[#bf4a00]',
    exits: [
      {
        number: '2번 출구',
        isAccessible: false,
        isStrollerFriendly: true,
        hasElevator: false,
        hasEscalator: true,
        facilityDirection: 'UP',
        tip: '지상 1층 인도로 올라가는 전용 상행 에스컬레이터가 작동하고 있는 구역입니다. 하행 이용 시에는 인접 백화점 연결로 우회 혹은 전용 기기를 이용하는 것이 더욱 안락합니다.',
        status: 'OPERATIONAL',
        directionDesc: '롯데백화점 광복점 정문, 남포동 극장가 사거리 방면',
        latitude: 35.097221,
        longitude: 129.034821,
        kakaoMapUrl: 'https://map.kakao.com/link/search/남포역 2번출구',
        naverMapUrl: 'https://map.naver.com/v5/search/남포역 2번출구',
        pathwayTimeline: [
          {
            id: 'np2-step1',
            name: '승강장 (B2F)',
            desc: '1호선 다대포해수욕장/노포 방면 승강장',
            facilityType: 'GATE',
            tip: '하차 후 중앙 계단 옆 전동 에스컬레이터를 통해 B1F 대합실로 연결 진입하세요.',
            status: 'OPERATIONAL'
          },
          {
            id: 'np2-step2',
            name: '개찰 게이트 (B1F)',
            desc: '대합실 남포역 2번 통로 연계 개찰구',
            facilityType: 'GATE',
            tip: '카드를 접촉하고 나가서 오른쪽 2번출입 전광 표지를 따라 평행 보행합니다.',
            status: 'OPERATIONAL'
          },
          {
            id: 'np2-step3',
            name: '출구 상행 에스컬레이터 (B1F → 1F)',
            desc: '2번 출입구 상향 지상 인출용 에스컬레이터',
            facilityType: 'ESCALATOR',
            tip: '상향 작동하는 원스톱 에스컬레이터에 안전하게 몸을 탑승하십시오. 내리는 곳은 남포동 지상 메인 사거리와 인접하고 인도 턱도 평행합니다.',
            status: 'OPERATIONAL'
          }
        ]
      },
      {
        number: '4번 출구',
        isAccessible: true,
        isStrollerFriendly: true,
        hasElevator: true,
        hasEscalator: false,
        facilityDirection: 'BOTH',
        tip: '4번 출구 바로 옆 실외 인도변에 설치된 저상 경사로 연계형 전용 수직 엘리베이터입니다. 단 1칸의 계단도 거치지 않고 편안하게 지상 및 해안 인도변으로의 직교 진출입이 보장됩니다.',
        status: 'OPERATIONAL',
        directionDesc: '남포동 건어물시장, 영도대교 진입로, 자갈치 시장, 부산대교 방면',
        latitude: 35.097451,
        longitude: 129.033981,
        kakaoMapUrl: 'https://map.kakao.com/link/search/남포역 4번출구 엘리베이터',
        naverMapUrl: 'https://map.naver.com/v5/search/남포역 4번출구 엘리베이터',
        pathwayTimeline: [
          {
            id: 'np4-step1',
            name: '1호선 승강장 (B2F)',
            desc: '승강장 교통약자 배리어 프리 엘리베이터',
            facilityType: 'ELEVATOR',
            tip: '하차 즉시 전용 통로 안쪽의 초속 대용량 수직 엘리베이터를 타고 B1F 대합실로 상향 승합합니다.',
            status: 'OPERATIONAL'
          },
          {
            id: 'np4-step2',
            name: '지하 대합실 개찰구 및 통로 (B1F)',
            desc: '무턱 센서 감지 휠체어/유모차용 대형 게이트',
            facilityType: 'GATE',
            tip: '넓은 휠체어 무장애 게이트로 카드를 태그하여 퇴장하신 뒤 4번출구 유도 점자 블록을 보며 진입하세요.',
            status: 'OPERATIONAL'
          },
          {
            id: 'np4-step3',
            name: '외부 수직 엘리베이터 (B1F ↔ 1F)',
            desc: '4번 출구 지상 직결 안심 승강기',
            facilityType: 'ELEVATOR',
            tip: '야외형 전용 승강기를 내리시면 턱 없는 보도블록과 완만한 연결 슬로프가 완비되어 즉각 영도 및 남포 남쪽 바다 방면으로 진입하실 수 있습니다.',
            status: 'OPERATIONAL'
          }
        ]
      },
      {
        number: '6번 출구',
        isAccessible: false,
        isStrollerFriendly: true,
        hasElevator: false,
        hasEscalator: true,
        facilityDirection: 'BOTH',
        tip: '6번 출구에 설계된 왕복(상/하행) 에스컬레이터 쌍으로 계단을 전혀 오르내리지 않고 무거운 수하물 가방이나 캐리어와 함께 지상으로 편히 나갈 수 있습니다.',
        status: 'OPERATIONAL',
        directionDesc: '남포치안센터, 부산데파트, 영도대교, 남포 삼거리 방면',
        latitude: 35.097821,
        longitude: 129.035121,
        kakaoMapUrl: 'https://map.kakao.com/link/search/남포역 6번출구 에스컬레이터',
        naverMapUrl: 'https://map.naver.com/v5/search/남포역 6번출구 에스컬레이터',
        pathwayTimeline: [
          {
            id: 'np6-step1',
            name: '승강장 플랫폼 (B2F)',
            desc: '1호선 남포역 승강 구역',
            facilityType: 'GATE',
            tip: '플랫폼 중심 에스컬레이터를 이용하여 B1F 대합실 개방 공간으로 이동해 주십시오.',
            status: 'OPERATIONAL'
          },
          {
            id: 'np6-step2',
            name: '대합실 개찰 게이트 (B1F)',
            desc: 'B1F 대합실 및 화장실 연결 개찰구',
            facilityType: 'GATE',
            tip: '교통카드를 접촉하고 6번 출구 연결 통로를 향하여 전진합니다.',
            status: 'OPERATIONAL'
          },
          {
            id: 'np6-step3',
            name: '출구 에스컬레이터 (B1F ↔ 1F)',
            desc: '6번 통로 상행/하행 전동 에스컬레이터',
            facilityType: 'ESCALATOR',
            tip: '상행 및 하행 에스컬레이터가 모두 왕복 운행 중이므로, 에스컬레이터 이용이 가능하신 캐리어 소지자나 유모차 동반 승객분들께 매우 편리합니다.',
            status: 'OPERATIONAL'
          }
        ]
      },
      {
        number: '7번 출구',
        isAccessible: false,
        isStrollerFriendly: true,
        hasElevator: false,
        hasEscalator: true,
        facilityDirection: 'BOTH',
        tip: '남포동 패션거리 및 비프광장, 용두산 에스컬레이터 탑승로와 도보 2분 거리에 있습니다. 양방향(상/하행) 에스컬레이터가 나란히 왕복 설계되어 있어 계단 보행 없이 지상으로의 원활한 진출을 보장합니다.',
        status: 'OPERATIONAL',
        directionDesc: '비프거리(BIFF), 용두산공원, 원조족발골목 방면',
        latitude: 35.097651,
        longitude: 129.034451,
        kakaoMapUrl: 'https://map.kakao.com/link/search/남포역 1호선 7번출구',
        naverMapUrl: 'https://map.naver.com/v5/search/남포역 1호선 7번출구',
        pathwayTimeline: [
          {
            id: 'np7-step1',
            name: '남포역 승강장 (B2F)',
            desc: '1호선 중앙/자갈치 방면 승강 구역',
            facilityType: 'GATE',
            tip: '승강장 내 마련된 에스컬레이터를 타고 곧바로 지하 1층 통합 대합실로 상향 진출하십시오.',
            status: 'OPERATIONAL'
          },
          {
            id: 'np7-step2',
            name: '대합실 중앙 게이트 (B1F)',
            desc: '교통카드 터치식 및 유모차용 와이드 롤러 게이트',
            facilityType: 'GATE',
            tip: '대형 개찰구를 지나 비표지 유치원을 지나 오른편에 위치한 7번 유도 선로를 따라가세요.',
            status: 'OPERATIONAL'
          },
          {
            id: 'np7-step3',
            name: '지상 에스컬레이터 (B1F ↔ 1F)',
            desc: '7번 통로 상/하 전동 기동 에스컬레이터',
            facilityType: 'ESCALATOR',
            tip: '상하행 에스컬레이터가 나란히 구축되어 있으니 안쪽 안전 바를 쥐고 흔들림 없이 승차하여 활기찬 광복동 인도 지상으로 상륙하십시오.',
            status: 'OPERATIONAL'
          }
        ]
      },
      {
        number: '8번 10번 출구 (롯데백화점 광복점 연결)',
        isAccessible: true,
        isStrollerFriendly: true,
        hasElevator: true,
        hasEscalator: true,
        facilityDirection: 'BOTH',
        tip: '실외의 날씨나 도로 요철, 단차를 일절 거치지 않고 지하철역 대합실에서 롯데백화점 광복점 지하 및 아쿠아몰 메인 분수 광장 중앙으로 턱 없이 직접 유입되는 최고의 무장애 우회로입니다. 백화점 내부 대용량 승강기 및 초광폭 상하 에스컬레이터를 통과하여 지상으로 매우 편하게 나오실 수 있습니다.',
        status: 'OPERATIONAL',
        directionDesc: '롯데백화점 광복점(아쿠아몰 연결), 롯데마트 광복점 방면',
        latitude: 35.098021,
        longitude: 129.035821,
        kakaoMapUrl: 'https://map.kakao.com/link/search/남포역 8번출구 10번출구 롯데백화점',
        naverMapUrl: 'https://map.naver.com/v5/search/남포역 8번출구 10번출구 롯데백화점',
        pathwayTimeline: [
          {
            id: 'np810-step1',
            name: '승강장 및 수직 엘리베이터 (B2F)',
            desc: '1호선 승강장 내부 엘리베이터 주차선',
            facilityType: 'ELEVATOR',
            tip: '열차 하차 후 승강장 안쪽에 마련된 배리어프리 엘리베이터를 탑승하여 B1F 대합실로 다이렉트 탑승 이동합니다.',
            status: 'OPERATIONAL'
          },
          {
            id: 'np810-step2',
            name: '백화점 연계 광폭 대합실 (B1F)',
            desc: '분수광장 입구 및 안전 경사 게이트',
            facilityType: 'GATE',
            tip: '무단차 오픈 개찰구를 나와서 정면에 마련된 파란 바닥 매트를 밟고 롯데백화점 지하 1층 수직 연동식 아쿠아 분수 광장 입구로 평행 이동해 주십시오.',
            status: 'OPERATIONAL'
          },
          {
            id: 'np810-step3',
            name: '백화점 내부 엘리베이터 및 에스컬레이터 (B1F ↔ 1F)',
            desc: '롯데백화점 초고속 대용량 엘리베이터 정거장',
            facilityType: 'ELEVATOR',
            tip: '백화점 내부의 넓은 대용량 엘리베이터나 양방향 대각 에스컬레이터를 타고 실내 쾌적한 온도에서 지상 1층 정문 인도로 완전히 안전하게 턱 없이 진출하세요.',
            status: 'OPERATIONAL'
          }
        ]
      }
    ]
  }
];

// Initial mock reports to make the app incredibly lively
export const INITIAL_REPORTS: FacilityReport[] = [
  {
    id: 'report-1',
    stationId: 'seomyeon',
    stationName: '서면역',
    exitNumber: '5번 출구',
    facilityType: 'ESCALATOR',
    reportType: 'MAINTENANCE',
    details: '5번 출구 상행 에스컬레이터 정기 체인 세척 보수로 일시 서행 중입니다. 오후 5시 모든 수리가 안전하게 완료될 예정입니다.',
    createdAt: '2026-05-31T03:00:00Z',
    status: 'VERIFIED'
  },
  {
    id: 'report-2',
    stationId: 'bujeon',
    stationName: '부전역',
    exitNumber: '3번 출구',
    facilityType: 'ELEVATOR',
    reportType: 'MAINTENANCE',
    details: '3번 출구 무장애 지상 엘리베이터 내부 통풍 팬 점검으로 오전 운행이 서행될 수 있으니 참고해주시기 바랍니다.',
    createdAt: '2026-05-31T04:10:00Z',
    status: 'VERIFIED'
  },
  {
    id: 'report-3',
    stationId: 'seomyeon',
    stationName: '서면역',
    exitNumber: '7번 출구',
    facilityType: 'ELEVATOR',
    reportType: 'OTHER',
    details: '7번출구 앞 롯데백화점 지하 연결 통로 스타벅스 앞 휠체어 단차 경사판 리모델링으로 휠체어 수월하게 보행 가능하네요! 완전 편리해졌습니다.',
    createdAt: '2026-05-30T10:30:00Z',
    status: 'RESOLVED'
  }
];
