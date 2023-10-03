export const getBankName = (content: string) => {
  try {
    let bankName = '';
    if (content.indexOf(' tai VPB') >= 0) {
      bankName = 'VP Bank';
    } else if (content.indexOf('SD TK ') === 0) {
      bankName = 'Vietcombank';
    } else if (content.indexOf('VietinBank') >= 0 || content.indexOf('VIETINBANK') >= 0) {
      bankName = 'VietinBank';
    } else if (content.indexOf('SDTK') >= 0) {
      bankName = 'SHB';
    } else if (content.indexOf('Sacombank ') === 0) {
      bankName = 'Sacombank';
    } else if (content.indexOf(' So tien GD:') > 0) {
      bankName = 'Techcombank';
    } else if (content.indexOf(' GD:') > 0) {
      bankName = 'MBbank';
    } else if (content.match(/([0-9]{2})-([0-9]{2})-2022([0-9]{2}):([0-9]{2}):([0-9]{2})/)?.length >= 0) {
      bankName = 'VietinBank';
    }

    return bankName;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

export const getBankNameOTP = (content: string) => {
  try {
    let bankName = '';
    if (content.indexOf('VCB Digibank') >= 0) {
      bankName = 'Vietcombank';
    } else if (content.indexOf('VietinBank') >= 0 || content.indexOf('VIETINBANK') >= 0) {
      bankName = 'VietinBank';
    }
    return bankName;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

export const getOTP = (content: string) => {
  try {
    let otp = '';
    if (content.indexOf('VietinBank') >= 0 || content.indexOf('VIETINBANK') >= 0) {
      otp = content.match(/(OTP: )(\d+)/)[2];
    }
    return otp;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

export const getTransferAmount = (bankName: string, content: string) => {
  try {
    let transferAmount: any = 0;
    switch (bankName) {
      case 'VP Bank':
        transferAmount = parseInt(content.match(/(\+)([0-9,]*)(VND)/)[2].replace(/[,]/g, ''));
        break;
      case 'Vietcombank':
        transferAmount = parseInt(content.match(/(\+)([0-9,]*)(VND)/)[2].replace(/[,]/g, ''));
        break;
      case 'Sacombank':
        transferAmount = content.match(/(PS: )(\+)([0-9,]*)( VND)/)[3].replace(/[,]/g, '');
        break;
      case 'Techcombank':
        transferAmount = content.match(/(\+)([0-9,]*)/)[2].replace(/[,]/g, '');
        break;
      case 'MBbank':
        transferAmount = parseInt(content.match(/(\+)([0-9,]*)(VND)/)[2].replace(/[,]/g, ''));
        break;
      case 'VietinBank':
        transferAmount = parseInt(content.match(/(\+)([0-9,]*)/)[2].replace(/[,]/g, ''));
        break;
      case 'SHB':
        transferAmount = content.match(/(\+)([0-9,]*)/)[2].replace(/[,]/g, '');
        break;
    }
    return transferAmount;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

export const getTransferAmountWithDraw = (bankName: string, content: string) => {
  let transferAmount: any = 0;
  switch (bankName) {
    case 'VP Bank':
      transferAmount = parseInt(content.match(/(-)([0-9,]*)(VND)/)[2].replace(/[,]/g, ''));
      break;
    case 'Vietcombank':
      transferAmount = parseInt(content.match(/(-)([0-9,]*)(VND)/)[2].replace(/[,]/g, ''));
      break;
    case 'Sacombank':
      transferAmount = content.match(/(PS: )(-)([0-9,]*)( VND)/)[3].replace(/[,]/g, '');
      break;
    case 'VietinBank':
      transferAmount = parseInt(content.match(/(-)([0-9,]*)/)[2].replace(/[,]/g, ''));
      break;
    case 'SHB':
      transferAmount = content.match(/(-)([0-9,]*)/)[2].replace(/[,]/g, '');
      break;
  }
  return transferAmount;
};

export const getAccNumber = (bankName: string, content: string) => {
  try {
    let accNumber: any = '';
    switch (bankName) {
      case 'VP Bank':
        accNumber = parseInt(content.match(/(TK )([0-9]+)( )/)[2]);
        break;
      case 'Vietcombank':
        accNumber = parseInt(content.match(/(TK )([0-9]+)( )/)[2]);
        break;
      case 'Sacombank':
        accNumber = parseInt(content.match(/(TK: )([0-9]+)/)[2]);
        break;
      case 'VietinBank':
        accNumber = parseInt(content.match(/(TK:)([0-9]+)/)[2]);
        break;
      case 'SHB':
        accNumber = parseInt(content.match(/(SDTK )([0-9]+)/)[2]);
        break;
    }
    return accNumber;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

export const getPartnerReference = (bankName: string, content: string, regexString: string, regexIndex: number) => {
  try {
    let partnerReference: string = '';
    const regex = new RegExp(`${regexString}`, 'g');
    switch (bankName) {
      case 'Vietcombank':
        partnerReference = regex.exec(content)?.[regexIndex] || '';
        break;
      default:
        partnerReference = regex.exec(content)?.[regexIndex] || '';
    }
    return partnerReference;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

export const getAccBalance = (bankName: string, content: string) => {
  try {
    let accBalance: number = 0;
    switch (bankName) {
      case 'VP Bank':
        accBalance = parseInt(content.match(/(So du )([0-9,]*)(VND)/)[2]?.replaceAll(',', ''));
        break;
      case 'Vietcombank':
        accBalance = parseInt(content.match(/(SD )([0-9,]*)(VND)/)[2]?.replaceAll(',', ''));
        break;
      case 'Sacombank':
        accBalance = parseInt(content.match(/(So du kha dung: )([0-9,]*)( VND)/)[2]?.replaceAll(',', ''));
        break;
      case 'VietinBank':
        accBalance = parseInt(content.match(/(SDC:)([0-9,]*)(VND)/)[2]?.replaceAll(',', ''));
        break;
      case 'SHB':
        accBalance = parseInt(content.match(/(la )([0-9,]*)( VND)/)[2]?.replaceAll(',', ''));
        break;
    }
    return accBalance;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};
