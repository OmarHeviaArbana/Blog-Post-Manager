import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PostDTO } from 'src/app/Post/models/post.dto';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() item!: PostDTO;
  @Input() showButtons: boolean = false;
  @Output() like = new EventEmitter<string>();
  @Output() dislike = new EventEmitter<string>();

  newLike(): void {
    this.like.emit(this.item.postId);
  }

  newDislike(): void {
    this.dislike.emit(this.item.postId);
  }


}
