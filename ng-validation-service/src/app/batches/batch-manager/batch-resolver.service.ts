import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Batch } from '../../shared/model/batch.model';
import { Observable, of, empty } from 'rxjs';
import { BatchesService } from '../batches.service';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Resolved } from 'src/app/shared/model/resolved.model';



@Injectable()
export class BatchResolver implements Resolve<Resolved<Batch>> {

  constructor(private batchesService: BatchesService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Resolved<Batch>> {
    let id = route.params['id'];

    if (isNaN(+id)) {
      console.log(`Retrieval of batch failed: id is not a number: ${id}`);
      return of({ data: null, errorMessage: 'Retrieval of batch failed: id is not a number: ' + id });
    }

    return this.batchesService.getBatchById(+id)
      .pipe(
        map(startPage => ({ data: startPage })),
        catchError(
          (error) => {
            console.log(`Retrieval of batch failed with error: ${error}`);
            return of({ data: null, errorMessage: 'Retrieval of batch failed', errorStatusCode: error.status });
          }
        )
      );
  }

}
