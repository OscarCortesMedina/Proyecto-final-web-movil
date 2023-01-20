import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { RegistroMedicoService } from './registro-medico.service';

@Component({
  selector: 'app-registro-medico',
  templateUrl: './registro-medico.page.html',
  styleUrls: ['./registro-medico.page.scss'],
})
export class RegistroMedicoPage {

  registro: FormGroup;
  @ViewChild('inputFiles') inputFiles:any;
  file: any;

	constructor(
		private fb: FormBuilder,
		private alertController: AlertController,
		private router: Router,
		private loadingController: LoadingController,
		private registroMedicoService: RegistroMedicoService

	) {
    this.registro = this.fb.group({
		nombre: ['', [Validators.required, Validators.minLength(4),Validators.maxLength(60)]],
		email: ['', [Validators.required, Validators.email]],
      	nacionalidad: [null, [Validators.required]],
		especialidad: [null, [Validators.required]],
      	licenciaMedica: [null, [Validators.required]],
	    password: ['', [Validators.required, Validators.minLength(6),Validators.maxLength(24)]],
      	passwordConfirmation: ['', [Validators.required, Validators.minLength(6),Validators.maxLength(24)]],
		},
		{
		  validator: this.confirmedValidator('password', 'passwordConfirmation'),
		}
		);
  }

	async registrarse() {
		
		if (this.registro.invalid){
			Object.keys(this.registro.controls)
			.forEach(control=>{
				this.registro.get(control)?.markAllAsTouched();
			}
			)
		} else {
		const loading = await this.loadingController.create();
		await loading.present();
		this.registroMedicoService.registro(this.registro.value).subscribe(
			async (res) => {
				await loading.dismiss();
				this.router.navigateByUrl('/login', { replaceUrl: true });
			},
			async (res) => {
				await loading.dismiss();
				const alert = await this.alertController.create({
					header: 'Registro fallido',
					message: res.error.error,
					buttons: ['Aceptar']
				});
				await alert.present();
			}
		);
		}
	}

	async onFileChange($event:any){
		const { files } = $event.target;
		let message = 'Archivo ajuntado correctamente';
		if (files.length > 1){
			message = "Solo se puede adjuntar un archivo.";
		} else if (files[0].size === 0) {
			message = "Archivo corrupto o inválido";
		} else if (files[0].type !== 'application/pdf') {
			message = "El archivo tiene que tener extenxión PDF.";
		} else if (files.length ==1){
			this.file = files[0];
		}
		const alert = await this.alertController.create({
			header: 'Agregar licencia medica',
			message: message,
			buttons: ['Aceptar']
		});
		await alert.present();
	}

	attachFiles() {
		this.inputFiles.nativeElement.click();
	}

	get nombre() {
		return this.registro.get('nombre');
	}

	get email() {
		return this.registro.get('email');
	}

	get nacionalidad() {
		return this.registro.get('nacionalidad');
	}

	get especialidad() {
		return this.registro.get('especialidad');
	}

	get licenciaMedica() {
		return this.registro.get('licenciaMedica');
	}

	get password() {
		return this.registro.get('password');
	}

	get passwordConfirmation() {
		return this.registro.get('passwordConfirmation');
	}

	get nacionalidades(){
		return ["Afganistán","Albania","Alemania","Andorra","Angola","Antigua y Barbuda","Arabia Saudita","Argelia","Argentina","Armenia","Australia","Austria","Azerbaiyán","Bahamas","Bangladés","Barbados","Baréin","Bélgica","Belice","Benín","Bielorrusia","Birmania","Bolivia","Bosnia y Herzegovina","Botsuana","Brasil","Brunéi","Bulgaria","Burkina Faso","Burundi","Bután","Cabo Verde","Camboya","Camerún","Canadá","Catar","Chad","Chile","China","Chipre","Ciudad del Vaticano","Colombia","Comoras","Corea del Norte","Corea del Sur","Costa de Marfil","Costa Rica","Croacia","Cuba","Dinamarca","Dominica","Ecuador","Egipto","El Salvador","Emiratos Árabes Unidos","Eritrea","Eslovaquia","Eslovenia","España","Estados Unidos","Estonia","Etiopía","Filipinas","Finlandia","Fiyi","Francia","Gabón","Gambia","Georgia","Ghana","Granada","Grecia","Guatemala","Guyana","Guinea","Guinea ecuatorial","Guinea-Bisáu","Haití","Honduras","Hungría","India","Indonesia","Irak","Irán","Irlanda","Islandia","Islas Marshall","Islas Salomón","Israel","Italia","Jamaica","Japón","Jordania","Kazajistán","Kenia","Kirguistán","Kiribati","Kuwait","Laos","Lesoto","Letonia","Líbano","Liberia","Libia","Liechtenstein","Lituania","Luxemburgo","Madagascar","Malasia","Malaui","Maldivas","Malí","Malta","Marruecos","Mauricio","Mauritania","México","Micronesia","Moldavia","Mónaco","Mongolia","Montenegro","Mozambique","Namibia","Nauru","Nepal","Nicaragua","Níger","Nigeria","Noruega","Nueva Zelanda","Omán","Países Bajos","Pakistán","Palaos","Palestina","Panamá","Papúa Nueva Guinea","Paraguay","Perú","Polonia","Portugal","Reino Unido","República Centroafricana","República Checa","República de Macedonia","República del Congo","República Democrática del Congo","República Dominicana","República Sudafricana","Ruanda","Rumanía","Rusia","Samoa","San Cristóbal y Nieves","San Marino","San Vicente y las Granadinas","Santa Lucía","Santo Tomé y Príncipe","Senegal","Serbia","Seychelles","Sierra Leona","Singapur","Siria","Somalia","Sri Lanka","Suazilandia","Sudán","Sudán del Sur","Suecia","Suiza","Surinam","Tailandia","Tanzania","Tayikistán","Timor Oriental","Togo","Tonga","Trinidad y Tobago","Túnez","Turkmenistán","Turquía","Tuvalu","Ucrania","Uganda","Uruguay","Uzbekistán","Vanuatu","Venezuela","Vietnam","Yemen","Yibuti","Zambia","Zimbabue"]
	}

	get especialidades(){
		return [{id:1,value:'Dermatología pediátrica'},
		{id:2,value:'Adulto mayor'},
		{id:3,value:'Oncología'},
		{id:4,value:'Otra'}]
	}

	confirmedValidator(controlName: string, matchingControlName: string) {
		return (formGroup: FormGroup) => {
		  const control = formGroup.controls[controlName];
		  const matchingControl = formGroup.controls[matchingControlName];
		  if (
			matchingControl.errors &&
			!matchingControl.errors?.['confirmedValidator']
		  ) {
			return;
		  }
		  if (control.value !== matchingControl.value) {
			matchingControl.setErrors({ confirmedValidator: true });
		  } else {
			matchingControl.setErrors(null);
		  }
		};
	  }


}