import { Component, Input, ElementRef, AfterViewInit, ViewChild } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss'],
})
export class WrapperComponent implements AfterViewInit {
  @Input() isLoading = false;

  @ViewChild('contentWrapper', { static: true }) contentWrapper: ElementRef;

  contentWidth: string;
  contentHeight: string;

  constructor() {}

  ngAfterViewInit() {
    const contentEl: HTMLElement | undefined = this.contentWrapper?.nativeElement;
    if (contentEl) {
      const rect = contentEl.getBoundingClientRect();
      this.contentWidth = rect.width + 'px';
      this.contentHeight = rect.height + 'px';
    }
  }
}
