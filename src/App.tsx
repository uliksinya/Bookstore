import styles from "./App.module.scss";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { StartPage } from './pages/StartPage/Startpage';
import { Provider } from 'react-redux';
import store from "./redux/store";
import { BooksWrapper } from "./components/BooksWrapper/BooksWrapper";
import { SinglePage } from "./pages/SingleBookPage/SinglePage";
import {SignInUpPage} from './pages/SignInUpPage/SignInUpPage';
import { AccountPage } from "./pages/AccountPage/AccountPage";

function App() { 
  return (
    <Provider store={store}>
      <div className={styles.main_container}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route path="/books" element={<BooksWrapper/>}>
                  <Route index element={<StartPage/>} />
                  <Route path=":bookid" element={<SinglePage/>} />
                </Route>
                <Route path="/signup" element={<SignInUpPage/>}></Route>
                <Route path="/account" element={<AccountPage/>}></Route>
              </Route>            
            </Routes>
          </BrowserRouter>
      </div>
    </Provider>
  )
}

export default App
