import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


interface logIn {
  email: string,
  password: string
}

interface signUp {
  [key: string]: string
}

interface addPost {
  [key: string]: string
}

interface updateAddress {
  [key: string]: string
}

interface comment {
  comment: string
}

interface loginResponse {
  token: string,
  _id: string,
  city: string,
  status: string
}

interface serviceResponse {
  status: string,
  result: Array<{ posts: Array<object> }>
}

interface commentsResponse {
  status: string,
  result: Array<{ posts: { comments: Array<Object> } }>
}

interface getUser {
  status: string,
  result: Object
}

interface status {
  status: string
}


@Injectable({
  providedIn: 'root'
})

export class MainService {

  constructor(private http: HttpClient) { }

  login(body: logIn) {
    return this.http.post<loginResponse>('http://localhost:4000/api/v1/authenticate/login', body)
  }
  signup(body: signUp) {
    return this.http.post<status>('http://localhost:4000/api/v1/authenticate/signup', body)
  }

  getServiceProvider(city: string | null) {
    return this.http.get<serviceResponse>(`http://localhost:4000/api/v1/users/posts/service-provider/${city}`)
  }

  getServiceConsumer(city: string | null, skip: any) {
    return this.http.get<serviceResponse>(`http://localhost:4000/api/v1/users/posts/help-request/${city}/?page=${skip}`)
  }

  getUser(id: string | null) {
    return this.http.get<getUser>(`http://localhost:4000/api/v1/users/${id}`)
  }
  getComments(id: string | null, postId: string | null) {
    return this.http.get<commentsResponse>(`http://localhost:4000/api/v1/users/${id}/posts/${postId}/comments`)
  }

  addPost(id: string | null, body: addPost) {
    return this.http.post<status>(`http://localhost:4000/api/v1/users/${id}/posts`, body)
  }

  addComent(id: string | null, postId: string | null, body: comment) {
    return this.http.post<status>(`http://localhost:4000/api/v1/users/${id}/posts/${postId}/comments`, body)
  }

  updateAddress(id: string | null, body: updateAddress) {
    return this.http.put<status>(`http://localhost:4000/api/v1/users/${id}/address`, body)
  }


  uploadImage(image: any) {
    return this.http.post('http://localhost:4000/api/v1/images', image)
  }

  uploadThumbnailImage(image: any) {
    return this.http.post('http://localhost:4000/api/v1/images/thumbnail', image)

  }

  listImage(key: any) {
    return this.http.get(`http://localhost:4000/api/v1/images/${key}`, { responseType: 'blob' })
  }

  getAllImages() {
    return this.http.get('http://localhost:4000/api/v1/images')
  }

  deleteImage(key: any) {
    return this.http.delete(`http://localhost:4000/api/v1/images/${key}`)
  }


}
