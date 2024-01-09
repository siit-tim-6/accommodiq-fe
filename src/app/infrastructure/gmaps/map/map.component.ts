import { Component, Input, OnInit } from '@angular/core';
import { GmapsService } from '../gmaps.service';
import { Marker } from '../gmaps.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent implements OnInit {
  @Input() width!: string;
  @Input() zoom!: number;
  @Input() markers!: Marker[];

  apiLoaded: boolean = false;

  constructor(private gmaps: GmapsService) {}

  ngOnInit(): void {
    this.gmaps.apiLoaded$.subscribe((loaded) => {
      if (!loaded) {
        this.gmaps.loadMaps();
      }
      this.apiLoaded = loaded;
    });
  }
}
