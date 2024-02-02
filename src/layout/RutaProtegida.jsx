import { Outlet, Navigate } from "react-router-dom";
import Header from "../components/Header";
import useAuth from "../hooks/useAuth";
import Footer from "../components/Footer";

const RutaProtegida = () => {
  const { auth, cargando } = useAuth();
  if (cargando) return "cargando...";
  return (
    <>
      <Header />

      {/* Si existe el id (usuario autenticado), muestra el outlet (contenido de cada componente) y sino lleva al usuario hacia iniciar sesion */}
      {auth?._id ? (
        <main className="container mx-auto mt-10">
          <Outlet />
        </main>
      ) : (
        <Navigate to="/" />
      )}
      <Footer />
    </>
  );
};

export default RutaProtegida;
