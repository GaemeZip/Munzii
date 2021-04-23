import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';
import { IonicModule } from '@ionic/angular';

import { MemoPage } from './memo.page';

describe('MemoPage', () => {
  let component: MemoPage;
  let fixture: ComponentFixture<MemoPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MemoPage ],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(MemoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
