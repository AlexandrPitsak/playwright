1. create docker image

```
docker build . --file Dockerfile -t demo
```

2. run docker container

```
docker run -it -d --name dockercontainer demo /bin/bash
```

3. Execute docker container (nav to doc container)

```
docker exec -it dockercontainer /bin/bash
```

4. Copy results (out of container)

```
docker cp dockercontainer:./tests/playwright-report ~/Pictures

```
