import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AppService } from 'src/app/config/app.service';

@Component({
  selector: 'app-perfil-dermatologico',
  templateUrl: './perfil-dermatologico.page.html',
  styleUrls: ['./perfil-dermatologico.page.scss'],
})
export class PerfilDermatologicoPage implements OnInit {

  perfilDermatologico: FormGroup;

	constructor(
		private fb: FormBuilder,
		private alertController: AlertController,
		private router: Router,
		private loadingController: LoadingController,
		private modalCtrl: ModalController,
		public app: AppService
	) {
    this.perfilDermatologico = this.fb.group({
		colorOjos: [null, [Validators.required]],
		colorCabello: [null, [Validators.required]],
		colorPiel: [null, [Validators.required]],
		cantidadPecas: [null, [Validators.required]],
		exposicionAlSol: [null, [Validators.required]],
		bronceadoConElSol: [null, [Validators.required]],
		cantidadBronceado: [null, [Validators.required]],
		sensibilidadDeCaraConSol: [null, [Validators.required]],
		frecuenciaBronceo: [null, [Validators.required]],
		ultimaExposicion: [null, [Validators.required]]
		});
  }

	ngOnInit() {
		
	}

	cancel() {
		return this.modalCtrl.dismiss(null, 'cancel');
	}
	
	escoger(perfilDematologico:string) {
		return this.modalCtrl.dismiss(perfilDematologico, 'escoger');
	}

	async verificar() {
		if (this.perfilDermatologico.invalid){
			Object.keys(this.perfilDermatologico.controls)
			.forEach(control=>{
				this.perfilDermatologico.get(control)?.markAllAsTouched();
			}
			);
		}else {
			this.escoger(this.perfilDermatologico.value);
		}
	}

	get colorOjos() {
		return this.perfilDermatologico.get('colorOjos');
	}

	get colorCabello() {
		return this.perfilDermatologico.get('colorCabello');
	}

	get colorPiel() {
		return this.perfilDermatologico.get('colorPiel');
	}

	get cantidadPecas() {
		return this.perfilDermatologico.get('cantidadPecas');
	}

	get exposicionAlSol() {
		return this.perfilDermatologico.get('exposicionAlSol');
	}

	get bronceadoConElSol() {
		return this.perfilDermatologico.get('bronceadoConElSol');
	}

	get cantidadBronceado() {
		return this.perfilDermatologico.get('cantidadBronceado');
	}

	get sensibilidadDeCaraConSol() {
		return this.perfilDermatologico.get('sensibilidadDeCaraConSol');
	}

	get frecuenciaBronceo() {
		return this.perfilDermatologico.get('frecuenciaBronceo');
	}

	get ultimaExposicion() {
		return this.perfilDermatologico.get('ultimaExposicion');
	}
}