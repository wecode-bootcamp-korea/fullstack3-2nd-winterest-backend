# winterest

![Winterest-logo](https://user-images.githubusercontent.com/90169703/152731312-fdbc3a49-8155-4d26-9c8b-aad868c3045a.png)

## 프로젝트 사이트 기능 구현 영상

[winterest 구현 영상](https://youtu.be/sfeJfl8CoCw)

## Members

<프론트 엔드>

<img src="https://user-images.githubusercontent.com/90169703/152270453-d84bbe12-ce24-4b7a-94a2-319125ee3f11.jpg" width="50px" height="50px"/> 강민수 &nbsp; [기술블로그](https://velog.io/@minsu8834), [깃허브](https://github.com/minchodang)

<img src="https://user-images.githubusercontent.com/90169703/152270576-9b3a2a21-dbbe-4294-ae58-56dfb67e12bb.jpg" width="50px" height="50px"/> 박태준 &nbsp; [기술블로그](https://velog.io/@tjpark1028), [깃허브](https://github.com/TaeJoonPark)

<풀스택>

<img src="https://user-images.githubusercontent.com/90169703/152270561-f44068bf-81d4-4b65-9124-2dafdc96d0fc.jpg" width="50px" height="50px"/> 최종민 &nbsp; [기술블로그](https://quark21.tistory.com/category/Programming), [깃허브](https://github.com/quark4904/)

<백엔드>

<img src="https://user-images.githubusercontent.com/90169703/152270596-805d1d9c-07b0-4fee-9dfb-6cf6d9deff80.jpg" width="50px" height="50px"/> 정태영 &nbsp; [기술블로그](https://dev-taeyeong.github.io), [깃허브](https://github.com/dev-taeyeong)

<br>

## Introduction

대표적인 사진 기반 sns 사이트인 pinterest 사이트의 주요기능들을 모티브 삼아 sns 사이트 윈터레스트 개발.

- 기간 : 2주
- 구성 : Front-end 2명, Full-stack 1명, Back-end 1명

## 레포지토리 주소

- [Front-end Github](https://github.com/wecode-bootcamp-korea/fullstack3-2nd-winterest-frontend)
- [Back-end Github](https://github.com/wecode-bootcamp-korea/fullstack3-2nd-winterest-backend)

## Notion 프로젝트 소개

- [윈터레스트 노션 페이지](https://wecode.notion.site/winterest-0fe4898e90d2407897bff2e9dca89812)

## DB modeling

- winterest db 자료 구조

![스크린샷 2022-02-08 오전 10 59 43](https://user-images.githubusercontent.com/90169703/152903563-2b2e7873-348a-4a1c-9a87-164ae2e465e6.png)

## 사용한 라이브러리

- react-masonry-css
  https://www.npmjs.com/package/react-masonry-css

## Technologies

- Front-end

<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white"> <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">

- Back-end

<img src="https://img.shields.io/badge/prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white"> <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white"> <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=node.js&logoColor=white"> <img src="https://img.shields.io/badge/postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white"> <img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">

## 담당자 별 구현 기능.

[ Front-end ]

<강민수>

1. 홈 랜딩 페이지 ui 및 기능 구현

- 홈 랜딩 페이지 글자 타이핑 효과 구현.
- 홈 랜딩 페이지 로그인 & 회원가입 플로팅 버튼 ui
- 로그인& 회원가입 모달 창 개발 및 기능 구현.
- 일반 로그인 벨리데이션 및 카카오 소셜 로그인 기능 구현
- 홈 랜딩 페이지 이미지 반응형 구현

2. 메인 윈(카드) 리스트 페이지 ui 및 기능 구현

- masonry 레이아웃 및 페이지 내부 데이터 연결 구현
- 네브바 태그 서칭 기능에 따른 윈(카드) 리스트 페이지 재 랜더링 구현
- 윈 저장 버튼 누를 시 보드별로 저장 모달창 ui 및 기능 구현.
- 보드별 저장 기능 구현 및 중복 저장 방지에 따른 알러트 창 구현.
- 메인 페이지 전반에 반응형 작업 구현.

3. 보드 페이지 ui 및 기능 구현.

- 사용자 별 보드 페이지에 따른 윈(=카드) 리스트 구현.
- 보드 이름 수정 버튼 모달창 구현

<박태준>

1. 윈(카드) 디테일 페이지 ui 및 기능 구현

- 이미지 상세페이지 동적 기능(팔로우, 댓글+대댓글, 좋아요 기능, 저장/저장됨) 및 UI 구현
- 유저 정보에 따라 다른 수정페이지 모달화면으로 구현
- 태그 수정 기능 (enter 키와 마우스 클릭을 통해 추가/삭제 동작 디자인적으로 구현)

2. 윈(카드) 업로드 페이지 ui 및 기능 구현

- formData와 axios를 이용한 이미지 업로드 기능 및 이미지 미리보기 UI 구현

<최종민>

1. 홈 랜딩 페이지 nav UI 구현

- 홈 랜딩 페이지 nav UI 반응형으로 구현

2. 메인 페이지 nav UI 구현

- 백엔드 tag 데이터를 활용한 검색 기능 구현
- 메인 페이지 nav UI 반응형으로 구현

[ Back-end ]

<정태영>

1. win(게시물) API(CRD) 구현

- win create API와 aws S3를 연동(win 생성시 이미지 파일이 aws S3에 저장됨)
- win delete API와 aws S3를 연동(win 삭제시 이미지 파일이 aws S3에서 삭제됨)
- express-rate-limit을 사용한 DOS 공격 예방

2. 댓글 API(CRUD) 구현

- 재귀 호출을 이용한 대댓글 기능 구현

3. 인가 시스템 구현

- 같은 게시물이나 유저의 페이지를 보더라도 본인인지 여부에 따라 권한을 부여하거나 다른 정보를 보여줄 수 있도록 토큰을 이용한 인가 과정 구현

4. 댓글 좋아요 API(CRD) 구현

5. 보드(게시물 저장) API(CRUD) 구현

- board를 본인만 수정, 삭제 할 수 있도록 인가 과정 구현

6. 팔로우 API(CRD) 구현

7. 관심사 API(CRD) 구현

<최종민>

1. 회원가입/로그인 API 구현

- 이메일을 이용한 회원가입/로그인 API 구현
- 소셜 로그인(카카오)를 이용한 회원가입/로그인 API 구현

2. tag API(CR) 구현

- tag를 활용한 메인 페이지 검색 기능 구현

3. win(게시물) API(R) 구현

- 메인 페이지 리스트 정보 제공

4. win(게시물) 좋아요 API(CRD) 구현
5. 미들웨어 인가 API 구현

### Contact US

- 강민수 minsu910725@gmail.com
- 박태준 pinedelo30@gmail.com
- 최종민 quark4904@gmail.com
- 정태영 dev.taeyeong@gmail.com
