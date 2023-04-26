import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "./Header";
import "./User.css";
import CommentIcon from '@mui/icons-material/Comment';
function User() {
  const { userId } = useParams();
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [specificpost, setPost] = useState({});

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => console.log(error));


    axios
      .get(`https://jsonplaceholder.typicode.com/comments?postId=${id}`)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => console.log(error));

      axios
      .get(`https://jsonplaceholder.typicode.com/posts?id=${id}`)
      .then((response) => {
        if (response.data.length > 0) {
          setPost(response.data[0]);
        }
      })
      .catch((error) => console.log(error));
  }, [id, userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
   
    <div className="user">
   <Header />
   <div className="wholearea">
    <br />
     <div className="card4">

      <h3>{user.name}</h3>
      <br />
      <p>{specificpost.body}</p>
      <br />
  
      
     
  
      <h4><CommentIcon  style={{position:"relative",  top:"8px", left:"10px", color:"#2e81f4"}}/></h4>
      </div>  
      <br />
    
      {posts.map((post) => (
        <div>
        <div key={post.id} className="card2"> <br />
          <p><b>{post.email}:</b>  {post.body} </p>
          
     
        </div>
        <br />
      </div>
      ))}
      
     
     
      <br />
          </div>   

    </div>
  );
}

export default User;