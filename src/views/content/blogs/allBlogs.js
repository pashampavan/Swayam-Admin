import { Button, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Thumbnail from './thumbnail';
import apiServices from '../../../services/apiServices';

const AllBlogs = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState({});
  const fetchBlogs = async () => {
    try {
      const response = await apiServices.fetchAllBlogs();
      // const response = await axios.get('https://swayam-website-d9b3d-default-rtdb.asia-southeast1.firebasedatabase.app/blogs.json');
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const blogIds = Object.keys(blogs);

  return (
    <>
      <div style={{ width: "80%", margin: '50px auto' }}>
        <div style={{ width: "100%", display: 'flex', justifyContent: 'space-between' }}>
          <h1>All Blogs</h1>
          <Button
            variant="contained"
            size="small"
            onClick={() => { navigate(`/content/add-edit-blog/${'b1'}`) }}
            style={{fontSize:"30px"}}
          >+</Button>
        </div>

        <div style={{ width: "100%", margin: '25px auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
          {blogIds.map((blogId) => {
            const blog = blogs[blogId];
            return (
              <div key={blogId}>
                <Thumbnail
                  date={blog.blogdate}
                  title={blog.blogtitle}
                  description={blog.blogdescription}
                  thumbnail={blog.blogthumbnail}
                  id={blogId} />
                
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AllBlogs;
