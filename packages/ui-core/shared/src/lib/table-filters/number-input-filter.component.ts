import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs/internal/Subscription';
import { DefaultFilter } from 'angular2-smart-table';
import { CustomFilterConfig } from '@gauzy/contracts';

@Component({
	selector: 'ga-number-input-filter-selector',
	template: `
		<input type="number" [formControl]="inputControl" class="form-control" [placeholder]="column.title" />
	`,
	standalone: false
})
export class NumberInputFilterComponent extends DefaultFilter implements OnInit, OnDestroy, OnChanges {
	public inputControl = new FormControl<number | null>(null);
	private subscription: Subscription;

	constructor() {
		super();
	}

	ngOnInit() {
		const config = this.column?.filter?.config as CustomFilterConfig;

		if (typeof config?.initialValueInput === 'number') {
			this.inputControl.setValue(config.initialValueInput, { emitEvent: false });
		}

		this.subscription = this.inputControl.valueChanges
			.pipe(
				debounceTime(this.debounceTime),
				distinctUntilChanged(),
				tap((value: number | null) => {
					// angular2-smart-table expects string or null
					this.column.filterFunction(value !== null ? Number(value) : null, this.column.id);
				})
			)
			.subscribe();
	}

	ngOnChanges(changes: SimpleChanges) {
		// Required for angular2-smart-table
	}

	ngOnDestroy() {
		this.subscription?.unsubscribe();
	}
}
