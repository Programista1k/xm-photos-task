import {Component, effect, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  protected readonly picturesLimit: WritableSignal<number> = signal(1)

  private readonly minTimeout: number = 200;
  private readonly maxTimeout: number = 300;

  public constructor() {
    effect(() => {
      if(this.picturesLimit() < 12) {
        this.addImageWithDelay();
      }
    }, { allowSignalWrites: true });
  }

  private addImageWithDelay(): void {
    setTimeout(() => {
      this.picturesLimit.update((v: number) => ++v);
    }, Math.floor(Math.random() * (this.maxTimeout - this.minTimeout + 1) + this.minTimeout));
  }
}
