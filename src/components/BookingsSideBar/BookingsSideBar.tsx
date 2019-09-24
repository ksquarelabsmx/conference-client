import React from "react";
import { BookingList } from "./BookingList";
import * as colors from "styles/colors";
import styled from "styled-components";
import { IBooking } from "models/Booking";

export const BookingsSideBarHeader = styled.header`
  box-sizing: border-box;
  padding-bottom: 1.5rem;
  padding-left: 2.5rem;
  padding-top: 2.5rem;
`;

export const BookingsSideBarTitle = styled.h2`
  color: ${colors.TEXT};
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
`;

export interface IBookingsSideBarProps {
  bookingsData: IBooking[];
}

export const BookingsSideBar: React.FC<IBookingsSideBarProps> = ({
  bookingsData,
}) => {
  return (
    <aside>
      <BookingsSideBarHeader>
        <BookingsSideBarTitle>My Appointments</BookingsSideBarTitle>
      </BookingsSideBarHeader>
      <BookingList bookingsData={bookingsData} />
    </aside>
  );
};
