package com.xiaoqi.service;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Iterator;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

public class Excel {

    public class Sheet{
        final org.apache.poi.ss.usermodel.Sheet sheet;
        final AtomicInteger rowNum = new AtomicInteger();

        public Sheet(org.apache.poi.ss.usermodel.Sheet sheet) {
            this.sheet = sheet;
        }

        public void write(List<? extends Object> values) {
            Row row = sheet.createRow(rowNum.getAndIncrement());
            final AtomicInteger colNum = new AtomicInteger();
            values.forEach(v -> setValue(row, colNum, v, style));
        }

        public void writeHeader(List<? extends Object> values) {
            Row row = sheet.createRow(rowNum.getAndIncrement());
            final AtomicInteger colNum = new AtomicInteger();
            values.forEach(v -> setValue(row, colNum, v, boldstyle));
        }
    }

    final Workbook workbook = new XSSFWorkbook();
    final CellStyle boldstyle;
    final CellStyle style;
    {
        final Font boldFont = workbook.createFont();
        boldFont.setFontName("Calibri");
        boldFont.setBold(true);
        boldstyle = workbook.createCellStyle();
        boldstyle.setFont(boldFont);

        final Font font = workbook.createFont();
        font.setFontName("Calibri");
        style = workbook.createCellStyle();
        style.setFont(font);
    }

    public Sheet createSheet(String name) {
        return new Sheet(workbook.createSheet(name));
    }

    private void setValue(Row row, AtomicInteger colNum, Object obj, CellStyle style) {
        Cell cell = row.createCell(colNum.getAndIncrement());
        cell.setCellStyle(style);
        if (obj instanceof LocalDate) {
            cell.setCellValue(DateTimeFormatter.ofPattern("yyyy-MM-dd").format((LocalDate) obj));
        } else if (obj instanceof String) {
            cell.setCellValue((String) obj);
        } else if (obj instanceof BigDecimal) {
            cell.setCellValue(((BigDecimal) obj).doubleValue());
        } else if (obj instanceof Integer) {
            cell.setCellValue(Double.valueOf(obj.toString()));
        }
    }

    public ResponseEntity<Resource> download() {
        ByteArrayOutputStream bos = null;
        try {
            bos = new ByteArrayOutputStream();
            autoSizeColumns(workbook);
            workbook.write(bos);
            workbook.close();
            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.add("Cache-Control", "no-cache, no-store, must-revalidate");
            httpHeaders.add("Pragma", "no-cache");
            httpHeaders.add("Expires", "0");
            httpHeaders.add("charset", "utf-8");
            Resource resource = new InputStreamResource(new ByteArrayInputStream(bos.toByteArray()));
            return ResponseEntity.ok().headers(httpHeaders).contentType(MediaType.parseMediaType("application/x-msdownload")).body(resource);
        } catch (IOException e) {
            if (null != bos) {
                try {
                    bos.close();
                } catch (IOException e1) {
                    e1.printStackTrace();
                }
            }
        }
        return null;
    }

    public void autoSizeColumns(Workbook workbook) {
        int numberOfSheets = workbook.getNumberOfSheets();
        for (int i = 0; i < numberOfSheets; i++) {
            org.apache.poi.ss.usermodel.Sheet sheet = workbook.getSheetAt(i);
            if (sheet.getPhysicalNumberOfRows() > 0) {
                Row row = sheet.getRow(0);
                Iterator<Cell> cellIterator = row.cellIterator();
                while (cellIterator.hasNext()) {
                    Cell cell = cellIterator.next();
                    int columnIndex = cell.getColumnIndex();
                    sheet.autoSizeColumn(columnIndex);
                }
            }
        }
    }


}
