import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IngresoEgreso } from './ingreso-egreso.model';
import { IngresoEgresoService } from './ingreso-egreso.service';
import Swal from 'sweetalert2';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.actions';

@Component({
	selector: 'app-ingreso-egreso',
	templateUrl: './ingreso-egreso.component.html',
	styles: [
	]
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
	form: FormGroup;
	type: string = 'ingreso';
	loadingSubs: Subscription = new Subscription();
	cargando: boolean;

	constructor(
		private formBuilder: FormBuilder,
		public ingresoEgresoService: IngresoEgresoService,
		private store: Store<AppState>
	) { }

	ngOnInit(): void {
		this.store.select('ui').subscribe(ui => {
			this.cargando = ui.isLoading;
		})
		this.createForm();
	}

	ngOnDestroy(): void {
		this.loadingSubs.unsubscribe();
	}

	createForm() {
		this.form = this.formBuilder.group({
			description: ['', [Validators.required]],
			ammount: [0, [Validators.required, Validators.min(0)]]
		})
	}

	createIngresoEgreso() {
		this.store.dispatch(new ActivarLoadingAction());
		const ingresoEgreso = new IngresoEgreso({ ...this.form.value, type: this.type });
		this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso)
			.then(resp => {
				this.store.dispatch(new DesactivarLoadingAction());
				Swal.fire('Creado', ingresoEgreso.description, 'success');
				this.form.reset({
					ammount: 0
				})
			})
			.catch(error => {
				this.store.dispatch(new DesactivarLoadingAction());
				console.log(error)
			})
	}
}
