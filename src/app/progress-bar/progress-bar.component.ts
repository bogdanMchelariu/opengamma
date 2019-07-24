/*
 * Copyright (C) 2018 - present by OpenGamma Inc. and the OpenGamma group of companies
 *
 * Please see distribution for license.
 */

import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable, Subject, of, range, interval } from 'rxjs';
import { tap, concatMap, delay, map, startWith, switchMap, scan } from 'rxjs/operators';

/**
 * A progress bar which approximates the progress of several calculations.
 *
 * When completedParts and totalParts are equal, the progress bar will be 100% full.
 */
@Component({
	selector: 'og-progress-bar',
	templateUrl: './progress-bar.component.html',
	styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent {
	// -------------------------------------------------------------------------
	// DO NOT CHANGE THESE INPUTS.

	/** The total number of parts. */
	@Input() totalParts: number;

	/** The number of completed parts. */
	@Input() completedParts: number = 0;

	/** The number of completed parts. */
	@Input() context: 'TABLE' | 'OVERVIEW' = 'OVERVIEW';

	// -------------------------------------------------------------------------
	// TODO: Improve the code below

	/** Returns the number of requests completed, as a percentage of the number of total parts */
	getBarWidth = (): number => (this.completedParts === 0 ? 100.1 : (100 * this.completedParts) / this.totalParts);
}
