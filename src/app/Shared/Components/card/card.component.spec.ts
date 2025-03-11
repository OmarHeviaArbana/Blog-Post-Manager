import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { PostDTO } from 'src/app/Post/models/post.dto';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatDatePipe } from './../../Pipes/format-date.pipe';


describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardComponent,  FormatDatePipe ],
      imports: [CommonModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should bind @Input() item correctly', () => {
    const mockPost: PostDTO = {
      postId: '123',
      title: 'Test Post',
      description: 'This is a test post',
      num_likes: 10,
      num_dislikes: 2,
      publication_date: new Date(),
      categories: [],
      userId: 'user_1',
      userAlias: 'TestUser'
    };

    component.item = mockPost;
    fixture.detectChanges();

    expect(component.item).toBeDefined();
    expect(component.item.postId).toBe('123');
    expect(component.item.title).toBe('Test Post');
  });

  it('should emit like event when newLike() is called', () => {
    spyOn(component.like, 'emit');

    component.item = {
      postId: '123',
      title: 'Sample Post',
      description: 'Testing like functionality',
      num_likes: 5,
      num_dislikes: 1,
      publication_date: new Date(),
      categories: [],
      userId: 'user_1',
      userAlias: 'TestUser'
    };

    fixture.detectChanges();
    component.newLike();

    expect(component.like.emit).toHaveBeenCalledWith('123');
  });

  it('should emit dislike event when newDislike() is called', () => {
    spyOn(component.dislike, 'emit');

    component.item = {
      postId: '456',
      title: 'Sample Post',
      description: 'Testing dislike functionality',
      num_likes: 5,
      num_dislikes: 1,
      publication_date: new Date(),
      categories: [],
      userId: 'user_1',
      userAlias: 'TestUser'
    };

    fixture.detectChanges();
    component.newDislike();

    expect(component.dislike.emit).toHaveBeenCalledWith('456');
  });
});

