import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { HttpClientJsonpModule } from '@angular/common/http';

@NgModule({
  declarations: [MapComponent],
  imports: [CommonModule, GoogleMapsModule, HttpClientJsonpModule],
  exports: [MapComponent],
})
export class GmapsModule {}
