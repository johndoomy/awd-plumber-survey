import Grid from '@mui/material/Grid2';

function SurveyComplete() {
  return (
    <div>
      <Grid sx={{ py: '20px' }} display="flex" justifyContent="center">
        <p>Survey Complete</p>
      </Grid>
      <Grid sx={{}} display="flex" justifyContent="center">
        <p>Thank you for your input!</p>
      </Grid>
    </div>
  );
}

export default SurveyComplete;
