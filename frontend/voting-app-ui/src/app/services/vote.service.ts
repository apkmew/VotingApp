import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface VoteOption {
  id?: number;
  text: string;
  votes?: number;
}

export interface Vote {
  id?: number;
  title: string;
  description?: string;
  options: VoteOption[];
}

@Injectable({ providedIn: 'root' })
export class VoteService {
  private apiUrl = 'https://localhost:5001/api/votes'; // ปรับตาม backend

  constructor(private http: HttpClient) {}

  getVotes(): Observable<Vote[]> {
    return this.http.get<Vote[]>(this.apiUrl);
  }

  getVote(id: number): Observable<Vote> {
    return this.http.get<Vote>(`${this.apiUrl}/${id}`);
  }

  createVote(vote: Vote): Observable<Vote> {
    return this.http.post<Vote>(this.apiUrl, vote);
  }

  castVote(voteId: number, optionId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${voteId}/vote-option/${optionId}`, {});
  }

  deleteVote(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
