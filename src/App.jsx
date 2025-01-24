import { useContext } from 'react';
import { AdminProvider, AdminContext } from './context/adminContext.jsx';
import { UserProvider, UserContext } from './context/userContext';
import { Route, Routes, Navigate } from 'react-router-dom';

//Users
import Home from './pages/users/home/home.jsx';
import Notes from './pages/users/notes/notes.jsx';
import ViewPdf from './pages/users/viewpdf/view.jsx';
import Register from './pages/users/register/register.jsx';
import Login from './pages/users/login/login.jsx';
import Profile from './pages/users/profile/profile.jsx';

//Admin
import ALogin from './pages/admin/login/login.jsx';
import Dashboard from './pages/admin/dashboard/dashboard.jsx';
import Course from './pages/admin/course/course.jsx';
import CourseDetail from './pages/admin/coursedetail/coursedetails.jsx';
import AddCourse from './pages/admin/addcourse/addcourse.jsx';
import AProfile from './pages/admin/profile/profile.jsx';
import ANotes from './pages/admin/notes/notes.jsx';
import AddNotes from './pages/admin/addnotes/addnotes.jsx';
import AViewPdf from './pages/admin/viewnotes/viewnotes.jsx';



function App() {
  return (
    <>
      <Routes>
        {/* user side */}
        <Route path='/*' element={
          <UserProvider>
            <UserRoutes />
          </UserProvider>
        } />

        {/* admin side */}
        <Route path='/admin/*' element={
          <AdminProvider>
            <AdminRoutes />
          </AdminProvider>
        } />
      </Routes>
    </>
  );
}

const UserRoutes = () => {

  const userContext = useContext(UserContext)

  return (
    <Routes>
      <Route path='/' element={ <Home /> } />
      <Route path='/login' element={userContext?.isAuth ? <Navigate to='/' /> : <Login />} />
      <Route path='/register' element={userContext?.isAuth ? <Navigate to='/' /> : <Register />} />
      <Route path='/profile' element={userContext?.isAuth ? <Profile /> : <Navigate to='/login' />} />
      <Route path='/notes' element={ <Notes />} />
      <Route path='/notes/view' element={ <ViewPdf /> } />
      <Route path='*' element={<Navigate to='/login' />} />
    </Routes>
  )
}


const AdminRoutes = () => {

  const adminContext = useContext(AdminContext)

  return (
    <Routes>
      <Route path='/' element={<Navigate to={'/admin/login'} />} />
      <Route path='/login' element={adminContext?.isAuth? <Navigate to={'/admin/dashboard'}/> : <ALogin />} />
      <Route path='/dashboard' element={adminContext?.isAuth? <Dashboard/> : <Navigate to={'/admin/login'}/>}  />
      <Route path='/courses' element={adminContext?.isAuth? <Course/> : <Navigate to={'/admin/login'}/>}  />
      <Route path='/courses/details/:universityId/:courseId' element={adminContext?.isAuth? <CourseDetail/> : <Navigate to={'/admin/login'}/>}  />
      <Route path='/courses/add' element={ adminContext?.isAuth? <AddCourse /> : <Navigate to={'/admin/login'}/>} />
      <Route path='/notes' element={ adminContext?.isAuth ? <ANotes /> : <Navigate to={'/admin/login'} /> } />
      <Route path='/notes/add' element={ adminContext?.isAuth ? <AddNotes/> : <Navigate to={'/admin/login'} /> }/>
      <Route path='/notes/view' element={ <AViewPdf /> } />
      <Route path='/profile' element={adminContext?.isAuth ? <AProfile /> : <Navigate to={'/admin/login'} />} />
    </Routes>
  )
}

export default App
