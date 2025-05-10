import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoQueryDto } from 'src/app/proxy/dtos/todo';

@Injectable({ providedIn: 'root' })
export class NavigatorService {
  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {}

  refresh<T>(newParams: T | null = null): void {
    let params = newParams ?? {};
    this.route.queryParams.subscribe(oldParams => {
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
