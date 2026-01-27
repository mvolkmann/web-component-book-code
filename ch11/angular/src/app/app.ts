import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import './hello-world.js';
import './radio-group.js';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class App {
  readonly initialColor = 'red';
  private helloWorldRef = viewChild<ElementRef>('helloWorldTag');

  ngAfterViewInit(): void {
    this.updateColor(this.initialColor);
  }

  handleChange(event: Event) {
    const color = (event as CustomEvent).detail.value;
    this.updateColor(color);
  }

  updateColor(color: string) {
    const el = this.helloWorldRef();
    if (el) el.nativeElement.style.color = color;
  }
}
