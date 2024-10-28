import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KoordinateService {

  constructor(private http: HttpClient) { }

  koordinate(address: string): Observable<any> {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
    return this.http.get(url).pipe(
      map((results: any) => {
        if (results && results.length > 0) {
          const { lat, lon } = results[0];
          return { lat, lon };
        } else {
          throw new Error('Nema adrese');
        }
      })
    );
  }
}
