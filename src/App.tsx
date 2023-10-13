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
import { FavoritesPage } from "./pages/FavoritesPage/FavoritesPage";
import { CartPage } from "./pages/CartPage/CartPage";
import { ResetPassword } from "./pages/ResetPasswordPage/ResetPasswordPage";
import { NewPasswordPage } from "./pages/NewPasswordPage/NewPasswordPage";
import { AccountLayout } from "./components/AccountLayout/accountlayout";
import { Navigate } from "react-router-dom";
import {useState} from 'react';
import { useAppSelector } from "./redux/hooks";
import { selectSearchInputValue } from "./redux/books/books";

function App() { 
  //const value = useAppSelector(selectSearchInputValue);

  // const handleSearchSubmit = () => {
  //   if (value) {
  //     return <Navigate to="/books" />;
  //   }
  //   return false; 
  // };

  return (
    <Provider store={store}>
      <div className={styles.main_container}>
          <BrowserRouter>
            <Routes>
            <Route
              path="/"
              element={<Layout />}
              //handleSearchSubmit={handleSearchSubmit} 
            >
                <Route index element={<StartPage/>} />
                <Route path="/books">                 
                  <Route path=":bookid" element={<SinglePage/>} />
                  <Route path="favorites" element={<FavoritesPage/>}/>
                  <Route path="cart" element={<CartPage/>}/>
                  <Route path="account" element={<AccountPage/>}/>
                </Route>

                <Route path="/signin" element={<AccountLayout/>}>
                  <Route index element={<SignInUpPage/>} />                 
                </Route>

                <Route path="/resetPassword" element={<AccountLayout/>}>
                  <Route index element={<ResetPassword/>} /> 
                  <Route path="newPassword" element={<NewPasswordPage/>}/>                
                </Route>             
                
              </Route>          
            </Routes>
          </BrowserRouter>
      </div>
    </Provider>
  )
}

export default App
