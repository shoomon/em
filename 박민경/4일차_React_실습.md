# 03.07. React_실습

### 오전 Live 방송 : FE 개발 생산성 향상 AI 도구
1. [Gemini Code Assist](https://codeassist.google/)
    - 이전 GitHub Copilot은 오른쪽에 위치, Gemini는 왼쪽에 위치하다는 차이가 있음
    - 무료! 느낌
    - copilot보다는 느리나 큰 차이 없다!
2. [aws CodeWhisperer](https://aws.amazon.com/ko/q/developer/?gclid=CjwKCAiArKW-BhAzEiwAZhWsIK5vOLtCVcjCBhSbw4FknHv5dN9MHpZROOjyOOMmjlTmM3zcaXGbChoCK6QQAvD_BwE&trk=4ca3bac1-348e-45e6-b2fc-95a7c76f8906&sc_channel=ps&ef_id=CjwKCAiArKW-BhAzEiwAZhWsIK5vOLtCVcjCBhSbw4FknHv5dN9MHpZROOjyOOMmjlTmM3zcaXGbChoCK6QQAvD_BwE:G:s&s_kwcid=AL!4422!3!698165419414!e!!g!!aws%20codewhisperer!21058131100!156938951410)
    - 거의 무료 느낌
    - AmazonQ
    - API에 따라 비용이 들기도 함
3. AICodeHelper
    - Extension
    - 사용하는 AI 적용 가능
4. [tldraw MakeReal](https://www.tldraw.com/)
    - 이미지 이용해서 만들어줄 수 있음
    - [GitHub](https://github.com/tldraw/make-real) 참고

---

### React_기초
1. 기존에 있는 웹사이트에 React 적용: HTML + CSS + React
    - Index.html
        ```
        <html>
            <head>
                <title>html실습</title>
                <link rel="stylesheet" href="styles.css">
            </head>
            <body>
                <h1>실습 해보자!</h1>

                <!-- DOM Container (Root DOM Node)-->
                <div id="root"></div>

                <!-- 리액트 가져오기 -->
                <script src="https://unpkg.com/react@17/umd/react.development.js" crossorigin></script>
                <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js" crossorigin></script>
                
                <!-- 리액트 컴포넌트 가져오기 -->
                <script src="MyButton.js"></script>
            </body>
        </html>
        ```
    - styles.css
        ```
        h1 {
            color: green;
            font-style: italic;
        }
        ```
    - MyButton.js
        ```
        function MyButton(props) {
            const [isClicked, setIsClicked] = React.useState(false);

            return React.createElement(
                'button',
                { onClick: () => setIsClicked(true) },
                isClicked ? 'Clicked!' : 'Click here!'
            )
        }

        const domContainer = document.querySelector('#root');
        ReactDOM.render(React.createElement(MyButton), domContainer);
        ```
2. [CRA (create-react-app)](https://reactjs.org/docs/create-a-new-react-app.html)
    - 조건
        - Node.js v14.0.0 이상
        - npm v6.14.0. 이상
        - VS Code
    - 만들기
        - npx : execute npm package binaries, npm 패키지 설치한 이후에 곧바로 실행, execute까지 해주는 명령어 (패키지를 정해진 위치에 설치하고 실행하기 번거롭기 때문에 간편하게 한번에 처리하기 위해 사용)
        ```
        npx create-react-app  my-app

        # 경로 변경 (change directory)
        cd my-app

        # 애플리케이션 실행
        npm start

        ```
3. JSX
    - 정의
        - A syntax extention to JavaScript: 자바스크립트 확장 문법
        - JavaScript + XML / HTML
        - 예시
            ```
            const element = <h1>Hello, world!</h1>;
            ```
    - 역할
        - 내부적으로 XML, HTML 코드를 JavaScript로 변환하는 과정을 거침
        - 실제로 JSX로 작성해도, JavaScript로 나오게 됨
        - 변환하는 역할: createElement
            - Element 함수의 파라미터터
            ```
            React.createElement(
                type, <!-- html tag | react Component -->
                [props], <!-- 속성들 -->
                [...children] <!-- 현재 element가 포함하고 있는 자식  element -->
            )
            ```
            - 예시1
            ```
            <!-- JSX 사용한 코드 -->
            class Hello extends React.Component {
                render() {
                    return <div>Hello {this.props.toWhat}</div>;
                }
            }

            ReactDom.render(
                <Hello toWhat="World" />,
                document.getElementById('root')
            )

            <!-- JSX 사용하지 않은 코드 (순수 JavaScript) -->
            class Hello extends React.Component {
                render() {
                    return React.createElement('div', null, `Hello ${this.props.toWhat}`);
                }
            }

            ReactDom.render(
                React.createElement(Hello, { toWhat: 'World' }, null),
                document.getElementById('root')
            )
            ```
            - 예시2
            ```
            <!-- JSX를 사용한 코드 -->
            const element = (
                <h1 className="greeting">
                    Hello, world!
                </h1>
            )

            <!-- JSX를 사용하지 않은 코드 -->
            const element = React.createElement(
                'h1',
                { className: 'greeting' },
                'Hello, world!'
            )

            <!-- React.createElement()의 결과 -->
            const element = {
                type: 'h1',
                props: {
                    className: 'greeting',
                    children: 'Hello, world!'
                }
            }
            ```
        - JSX가 필수는 아님! createElement 사용해서 만들 수 있으니까... 하지만 훨씬 편리
    - 장점
        - 간결한 코드
        - 가독성 향상: 버그 발견이 쉬움!
            ```
            <!-- JSX  사용함 -->
            <div>Hello, {name}</div>

            <!-- JSX 사용 안함 -->
            React.createElement('div', null, `Hello, ${name}`);
            ```
        - Injection Attacks(해킹 방법) 방어: 보안성 강화
            - ID 입력창에 JavaScript 코드 넣었을 때 코드 실행되는 위험
            ```
            // 잠재적 보안 위험 있음
            const title = response.potentiallyMaliciousInput;

            // 이 코드는 안전합니다.
            const element = <h1>{title}</h1>;
            ```
    - 사용법
        - JavaScript 코드 + XML/HTML 섞어서 사용
        -  XML/HTML 코드 사이에 JavaScript 사용할 때 중괄호{} 안에 JavaScript 넣어서 작성
            ```
            function fotmatName(user) {
                return user.firstName + ' ' + user.lastName;
            }

            const user = {
                firstName: 'Inje',
                lastName: 'Lee'
            }
            
            const element = (
                <h1>
                    Hello, {formatUser(user)}
                </h1>
            )

            ReactDOM.render(
                element,
                document.getElementById('root')
            )
            ```
            ```
            function getGreeting(user) {
                if (user) {
                    return <h1>Hello, {formatName(user)}!</h1>;
                }
                return <h1>Hello, Stranger.</h1>
            }
            ```
        - 태그의 속성(attribute)에 값을 넣는 방법
            ```
            // 큰따옴표 사이에 문자열을 넣거나
            const element = <div tabIndex="0"></div>;

            // 중괄호 사이에 자바스크립트 코드를 넣으면 됨!
            const element = <img src={user.avatarUrl}></img>;
            ```
        - 자식을 정의하는 방법
            ```
            const element = (
                <div>
                    <h1>안녕하세요</h1>
                    <h2>열심히 리액트를 공부해봅시다!</h2>
                </div>
            )
            ```
    - 실습
        - Book.jsx
            ```
            import React from "react";

            function Book(props) {
                return (
                    <div>
                        <h1>{`이 책의 이름은 ${props.name}입니다.`}</h1>
                        <h2>{`이 책은 총 ${props.numOfPage}페이지로 이뤄져 있습니다.`}</h2>
                    </div>
                );
            }

            export default Book;
            ```
        - Library.jsx
            ```
            import React from "react";
            import Book from "./Book";

            function Library(props) {
                return (
                    <div>
                        <Book name="처음 만난 파이썬" numOfPage={300} />
                        <Book name="처음 만난 AWS" numOfPage={400} />
                        <Book name="처음 만난 리액트트" numOfPage={500} />
                    </div>
                );
            }

            export default Library;
            ```

---

### 느낀 점
1. 팀원들 모두 열심히 하는 모습을 보여서, 더욱 열심히 하게 되는 것 같습니다! 오늘 남은 시간도 화이팅해서 많은 발전이 있길 바랍니다. :)