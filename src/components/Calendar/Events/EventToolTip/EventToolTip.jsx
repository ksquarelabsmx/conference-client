import React from "react";
import { ContentToolTip } from "./ContentToolTip";
import { withStyles, Tooltip } from "@material-ui/core";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { toRoomColors } from "mappers/RoomMapper";
import { withNotifications } from "hocs";

const theme = (bgColor, txtColor) =>
  createMuiTheme({
    typography: {
      useNextVariants: true
    },
    overrides: {
      MuiTooltip: {
        tooltip: {
          backgroundColor: bgColor,
          fontSize: "0.9em",
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.8)",
          maxWidth: 200,
          color: txtColor
        }
      }
    }
  });

const styles = theme => {
  return {
    eventContainter: {
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    bootstrapPlacementLeft: {
      margin: "0 8px"
    },
    bootstrapPlacementRight: {
      margin: "0 8px"
    },
    bootstrapPlacementTop: {
      margin: "8px 0"
    },
    bootstrapPlacementBottom: {
      margin: "8px 0"
    }
  };
};

class EventToolTipComponent extends React.Component {
  handleEdit = () => {
    this.props.onEdit(this.props.content.booking);
  };

  handleDelete = () => {
    this.props.onDelete(this.props.content.booking);
  };

  render() {
    const {
      content,
      handleTooltipClose,
      open: isOpen,
      isSingleGrid,
      isOwner,
      children,
      classes: styleClasses
    } = this.props;
    const {
      bootstrapPlacementLeft,
      bootstrapPlacementRight,
      bootstrapPlacementTop,
      bootstrapPlacementBottom
    } = styleClasses;
    const { bgColor, txtColor } = toRoomColors(content.booking.room);
    const toolTipClasses = {
      tooltipPlacementLeft: bootstrapPlacementLeft,
      tooltipPlacementRight: bootstrapPlacementRight,
      tooltipPlacementTop: bootstrapPlacementTop,
      tooltipPlacementBottom: bootstrapPlacementBottom
    };

    return (
      <MuiThemeProvider theme={theme(bgColor, txtColor)}>
        <Tooltip
          title={
            <ContentToolTip
              isOwner={isOwner}
              content={content}
              onClickEdit={this.handleEdit}
              onClickDelete={this.handleDelete}
            />
          }
          disableFocusListener
          disableHoverListener
          disableTouchListener
          interactive
          classes={toolTipClasses}
          placement={isSingleGrid ? "bottom" : "right"}
          onClose={handleTooltipClose}
          open={isOpen}
        >
          {children}
        </Tooltip>
      </MuiThemeProvider>
    );
  }
}

export const EventToolTip = withStyles(styles)(
  withNotifications(EventToolTipComponent)
);
