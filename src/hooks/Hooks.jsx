import { useState, useEffect } from 'react';
import { fetchTopStoryIds, fetchStoriesById } from '../API/HackerApi';
import { POSTS_PER_PAGE } from '../config';

const useHackerNewsStories = () => {
  const [stories, setStories] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalStories, setTotalStories] = useState(0);

  useEffect(() => {
    const fetchStories = async () => {
      setLoading(true);
      setError(null);

      try {
        const storyData = await fetchTopStoryIds();
        if (!storyData.data) throw new Error('No data available');

        setTotalStories(storyData.data.length);

        const startIndex = (page - 1) * POSTS_PER_PAGE;
        const currentPageStoryIds = storyData.data.slice(startIndex, startIndex + POSTS_PER_PAGE);
        const storiesDetails = await fetchStoriesById(currentPageStoryIds);
        setStories(storiesDetails);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, [page]);

  return { loading, stories, error, page, setPage, totalStories };
};

export default useHackerNewsStories;
