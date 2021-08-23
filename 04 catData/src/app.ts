import * as express from "express";
import { Cat, CatType } from "./app.model";

const app: express.Express = express();
const port: number = 8000;

// 이 미들웨어를 거치고 next함수로 라우터를 찾도록 함
// 미들웨어는 순서가 매우 중요!
app.use((req, res, next) => {
  console.log(req.rawHeaders[1]);
  console.log("로깅하는 미들웨어");
  next();
});

app.get("/cats/som", (req, res, next) => {
  console.log("som 미들웨어");
  next();
});

// 데이터 모킹이란?
// 테스트를 실행하기 위해, 실제 데이터가 아닌 개발자가 필요로하는 데이터를 만든는 것

app.get("/", (req: express.Request, res: express.Response) => {
  // console.log(req.rawHeaders[1]);
  res.send({ cats: Cat });
});

app.get("/cats/blue", (req, res) => {
  // console.log(req.rawHeaders[1]); // PostmanRuntime/7.28.2
  res.send({ blue: Cat[0] });
});

app.get("/cats/som", (req, res) => {
  // console.log(req.rawHeaders[1]);
  res.send({ som: Cat[1] });
});

// 에러 미들웨어
app.use((req, res, next) => {
  console.log("에러 미들웨어");
  res.send({ error: "404 not found error" });
});

app.listen(port, () => {
  console.log(`포트 사용중, http://localhost:${port}`);
});
