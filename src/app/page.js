<<<<<<< Updated upstream
'use client';

import { useEffect } from "react";
import './page.css'; 
import Head from "next/head";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGooglePlusG, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;
=======
import './page.css'; 
import Head from "next/head";
>>>>>>> Stashed changes

export default function Home() {
  useEffect(() => {
    const container = document.getElementById("container");
    const overlayBtn = document.getElementById("overlayBtn");
  
    if (overlayBtn) {
      overlayBtn.addEventListener("click", () => {
        container?.classList.toggle("right-panel-active");
      });
    }
  
    return () => {
      if (overlayBtn) {
        overlayBtn.removeEventListener("click", () => {
          container?.classList.toggle("right-panel-active");
        });
      }
    };
  }, []);
  return (
    <>
      <Head>
<<<<<<< Updated upstream
        <title>Sign in || Sign up form</title>
      </Head>

      <div className="container" id="container">
        <div className="form-container sign-up-container">
          <form action="#">
            <h1>Create Account</h1>
            <div className="social-container">
              <a href="#" className="social">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="#" className="social">
                <FontAwesomeIcon icon={faGooglePlusG} />
              </a>
              <a href="#" className="social">
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
            </div>
            <span>or use your email for registration</span>
            <div className="infield">
              <input type="text" placeholder="Name" />
              <label></label>
            </div>
            <div className="infield">
              <input type="email" placeholder="Email" name="email" />
              <label></label>
            </div>
            <div className="infield">
              <input type="password" placeholder="Password" />
              <label></label>
            </div>
            <button>Continue</button>
          </form>
        </div>

        <div className="form-container sign-in-container">
          <form action="#">
            <h1>Sign in</h1>
            <div className="social-container">
              <a href="#" className="social">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="#" className="social">
                <FontAwesomeIcon icon={faGooglePlusG} />
              </a>
              <a href="#" className="social">
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
            </div>
            <span>or use your account</span>
            <div className="infield">
              <input type="email" placeholder="Email" name="email" />
              <label></label>
            </div>
            <div className="infield">
              <input type="password" placeholder="Password" />
              <label></label>
            </div>
            <a href="#" className="forgot">
              Forgot your password?
            </a>
            <button>Sign In</button>
          </form>
        </div>

        <div className="overlay-container" id="overlayCon">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button>Sign In</button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start building your best resume!</p>
              <button>Sign Up</button>
            </div>
          </div>
          <button id="overlayBtn"></button>
        </div>
      </div>
=======
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
>>>>>>> Stashed changes
    </>
  );
}
