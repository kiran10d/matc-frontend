import Dashboard from "../components/Dashboard";
import Products from "../components/Products";
import Orders from "../components/Orders";
import Customers from "../components/Customers";
import Categories from "../components/Categories";
import Settings from "../components/Settings";

export const Router = [
  {
    path: '/',
    element: <Dashboard />,
  },
  {
    path: '/products',
    element: <Products />,
  },
  {
    path: '/orders',
    element: <Orders />,
  },
  {
    path: '/customers',
    element: <Customers />,
  },
  {
    path: '/categories',
    element: <Categories />,
  },
  {
    path: '/settings',
    element: <Settings />,
  },
];

export default Router;
