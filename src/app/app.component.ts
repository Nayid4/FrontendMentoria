import { Component, OnInit, WritableSignal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { LoadingComponent } from './pages/extras/loading/loading.component';
import { LoadingService } from './core/services/loading.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastModule, LoadingComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  cargandoInvitado!: WritableSignal<boolean>;

  constructor(private cargandoService: LoadingService) {}

  ngOnInit(): void {
    this.cargandoInvitado = this.cargandoService.loadingGuest;
  }
}
