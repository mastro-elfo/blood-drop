import sqlite3 from 'sqlite3';
import uuid from 'uuid/v1';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import {remote} from 'electron';
import {join} from 'path';

const dbName = 'blood-drop.db';
const dir = remote.app.getPath('userData');
const dbPath = join(dir, dbName);

export function Create(type, data, search, label) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath, (err) => {
      if (err) reject(err);
      else {
        const id = uuid();
        db.run(
          'INSERT INTO `Records` (`id`, `type`, `createDate`, `editDate`, `data`, `search`, `label`) VALUES (?,?,?,?,?,?,?)',
          [id, type, +new Date(), +new Date(), JSON.stringify(data), search, JSON.stringify(label)],
          (err) => {
            if (err) reject(err);
            else resolve(id);
          },
        );
      }
    });
  });
}

export function Read(id) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath, (err) => {
      if (err) reject(err);
      else {
        db.get('SELECT * FROM `Records` WHERE `id` = ?', [id], (err, row) => {
          if (err) reject(err);
          else {
            resolve({
              ...row,
              data: JSON.parse(row.data),
              label: JSON.parse(row.label),
              archived: row.archived === 1,
            });
          }
        });
      }
    });
  });
}

export function ReadAll(type, ids = [], archived = false) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath, (err) => {
      if (err) reject(err);
      else {
        db.all(
          `SELECT * FROM \`Records\` WHERE (? IS NULL OR \`type\` = ?) AND archived IN (0, ?) AND (0 = ? OR \`id\` IN (${Array(
            ids.length,
          )
            .fill('?')
            .join(',')}))`,
          [type, type, archived ? 1 : 0, ids.length, ...ids],
          (err, rows) => {
            if (err) reject(err);
            else {
              resolve(
                rows.map(row => ({
                  ...row,
                  data: JSON.parse(row.data),
                  label: JSON.parse(row.label),
                  archived: row.archived === 1,
                })),
              );
            }
          },
        );
      }
    });
  });
}

export function Update(id, data, search, label, archived = false) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath, (err) => {
      if (err) reject(err);
      else {
        db.run(
          'UPDATE `Records` SET `data` = ?, `search` = ?, `editDate` = ?, `label` = ?, `archived` = ?, archiveDate = ? WHERE `id` = ?',
          [
            JSON.stringify(data),
            search,
            +new Date(),
            JSON.stringify(label),
            archived ? 1 : 0,
            archived ? +new Date() : 0,
            id,
          ],
          (err) => {
            if (err) reject(err);
            else resolve(id);
          },
        );
      }
    });
  });
}

export function Search(type, search, archive = false) {
  return ReadAll(type, [], archive).then(rows =>
    rows
      .map((row) => {
        const matches = match(row.search, search);
        const parts = parse(row.search, matches);
        return {
          ...row,
          matches,
          parts,
        };
      })
      .filter(row => row.matches.length > 0)
      .sort(
        (a, b) =>
          b.matches.length - a.matches.length ||
          maxDiff(b.matches) - maxDiff(a.matches) ||
          a.matches[0][0] - b.matches[0][0],
      ),
  );
}

export function SearchAll(search, archive) {
  return Search(null, search, archive);
}

function maxDiff(matches) {
  return matches.reduce((prev, curr) => Math.max(prev, curr[1] - curr[0]), 0);
}
