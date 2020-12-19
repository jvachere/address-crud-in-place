import { OnDestroy, Component, Inject } from '@angular/core';
import { Subject, Observable, Subscription } from 'rxjs';
import { finalize, takeUntil, tap } from 'rxjs/operators';

@Component({template: ''})
export class BaseComponent implements OnDestroy {
  isLoading = false;
  error: string = null;
  protected destroy$ = new Subject();

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  baseSubscribe(observable: Observable<any>, callback: (response: any) => void): Subscription {
    this.isLoading = true;
    return observable.pipe(
      takeUntil(this.destroy$),
      finalize(() => this.isLoading = false)
    ).subscribe(response => callback(response),
      (error) => {
        this.error = JSON.stringify(error);
        console.log(this.error);
      });
  }
}
