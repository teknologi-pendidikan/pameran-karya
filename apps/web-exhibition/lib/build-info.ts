// Build information generated at build time
// This file is auto-generated during the build process

export interface BuildInfo {
  timestamp: string;
  date: string;
  version: string;
  nodeVersion: string;
  buildId: string;
  git: {
    commitHash: string | null;
    commitShort: string | null;
    commitMessage: string | null;
    branchName: string | null;
    gitlabUrl: string | null;
  };
}

const buildInfo: BuildInfo = {
  "timestamp": "2025-12-27T22:34:09.528Z",
  "date": "28 Desember 2025 pukul 05.34 WIB",
  "version": "0.1.0",
  "nodeVersion": "v22.20.0",
  "buildId": "nn9ag8v0d8e",
  "git": {
    "commitHash": "fb5631c37cfcd6ed3575d887132dd5e24d99418f",
    "commitShort": "fb5631c",
    "commitMessage": "ui: boxy layout and using dark theme",
    "branchName": "2025",
    "gitlabUrl": "https://gitlab.com/teknologi-pendidikan/pamerankarya"
  }
};

export default buildInfo;
