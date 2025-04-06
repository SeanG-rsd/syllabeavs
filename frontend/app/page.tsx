import Navigation from "./components/Navigation";
import Header from "./components/sections/Header";

export default function Home() {
  return (
    <section className="w-screen h-screen m-auto absolute inset-0 -z-10 items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#AF2C00_100%)]">
      <Navigation/>
      <Header />
    </section>
  );
}
