import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

import './Home.css';

const Home = ({ setIsLogged }) => {
  const navigate = useNavigate();

  // React state
  const [userData, setUserData] = useState([]);
  const [scrollData, setScrollData] = useState([]);
  const [dataLimit, setDataLimit] = useState(40);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Function to get the user data from the given API
  const getUserData = async () => {
    if (userData.length === 0) {
      setIsLoading(true);
    }
    const userDataReq = await fetch('https://randomuser.me/api/?results=500');
    const userDataRes = await userDataReq.json();
    if (userDataRes.results) {
      const sortedUsers = userDataRes.results.sort((a, b) =>
        a.name.first > b.name.first ? 1 : b.name.first > a.name.first ? -1 : 0
      );
      if (userData.length === 0) {
        setIsLoading(false);
      }
      setUserData(sortedUsers);
      setScrollData(sortedUsers.slice(0, dataLimit));
    } else {
      alert('Error occured while fetching user data!');
    }
  };

  const handleScrollData = () => {
    if (scrollData.length >= 500) {
      setHasMore(false);
    } else {
      setTimeout(() => {
        setScrollData(userData.slice(0, dataLimit + 40));
        setDataLimit((prev) => prev + 40);
      }, 1000);
    }
  };

  const handleLogout = () => {
    setIsLogged(false);
    setUserData([]);
    navigate('/login');
  };

  useEffect(() => {
    if (userData.length === 0) {
      getUserData();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <nav className="nav-bar">
        <h2 style={{ margin: ' 0 0 0 0.5em', padding: '1%', fontSize: '2em' }}>
          Contact
        </h2>
        <Button
          style={{
            backgroundColor: 'lightskyblue',
            color: 'black',
            fontWeight: 'bold',
            margin: '0 1em 0 0',
          }}
          variant="contained"
          size="small"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </nav>
      {isLoading ? (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translate(-50%,0)',
            top: '25em',
            textAlign: 'center',
          }}
        >
          <CircularProgress />
          <p>Loading...</p>
        </div>
      ) : (
        <div className="contact-list-container">
          <InfiniteScroll
            dataLength={scrollData.length}
            next={handleScrollData}
            hasMore={hasMore}
            loader={
              <div
                style={{
                  position: 'absolute',
                  bottom: '2em',
                  left: '50%',
                  transform: 'translate(-50%,0)',
                  marginTop: '1em',
                }}
              >
                <CircularProgress />
              </div>
            }
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>You have seen all the updated users !</b>
              </p>
            }
          >
            <Grid container spacing={2}>
              {scrollData.sort().map((i, j) => {
                return (
                  <Grid item xs={12} sm={6} md={4}>
                    <div className="contact-card">
                      <p>{`${i.name.first} ${i.name.last}`}</p>
                      <img src={i.picture.thumbnail} alt="User pic" />
                    </div>
                  </Grid>
                );
              })}
            </Grid>
          </InfiniteScroll>
        </div>
      )}
    </div>
  );
};

export default Home;
