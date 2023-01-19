import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  registro: FormGroup;

	constructor(
		private fb: FormBuilder,
		private alertController: AlertController,
		private router: Router,
		private loadingController: LoadingController
	) {
    this.registro = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
      		nombre: ['', [Validators.required, Validators.minLength(4),Validators.maxLength(60)]],
      		edad: [null, [Validators.required, Validators.max(99),Validators.min(18)]],
      		residencia: ['', [Validators.required, Validators.email]],
      		perfilDematologico: [false, [Validators.required, Validators.requiredTrue]],
	  		password: ['', [Validators.required, Validators.minLength(6)]],
      		passwordConfirmation: ['123456', [Validators.required, Validators.minLength(6)]],
	  		terminosCondiciones: ['123456', [Validators.required, Validators.minLength(6)]]
		});
  }

	ngOnInit() {
		
	}

	async registrarse() {
		const loading = await this.loadingController.create();
		//await loading.present();

	}

	get email() {
		return this.registro.get('email');
	}


}
