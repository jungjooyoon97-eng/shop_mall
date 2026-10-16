### mysql -jsdb
CREATE TABLE product(<br>
	-- 칼럼명 자료형
    id int AUTO_INCREMENT PRIMARY key, -- 숫자형 기본키<br>
    product_name varchar(30) not null, -- 문자열 필수 입력<br>
    price int not null,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- 날짜와 시간
    <br>
); 