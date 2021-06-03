import { HttpHeaders, HttpParams } from '@angular/common/http';


export const headers = (): any => {

  //console.log(lsttoken[0].token);
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',

    })
  };
  return httpOptions;
}




