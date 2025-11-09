import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { VoteService, Vote } from '../../services/vote.service';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink],
  templateUrl: './results.component.html',
})
export class ResultsComponent implements OnInit {
  vote?: Vote;
  totalVotes = 0;

  constructor(private route: ActivatedRoute, private voteService: VoteService) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.voteService.getVote(id).subscribe((data) => {
      this.vote = data;
      this.totalVotes = data.options.reduce((a, b) => a + (b.votes || 0), 0);
    });
  }
}
