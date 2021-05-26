import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { variants } from '../../services/framer-variants';
import Head from 'next/head';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import UppercaseInputLabel from '../../components/UppercaseInputLabel';
import Button from '@material-ui/core/Button';
import { currentUserSelector } from '../../selectors/authSelector';
import { useSelector } from 'react-redux';
import Layout from '../../components/layout-settings';
import { errorSelector } from '../../selectors/authSelector';
import StripeElements from '../../components/StripeElements';
import {
  paymentDataSelector,
  fetchingSelector,
} from '../../selectors/paymentSelector';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemIcon from '@material-ui/core/ListItemIcon';

export default function Home() {
  const fetching = useSelector(fetchingSelector);
  const error = useSelector(errorSelector);
  const [price, set_price] = React.useState('');
  const [validationErrors, setValidationErrors] = React.useState({});
  const currentUser = useSelector(currentUserSelector);
  const [disabledButton, setDisabledButton] = React.useState(false);
  const paymentData = useSelector(paymentDataSelector);

  useEffect(() => {
    if (currentUser) {
      set_price(currentUser.price);
    }
  }, [currentUser]);

  useEffect(() => {
    if (error?.response?.data?.errors) {
      setValidationErrors(Object.assign(...error.response.data.errors));
    } else {
      setValidationErrors({});
    }
  }, [error]);

  const handleUpdate = (event) => {
    event.preventDefault();
  };
  return (
    <motion.div initial='hidden' animate='visible' variants={variants}>
      <Layout>
        <Head>
          <title>Account — Settings</title>
        </Head>
        <Grid container spacing={6}>
          <Grid item xs={12} md={8}>
            <Box my={2}>
              <UppercaseInputLabel>ADD DETAILS</UppercaseInputLabel>
            </Box>
            <Divider />
            <Box my={2}>
              <Typography variant='subtitle2'>
                Add your bank card details
              </Typography>
            </Box>
            <Box my={2}>
              <Typography variant='body2'>
                Enter the following details
              </Typography>
            </Box>
            <form onSubmit={handleUpdate}>
              <Box mb={4}>
                <StripeElements disabledButton={disabledButton} />

                <Button variant='outlined' type='submit'>
                  Save
                </Button>
              </Box>
            </form>
            <Box mb={2}>
              <List>
                {fetching ? (
                  'loading'
                ) : paymentData.length ? (
                  paymentData.map((p) => (
                    <>
                      <Box mb={2}>
                        <Typography variant='subtitle2'>
                          <strong>Your Linked Bank Account</strong>
                        </Typography>
                        <Typography variant='subtitle2'>
                          You may not be able to change your bank details
                        </Typography>
                      </Box>
                      <ListItem
                        key={p.id}
                        button
                        onClick={(e) => handleClickListItem(e, p.id)}
                      >
                        <ListItemIcon>
                          <PaymentIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={`${p.title} (${p.type})`}
                          secondary={`Ending in ••${p.last4_card}`}
                        />
                        <ListItemSecondaryAction>
                          {p.default && (
                            <Avatar className={classes.green}>
                              <CheckIcon />
                            </Avatar>
                          )}
                        </ListItemSecondaryAction>
                      </ListItem>
                    </>
                  ))
                ) : (
                  <Box mb={2}>
                    <Typography variant='subtitle2'>
                      You have no bank account linked to this profile. To add a
                      subscription fee to your content, please add a bank.
                    </Typography>
                  </Box>
                )}
              </List>
            </Box>
          </Grid>
        </Grid>
      </Layout>
    </motion.div>
  );
}
