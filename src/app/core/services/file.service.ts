import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileUploadResponse } from '../models/file.model';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  protected api: string = environment.apiUrl; // Usar la URL base de tu API
  protected endpoint: string = 'file';

  constructor(private http: HttpClient) { }

  // Subir archivo: FormData debe contener el archivo bajo el nombre 'archivo'
  upload(file: File): Observable<FileUploadResponse> {
    const formData = new FormData();
    formData.append('archivo', file); // 'archivo' debe coincidir con el parámetro del backend
    return this.http.post<FileUploadResponse>(`${this.api}/${this.endpoint}/upload`, formData);
  }

  // Descargar archivo por ID
  download(id: string): Observable<Blob> {
    return this.http.get(`${this.api}/${this.endpoint}/download/${id}`, {
      responseType: 'blob'
    });
  }

  // Eliminar archivo por ID
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/${this.endpoint}/delete/${id}`);
  }

  // Auxiliar para descargar Blob como archivo local
  saveBlobAsFile(data: Blob, fileName: string): void {
    const url = window.URL.createObjectURL(data);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
