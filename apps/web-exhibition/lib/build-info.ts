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
  "timestamp": "2025-12-30T21:09:15.639Z",
  "date": "31 Desember 2025 pukul 04.09 WIB",
  "version": "0.1.0",
  "nodeVersion": "v24.12.0",
  "buildId": "bz65ujgfn6",
  "git": {
    "commitHash": "ac54bee74e4bed2c186dab8964a74d391b10e720",
    "commitShort": "ac54bee",
    "commitMessage": "fix: use new slug-uuid generaton function",
    "branchName": "2025",
    "gitlabUrl": "https://gitlab.com/teknologi-pendidikan/pamerankarya"
  }
};

export default buildInfo;
