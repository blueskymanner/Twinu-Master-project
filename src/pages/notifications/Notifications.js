import React, { useState } from "react";
import { Grid, Box } from "@material-ui/core";
import { toast } from "react-toastify";
import classnames from "classnames";

// styles
import "react-toastify/dist/ReactToastify.css";
import useStyles from "./styles";

// components
import Widget from "../../components/Widget";
import Notification from "../../components/Notification";
import Code from "../../components/Code";
import { Typography, Button } from "../../components/Wrappers";

const positions = [
  toast.POSITION.TOP_LEFT,
  toast.POSITION.TOP_CENTER,
  toast.POSITION.TOP_RIGHT,
  toast.POSITION.BOTTOM_LEFT,
  toast.POSITION.BOTTOM_CENTER,
  toast.POSITION.BOTTOM_RIGHT
];

export default function NotificationsPage(props) {
  var classes = useStyles();

  // local
  var [notificationsPosition, setNotificationPosition] = useState(2);
  var [errorToastId, setErrorToastId] = useState(null);

  return (
    <>
      <Grid container spacing={3}>
       <Grid item xs={12} md={12} lg={12}>
        <Widget>
          <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
              <Typography className={classes.head5}>
                Layout Options
              </Typography>
              <Typography>
                There are few position options available for notifications. You
                can click any of them to change notifications position:
              </Typography>
              <div className={classes.layoutContainer}>
                <div className={classes.layoutButtonsRow}>
                  <button
                    onClick={() => changeNotificationPosition(0)}
                    className={classnames(classes.layoutButton, {
                      [classes.layoutButtonActive]: notificationsPosition === 0
                    })}
                  />
                  <button
                    onClick={() => changeNotificationPosition(1)}
                    className={classnames(classes.layoutButton, {
                      [classes.layoutButtonActive]: notificationsPosition === 1
                    })}
                  />
                  <button
                    onClick={() => changeNotificationPosition(2)}
                    className={classnames(classes.layoutButton, {
                      [classes.layoutButtonActive]: notificationsPosition === 2
                    })}
                  />
                </div>
                <Typography className={classes.layoutText} size="md">
                  Click any position
                </Typography>
                <div className={classes.layoutButtonsRow}>
                  <button
                    onClick={() => changeNotificationPosition(3)}
                    className={classnames(classes.layoutButton, {
                      [classes.layoutButtonActive]: notificationsPosition === 3
                    })}
                  />
                  <button
                    onClick={() => changeNotificationPosition(4)}
                    className={classnames(classes.layoutButton, {
                      [classes.layoutButtonActive]: notificationsPosition === 4
                    })}
                  />
                  <button
                    onClick={() => changeNotificationPosition(5)}
                    className={classnames(classes.layoutButton, {
                      [classes.layoutButtonActive]: notificationsPosition === 5
                    })}
                  />
                </div>
              </div>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
              <Typography className={classes.head5}>
                  Notifications Types
              </Typography>
              <Typography>
                Different types of notifications for lost of use cases. Custom
                classes are also supported.
              </Typography>
              <div className={classes.buttonsContainer}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleNotificationCall("info")}
                  className={classnames(classes.notificationCallButton)}
                >
                  Info Message
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleNotificationCall("error")}
                  className={classnames(classes.notificationCallButton)}
                >
                  Error + Retry Message
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => handleNotificationCall("success")}
                  className={classnames(classes.notificationCallButton)}
                >
                  Success Message
                </Button>
              </div>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <Typography className={classes.head5}>
                  Usage
              </Typography>
              <Typography>
                Notifications are created with the help of{" "}
                <a href="https://github.com/fkhadra/react-toastify">
                  react-toastify
                </a>
              </Typography>
              <Code>{`
    // import needed components, functions and styles
    import { ToastContainer, toast } from 'react-toastify';
    import 'react-toastify/dist/ReactToastify.css';

    const Page = () => {
      <div>
        <ToastContainer />
        <button onClick={() => toast('Toast Message')}>
          show notification
        </button>
      </div>
    };
              `}</Code>
              <Box py={1}>
                <Typography variant="caption">
                  For more API information refer to the library documentation
                </Typography>
              </Box>
          </Grid>
          </Grid>
          </Widget>
        </Grid>
      </Grid>

        <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <Widget title="Notification Types Examples" disableWidgetMenu>
            <Notification
              className={classes.notificationItem}
              shadowless
              type="message"
              message="Thanks for Checking out Messenger"
              variant="contained"
              color="secondary"
            />
            <Notification
              className={classes.notificationItem}
              shadowless
              type="feedback"
              message="New user feedback received"
              variant="contained"
              color="primary"
            />
            <Notification
              className={classes.notificationItem}
              shadowless
              type="customer"
              message="New customer is registered"
              variant="contained"
              color="success"
            />
            <Notification
              className={classes.notificationItem}
              shadowless
              type="shipped"
              message="The order was shipped"
              variant="contained"
              color="warning"
            />
            <Notification
              className={classes.notificationItem}
              shadowless
              type="delivered"
              message="The order was delivered"
              variant="contained"
              color="primary"
            />
            <Notification
              className={classes.notificationItem}
              shadowless
              type="defence"
              message="5 Defence alerts"
              variant="contained"
              color="info"
            />
          </Widget>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Widget title="Notification Types Examples" disableWidgetMenu>
            <Notification
              className={classes.notificationItem}
              type="report"
              message="New report has been received"
              color="secondary"
            />
            <Notification
              className={classes.notificationItem}
              type="feedback"
              message="New user feedback received"
              color="primary"
            />
            <Notification
              className={classes.notificationItem}
              type="shipped"
              message="The item was shipped"
              color="success"
            />
            <Notification
              className={classes.notificationItem}
              type="message"
              message="The new message from user @nahawaii"
              color="warning"
            />
            <Notification
              className={classes.notificationItem}
              type="upload"
              message="Your file is ready to upload"
              color="primary"
            />
            <Notification
              className={classes.notificationItem}
              type="disc"
              message="The disc is full"
              color="info"
            />
          </Widget>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Widget title="Notification Types Examples" disableWidgetMenu>
            <Notification
              className={classes.notificationItem}
              type="report"
              message="New report has been received"
              variant="rounded"
              color="secondary"
            />
            <Notification
              className={classes.notificationItem}
              type="feedback"
              message="New user feedback received"
              variant="rounded"
              color="primary"
            />
            <Notification
              className={classes.notificationItem}
              type="shipped"
              message="The item was shipped"
              variant="rounded"
              color="success"
            />
            <Notification
              className={classes.notificationItem}
              type="message"
              message="The new message from user @nahawaii"
              variant="rounded"
              color="warning"
            />
            <Notification
              className={classes.notificationItem}
              type="upload"
              message="Your file is ready to upload"
              variant="rounded"
              color="primary"
            />
            <Notification
              className={classes.notificationItem}
              type="disc"
              message="The disc is full"
              variant="rounded"
              color="info"
            />
          </Widget>
        </Grid>
      </Grid>
    </>
  );

  // #############################################################
  function sendNotification(componentProps, options) {
    return toast(
      <Notification
        {...componentProps}
        className={classes.notificationComponent}
      />,
      options
    );
  }

  function retryErrorNotification() {
    var componentProps = {
      type: "message",
      message: "Message was sent successfully!",
      variant: "contained",
      color: "success"
    };
    toast.update(errorToastId, {
      render: <Notification {...componentProps} />,
      type: "success"
    });
    setErrorToastId(null);
  }

  function handleNotificationCall(notificationType) {
    var componentProps;

    if (errorToastId && notificationType === "error") return;

    switch (notificationType) {
      case "info":
        componentProps = {
          type: "feedback",
          message: "New user feedback received",
          variant: "contained",
          color: "primary"
        };
        break;
      case "error":
        componentProps = {
          type: "message",
          message: "Message was not sent!",
          variant: "contained",
          color: "secondary",
          extraButton: "Resend",
          extraButtonClick: retryErrorNotification
        };
        break;
      default:
        componentProps = {
          type: "shipped",
          message: "The item was shipped",
          variant: "contained",
          color: "success"
        };
    }

    var toastId = sendNotification(componentProps, {
      type: notificationType,
      position: positions[notificationsPosition],
      progressClassName: classes.progress,
      onClose: notificationType === "error" && (() => setErrorToastId(null)),
      className: classes.notification
    });

    if (notificationType === "error") setErrorToastId(toastId);
  }

  function changeNotificationPosition(positionId) {
    setNotificationPosition(positionId);
  }
}
