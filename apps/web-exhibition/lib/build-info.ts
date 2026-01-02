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
  "timestamp": "2026-01-02T05:27:45.413Z",
  "date": "2 Januari 2026 pukul 12.27 WIB",
  "version": "0.1.0",
  "nodeVersion": "v24.12.0",
  "buildId": "gdagvxczo05",
  "git": {
    "commitHash": "c10a621a8fdd8dc5fdcb0ace0c35f44c1ed02168",
    "commitShort": "c10a621",
    "commitMessage": "feat: use centralized affiliation table",
    "branchName": "2025",
    "gitlabUrl": "https://gitlab.com/teknologi-pendidikan/pamerankarya"
  }
};

export default buildInfo;
