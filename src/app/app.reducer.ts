import { ActionReducerMap } from '@ngrx/store';
import * as fromUI from '../app/shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';
import * as fromIngresoEgreso from './ingreso-egreso/ingreso-egreso.reducer';

export interface AppState {
	ui: fromUI.State;
	auth: fromAuth.AuthState;
	ingresoEgreso: fromIngresoEgreso.IngresoEgresoState
}

export const appReducer: ActionReducerMap<AppState> = {
	ui: fromUI.UIReducer,
	auth: fromAuth.AuthReducer,
	ingresoEgreso: fromIngresoEgreso.ingresoEgresoReducer
};
