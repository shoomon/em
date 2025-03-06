## 03.05. React

### 오전 Live 방송 : 빅데이터
1. 빅데이터의 역사
    - 빅데이터란?
        - 디지털 환경에서 발생하는 다량의 데이터
        - 이를 활용해 가치를 추출하고 관리하는 것
    - 데이터의 탄생? : "기록"의 시작
        - 과거 벽화부터 시작된 데이터..
    - 저장 기술의 발달
        - 온라인 데이터의 중요성을 깨닫고 발전
        - 하드웨어, 이동식 저장 매체를 넘어서서 클라우드까지 발달함
    - 데이터를 관리하는 기술 발달 (SQL)
        - IBM에서 개발
        - 비정형 데이터까지 관리가 가능해짐
    - 이를 활용해서 개인화된 맞춤 서비스가 가능해짐
        - Amazon: 추천 및 할인 서비스 제공
        - Google: PageRank, 자동완성
2. AI와의 만남
    - AI와 빅데이터의 차이가가 점차 불분명해짐.
    - AI는 빅데이터를 활용해서 학습하고, 빅데이터의 패턴 찾아 의미를 배출해줘서 정형화된 정보를 제공해주게 됨
    - 유튜브 알고리즘, 자율주행, SmartFarm
3. 빅데이터의 미래
    - 개인과 기업의 미래 대비
        - Data & AI 필수화
            - 데이터 리터러시(데이터 이해능력) 필수 역량
        - AI 기술의 내재화, 자동화, 분석 역량 강화

    - 당신의 데이터는 안전할까?
        - 대규모 개인 정보 유출
        - 데이터로 여론 조작
        - 위치 정보 무단 추적
        - AI 알고리즘 차별
        - 음성 비서 사생활 침해 <br>
        ⇒ 데이터 보호법과 AI 윤리 기준의 필요

### React
##### [학습자료](https://euid.notion.site/1acb02dcf1d88003a722f093dacd571d)
1. 개요
    - React : 대화형 사용자 인터페이스를 구축하기 위한 JavaScript 라이브러리
        - UI (사용자 인터페이스) : 사용자가 화면에서 보고 상호작용하는 요소
        - 라이브러리 : UI를 빌드하는 데 유용한 기능(API) 제공, 어플리케이션에서 이러한 기능을 사용할 위치는 개발자에게 맡긴긴다 희미미
    - 핵심 API : Components, Hooks, APIs
2. 핵심 개념 : '변경이 되면 변경점 찾지 말고 다시 그리면 되잖아?'
    - JSX : XML과 유사한 문법 제공하는 JavaScirpt 확장 구문
    - 컴포넌트 : JSX 구문으로 컴포넌트를 사용하면 Props를 HTML과 유사한 방법으로 제공할 수 있음
        - React 컴포넌트는 마크업을 생성
        - 생성된 마크업은 조립되어 가상의 DOM을 구성
        - 가상 DOM은 실제 DOM으로 재조정됨
    - v=f(s)
        - 뷰(View)를 애플리케이션 상태(state)의 기능(function)으로 만들었다는 것
    - 선언형(Declarative) : 수행하는 작업
        - vs 명령형(Imperative) : 작업을 수행하는 방법
    - 관심사의 분리
3. 실습
    - [pnpm](https://pnpm.io/ko/) : npm과의 차이점 볼 수 있음
    - dist : 배포할 때 사용하는 폴더
    - DOM 변환 차이
        - HTML => DOM 변환 (브라우저)
            ```
            const rootElement = document.getElementById('root')
            const buttonElement = document.querySelector('button')

            <!-- console.log(rootElement) // null 가능성 있음 -->

            const headingElement = document.createElement('h1')
            headingElement.textContent = 'React 펀더멘탈'

            if (rootElement) {
                rootElement.appent(headingElement)
                buttonElement?.addEventListener('click', () => {
                    const updatedContent = headingElement.textContent?.replace(/펀더멘탈/, '엘리먼트')
                    if (updatedContent) {
                        headingElement.textContent = updateContent
                    }
                })
            }
            ```
        - JavaScript => DOM 변환 (React & ReactDOM)
            ```
            <!-- import * as React from './lib/react' -->
            <!-- type에선 설치 후 가져와야 함 -->
            import * as React from 'react'
            import * as ReactDom from 'react-dom/client'

            function App() {
                const [state, setState] = React.useState('React Fundamentals')

                const hendelChangeContent = () =>{
                    setState((s) => s.replace('Fundamentals', 'Element'))
                }

                return (
                    <React.Fragment>
                        <h1>{state}</h1>
                        <button type = "button" onClick={handelCnageContent}>엘리먼트로 변경</button>
                    </React.Fragment>
                )
            }

            function reactPrograming() {
                ReactDOM.createRoot(
                    document.getElementById('react')!
                ).render(
                    <App />
                )
            }

            reactPrograming()
            ```
##### 참고 - Alfred : 강의 중 화면 확대 및 화면에 글 작성

### 느낀 점
 기획의 어려움이 크게 다가오고 있습니다. 이야기를 지속적으로 나누고 있지만, 추구하는 방향에 차이가 있어서 의견이 쉽게 좁혀지지 않고 있습니다. 일단 React를 기반으로 진행이 될 것 같아 React부터 공부를 시작하면서 프로젝트를 대비하고자 합니다! 공통 프로젝트 때에도 안드로이드 스튜디오에서 코틀린을 사용하여 새로운 도전을 했었는데, 주제에 따라 React Native를 사용할 수도 있을 것 같아 약간 걱정이기도 합니다. 이번에도 도전을 하게 되더라도 무리 없이 프로젝트가 진행되길 기원합니다!