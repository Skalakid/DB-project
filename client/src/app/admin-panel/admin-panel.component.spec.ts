import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPanelComponent } from './admin-panel.component';

describe('AdminPanelComponent', () => {
  let component: AdminPanelComponent;
  let fixture: ComponentFixture<AdminPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminPanelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  catchDataFromForm();
});

function catchDataFromForm() {
  document
    .getElementById('scooterForm')
    ?.addEventListener('submit', function (event: Event) {
      event.preventDefault();

      const modelId: string =
        (<HTMLInputElement>document.getElementById('modelId'))?.value || '';
      const batteryCode: string =
        (<HTMLInputElement>document.getElementById('batteryCode'))?.value || '';
      const latCords: string =
        (<HTMLInputElement>document.getElementById('latCords'))?.value || '';
      const lngCords: string =
        (<HTMLInputElement>document.getElementById('lngCords'))?.value || '';
      const status: string =
        (<HTMLInputElement>document.getElementById('status'))?.value || '';
      const energyLevel: string =
        (<HTMLInputElement>document.getElementById('energyLevel'))?.value || '';
      const costPerMinute: string =
        (<HTMLInputElement>document.getElementById('costPerMinute'))?.value ||
        '';
      const quantity: number =
        Number(
          (<HTMLSelectElement>document.getElementById('quantity'))?.value
        ) || 0;

      console.log(
        modelId,
        batteryCode,
        latCords,
        lngCords,
        status,
        energyLevel,
        costPerMinute,
        quantity
      );
    });
}
