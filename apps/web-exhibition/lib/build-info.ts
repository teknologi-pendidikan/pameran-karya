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
  "timestamp": "2025-12-29T02:33:02.122Z",
  "date": "29 Desember 2025 pukul 09.33 WIB",
  "version": "0.1.0",
  "nodeVersion": "v24.11.1",
  "buildId": "0sqp2ubavcyn",
  "git": {
    "commitHash": "254c36e2b5a77527c395707bac765463e6956abf",
    "commitShort": "254c36e",
    "commitMessage": "deps: upgrade and moving the dev into root",
    "branchName": "2025",
    "gitlabUrl": "https://gitlab.com/teknologi-pendidikan/pamerankarya"
  }
};

export default buildInfo;
