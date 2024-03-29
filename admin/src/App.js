import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import CreateShop from "./pages/shop/CreateShop";
import ShopList from "./pages/shop/ShopList";

import UpdateShop from "./pages/shop/UpdateShop";

import { useSelector } from "react-redux";
function App() {
  const { isAdmin } = useSelector((state) => state.user);

  return (
    <Router>
      {
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          {isAdmin ? (
            <>
              <Topbar />
              <div className="container">
                <Sidebar />

                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/users">
                  <UserList />
                </Route>
                <Route path="/user/:userId">
                  <User />
                </Route>
                <Route path="/newUser">
                  <NewUser />
                </Route>
                <Route path="/products">
                  <ProductList />
                </Route>
                <Route path="/product/:productId">
                  <Product />
                </Route>
                <Route path="/NewProduct">
                  <NewProduct />
                </Route>
                <Route path="/createshop">
                  <CreateShop />
                </Route>
                <Route path="/shoplist">
                  <ShopList />
                </Route>
                <Route path="/shop/:id">
                  <UpdateShop />
                </Route>
              </div>
            </>
          ) : (
            <Redirect to="/login" />
          )}
        </Switch>
      }
    </Router>
  );
}

export default App;
