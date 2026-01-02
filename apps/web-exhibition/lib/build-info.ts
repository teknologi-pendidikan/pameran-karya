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
  "timestamp": "2026-01-02T10:02:14.892Z",
  "date": "2 Januari 2026 pukul 17.02 WIB",
  "version": "0.1.0",
  "nodeVersion": "v24.12.0",
  "buildId": "tqjrl500u6i",
  "git": {
    "commitHash": "deaa4e6d407f2802ddec389b27b302748d54766b",
    "commitShort": "deaa4e6",
    "commitMessage": "ui: changes the max width to larger screen",
    "branchName": "2025",
    "gitlabUrl": "https://gitlab.com/teknologi-pendidikan/pamerankarya"
  }
};

export default buildInfo;
