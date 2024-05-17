CREATE TABLE DANHMUC (
   ID_DM VARCHAR(10) PRIMARY KEY NOT NULL,
   TEN_DM VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
);

CREATE TABLE SANPHAM (
   ID_SP VARCHAR(10) PRIMARY KEY NOT NULL, 
   TEN_SP VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
   ID_DM VARCHAR(10) NOT NULL,
   GIA INT NOT NULL,
   HINHANH VARCHAR(100) NULL,
   MO_TA VARCHAR(5000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
   FOREIGN KEY (ID_DM) REFERENCES DANHMUC(ID_DM)
);

CREATE TABLE NGUOIDUNG (
   ID_ND VARCHAR(10) PRIMARY KEY NOT NULL,
   HO_TEN VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
   EMAIL VARCHAR(30) UNIQUE NOT NULL,
   SDT VARCHAR(10) UNIQUE NOT NULL,
   DIACHI VARCHAR(5000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
   MATKHAU VARCHAR(100) NOT NULL
);

CREATE TABLE DATHANG (
   ID_DH INT AUTO_INCREMENT PRIMARY KEY,
   NGAY_DAT_HANG DATETIME NOT NULL,
   TRANG_THAI VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
);

CREATE TABLE CHITIETDONHANG (
   ID_ND VARCHAR(10) NOT NULL,
   ID_DH INT NOT NULL,
   ID_SP VARCHAR(10) NOT NULL,
   SO_LUONG VARCHAR(10) NOT NULL,
   DON_GIA VARCHAR(10) NOT NULL,
   CONSTRAINT PK_CHITIETDONHANG PRIMARY KEY (ID_ND, ID_DH, ID_SP),
   FOREIGN KEY (ID_DH) REFERENCES DATHANG(ID_DH),
   FOREIGN KEY (ID_SP) REFERENCES SANPHAM(ID_SP),
   FOREIGN KEY (ID_ND) REFERENCES NGUOIDUNG(ID_ND)
);

CREATE TABLE THANHTOAN (
   ID_TT INT AUTO_INCREMENT PRIMARY KEY,
   ID_DH INT NOT NULL,
   HINH_THUC_TT VARCHAR(100) NOT NULL,
   NGAY_TT DATETIME NOT NULL,
   TRANG_THAI_TT VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
   FOREIGN KEY (ID_DH) REFERENCES DATHANG(ID_DH)
);

CREATE TABLE PHANHOI (
   ID_PH INT AUTO_INCREMENT PRIMARY KEY,
   ID_ND VARCHAR(10) NOT NULL,
   NOI_DUNG VARCHAR(5000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
   NGAY_GUI DATETIME NOT NULL,
   FOREIGN KEY (ID_ND) REFERENCES NGUOIDUNG(ID_ND)
);


INSERT INTO DANHMUC (ID_DM, TEN_DM)
VALUES
  ('bestseller', 'BEST SELLER'),
  ('trasua', 'TRÀ SỮA'),
  ('tratraicay', 'TRÀ TRÁI CÂY'),
  ('topping', 'TOPPING');

-- Thêm dữ liệu mẫu vào bảng SANPHAM
INSERT INTO SANPHAM (ID_SP, TEN_SP, ID_DM, GIA, HINHANH, MO_TA) 
VALUES
('BS001', 'Trà cam đào', 'bestseller', 20000, '', 'Trà hòa quyện với hương cam và đào tươi mát'),
('BS002', 'Trà việt quất', 'bestseller', 20000, '', 'Trà thơm ngon kết hợp với vị chua ngọt của việt quất'),
('BS003', 'Trà trái cây', 'bestseller', 20000, '', 'Trà pha trộn với nhiều loại trái cây tươi ngon'),
('BS004', 'Trà dâu tây', 'bestseller', 20000, '', 'Trà thanh mát với hương vị ngọt ngào của dâu tây'),
('BS005', 'Trà Kiwi', 'bestseller', 20000, '', 'Trà mát lạnh kết hợp với hương vị chua ngọt của kiwi'),
('BS006', 'Trà chanh', 'bestseller', 20000, '', 'Trà truyền thống với hương vị chanh tươi mát'),
('BS007', 'Trà sữa hoàng kim', 'bestseller', 20000, '', 'Trà sữa thơm ngon với trân châu hoàng kim đặc biệt'),
('BS008', 'Trà thái xanh', 'bestseller', 20000, '', 'Trà thái xanh truyền thống với vị béo ngậy'),
('BS009', 'Trà sữa trân châu đường đen', 'bestseller', 20000, '', 'Trà sữa kết hợp với trân châu và đường đen đặc biệt'),
('BS010', 'Matcha đá xay kem', 'bestseller', 20000, '', 'Matcha đá xay với kem tươi mát lạnh'),
('BS011', 'Trà sữa thái xanh kem', 'bestseller', 20000, '', 'Trà sữa thái xanh kết hợp với kem tươi béo ngậy'),
('BS012', 'Dâu đá xay kem', 'bestseller', 20000, '', 'Dâu tây đá xay kết hợp với kem tươi ngọt ngào'),
('TS001', 'Trà sữa hoàng kim', 'trasua', 20000, '', 'Trà sữa thơm ngon với trân châu hoàng kim đặc biệt'),
('TS002', 'Trà thái xanh', 'trasua', 20000, '', 'Trà thái xanh truyền thống với vị béo ngậy'),
('TS003', 'Trà sữa trân châu đường đen', 'trasua', 20000, '', 'Trà sữa kết hợp với trân châu và đường đen đặc biệt'),
('TS004', 'Matcha đá xay kem', 'trasua', 20000, '', 'Matcha đá xay với kem tươi mát lạnh'),
('TS005', 'Trà sữa thái xanh kem', 'trasua', 20000, '', 'Trà sữa thái xanh kết hợp với kem tươi béo ngậy'),
('TS006', 'Dâu đá xay kem', 'trasua', 20000, '', 'Dâu tây đá xay kết hợp với kem tươi ngọt ngào'),
('TTC001', 'Trà cam đào', 'tratraicay', 20000, '', 'Trà hòa quyện với hương cam và đào tươi mát'),
('TTC002', 'Trà việt quất', 'tratraicay', 20000, '', 'Trà thơm ngon kết hợp với vị chua ngọt của việt quất'),
('TTC003', 'Trà trái cây', 'tratraicay', 20000, '', 'Trà pha trộn với nhiều loại trái cây tươi ngon'),
('TTC004', 'Trà dâu tây', 'tratraicay', 20000, '', 'Trà thanh mát với hương vị ngọt ngào của dâu tây'),
('TTC005', 'Trà Kiwi', 'tratraicay', 20000, '', 'Trà mát lạnh kết hợp với hương vị chua ngọt của kiwi'),
('TTC006', 'Trà chanh', 'tratraicay', 20000, '', 'Trà truyền thống với hương vị chanh tươi mát'),
('TP00', 'Sương sáo', 'topping', 5000, '', 'Sương sáo dai giòn, mang đến cảm giác sảng khoái khi nhai. Thích hợp làm topping cho trà sữa và các món tráng miệng'),
('TP002', 'Pudding', 'topping', 5000, '', 'Pudding mềm mịn, vị ngọt thanh, hòa quyện hoàn hảo với trà sữa và các loại đồ uống khác');


-- Thêm dữ liệu mẫu vào bảng NGUOIDUNG
INSERT INTO NGUOIDUNG (ID_ND, HO_TEN, EMAIL, SDT, DIACHI, MATKHAU) VALUES
('ND001', 'Nguyễn Văn A', 'nva@example.com', '0909123456', '123 Đường ABC, Quận 1, TP HCM', '@Matkhau123'),
('ND002', 'Trần Thị B', 'ttb@example.com', '0909654321', '456 Đường DEF, Quận 2, TP HCM', '@Matkhau123');

-- Thêm dữ liệu mẫu vào bảng DATHANG
INSERT INTO DATHANG (NGAY_DAT_HANG, TRANG_THAI) VALUES
('2024-05-15 14:30:00', 'chờ xác nhận'),
('2024-05-16 10:00:00', 'đang xử lý');

-- Thêm dữ liệu mẫu vào bảng CHITIETDONHANG
INSERT INTO CHITIETDONHANG (ID_ND, ID_DH, ID_SP, SO_LUONG, DON_GIA) VALUES
('ND001', 1, 'SP001', '2', '20000'),
('ND001', 1, 'SP002', '1', '5000'),
('ND002', 2, 'SP003', '3', '20000');

-- Thêm dữ liệu mẫu vào bảng THANHTOAN
INSERT INTO THANHTOAN (ID_DH, HINH_THUC_TT, NGAY_TT, TRANG_THAI_TT) VALUES
(1, 'tiền mặt', '2024-05-15 15:00:00', 'đã thanh toán'),
(2, 'chuyển khoản', '2024-05-16 10:30:00', 'đã thanh toán');

-- Thêm dữ liệu mẫu vào bảng PHANHOI
INSERT INTO PHANHOI (ID_ND, NOI_DUNG, NGAY_GUI) VALUES
('ND001', 'Trà sữa ngon, phục vụ tốt.', '2024-05-15 16:00:00'),
('ND002', 'Khoai tây chiên giòn, rất ngon.', '2024-05-16 11:00:00');

