## Stack

데이터의 삽입, 삭제에 특화되어 있는 자료구조로, 스택은 후입선출 구조로 되어 있다.

후입선출 : 마지막에 넣은 데이터가 먼저 나온다.

### 사용 예시

#### 웹 브라우저 방문 기록, 실행 취소

뒤로 가기 기능을 구현할 때 스택으로 마지막 방문 페이지부터 제공한다.

#### 함수 호출의 Call Stack

### 자바스크립트 구현

```js
class Stack {
  constructor() {
    this.storage = new Object();
    this.size = 0;
  }

  push(element) {
    this.size++;
    this.storage[this.size] = element;
  }

  pop() {
    const result = this.storage[this.size];
    delete this.storage[this.size--];
    console.log(this.size);
    return result;
  }
}
```
