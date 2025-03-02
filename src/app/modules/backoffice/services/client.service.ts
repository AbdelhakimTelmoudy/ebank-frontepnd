import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../../core/utils/services/api.service';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  baseUrl = environment.baseUrl;
  private apiService= inject(ApiService)

  getAllClient(){
    return this.apiService.get('clients');
  }
}
