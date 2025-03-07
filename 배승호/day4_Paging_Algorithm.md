## 1. LRU 방식

-   캐시 히트를 높이기 위한 페이지 교체 방식 중 등장한 기법
-   LRU(Least Recently Used)는 메모리 관리 기법 중 하나로, 캐시 메모리에서 가장 오랫동안 사용되지 않은 데이터를 교체하는 알고리즘이다.
-   메모리의 제한된 공간에서 새로운 데이터가 들어올 때, 가장 오래 사용되지 않은 데이터를 제거하여 새로운 데이터를 저장하는 방식이다.

### 1-1. LRU가 높은 hit율을 보이는 상황

-   최근에 접근된 page는 곧 또 접근될 것이다! 라는 아이디어에 근간한다.
-   데이터의 참조 패턴에 시간적 지역성(temporal locality)이 있을 경우 높은 hit율을 보인다.

![80-20.png](https://github.com/16th-Operating-System-study/operating-system/blob/master/week3_virtual_memory/img/KimJiMin/80-20.png?raw=true)

![workload.jpg](https://github.com/16th-Operating-System-study/operating-system/blob/master/week3_virtual_memory/img/KimJiMin/workload.jpg?raw=true)

#### 80-20 workload 에서 나타나는 지역성

-   시간적 지역성
    -   20%의 자주 참조되는 데이터(Hot Page)가 반복적으로 사용될 가능성이 높다. 최근에 사용된 데이터가 가까운 시점에 다시 사용될 확률이 높으므로 시간적 지역성이 있다.
-   공간적 지역성
    -   만약, 20%의 데이터가 일정한 공간 안에 분포해 있는 경우라면 해당 공간 내의 인접 데이터들이 참조될 가능성이 높아지므로 공간적 지역성도 있을 것이다.

### 1-2. LRU의 문제점

-   구현의 복잡성: LRU는 각 데이터의 사용 시간을 추적하고, 가장 오래된 데이터를 빠르게 찾기 위해 복잡한 자료 구조를 사용해야 한다.
-   높은 오버헤드: 모든 데이터에 대한 참조가 일어날 때마다 데이터 사용 기록을 갱신해야 하므로 오버헤드를 주의해야 한다.
-   쓰레싱 발생 가능성: 참조 패턴이 시간적 지역성을 따르지 않을 경우, 빈번한 캐시 교체가 일어나 쓰레싱 발생 가능성이 있다.

#### (1) 반복순차적 접근에서 캐시 크기가 작을 때

-   Looping-Sequential Workload 에서 0~49 page까지 순차적으로 50개의 page를 참조하는 것을 반복하는 상황
-   캐시의 크기가 50을 넘어가게 되면 모든 정책에서 hit가 100%로 나타난다.
-   하지만, 캐시 크기가 50 미만일 때는 LRU, FIFO가 모두 최악의 경우인 hit율 0%를 보인다.
-   하지만 Random 방식은 축출되는 페이지가 랜덤이기 때문에 이러한 경우에 성능이 괜찮다.

![looping_sequential.png](https://github.com/16th-Operating-System-study/operating-system/blob/master/week3_virtual_memory/img/KimJiMin/looping_sequential.png?raw=true)

-   캐시 크기가 작을 때 계속 miss가 나는 아찔한 상황이 발생,,,,

#### (2) 완전히 전체 영역을 랜덤하게 접근할 때

-   정책에 관계 없이 일정하게 Hit 확률이 늘어난다.
-   복잡한 LRU의 이점을 전혀 누릴 수 없다.

![no_locality.png](https://github.com/16th-Operating-System-study/operating-system/blob/master/week3_virtual_memory/img/KimJiMin/no_locality.png?raw=true)

## 2. Approximate LRU 방식

-   위에서 설명한 구현의 복잡성, 여러 가지 추가 작업 필요, 높은 오버헤드 등의 단점이 있었다.
-   특히, 메모리 크기가 커져서 page 수가 많아지면 LRU 페이지를 찾는데 소요되는 시간이 너무 커지므로 또 다른 문제가 발생한다.
-   이러한 문제를 보완할 수 있는 것이 Approximate LRU와 Clock 알고리즘이다.
-   완벽하게 LRU 순서를 유지하지 않고, 대략적으로 안 쓰이는 page를 교체 대상으로 삼아서 성능을 개선하는 방법이다.

### 2-1. 동작 방식

1. 각 페이지에 대해 참조 비트(Reference Bit)를 두고, 페이지가 참조될 때마다 해당 비트를 1로 설정한다.
2. 페이지 교체가 필요할 때는, 시계의 초침처럼 페이지들을 순차적으로 검사한다.
3. 참조 비트가 0인 페이지를 교체 대상으로 선택한다.
4. 만약, 검사한 페이지의 비트가 1이라면, 그 페이지에 다시 기회를 주기 위해 비트를 0으로 설정하고 다음 페이지를 검사한다.

![clock.png](https://github.com/16th-Operating-System-study/operating-system/blob/master/week3_virtual_memory/img/KimJiMin/clock.png?raw=true)

---

참고 자료

-   https://icksw.tistory.com/153
-   [페이지 교체 정책](https://icksw.tistory.com/153)
-   [참조 지역성 관련 정의](https://twojun-space.tistory.com/62)
-   [Clock 알고리즘](https://rannnneey.tistory.com/entry/%EC%9A%B4%EC%98%81%EC%B2%B4%EC%A0%9C-Virtual-memory-4-Paging-System%EC%97%90%EC%84%9C-LRU-LFU-Clock-Algorithm)
