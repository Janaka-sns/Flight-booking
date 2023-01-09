import { Component, OnInit, Input, Output, EventEmitter, Renderer2, ElementRef, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { faTimes  } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'popup-layouts',
  templateUrl: './popup-layouts.component.html',
  styleUrls: ['./popup-layouts.component.scss'],
  animations: [
    trigger('TranslateYIn', [
      transition(':enter', [
        style({ opacity: '0', transform: 'translateY(100%)' }),
        animate(
          '0.5s 0s ease',
          style({ opacity: '1', transform: ' translateY(0rem)' })
        ),
      ]),
      transition(':leave', [
        style({ opacity: '1' }),
        animate(
          '0.5s 0s ease',
          style({ opacity: '0', transform: ' translateY(100%)' })
        ),
      ]),
    ]),
  ],
})
export class PopupLayoutsComponent implements OnInit, OnChanges {
  @Input()
  isShow: boolean = false;

  @Output()
  isShowChange : EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input()
  closePopup: boolean = false;

  @Output()
  closePopupChange : EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild('overlay')
  private overlayElementRef: ElementRef = undefined!;

  @ViewChild('Container')
  private containerElementRef: ElementRef = undefined!;

  closeIcon = faTimes;

  private startClientY: number = 0;
  private startClientX: number = 0;
  private isMoving: boolean = false;
  private moveDirection: "UP" | "DOWN" | "LEFT" | "RIGHT" = undefined!;

  constructor(
    private renderer: Renderer2,
  ) {}

  ngOnInit() {
  }

  ngOnChanges(change : SimpleChanges) {

    if (change.closePopup.currentValue) {
      this.onCloseHandler();
    }

  }

  onCloseHandler() {
    this.isShow = false;
    setTimeout(() => {
      this.closePopupChange.emit(false);
      this.isShowChange.emit(this.isShow)
    }, 500);
  }

  onTouchStart(event: TouchEvent) {
    this.isMoving = false;
    this.startClientY = event.touches[0].clientY;
    this.startClientX = event.touches[0].clientX;
    this.renderer.removeClass(this.overlayElementRef.nativeElement, 'translateTop');
  }

  onTouchEnd(event: TouchEvent) {
    this.isMoving = false;
    if (!this.renderer) {
      return;
    }
    this.renderer.addClass(this.overlayElementRef.nativeElement, 'translateTop');
    setTimeout(() => {
      if (this.renderer && this.overlayElementRef) {
        this.renderer.removeClass(this.overlayElementRef.nativeElement, 'translateTop');
        this.renderer.setStyle(this.overlayElementRef.nativeElement, 'transform', "translateY(0px)");
      }
    }, 450);
  }

  onTouchMove(event: TouchEvent) {
    this.getMoveDirection(event);

    switch (this.moveDirection) {
      case "UP":
        break;
      case "DOWN":
        const touchClientY: number = event.changedTouches[0].clientY;
        if (this.containerElementRef.nativeElement.scrollTop == 0) {
          this.renderer.setStyle(this.overlayElementRef.nativeElement, 'transform', "translateY(" + ((this.startClientY - touchClientY) * -1) + "px)");
          if ((100 / this.containerElementRef.nativeElement.clientHeight) * (this.containerElementRef.nativeElement.clientHeight - (this.startClientY - touchClientY) * -1) < 40) {
            this.onCloseHandler()
          }
        }
        break;
      default:
        break;
    }
  }

  private getMoveDirection(event: TouchEvent): "UP" | "DOWN" | "LEFT" | "RIGHT" | undefined{
    if (this.isMoving) {
      return;
    }

    const touchClientY: number = event.changedTouches[0].clientY;
    const touchClientX: number = event.changedTouches[0].clientX;

    if (Math.abs(this.startClientY - touchClientY) > Math.abs(this.startClientX - touchClientX)) {
      if (this.startClientY > touchClientY) {
        this.moveDirection = "UP";
      } else {
        this.moveDirection = "DOWN";
      }
    } else {
      if (this.startClientX > touchClientX) {
        this.moveDirection = "LEFT";
      } else {
        this.moveDirection = "RIGHT";
      }
    }
    this.isMoving = true;
    return this.moveDirection;
  }
}
