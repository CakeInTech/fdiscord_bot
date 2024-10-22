import fs from 'fs';

let data = {
  warnings: [],
  bans: [],
  mutes: []
};

export function loadData() {
  try {
    const fileContent = fs.readFileSync('data.json', 'utf-8');
    data = JSON.parse(fileContent);
  } catch (error) {
    console.error("Error loading data:", error);
  }
}

function saveData() {
  try {
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error saving data:", error);
  }
}

export function addWarning(userId, reason, moderatorId) {
  data.warnings.push({ userId, reason, moderatorId, timestamp: Date.now() });
  saveData();
}

export function getWarnings(userId) {
  return data.warnings.filter(warning => warning.userId === userId);
}

export function addBan(userId, reason, moderatorId) {
  data.bans.push({ userId, reason, moderatorId, timestamp: Date.now() });
  saveData();
}

export function getRecentBans(limit = 10) {
  return data.bans.slice(-limit).reverse();
}

export function addMute(userId, duration, reason, moderatorId) {
  data.mutes.push({ userId, duration, reason, moderatorId, timestamp: Date.now() });
  saveData();
}

export function getRecentWarnings(limit = 10) {
  return data.warnings.slice(-limit).reverse();
}

export function resetWarnings(userId) {
    data.warnings = data.warnings.filter(warning => warning.userId !== userId);
    saveData();
}
