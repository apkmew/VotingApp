import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { VoteService, Vote } from '../../services/vote.service';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-vote',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink],
  templateUrl: './vote.component.html',
})
export class VoteComponent implements OnInit {
  vote?: Vote;
  selected?: number;

  constructor(private route: ActivatedRoute, private voteService: VoteService, private router: Router) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.voteService.getVote(id).subscribe(v => this.vote = v);
  }

  castVote(optionId?: number) {
    if (this.vote && optionId) {
      this.voteService.castVote(this.vote.id!, optionId).subscribe(() => {
        this.router.navigate(['/results', this.vote!.id]);
      });
    }
  }

  submitVote() {
    if (this.vote && this.selected)
      this.voteService.castVote(this.vote.id!, this.selected).subscribe(() => this.router.navigate(['/results', this.vote!.id]));
  }
}
