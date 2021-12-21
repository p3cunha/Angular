import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';
import { asyncScheduler, fromEvent, of, Subject } from 'rxjs';
import { delay, map, takeUntil, tap } from 'rxjs/operators';
import { CommonClass } from 'src/app/core/common-class';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteComponent extends CommonClass implements OnInit {
  @Input() list = [
    'carrot',
    'banana',
    'apple',
    'potato',
    'tomato',
    'cabbage',
    'turnip',
    'okra',
    'onion',
    'cherries',
    'plum',
    'mango',
  ];
  textTyped = '';
  listOpened$ = new Subject<boolean>();
  listOpened = false;
  showError = false;
  selectedIndex = -1;
  filteredList: string[] = [];
  clickOnList = false;

  constructor(private renderer: Renderer2) {
    super();
    fromEvent(document, 'click')
      .pipe(
        map((event) => (event.target as HTMLElement).tagName === 'LIST-ITEM'),
        tap((event) => (this.clickOnList = event)),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  ngAfterViewChecked(): void {
    console.log('checked');
  }

  ngOnInit() {
    this.filteredList = this.list;
    this.listOpened$.subscribe((state) => (this.listOpened = state));
  }

  // modifies the filtered list as per input
  getFilteredList() {
    this.listOpened$.next(true);
    // this.selectedIndex = 0;
    if (this.listOpened && this.textTyped !== undefined) {
      this.filteredList = this.list.filter((item) =>
        item.toLowerCase().startsWith(this.textTyped.toLowerCase())
      );
    }
  }

  setIndex(ind: number) {
    this.selectedIndex = ind;
  }

  // select highlighted item when enter is pressed or any item that is clicked
  selectItem(onClick: boolean) {
    setTimeout(() => {
      if (this.filteredList.includes(this.textTyped))
        this.textTyped = this.textTyped;
      if (!this.filteredList.includes(this.textTyped) && Boolean(onClick))
        this.textTyped = this.filteredList[this.selectedIndex];
      this.listOpened$.next(false);
    }, 100);
  }

  // navigate through the list of items
  onKeyPress(event: KeyboardEvent) {
    if (this.listOpened) {
      if (event.key === 'Escape') {
        this.setIndex(-1);
        this.renderer.selectRootElement('#autocomplete').blur();
      }
      if (event.key === 'Enter') {
        this.selectItem(true);
      }
      if (
        event.key !== 'ArrowDown' &&
        event.key !== 'ArrowUp' &&
        event.key !== 'Enter' &&
        event.key !== 'Escape'
      ) {
        this.selectedIndex = 0;
      }
      if (event.key === 'ArrowDown') {
        this.listOpened$.next(true);
        this.setIndex((this.selectedIndex + 1) % this.filteredList.length);
        if (this.filteredList.length && this.listOpened) {
          document
            .getElementsByTagName('list-item')
            [this.selectedIndex].scrollIntoView();
        }
      } else if (event.key === 'ArrowUp') {
        this.listOpened$.next(true);
        if (this.selectedIndex <= 0) {
          this.selectedIndex = this.filteredList.length;
        }
        this.selectedIndex =
          (this.selectedIndex - 1) % this.filteredList.length;

        if (this.filteredList.length > 0 && !this.listOpened) {
          document
            .getElementsByTagName('list-item')
            [this.selectedIndex].scrollIntoView();
        }
      }
    }
  }

  // show or hide the dropdown list when input is focused or moves out of focus
  toggleListDisplay(sender: 'close' | 'open') {
    const obs$ = of(sender);
    const listActions = {
      close: obs$.pipe(
        delay(100, asyncScheduler),
        tap(() => {
          this.clickOnList ? this.selectItem(true) : this.selectItem(false);
          this.listOpened$.next(false);
        })
      ),
      open: obs$.pipe(
        tap(() => (this.listOpened$.next(true), this.getFilteredList()))
      ),
    };
    listActions[sender].subscribe();
  }
}
