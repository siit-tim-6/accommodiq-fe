import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FinancialReportService } from '../financial-report.service';
import {
  FinancialReportEntry,
  FinancialReportIndividualEntry,
} from '../financial-report.model';
import { getTimestampMiliseconds } from '../../utils/date.utils';
import domToImage from 'dom-to-image';
import { jsPDF, jsPDFOptions } from 'jspdf';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-financial-report-list',
  templateUrl: './financial-report-list.component.html',
  styleUrl: './financial-report-list.component.css',
})
export class FinancialReportListComponent {
  entries: FinancialReportEntry[] = [];
  monthlyEntries: FinancialReportIndividualEntry[] = [];
  dateChangeTriggered = false;

  @ViewChild('dataToExport', { static: false }) elementToExport!: ElementRef;
  @ViewChild('chartsToExport', { static: false }) chartsToExport!: ElementRef;

  constructor(
    private service: FinancialReportService,
    private messageService: MessageService,
  ) {}

  handleDateChange(dateRange: Date[]) {
    this.dateChangeTriggered = true;
    this.service
      .getAllEntries(
        getTimestampMiliseconds(dateRange[0]),
        getTimestampMiliseconds(dateRange[1]),
      )
      .subscribe((entries) => {
        this.entries = entries;
      });
  }

  handleMonthlyEntriesChange(newEntries: FinancialReportIndividualEntry[]) {
    this.monthlyEntries = newEntries;
  }

  exportToPdf() {
    const dataWidth: number = this.elementToExport.nativeElement.clientWidth;
    const dataHeight: number =
      this.elementToExport.nativeElement.clientHeight + 40;
    const chartsWidth: number = this.chartsToExport.nativeElement.clientWidth;
    const chartsHeight: number =
      this.chartsToExport.nativeElement.clientHeight + 40;
    const pdfOptions: jsPDFOptions = {
      orientation: 'portrait',
      unit: 'pt',
      format: [dataWidth + 50, dataHeight + 220],
    };

    domToImage
      .toPng(this.elementToExport.nativeElement, {
        width: dataWidth,
        height: dataHeight,
      })
      .then((dataImage) => {
        console.log(dataImage);
        const pdf = new jsPDF(pdfOptions);
        const date = new Date();
        pdf.setTextColor('#000000');
        pdf.setFontSize(24);
        pdf.text('Date: ' + date.toUTCString(), 25, 75);
        pdf.addImage(dataImage, 'PNG', 25, 100, dataWidth, dataHeight);

        // domToImage
        //   .toPng(this.chartsToExport.nativeElement, {
        //     width: chartsWidth,
        //     height: chartsHeight,
        //   })
        //   .then((chartsImage) => {
        //     console.log(chartsImage);
        //     pdf.addPage();
        //     pdf.addImage(chartsImage, 'PNG', 25, 50, chartsWidth, chartsHeight);
        pdf.save(`financial-report-${getTimestampMiliseconds(date)}.pdf`);
        // })
        // .catch((error) => this.handleError(error));
      })
      .catch((error) => this.handleError(error));
  }

  private handleError(error: any) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: error,
    });
  }
}
