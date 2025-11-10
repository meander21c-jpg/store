# 매장 관리 시스템 프로젝트 구조

## 파일 구조
```
/mnt/okcomputer/output/
├── index.html          # 메인 대시보드
├── inventory.html      # 재고 관리 페이지
├── sales.html          # 판매 관리 페이지
├── staff.html          # 직원 관리 페이지
├── main.js            # 주요 자바스크립트 로직
├── resources/         # 이미지 및 리소스 폴
│   ├── dashboard-bg.jpg
│   ├── product-*.jpg
│   └── staff-*.jpg
└── README.md          # 프로젝트 설명
```

## 페이지 구성

### index.html - 메인 대시보드
- 실시간 매장 현황
- 주요 지표 요약
- 빠른 액션 버튼
- 최근 활동 피드

### inventory.html - 재고 관리
- 제품 목록 및 검색
- 재고 수준 관리
- 입고/출고 기록
- 재고 경고 시스템

### sales.html - 판매 관리
- 판매 내역
- 결제 처리
- 판매 분석
- 수익 보고서

### staff.html - 직원 관리
- 직원 목록
- 근무 일정
- 성과 추적
- 권한 설정

## 기술 스택
- HTML5 + CSS3 (Tailwind CSS)
- JavaScript (ES6+)
- Chart.js (데이터 시각화)
- Anime.js (애니메이션)
- ECharts (고급 차트)
- Splide.js (이미지 슬라이더)