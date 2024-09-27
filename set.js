const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0xjV1VaZ2pSUG9iUzdGTW5xajMvdVYvTnhYQkNlbHdTaTdJQWVCOGIxRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaUV0Q1FBd2U5ZUlyVWNnV1FXVFRPdWFrTlgxZEsxQjM4YUZHZXIrTTZTcz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrRjhOc2V0RFMzTXJ0eldOSW05TnlVWTIrUG40WVpmeWxGZU1mQk9pSzE0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJZTl1TUZOQXFkQWt3SDNSbURBQ0IvbE5Ebm1QL3NsSXlkeHdxV093bmdnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IldQR0luYk5WV09EOTFrSUljc1dVa3pvcXNGekszZUpFK3gwakEwUGV6M2c9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ilg2UkNGZkxpTzQrUkpIUHhpQk9VTmZCcEY2Qzh5UTlZZHhUdVQ2VWF3aTA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUlhMWRmUEJPaG54UDBRZElwV3VzZmVDKytnRHhBMTN1djJEQzFEMksycz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV1NUUTd2UlRJSktud1E2Nkp0U1A1MzNXdmJUQytDUFVnN0c3amhjczUwUT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjFFVVZOZ1lJWVg0dzUxWDNRZFh5aGs2bUxMWk1ORTNldzJlQ2lEdWpEK1FxWWpMblpmK1ozbUpkM0JKcUZ2bkU4QmZjaFcrTTVIdW9qNDVUYzFPOENBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6OTQsImFkdlNlY3JldEtleSI6IjBwVFoyVWczcVdFRitkOHNxekRFS2hnRFhGblYwK0FxZUpieUJFbllYdGM9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IkI2clRwVC1zVDVpN29ZSXZKeGMyZ1EiLCJwaG9uZUlkIjoiZTk3MzBhOWItOWZlMi00NTdmLWFlODItNDlmZTU5YThlMzYyIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IldBMk5VRURoODVIeGM3SDR0MmRNa3RuNTNQWT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI4cUw1WnBDUlBUU3draE1mNy9jbEZacTVFQ0k9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiS1FMMU5QWjMiLCJtZSI6eyJpZCI6IjIzNzY3MjA4MDYwODoxOUBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTFNOMk9rRkVOcUwzTGNHR0FRZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoieFg2alFtaE52SXJGTTlXdkxheUNtcDV2bkZYMTF3YW1rUEhwRCtlZGZHMD0iLCJhY2NvdW50U2lnbmF0dXJlIjoiMHFXV0RvRFhORnNOeDZkN3lDK0t0QktVd3VWNGQ2OHJkSVVpSmFhRjdZelJvc3JNWHJhclJad0JyUEgrbUhtQlRubGYwdTk5ajBCNzg1VmFQbGRRQVE9PSIsImRldmljZVNpZ25hdHVyZSI6InpGbFV0ay9pZjJxUGxCYWVHTnU1L0xpc1FjRWo0MDR2WVNJOWttMmJHLy9keWFvTGtYNVZhM0tWT3pkcXY3NVlrWnd5d210R25MZm1RaXhsWXZmakRnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjM3NjcyMDgwNjA4OjE5QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmNWK28wSm9UYnlLeFRQVnJ5MnNncHFlYjV4VjlkY0dwcER4NlEvbm5YeHQifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3Mjc0NjQ5MzYsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBSHVjIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "𓆩ᬼ⃟𝗚𝗢𝗗⛃⃟༄𝐌𝐈𝐆𝐇𝐓𝐘᭄亗𝐒𝐀𝐒𝐀𝐊𝐈亗࿐",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "237672080608",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "no",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || '𝐀𝐋𝐏𝐇𝐀-𝐌𝐃',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/0c351a67f1dffd1f34cf5.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
