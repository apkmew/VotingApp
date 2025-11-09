import { Routes } from '@angular/router';
import { CreateVoteComponent } from './pages/create-vote/create-vote.component';
import { VoteComponent } from './pages/vote/vote.component';
import { ResultsComponent } from './pages/results/results.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'create', component: CreateVoteComponent },
  { path: 'vote/:id', component: VoteComponent },
  { path: 'results/:id', component: ResultsComponent },
];

