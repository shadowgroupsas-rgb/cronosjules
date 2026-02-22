import { Injectable } from '@nestjs/common';
import * as PdfPrinter from 'pdfmake';
import * as ExcelJS from 'exceljs';
import { Response } from 'express';

@Injectable()
export class ReportsService {

  async generatePdf(res: Response) {
    const fonts = {
      Helvetica: {
        normal: 'Helvetica',
        bold: 'Helvetica-Bold',
        italics: 'Helvetica-Oblique',
        bolditalics: 'Helvetica-BoldOblique',
      },
    };

    // @ts-ignore
    const printer = new PdfPrinter(fonts);

    const docDefinition = {
      content: [
        { text: 'CRONOS - Reporte de Horas Extras', style: 'header' },
        { text: `Generado el: ${new Date().toLocaleString()}`, style: 'subheader' },
        { text: '\n' },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto'],
            body: [
              ['Empleado', 'Fecha', 'Duración', 'Estado'],
              ['Juan Pérez', '20/05/2026', '4.5h', 'Aprobado'],
              ['Maria Garcia', '19/05/2026', '2.0h', 'Pendiente'],
            ],
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
        subheader: {
          fontSize: 12,
          italics: true,
        },
      },
      defaultStyle: {
        font: 'Helvetica',
      },
    };

    const pdfDoc = printer.createPdfKitDocument(docDefinition);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=report.pdf');

    pdfDoc.pipe(res);
    pdfDoc.end();
  }

  async generateExcel(res: Response) {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Horas Extras');

    sheet.columns = [
      { header: 'Empleado', key: 'name', width: 30 },
      { header: 'Fecha', key: 'date', width: 15 },
      { header: 'Duración (h)', key: 'hours', width: 15 },
      { header: 'Estado', key: 'status', width: 15 },
    ];

    sheet.addRow({ name: 'Juan Pérez', date: '2026-05-20', hours: 4.5, status: 'Aprobado' });
    sheet.addRow({ name: 'Maria Garcia', date: '2026-05-19', hours: 2.0, status: 'Pendiente' });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=report.xlsx');

    await workbook.xlsx.write(res);
    res.end();
  }
}
