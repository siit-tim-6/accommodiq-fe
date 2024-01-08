import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { RatingModule } from 'primeng/rating';
import { GalleriaModule } from 'primeng/galleria';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { DockModule } from 'primeng/dock';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { KeyFilterModule } from 'primeng/keyfilter';
import { InputNumberModule } from 'primeng/inputnumber';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToastModule } from 'primeng/toast';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TagModule } from 'primeng/tag';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [
    InputTextModule,
    ButtonModule,
    CalendarModule,
    RatingModule,
    GalleriaModule,
    DialogModule,
    CheckboxModule,
    FileUploadModule,
    DropdownModule,
    TableModule,
    DockModule,
    InputTextareaModule,
    OverlayPanelModule,
    KeyFilterModule,
    InputNumberModule,
    MultiSelectModule,
    ToastModule,
    RadioButtonModule,
    TagModule,
  ],
})
export class PrimengModule {}
