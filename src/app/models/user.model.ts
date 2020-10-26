export class User {

  static fromFirestore( { email , uid , name }){
     return new User( uid , name, email );
  }

  constructor( public uid: string , public name: string , public email: string ) {
    // forma rápida de crear las propiedades públicas de la clase User
  }


}
