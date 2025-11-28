<<<<<<< HEAD
import AppRoutes from "./routes/routes";
=======
import Layout from "./components/organisms/layout/layout";
import Routes from "./routes/routes";
>>>>>>> 03a124d306d90a69d93e5c3cb44b64e15c2682ac
import { ThemeProvider } from "./providers/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
<<<<<<< HEAD
      <AppRoutes />
=======
      <Layout>
        <Routes />
      </Layout>
>>>>>>> 03a124d306d90a69d93e5c3cb44b64e15c2682ac
    </ThemeProvider>
  );
}

export default App;
