import React, { Component } from 'react';
import axios from "axios";

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {

    state = {
        posts: [],
        selectedId: null,
        error: false
    }
   
    componentDidMount () {
        axios.get('/posts')
            .then( response => {
                    const post = response.data.slice(0,4);
                    const updatedPosts = post.map(post => {
                        return { ...post,
                                author:"Akshay"
                        } 
                    })
                    this.setState({posts: updatedPosts});
                   
                } ).catch(error=>{
                    this.setState({error: true})
                });
    }

    postSelectHandler = (id) => {
        this.setState({selectedId:id});
    }
        
    render () {       

        let Posts = <p style={{textAlign:"center"}}>Some thing wen wrong !!!!</p> 
        if(!this.state.error){
          Posts = this.state.posts.map( posts => 
            {
               return ( <Post 
                 key={posts.id}
                 title={posts.title} 
                 author={posts.author} 
                 clicked = {() => this.postSelectHandler(posts.id)}
                 />)
            });
        }

        return (
            <div>
                <section className="Posts">
                   {Posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedId} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;