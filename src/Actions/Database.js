import sqlite3 from 'sqlite3';
import { remote } from 'electron';
import { join } from 'path';
import { stat } from 'fs';

const dbName = 'blood-drop.db';
const dir = remote.app.getPath('userData');
const dbPath = join(dir, dbName);

export const Path = dbPath;

export function Create() {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath, (err) => {
      if (err) reject(err);
      else resolve(db);
    });
  })
    .then(
      db =>
        new Promise((resolve, reject) => {
          db.exec(
            "CREATE TABLE IF NOT EXISTS `Records` ( `pk` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, `id` TEXT NOT NULL UNIQUE, `type` TEXT NOT NULL, `createDate` INTEGER NOT NULL, `editDate` INTEGER NOT NULL, `data` BLOB DEFAULT '{}', `search` TEXT DEFAULT '', `label`	TEXT DEFAULT '', `archived` INTEGER DEFAULT 0, `archiveDate` INTEGER DEFAULT 0 )",
            (err) => {
              if (err) reject(err);
              else resolve(db);
            },
          );
        }),
    )
    .then(
      db =>
        new Promise((resolve, reject) => {
          db.exec('CREATE INDEX IF NOT EXISTS `id` ON `Records` ( `id` )', (err) => {
            if (err) reject(err);
            else resolve(db);
          });
        }),
    )
    .then(
      db =>
        new Promise((resolve, reject) => {
          db.exec('CREATE INDEX IF NOT EXISTS `search` ON `Records` ( `search` )', (err) => {
            if (err) reject(err);
            else resolve(db);
          });
        }),
    )
    .then(
      db =>
        new Promise((resolve, reject) => {
          db.exec('CREATE INDEX IF NOT EXISTS `type` ON `Records` ( `type` )', (err) => {
            if (err) reject(err);
            else resolve(db);
          });
        }),
    );
}

export function Stat() {
  return new Promise((resolve, reject) => {
    stat(dbPath, {}, (err, stat) => {
      if (err) reject(err);
      else resolve(stat);
    });
  });
}
