import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Client } from '../../models/Client';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  id: string;
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  }

  disableBalanceOnEdit: boolean = true;

  constructor(
    public clientService: ClientService,
    public route: ActivatedRoute,
    public router: Router,
    public flashMessagesService: FlashMessagesService,
    public settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.disableBalanceOnEdit = this.settingsService.getSettings().disableBalanceOnEdit;
    this.id = this.route.snapshot.params['id'];

    this.clientService.getClient(this.id)
      .subscribe( client => {
        this.client = client;
      })
  }

  onSubmit({ value, valid}:{value: Client, valid: boolean}) {

    //console.log(value, valid);
    if (!valid) {
      //console.log('not valid');
      this.flashMessagesService.show('Please fill in all fields', {
        cssClass: 'alert-danger',
        timeout: 4000
      });
      this.router.navigate(['edit-client/'+ this.id]);
    } else {
      //console.log('valid');
      this.clientService.updateClient(this.id, value);
      this.flashMessagesService.show('Client updated', {
        cssClass: 'alert-success',
        timeout: 4000
      });
      this.router.navigate(['/client/' + this.id]);
    }
  }

}
