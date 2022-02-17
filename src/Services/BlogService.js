import $api from "../http";

export default class BlogService {
    static getPosts() {
        return $api.get("posts");
    }

    static getPost(postid) {
        return $api.get(`posts/${postid}`);
    }
    
    static getPostComments(postid) {
        return $api.get(`posts/${postid}/comments`);
    }

   
}
