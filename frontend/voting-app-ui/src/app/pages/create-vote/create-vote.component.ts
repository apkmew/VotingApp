import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { VoteService, Vote } from '../../services/vote.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-create-vote',
  standalone: true,
  host: { ngSkipHydration: '' },
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './create-vote.component.html',
  styleUrls: ['./create-vote.component.css']
})
export class CreateVoteComponent {

  vote: Vote = {
    title: '',
    description: '',
    options: [{ text: '' }]
  };

  isLoading = false;

  constructor(
    private voteService: VoteService,
    private router: Router
  ) {}

  addOption() {
    this.vote.options.push({ text: '' });
  }

  removeOption(index: number) {
    this.vote.options.splice(index, 1);
  }

  createVote(form: NgForm) {
    if (form.invalid) return;

    this.isLoading = true;

    this.voteService.createVote(this.vote).subscribe({
      next: (created) => {
        this.isLoading = false;
        alert('Vote created successfully!');
        this.router.navigate(['/vote', created.id]);
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err);
        alert('Something went wrong!');
      }
    });
  }
}
