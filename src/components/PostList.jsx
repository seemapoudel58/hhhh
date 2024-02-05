import React from 'react';
import { useNavigate } from 'react-router-dom';
import useHackerNewsStories from '../hooks/Hooks';
import { Skeleton } from '@mui/material';
import { AiOutlineStar, AiOutlineUser, AiOutlineComment, AiOutlineClockCircle } from 'react-icons/ai';
import { POSTS_PER_PAGE } from '../config';



const PostList = () => {
  const navigate = useNavigate();
  const { loading, stories, error, page, setPage, totalStories } = useHackerNewsStories();

  // Handle errors gracefully
  if (error) {
    return <div>Error fetching stories: {error}</div>;
  }

  // Skeleton loader
  const renderSkeletons = () => {
    return Array.from(new Array(POSTS_PER_PAGE)).map((_, index) => (
      <div key={index} className="post-item-skeleton">
        <Skeleton variant="text" width="80%" />
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="circle" width={40} height={40} />
        <Skeleton variant="rectangular" width="100%" height={118} />
      </div>
    ));
  };

  // Display loading indicator or skeleton loader while fetching data
  if (loading) {
    return <div>{renderSkeletons()}</div>;
  }

  return (
    <div>
      {stories.map((story) => (
        <div key={story.id} className="post-item" onClick={() => navigate(`/story/${story.id}`)}>
          <div className="post-title">{story.title}</div>
          <div className="post-details">
          <span><AiOutlineStar className="icon" /> {story.score} </span> 
            <span><AiOutlineUser className="icon" /> by {story.by}</span>
            <span className="post-comments-count"><AiOutlineComment className="icon" /> {story.kids ? story.kids.length : 0} comments</span>
            <span><AiOutlineClockCircle className="icon" /> {(new Date(story.time * 1000)).toLocaleString()}</span>
          </div>
        </div>
      ))}


      {totalStories > POSTS_PER_PAGE && (
        <div className="pagination">
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
          <span>{page} of {Math.ceil(totalStories / POSTS_PER_PAGE)}</span>
          <button disabled={page === Math.ceil(totalStories / POSTS_PER_PAGE)} onClick={() => setPage(page + 1)}>Next</button>
        </div>
      )}
    </div>
  );
};

export default PostList;
