import { CSSTransition } from 'react-transition-group';
import {Contenier} from "./Contenier.jsx"
import {Chatbox} from "../Header/Chatbox.jsx"
import HomePagePost from "../pages/home/HomePagePost.jsx"
import '..//../App.css';

function MyPage({ show }) {
  return (
    <CSSTransition in={show} timeout={100} classNames="page" unmountOnExit>
      <div className="page">
        <Contenier />
        <Chatbox />
        <HomePagePost />
        </div>
    </CSSTransition>
  );
}

