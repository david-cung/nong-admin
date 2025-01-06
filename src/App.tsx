import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import CreatePost from "./pages/CreatePost";
import PostList from "./pages/ListPost";
import DetailPost from "./pages/EditPost";

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
          <Route path='/create-post' element={<CreatePost />} />
          <Route path='/list-post' element={<PostList />} />
          <Route path='/edit-post/:id' element={<DetailPost />} />
        </Route>
        <Route path='/projects' element={<Projects />} />
      </Routes>
    </BrowserRouter>
  );
}
