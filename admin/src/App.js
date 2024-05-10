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
import CreateOwner from "./pages/ShopOwner/CreateOwner";
import OwnerList from "./pages/ShopOwner/OwnerList";
import UpdateOwner from "./pages/ShopOwner/UpdateOwner";

import UpdateShop from "./pages/shop/UpdateShop";
import CustomerSupportList from "./pages/CustomerSupport/CustomerSupportList";
import CustomerSupportEdit from "./pages/CustomerSupport/CustomerSupportEdit"
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
                <Route path="/createowner">
                  <CreateOwner />
                </Route>
                <Route path="/ownerlist">
                  <OwnerList />
                </Route>
                <Route path="/owner/:id">
                  <UpdateOwner />
                </Route>
                <Route path="/customerSupportList">
                  <CustomerSupportList />
                </Route>
                <Route path="/customerSupportList/:id">
                  <CustomerSupportEdit />
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
