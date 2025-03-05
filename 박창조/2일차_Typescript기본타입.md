# 🌟 Typescript 기본 🌟

## 1. 실습 환경 설정

**1.1 Node.js 패키지를 초기화**
```sh
npm init
```

**1.2 @types/node 패키지를 설치**
  
  : (Node.js의 내장 기능(함수 및 클래스)에 대한 타입 선언을 제공하는 패키지)

```sh
npm init
```

**1.3 컴파일러 옵션 파일을 생성하고 옵션을 설정 `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "outDir": "dist",
    "strict": true,
    "moduleDetection": "force"
  },
  "ts-node": {
    "esm": true
  },
  "include": ["src"]
}

```

## 2. 기본타입(Basic Types)❓
> 타입스크립트가 자체적으로 제공하는 타입


### 2.1 원시 타입(Primitive Type)
> 동시에 한개의 값만 저장할 수 있는 타입

**2.1.1 number**

- 숫자를 의미하는 모든 값을 포함하는 타입
- 단순 정수 뿐만 아니라 `소수`, `음수`, `Infinity`, `NaN`등의 특수한 숫자들도 포함
  
```typescript
// number
let num1: number = 123;
let num2: number = -123;
let num3: number = 0.123;
let num4: number = -0.123;
let num5: number = Infinity;
let num6: number = -Infinity;
let num7: number = NaN;

num1 = 'hello'; // ❌

num1.toUpperCase(); // ❌
```

**2.1.2 string**
- string 타입은 문자열을 의미하는 타입

```typescript
// string
let str1: string = "hello";
let str2: string = 'hello';
let str3: string = `hello`;
let str4: string = `hello ${str1}`;
```

**2.1.3 boolean**

- boolean 타입은 참과 거짓만을 저장하는 타입
- `true` 또는 `false`만 이 타입에 해당

```typescript
// boolean
let bool1 : boolean = true;
let bool2 : boolean = false;
```

**2.1.4 null**

- 오직 null 값만 포함

```typescript
// null
let null1: null = null;
```

- 다른 타입의 변수에 `null`을 넣는 것은 불가능하다
```typescript
let numA: number = null;  // ❌
```

- 단, `tsconfig.json`의 strcitNullChecks(엄격한 null 검사) 옵션을 false로 설정시 가능하다.

**2.1.5 undefined**

- 오직 하나의 값 undefined만 포함

```typescript
// undefined 타입
let unde1: undefined = undefined;
```

**2.1.6 리터럴 타입**
- 딱 하나의 값만 포함하는 타입
- 특정한 값을 지정하는 타입
```typescript
let numA: 10 = 10;
let strA: "hello" = "hello";
let boolA: true = true;
let boolB: false = false;
```

### 2.2 배열과 튜플

**2.2.1 배열**
> 배열 타입을 정의

- 배열 타입을 지정하는 기본 방법
```typescript
let numArr: number[] = [1, 2, 3]

let strArr: string[] = ["hello", "im", "winterlood"];

let boolArr: Array<boolean> = [true, false, true]; // 제네릭 활용
```

- 다양한 타입 요소를 갖는 배열 타입 정의
  - `|` 유니온(Union) 연산자를 이용
```typescript
let multiArr: (number | string)[] = [1, "hello"];
``` 

- 다차원 배열 타입 정의하기
```typescript
let doubleArr : number[][] = [
  [1, 2, 3], 
  [4, 5],
];
``` 

**2.2.2 튜플**

- 자바스크립트에 없는 특수한 타입으로, 길이와 타입이 고정된 배열
- `tsc`를 이용해 컴파일 시 배열로 변환된다. 
```typescript
let tup1: [number, number] = [1, 2];

let tup2: [number, string, boolean] = [1, "hello", true];
``` 

### 2.3 객체

객체 타입을 정의하는 방법은 2가지가 있다.
- `object` 로 정의하기
- `객체 리터럴 타입`으로 정의하기
  
**2.3.1 `object` 로 정의하기**

```typescript
let user: object = {
  id: 1,
  name: "박창조",
};
```

- 이렇게 `object`로 객체를 정의하면, 점 표기법으로 특정 프로퍼티에 접근하려고 하면 오류가 발생한다.
- 타입스크립트의 `object` 타입은 단순 값이 객체임을 표현하는 것 외에는 아무런 정보도 제공하지 않는 타입이기 때문!

**2.3.2 `객체 리터럴 타입`으로 정의하기**
- 객체 리터럴과 비슷한 문법으로 객체 타입을 정의한 타입
- 타입내에 정의되어있는 프로퍼티에 이상 없이 접근할 수 있다!

```typescript
let user: {
  id: number;
  name: string;
} = {
  id: 1,
  name: "박창조",
};
user.id;
```

객체의 타입을 정의할 때에는 `object` 보다는 `객체 리터럴 타입`을 사용하는게 좋다!


**2.3.3 선택적 프로퍼티(Optional Property)**
- 특정 프로퍼티는 있어도 되고 없어도 되는 상황이 있을 대, 선택적 프로퍼티를 설정한다!
- 프로퍼티의 이름 뒤에 `?` 를 붙여준다!

```typescript
let user: {
  id?: number; // 선택적 프로퍼티가 된 id
  name: string;
} = {
  id: 1,
  name: "박창조",
};

user = {
  name: "홍길동",
};
```

**2.3.4 읽기전용 프로퍼티(Readonly Property)**
- 특정 프로퍼티를 읽기 전용으로 만들고 싶다면 다음과 같이 프로퍼티의 이름 앞에 `readonly` 키워드를 붙인다.
- 프로퍼티의 값을 수정하려고 하면 오류가 발생하게 하여, 의도치 않은 프로퍼티의 수정을 방지할 수 있다.

### 2.4 타입 별칭과 인덱스 시그니쳐

**2.4.1 타입 별칭(Type Alias)**
- 타입 별칭을 이용하면 변수를 선언하듯 타입을 별도로 정의할 수 있다.
- `type 타입_이름` = 타입 형태로 타입을 정의
- 동일한 스코프에 동일한 이름의 타입 별칭을 선언하는 것은 불가능 (변수 선언과 유사)

```typescript
// 타입 별칭
type User = {
  id: number;
  name: string;
  nickname: string;
  birth: string;
  bio: string;
  location: string;
};

let user: User = {
  id: 1,
  name: "박창조",
  nickname: "Creation",
  birth: "1998.12.02",
  bio: "안녕하세요",
  location: "용산구",
};

```

**2.4.2 인덱스 시그니처(Index Signature)**
> 인덱스 시그니쳐는 객체 타입을 유연하게 정의할 수 있도록 돕는 특수한 문법

```typescript
type CountryNumberCodes = {
  [key: string]: number;
};
```

### 2.5 열거형 (Enum) 타입
> 자바스크립트에는 존재하지 않고 오직 타입스크립트에서만 사용할 수 있는 특별한 타입

- 여러개의 값을 나열하는 용도로 사용


```typescript
enum Role {
  ADMIN = 0,
  USER = 1,
  GUEST = 2,
}

const user1 = {
  name: "박창조",
  role: Role.ADMIN, //관리자 -> 0 할당
};

const user2 = {
  name: "홍길동",
  role: Role.USER, // 회원 -> 1 할당
};

const user3 = {
  name: "아무개",
  role: Role.GUEST, // 게스트 -> 2 할당
};

```

- enum은 컴파일될 때 다른 타입들 처럼 사라지지 않고 자바스크립트 객체로 변환

```javascript
// tsc로 변환 시 
var Role;
(function (Role) {
    Role[Role["ADMIN"] = 0] = "ADMIN";
    Role[Role["USER"] = 1] = "USER";
    Role[Role["GUEST"] = 2] = "GUEST";
})(Role || (Role = {}));
```

### 2.6 any와 unknown

**2.6.1 `any`**
> 타입스크립트에서만 제공되는 특별한 타입으로 타입 검사를 받지 않는 특수한 치트키 타입

- any 타입은 어떠한 타입 검사도 받지 않기 때문에 아무 타입의 값이나 범용적으로 담아 사용할 수 있다.
- 다양한 타입의 메서드도 마음대로 호출해서 사용해도 문제가 되지 않음
- 어떤 타입으로 정의된 변수던 문제 없이 다 할당할 수 있다.

```typescript
let anyVar: any = 10;
anyVar = "hello";

let num: number = 10;
num = anyVar;

```

- 주의할 점은 `any` 타입은 최대한 사용하면 안된다.
- 많은 부분에서 타입 검사가 제대로 이루어지지 않기에 에러를 발생시킬 수 있는 위험한 코드가 된다.
- 정말 어쩔 수 없는 경우를 제외하고는 any 타입을 사용하지 않아야 한다.

**2.6.2 `unknown`**
> any 타입과 비슷하지만 보다 안전한 타입

- 어떤 타입의 값이든 다 저장할 수 있지만,
- unknown 타입의 값은 어떤 타입의 변수에도 저장 할 수 없다.
- 오직 값을 저장하는 행위밖에 할 수 없다.

```typescript
let num: number = 10;
(...)

let unknownVar: unknown;
unknownVar = "";
unknownVar = 1;
unknownVar = () => {};

num = unknownVar; // 오류 !
```

### 2.7 void와 never

**2.7.1 `void`**
> 아무런 값도 없음을 의미하는 타입

- 보통 아무런 값도 반환하지 않는 함수의 반환값 타입을 정의할 때 사용

```typescript
function func2(): void {
  console.log("hello");
}
```

- 변수의 타입으로도 `void`타입을 지정할 수 있지만, `void` 타입의 변수에는 `undefined` 이외의 다른 타입의 값은 담을 수 없
- `void` 타입이 `undefined` 타입을 포함하는 타입이기 때문

```typescript
let a: void;
a = undefined;
```

**2.7.2 `never`**
> 불가능을 의미하는 타입
> 함수가 어떠한 값도 반환할 수 없는 상황일 때 해당 함수의 반환값 타입을 정의할 때 사용

- 뭔가를 반환한다는 것 자체가 '불가능' 할 때
- 의도적으로 오류를 발생시키는 함수도 never 타입으로 반환값 타입을 정의
  
```typescript
function func4(): never {
  throw new Error();
}
```

- 변수의 타입을 never로 정의하면 any를 포함해 그 어떠한 타입의 값도 이 변수에 담을 수 없게 됩니다. 
  
```typescript
let anyVar: any;
(...)

let a: never;
a = 1;
a = null;
a = undefined;
a = anyVar;
```

---

# 🔗 reference

- 인프런 '한 입 크기로 잘라먹는 타입스크립트'