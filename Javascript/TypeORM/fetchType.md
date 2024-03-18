### TypeORM 질문

- TypeORM을 사용하셨는데 Fetch Type은 어떤 걸로 사용하셨나요?

<b>답변</b> : Fetch Type을 지정하지 않고 작업했다.

### Fetch Type이란?

데이터를 가지고 오는 방식을 정의하는 옵션이다.

## 종류

- eager fetch
  - 연관된 엔티티를 함께 로드해 즉시 사용할 수 있도록 하는 방식. 기본적으로 연관된 엔티티가 즉시 로드되어 추가 쿼리를 실행하지 않지만 이로 인해 데이터베이스에서 불필요한 데이터를 불러 올 수 있다.
- lazy fetch
  - 연관된 엔티티를 필요할 때만 로드하는 방식. 연관된 엔티티에 접근할 때마다 추가 쿼리를 실행하여 필요한 경우에만 데이터를 가지고 온다. 이로 인해 불필요한 데이터를 미리 불러 오지 않아 성능을 최적화된다.

### TypeORM은 Fetch Type을 지정하지 않으면 적용되지 않는다.

#### Fetch Type을 지정하는 방법

```
@OneToMany((type) => Board, (Board) => Board.user, {
    eager: true
    lazy: true
})
board: Board[];
```

#### Eager Fetch

```
    async findOne(userIdx: number): Promise<User> {
        return await this.usersRepository.findOne(userIdx);
    }
```

##### Eager 특징

- TypeORM에서는 위와 같이 모든 값을 다 가지고 오고 싶다면 leftJoinAndSelect를 사용하면 된다.
- Entity의 Eager Loading 설정은 find 메서드를 사용할 때만 적용된다.
- Eager 설정은 하나의 Entity에서만 설정이 가능하다. 서로의 데이터를 가지고 오는 무한 참조 현상으로 에러가 발생한다.
- 초기 로딩 시간이 길다. 불필요한 데이터들이 조회된다.
- 연관이 많은 Entity는 join이 많이 발생해 성능 저하가 일어날 수 있다.

#### Lazy Fetch

```
    async findOne(userIdx: number): Promise<User> {
        const users: User = await this.usersRepository.findOne(1);
        const boards: Board[] = await users.board;   // Board 데이터를 요청
        return users;
    }
```

###### Lazy 특징

- Eager Loading은 join이 걸리더라도 쿼리 한 번으로 명령을 수행하지만 Lazy Loading은 추가적인 조회 쿼리가 발생한다.
- 초기 로딩 시간을 줄일 수 있다.
- 자원 소비가 Eager Loading에 비해 적게 든다.
