import * as XLSX from 'xlsx';

import { Contact } from '../contacts/contact-list/contact.model';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ExportService {
  constructor() {}

  static toExportFileName(excelFileName: string): string {
    return `${excelFileName}_export_${new Date(
      Date.now()
    ).toLocaleDateString()}.xlsx`;
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data'],
    };
    XLSX.writeFile(workbook, ExportService.toExportFileName(excelFileName));
  }
  exportMultipleContacts(contacts: Contact[]) {
    this.exportAsExcelFile(contacts, `snapADDY_export_`);
  }
}
