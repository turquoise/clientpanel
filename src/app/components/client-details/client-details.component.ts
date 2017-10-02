import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Client } from '../../models/Client';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {

  id: string;
  client: Client;
  hasBalance: boolean = false;
  showBalanceUpdateInput: boolean = false;

  constructor(
    public clientService: ClientService,
    public route: ActivatedRoute,
    public router: Router,
    public flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    //console.log(this.id);
    this.clientService.getClient(this.id)
      .subscribe( client => {
        if (client.balance > 0) {
          this.hasBalance = true;
        }
        this.client = client;
        console.log(this.client);
      });
  }

  onDeleteClick() {
    if (confirm('Are you sure to delete?')) {
      this.clientService.deleteClient(this.id);
      this.flashMessagesService.show('Client Deleted', {cssClass: 'alert-success', timeout: 4000});
      this.router.navigate(['/']);
    }
  }

  updateBalance(id: string) {
    this.clientService.updateClient(this.id, this.client);
    this.flashMessagesService.show('Balance Updated', {cssClass: 'alert-success', timeout: 4000});
    this.router.navigate(['/client/' + this.id]);
  }

}
