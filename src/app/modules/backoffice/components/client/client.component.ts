import { ClientService } from './../../services/client.service';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription, Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { Client } from '../../interfaces/client';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-client',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NzTableModule, NzIconModule ],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent implements OnInit, OnDestroy {

  private clientService = inject(ClientService);
  private subscriptions: Subscription[] = [];
  private _OnDestroy$ = new Subject<void>();
  clientsData: Client[] = [];


  ngOnInit(): void {
    this.getAllClients();
  }

  getAllClients(){
    this.clientService.getAllClient().pipe(
      takeUntil(this._OnDestroy$)
    ).subscribe((data: any)=>{
      this.clientsData = data;
    }
    )
  }

  ngOnDestroy(): void {
    this._OnDestroy$.next();
    this._OnDestroy$.complete();
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
