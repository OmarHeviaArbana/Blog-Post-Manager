import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { Store, StoreModule } from '@ngrx/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PostService } from '../../services/post.service';
import { SharedService } from 'src/app/Shared/Services/shared.service';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { AppState } from 'src/app/app.reducers';
import { of } from 'rxjs';
import * as PostsAction from '../../actions';
import { PostDTO } from '../../models/post.dto';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let store: MockStore<AppState>;
  let postService: jasmine.SpyObj<PostService>;
  let sharedService: jasmine.SpyObj<SharedService>;
  const initialState: AppState = {
    posts: {
      posts: [
        new PostDTO('Post 1', 'Description 1', 10, 2, new Date()),
        new PostDTO('Post 2', 'Description 2', 5, 1, new Date()),
      ].map((post, index) => ({
        ...post,
        postId: (index + 1).toString(),
        categories: [],
        userId: `user${index + 1}`,
        userAlias: `User ${index + 1}`,
      })),
      post: null!,
      loading: false,
      loaded: true,
      error: null,
    }
    auth: {
      loading: false,
      loaded: true,
      credentials: null!,
      error: null,
    },
    user: null!,
    categories: null!
  };

  beforeEach(async () => {
    // Crear mocks de servicios
    postService = jasmine.createSpyObj('PostService', ['likePost', 'dislikePost']);
    sharedService = jasmine.createSpyObj('SharedService', ['errorLog']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, StoreModule.forRoot({})],
      declarations: [HomeComponent],
      providers: [
        provideMockStore({ initialState }),
        { provide: PostService, useValue: postService },
        { provide: SharedService, useValue: sharedService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store) as MockStore<AppState>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch getPosts on init', () => {
    spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(PostsAction.getPosts());
  });

  it('should call likePost and reload posts', () => {
    postService.likePost.and.returnValue(of({}));
    spyOn(component, 'loadPosts');

    component.like('1');

    expect(postService.likePost).toHaveBeenCalledWith('1');
    expect(component.loadPosts).toHaveBeenCalled();
  });

  it('should call dislikePost and reload posts', () => {
    postService.dislikePost.and.returnValue(of({}));
    spyOn(component, 'loadPosts');

    component.dislike('1');

    expect(postService.dislikePost).toHaveBeenCalledWith('1');
    expect(component.loadPosts).toHaveBeenCalled();
  });
});
