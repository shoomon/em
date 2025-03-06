# 🌟 Typescript Interface 🌟

## 🌟 1. 인터페이스 기본 문법 🌟

`Interface` ❓ 
> _"타입스크립트에서 객체의 형식을 정의하는 문법"_

```typescript
// 인터페이스 선언
interface Person {
    name: string;
    age: number;
}
```

```typescript
// 인터페이스 구현
const person: Person = {
    name: "박창조",
    age: 30,
};
```

- 인터페이스는 타입 별칭과 문법만 조금 다를 뿐 기본적인 기능은 거의 같다

### 1.1 선택적 프로퍼티, 읽기 전용 프로퍼티, 인덱싱

인터페이스에서도 동일한 방법으로 선택적 프로퍼티, 읽기 전용 프로퍼티, 인덱싱 등을 설정할 수 있다

```typescript
// 선택적 프로퍼티
interface Person {
    name: string;
    age?: number;
}

// 읽기 전용 프로퍼티
interface Person {
    readonly name: string;
}

// 인덱싱
interface StringArray {
    [index: number]: string;
}

const myArray: StringArray = ["Hello", "World"];
```

### 1.2 메서드 타입 정의하기

인터페이스에서 메서드 타입을 정의하는 방법은 다음과 같다

```typescript
interface Person {
    name: string;
    age: number;
    sayHello(): void;
}

const person: Person = {
    name: "박창조",
    age: 30,
    sayHello: () => {};
}
```

함수 타입 표현식 말고 다음과 같이 호출 시그니쳐를 이용해 메서드의 타입을 정의할 수도 있다.

```typescript
interface Person {
    name: string;
    age: number;
    sayHello(): void;
}
```

### 1.3 메서드 오버로딩

메서드 오버로딩을 이용해 메서드의 타입을 정의할 수도 있다.

- 함수 타입 표현식으로 메서드의 타입을 정의하면 메서드의 오버로딩 구현이 불가능

```typescript
interface Person {
  readonly name: string;
  age?: number;
  sayHi: () => void; 
  sayHi: (a: number, b: number) => void; // ❌
}
```

하지만, 호출 시그니쳐를 이용해 메서드의 타입을 정의하면 메서드의 오버로딩 구현이 가능하다.

```typescript
interface Person {
  readonly name: string;
  age?: number;
  sayHi(): void;
  sayHi(a: number): void;
  sayHi(a: number, b: number): void;
}
```

⚠️ 주의 할 점
타입 별칭에서는 다음과 같이 Union이나 Intersection 타입을 정의할 수 있었던 반면 인터페이스에서는 할 수 없다.

```typescript
// 타입 별칭
type Type1 = number | string;
type Type2 = number & string;

// 인터페이스
interface Person {
  name: string;
  age: number;
} | number // ❌
```

인터페이스로 만든 타입을 Union 또는 Intersection으로 이용해야 한다면 다음과 같이 타입 별칭과 함께 사용하거나 타입 주석에서 직접 사용해야 한다.

```typescript
type Type3 = Person | number;

const person: Type3 = {
  name: "박창조",
  age: 30 };
```

## 2. 인터페이스 확장
> _"하나의 인터페이스를 다른 인터페이스들이 **상속** 받아 중복된 프로퍼티를 정의하지 않도록 도와주는 문법"_

다음 아래와 같은 인터페이스가 있다고 하자.
```typescript
interface Person {
  name: string;
  age: number;
}

interface Developer {
  name: string;
  age: number;
  language: string;
}

```

이때 중복되는 프로퍼티를 제거하기 위해 다음과 같이 인터페이스를 확장할 수 있다.


```typescript
interface Person {
  name: string;
  age: number;
}

interface Developer extends Person {
  language: string;
}

const developer: Developer = {
  name: "박창조",
  age: 30,
  language: "TypeScript",
};
```

이렇게 확장하여 사용할 경우의 장점은 다음과 같아.
1. 중복되는 프로퍼티를 제거할 수 있다.
2. 타입 추론을 통해 타입을 명확하게 할 수 있다.
3. 인터페이스 확장을 통해 다형성을 구현할 수 있다.

### 2.1 타입 재정의 (오버라이딩)

인터페이스를 확장할 때 타입을 재정의하여 사용할 수 있다.

```typescript
interface Person {
  name: string;
  age: number;
}

interface Developer extends Person {
  name: '박창조';
  language: string;
}

```

한가지 주의할 점은 프로퍼티를 재 정의할 때 원본 타입을 A 재 정의된 타입을 B라고 하면 반드시 A가 B의 슈퍼 타입이 되도록 재정의 해야 한다.

### 2.2 타입 별칭을 확장하기

인터페이스는 인터페이스 뿐만 아니라 타입 별칭으로 정의된 객체도 확장할 수 있다.

```typescript
type Person = {
  name: string;
  age: number;
};

interface Developer extends Person {
  language: string;
}

```

### 2.3 다중 확장

인터페이스는 여러 개의 인터페이스를 확장할 수 있다.

```typescript
interface DogCat extends Dog, Cat {}

const dogCat: DogCat = {
  name: "",
  color: "",
  breed: "",
  isScratch: true,
};
```


