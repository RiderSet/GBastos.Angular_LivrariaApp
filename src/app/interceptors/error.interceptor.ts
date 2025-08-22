import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { MensagemErroService } from '../services/mensagem-erro.service';
import { inject } from '@angular/core';

export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {

  const mensagemDeErroService = inject(MensagemErroService)

  return next(req).pipe(
    catchError((erro: HttpErrorResponse) => {
      const mensagemErro = obterMensgemDeErro(erro.status)
      mensagemDeErroService.mostrarMensagemDeErro(mensagemErro)
      return throwError(() => erro)
    })
  )
};

function obterMensgemDeErro(status: number): string {
  const mensagemDeErro: Record<number, string> = {
    0: 'Erro de rede ---> Não foi poss[ivel a conexão com o servidor.',
    404: 'O recurso solicitado não foi encontrado.',
    500: 'Erro no servidor ---> Tente mais tarde.'
  }
  return mensagemDeErro[status] || 'Ocorreu um erro inesperado.'
 }
