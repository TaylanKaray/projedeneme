import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [
    // Ana Sınıf Kitapları
    {
      id: '11',
      ad: 'Okula Hazırlık Seti',
      yazar: 'Eğitim Komisyonu',
      yayinevi: 'Minik Dahiler',
      fiyat: 149.90,
      resimUrl: '/kitaplar/minikdahiler.jpeg',
      aciklama: 'Ana sınıf öğrencileri için tam donanımlı okula hazırlık seti.',
      kategori: 'Ana Sınıfı Kitapları',
      puan: 4.9,
      stok: 25
    },
    {
      id: '12',
      ad: 'Çizgi Çalışmaları',
      yazar: 'Sevgi Öztürk',
      yayinevi: 'Minik Eller',
      fiyat: 34.90,
      resimUrl: '/kitaplar/cizgicalismalari.jpg',
      aciklama: 'El yazısına hazırlık için çizgi çalışmaları.',
      kategori: 'Ana Sınıfı Kitapları',
      puan: 4.7,
      stok: 40
    },
    // Deneme Sınavları
    {
      id: '13',
      ad: 'LGS Deneme Seti',
      yazar: 'Sınav Komisyonu',
      yayinevi: 'Muba Yayınları',
      fiyat: 129.90,
      resimUrl: '/kitaplar/lgsdeneme.jpg',
      aciklama: '10 adet LGS formatında deneme sınavı ve çözümleri.',
      kategori: 'Deneme Sınavları',
      puan: 4.8,
      stok: 150
    },
    {
      id: '14',
      ad: '5. Sınıf Deneme Seti',
      yazar: 'Kolektif',
      yayinevi: 'Blok Test Yayınları',
      fiyat: 89.90,
      resimUrl: '/kitaplar/5sinifdeneme.jpeg',
      aciklama: 'Tüm dersler için 5. sınıf seviyesinde deneme sınavları.',
      kategori: 'Deneme Sınavları',
      puan: 4.6,
      stok: 80
    },
    // İlkokul Kitapları
    {
      id: '1',
      ad: 'Türkçe 1. Sınıf Ders Kitabı',
      yazar: 'Milli Eğitim Bakanlığı',
      yayinevi: 'MEB Yayınları',
      fiyat: 25.90,
      resimUrl: '/kitaplar/turkce1.jpg',
      aciklama: '1. sınıf öğrencileri için Türkçe ders kitabı.',
      kategori: 'İlkokul Kitapları',
      puan: 4.5,
      stok: 50
    },
    {
      id: '2',
      ad: 'Matematik 1. Sınıf Ders Kitabı',
      yazar: 'Milli Eğitim Bakanlığı',
      yayinevi: 'MEB Yayınları',
      fiyat: 22.90,
      resimUrl: '/kitaplar/matematik1.jpg',
      aciklama: '1. sınıf öğrencileri için Matematik ders kitabı.',
      kategori: 'İlkokul Kitapları',
      puan: 4.3,
      stok: 45
    },
    // Okul Öncesi Kitapları
    {
      id: '3',
      ad: 'Renkler ve Şekiller',
      yazar: 'Alp Gökalp',
      yayinevi: 'Beta Kids',
      fiyat: 18.50,
      resimUrl: '/kitaplar/renkler.jpg',
      aciklama: 'Okul öncesi çocuklar için renkler ve şekilleri öğreten eğlenceli bir kitap.',
      kategori: 'Okul Öncesi Kitapları',
      puan: 4.8,
      stok: 30
    },
    {
      id: '4',
      ad: 'Hayvanları Tanıyalım',
      yazar: 'Kolektif',
      yayinevi: 'Koloni Çocuk',
      fiyat: 20.00,
      resimUrl: '/kitaplar/hayvanlar.jpg',
      aciklama: 'Çocukların hayvanları tanımasını sağlayan resimli kitap.',
      kategori: 'Okul Öncesi Kitapları',
      puan: 4.6,
      stok: 25
    },
    // Orta Okul Kitapları
    {
      id: '5',
      ad: 'Fen Bilimleri 7. Sınıf',
      yazar: 'Osman Hare',
      yayinevi: 'Muba Yayınları',
      fiyat: 45.90,
      resimUrl: '/kitaplar/fen7.jpg',
      aciklama: '7. sınıf müfredatına uygun fen bilimleri ders kitabı.',
      kategori: 'Orta Okul Kitapları',
      puan: 4.4,
      stok: 60
    },
    {
      id: '6',
      ad: 'İngilizce 6. Sınıf',
      yazar: 'Koray Varol Komisyon',
      yayinevi: 'Kia Plus',
      fiyat: 38.50,
      resimUrl: '/kitaplar/ingilizce6.jpg',
      aciklama: '6. sınıf öğrencileri için İngilizce ders kitabı.',
      kategori: 'Orta Okul Kitapları',
      puan: 4.2,
      stok: 40
    },
    // Hobi ve Oyunlar
    {
      id: '7',
      ad: 'Zeka Oyunları Seti',
      yazar: 'Redka',
      yayinevi: 'Redka Akıl Oyunları',
      fiyat: 89.90,
      resimUrl: '/kitaplar/zekaoyunlari.jpg',
      aciklama: 'Akıl ve Zeka Oyunları , Grup Oyunları',
      kategori: 'Hobi Oyunları',
      puan: 4.9,
      stok: 15
    },
    {
      id: '8',
      ad: 'Origami Sanatı',
      yazar: 'Dr. Özgün Karaca',
      yayinevi: 'Mavi Yunus',
      fiyat: 32.50,
      resimUrl: '/kitaplar/origami.jpg',
      aciklama: 'Başlangıç seviyesinden ileri seviyeye origami öğreten kitap.',
      kategori: 'Hobi Oyunları',
      puan: 4.7,
      stok: 20
    },
    // Okuma Kitapları
    {
      id: '9',
      ad: 'Küçük Prens',
      yazar: 'Antoine de Saint-Exupéry',
      yayinevi: 'Mavi Bulut',
      fiyat: 15.90,
      resimUrl: '/kitaplar/kucukprens.jpeg',
      aciklama: 'Çocuk edebiyatının en sevilen eserlerinden biri.',
      kategori: 'Okuma Kitapları',
      puan: 4.9,
      stok: 100
    },
    {
      id: '10',
      ad: 'Define Adası',
      yazar: 'Robert Louis Stevenson',
      yayinevi: 'Yapı Kredi Yayınları',
      fiyat: 28.90,
      resimUrl: '/kitaplar/defineadasi.jpg',
      aciklama: 'Klasik bir macera romanı.',
      kategori: 'Okuma Kitapları',
      puan: 4.6,
      stok: 35
    },
    // Sözlükler ve Ansiklopedi
    {
      id: '15',
      ad: 'Türkçe Sözlük',
      yazar: 'Türk Dil Kurumu',
      yayinevi: 'TDK Yayınları',
      fiyat: 55.00,
      resimUrl: '/kitaplar/turkcesozluk.jpg',
      aciklama: 'Güncel Türkçe Sözlük, tüm kelime anlamları ve örnekler.',
      kategori: 'Sözlükler ve Ansiklopediler',
      puan: 4.9,
      stok: 200
    },
    {
      id: '16',
      ad: 'Çocuk Ansiklopedisi',
      yazar: 'Bilim Komisyonu',
      yayinevi: 'Bilgi Yolu Kültür Yayınları',
      fiyat: 199.90,
      resimUrl: '/kitaplar/cocukansiklopedi.jpg',
      aciklama: '1000 sayfa renkli resimli çocuk ansiklopedisi.',
      kategori: 'Sözlükler ve Ansiklopediler',
      puan: 4.8,
      stok: 45
    }
  ],
  status: 'idle',
  error: null
};

const urunlerSlice = createSlice({
  name: 'urunler',
  initialState,
  reducers: {
    urunEkle: (state, action) => {
      state.items.push({
        id: Date.now().toString(),
        ...action.payload
      });
    },
    urunGuncelle: (state, action) => {
      const index = state.items.findIndex(urun => urun.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    urunSil: (state, action) => {
      state.items = state.items.filter(urun => urun.id !== action.payload);
    },
    stokGuncelle: (state, action) => {
      const { id, miktar } = action.payload;
      const urun = state.items.find(item => item.id === id);
      if (urun) {
        urun.stok = Math.max(0, urun.stok + miktar);
      }
    }
  }
});

export const { urunEkle, urunGuncelle, urunSil, stokGuncelle } = urunlerSlice.actions;

export const selectTumUrunler = (state) => state.urunler.items;
export const selectUrunById = (state, urunId) => 
  state.urunler.items.find(urun => urun.id === urunId);
export const selectUrunlerByKategori = (state, kategori) =>
  state.urunler.items.filter(urun => urun.kategori === kategori);

export default urunlerSlice.reducer;
