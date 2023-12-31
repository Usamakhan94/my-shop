import { Outlet } from "react-router-dom"
import { ReactComponent as CrownLogo } from '../../assets/crown.svg'
import CartIcon from "../../components/cart-icon/cart-icon.component"
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component"
import { LogoContainer, NavLink, NavLinks, NavigationContainer } from './navigation.styles'
import { useContext } from "react"
import { signOutUser } from "../../utils/firebase/firebase.utils"
import { UserContext } from "../../components/context/user.context"
import { CartContext } from "../../components/context/cart.context"

const NavigationBar = ()=>{
  const { currentUser } = useContext(UserContext)
  const { isCartOpen } = useContext(CartContext)

    return(
      <>
      <NavigationContainer>
        <LogoContainer to='/'>
        <CrownLogo className="logo" />
        </LogoContainer>
        <NavLinks>
            <NavLink to='/shop'>
                SHOP
            </NavLink>
            {
              currentUser? (
                <NavLink as="span" onClick={signOutUser} >SIGN OUT</NavLink>
              ) : (
                  <NavLink to='/auth'>
                    SIGN IN
                  </NavLink>
              )
            }
            <CartIcon/>

        </NavLinks>
        {isCartOpen && <CartDropdown/>}
      </NavigationContainer>
      <Outlet />
      </>
    )
  }

  export default NavigationBar;