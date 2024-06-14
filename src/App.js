import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import TestPage from "./pages/test";
import Clients from "./pages/sales/client/Clients";
import React from "react";
import ProtectedRoute from "./components/router/ProtectedRoute";
import ClientDetail from "./pages/sales/client/ClientDetail";
import Products from "./pages/inventory/product/Products";
import AuthLayout from "./layouts/AuthLayout";
import LogIn from "./pages/auth/LogIn";
import InventoryMaterailAnalyze from "./pages/inventory/material/InventoryMaterailAnalyze";
import Specs from "./pages/inventory/material/Specs";
import MaterialInStock from "./pages/inventory/material/MaterialInStock";
import MaterialStocks from "./pages/inventory/material/MaterialStocks";
import MaterialOrders from "./pages/purchase/material/MaterialOrders";
import MaterialClients from "./pages/purchase/material/MaterialClients";
import Estimates from "./pages/sales/estimate/Estimates";
import EstimateDetail from "./pages/sales/estimate/EstimateDetail";
import Orders from "./pages/sales/order/Orders";
import OrderDetail from "./pages/sales/order/OrderDetail";
import ProductDetail from "./pages/inventory/product/ProductDetail";
import Release from "./pages/inventory/release/Release";
import SpecDetail from "./pages/inventory/material/SpecDetail";
import MaterialClientDetail from "./pages/purchase/material/MaterialClientDetail";
import MaterialOrderDetail from "./pages/purchase/material/MaterialOrderDetail";
import StockDetail from "./pages/inventory/material/StockDetail";
import Returns from "./pages/sales/return/Returns";
import ReturnDetail from "./pages/sales/return/ReturnDetail";
import Warehouses from "./pages/inventory/warehouse/Warehouses";
import MaterialUsages from "./pages/production/material/MaterialUsages";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {setRedirectPath} from "./modules/NavigationModules";
import WorkOrders from "./pages/production/workOrder/WorkOrders";
import Plans from "./pages/production/plan/Plans";

function App() {
    const redirectPath = useSelector(state => state.navigationReducer);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        if (redirectPath) {
            navigate(redirectPath);
            dispatch(setRedirectPath(null));
        }
    }, [redirectPath, dispatch, navigate]);

    return (

          <Routes>
              <Route path="/" element={<AdminLayout/>}>
                  <Route index element={<ProtectedRoute loginCheck={true}><TestPage/></ProtectedRoute>}/> {/* 나중에 Main 컴포넌트 만들면 그걸로 바꿔주삼 */}
                  <Route path="sales">
                      <Route path="client">
                          <Route index element={<ProtectedRoute loginCheck={true}><Clients/></ProtectedRoute>}/>
                          <Route path="detail" element={<ProtectedRoute loginCheck={true}><ClientDetail/></ProtectedRoute>}/>
                      </Route>
                      <Route path="estimate">
                          <Route index element={<ProtectedRoute loginCheck={true}><Estimates/></ProtectedRoute>}/>
                          <Route path="detail" element={<ProtectedRoute loginCheck={true}><EstimateDetail/></ProtectedRoute>}/>
                      </Route>
                      <Route path="order">
                          <Route index element={<ProtectedRoute loginCheck={true}><Orders/></ProtectedRoute>}/>
                          <Route path="detail" element={<ProtectedRoute loginCheck={true}><OrderDetail/></ProtectedRoute>}/>
                      </Route>
                      <Route path="return">
                          <Route index element={<ProtectedRoute loginCheck={true}><Returns/></ProtectedRoute>}/>
                          <Route path="detail" element={<ProtectedRoute loginCheck={true}><ReturnDetail/></ProtectedRoute>}/>
                      </Route>
                  </Route>
                  <Route path="inventory">
                      <Route path="product">
                          <Route index element={<Products/>}/>
                          <Route path=":productCode" element={<ProductDetail/>}/>
                      </Route>
                      <Route path="warehouse">
                          <Route index element={<Warehouses/>}/>
                          <Route path="detail" element={<ProtectedRoute loginCheck={true}><ClientDetail/></ProtectedRoute>}/>
                      </Route>
                      <Route path="material">
                          <Route path="analyze" element={<InventoryMaterailAnalyze/>}/>
                          <Route path="in-stock" element={<MaterialInStock/>}/>
                          <Route path="Specs">
                              <Route index element={<Specs/>}/>
                              <Route path=":id" element={<SpecDetail/>}/>
                          </Route>
                          <Route path="stocks" >
                              <Route index element={<MaterialStocks/>}/>
                              <Route path=":id" element={<StockDetail/>}/>
                          </Route>
                      </Route>
                  </Route>
                  <Route path="purchase">
                      <Route path="material">
                          <Route path="orders" >
                              <Route index element={<MaterialOrders/>}/>
                              <Route path=":id" element={<MaterialOrderDetail/>}/>
                          </Route>
                          <Route path="clients" >
                              <Route index element={<MaterialClients/>}/>
                              <Route path=":id" element={<MaterialClientDetail/>}/>
                          </Route>
                      </Route>
                  </Route>
                  <Route path="production">
                      <Route path="material">
                          <Route path="usage" element={<MaterialUsages/>}/>
                      </Route>
                  </Route>
                  <Route path="circulation">
                      <Route path="release">
                          <Route index element={<Release/>}/>
                      </Route>
                  </Route>
                  <Route path="production">
                      <Route path="work-order">
                          <Route index element={<WorkOrders/>}/>
                      </Route>
                      <Route path="plan">
                          <Route index element={<Plans/>}/>
                      </Route>
                  </Route>
                  </Route>
              <Route path="/login" element={<AuthLayout/>}>
                  <Route index element={<ProtectedRoute loginCheck={false}><LogIn/></ProtectedRoute>}/>
              </Route>
              <Route path="*" element={ <TestPage/> }/> {/* Error 컴포넌트 만들면 그걸로 바꿔주삼 */}
          </Routes>

  );
}

export default App;
