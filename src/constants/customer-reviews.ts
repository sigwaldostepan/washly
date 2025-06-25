interface CustomerReview {
  name: string;
  rating: number;
  review: string;
  date: Date;
}

export const customerReviews: CustomerReview[] = [
  {
    name: 'Alya Putri',
    rating: 5,
    review:
      'Gila sih, mobilku jadi glowing parah! Paket manjain eksteriornya bener-bener ajiib. Kinclongnya awet, berasa mobil baru keluar dari showroom. 100/10 bakal balik lagi! ✨',
    date: new Date('2024-10-22T14:30:00'),
  },
  {
    name: 'Bagas Aditama',
    rating: 5,
    review:
      'THE BEST! Nyobain paket spa luar-dalem, puas banget. Interiornya jadi wangi & bersih banget, nyaman buat nongki. Eksteriornya juga gak kalah kinclong. Worth every penny! 💖',
    date: new Date('2024-10-20T11:15:00'),
  },
  {
    name: 'Cindy A.',
    rating: 4,
    review:
      'Suka banget sama hasil poles dasbornya, detailnya rapi. Vakumnya juga bersih. Cuma kemarin antreannya agak lama aja, tapi overall oke banget. Next time mau coba cuci luarnya juga.',
    date: new Date('2024-10-18T16:00:00'),
  },
];
