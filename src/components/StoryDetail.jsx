import React from 'react';
import { useParams } from 'react-router-dom';
import useHackerNewsStories from '../hooks/Hooks';
import { AiOutlineStar, AiOutlineUser, AiOutlineComment, AiOutlineClockCircle } from 'react-icons/ai';

const StoryDetail = () => {
  const { storyId } = useParams(); 
  const { story, loading, error } = useHackerNewsStories(storyId);

  if (loading) return <div>Loading story details...</div>;
  if (error) return <div>Error fetching story: {error}</div>;

  return (
    <div>
      {story && (
        <article>
          <h2>{story.title}</h2>
          <div>
            <span><AiOutlineUser /> by {story.by}</span>
            <span><AiOutlineClockCircle /> {new Date(story.time * 1000).toLocaleString()}</span>
            <span><AiOutlineStar /> {story.score} points</span>
            {story.kids && <span><AiOutlineComment /> {story.kids.length} comments</span>}
          </div>
          <p>{story.text}</p>
         
        </article>
      )}
    </div>
  );
};

export default StoryDetail;
