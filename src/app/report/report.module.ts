import { NgModule } from '@angular/core';
import { ReportCardComponent } from './report-card/report-card.component';
import { ReportCardListComponent } from './report-card-list/report-card-list.component';
import { PrimengModule } from '../infrastructure/primeng/primeng.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ReportCardComponent, ReportCardListComponent],
  imports: [PrimengModule, RouterModule],
  exports: [ReportCardComponent, ReportCardListComponent],
})
export class ReportModule {}
