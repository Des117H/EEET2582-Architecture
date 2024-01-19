<div className="login-form">
          <div style={{ display: showLoginForm ? "block" : "none" }}>
            <h1 className="text-center mb-4 title">LOGIN</h1>
            <form id="loginForm">
              <div className="mb-3">
                <label for="loginEmail" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="loginEmail"
                  required
                />
              </div>
              <div className="mb-3">
                <label for="loginPassword" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="loginPassword"
                  required
                />
              </div>
              <Button  type="submit" className="btn btn-primary" onClick={() => SignInOptions("Email")}>
                Login
              </Button>
            </form>
          </div>
          <div className="signup-form" style={{ display: showSignUpForm ? "none" : "block" }}>
            <h2 className="text-center mb-4 title">SIGN UP</h2>

            <form >
              <div className="mb-3">
                <label for="signupEmail" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="signupEmail"
                  required
                />
              </div>
              <div className="mb-3">
                <label for="signupPassword" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="signupPassword"
                  required
                />
              </div>
              <Button variant="contained" color="primary" type="submit" className="btn btn-success btn_secondary">
                Sign Up
              </Button>
            </form>
          </div>

          <p className="text-center mt-3">
            Don't have an account?
            <Button variant="contained" color="secondary" onClick={() => toggleSignup()}>Sign Up</Button>
          </p>
        </div>