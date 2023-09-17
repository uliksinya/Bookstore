import styles from "./App.module.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout/layout';
import { CustomInput } from "./components/CustomInput/input";
import React, { useState } from 'react';
import { StartPage } from "./pages/Start_Page/startpage";
import { Provider } from 'react-redux';
import store from "./redux/store";

function App() { 
  // const [value,setValue] = useState<string>("")
  // const toggleValue= (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setValue((newValue) => e.target.value);
  // }
  return (
    <Provider store={store}>
    <div className={styles.container}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<StartPage/>}/>
            </Route>            
          </Routes>
        </BrowserRouter>
    </div>
    </Provider>
    // <div>
    //   <CustomInput onChange={toggleValue} value={value} placeholder="Search..." inputTitle='' inputType='text' disabled={false} isValid={false} isSearchInput={true} errorText='Error text...' width="542px"/>
    // </div>
  )
}

export default App
