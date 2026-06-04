import Nav from "./Nav";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <>
      <Nav />
      <main style={{ paddingTop: "64px", minHeight: "100vh" }}>
        {children}
      </main>
      <Footer />
    </>
  );
}
