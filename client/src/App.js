import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import ProfileCard from './components/ProfileCard';
import Login from './components/form/Login';
import Register from './components/form/Register';
import Result from './components/Result';
import AboutUs from './components/AboutUs';
import TermsConditions from './components/TermsConditions';
import ElectionInfo from './components/ElectionInfo';
import AdminDashboard from './components/Admin/AdminDashboard';
import MediaPage from './components/Media/MediaPage';
import PostForm from './components/Media/Postform';
import Post from './components/Media/Post';
import ManageElections from './components/Admin/ManageElections';
import VotePage from './components/VotePage';
import ElectionForm from './components/Admin/ElectionForm';
import ManageUsers from './components/Admin/ManageUsers'; // Import the new component
import UpdateProfile from './components/UpdateProfile';






function App() {
  return (
    <div className="App">
      <BrowserRouter>
    

        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="profile" element={<ProfileCard />} />
            <Route path="form/login" element={<Login />} />
            <Route path="form/register" element={<Register />} />
            <Route path="Result" element={<Result />} />
            <Route path="AboutUs" element={<AboutUs/>}/>
            <Route path="TermsConditions" element={<TermsConditions/>}/>
            <Route path="ElectionInfo" element={<ElectionInfo/>}/>
            <Route path="AdminDashboard" element={<AdminDashboard/>}/>
            <Route path="Mediapage" element={<MediaPage/>}/>
            <Route path="PostForm" element={<PostForm/>}/>
            <Route path='Post' element={<Post/>}/>
         
            <Route path="/manage-elections" element={<ManageElections />} />
            <Route path="/vote/general-election" element={<VotePage electionName="General Election" />} />
            <Route path="/vote/local-election" element={<VotePage electionName="Local Elections" />} />
            <Route path="/add-election" element={<ElectionForm />} />
            <Route path="/manage-users" element={<ManageUsers />} /> 

            <Route path="/UpdateProfile" element={<UpdateProfile/>}/>


            
          </Route>
        </Routes>
      

      </BrowserRouter>
    </div>
  );
}

export default App;
