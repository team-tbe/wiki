## Class와 Object

### Class

Object를 만들어 내기 위한 설계도 혹은 틀이다.
속성과 메서드를 포함할 수 있으며, new라는 키워드를 통해 객체를 생성할 수 있다. 또한, 상속을 통해 다른 클래스로부터 속성과 메서드를 상속받을 수 있다.

### Object

class에서 선언된 모양 그대로 생성되는 실체이다.
실제로 메모리에 할당된 데이터의 인스턴스이며, 클래스로부터 생성된다. 객체는 특정한 속성과 메서드를 가지게 된다.

```
class Person {
    // 생성자
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    postCount: 0;
    ...

    // 메서드
    addPostCount() {
        ...
    }
}

// object
const obj = new Person('martin', 99);
```

##### 알고는 있었지만 뭐라 표현해야 할지 몰라서 생성자가 있고 없고 차이라 답변해 버려 다시금 정리해 보았다.
