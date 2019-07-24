/*
 * Copyright (C) 2018 - present by OpenGamma Inc. and the OpenGamma group of companies
 *
 * Please see distribution for license.
 */

import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Observable, timer, Subject, of } from 'rxjs';
import { concatMap, map, filter, tap, takeUntil, flatMap, mergeMap } from 'rxjs/operators';
import { ImGrouping, Result } from './result.model';

/**
 * Enables calculations to be carried out.
 */
@Injectable()
export class CalculationService {
	stopCalculateSource = new Subject<boolean>();
	stopCalculateChange$ = this.stopCalculateSource.asObservable();

	requestedId = [];
	initialDelay = 500;
	interval = 2000;

	/**
	 * Returns the result of a long running calculation.
	 */
	calculate(): Observable<ImGrouping> {
		// call dataService.submitCalculation() to get an ID
		// call dataService.requestResult(id) until the result.status is 'SUCCESS'
		// return an observable which emits result.value
		// TODO implement this

		// call requestResult() only if we do not have the results for that request
		// avoid unnecessary requests
		const checkResult = (id: string) =>
			!this.isResponsedToRequest(id) ? this.dataService.requestResult(id) : of<Result>();

		// poll each 2s after the initial delay of 0.5s
		const trigger = (id: string) =>
			timer(this.initialDelay, this.interval).pipe(
				// get the inner response of requestResult()
				mergeMap(() =>
					// if we already have the response for this id avoid the API call => I am returning an empty observalbe<Result>
					checkResult(id).pipe(
						filter(res => res.status === 'SUCCESS'),
						tap(() => this.requestedId.push(id))
					)
				),
				// return just the value
				map(res => res.value),
				// stop timer => stop the requests
				takeUntil(this.stopCalculateChange$)
			);

		// I used concatMap to have the id when I start the timer the order is important to me
		return this.dataService.submitCalculation().pipe(concatMap(id => trigger(id)));
	}

	// check if we have the response for a request Id
	private isResponsedToRequest = (id: string): boolean =>
		this.requestedId.findIndex(el => el === id) === -1 ? false : true;

	// -------------------------------------------------------------------------
	constructor(private dataService: DataService) {}
}
