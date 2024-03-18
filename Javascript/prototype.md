## Prototype

객체지향 프로그래밍에서 객체간의 상속을 구현하기 위한 메커니즘이다. 모든 Javascript 객체는 prototype이라는 내부 속성을 가지고 있다. 이를 통해 다른 객체로부터 속성과 메서드를 상속받을 수 있다.

상속되는 속성과 메서드는 각 객체가 아니라 객체의 생성자의 prototype이라는 속성에 정의되어 있는 것.

### 프로토타입을 왜 쓸까?

프로토타입과 인스턴스 객체는 proto 프로퍼티를 가지고 있기 때문에 해당 프로퍼티를 통해 상위 프로토타입에 접근할 수 있다. 상위 프로토타입의 프로퍼티 및 메서드에 접근할 수 있어, 중복된 코드를 줄일 수 있고 재사용성을 높일 수 있다.

```
const user = function(name, age) {
    this.name = name;
    this.age = age;
}

// 프로토타입을 활용해서 메서드 추가
user.prototype.sayHello = function() {
    console.log('Hi, My name is ' + this.name);
}

const martin = new user('martin', 99);

martin.sayHello(); // Hi, My name is martin 출력
```
