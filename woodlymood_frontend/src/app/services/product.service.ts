import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../model/Product';
import { Product1 } from '../model/Product1';
import { Category } from '../model/Category';
import { Cart } from '../model/cart';
import { Order } from '../model/ordre';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private searchQuerySubject = new BehaviorSubject<string>('');
  searchQuery$ = this.searchQuerySubject.asObservable();


  BASE_URL: string = 'http://localhost:3000';
   httpOptions = {
    headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*', 
    'Content-Type': 'multipart/form-data' })
  };
  constructor(private http: HttpClient) { }

  getProducts(): Observable<any[]>{
    return this.http.get<any[]>(`${this.BASE_URL}/product`,this.httpOptions);
  }

  getProduct(id: string): Observable<Product1>{
    return this.http.get<Product1>(`${this.BASE_URL}/product/${id}`,this.httpOptions);
  }

  createProduct(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.BASE_URL}/product/create/`,formData);
  }

  deleteProduct(id: string): Observable<Product1> {
    console.log(id);
    return this.http.delete<Product1>(`${this.BASE_URL}/product/delete?productID=${id}`,this.httpOptions);
  }

  updateProduct(id: string, formData: FormData): Observable<any> {
    return this.http.put<any>(`${this.BASE_URL}/product/update?productID=${id}`, formData);
  }
  updateProductquantity(id:string,quantity: number): Observable<any> {
    return this.http.put<any>(`${this.BASE_URL}/product/update-quantities`,{ id, quantity });
  }


  getProductsByCategory(name:string): Observable<Product1[]>{
    return this.http.get<Product1[]>(`${this.BASE_URL}/product/category/${name}`);
  }






  getCategories(): Observable<any[]>{
    return this.http.get<any[]>(`${this.BASE_URL}/category`);
  }

  getCategory(id: string): Observable<Category>{
    return this.http.get<Category>(`${this.BASE_URL}/category/${id}`);
  }

  createCategory(formData: FormData): Observable<Category> {
    return this.http.post<Category>(`${this.BASE_URL}/category`,formData);
  }

  deleteCategory(id: string): Observable<Category> {
    console.log(id);
    return this.http.delete<Category>(`${this.BASE_URL}/category/${id}`);
  }

  updateCategory(id: string, formData: FormData): Observable<Category> {
    return this.http.put<Category>(`${this.BASE_URL}/category/${id}`, formData);
  }



  addItem(userId: string, productId: string, quantity: number): Observable<Cart> {
    return this.http.post<Cart>(`${this.BASE_URL}/cart/add`, { userId, productId, quantity });
  }

  getCart(userId: string): Observable<Cart> {
    return this.http.get<Cart>(`${this.BASE_URL}/cart/${userId}`);
  }

  getTotal(userId: string): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}/cart/total/${userId}`);
  }

  delete(userId: string, productId: string): Observable<Cart> {
    return this.http.post<Cart>(`${this.BASE_URL}/cart/delete`, { userId, productId });
  }


  deleteCart(userId: string): Observable<Cart> {
    return this.http.post<Cart>(`${this.BASE_URL}/cart/delete2/${userId}`,null);
  }


  searchProducts(query: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/search`, {
      params: { query }
    });
  }



  setSearchQuery(query: string) {
    this.searchQuerySubject.next(query);
  }


  createOrdre(ordre : Order):Observable<Order> {
    return this.http.post<Order>(`${this.BASE_URL}/checkout`, ordre);
  }

  getAllOrdre():Observable<Order[]>
  {
    return this.http.get<Order[]>(`${this.BASE_URL}/checkout`);
  }

 

}

