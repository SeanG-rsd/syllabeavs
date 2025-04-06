import Header from "./components/sections/Header";
import Signin from "./components/auth/login/index";

export default function Home() {
  return (
    <section className="flex w-screen h-screen absolute inset-0 -z-10 items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#AF2C00_100%)]">
      <Header />
      <Signin/>
    </section>
  );
}
