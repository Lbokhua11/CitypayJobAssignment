import React from 'react'
import "./Post.css";
import { useState, useEffect } from "react";
import axios from "axios";
import CommentIcon from '@mui/icons-material/Comment';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from "react-router-dom";

function Post() {
  const [originalUsers, setOriginalUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [comms, setComms] = useState([]);
  const [name, setUserName] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    setIsLoading(true); 

    axios.all([
      axios.get('https://jsonplaceholder.typicode.com/posts'),
      axios.get('https://jsonplaceholder.typicode.com/users'),
      axios.get('https://jsonplaceholder.typicode.com/comments')
    ]).then(axios.spread((postsResponse, usersResponse, commentsResponse) => {
        console.log(postsResponse.data);
        setOriginalUsers(postsResponse.data);
        setUsers(postsResponse.data.slice(0, 20));
        console.log(usersResponse.data);
        setUserName(usersResponse.data);
        console.log(commentsResponse.data);
        setComms(commentsResponse.data);
        setIsLoading(false);
    })).catch((error) => {
        console.log(error);
        setIsLoading(false); 
    });
  }, []);
  // Author's Picture საერთოდ ვერ ვიპოვე API ში მგონი მხოლოდ პოსტების ფოტოები იყო
  // User page-ზე გადასასვლელად ვაჭერთ კომენტარს ან მის რაოდენობას
  // Fake Api რადგანაა Jsonplaceholder ზე ვერ შევძელი ისე წამეშალა პოსტები რომ დარეფრეშების შემდეგ არ დაბრუნებულიყო
  function handleDelete(id) {
    axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => {
        console.log(response.data);
        const updatedUsers = originalUsers.filter((user) => user.id !== id);
        setOriginalUsers(updatedUsers);
        setUsers(updatedUsers.slice(0, 20));
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className='post'>
      <div className='posts'>
        {isLoading ? (
          <div>Loading...</div> // თუ Data აგვიანებს ვეძახით Loader-ს
        ) : (
          <>
            <br />
            {users.map((user, key) => (
              <div className='head' key={key}>
                
                <div className='card3'>
                  <div className='trashcan'>
                    <DeleteIcon onClick={() => handleDelete(user.id)} style={{position:"relative", left:"40%", top:"30px", color: "red", cursor: "pointer"}} />
                 
                  </div>
                  <Link to={`/User/${user.userId}/${user.id}`} className='link'>
                  <h3>{name.find((n) => n.id === user.userId)?.name}</h3>
                  <br />
                  <p className='small'>
                    Title: <em>{user.title}</em>
                  </p>
                  <br />
                  <p className='small'>{user.body}</p>
                  <br />
                  
                    <br />
                    <p>
                      {comms.filter((comm) => comm.postId === user.id).length}
                      <CommentIcon  style={{position:"relative",  top:"8px", left:"10px"}}/>
                     
                    </p>
                    </Link>
                </div>
               
                <br />
              </div>
            ))}
            <br />
          </>
        )}
      </div>
    </div>
  );
}

export default Post;