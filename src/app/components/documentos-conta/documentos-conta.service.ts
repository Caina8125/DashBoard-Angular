import { Injectable } from '@angular/core';
import { Observable, map, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from 'src/app/auth/token/token.service';
import { DocumentoConta } from 'src/app/interfaces/DocumentoConta';

const APIURLGEDCENSOCONTAARQUIVO = environment.apiURLGEDCensoContaArquivo;
const APIURLGEDDOWNLOADARQUIVOGED = environment.apiURLGEDDownloadArquivoGED;

@Injectable({
  providedIn: 'root'
})
export class DocumentosContaService {

  constructor(private http: HttpClient, private token: TokenService) {}

  public getListarDocumentosPorConta(numeroConta:number) : Observable<DocumentoConta[] | null>{
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get<DocumentoConta[]>(
      `${APIURLGEDCENSOCONTAARQUIVO}/listar-documentos/${numeroConta}`,
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

  public putReprovarDocumento(idDocumentoCenso:number,status:number){
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.put(
      `${APIURLGEDCENSOCONTAARQUIVO}/reprovar-documento?idDocumentoCenso=${idDocumentoCenso}&status=${status}`,
      {idDocumentoCenso: idDocumentoCenso, status: status},
      { headers, observe:'response' }
    );
  }

  public getDocumento(id:number): Observable<string>{
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get(
      `${APIURLGEDDOWNLOADARQUIVOGED}/ver-arquivo/${id}`,
      {
        headers,
        observe: 'response',
        responseType: 'text'
      }
    ).pipe(
      map(response => {
        return response.body as string;
      }),
    );
  }
}
