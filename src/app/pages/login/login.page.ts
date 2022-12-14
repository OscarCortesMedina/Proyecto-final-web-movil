import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AppService } from 'src/app/config/app.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage  {

  credentials: FormGroup;
  isPhone = environment.phone;
	constructor(
		private fb: FormBuilder,
		private alertController: AlertController,
		private router: Router,
		private loadingController: LoadingController,
		private appService: AppService,
		private authService: AuthService
	) {
    this.credentials = this.fb.group({
			email: ['Test@test.com', [Validators.required, Validators.email]],
			password: ['123456', [Validators.required, Validators.minLength(6)]]
		});
		this.isPhone=this.appService.isPhone;
  }


	async login() {
		const loading = await this.loadingController.create();
		await loading.present();
		this.authService.login(this.credentials.value).subscribe(
			async (res) => {
				await loading.dismiss();
				this.router.navigateByUrl('/inicio', { replaceUrl: true });
			},
			async (res) => {
				await loading.dismiss();
				const alert = await this.alertController.create({
					header: 'Login fallido',
					message: res.error.error,
					buttons: ['Aceptar']
				});
				await alert.present();
			}
		);
	}

	get email() {
		return this.credentials.get('email');
	}

	get password() {
		return this.credentials.get('password');
	}
}
