import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Tabs,
  Tab,
  Paper,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { selectTumUrunler, urunSil } from '../../store/slices/urunlerSlice';
import UrunEkle from './UrunEkle';
import UrunDuzenle from './UrunDuzenle';

const YoneticiPaneli = () => {
  const dispatch = useDispatch();
  const urunler = useSelector(selectTumUrunler);
  
  const [activeTab, setActiveTab] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedUrun, setSelectedUrun] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [urunToDelete, setUrunToDelete] = useState(null);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleUrunEkle = () => {
    setDialogOpen(true);
  };

  const handleUrunSil = (urun) => {
    setUrunToDelete(urun);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (urunToDelete) {
      dispatch(urunSil(urunToDelete.id));
      setDeleteDialogOpen(false);
      setUrunToDelete(null);
    }
  };

  const handleUrunDuzenle = (urun) => {
    setSelectedUrun(urun);
    setEditDialogOpen(true);
  };

  const renderUrunYonetimi = () => (
    <Box sx={{ mt: 3 }}>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Ürün Listesi</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleUrunEkle}
        >
          Yeni Ürün Ekle
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ürün Adı</TableCell>
              <TableCell>Kategori</TableCell>
              <TableCell>Fiyat</TableCell>
              <TableCell>Stok</TableCell>
              <TableCell>İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {urunler.map((urun) => (
              <TableRow key={urun.id}>
                <TableCell>{urun.ad}</TableCell>
                <TableCell>{urun.kategori}</TableCell>
                <TableCell>{urun.fiyat} TL</TableCell>
                <TableCell>{urun.stok}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleUrunDuzenle(urun)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleUrunSil(urun)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <UrunEkle
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />

      <UrunDuzenle
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        urun={selectedUrun}
      />

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Ürün Silme Onayı</DialogTitle>
        <DialogContent>
          <DialogContentText>
            "{urunToDelete?.ad}" adlı ürünü silmek istediğinizden emin misiniz?
            Bu işlem geri alınamaz.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>İptal</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Sil
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Yönetici Paneli
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Ürün Yönetimi" />
          <Tab label="Sipariş Yönetimi" />
          <Tab label="Kullanıcı Yönetimi" />
        </Tabs>
      </Box>

      {activeTab === 0 && renderUrunYonetimi()}
      {activeTab === 1 && <Typography>Sipariş Yönetimi</Typography>}
      {activeTab === 2 && <Typography>Kullanıcı Yönetimi</Typography>}
    </Container>
  );
};

export default YoneticiPaneli;
