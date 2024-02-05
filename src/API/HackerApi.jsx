import axios from "axios";
import { BASE_URL, POSTS_PER_PAGE  } from '../config'

export async function fetchTopStoryIds() {
  try {
    const response = await axios.get(`${BASE_URL}/topstories.json`);
    return response.data;
  } catch (error) {
    console.log("Error in Fetching Top Story Ids", error);
    throw error;
  }

}

export async function fetchStoriesById(storyIds){
  try{
    const limitedStoryIds= storyIds.slice(0, POSTS_PER_PAGE);
    const storyDetails= await Promise.all(limitedStoryIds.map(id =>
       axios.get(`${BASE_URL}/item/${id}.json`).then(res => res.data)
      ));
      return storyDetails;
  }catch(err){
    console.log('Error in fetching stories by ids', err);
    throw err;
  }

}
