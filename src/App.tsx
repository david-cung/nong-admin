import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import CreateService from "./pages/CreateService";
import PostList from "./pages/ListService";
import DetailPost from "./pages/EditService";
import CreateNews from "./pages/CreateNews";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/about' element={<About />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path='/' element={<Dashboard />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/add-service' element={<CreateService />} />
          <Route path='/list-post' element={<PostList />} />
          <Route path='/edit-post/:id' element={<DetailPost />} />
          <Route path='/add-news' element={<CreateNews />} />
          <Route path='/edit-news/:id' element={<DetailPost />} />
        </Route>
        <Route path='/projects' element={<Projects />} />
      </Routes>
    </BrowserRouter>
  );
}
