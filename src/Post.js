import { formatISO9075,format } from 'date-fns';
import { Link } from 'react-router-dom';

export default function Post({_id,title,summary,cover,content,createdAt,author}){
          const date = new Date(createdAt);
          const formattedDate = formatISO9075(date);
    return (
        <div className="post">
        <div className="image"> 
         <Link to={`/post/${_id}`}>
         <img
            src={'https://blog-app-back-dsyd.onrender.com/'+cover}
            alt=""
          />
         </Link>
         
        </div>

        <div className="texts">
        <Link to={`/post/${_id}`}>
        <h2>{title}</h2>
         </Link>
         
          <p className="info">
            <a className="author">{author.username}</a>
            
            <time>{formattedDate}</time>
          </p>
          <p className="summary">
           {summary}
          </p>
        </div>
      </div>
    );
}