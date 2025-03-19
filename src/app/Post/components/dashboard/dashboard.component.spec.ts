import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { Store } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { AppState } from 'src/app/app.reducers';
import * as PostsAction from '../../actions';
import { PostDTO } from '../../models/post.dto';
import { CategoryDTO } from 'src/app/Category/models/category.dto';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let store: MockStore<AppState>; // Aseguramos que store es un MockStore

  const mockCategories: CategoryDTO[] = [
    new CategoryDTO('Technology', 'Tech-related posts', '#00ff00'),
    new CategoryDTO('Science', 'Science discoveries', '#ff0000'),
  ].map((category, index) => ({
    ...category,
    categoryId: (index + 1).toString(),
    userId: `user${index + 1}`,
  }));

  const initialState: AppState = {
    posts: {
      posts: [
        new PostDTO('Post 1', 'Description 1', 10, 2, new Date('2024-03-17')),
        new PostDTO('Post 2', 'Description 2', 5, 1, new Date('2024-03-16')),
      ].map((post, index) => ({
        ...post,
        postId: (index + 1).toString(),
        categories: mockCategories,
        userId: `user${index + 1}`,
        userAlias: `User ${index + 1}`,
      })),
      post: null!,
      loading: false,
      loaded: true,
      error: null,
    },
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
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
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

  it('should calculate total likes and dislikes correctly', () => {
    component.posts = initialState.posts.posts;
    component.updateGraphData();

    expect(component.numLikes).toBe(15);
    expect(component.numDislikes).toBe(3);
    expect(component.graphData).toEqual([15, 3]);
  });

  it('should assign correct post properties', () => {
    const post = component.posts[0];
    expect(post.postId).toBe('1');
    expect(post.userId).toBe('user1');
    expect(post.userAlias).toBe('User 1');
    expect(post.categories.length).toBe(2);
    expect(post.categories[0].categoryId).toBe('1');
    expect(post.categories[0].title).toBe('Technology');
    expect(post.categories[0].css_color).toBe('#00ff00');
    expect(post.categories[0].userId).toBe('user1');
  });
});
