import { Component, OnInit } from '@angular/core';
import { HomeServiceService } from '../home-service.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public clientList:{ userId: number, id: number, title: string, completed: boolean }[];
  public ephemeralClient: { userId: number, id: number, title: string, completed: boolean };
  public headers:string[];
  public loading:boolean;
  public hasError:boolean;
  public error:string;

  public editDiv:boolean;

  public title:string;
  public completed:boolean;

  constructor(private homeServiceService: HomeServiceService) { 
    this.headers = this.getHeaders();
    this.loading = true;
    this.hasError = false;
    this.error = "";
    this.clientList = [];
    this.editDiv = false;
    this.title="";
    this.completed=false;
    this.ephemeralClient = {userId: 0, id: 0, title: "", completed: false};

    this.getCliente();
  }

  ngOnInit(): void {
  }

  public getCliente(){
    this.loading = true;
    this.homeServiceService.getClientes().then((data)=>{
      this.clientList=data;      
      this.hasError = false;
    }).catch((error)=>{
      console.log(error);
      this.hasError = true;
      this.error = "obtener los datos";
    }).finally(()=>{
      this.loading = false;
    });
  }

  public Add(){
    const light = this.clientList[this.clientList.length-1] != null;
     const cliente = {userId: (light)?this.clientList[this.clientList.length-1].userId +1:1,
     id:  (light)?this.clientList[this.clientList.length-1].id +1:1,
     title: this.title,
     completed: this.completed};
    this.homeServiceService.addClientes(cliente).then(()=>{
      this.getCliente();
      this.resetDatas();
      swal("Agregado Exitoso!", "You clicked the button!", "success");
    }).catch((error)=>{
      this.error = "enviar los datos";
      console.log(error);
    });
  }

   public delete(id:number){
    this.homeServiceService.deleteClientes(id).then(()=>{
      this.getCliente();
      swal("Borrado Exitoso!", "You clicked the button!", "success");
    }).catch((error)=>{
      this.error = "enviar los datos";
      console.log(error);
    }); 
    
  }

  public EditDiv(cliente:{userId: number, id: number, title: string, completed: boolean }){
    (this.editDiv)?this.editDiv=false:this.editDiv=true;
    this.title = cliente.title;
    this.completed = cliente.completed;
    if(this.editDiv){
      this.ephemeralClient = cliente;
    } 
  }
  public Edit(){
    const cliente = {userId: this.ephemeralClient.userId,
      id:  this.ephemeralClient.id,
      title: this.title,
      completed: this.completed};
     this.homeServiceService.updateClientes(cliente.id, cliente).then(()=>{
       this.getCliente();
       this.resetDatas();
       this.editDiv=false;
       swal("Editado Exitoso!", "You clicked the button!", "success");
     }).catch((error)=>{
       this.error = "enviar los datos";
       console.log(error);
     });
  }

  private resetDatas(){
    this.title="";
    this.completed=false;
  }

  private getHeaders():string[]{
    const headers:string[] = [ "userId", "id", "titulo", "completado"];
    return headers;
  }
}