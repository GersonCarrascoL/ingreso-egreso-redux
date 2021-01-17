import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import Swal from 'sweetalert2';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { IngresoEgresoService } from '../ingreso-egreso.service';

@Component({
	selector: 'app-detalle',
	templateUrl: './detalle.component.html',
	styles: [
	]
})
export class DetalleComponent implements OnInit, OnDestroy {

	items: IngresoEgreso[];
	subscription: Subscription = new Subscription();

	constructor(
		private store: Store<AppState>,
		private ingresoEgresoService: IngresoEgresoService
	) { }

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	ngOnInit(): void {
		this.subscription = this.store.select('ingresoEgreso').subscribe(ingresoEgreso => {
			this.items = ingresoEgreso.items;
			console.log(ingresoEgreso.items);
			console.log(this.items)
		})
	}

	borrarItem(item: IngresoEgreso) {
		this.ingresoEgresoService.borrarIngresoEgreso(item.uid)
			.then(response => {
				Swal.fire('Eliminado', item.description, 'success');
			})
			.catch(error => {

			})
	}
}
