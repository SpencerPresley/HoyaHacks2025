import './page.css'; 
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Login Form</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* Header */}
      <header>
        <nav>
          <div className="logo">
            <h2>Logo</h2>
          </div>
          <ul>
            <li>
              <a href="">Home</a>
            </li>
            <li>
              <a href="">About</a>
            </li>
            <li>
              <a href="">Services</a>
            </li>
            <li>
              <a href="">Contact</a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main>
        <section className="hero">
          <div className="content">
            <h1>Resume Name Welcome</h1>
            <p>Get the best resume. Sign up today and start achieving your dream job goals</p>
          </div>
        </section>

        {/* Login Form */}
        <form className="login-form">
          <h2>Login Form</h2>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" placeholder="Enter your username" />

          <label htmlFor="password">Password:</label>
          <input type="password" name="password" placeholder="Enter your password" />

          <button type="submit">Login</button>
        </form>
      </main>
    </>
  );
}
