import React from "react";
import { Grid, Typography, Card } from "@material-ui/core/";
import { withStyles } from "@material-ui/core/styles";
import { SearchBar } from "./SearchBar";
import { BookingList } from "./BookingList/BookingList";
import { BookingProvider, BookingConsumer } from "../../providers/Booking";
import { RoomConsumer, RoomProvider } from "../../providers/Room";
import { UserConsumer, UserProvider } from "../../providers/User";

const styles = theme => ({
  sideBar: {
    height: 855,
    width: 460,
    display: "flex",
    flexDirection: "column",
    flexWrap: "nowrap",
    justifyContent: "start",
    overflowY: "auto"
  },
  headerCard: {
    width: "100%",
    height: 180,
    marginBottom: 4
  },
  title: {
    marginTop: 25,
    marginLeft: 50,
    fontSize: "1.8em",
    fontWeight: "bold",
    color: "gray"
  }
});

const BookingsSideBarComponent = props => {
  const { classes } = props;
  const { auth } = props;
  return (
    <Grid container className={classes.sideBar}>
      <Card className={classes.headerCard} square elevation={1}>
        <Typography className={classes.title}>Appointments Made</Typography>
        <SearchBar />
      </Card>
      <BookingProvider auth={auth}>
        <BookingConsumer>
          {booking => (
            <RoomProvider auth={auth}>
              <RoomConsumer>
                {roomService => (
                  <UserProvider auth={auth}>
                    <UserConsumer>
                      {userService => (
                        <BookingList
                          booking={booking}
                          auth={auth}
                          roomService={roomService}
                          userService={userService}
                        />
                      )}
                    </UserConsumer>
                  </UserProvider>
                )}
              </RoomConsumer>
            </RoomProvider>
          )}
        </BookingConsumer>
      </BookingProvider>
    </Grid>
  );
};

export const BookingsSideBar = withStyles(styles)(BookingsSideBarComponent);
