import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from '../auth.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styles: [
	]
})
export class RegisterComponent implements OnInit {

	cargando: boolean;
	subscription: Subscription = new Subscription();

	constructor(
		public authService: AuthService,
		public store: Store<AppState>
	) { }

	ngOnInit(): void {
		this.subscription = this.store.select('ui').subscribe(ui => {
			this.cargando = ui.isLoading;
		})
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	onSubmit(data: any) {
		this.authService.crearUsuaio(data.name, data.email, data.password);
	}
}
