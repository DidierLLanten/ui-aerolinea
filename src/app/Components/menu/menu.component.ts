import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AsyncPipe, NgIf } from '@angular/common';
import { UserService } from 'src/app/Service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  private breakpointObserver = inject(BreakpointObserver);
  idUserActived: string = '';

  constructor(private service: UserService, private router: Router) {}

  ngOnInit(): void {
    console.log('user cargado: ');
    this.idUserActived = this.service.obtenerValueOfStorage('ID');

    // Suscríbete al observable del usuario activo
    this.service.idUserActived$.subscribe((id) => {
      this.idUserActived = id;
    });

    // Establece el valor inicial desde el storage
    const storedId = this.service.obtenerValueOfStorage('ID');
    if (storedId) {
      this.service.setUser(storedId); // Notifica el cambio si hay un ID almacenado
    }
  }

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  logout(): void {
    this.service.clearUser(); // Limpia el estado del usuario
    this.router.navigate(['']); // Redirige al usuario a la página de inicio de sesión
  }
}
