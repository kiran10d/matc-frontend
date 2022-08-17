import { Link, useLocation } from "react-router-dom";
import { useRef } from "react";
import styled from "styled-components";
import { AiOutlineHome } from "react-icons/ai";
import { HiOutlineDatabase } from "react-icons/hi";
import { BsHandbag } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { BiCategory } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";

export default function NavBar() {

  const location = useLocation();
  const NavLinkRef = useRef<HTMLDivElement>(null);

  return (
    <SideNavBar>
      <Profile>
        <img
          src={"http://admin.reactstorefronts.com/img/user/admin.jpg"}
          alt="profile"
        />
        <div>
          <p>Hello</p>
          <h5>Kiran Kumar</h5>
        </div>
      </Profile>
      <Earning>
        <p>Earning</p>
        <h4>$12,560.55</h4>
      </Earning>
      <NavLink ref={NavLinkRef}>
        <Link to="/" className={location.pathname === "/" ? "active" : ""}>
          <AiOutlineHome /> Dashboard
        </Link>
        <Link to="products" className={location.pathname === "/products" ? "active" : ""}>
          <HiOutlineDatabase />
          Products
        </Link>
        <Link to="orders" className={location.pathname === "/orders" ? "active" : ""}>
          <BsHandbag /> Orders
        </Link>
        <Link to="customers" className={location.pathname === "/customers" ? "active" : ""}>
          <CgProfile />
          Customers
        </Link>
        <Link to="categories" className={location.pathname === "/categories" ? "active" : ""}>
          <BiCategory />
          Categories
        </Link>
        <Link to="settings" className={location.pathname === "/settings" ? "active" : ""}>
          <FiSettings /> Settings
        </Link>
      </NavLink>
      <CopyRight>
        <img
          src={"http://admin.reactstorefronts.com/img/logo.png"}
          alt="logo"
        />
        <p>©2020 Martfury marketplace. All rights reversed.</p>
      </CopyRight>
    </SideNavBar>
  );
}
const SideNavBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: block;
  max-width: 280px;
  width: 100%;
  height: 100%;
  padding: 20px 0 20px 16px;
  background-color: #f1f2f6;
  overflow: auto;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
  img {
    border-radius: 50%;
  }
  p {
    color: #666;
  }
`;
const Earning = styled.div`
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #e6e6e6;
  p {
    color: #666;
  }
`;
const NavLink = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 95px;
  a {
    padding: 10px 0;
    text-decoration: none;
    color: black;
    display: flex;
    align-items: center;
    gap: 15px;
    &:hover {
      color: #fcb800;
    }
    svg {
      font-size: 20px;
    }
    &.active{
      color: #fcb800;
      border-right: 2px solid #fcb800;
    }
  }
`;
const CopyRight = styled.div`
  position: fixed;
  max-width: 250px;
  bottom: 20px;
  background-color: #f1f2f6;
  img {
    margin-bottom: 10px;
  }
  p {
    color: #666;
  }
`;
