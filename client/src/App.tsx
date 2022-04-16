import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { createClient, dedupExchange, fetchExchange, Provider } from "urql";
import AdminHome from "./admin/pages/AdminHome";
import AdminProduct from "./admin/pages/AdminProduct";
import NewProduct from "./admin/pages/NewProduct";
import NewUser from "./admin/pages/NewUser";
import ProductList from "./admin/pages/ProductList";
import User from "./admin/pages/User";
import UserList from "./admin/pages/UserList";
import "./App.scss";
import About from "./components/About";
import Cart from "./components/Cart";
import ChangePassword from "./components/ChangePassword";
import Contact from "./components/Contact";
import ForgotPassword from "./components/ForgotPassword";
import Home from "./components/Home";
import Login from "./components/Login";
import Product from "./components/Product";
import Register from "./components/Register";
import ResetPassword from "./components/ResetPassword";
import Shop from "./components/Shop";
import Success from "./components/Success";
import ScrollToTop from "./ScrollToTop";

const client = createClient({
  url: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include" as const,
  },
  exchanges: [dedupExchange, fetchExchange],
});

function App() {
  return (
    <Provider value={client}>
      <BrowserRouter>
        <ScrollToTop />
        <Switch>
          <Route component={Home} path="/" exact />
          <Route component={Shop} path="/shop" />
          <Route component={About} path="/about" />
          <Route component={Cart} path="/cart" />
          <Route component={Contact} path="/contact" />
          <Route component={Product} path="/product/:id" />
          <Route component={Success} path="/success" />
          <Route component={Login} path="/login">
            {/* {isAuthenticated ? <Redirect to="/" /> : <Login />} */}
          </Route>
          <Route component={Register} path="/register">
            {/* {isAuthenticated ? <Redirect to="/" /> : <Register />} */}
          </Route>
          <Route component={ResetPassword} path="/passwordreset/:resetToken" />
          {/* {isAuthenticated ? <Redirect to="/" /> : <ResetPassword />}
        </Route> */}
          <Route component={ForgotPassword} path="/forgotpassword">
            {/* {isAuthenticated ? <Redirect to="/" /> : <ForgotPassword />} */}
          </Route>
          <Route component={ChangePassword} path="/changepassword">
            {/* {isAuthenticated ? <ChangePassword /> : <Redirect to="/" />} */}
          </Route>
          <Route
            path="/admin/"
            render={({ match: { url } }: any) => (
              <>
                <Route path={`${url}/`} component={AdminHome} exact />
                <Route path={`${url}/users`} component={UserList} exact />
                <Route path={`${url}/user/:userId`} component={User} exact />
                <Route path={`${url}/newUser`} component={NewUser} exact />
                <Route path={`${url}/products`} component={ProductList} exact />
                <Route
                  path={`${url}/product/:productId`}
                  component={AdminProduct}
                  exact
                />
                <Route
                  path={`${url}/newProduct`}
                  component={NewProduct}
                  exact
                />
              </>
            )}
          />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
