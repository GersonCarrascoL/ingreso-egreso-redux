import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styles: [
	]
})
export class RegisterComponent implements OnInit {

	constructor(
		public authService: AuthService
	) { }

	ngOnInit(): void {
	}

	onSubmit(data: any) {
		this.authService.crearUsuaio(data.name, data.email, data.password);
	}
}
