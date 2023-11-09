import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from '../screens/home/Home.jsx'
// import BookDetail from "./BookDetail.jsx"

function Router() {
    return <BrowserRouter>
        <Routes>
            <Route element={<Home />} path='/'/>
            {/* <Route element={<BookDetail />} path='/book/:id'/> */}
            <Route element={<div>Вибачте, щось пішло не так.</div>} path='*'/>
        </Routes>
    </BrowserRouter>
}

export default Router