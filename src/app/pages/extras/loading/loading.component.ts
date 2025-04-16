import { Component, OnInit, WritableSignal } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LoadingService } from '../../../core/services/loading.service';

@Component({
  selector: 'app-loading',
  imports: [
    ProgressSpinnerModule
  ],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css'
})
export class LoadingComponent implements OnInit {

  cargando!: WritableSignal<boolean>;
  cargandoInvitado!: WritableSignal<boolean>;

  constructor(private cargandoService: LoadingService) { }

  ngOnInit(): void {
    this.cargando = this.cargandoService.loading;
    this.cargandoInvitado = this.cargandoService.loadingGuest;
  }
}
