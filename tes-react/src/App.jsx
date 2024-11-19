import { HomePage } from "./pages/HomePages";
import { CartPage } from "./pages/CartPage";
import { Routes, Route, useLocation } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { NotFoundPage } from "./pages/NotFoundPage";
import { NewLoginPage } from "./pages/NewLoginPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { ProductMManagementPage } from "./pages/admin/ProductManagementPage";
import { CreateProductPage } from "./pages/admin/CreateProductPage";
import { EditProductPage } from "./pages/admin/EditProductPage";
import { RegisterPage } from "./pages/RegisterPage";
import { useHydration } from "./hooks/useHydration";
import { HistoryPage } from "./pages/HistoryPage";
import { HistoryDetailPage } from "./pages/HistoryDetailPage";

function App() {
  const location = useLocation();

  //Hydrate is used to ensure that every user’s username remains set on the page even after closing or reloading it
  const { hydration } = useHydration();

  if (!hydration) {
    return <p>loading..</p>;
  }

  return (
    <>
      {!location.pathname.includes("/admin") ? <Header /> : null}

      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/cart" Component={CartPage} />
        <Route path="/login2" Component={NewLoginPage} />
        <Route path="/register" Component={RegisterPage} />
        <Route path="/productdetail/:productId" Component={ProductDetailPage} />
        <Route path="/history" Component={HistoryPage} />
        <Route path="/history/:transactionId" Component={HistoryDetailPage} />

        <Route path="/admin">
          <Route path="products" Component={ProductMManagementPage} />
          <Route path="products/create" Component={CreateProductPage} />
          <Route path="products/edit/:productId" Component={EditProductPage} />
        </Route>
        <Route path="*" Component={NotFoundPage} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
