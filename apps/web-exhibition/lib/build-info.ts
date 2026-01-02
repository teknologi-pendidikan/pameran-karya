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
  "timestamp": "2026-01-02T13:28:53.003Z",
  "date": "2 Januari 2026 pukul 20.28 WIB",
  "version": "0.1.0",
  "nodeVersion": "v24.12.0",
  "buildId": "wb95vu9tla",
  "git": {
    "commitHash": "e5ca98f56acebcc7561308a2cc571f8a4471551e",
    "commitShort": "e5ca98f",
    "commitMessage": "chore: remove obsolete components",
    "branchName": "2025",
    "gitlabUrl": "https://gitlab.com/teknologi-pendidikan/pamerankarya"
  }
};

export default buildInfo;
