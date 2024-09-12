import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-load-generic-list',
  templateUrl: './load-generic-list.component.html',
  styleUrls: ['./load-generic-list.component.css'],
})
export class LoadGenericListComponent {
  @Input()
  load: any;
  @Input()
  listado: any;
  @Input()
  listadoVacio: any;
}
