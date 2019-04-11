import React from "react";
import { userService } from "services";

const UserContext = React.createContext({
  getUser: () => {},
  getUsers: () => {},
  modifyUser: () => {}
});

class UserProvider extends React.Component {
  getUser = id => {
    const { token: authToken } = this.props.auth.jwt;
    return userService.getOne(id, authToken);
  };

  getUsers = () => {
    const { token: authToken } = this.props.auth.jwt;
    return userService.getAll(authToken);
  };

  modifyUser = (user, id) => {
    const { token: authToken } = this.props.auth.jwt;
    return userService.updateOne(user, id, authToken);
  };

  render() {
    const { children } = this.props;
    return (
      <UserContext.Provider
        value={{
          getUser: this.getUser,
          getUsers: this.getUsers,
          modifyUser: this.modifyUser
        }}
      >
        {children}
      </UserContext.Provider>
    );
  }
}

const UserConsumer = UserContext.Consumer;
export { UserProvider, UserConsumer };
