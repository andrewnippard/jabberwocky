import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Node } from './node';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NodeService {


  nodesUrl = (environment.debug ? 'http://localhost:8000/calc/api/v1/nodes/' : 'http://localhost/calc/api/v1/nodes/');
  nodeResultsUrl = (environment.debug ? 'http://localhost:8000/calc/api/v1/noderuns/' : 'http://localhost/calc/api/v1/noderuns/');

  constructor(private http : HttpClient) { }

  getNodes() {
    return this.http.get(this.nodesUrl);
  }

  getNodeResults(run_id : number) : Observable<object[]> {
    return this.http.get<object[]>(this.nodeResultsUrl + run_id);
  }

  runNode(node_id : number, query : object) : Observable<object> {
    return this.http.post(this.nodesUrl + node_id + '/run/', {query: query});
  }
}
