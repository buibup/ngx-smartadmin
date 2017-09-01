import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { TabItemComponent } from './tab-item.component';

@Component({
  selector: 'sa-tabset',
  templateUrl: 'tabset.component.html'
})
export class TabsetComponent implements OnInit, AfterViewInit, OnChanges {
  private _currentTabItem: TabItemComponent;
  public tabItems: TabItemComponent[] = [];


  @Input()
  private selected: string;

  @Output()
  private selectedChange = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.selected) {
      this._processSelectedChange(this.selected);
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this._setTabItemsName();
      this._processSelectedChange(this.selected);
    });
  }

  public setActiveItem(tabItem: TabItemComponent) {
    if (this._currentTabItem === tabItem) {
      return;
    }
    if (this._currentTabItem) {
      this._currentTabItem.active = false;
    }
    this._currentTabItem = tabItem;
    this._currentTabItem.active = true;
    this.selectedChange.emit(this._currentTabItem.innerName);
  }

  private _processSelectedChange(name: string) {
    let findTabItem = this.tabItems.find(x => x.innerName === name) || this.tabItems[0];
    if (findTabItem) {
      this.setActiveItem(findTabItem);
    }
  }

  private _setTabItemsName() {
    this.tabItems.forEach((item: TabItemComponent, idx: number) => {
      if (!item.innerName) {
        item.innerName = `tabpane-${idx}`;
      }
    });
  }
}
