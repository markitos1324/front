import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { jsServer } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HomeServiceService {

  constructor(private http: HttpClient) { }

  public getClientes(): Promise<any> {
    return new Promise((resolve, reject) => {
      const url = `${jsServer}/Cliente`;
      const sub: Subscription = this.http
        .get(url)
        .subscribe(
          (data) => {
            sub.unsubscribe();
            resolve(data);
          },
          (error) => {
            sub.unsubscribe();
            console.log(error);
            reject(error);
          }
        );
    });
  }
 
  public addClientes(cliente:{userId: number, id: number, title: string, completed: boolean }):
   Promise<any> {
    return new Promise((resolve, reject) => {
      const url = `${jsServer}/Cliente`;
      const sub: Subscription = this.http
        .post(url,cliente)
        .subscribe(
          (data) => {
            console.log(data);
            sub.unsubscribe();
            resolve(data);
          },
          (error) => {
            sub.unsubscribe();
            console.log(error);
            
            reject(error);
          }
        );
    });
  }

  public updateClientes(cod:number, cliente:{userId: number, id: number, title: string, completed: boolean }): Promise<any> {
    return new Promise((resolve, reject) => {
      const url = `${jsServer}/Cliente/`+cod;
      console.log(url);
      const sub: Subscription = this.http
        .put(url, cliente)
        .subscribe(
          (data) => {
            sub.unsubscribe();
            resolve(data);
          },
          (error) => {
            sub.unsubscribe();
            console.log(error);
            
            reject(error);
          }
        );
    });
  }

  public deleteClientes(id:number): Promise<any> {
    return new Promise((resolve, reject) => {
      const url = `${jsServer}/Cliente/`+id;
      console.log(url);
      const sub: Subscription = this.http
        .delete(url)
        .subscribe(
          (data) => {
            sub.unsubscribe();
            resolve(data);
          },
          (error) => {
            sub.unsubscribe();
            console.log(error);
            
            reject(error);
          }
        );
    });
  }

}
