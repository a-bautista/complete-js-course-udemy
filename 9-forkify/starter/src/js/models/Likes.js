export default class Likes {
    constructor(){
        this.likes = [];
    }
    
    addLike(id, title, author, img){
        const like ={id, title, author, img};
        this.likes.push(like);
        
        //persistent data local storage
        this.persistData();
        return like;
    }
    
    deleteLike(id){
        const index = this.likes.findIndex(element => element.id === id);
        this.likes.splice(index, 1);
        
        //persistent data local storage
        
        
    }
    
    isLiked(id){
        return this.likes.findIndex(element => element.id === id)!== -1;
    }
    
    getNumLikes(){
        return this.likes.length;
    }
    
    persistData(){
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }
    
    readStorage(){
        const storage = JSON.parse(localStorage.getItem('likes'));
        
        //Restore likes from the local storage
        if (storage) this.likes = storage;
    }
}
