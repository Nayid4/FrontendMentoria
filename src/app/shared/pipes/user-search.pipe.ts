import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../../core/models/user.model';

@Pipe({
  name: 'userSearch'
})
export class UserSearchPipe implements PipeTransform {

  transform(listaUsuarios: User[], entradaInput: string): User[] | undefined[] {
    entradaInput = entradaInput?.toLowerCase() || '';

    if (!entradaInput) {
      return listaUsuarios;
    }

    return listaUsuarios.filter((item) =>
      this.buscarEnObjeto(item, entradaInput)
    );
  
    }

    private buscarEnObjeto(obj: any, entradaInput: string): boolean {
      // Itera sobre las claves del objeto
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const value = obj[key];
  
          if (typeof value === 'string' && value.toLowerCase().includes(entradaInput)) {
            return true;
          }
  
          if (typeof value === 'number' && value.toString().includes(entradaInput)) {
            return true;
          }
  
          if (value instanceof Date && value.toISOString().includes(entradaInput)) {
            return true;
          }
  
          if (typeof value === 'object' && value !== null) {
            if (this.buscarEnObjeto(value, entradaInput)) {
              return true;
            }
          }
        }
      }
  
      return false;
    }

}
