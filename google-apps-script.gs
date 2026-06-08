/***************
 * GAME WALLET DATABASE
 * Sheet ID: 1TIjpqOWy-ezzV30Nte2jqCDIr1qX2gd60f0MNsePV10
 ***************/

const CONFIG = {
  SPREADSHEET_ID: '1TIjpqOWy-ezzV30Nte2jqCDIr1qX2gd60f0MNsePV10',
  SHEET_DATA: 'Data',
  SHEET_PLAYERS: 'Players',
  SHEET_TRANSACTION: 'Transaction',
};

const HEADERS = {
  Data: [
    'Log_ID',
    'Player_ID',
    'Name',
    'Email',
    'Phone',
    'Game',
    'Score',
    'HP',
    'Coins_Earned',
    'Result',
    'Created_At',
    'Raw_Params',
  ],

  Players: [
    'Player_ID',
    'Name',
    'Email',
    'Phone',
    'Total_Coins',
    'Total_Score',
    'Highest_Score',
    'Last_HP',
    'Games_Played',
    'Owned_Items_JSON',
    'Created_At',
    'Last_Played',
    'Status',
  ],

  Transaction: [
    'Transaction_ID',
    'Player_ID',
    'Name',
    'Email',
    'Phone',
    'Type',
    'Item_Name',
    'Cost',
    'Coins_Before',
    'Coins_After',
    'Note',
    'Created_At',
    'Status',
  ],
};

function doGet(e) {
  try {
    setupSheets_();

    const p = normalizeParams_(e && e.parameter ? e.parameter : {});
    const action = String(p.action || 'history').toLowerCase();

    let result;

    switch (action) {
      case 'setup':
        result = {
          ok: true,
          message: 'Sheets are ready.',
          sheets: [CONFIG.SHEET_DATA, CONFIG.SHEET_PLAYERS, CONFIG.SHEET_TRANSACTION],
        };
        break;

      case 'test':
      case 'ping':
        result = {
          ok: true,
          message: 'Apps Script is working.',
          time: new Date(),
        };
        break;

      case 'history':
      case 'log':
      case 'save':
      case 'submit':
      case 'game':
      case 'loggameresult':
        result = logGameResult_(p);
        break;

      case 'auth':
      case 'login':
      case 'wallet':
        result = authWallet_(p);
        break;

      case 'balance':
      case 'refresh':
        result = authWallet_(p);
        break;

      case 'redeem':
      case 'purchase':
      case 'buy':
        result = redeemReward_(p);
        break;

      default:
        throw new Error('Unknown action: ' + action);
    }

    return json_(result);
  } catch (err) {
    return json_({
      ok: false,
      message: err && err.message ? err.message : String(err),
    });
  }
}

function doPost(e) {
  return doGet(e);
}

function setup() {
  setupSheets_();
}

function logGameResult_(p) {
  if (!p.name) {
    throw new Error('Missing name.');
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const now = new Date();
    const score = number_(p.score, 0);
    const hp = number_(p.hp, 0);
    const rawCoin = firstNonEmpty_(p.coin, p.coins, p.money, p.coins_earned);
    const coinsEarned = rawCoin !== '' ? number_(rawCoin, 0) : score;
    const game = cleanText_(p.game || p.gameName || 'Unknown Game');
    const result = cleanText_(p.result || 'COMPLETED');

    const playerResult = upsertPlayer_(p, coinsEarned, score, hp, now);
    const player = playerResult.data;

    appendDataLog_(p, player.playerId, game, score, hp, coinsEarned, result, now);

    return {
      ok: true,
      message: 'Game result saved.',
      data: player,
    };
  } finally {
    lock.releaseLock();
  }
}

function authWallet_(p) {
  if (!p.name) {
    throw new Error('Missing name.');
  }

  if (!p.email) {
    throw new Error('Missing email.');
  }

  const found = findPlayerByEmail_(p.email);

  if (!found) {
    throw new Error('Wallet not found.');
  }

  const sheetName = getCell_(found.row, found.map, 'Name');

  if (canonicalName_(sheetName) !== canonicalName_(p.name)) {
    throw new Error('Name or email is incorrect.');
  }

  return {
    ok: true,
    message: 'Wallet connected successfully.',
    data: playerObject_(found.row, found.map),
  };
}

function redeemReward_(p) {
  if (!p.name) {
    throw new Error('Missing name.');
  }

  if (!p.email) {
    throw new Error('Missing email.');
  }

  const itemName = cleanText_(p.itemName || p.item || p.product || p.reward);

  if (!itemName) {
    throw new Error('Missing itemName.');
  }

  const cost = number_(p.cost || p.price, 0);

  if (cost <= 0) {
    throw new Error('Invalid cost.');
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const found = findPlayerByEmail_(p.email);

    if (!found) {
      throw new Error('Wallet not found.');
    }

    const sheetName = getCell_(found.row, found.map, 'Name');

    if (canonicalName_(sheetName) !== canonicalName_(p.name)) {
      throw new Error('Name or email is incorrect.');
    }

    const row = found.row.slice();
    const map = found.map;
    const sheet = found.sheet;

    const playerId = getCell_(row, map, 'Player_ID');
    const name = getCell_(row, map, 'Name');
    const email = getCell_(row, map, 'Email');
    const phone = getCell_(row, map, 'Phone');

    const beforeCoins = number_(getCell_(row, map, 'Total_Coins'), 0);
    const ownedItems = parseOwnedItems_(getCell_(row, map, 'Owned_Items_JSON'));

    if (ownedItems.indexOf(itemName) !== -1) {
      throw new Error('Already been purchased.');
    }

    if (beforeCoins < cost) {
      throw new Error('Not enough money.');
    }

    const afterCoins = beforeCoins - cost;
    const now = new Date();
    const note = cleanText_(p.note || '');
    let transactionStatus = 'SUCCESS';
    let finalNote = note;

    ownedItems.push(itemName);

    row[map.Total_Coins] = afterCoins;
    row[map.Owned_Items_JSON] = JSON.stringify(ownedItems);
    row[map.Last_Played] = now;
    row[map.Status] = 'ACTIVE';

    sheet
      .getRange(found.rowIndex, 1, 1, sheet.getLastColumn())
      .setValues([normalizeRowLength_(row, sheet.getLastColumn())]);

    try {
      sendRedeemEmail_(email, name, itemName, cost, afterCoins);
    } catch (mailError) {
      transactionStatus = 'SUCCESS_MAIL_FAILED';
      finalNote = mergeNotes_(
        note,
        'MAIL_ERROR: ' + (mailError && mailError.message ? mailError.message : String(mailError)),
      );
    }

    appendTransaction_({
      playerId: playerId,
      name: name,
      email: email,
      phone: phone,
      type: 'REDEEM',
      itemName: itemName,
      cost: cost,
      beforeCoins: beforeCoins,
      afterCoins: afterCoins,
      note: finalNote,
      status: transactionStatus,
      createdAt: now,
    });

    const updated = findPlayerByEmail_(email);

    return {
      ok: true,
      message: transactionStatus === 'SUCCESS'
        ? 'Reward redeemed successfully.'
        : 'Reward redeemed successfully. Confirmation email could not be sent.',
      data: playerObject_(updated.row, updated.map),
      mailStatus: transactionStatus,
    };
  } finally {
    lock.releaseLock();
  }
}

function upsertPlayer_(p, coinsEarned, score, hp, now) {
  const playersSheet = getSheet_(CONFIG.SHEET_PLAYERS);
  const map = headerMap_(playersSheet);

  let found = null;

  if (p.email) {
    found = findPlayerByEmail_(p.email);
  }

  if (!found && p.phone) {
    found = findPlayerByPhone_(p.phone);
  }

  if (!found && p.name) {
    found = findPlayerByName_(p.name);
  }

  const cleanName = cleanText_(p.name);
  const cleanEmail = normalizeEmail_(p.email);
  const cleanPhone = normalizePhone_(p.phone);

  if (!found) {
    const playerId = makePlayerId_(cleanEmail || cleanPhone || cleanName);

    const newRowObject = {
      Player_ID: playerId,
      Name: cleanName,
      Email: cleanEmail,
      Phone: cleanPhone,
      Total_Coins: coinsEarned,
      Total_Score: score,
      Highest_Score: score,
      Last_HP: hp,
      Games_Played: 1,
      Owned_Items_JSON: '[]',
      Created_At: now,
      Last_Played: now,
      Status: 'ACTIVE',
    };

    playersSheet.appendRow(rowFromObject_(HEADERS.Players, newRowObject));

    const created = findPlayerById_(playerId);

    return {
      ok: true,
      created: true,
      data: playerObject_(created.row, created.map),
    };
  }

  const row = found.row.slice();
  const oldCoins = number_(getCell_(row, map, 'Total_Coins'), 0);
  const oldTotalScore = number_(getCell_(row, map, 'Total_Score'), 0);
  const oldHighestScore = number_(getCell_(row, map, 'Highest_Score'), 0);
  const oldGamesPlayed = number_(getCell_(row, map, 'Games_Played'), 0);

  if (!getCell_(row, map, 'Name') && cleanName) row[map.Name] = cleanName;
  if (!getCell_(row, map, 'Email') && cleanEmail) row[map.Email] = cleanEmail;
  if (!getCell_(row, map, 'Phone') && cleanPhone) row[map.Phone] = cleanPhone;

  row[map.Total_Coins] = oldCoins + coinsEarned;
  row[map.Total_Score] = oldTotalScore + score;
  row[map.Highest_Score] = Math.max(oldHighestScore, score);
  row[map.Last_HP] = hp;
  row[map.Games_Played] = oldGamesPlayed + 1;
  row[map.Last_Played] = now;
  row[map.Status] = 'ACTIVE';

  if (!getCell_(row, map, 'Owned_Items_JSON')) {
    row[map.Owned_Items_JSON] = '[]';
  }

  playersSheet.getRange(found.rowIndex, 1, 1, playersSheet.getLastColumn()).setValues([
    normalizeRowLength_(row, playersSheet.getLastColumn()),
  ]);

  const updated = findPlayerById_(getCell_(row, map, 'Player_ID'));

  return {
    ok: true,
    created: false,
    data: playerObject_(updated.row, updated.map),
  };
}

function appendDataLog_(p, playerId, game, score, hp, coinsEarned, result, now) {
  const dataSheet = getSheet_(CONFIG.SHEET_DATA);
  const logId = makeLogId_('LOG');

  const rowObject = {
    Log_ID: logId,
    Player_ID: playerId,
    Name: cleanText_(p.name),
    Email: normalizeEmail_(p.email),
    Phone: normalizePhone_(p.phone),
    Game: game,
    Score: score,
    HP: hp,
    Coins_Earned: coinsEarned,
    Result: result,
    Created_At: now,
    Raw_Params: JSON.stringify(p),
  };

  dataSheet.appendRow(rowFromObject_(HEADERS.Data, rowObject));
}

function appendTransaction_(t) {
  const transactionSheet = getSheet_(CONFIG.SHEET_TRANSACTION);
  const transactionId = makeLogId_('TXN');

  const rowObject = {
    Transaction_ID: transactionId,
    Player_ID: t.playerId,
    Name: t.name,
    Email: t.email,
    Phone: t.phone,
    Type: t.type,
    Item_Name: t.itemName,
    Cost: t.cost,
    Coins_Before: t.beforeCoins,
    Coins_After: t.afterCoins,
    Note: t.note,
    Created_At: t.createdAt,
    Status: t.status,
  };

  transactionSheet.appendRow(rowFromObject_(HEADERS.Transaction, rowObject));
}

function sendRedeemEmail_(email, name, itemName, cost, balanceAfter) {
  if (!email) {
    return;
  }

  const subject = 'Livestream Master - Reward Redemption Successful';
  const body =
    'Hello ' + name + ',\n\n' +
    'Your reward redemption was successful.\n\n' +
    'Item: ' + itemName + '\n' +
    'Cost: ' + cost + ' MONEY\n' +
    'Remaining balance: ' + balanceAfter + ' MONEY\n\n' +
    'Thank you for playing Livestream Master.\n';

  MailApp.sendEmail({
    to: email,
    subject: subject,
    body: body,
  });
}

function findPlayerById_(playerId) {
  return findPlayer_(function (row, map) {
    return String(getCell_(row, map, 'Player_ID')) === String(playerId);
  });
}

function findPlayerByEmail_(email) {
  const target = normalizeEmail_(email);
  if (!target) return null;

  return findPlayer_(function (row, map) {
    return normalizeEmail_(getCell_(row, map, 'Email')) === target;
  });
}

function findPlayerByPhone_(phone) {
  const target = normalizePhone_(phone);
  if (!target) return null;

  return findPlayer_(function (row, map) {
    return normalizePhone_(getCell_(row, map, 'Phone')) === target;
  });
}

function findPlayerByName_(name) {
  const target = canonicalName_(name);
  if (!target) return null;

  return findPlayer_(function (row, map) {
    return canonicalName_(getCell_(row, map, 'Name')) === target;
  });
}

function findPlayer_(predicate) {
  const sheet = getSheet_(CONFIG.SHEET_PLAYERS);
  const map = headerMap_(sheet);
  const lastRow = sheet.getLastRow();

  if (lastRow < 2) return null;

  const values = sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn()).getValues();

  for (let i = 0; i < values.length; i += 1) {
    const row = values[i];

    if (predicate(row, map)) {
      return {
        sheet: sheet,
        map: map,
        row: row,
        rowIndex: i + 2,
      };
    }
  }

  return null;
}

function setupSheets_() {
  ensureSheet_(CONFIG.SHEET_DATA, HEADERS.Data);
  ensureSheet_(CONFIG.SHEET_PLAYERS, HEADERS.Players);
  ensureSheet_(CONFIG.SHEET_TRANSACTION, HEADERS.Transaction);
}

function ensureSheet_(sheetName, headers) {
  const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  let sheet = ss.getSheetByName(sheetName);

  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
  }

  if (sheet.getMaxColumns() < headers.length) {
    sheet.insertColumnsAfter(sheet.getMaxColumns(), headers.length - sheet.getMaxColumns());
  }

  const currentHeaders = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
  let needsHeader = false;

  for (let i = 0; i < headers.length; i += 1) {
    if (String(currentHeaders[i] || '').trim() !== headers[i]) {
      needsHeader = true;
      break;
    }
  }

  if (needsHeader) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  }

  sheet.setFrozenRows(1);
  return sheet;
}

function getSheet_(sheetName) {
  const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  const sheet = ss.getSheetByName(sheetName);

  if (!sheet) {
    throw new Error('Sheet not found: ' + sheetName);
  }

  return sheet;
}

function headerMap_(sheet) {
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const map = {};

  headers.forEach(function (header, index) {
    const key = String(header || '').trim();

    if (key) {
      map[key] = index;
    }
  });

  return map;
}

function playerObject_(row, map) {
  const coins = number_(getCell_(row, map, 'Total_Coins'), 0);

  return {
    playerId: getCell_(row, map, 'Player_ID'),
    name: getCell_(row, map, 'Name'),
    email: getCell_(row, map, 'Email'),
    phone: getCell_(row, map, 'Phone'),
    money: coins,
    coins: coins,
    balance: coins,
    totalCoins: coins,
    totalScore: number_(getCell_(row, map, 'Total_Score'), 0),
    highestScore: number_(getCell_(row, map, 'Highest_Score'), 0),
    lastHp: number_(getCell_(row, map, 'Last_HP'), 0),
    gamesPlayed: number_(getCell_(row, map, 'Games_Played'), 0),
    ownedItems: parseOwnedItems_(getCell_(row, map, 'Owned_Items_JSON')),
    createdAt: getCell_(row, map, 'Created_At'),
    updatedAt: getCell_(row, map, 'Last_Played'),
    lastPlayed: getCell_(row, map, 'Last_Played'),
    status: getCell_(row, map, 'Status'),
  };
}

function parseOwnedItems_(value) {
  try {
    const arr = JSON.parse(value || '[]');
    return Array.isArray(arr) ? arr : [];
  } catch (err) {
    return [];
  }
}

function rowFromObject_(headers, obj) {
  return headers.map(function (header) {
    return obj[header] !== undefined ? obj[header] : '';
  });
}

function getCell_(row, map, key) {
  if (map[key] === undefined) return '';
  return row[map[key]];
}

function normalizeRowLength_(row, length) {
  const output = row.slice();

  while (output.length < length) {
    output.push('');
  }

  return output.slice(0, length);
}

function cleanText_(value) {
  return String(value || '').trim().replace(/\s+/g, ' ');
}

function normalizeEmail_(email) {
  return String(email || '').trim().toLowerCase();
}

function normalizePhone_(phone) {
  return String(phone || '').trim().replace(/\s+/g, '');
}

function canonicalName_(value) {
  return removeVietnameseMarks_(String(value || ''))
    .toLowerCase()
    .replace(/\s+/g, '');
}

function removeVietnameseMarks_(str) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
}

function number_(value, fallback) {
  const defaultValue = fallback === undefined ? 0 : fallback;

  if (value === undefined || value === null || value === '') {
    return defaultValue;
  }

  let s = String(value).trim().replace(/\s/g, '');

  if (s.indexOf(',') !== -1 && s.indexOf('.') !== -1) {
    s = s.replace(/\./g, '').replace(',', '.');
  } else {
    s = s.replace(/,/g, '');
  }

  const n = Number(s);
  return Number.isFinite(n) ? n : defaultValue;
}

function firstNonEmpty_() {
  for (let i = 0; i < arguments.length; i += 1) {
    const v = arguments[i];
    if (v !== undefined && v !== null && String(v).trim() !== '') {
      return v;
    }
  }

  return '';
}

function normalizeParams_(params) {
  const out = {};

  Object.keys(params || {}).forEach(function (key) {
    out[key] = Array.isArray(params[key]) ? params[key][0] : params[key];
  });

  return out;
}

function makePlayerId_(raw) {
  const base = String(raw || new Date().getTime());
  const digest = Utilities.computeDigest(
    Utilities.DigestAlgorithm.MD5,
    base,
    Utilities.Charset.UTF_8,
  );

  const hex = digest.map(function (byte) {
    const v = byte < 0 ? byte + 256 : byte;
    return ('0' + v.toString(16)).slice(-2);
  }).join('');

  return 'P-' + hex.substring(0, 10).toUpperCase();
}

function makeLogId_(prefix) {
  const date = Utilities.formatDate(
    new Date(),
    Session.getScriptTimeZone(),
    'yyyyMMdd-HHmmss',
  );

  const random = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
  return prefix + '-' + date + '-' + random;
}

function mergeNotes_(noteA, noteB) {
  const parts = [cleanText_(noteA), cleanText_(noteB)].filter(function (part) {
    return part;
  });

  return parts.join(' | ');
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
