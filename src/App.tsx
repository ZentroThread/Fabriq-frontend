import Layout from "./components/organisms/layout/layout";
import Routes from "./routes/routes";
import { ThemeProvider } from "./providers/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Layout>
        <Routes />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
