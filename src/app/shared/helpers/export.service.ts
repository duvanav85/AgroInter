import { Injectable } from '@angular/core';
import * as ExcelJS from 'exceljs';
//Enums
import { ExportFormats } from "../enums/exportFormat.enum";

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor() { }

  async export(filename: string, format: string, columns: string[], data: any[]): Promise<void> {
    switch(format) {
      case ExportFormats.EXCEL:
        await this.exportExcel(filename, columns, data);
        break;
      default:
        return;
    }
  }

  private async exportExcel(filename: string, columns: string[], data: any[]): Promise<void> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet 1');

    worksheet.addRow(columns);

    const statusIndex = columns.indexOf('Estado');

    if (statusIndex !== -1) {
        data.forEach(row => {
            const mappedRow = [...row];
            if (typeof mappedRow[statusIndex] === 'boolean') {
                mappedRow[statusIndex] = mappedRow[statusIndex] ? 'Activo' : 'Inactivo';
            }
            worksheet.addRow(mappedRow);
        });
    } else {
        data.forEach(row => {
            worksheet.addRow(row);
        });
    }

    const buffer = await workbook.xlsx.writeBuffer();
    this.saveAsFile(buffer, filename, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  }

  private saveAsFile(buffer: ArrayBuffer, filename: string, mimeType: string): void {
    const data: Blob = new Blob([buffer], { type: mimeType });
    const downloadLink: HTMLAnchorElement = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(data);
    downloadLink.download = filename;
    downloadLink.click();
  }
}
