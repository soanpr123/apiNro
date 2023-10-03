interface UserInterface {
  id: number,

  username: string,
  password: string,
  luong: number,
  ninja: string,
  topsk: number,
  nap: number,
  clanTerritoryId: number,
  coin: string,
  coin_old: string,
  status: number,
  phone?: string,
  nickname?: string,
  email?: string,
  nhomkhachhang: string,
  ngaythamgia: string,

  tongnap?: number,
  tongthang?: number,
  isOnline?: number,
  DiemDanh?: number,
  newAccount: number,
  VND: number,
  vip: number,
  role: string,
  lock: number,
};

export default UserInterface;
