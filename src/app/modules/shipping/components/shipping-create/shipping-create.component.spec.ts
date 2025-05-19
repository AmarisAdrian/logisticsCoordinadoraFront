import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingCreateComponent } from './shipping-create.component';

describe('ShippingCreateComponent', () => {
  let component: ShippingCreateComponent;
  let fixture: ComponentFixture<ShippingCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShippingCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShippingCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
