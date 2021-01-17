import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/internal/operators/filter';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/auth/auth.service';
import { IngresoEgresoService } from 'src/app/ingreso-egreso/ingreso-egreso.service';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styles: [
	]
})
export class SidebarComponent implements OnInit, OnDestroy {

	subscription: Subscription = new Subscription();
	name: string;

	constructor(
		private AuthService: AuthService,
		private store: Store<AppState>,
		public ingresoEgresoService: IngresoEgresoService
	) { }

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	ngOnInit(): void {
		this.subscription = this.store.select('auth')
			.pipe(
				filter(auth => auth.user != null)
			)
			.subscribe(auth => {
				this.name = auth.user.nombre;
			})
	}

	logOut() {
		this.AuthService.logOut();
		this.ingresoEgresoService.cancelarSubscriptions();
	}
}
