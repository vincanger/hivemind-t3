import Link from "next/link";
import { CgHome, CgBee, CgNotes } from "react-icons/cg";

const NavBar = () => {
  return (
    <nav className="nav">
      <div className="logo">
        <img src="waspLogo.png" alt="wasp" />
        <span style={{ fontWeight: "600", margin: "0 0.5rem" }}>HiveMind</span>
        <span style={{ fontSize: "0.8rem", fontStyle: "italic" }}>
          A Reminder App built with {""}
          <a
            href="https://wasp-lang.dev"
            target="_blank"
            rel="noreferrer"
            style={{ color: "#fc0", textDecoration: "none" }}
          >
            Wasp
          </a>
        </span>
      </div>
      <div
        className="flex flex-row items-center justify-center"
        // style={{
        //   marginLeft: "auto",
        //   marginRight: "auto",
        //   alignItems: "center",
        // }}
      >
        <Link className="nav-link" href="/">
          <CgHome />
          Home
        </Link>
        <Link className="nav-link" href="/AboutPage">
          <CgBee />
          About
        </Link>
        <Link className="nav-link" href="/TasksPage">
          <CgNotes />
          Tasks
        </Link>
      </div>
      <div style={{ textAlign: "end" }} id="github">
        <span style={{ fontSize: "0.8rem", fontStyle: "italic" }}>
          To see the source code, visit our{" "}
          <a
            href="https://github.com/wasp-lang/wasp/tree/main/examples"
            target="_blank"
            rel="noreferrer"
            style={{ color: "#fc0" }}
          >
            GitHub repo
          </a>
          .
        </span>
        <span style={{ marginLeft: "10px" }}>🚀</span>
      </div>
    </nav>
  );
};

export default NavBar;
