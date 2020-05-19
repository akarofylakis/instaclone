import React from 'react';
import { Link } from 'react-router-dom';

import Avatar from '../Avatar/Avatar';

import './LeftNav.scss';

const LeftNav = () => {
  return (
    <React.Fragment>
      <nav className='leftNav'>
        <div className='leftNav__logo-container'>
          <Link to='/'>
            <div className='leftNav__logo-image'></div>
          </Link>
        </div>
        <div className='leftNav__profile-container'>
          <Avatar
            size={100}
            source='https://images.unsplash.com/photo-1518157542428-1be9739022f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'
          />

          <h3>Amanda Jones</h3>
          <h6>@amanjonae_</h6>
        </div>
        <div className='leftNav__user-info-container'>
          <div className='leftNav__user-info-posts'>
            <h5>122</h5>
            <h6>Posts</h6>
          </div>
          <div className='leftNav__user-info-followers'>
            <h5>1.8k</h5>
            <h6>Followers</h6>
          </div>
          <div className='leftNav__user-info-following'>
            <h5>203</h5>
            <h6>Following</h6>
          </div>
        </div>
        <ul className='leftNav__navigation-container'>
          <li className='leftNav__navigation-link active'>
            <Link to='/'>
              <img
                alt='feed'
                src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAAoUlEQVQ4jcXPMQ4BURSF4c+EWiKiVKgUKo3SDmYDOq1OYwsapRXYjEavUUhEtKopn+ZJJjIYROYkt7j3nP+9e/mzxrG+UopLrPRTeBLBEYY4Y1oWnuGEQW7WxxHzd/ACB/QKvC72WBaBNaywQ+fFBy1ssUZyHzawQUDz3YoxEyLTqKONLJrXXDAUbJnPZJF9CoQyXuJHVf9A/aF/vLWsV6FuoTcdF5pGxpQAAAAASUVORK5CYII='
              />
              <h5>Feed</h5>
            </Link>
          </li>
          <li className='leftNav__navigation-link'>
            <Link to='/messages'>
              <img
                alt='messages'
                src='data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDUxMS44MDMgNTExLjgwMyIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTExLjgwMyA1MTEuODAzOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNNTEwLjk4MSwyNi40MTdjLTAuMDMyLTAuMDk2LTAuMDMyLTAuMjI0LTAuMDY0LTAuMzUyYy0wLjc2OC0xLjk1Mi0xLjg4OC0zLjgwOC0zLjQ1Ni01LjQwOCAgICBjLTAuMjg4LTAuMjg4LTAuNjQtMC4zODQtMC45MjgtMC42NGMtMC4yMjQtMC4xOTItMC4yNTYtMC40OC0wLjQ4LTAuNjcyYy0wLjQxNi0wLjMyLTAuOTI4LTAuMzItMS4zNzYtMC42MDggICAgYy0xLjYtMS4wNTYtMy4yNjQtMS43OTItNS4wNTYtMi4yMDhjLTAuNzA0LTAuMTYtMS4zNDQtMC4zNTItMi4wOC0wLjQxNmMtMi41MjgtMC4yNTYtNS4wODgtMC4wNjQtNy40ODgsMC44OTZsLTQ4MCwxOTEuOTY4ICAgIGMtNS45MiwyLjMzNi05Ljg4OCw4LTEwLjA0OCwxNC40Yy0wLjE2LDYuNCwzLjQ4OCwxMi4yNTYsOS4zMTIsMTQuOTQ0bDE4Mi42ODgsODQuMzJ2MTU3LjE1MmMwLDcuMTY4LDQuNzY4LDEzLjQ3MiwxMS42NDgsMTUuMzkyICAgIGMxLjQ0LDAuNDE2LDIuOTEyLDAuNjA4LDQuMzUyLDAuNjA4YzUuNDcyLDAsMTAuNjU2LTIuODE2LDEzLjYzMi03LjYxNmw3Mi41NzYtMTE4LjMzNmwxMzEuMTA0LDYwLjUxMiAgICBjMi4xMTIsMC45MjgsNC40MTYsMS40NCw2LjY4OCwxLjQ0YzIuNTkyLDAsNS4xNTItMC42NCw3LjQ4OC0xLjg1NmM0LjQxNi0yLjMzNiw3LjQ4OC02LjU5Miw4LjI4OC0xMS41Mmw2NC0zODMuOTY4ICAgIGMwLjA2NC0wLjMyLTAuMTI4LTAuNjA4LTAuMDk2LTAuOTI4QzUxMS45NDEsMzEuMTIxLDUxMS44MTMsMjguNzIxLDUxMC45ODEsMjYuNDE3eiBNMjA0LjcwOSwyOTMuMjY1TDU2LjQ1MywyMjQuODQ5ICAgIEw0MjcuMDc3LDc2LjYyNUwyMDQuNzA5LDI5My4yNjV6IE0yMjQuMDA1LDQyMy4xMjF2LTg1LjY5Nmw0MC45MjgsMTguOTEyTDIyNC4wMDUsNDIzLjEyMXogTTQxOS42ODUsMzkyLjQ2NWwtMTgzLjg0LTg0LjgzMiAgICBMNDcyLjE5Nyw3Ny4zNjFMNDE5LjY4NSwzOTIuNDY1eiIgZmlsbD0iIzAwMDAwMCIvPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo='
              />
              <h5>Messages</h5>
              <h6>1</h6>
            </Link>
          </li>
          <li className='leftNav__navigation-link'>
            <Link to='/user'>
              <img
                alt='profile'
                src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAEnUlEQVRoge2ZW4hVVRjHf2dujqZCyiTazFCEUeEtfFBxhsoaJR/qpRvW1FMo4zggQdBL9GSkWJZCEb0kPaZlY4PdCCKiMH0IL2hBTXNKMbDRU3SGOTU9fHvXt9bsvdbae/bx6fxhwTp7/b/b2etb61trQwMNNOBCqU56W4CbgcXAnOjZn8AF4CegVie7M0YJ6AH2AN8CE8BUSpsAjgO7gfXU78/MhDnAEPAD6Y772vfADmD2NfYdkH+xH5kqaQ5OAqPAmaiNRs/S+L8Cj1/LIG4APkpwpAaMANuBZUBbgmwbsBwYBI5FMraeEaCjrhEAq5F/ThuuIPN9SQ59S5C8qlg6y8CqAvxNxF3AVcvgIeDGAnR3Aoct3VeA3gJ0G1iNGUQVeLpoI8BWzBXvCgW+mUWY06kC3BsgtwB4GNgZtYeiZz7chznVyhSQMyXMxK7iD6ILOEjyCjUJvI1MJRf6MN/MSD73/0e/5YhvOvUAvzE9ALtdirgubLNktuSKANns9D5xyMO/Axi3jI8C70Zt1BobB2736HxP8X8B2nPEwZBSUsG9OpWAryx+P2b50QQ8BfyheF96fOiy+NuzBlHCLDte8vA3KO4/yBxPw6aIE/Pv9ujeq7jnyVib9SjhSfyb3X7FPxKgf1jxX/VwOzErgHVJpKYU4QdV/1Nk+XXhNtUPWWE+VH1fnpSBz9TvB5JIaYHco/pH/X4xV/XHA/i/q/68AL72YUMSISmQFqSwi/FFgCH9xpYG8G9V/XIAX/uwEmgOkGEpZn4kVbE2nsFMyFYHtxU5g8T8nQH6Z2HmyS0BMvQqgbEQAWQxqCq510leXZqANxTvL+Q4HIKykvNtpgBsVgKnA40AvKDkppAE7UPyZy6wEfjc4jyfQf8ZJXd/iEDeQFqBDyxHXe0I7ilowxlIUrJXVH9+BkPNwKkM/NMEJm2CL1dDBHSy1whL9m7gJOFvI24nkDLEh3ZyJHsLZgm93E2nC7mrsqvbV5Bpuixqm4F9TK+Of8Rf1q9U/CoZ3uRxJTjo4LUh91jasX24N7n5wGuWzDe480UXsF8HRRBhtxI85uA9Zzk0kMHGoCX7rIP7ieLtymCD9UqwRnIJPw8pNWLegSwGIug95TJwXQLHLhrXZDFQwtx99yRwnrScuD6LgQgLMP+MJxI4L6vxczlssEMpqDA9Id9R42/mMRDhLaXnoDXWjVx+55m6/2E25u3JYWv8lBp7JI+BCI8pPd9ZY++rsTFyHnVBDvw6IbeqsbPIlLpMxnlrYa3Sc1Y9H7BsPzoDG5SQg1KsbAK5d6o3NmLuZcNFKO3ArDwr1DeYPswLup+BhUUpX4VcX+o3s60o5QoDmG9iHFhRtJFezGCmkHunkFrJh27MxI6DCDp35MGdmNNsCrl32ku+W/lOZJ/QS2w8nQp/EzY6MBcAXQF8jNRFK5DjqY1ZSAE4hJQdSR96hikwJ0KwBbnGTCvRa8jaH396G0txXO8TM1piZ4J2pPg773DQ184hSZ57sysa64AXkZLc9Xm6ipTiu5DNsBDU6xt3M3ATckMSX95VgIvIIezvOtltoIEGUvAv+t4LrvGpevUAAAAASUVORK5CYII='
              />
              <h5>Profile</h5>
            </Link>
          </li>
          <li className='leftNav__navigation-link'>
            <Link to='/'>
              <img
                alt='sign out'
                src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAABmJLR0QA/wD/AP+gvaeTAAAA3klEQVRIid3WTW7CMBCG4ScoolLL34m67aKbnoAblEshJK4AUruhaw7RS7BMFzFVgADOD6jpK1lZeDyfZzwZGz6RNRgbESTBuCnJNYO0inEJ0Zvs1XBei/8nlF43uUj0uXY6dVvMyib2P15b7IK/BR7uIZRhjScOO8Olg33DM8aYHH37GOLRUQSBD7wSF9G3Zv1wGVsMddrTiYOY1E3xgkEYY4zkaRuFtZMzayulrgrFYlgJxXBLobk84l/aFtrivWyibaFSOtProrPRmYj+nlDxhr1p5fXw1dBH1APyB7o6Ssan7i5eAAAAAElFTkSuQmCC'
              />
              <h5>Sign Out</h5>
            </Link>
          </li>
        </ul>
      </nav>
    </React.Fragment>
  );
};

export default LeftNav;
