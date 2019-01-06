import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsInCategoryComponent } from './items-in-category.component';

describe('ItemsInCategoryComponent', () => {
  let component: ItemsInCategoryComponent;
  let fixture: ComponentFixture<ItemsInCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemsInCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsInCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
