import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid2';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import axios from 'axios';

function Survey({ handleSurveySubmit }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [company, setCompany] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [waterDamageCompany, setWaterDamageCompany] = useState('');
  const [why, setWhy] = useState({
    payoutAmount: false,
    fastResponseTime: false,
    allDayService: false,
    companyMandated: false,
    other: false,
  });
  const [error, setError] = useState({});

  const [companySelected, setCompanySelected] = useState(null);

  const phoneNumberAutoFormat = (phoneNumber) => {
    const number = phoneNumber.trim().replace(/[^0-9]/g, '');

    if (number.length < 4) return number;
    if (number.length < 7) return number.replace(/(\d{3})(\d{1})/, '$1-$2');
    if (number.length < 11)
      return number.replace(/(\d{3})(\d{3})(\d{1})/, '$1-$2-$3');
    return number.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let whyCheckList = [];

    if (phoneNumber.length !== 12) {
      setError({ ...error, phoneNumber: true });
      return;
    } else {
      setError({ ...error, phoneNumber: false });
    }

    for (let item in why) {
      whyCheckList.push(why[item]);
    }

    if (!whyCheckList.find((bool) => bool !== false)) {
      setError({ ...error, why: true });
      return;
    } else {
      setError({ ...error, why: false });
    }

    console.log('submitting');

    await axios
      //${window.location.origin} for deplyment
      .post(`${window.location.origin}/survey/`, {
        firstName: firstName,
        lastName: lastName,
        company: company,
        phoneNumber: phoneNumber,
        email: email,
        waterDamageCompany: waterDamageCompany,
        why: why,
      })
      .then((response) => {
        console.log(response.status);
        handleSurveySubmit();
      })
      .catch((error) => {
        console.log(error);
        setError({ ...error, unexpected: true });
      });
  };

  const handlePhoneNumber = (e) => {
    let phoneInput = e.target.value;

    let formattedPhoneNumber = phoneNumberAutoFormat(phoneInput);

    setPhoneNumber(formattedPhoneNumber);

    if (e.target.value.length === 12) {
      setError({ ...error, phoneNumber: false });
    }
  };

  const handleCompanySelect = (e) => {
    setCompanySelected(e.target.id);
    if (e.target.id === 'selfEmployed') {
      setCompany('Self Employed');
    }
    if (e.target.id === 'preferNotToSay') {
      setCompany('Prefer Not To Say');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p>Contact Info</p>
        <Grid container spacing={1} sx={{ py: '10px' }}>
          <Grid>
            <TextField
              id="firstName"
              label="First Name"
              variant="filled"
              required
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Grid>
          <Grid>
            <TextField
              id="lastName"
              label="Last Name"
              variant="filled"
              required
              onChange={(e) => setLastName(e.target.value)}
            />
          </Grid>
        </Grid>

        <Grid container spacing={1} sx={{ py: '10px' }}>
          <Grid>
            <TextField
              id="phoneNumber"
              label="Phone Number"
              variant="filled"
              required
              value={phoneNumber}
              inputProps={{ maxLength: 12 }}
              onChange={(e) => {
                handlePhoneNumber(e);
              }}
            />
          </Grid>
          <Grid>
            <TextField
              id="email"
              label="Email"
              variant="filled"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
        </Grid>

        <p>What company are you employed at?</p>

        <Grid container sx={{ py: '10px' }}>
          <Grid>
            <TextField
              id="companyName"
              label="Company"
              required
              variant="filled"
              sx={{ width: '90vw' }}
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              onClick={(e) => {
                handleCompanySelect(e);
                // e.target.select(); If label is clicked on, this will crash!
              }}
            />
          </Grid>
        </Grid>
        <div>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={companySelected === 'selfEmployed'}
                  id="selfEmployed"
                  onClick={(e) => handleCompanySelect(e)}
                />
              }
              label="Self Employed"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={companySelected === 'preferNotToSay'}
                  id="preferNotToSay"
                  onClick={(e) => handleCompanySelect(e)}
                />
              }
              label="Prefer Not To Say"
            />
          </FormGroup>
        </div>
        <p>What company do you refer to for water damage?</p>

        <div>
          <TextField
            id="waterDamageCompany"
            label="Water Damage Company"
            variant="filled"
            required
            sx={{ width: '90vw' }}
            onChange={(e) => setWaterDamageCompany(e.target.value)}
          />
        </div>
        <div>
          <p>Why do you refer to that company?*</p>

          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  id="payoutAmount"
                  checked={why.payoutAmount}
                  onChange={() => {
                    setWhy({ ...why, payoutAmount: !why.payoutAmount });
                    setError({ ...error, why: false });
                  }}
                />
              }
              label="Payout Amount"
            />
            <FormControlLabel
              control={
                <Checkbox
                  id="fastResponseTime"
                  checked={why.fastResponseTime}
                  onChange={() => {
                    setWhy({ ...why, fastResponseTime: !why.fastResponseTime });
                    setError({ ...error, why: false });
                  }}
                />
              }
              label="Fast Response Time"
            />
            <FormControlLabel
              control={
                <Checkbox
                  id="allDayService"
                  checked={why.allDayService}
                  onChange={() => {
                    setWhy({ ...why, allDayService: !why.allDayService });
                    setError({ ...error, why: false });
                  }}
                />
              }
              label="24/7 Service"
            />
            <FormControlLabel
              control={
                <Checkbox
                  id="companyMandated"
                  checked={why.companyMandated}
                  onChange={() => {
                    setWhy({ ...why, companyMandated: !why.companyMandated });
                    setError({ ...error, why: false });
                  }}
                />
              }
              label="Company Mandated"
            />
            <FormControlLabel
              control={
                <Checkbox
                  id="other"
                  checked={why.other !== false}
                  onChange={() => {
                    setWhy({ ...why, other: !why.other });
                    setError({ ...error, why: false });
                  }}
                />
              }
              label="Other:"
            />
          </FormGroup>
          <TextField
            id="otherExplanation"
            label="Tell us why."
            multiline
            rows={5}
            variant="filled"
            sx={{ width: '90vw' }}
            onChange={(e) => {
              setWhy({ ...why, other: e.target.value });
              setError({ ...error, why: false });
            }}
          />
        </div>
        <p>
          *This survey is for marketing purposes only, and will not be shared
          with other companies.
        </p>
        {error.phoneNumber === true ? (
          <p style={{ color: 'red', fontSize: 'smaller' }}>
            *Please input a phone number.*
          </p>
        ) : null}
        {error.why === true ? (
          <p style={{ color: 'red', fontSize: 'smaller' }}>
            *Please select why you refer to that company.*
          </p>
        ) : null}
        {error.unexpected === true ? (
          <p style={{ color: 'red', fontSize: 'smaller' }}>
            An unepected error has occurred. Please try again later.
          </p>
        ) : null}
        <div>
          <Button sx={{ my: '10px' }} type="submit" variant="contained">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Survey;
