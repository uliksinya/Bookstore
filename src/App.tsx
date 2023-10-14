import styles from "./App.module.scss";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { StartPage } from './pages/StartPage/Startpage';
import { Provider } from 'react-redux';
import store from "./redux/store";
import { SinglePage } from "./pages/SingleBookPage/SinglePage";
import {SignInUpPage} from './pages/SignInUpPage/SignInUpPage';
import { AccountPage } from "./pages/AccountPage/AccountPage";
import { FavoritesPage } from "./pages/FavoritesPage/FavoritesPage";
import { CartPage } from "./pages/CartPage/CartPage";
import { ResetPassword } from "./pages/ResetPasswordPage/ResetPasswordPage";
import { NewPasswordPage } from "./pages/NewPasswordPage/NewPasswordPage";
import { AccountLayout } from "./components/AccountLayout/accountlayout";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";

function App() { 

  return (
    <Provider store={store}>
      <div className={styles.main_container}>
          <BrowserRouter>
            <Routes>
            <Route
              path="/"
              element={<Layout />}
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
              <Route path='*' element={<NotFoundPage/>}/>               
            </Routes>
          </BrowserRouter>
      </div>
    </Provider>
  )
}

export default App
