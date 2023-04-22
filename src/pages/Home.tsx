import React, { FC, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';


const Home: FC= () => {
    const navigate = useNavigate()

       useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (!user) {
                navigate('/')
            }
        })
    },[])

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                navigate('/')
            }).catch((error) => {
                alert('can not')
            });
    }
  return (
    <>
      <Button onClick={handleSignOut}>Welcome </Button>
    </>
  );
};

export default Home;