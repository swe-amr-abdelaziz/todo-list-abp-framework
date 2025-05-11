import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoQueryDto } from 'src/app/proxy/dtos/todo';
import { AsyncComponent } from '../classes/async-component.interface';
import { takeUntil } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NavigatorService extends AsyncComponent {
  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {
    super();
  }

  refresh<T>(newParams: T | null = null): void {
    let params = newParams ?? {};
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe(oldParams => {
      params = { ...oldParams, ...newParams };
    });
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { ...params },
      queryParamsHandling: 'merge',
    });
  }

  get todoQueryParams(): TodoQueryDto {
    return this.route.snapshot.queryParams;
  }
}
