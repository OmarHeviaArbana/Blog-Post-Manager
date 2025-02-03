import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import * as PostsAction from '../../actions';
import { PostDTO } from '../../models/post.dto';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
})
export class PostsListComponent {
  posts: PostDTO[];
  displayedColumns: string[] = ['id', 'title', 'description', 'num_likes', 'num_dislikes', 'actions'];
  dataSource: MatTableDataSource<PostDTO> = new MatTableDataSource();

  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  private userId: string;

  constructor(private router: Router, private store: Store<AppState>) {
    this.userId = '';
    this.posts = new Array<PostDTO>();

    this.store.select('auth').subscribe((auth) => {
      if (auth.credentials.user_id) {
        this.userId = auth.credentials.user_id;
      }
    });

    this.store.select('posts').subscribe((posts) => {
      this.dataSource.data = posts.posts;
    });

    this.loadPosts();

    this.loading$ = this.store.select((state) => state.auth.loading);
    this.loaded$ = this.store.select((state) => state.auth.loaded);
  }

  private loadPosts(): void {
    if (this.userId) {
      this.store.dispatch(
        PostsAction.getPostsByUserId({ userId: this.userId })
      );
    }
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  createPost(): void {
    this.router.navigateByUrl('/user/post/');
  }

  updatePost(postId: string): void {
    this.router.navigateByUrl('/user/post/' + postId);
  }

  deletePost(postId: string): void {
    // show confirmation popup
    let result = confirm('Confirm delete post with id: ' + postId + ' .');
    if (result) {
      this.store.dispatch(PostsAction.deletePost({ postId: postId }));
    }
  }
}
