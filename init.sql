SET NAMES 'utf8';

CREATE TABLE IF NOT EXISTS DANHMUC (
   ID_DM VARCHAR(10) PRIMARY KEY NOT NULL,
   TEN_DM VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS SANPHAM (
   ID_SP VARCHAR(10) PRIMARY KEY NOT NULL, 
   TEN_SP VARCHAR(100),
   ID_DM VARCHAR(10) NOT NULL,
   GIA INT NOT NULL,
   HINHANH VARCHAR(100) NULL,
   MO_TA VARCHAR(5000),
   FOREIGN KEY (ID_DM) REFERENCES DANHMUC(ID_DM)
);

CREATE TABLE IF NOT EXISTS NGUOIDUNG (
   EMAIL VARCHAR(30) PRIMARY KEY NOT NULL,
   HO_TEN VARCHAR(100) NOT NULL,
   SDT VARCHAR(10) UNIQUE NOT NULL,
   DIACHI VARCHAR(5000),
   MATKHAU VARCHAR(100) NOT NULL,
   NGAY_DANG_KY DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
   RESET_PASSWORD_TOKEN VARCHAR(255),
   RESET_PASSWORD_EXPIRE BIGINT
);

CREATE TABLE IF NOT EXISTS DATHANG (
   ID_DH INT AUTO_INCREMENT PRIMARY KEY,
   EMAIL VARCHAR(30) NOT NULL,
   NGAY_DAT_HANG DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
   TRANGTHAI ENUM('DA_DAT', 'DA_THANH_TOAN') DEFAULT 'DA_DAT',
   FOREIGN KEY (EMAIL) REFERENCES NGUOIDUNG(EMAIL)
);

CREATE TABLE IF NOT EXISTS CHITIETDONHANG (
   ID_DH INT NOT NULL,
   ID_SP VARCHAR(10) NOT NULL,
   SO_LUONG INT NOT NULL,
   GIA INT NOT NULL,
   CONSTRAINT PK_CHITIETDONHANG PRIMARY KEY (ID_DH, ID_SP),
   FOREIGN KEY (ID_DH) REFERENCES DATHANG(ID_DH),
   FOREIGN KEY (ID_SP) REFERENCES SANPHAM(ID_SP)
);

CREATE TABLE IF NOT EXISTS THANHTOAN (
   ID_TT INT AUTO_INCREMENT PRIMARY KEY,
   ID_DH INT NOT NULL,
   EMAIL VARCHAR(30) NOT NULL,
   HINH_THUC_TT VARCHAR(100) NOT NULL,
   NGAY_TT DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
   TONG_TIEN INT NOT NULL,
   FOREIGN KEY (ID_DH) REFERENCES DATHANG(ID_DH),
   FOREIGN KEY (EMAIL) REFERENCES NGUOIDUNG(EMAIL)
);


CREATE TABLE IF NOT EXISTS LIENHE (
   ID_PH INT AUTO_INCREMENT PRIMARY KEY,
   HO_TEN VARCHAR(100) NOT NULL,
   EMAIL VARCHAR(30) NOT NULL,
   SDT VARCHAR(10) UNIQUE NOT NULL,
   THE_LOAI VARCHAR(100) NOT NULL,
   NOI_DUNG VARCHAR(5000) NOT NULL,
   NGAY_GUI DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
   FOREIGN KEY (EMAIL) REFERENCES NGUOIDUNG(EMAIL)
);

-- Thêm dữ liệu mẫu vào bảng DANHMUC
INSERT INTO DANHMUC (ID_DM, TEN_DM)
VALUES
  ('bestseller', 'BEST SELLER'),
  ('trasua', 'TRÀ SỮA'),
  ('tratraicay', 'TRÀ TRÁI CÂY'),
  ('topping', 'TOPPING');

-- Thêm dữ liệu mẫu vào bảng SANPHAM
INSERT INTO SANPHAM (ID_SP, TEN_SP, ID_DM, GIA, HINHANH, MO_TA) 
VALUES
('BS001', 'Trà cam đào', 'bestseller', 20000, '/img/tracamdao.png', 'Trà hòa quyện với hương cam và đào tươi mát'),
('BS002', 'Trà việt quất', 'bestseller', 20000, '/img/travietquat.png', 'Trà thơm ngon kết hợp với vị chua ngọt của việt quất'),
('BS003', 'Trà trái cây', 'bestseller', 20000, '/img/tratraicay.png', 'Trà pha trộn với nhiều loại trái cây tươi ngon'),
('BS004', 'Trà dâu tây', 'bestseller', 20000, '/img/tradautay.png', 'Trà thanh mát với hương vị ngọt ngào của dâu tây'),
('BS005', 'Trà Kiwi', 'bestseller', 20000, '/img/trakiwi.png', 'Trà mát lạnh kết hợp với hương vị chua ngọt của kiwi'),
('BS006', 'Trà chanh', 'bestseller', 20000, '/img/trachanh.png', 'Trà truyền thống với hương vị chanh tươi mát'),
('BS007', 'Trà sữa hoàng kim', 'bestseller', 20000, '/img/trasuahoangkim.png', 'Trà sữa thơm ngon với trân châu hoàng kim đặc biệt'),
('BS008', 'Trà thái xanh', 'bestseller', 20000, '/img/trathaixanh.png', 'Trà thái xanh truyền thống với vị béo ngậy'),
('BS009', 'Trà sữa trân châu đường đen', 'bestseller', 20000, '/img/trasuatrantrauduongden.png', 'Trà sữa kết hợp với trân châu và đường đen đặc biệt'),
('BS010', 'Matcha đá xay kem', 'bestseller', 20000, '/img/machadaxaykem.png', 'Matcha đá xay với kem tươi mát lạnh'),
('BS011', 'Trà sữa thái xanh kem', 'bestseller', 20000, '/img/trasuathaixanhkem.png', 'Trà sữa thái xanh kết hợp với kem tươi béo ngậy'),
('BS012', 'Dâu đá xay kem', 'bestseller', 20000, '/img/daudaxaykem.png', 'Dâu tây đá xay kết hợp với kem tươi ngọt ngào'),
('TS001', 'Trà sữa hoàng kim', 'trasua', 20000, '/img/trasuahoangkim.png', 'Trà sữa thơm ngon với trân châu hoàng kim đặc biệt'),
('TS002', 'Trà thái xanh', 'trasua', 20000, '/img/trathaixanh.png', 'Trà thái xanh truyền thống với vị béo ngậy'),
('TS003', 'Trà sữa trân châu đường đen', 'trasua', 20000, '/img/trasuatrantrauduongden.png', 'Trà sữa kết hợp với trân châu và đường đen đặc biệt'),
('TS004', 'Matcha đá xay kem', 'trasua', 20000, '/img/machadaxaykem.png', 'Matcha đá xay với kem tươi mát lạnh'),
('TS005', 'Trà sữa thái xanh kem', 'trasua', 20000, '/img/trasuathaixanhkem.png', 'Trà sữa thái xanh kết hợp với kem tươi béo ngậy'),
('TS006', 'Dâu đá xay kem', 'trasua', 20000, '/img/daudaxaykem.png', 'Dâu tây đá xay kết hợp với kem tươi ngọt ngào'),
('TTC001', 'Trà cam đào', 'tratraicay', 20000, '/img/tracamdao.png', 'Trà hòa quyện với hương cam và đào tươi mát'),
('TTC002', 'Trà việt quất', 'tratraicay', 20000, '/img/travietquat.png', 'Trà thơm ngon kết hợp với vị chua ngọt của việt quất'),
('TTC003', 'Trà trái cây', 'tratraicay', 20000, '/img/tratraicay.png', 'Trà pha trộn với nhiều loại trái cây tươi ngon'),
('TTC004', 'Trà dâu tây', 'tratraicay', 20000, '/img/tradautay.png', 'Trà thanh mát với hương vị ngọt ngào của dâu tây'),
('TTC005', 'Trà Kiwi', 'tratraicay', 20000, '/img/trakiwi.png', 'Trà mát lạnh kết hợp với hương vị chua ngọt của kiwi'),
('TTC006', 'Trà chanh', 'tratraicay', 20000, '/img/trachanh.png', 'Trà truyền thống với hương vị chanh tươi mát'),
('TP00', 'Sương sáo', 'topping', 5000, '/img/suongsao.png', 'Sương sáo dai giòn, mang đến cảm giác sảng khoái khi nhai. Thích hợp làm topping cho trà sữa và các món tráng miệng'),
('TP002', 'Pudding', 'topping', 5000, '/img/pudding.png', 'Pudding mềm mịn, vị ngọt thanh, hòa quyện hoàn hảo với trà sữa và các loại đồ uống khác');

-- Thêm dữ liệu mẫu vào bảng NGUOIDUNG
--INSERT INTO NGUOIDUNG (EMAIL, HO_TEN, SDT, DIACHI, MATKHAU) VALUES
--('nguyennhu3570@gmail.com', 'Nguyễn Thị Huỳnh Như', '0357104009', 'Ô Chích A, Lương Hòa, Châu Thành, Trà Vinh', '123'),
--('nguyenhoai@gmail.com', 'Nguyễn Văn Hoài', '0329206026', 'Ô Chích B, Lương Hòa, Châu Thành, Trà Vinh', '123');

-- Thêm dữ liệu mẫu vào bảng DATHANG
--INSERT INTO DATHANG (EMAIL) VALUES
--('nguyennhu3570@gmail.com'),
--('nguyenhoai@gmail.com');

-- Thêm dữ liệu mẫu vào bảng CHITIETDONHANG
--INSERT INTO CHITIETDONHANG (ID_DH, ID_SP, SO_LUONG, GIA) VALUES
--('1', 'TS001', 1, '20000'),
--('1', 'TS002', 1, '5000'),
--('1', 'TS003', 1, '20000');

-- Thêm dữ liệu mẫu vào bảng THANHTOAN
--INSERT INTO THANHTOAN (ID_DH, HINH_THUC_TT, NGAY_TT, TRANG_THAI_TT) VALUES
--(1, 'tiền mặt', '2024-05-15 15:00:00', 'đã thanh toán'),
--(2, 'chuyển khoản', '2024-05-16 10:30:00', 'đã thanh toán');

-- Thêm dữ liệu mẫu vào bảng PHANHOI
--INSERT INTO PHANHOI (EMAIL, NOI_DUNG, NGAY_GUI) VALUES
--('ND001', 'Trà sữa ngon, phục vụ tốt.', '2024-05-15 16:00:00'),
--('ND002', 'Khoai tây chiên giòn, rất ngon.', '2024-05-16 11:00:00');


