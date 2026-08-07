-- CreateTable
CREATE TABLE "STUDENT_SCORE" (
    "SoBaoDanh" VARCHAR(8) NOT NULL,
    "DiemToan" DECIMAL(4,2),
    "NguVan" DECIMAL(4,2),
    "NgoaiNgu" DECIMAL(4,2),
    "VatLi" DECIMAL(4,2),
    "HoaHoc" DECIMAL(4,2),
    "SinhHoc" DECIMAL(4,2),
    "LichSu" DECIMAL(4,2),
    "DiaLi" DECIMAL(4,2),
    "GDCD" DECIMAL(4,2),
    "MaNgoaiNgu" TEXT,

    CONSTRAINT "STUDENT_SCORE_pkey" PRIMARY KEY ("SoBaoDanh")
);
