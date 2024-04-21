import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AppModule } from '../../app.module';
import { environment } from 'src/environments/environment';
import { TokenService } from '../../auth/token/token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

//#region
const APIFILTRO = environment.apiURLFiltro;
const APIUPLOAD = environment.apiURLUpload;
const APIUSUARIO = environment.apiURLUsuario;
const APIAUDITORIA = environment.apiURLAuditoria;
const APIACOMODACAO = environment.apiURLAcomodacao;
const APIINTERNACAO = environment.apiURLInternacao;
const APIATENDIMENTOS = environment.apiURLAtendimentos;
const APIUNIDDADEOPERADORA = environment.apiURLUnidadeOperadora;
const APIREGISTROATENDIMENTO = environment.apiURLRegistroAtendimentos;
//#endregion

@Injectable({
  providedIn: 'root',
  useClass: AppModule,
})
export class ListaInternacaoService {
  constructor(private http: HttpClient, private token: TokenService) {}

  public postArquivoCsv(
    unidadeAtendimento: any,
    arquivo: File
  ): Observable<any> {
    const formData = new FormData();
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    formData.append('unidadeAtendimento', unidadeAtendimento);
    formData.append('file', arquivo, arquivo.name);
    return this.http.post(
      `${APIUPLOAD}/upload-csv-cti-retroativo/${unidadeAtendimento}`,
      formData,
      {
        headers,
        observe: 'response',
      }
    );
  }

  public postUpload(unidadeAtendimento: any, arquivo: File): Observable<any> {
    const formData = new FormData();
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    formData.append('unidadeAtendimento', unidadeAtendimento);
    formData.append('file', arquivo, arquivo.name);
    return this.http.post(
      `${APIUPLOAD}/upload/${unidadeAtendimento}`,
      formData,
      {
        headers,
        observe: 'response',
      }
    );
  }

  public postStatus(atendimento: any, status: any): Observable<any> {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.post(
      `${APIATENDIMENTOS}/atualizar-atendimento/${atendimento}?censoStatus=${status}`,
      { atendimento: atendimento, censoStatus: status },
      { headers, observe: 'response' }
    );
  }

  public postAtendimento(
    atendimento: any,
    leito?: any,
    paciente?: any,
    convenio?: any,
    status?: any,
    contratadoId?: any
  ): Observable<any> {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.post(
      `${APIATENDIMENTOS}/adicionar-atendimento/${atendimento}?leito=${leito}&paciente=${paciente}&convenio=${convenio}&censoPacienteStatus=${status}&contratadoId=${contratadoId}`,
      {
        atendimento: atendimento,
        leito: leito,
        paciente: paciente,
        convenio: convenio,
        status: status,
        contratadoId: contratadoId,
      },
      { headers, observe: 'response' }
    );
  }

  public postPDFInternacaoHome(unidadeAtendimento: any, arquivo: File) {
    const formData = new FormData();
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    formData.append('unidadeAtendimento', unidadeAtendimento);
    formData.append('file', arquivo, arquivo.name);
    return this.http.post(
      `${APIUPLOAD}/upload-pdf-home-internacao/${Number(unidadeAtendimento)}`,
      formData,
      { headers, observe: 'response' }
    );
  }

  public postPDFCentroCirurgicoHome(unidadeAtendimento: any, arquivo: File) {
    const formData = new FormData();
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    formData.append('unidadeAtendimento', unidadeAtendimento);
    formData.append('file', arquivo, arquivo.name);

    return this.http.post(
      `${APIUPLOAD}/upload-pdf-home-centro-cirurgico/${unidadeAtendimento}`,
      formData,
      { headers, observe: 'response' }
    );
  }

  public postCSVRedeDor(unidadeAtendimento: any, arquivo: File) {
    const formData = new FormData();
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    formData.append('unidadeAtendimento', unidadeAtendimento);
    formData.append('file', arquivo, arquivo.name);

    return this.http.post(
      `${APIUPLOAD}/upload-csv-rede-dor/${unidadeAtendimento}`,
      formData,
      { headers, observe: 'response' }
    );
  }

  public getLog(unidadeAtendimento: any, log: any) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get(
      `${APIAUDITORIA}/obter-por-log?idUnidadeAtendimento=${unidadeAtendimento}&log=${log}`,
      { headers, observe: 'response' }
    );
  }

  public getInternacoesPorOperadora(
    evolucao: any,
    skip: any,
    unidadeAtendimento: any,
    texto: any,
    usuario?: any
  ) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    if (usuario != null) {
      return this.http.get(
        `${APIFILTRO}/obter-filtro?campo=operadora&texto=${texto}&evolucao=${evolucao}&skip=${skip}&idUnidadeAtendimento=${unidadeAtendimento}&usuario=${usuario}`,
        { headers, observe: 'response' }
      );
    } else {
      return this.http.get(
        `${APIFILTRO}/obter-filtro?campo=operadora&texto=${texto}&evolucao=${evolucao}&skip=${skip}&idUnidadeAtendimento=${unidadeAtendimento}`,
        { headers, observe: 'response' }
      );
    }
  }

  public getInternacao(evolucao: any, idUnidadeAtendimento: any, pagina: any) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get(
      `${APIINTERNACAO}/obter-por-evolucao/${evolucao}/${idUnidadeAtendimento}?skip=${pagina}`,
      { headers, observe: 'response' }
    );
  }

  public getInfoAtendimento(idRegistroAtendimento: any) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get(
      `${APIREGISTROATENDIMENTO}/obter-por-id/${idRegistroAtendimento}`,
      { headers, observe: 'response' }
    );
  }

  public getColaboradores() {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get(`${APIUSUARIO}/obter-todos`, {
      headers,
      observe: 'response',
    });
  }

  public getInternacaoPorColaborador(
    pessoaInclusao: any,
    unidadeAtendimento: any,
    idEvolucao: any,
    page: any
  ) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get(
      `${APIINTERNACAO}/obter-internacao-por-usuario/${pessoaInclusao}?idUnidadeAtendimento=${unidadeAtendimento}&idEvolucao=${idEvolucao}&skip=${page}`,
      { headers, observe: 'response' }
    );
  }

  public getUnidadeOperadoraPorUnidade(unidadeAtendimento: any) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get(
      `${APIUNIDDADEOPERADORA}/obter-todos-por-unidade-atendimento?idUnidadeAtendimento=${unidadeAtendimento}`,
      { headers, observe: 'response' }
    );
  }

  public getAcomodacoes(idUnidadeAtendimento: any) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get(
      `${APIACOMODACAO}/obter-por-unidade-atendimento?idUnidadeAtendimento=${idUnidadeAtendimento}`,
      { headers, observe: 'response' }
    );
  }

  public getInternacaoPorAcomodacao(
    texto: any,
    evolucao: any,
    skip: any,
    idUnidadeAtendimento: any
  ) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get(
      `${APIFILTRO}/obter-filtro?campo=acomodacao&texto=${texto}&evolucao=${evolucao}&skip=${skip}&idUnidadeAtendimento=${idUnidadeAtendimento}`,
      { headers, observe: 'response' }
    );
  }

  public getFiltro(
    idUnidadeAtendimento?: any,
    idEvolucao?: any,
    idUsuario?: any,
    idUnidadeOperadora?: any,
    idStatusInternacao?: any,
    nroRegistroAtendimento?: any,
    paciente?: any,
    dataInicial?: any,
    dataFinal?: any,
    idAcomodacao?: any,
    tipoBusca?: any,
    pagina?: any
  ) {
    const token = this.token.retornaToken();1
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    if (tipoBusca == 0) {
      if (nroRegistroAtendimento != 0) {
        return this.http.get(
          `${APIFILTRO}/filtro-internacao?IdUnidadeAtendimento=${idUnidadeAtendimento}&IdEvolucao=${idEvolucao}&IdStatusInternacao=${idStatusInternacao}&NroRegistroAtendimento=${nroRegistroAtendimento}&Skip=${pagina}`,
          { headers, observe: 'response' }
        );
      } else if (paciente == null) {
        return this.http.get(
          `${APIFILTRO}/filtro-internacao?IdUnidadeAtendimento=${idUnidadeAtendimento}&IdEvolucao=${idEvolucao}&IdAcomodacao=${idAcomodacao}&IdUsuario=${idUsuario}&IdUnidadeOperadora=${idUnidadeOperadora}&IdStatusInternacao=${idStatusInternacao}&NroRegistroAtendimento=${nroRegistroAtendimento}&DataInicial=${dataInicial}&DataFinal=${dataFinal}&Skip=${pagina}`,
          { headers, observe: 'response' }
        );
      } else if (idEvolucao == null) {
        return this.http.get(
          `${APIFILTRO}/filtro-internacao?IdUnidadeAtendimento=${idUnidadeAtendimento}&IdAcomodacao=${idAcomodacao}&IdUsuario=${idUsuario}&IdUnidadeOperadora=${idUnidadeOperadora}&IdStatusInternacao=${idStatusInternacao}&NroRegistroAtendimento=${nroRegistroAtendimento}&DataInicial=${dataInicial}&DataFinal=${dataFinal}&Skip=${pagina}`,
          { headers, observe: 'response' }
        );
      } else {
        return this.http.get(
          `${APIFILTRO}/filtro-internacao?IdUnidadeAtendimento=${idUnidadeAtendimento}&IdEvolucao=${idEvolucao}&IdAcomodacao=${idAcomodacao}&IdUsuario=${idUsuario}&IdUnidadeOperadora=${idUnidadeOperadora}&IdStatusInternacao=${idStatusInternacao}&NroRegistroAtendimento=${nroRegistroAtendimento}&Paciente=${paciente}&DataInicial=${dataInicial}&DataFinal=${dataFinal}&Skip=${pagina}`,
          { headers, observe: 'response' }
        );
      }
    } else {
      if (paciente == null) {
        return this.http.get(
          `${APIFILTRO}/filtro-internacao?IdUnidadeAtendimento=${idUnidadeAtendimento}&IdEvolucao=${idEvolucao}&IdAcomodacao=${idAcomodacao}&IdUsuario=${idUsuario}&IdUnidadeOperadora=${idUnidadeOperadora}&IdStatusInternacao=${idStatusInternacao}&NroRegistroAtendimento=${nroRegistroAtendimento}&DataFinal=${dataFinal}&DataCriacao=${dataInicial}&Skip=${pagina}`,
          { headers, observe: 'response' }
        );
      } else {
        return this.http.get(
          `${APIFILTRO}/filtro-internacao?IdUnidadeAtendimento=${idUnidadeAtendimento}&IdEvolucao=${idEvolucao}&IdAcomodacao=${idAcomodacao}&IdUsuario=${idUsuario}&IdUnidadeOperadora=${idUnidadeOperadora}&IdStatusInternacao=${idStatusInternacao}&NroRegistroAtendimento=${nroRegistroAtendimento}&Paciente=${paciente}&DataFinal=${dataFinal}&DataCriacao=${dataInicial}&Skip=${pagina}`,
          { headers, observe: 'response' }
        );
      }
    }
  }

  public getFiltroComSkip(
    idUnidadeAtendimento: number,
    idEvolucao: number,
    idAcomodacao: string,
    idUsuario: number,
    idUnidadeOperadora:string,
    idStatusInternacao:number,
    nroRegistroAtendimento:any,
    paciente:string,
    dataInicial: string,
    dataFinal:string,
    tipoBusca:any,
    skip:number
  ) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    if (tipoBusca == 0) {
      if (nroRegistroAtendimento != 0) {
        return this.http.get(
          `${APIFILTRO}/filtro-internacao-skip?IdUnidadeAtendimento=${idUnidadeAtendimento}&IdEvolucao=${idEvolucao}&IdStatusInternacao=${idStatusInternacao}&NroRegistroAtendimento=${nroRegistroAtendimento}&Skip=${skip}`,
          { headers, observe: 'response' }
        );
      } else if (paciente == null) {
        return this.http.get(
          `${APIFILTRO}/filtro-internacao-skip?IdUnidadeAtendimento=${idUnidadeAtendimento}&IdEvolucao=${idEvolucao}&IdAcomodacao=${idAcomodacao}&IdUsuario=${idUsuario}&IdUnidadeOperadora=${idUnidadeOperadora}&IdStatusInternacao=${idStatusInternacao}&NroRegistroAtendimento=${nroRegistroAtendimento}&DataInicial=${dataInicial}&DataFinal=${dataFinal}&Skip=${skip}`,
          { headers, observe: 'response' }
        );
      } else if (idEvolucao == null) {
        return this.http.get(
          `${APIFILTRO}/filtro-internacao-skip?IdUnidadeAtendimento=${idUnidadeAtendimento}&IdAcomodacao=${idAcomodacao}&IdUsuario=${idUsuario}&IdUnidadeOperadora=${idUnidadeOperadora}&IdStatusInternacao=${idStatusInternacao}&NroRegistroAtendimento=${nroRegistroAtendimento}&DataInicial=${dataInicial}&DataFinal=${dataFinal}&Skip=${skip}`,
          { headers, observe: 'response' }
        );
      } else {
        return this.http.get(
          `${APIFILTRO}/filtro-internacao-skip?IdUnidadeAtendimento=${idUnidadeAtendimento}&IdEvolucao=${idEvolucao}&IdAcomodacao=${idAcomodacao}&IdUsuario=${idUsuario}&IdUnidadeOperadora=${idUnidadeOperadora}&IdStatusInternacao=${idStatusInternacao}&NroRegistroAtendimento=${nroRegistroAtendimento}&Paciente=${paciente}&DataInicial=${dataInicial}&DataFinal=${dataFinal}&Skip=${skip}`,
          { headers, observe: 'response' }
        );
      }
    } else {
      if (paciente == null) {
        return this.http.get(
          `${APIFILTRO}/filtro-internacao-skip?IdUnidadeAtendimento=${idUnidadeAtendimento}&IdEvolucao=${idEvolucao}&IdAcomodacao=${idAcomodacao}&IdUsuario=${idUsuario}&IdUnidadeOperadora=${idUnidadeOperadora}&IdStatusInternacao=${idStatusInternacao}&NroRegistroAtendimento=${nroRegistroAtendimento}&DataFinal=${dataFinal}&DataCriacao=${dataInicial}&Skip=${skip}`,
          { headers, observe: 'response' }
        );
      } else {
        return this.http.get(
          `${APIFILTRO}/filtro-internacao-skip?IdUnidadeAtendimento=${idUnidadeAtendimento}&IdEvolucao=${idEvolucao}&IdAcomodacao=${idAcomodacao}&IdUsuario=${idUsuario}&IdUnidadeOperadora=${idUnidadeOperadora}&IdStatusInternacao=${idStatusInternacao}&NroRegistroAtendimento=${nroRegistroAtendimento}&Paciente=${paciente}&DataFinal=${dataFinal}&DataCriacao=${dataInicial}&Skip=${skip}`,
          { headers, observe: 'response' }
        );
      }
    }
  }

  public getAuditoriaPorRegistro(idUnidadeAtendimento: any, idRegistro: any) {
    const token = this.token.retornaToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get(
      `${APIAUDITORIA}/auditoria-evolucao-por-registro/${idRegistro}?idUnidadeAtendimento=${idUnidadeAtendimento}`,
      { headers, observe: 'response' }
    );
  }
}
