import { Directive, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { finalize, isObservable, firstValueFrom } from 'rxjs';

@Directive({
	selector: '[preventDoubleSubmit]',
	standalone: false
})
export class PreventDoubleSubmitDirective {
	private busy = false;

	@Input() preventDoubleSubmit!: () => Promise<any> | any;
	@Output() submitCompleted = new EventEmitter<void>();

	/** Disable button while request is in progress */
	@HostBinding('disabled')
	get disabled(): boolean {
		return this.busy;
	}

	@HostListener('click')
	async onClick(): Promise<void> {
		if (this.busy) return;

		this.busy = true;
		const unlock = () => setTimeout(() => (this.busy = false), 500);

		try {
			const result = this.preventDoubleSubmit?.();

			if (isObservable(result)) {
				await firstValueFrom(result.pipe(finalize(() => setTimeout(unlock))));
			} else if (result instanceof Promise) {
				await result;
				unlock();
			} else {
				unlock();
			}
		} catch (error) {
			this.busy = false;
			console.error('PreventDoubleSubmit error:', error);
		} finally {
			this.submitCompleted.emit();
		}
	}
}
