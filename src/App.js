import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostList from './components/PostList';
import StoryDetail from './components/StoryDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/stories/:id" element={<StoryDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
