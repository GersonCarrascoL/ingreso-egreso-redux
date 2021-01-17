import { Action } from "@ngrx/store";
import { IngresoEgreso } from "./ingreso-egreso.model";

export const SET_ITEMS = '[INGRESO-EGRESO] Set item';
export const UNSET_ITEMS = '[INGRESO-EGRESO] Unset item';

export class SetItemsActions implements Action {
	readonly type = SET_ITEMS;

	constructor(public items: IngresoEgreso[]) { }
}

export class UnsetItemsActions implements Action {
	readonly type = UNSET_ITEMS;
}

export type acciones = SetItemsActions | UnsetItemsActions;
