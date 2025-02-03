import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import * as PostsAction from '../../actions';
import { PostDTO } from '../../models/post.dto';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  posts: PostDTO[];
  numLikes: number;
  numDislikes: number;

  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;

  graphData:  [number, number]  ;

  barChartData : any;
  barChartOptions : any;


  constructor(private store: Store<AppState>) {
    this.posts = new Array<PostDTO>();
    this.numLikes = 0;
    this.numDislikes = 0;
    this.graphData = [0,0];
  /*   this.barChartData =[]; */
  /*   this.barChartOptions=[] */

    this.store.select('posts').subscribe((posts) => {
      this.posts = posts.posts;
      this.numLikes = 0;
      this.numDislikes = 0;
      this.posts.forEach((post) => {
        this.numLikes = this.numLikes + post.num_likes;
        this.numDislikes = this.numDislikes + post.num_dislikes;
        this.updateGraphData();
      });

    });

    this.loading$ = this.store.select((state) => state.auth.loading);
    this.loaded$ = this.store.select((state) => state.auth.loaded);
  }

  ngOnInit(): void {
    this.loadPosts();
  }



  private loadPosts(): void {
    this.store.dispatch(PostsAction.getPosts());

  }

  updateGraphData() : any {
    this.graphData = [this.numLikes, this.numDislikes];
    this.barChartData = {
      labels: ['Likes', 'Dislikes'],
      datasets: [
        {
          label: 'Posts Resume Likes and Dislikes',
          data: this.graphData,
          backgroundColor: ['#8cf0d7', '#f26464'],
        },
      ],
    };

    this.barChartOptions = {
      responsive: true,
      scales: {
        x: {
          beginAtZero: true,
        },
        y: {
          beginAtZero: true,
        },
      },
    };
  }

}
