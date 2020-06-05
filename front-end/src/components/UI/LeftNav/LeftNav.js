import React from "react";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";

import { selectCurrentUser } from "../../../redux/users/user-selectors";
import { signOutAsync } from "../../../redux/users/user-actions";

import Avatar from "../Avatar/Avatar";
import Logo from "../Logo/Logo";

import "./LeftNav.scss";

const DEFAULT_USER = {
  avatar_url: "",
  userId: "",
  email: "",
  posts_count: 0,
  followers_count: 0,
  following_count: 0,
  username: "",
  fullname: "",
  id: "",
  summary: "",
  token: "",
};

const LeftNav = ({ currentUser, signOut }) => {
  if (!currentUser) {
    currentUser = DEFAULT_USER;
  }

  return (
    <React.Fragment>
      <nav className={`leftNav`}>
        <div className="leftNav__profile-container">
          <Logo />
          <Avatar size={100} source={currentUser.avatar_url} />

          <h3>{currentUser.fullname}</h3>
          <h6>@{currentUser.username}</h6>
        </div>
        <div className="leftNav__user-info-container">
          <div className="leftNav__user-info-posts">
            <h5>{currentUser.posts_count}</h5>
            <h6>Posts</h6>
          </div>
          <div className="leftNav__user-info-followers">
            <h5>{currentUser.followers_count}</h5>
            <h6>Followers</h6>
          </div>
          <div className="leftNav__user-info-following">
            <h5>{currentUser.following_count}</h5>
            <h6>Following</h6>
          </div>
        </div>
        <ul className="leftNav__navigation-container">
          <NavLink to="/" exact activeClassName="active">
            <li className="leftNav__navigation-link">
              <img
                alt="feed"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAACiUlEQVR4nO3Zv29NYRzH8VdVGklTSYVEE4ZKWEgwYGBiEKZubDYxYdJ/obWx6mRkYWPRCQkWBgYSBpJKSCWIVmkN50rr3ufc3h/nnOdqn3fyLPc+5/v9fL/nnOc8n3NIJBKJRDRO1sa6ZAw/MI8zkbVUzjksYKk2fuF8VEUVMo5Fy8WvHBMRdZVOHyaFC185rtXmrin6MaWx2G+1Uf/7VO2YNcEAbmkschZHcQifAv/fwaYIegtlEPc0FjeDAyvm7cX7wLwHGKpQb6EM46HGot5id2D+KF4H5j/B1gr0Fsp2PNdYzEvsKOG4niLvTD7V2pls98rpKfLu5Wnt3cuDuB+IU7929BSHhVfzuzpbzQdwOxBvFscK0Fsox/FVo9ib2NhF3H7cCMT9jlNdxC2UMcxpFHkdGwqI34ergfg9YaIu4Ldq9vTjgTyLuFRCrpYF1ZuaRVwuMWeVDc8l75JckNncsjmLn4H8Rd1yTclblOZka0FVnJYthEUvuk3JMzVfxHksHcHngJ5OH7tNyduYfMTBopO1wT58COiaxuaikgzjUSDJO+wpKkkX7MIbnW+9mzIibE5eYWe3wQtkBC8UbKJGhTv7DNu601sKW/BYQVfqfpnxqA+2pLdfUAwJa56R1dQSeabm7+h18nS3ZKJOCJuatdCAVU3UqMxgNAvQSQNWi1d1vnlZrUEu1k2eqEBQ2Q2oN1FXVgsw6V9T8783gGUT1ZJp6pNtM5sF7EZQjAaQ1dTwxamVT1D1Itr9bNXu8ZXmK90+9jqpAbEFxCY1ILaA2KQGxBYQm9SA2AJikxoQW0BsUgNiC4hNakBsAbHp5ENi1S9GS8237q+A1IDYAhKJRCKRSCRi8QcgUJzUsjTKhgAAAABJRU5ErkJggg=="
              />
              <h5>Feed</h5>
            </li>
          </NavLink>

          <NavLink to={`/user/${currentUser.userId}`} activeClassName="active">
            <li className="leftNav__navigation-link">
              <img
                alt="profile"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAEnUlEQVRoge2ZW4hVVRjHf2dujqZCyiTazFCEUeEtfFBxhsoaJR/qpRvW1FMo4zggQdBL9GSkWJZCEb0kPaZlY4PdCCKiMH0IL2hBTXNKMbDRU3SGOTU9fHvXt9bsvdbae/bx6fxhwTp7/b/b2etb61trQwMNNOBCqU56W4CbgcXAnOjZn8AF4CegVie7M0YJ6AH2AN8CE8BUSpsAjgO7gfXU78/MhDnAEPAD6Y772vfADmD2NfYdkH+xH5kqaQ5OAqPAmaiNRs/S+L8Cj1/LIG4APkpwpAaMANuBZUBbgmwbsBwYBI5FMraeEaCjrhEAq5F/ThuuIPN9SQ59S5C8qlg6y8CqAvxNxF3AVcvgIeDGAnR3Aoct3VeA3gJ0G1iNGUQVeLpoI8BWzBXvCgW+mUWY06kC3BsgtwB4GNgZtYeiZz7chznVyhSQMyXMxK7iD6ILOEjyCjUJvI1MJRf6MN/MSD73/0e/5YhvOvUAvzE9ALtdirgubLNktuSKANns9D5xyMO/Axi3jI8C70Zt1BobB2736HxP8X8B2nPEwZBSUsG9OpWAryx+P2b50QQ8BfyheF96fOiy+NuzBlHCLDte8vA3KO4/yBxPw6aIE/Pv9ujeq7jnyVib9SjhSfyb3X7FPxKgf1jxX/VwOzErgHVJpKYU4QdV/1Nk+XXhNtUPWWE+VH1fnpSBz9TvB5JIaYHco/pH/X4xV/XHA/i/q/68AL72YUMSISmQFqSwi/FFgCH9xpYG8G9V/XIAX/uwEmgOkGEpZn4kVbE2nsFMyFYHtxU5g8T8nQH6Z2HmyS0BMvQqgbEQAWQxqCq510leXZqANxTvL+Q4HIKykvNtpgBsVgKnA40AvKDkppAE7UPyZy6wEfjc4jyfQf8ZJXd/iEDeQFqBDyxHXe0I7ilowxlIUrJXVH9+BkPNwKkM/NMEJm2CL1dDBHSy1whL9m7gJOFvI24nkDLEh3ZyJHsLZgm93E2nC7mrsqvbV5Bpuixqm4F9TK+Of8Rf1q9U/CoZ3uRxJTjo4LUh91jasX24N7n5wGuWzDe480UXsF8HRRBhtxI85uA9Zzk0kMHGoCX7rIP7ieLtymCD9UqwRnIJPw8pNWLegSwGIug95TJwXQLHLhrXZDFQwtx99yRwnrScuD6LgQgLMP+MJxI4L6vxczlssEMpqDA9Id9R42/mMRDhLaXnoDXWjVx+55m6/2E25u3JYWv8lBp7JI+BCI8pPd9ZY++rsTFyHnVBDvw6IbeqsbPIlLpMxnlrYa3Sc1Y9H7BsPzoDG5SQg1KsbAK5d6o3NmLuZcNFKO3ArDwr1DeYPswLup+BhUUpX4VcX+o3s60o5QoDmG9iHFhRtJFezGCmkHunkFrJh27MxI6DCDp35MGdmNNsCrl32ku+W/lOZJ/QS2w8nQp/EzY6MBcAXQF8jNRFK5DjqY1ZSAE4hJQdSR96hikwJ0KwBbnGTCvRa8jaH396G0txXO8TM1piZ4J2pPg773DQ184hSZ57sysa64AXkZLc9Xm6ipTiu5DNsBDU6xt3M3ATckMSX95VgIvIIezvOtltoIEGUvAv+t4LrvGpevUAAAAASUVORK5CYII="
              />
              <h5>Profile</h5>
            </li>
          </NavLink>
          <Link to="">
            <li className="leftNav__navigation-link" onClick={signOut}>
              <img
                alt="sign out"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAABmJLR0QA/wD/AP+gvaeTAAAA3klEQVRIid3WTW7CMBCG4ScoolLL34m67aKbnoAblEshJK4AUruhaw7RS7BMFzFVgADOD6jpK1lZeDyfZzwZGz6RNRgbESTBuCnJNYO0inEJ0Zvs1XBei/8nlF43uUj0uXY6dVvMyib2P15b7IK/BR7uIZRhjScOO8Olg33DM8aYHH37GOLRUQSBD7wSF9G3Zv1wGVsMddrTiYOY1E3xgkEYY4zkaRuFtZMzayulrgrFYlgJxXBLobk84l/aFtrivWyibaFSOtProrPRmYj+nlDxhr1p5fXw1dBH1APyB7o6Ssan7i5eAAAAAElFTkSuQmCC"
              />
              <h5>Sign Out</h5>
            </li>
          </Link>
        </ul>
      </nav>
    </React.Fragment>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOutAsync()),
});

const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(LeftNav);
