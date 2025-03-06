## 03.06. React_기초

### 오전 Live 방송 : On-Device AI
- On-Device AI
    - 중앙의 Cloud 서버가 아닌 Edge단의 Device에서 인터넷 연결없이 자체적으로 AI Inference/Training을 수행하는 기술
- AIoT와의 차이점
    - On-Device: Device에서 직접 AI 추론을 수행
    - AIoT: Device에서 얻은 정보를 인터넷을 통해 Cloud 서버로 전달하여 추론을 수행
- 장점
    - 데이터 프라이버시
        - 기기 내부의 사용자의 데이터를 직접적으로 이용하여 AI 모델을 실행하기 때문에 사용자 데이터 전송이 불필요해짐
    - 네트워크
        - 사용자 데이터 전송에 따른 오버헤드 제거
        - 네트워크 연결 없이도 AI 동작
    - 클라우드 운영
        - 모델을 각 기기에 배포함에 따른 클라우드 운영 비용 절감
        - 이산화탄소 배출량 감소
- 상용 제품
    - 스마트폰
    - 자율주행 차량
    - 로봇
- 관련 프레임워크
    - [NNStreamer](https://github.com/nnstreamer)
    - [ONE](https://github.com/Samsung/ONE)
- 정리
    - Inference를 Cloud 서버 없이 Edge Device에서 수행하는 AI를 On-Device AI
    - 데이터 프라이버시, 네트워크 오버헤드 제거, 클라우드 비용절감이 장점
    - On-Device AI를 제품을 생산하는 회사로 삼성전자, 애플, 테슬라, 현대자동차
    - NNStreamer, NNTrainer, ONE, MediaPipe, Coral Edge TPU
    - SSAFY 교육과정에서의 팀프로젝트로  ON-Device AI 기술 경험 적극 추천
    - Android 개발자와 C++ 개발자를 중신으로 팀을 이룬다면 짧은 기간에도 On-Device AI 프로젝트 구현 가능

### React_기초
1. HTML
    - Hyper Text Markup Language
    - 웹사이트의 뼈대를 구성하기 위해 사용하는 마크업 언어
    - Tag(태그)
        - 태그는 열었으면 닫아줘야 함!
            ```
            <html>
                <head></head>
                <body></body>
            </html>
            <br/>
            ```
    - SPA (Single Page Application)
        - body 안에 content를 교체하며 사용!
2. CSS
    - Cascading Style Sheets
3. JavaScript
    - ECMAScript, Script Language
        - 현재 ES6 많이 사용
    - 문법
        - 자료형(Data Type): Dynamic Typing (동적 타이핑)
        - 연산자
            - 대입연산자: 오른쪽에서 왼쪽으로 흘러감
            - 사칙연산자
                - 덧셈(+), 뺄셈(-), 곱셈(*), 나눗셈(/), 나머지(%),지수 연산자(**)
                - 증가연산자(++), 감소연산자(--)
            - 관계 연산자
                - 비교 연산자: <, >, <=, >=
                - 동등 연산자: ==, !=
                - 일치 연산자: ===, !==
            - 이진 논리 연산자 : &&, ||
            - 조건부 연산자
                - 삼항 연산자
                    ```
                    조건식? true일 경우 : false일 경우
                    ```
        - 함수: 입력을 받아서 정해진 출력을 하는 것
            - 

### 느낀 점
 오늘은 서로 마주보면서 프로젝트의 원하는 방향을 이야기해보면서, 함께 만족하면서 만들만한 프로젝트에 대해서 알아보았았습니다. 어느 정도 합의가 되어서, 이를 바탕으로 주제를 구체화해 나갈 예정입니다! 아직은 부족하지만, 팀원 간 소통이 원활해서 잘 해나갈 수 있을 것이라 기대됩니다!