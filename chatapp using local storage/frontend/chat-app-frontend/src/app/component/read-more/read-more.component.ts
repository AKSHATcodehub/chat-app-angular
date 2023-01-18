import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-read-more',
  templateUrl: './read-more.component.html',
  styleUrls: ['./read-more.component.scss']
})
export class ReadMoreComponent implements OnInit {

  @Input() content!: string;
  @Input() limit!: number;
  @Input() completeWords!: boolean;

  isContentToggled!: boolean;
  nonEditedContent!: string;


  constructor(private router:Router) { }

  ngOnInit(): void {
    this.nonEditedContent = this.content;
    this.content = this.formatContent(this.content);
  }

  toggleContent() {
    this.isContentToggled = !this.isContentToggled;
    this.content = this.isContentToggled
      ? this.nonEditedContent
      : this.formatContent(this.content);

    console.log("toggle content called...............");
    

    this.router.navigate(['chat'])
  }

  formatContent(content: string) {
    if (this.completeWords) {
      this.limit = content.substr(0, this.limit).lastIndexOf(' ');
    }
    this.router.navigate(['chat'])

    return `${content.substr(0, this.limit)}...`;

    
  }

}
