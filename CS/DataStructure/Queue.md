## Queue

데이터의 삽입, 삭제에 특화되어 있는 자료구조로, 큐는 선입선출 구조로 되어 있다.

선입선출 : 먼저 삽입한 데이터가 먼저 나온다.

### 사용 예시

#### 프로세스 관리/대기열

운영체제에서 프로세스를 관리할 때 CPU를 할당받기 위해 대기하는 큐를 사용한다.

#### 너비 우선 탐색

그래프 탐색 알고리즘에서 인접한 노드를 우선으로 방문해야 할 때 큐를 사용한다.

#### 캐시

캐시 메모리에서 데이터를 저장하고 꺼낼 때, 가장 오래된 데이터를 먼저 삭제하는 정책을 구현할 때 큐를 사용한다.

#### 자바스크립트 구현

```js
class Queue {
  constructor() {
    this.storage = new Object();
    this.front = 0;
    this.rear = 0;
  }

  enqueue(element) {
    this.storage[this.rear++] = element;
  }

  dequeue() {
    const result = this.storage[this.front];
    delete this.storage[this.front++];

    return result;
  }
}

const queue = new Queue();
```
