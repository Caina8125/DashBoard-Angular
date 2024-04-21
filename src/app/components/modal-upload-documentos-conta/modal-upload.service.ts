import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from 'src/app/auth/token/token.service';
import { TipoDocumentoConta } from 'src/app/interfaces/TipoDocumentoConta';

const APIURLGEDCENSOCONTAARQUIVO = environment.apiURLGEDCensoContaArquivo;
const APIURLGEDTIPODOCUMENTOCENSOCONTA = environment.apiURLGEDTipoDocumentoCensoConta;

@Injectable({
  providedIn: 'root',
})
export class ModalUploadService {
  constructor(private http: HttpClient, private token: TokenService) {}

  public postDocumento(numeroContaBlob: Blob, tipoDocumentoIdBlob: Blob, operadoraBlob: Blob,arquivo:File,numeroConta:number,tipoDocumentoId:number, operadora:number){
    const formData = new FormData();
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    formData.append('numeroConta', numeroContaBlob);
    formData.append('tipoDocumentoCensoContaId', tipoDocumentoIdBlob);
    formData.append('codigoOperadora',operadoraBlob);
    formData.append('file', arquivo, arquivo.name);

    return this.http.post(
      `${APIURLGEDCENSOCONTAARQUIVO}/adicionar-documento/${numeroConta}/${tipoDocumentoId}?codigoOperadora=${operadora}`,
      formData,
      {
        headers,
        observe:'response'
      }
    )
  }


  public getTipoDocumento(): Observable<TipoDocumentoConta[] | null> {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get<TipoDocumentoConta[]>(
      `${APIURLGEDTIPODOCUMENTOCENSOCONTA}/obter-todos`,
      {
        headers,
        observe: 'response',
      }
    ).pipe(
      map(response => response.body),
      catchError(error => {
        console.error('Erro ao obter tipos de documento:', error);
        return of(null); // Retorna um Observable com valor nulo em caso de erro
      })
    );
  }
}
