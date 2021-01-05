import { ActionReducerMap } from '@ngrx/store';
import * as fromUI from '../app/shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';

export interface AppState {
	ui: fromUI.State;
	auth: fromAuth.AuthState;
}

export const appReducer: ActionReducerMap<AppState> = {
	ui: fromUI.UIReducer,
	auth: fromAuth.AuthReducer
};
