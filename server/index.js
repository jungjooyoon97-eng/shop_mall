import express from "express"
import mysql from "mysql2"

const app = express();
const PORT = 8000;

// mysql 연결 설정
const db = mysql.createConnection({
    host: "localhost",
    user: "jsuser",
    password: "pwjs",
    database: "jsdb"
});

// mysql dbms 에 연결
db.connect( (err) => {
    if (err){
        console.error("Database connection error", err);
        return; // 즉시종료
    }
    console.log("Database is connected");
    })


// 기본 라우터 설정
app.get('/', (req, res) => {
    res.send("<h1>API 서버와 DB 연동</h1>");
})

// 상품 목록 조회
// db.query(sql, 데이터, 콜백함수)
app.get("/api/products", (req, res) => {
    const sql = "SELECT* from product";
    db.query(sql, (err, results) => {
        if (err) {
            console.log("Product inquiry error!", err)
            res.send("Error occured while product inquiry!");
            return; // 바로 종료
        }
        res.json(results); //json 형태로 응답
    });
})

// 본문 요청 passing
app.use(express.json());

// 상품 등록
app.post("/api/products", (req, res) => {
    const {productName, price} = req.body; // 요청한 속성 데이터
    const sql = "INSERT INTO product(product_name, price) VALUES(?, ?)" // (?(값), ?) 는 동적 바인딩 -> 어떤 데이터타입이 들어올지 모를 때 사용
    db.query(sql, [productName, price], (err, results) => {
        if (err) {
            console.log("Product registration error!", err)
            res.send("Error occured while product inquiry!");
            return; // 바로 종료
        }
        res.send("Product is registrated successfully!"); //json 형태로 응답
    });
})


// 상품 상세보기 (1건)
// ex) http://localhost:8000/api/products/2
app.get("/api/products/:id", (req, res) => {
    const productId = req.params.id;
    const sql = "SELECT * FROM product WHERE id = ?";
    db.query(sql, [productId], (err, results) => {
        if (err){
            console.log("Product inquiry error!", err);
            res.send("Error occured while product inquiry!")
            return;
        }
        res.json(results[0]); // 1건 (맨 앞)
    })
})


// 상품 삭제
app.delete("/api/products/:id", (req, res) => {
    const productId = req.params.id;
    const sql = "DELETE FROM product WHERE id = ?";
    // db.query(sql, data, err funcion)
    db.query(sql, [productId], (err, results) => {
        if (err){
            console.log("Deletion error!");
            res.send("An error occured while trying to delete a query");
            return;
        }
        res.send("Product deletion was successful!");
    })
})


// 상품 수정
app.put("/api/products/:id", (req, res) => {
    // 수정하려면 이미 존재하는 상품이 필요 => 그레서 id 를 사용해 데이터에 접근
    const productId = req.params.id;

    // 수정된 data 받기
    const {productName, price} = req.body;
    const sql = "UPDATE product SET product_name = ?, price = ? WHERE id = ?";
    db.query(sql, [productName, price, productId], (err, results) => {
        if (err){
            // 500: code error, 404: no page, 200: successful
            console.log("Modification error!");
            res.status(501).send("An error occured while trying to modify a query");
            return;
        }
        res.send("Product modification was successful!")
    })
})

// 서버 실행
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})