# ✨ Typescript Generics ✨

## ✨ 제네릭(Generics)이란? ✨

> 제네릭은 함수, 클래스, 또는 인터페이스에서 **데이터 타입을 특정하지 않고**, 사용할 때(런타임에) 결정할 수 있도록 하는 기능

- 코드 작성 시 타입을 고정하지 않고 다양한 타입을 받을 수 있도록 합
- 코드의 재사용성이 높아지고 타입 안정성을 보장할 수 있음

## 1️⃣ 기본적인 제네릭 함수 (Basic Generic Functions)

일반적인 함수는 특정 타입을 고정해야 합니다.

```ts
function identity(value: number): number {
  return value;
}
```

이렇게 하면 `number` 타입만 받을 수 있어 재사용성이 떨어집니다.

하지만, 제네릭을 사용하면 다양한 타입을 받을 수 있도록 만들 수 있습니다.

```ts
function identity<T>(value: T): T {
  return value;
}

console.log(identity<number>(10)); // 10
console.log(identity<string>("Hello")); // "Hello"
console.log(identity<boolean>(true)); // true
```

위 예제에서 `identity<number>(10)` 처럼 사용하면 `T`가 `number`로 결정되고,
`identity<string>("Hello")`를 사용하면 `T`가 `string`으로 설정됩니다.

## 2️⃣ 제네릭 인터페이스 (Generic Interfaces)

`interface`에서도 제네릭을 사용할 수 있습니다.

```ts
interface Box<T> {
  value: T;
}

const numberBox: Box<number> = { value: 100 };
const stringBox: Box<string> = { value: "TypeScript" };

console.log(numberBox.value); // 100
console.log(stringBox.value); // "TypeScript"
```

이렇게 하면 `Box` 인터페이스는 `string` 타입만 받을 수 있어 재사용성이 떨어집니다.

하지만, 제네릭을 사용하면 다양한 타입을 받을 수 있도록 만들 수 있습니다.

## 3️⃣ 제네릭 클래스 (Generic Classes)

클래스에서도 제네릭을 사용할 수 있습니다.

```ts
class Container<T> {
  private content: T;

  constructor(value: T) {
    this.content = value;
  }

  getContent(): T {
    return this.content;
  }
}

const numberContainer = new Container<number>(123);
const stringContainer = new Container<string>("Hello");

console.log(numberContainer.getContent()); // 123
console.log(stringContainer.getContent()); // "Hello"
```

## 4️⃣ 제네릭 배열과 여러 타입 (Generic Array and Multiple Types)

제네릭을 사용하여 타입이 고정된 배열을 만들 수도 있습니다.

```ts
function getFirstElement<T>(arr: T[]): T {
  return arr[0];
}

console.log(getFirstElement<number>([1, 2, 3])); // 1
console.log(getFirstElement<string>(["A", "B", "C"])); // "A"
```

제네릭을 여러 개 사용하여 더 유연하게 만들 수도 있습니다.

```ts
function pair<T, U>(a: T, b: U): [T, U] {
  return [a, b];
}

console.log(pair<number, string>(10, "TypeScript")); // [10, "TypeScript"]
console.log(pair<boolean, string>(true, "Hello")); // [true, "Hello"]
```

## 5️⃣ 제네릭 제한 (Generic Constraints)

- 아무 타입이나 다 받을 수 있게 하면 타입 안정성이 떨어질 수도 있습니다.
- 이럴 때 **제약(Constraints)**을 사용하면 타입 안정성을 보장할 수 있습니다.

```ts
function printLength<T extends { length: number }>(item: T): void {
  console.log(item.length);
}

printLength("Hello"); // 5
printLength([1, 2, 3]); // 3
// printLength(10);  // ❌ 오류! number에는 length 속성이 없음
```

## 정리

- 제네릭은 함수, 클래스, 또는 인터페이스에서 데이터 타입을 특정하지 않고, 사용할 때(런타임에) 결정할 수 있도록 하는 기능
- 코드 작성 시 타입을 고정하지 않고 다양한 타입을 받을 수 있도록 합
- 코드의 재사용성이 높아지고 타입 안정성을 보장할 수 있음

## 제네릭을 사용하면 얻을 수 있는 장점?

✔️ 코드의 재사용성 증가
✔️ 타입 안정성 유지
✔️ 유연성 있는 프로그래밍 가능
