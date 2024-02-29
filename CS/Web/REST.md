## REST

### 정의
**RE**presentational **S**tate **T**ransfer

자원 기반의 구조(ROA, Resource Oriented Architecture)설계에서 그 중심에 Resource가 있고 이 Resource를 처리 하기 위해서 HTTP Method를 활용하는 아키텍쳐

### 특징
#### Server-Client(서버-클라이언트 구조)
자원이 있는 쪽이 Server로 비즈니스 로직을 처리하고, 자원을 요청하는 쪽이 Client로 사용자 인증이나 컨텍스트(세션, 로그인 정보) 등을 관리한다. 그래서 서로 간의 의존성이 낮아진다.
#### Stateless(무상태)
Client의 컨텍스트를 Server에 저장하지 않고, 서버는 각각의 요청을 별개의 것으로 인식하고 처리한다.
#### Cacheable(캐시 처리 가능)
대량의 요청을 효율적으로 처리하기 위해 캐시 사용을 하여 전체 응답시간, 성능, 서버의 자원 이용률을 향상시킬 수 있다. HTTP의 Last-Modified 태그나 E-Tag를 이용하면 캐싱 구현이 가능하다.
#### Layered System(계층화)
API Server는 순수 비즈니스 로직을 수행하고 그 앞단에 보안, 로드밸런싱, 암호화, 사용자 인증 등을 계층화하여 추가하여 구조상의 유연성을 줄 수 있다.
#### Code-On-Demand(Optional)
Server로부터 스크립트를 받아서 Client에서 실행한다.
#### Uniform Interface(인터페이스 일관성)
URI로 지정한 Resource에 대한 조작을 통일되고 한정적인 인터페이스로 수행하고 HTTP 표준 프로토콜에 따르는 모든 플랫폼에서 사용이 가능하다.

## REST API
### 구성
- 자원(Resource): URI
- 행위(Verb): Method (GET,POST,PUT,PATCH,DELETE 등)
- 표현(Representation): 서버가 보내는 응답 (JSON,XML 등)

### REST API 설계 원칙
1. URI는 정보의 자원을 표현해야 한다.
2. 자원에 대한 행위는 HTTP Method(GET, PUT, POST, DELETE 등)로 표현한다.
3. 슬래시 구분자(/)는 계층 관계를 나타내는데 사용한다.
4. URI 마지막 문자로 슬래시(/)를 포함하지 않는다.
5. 하이픈(-)은 URI 가독성을 높이는데 사용한다.
6. 밑줄(_)은 URI에 사용하지 않는다.
7. URI 경로에는 소문자가 적합하다.
8. 파일확장자는 URI에 포함하지 않는다.
9. 리소스 간에는 연관 관계가 있는 경우
    - /리소스명/리소스ID/관계가 있는 다른 리소스명 (일반적으로 소유의 관계를 표현할 때)
    - `GET` /users/{userid}/devices

## RESTful
REST의 특징을 모두 가지고 있어야하고 Uniform interface의 특징이 특히 지켜져야 한다.
- 자원은 유일하게 식별 가능해야 한다.
- HTTP Method로 표현을 담아야 한다.
- 메세지는 스스로를 설명해야 한다(self-descriptive).
- 하이퍼링크를 통해 애플리케이션의 상태가 전이(HATEOAS) 되어야 한다.

## HATEOAS
Hypermedia as the engine of Application State

애플리케이션의 상태를 나타내는 엔진으로 Hypermedia 즉, **링크**를 사용한다. 요청에 대한 응답에 요청 이후 Client가 다음에 요청할 요청들에 대한 URI까지 함께 전달해주는 것이다. 이러한 URI를 통해서 클라이언트는 애플리케이션의 상태를 다음 요청으로 전이시킬 수 있게 된다. 참고로, REST 아키텍처를 만든 Roy Fielding은 이것이 지켜지지 않은 API라면 RESTful이라는 단어를 쓰지 말라고 했다고 한다.
### 응답 예시
```text
HTTP/1.1 200 OK

{
  "account": {
    "account_number": 12345,
    "balance": {
      "currency": "usd",
      "value": 100.00
    },
    "links": {
      "deposits": "/accounts/12345/deposits",
      "withdrawals": "/accounts/12345/withdrawals",
      "transfers": "/accounts/12345/transfers",
      "close-requests": "/accounts/12345/close-requests"
    }
  }
}
```