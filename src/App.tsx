import styles from "./App.module.scss";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout/layout';
import { StartPage } from "./pages/Start_Page/startpage";
import { Provider } from 'react-redux';
import store from "./redux/store";
import { BooksWrapper } from "./components/BooksWrapper/BooksWrapper";
import { SinglePage } from "./pages/SingleBookPage/singlePage";

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
              </Route>            
            </Routes>
          </BrowserRouter>
      </div>
    </Provider>
  )
}

export default App
