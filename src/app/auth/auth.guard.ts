import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AutenticacaoService } from '../service/autenticacao.service';

export const authGuard: CanActivateFn = (route, state) => {
  const autenticacao_service = inject(AutenticacaoService);
  const router = inject(Router);
  const token = sessionStorage.getItem('token');

  if(token == ' ' || token == null || token == undefined){
    router.navigateByUrl('/login');
    return false;
  }

  autenticacao_service.validarToken(token).subscribe((res:any) => {
    if(!res){
      router.navigateByUrl('/login')
    }
  });
  return true;
};
