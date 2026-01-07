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
  "timestamp": "2026-01-04T10:54:18.766Z",
  "date": "4 Januari 2026 pukul 17.54 WIB",
  "version": "0.1.0",
  "nodeVersion": "v24.12.0",
  "buildId": "frin0ym9zpj",
  "git": {
    "commitHash": "d675cf7a12942b9c7fbf8632c31af6354e5e88a1",
    "commitShort": "d675cf7",
    "commitMessage": "feat: auto-detect the asset type based on link",
    "branchName": "2025",
    "gitlabUrl": "https://gitlab.com/teknologi-pendidikan/pamerankarya"
  }
};

export default buildInfo;
