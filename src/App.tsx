import React, {useState} from 'react';
import './App.css';
import axios from 'axios';

interface IPost {
  id: number;
  userId?: number;
  title: string;
  body: string;
}

const defaultPosts:IPost[] = [];

const App = () => {

const [posts, setPosts]: [IPost[], (posts: IPost[]) => void] = React.useState(defaultPosts);
const [loading, setLoading]: [boolean, (loading: boolean) => void] = React.useState<boolean>(true);
const [error, setError]: [string, (error: string) => void] = React.useState("");

React.useEffect(() => {
  axios
      .get<IPost[]>("https://jsonplaceholder.typicode.com/posts") 
        .then(response => {
          console.log(response.data);
          setPosts(response.data);
          setLoading(false);
        });
    }, []);

  return (
    <div className="App">
     <ul className="posts">
       {posts.map((post) => (
        <li key={post.id}>
          <h2>{post.id}</h2>
         <h3>{post.title}</h3>
         <p>{post.body}</p>
        </li>
      ))}
     </ul>
     {error && <p className="error">{error}</p>}
   </div>
   );
}
export default App;
