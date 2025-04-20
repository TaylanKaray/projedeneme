import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
} from '@mui/material';

const steps = [
  'Sipariş Alındı',
  'Onaylandı',
  'Hazırlanıyor',
  'Kargoya Verildi',
  'Teslim Edildi',
];

const SiparisDurumu = () => {
  const [activeStep, setActiveStep] = useState(3); // Örnek olarak "Kargoya Verildi" durumunda

  const siparisBilgileri = {
    siparisTarihi: '18.04.2025',
    kargoTakipNo: 'TR123456789',
    kargoFirmasi: 'Yurtiçi Kargo',
    tahminiTeslimTarihi: '20.04.2025',
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Sipariş Durumu
        </Typography>

        <Stepper activeStep={activeStep} alternativeLabel sx={{ mt: 3, mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Kargo Bilgileri
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1">
                      <strong>Sipariş Tarihi:</strong> {siparisBilgileri.siparisTarihi}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1">
                      <strong>Kargo Takip No:</strong> {siparisBilgileri.kargoTakipNo}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1">
                      <strong>Kargo Firması:</strong> {siparisBilgileri.kargoFirmasi}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1">
                      <strong>Tahmini Teslim Tarihi:</strong> {siparisBilgileri.tahminiTeslimTarihi}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            href={`https://www.yurticikargo.com/tr/online-servisler/gonderi-sorgula?code=${siparisBilgileri.kargoTakipNo}`}
            target="_blank"
          >
            Kargo Takip
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default SiparisDurumu;
