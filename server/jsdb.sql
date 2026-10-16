use jsdb;

-- product 테이블 생성
CREATE TABLE product(
	-- 칼럼명 자료형
    id int AUTO_INCREMENT PRIMARY key, -- 숫자형 기본키
    product_name varchar(30) not null, -- 문자열 필수 입력
    price int not null,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- 날짜와 시간
); 


-- 상품 추가
INSERT INTO product(product_name, price) values ('무선마우스', 55000);
INSERT INTO product(product_name, price) values ('게이밍 키보드', 98000);

-- 상품 조회
SELECT * FROM product;

commit; -- 커밋 완료